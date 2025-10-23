"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import ReCAPTCHA from "react-google-recaptcha";

export default function EntryPage() {
  type EventData = {
    id: number;
    name: string;
    start_date: string | null;
    end_date: string | null;
    event_date: string | null;
    event_note?: string | null;
  };

  const [event, setEvent] = useState<EventData | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    xaccount: "",
    region: "",
    part1: "",
    level1: "",
    part2: "",
    level2: "",
    songs: [] as string[],
    plan: "",
    availability: "",
    message: "",
  });

  // ==== 最新イベント取得 ====
  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("id", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error(error);
        setStatus("イベント情報の取得に失敗しました");
        return;
      }
      setEvent(data);
    };
    fetchEvent();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSongChange = (song: string) => {
    setForm((prev) => {
      const selected = prev.songs.includes(song)
        ? prev.songs.filter((s) => s !== song)
        : [...prev.songs, song];
      if (selected.length > 2) return prev; // 2曲まで
      return { ...prev, songs: selected };
    });
  };

  // ==== Submit ====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.xaccount || !form.region) {
      setStatus("必須項目を入力してください。");
      return;
    }
    if (!captchaToken) {
      setStatus("reCAPTCHA を確認してください。");
      return;
    }
    if (form.part2 && !form.level2) {
      setStatus("第二希望の演奏歴を選択してください。");
      return;
    }
    if (form.songs.length !== 2) {
      setStatus("希望曲は2曲選択してください。");
      return;
    }

    setStatus("送信中...");

    try {
      // メンバーを探す or 追加
      let { data: member } = await supabase
        .from("members")
        .select("id")
        .eq("email", form.email)
        .single();

      if (!member) {
        const { data: newMember, error: memberError } = await supabase
          .from("members")
          .insert([
            {
              name: form.name,
              email: form.email,
              xaccount: form.xaccount,
            },
          ])
          .select()
          .single();

        if (memberError) throw memberError;
        member = newMember;
      }

      if (!event) {
        setStatus("イベント情報が取得できませんでした。");
        return;
      }
      if (!member) {
        throw new Error("メンバー情報が取得できませんでした。");
      }

      // entries 登録
      const { error: entryError } = await supabase.from("entries").insert([
        {
          member_id: member.id,
          event_id: event.id,
          part1: form.part1,
          level1: form.level1,
          part2: form.part2,
          level2: form.level2,
          availability: form.availability,
          message: form.message,
        },
      ]);

      if (entryError) throw entryError;

      // メール送信
      const mailRes = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!mailRes.ok) {
        console.error("メール送信失敗:", await mailRes.text());
        setStatus("エントリーは保存されましたが、確認メールの送信に失敗しました。");
        return;
      }

      window.location.href = "/entry/thanks";
    } catch (err) {
      console.error(err);
      setStatus("送信に失敗しました。");
    }
  };

  // ==== 未取得時 ====
  if (!event) {
    return (
      <section style={{ padding: "4rem", textAlign: "center", color: "white" }}>
        読み込み中...
      </section>
    );
  }

  // ==== ステータス判定 ====
  const now = new Date();
  const isOpen =
    event.start_date &&
    event.end_date &&
    now >= new Date(event.start_date) &&
    now <= new Date(event.end_date);

  const statusText = isOpen
    ? "募集中"
    : event.end_date && now > new Date(event.end_date)
    ? "受付終了"
    : "準備中";

  const eventDateText = event.event_date
    ? new Date(event.event_date).toLocaleDateString("ja-JP")
    : event.event_note || "調整中";

  // ==== 共通スタイル ====
  const boxStyle = {
    border: "1px solid var(--color-accent)",
    borderRadius: "10px",
    padding: "1.5rem",
    textAlign: "center" as const,
    minWidth: "200px",
  };

  const inputStyle = {
    padding: "1rem",
    borderRadius: "8px",
    border: "1px solid #555",
    backgroundColor: "#111",
    color: "white",
    fontSize: "1rem",
  } as React.CSSProperties;

  const selectStyle = { ...inputStyle };
  const textareaStyle = { ...inputStyle, minHeight: "100px" };
  const buttonStyle = {
    ...inputStyle,
    border: "1px solid var(--color-accent)",
    color: "var(--color-accent)",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "6rem 2rem",
        backgroundColor: "#000",
        color: "white",
        lineHeight: 1.8,
      }}
    >
      {/* タイトル */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "var(--color-accent)",
            textTransform: "uppercase",
            borderBottom: "2px solid var(--color-accent)",
            display: "inline-block",
            paddingBottom: "0.5rem",
          }}
        >
          {event.name} Entry
        </h1>
      </div>

      {/* 開催情報カード */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
          marginBottom: "3rem",
        }}
      >
        <div style={boxStyle}>
          <p style={{ color: "var(--color-accent)", fontWeight: "bold" }}>開催予定日</p>
          <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>{eventDateText}</p>
        </div>
        <div style={boxStyle}>
          <p style={{ color: "var(--color-accent)", fontWeight: "bold" }}>エントリー期間</p>
          <p>
            {event.start_date && event.end_date
              ? `${new Date(event.start_date).toLocaleDateString("ja-JP")} 〜 ${new Date(
                  event.end_date
                ).toLocaleDateString("ja-JP")}`
              : "調整中"}
          </p>
        </div>
        <div style={boxStyle}>
          <p style={{ color: "var(--color-accent)", fontWeight: "bold" }}>ステータス</p>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{statusText}</p>
        </div>
      </div>

      {isOpen ? (
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* 名前・連絡 */}
          <input name="name" value={form.name} onChange={handleChange} placeholder="ニックネーム" required style={inputStyle} />
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="メールアドレス" required style={inputStyle} />
          <input name="xaccount" value={form.xaccount} onChange={handleChange} placeholder="Xアカウント（@なし）" required style={inputStyle} />

          {/* 地域 */}
          <h3 style={{ color: "var(--color-accent)" }}>地域</h3>
          <select name="region" value={form.region} onChange={handleChange} required style={selectStyle}>
            <option value="">地域を選択</option>
            <option>北海道</option><option>東北</option><option>関東</option>
            <option>中部</option><option>近畿</option><option>中国</option>
            <option>四国</option><option>九州</option><option>沖縄</option>
          </select>

          {/* 希望曲 */}
          <h3 style={{ color: "var(--color-accent)" }}>希望曲（2曲選択）</h3>
          {["SOUL LOVE", "HOWEVER", "サバイバル"].map((song) => (
            <label key={song} style={{ display: "block" }}>
              <input type="checkbox" checked={form.songs.includes(song)} onChange={() => handleSongChange(song)} /> {song}
            </label>
          ))}

          {/* 希望パート */}
          <h3 style={{ color: "var(--color-accent)" }}>第一希望パート</h3>
          <select name="part1" value={form.part1} onChange={handleChange} required style={selectStyle}>
            <option value="">第一希望パートを選択</option>
            <option>ギター</option><option>ベース</option><option>ドラム</option>
            <option>キーボード</option><option>ボーカル</option>
            <option>コーラス</option><option>パーカッション</option>
          </select>
          <select name="level1" value={form.level1} onChange={handleChange} required style={selectStyle}>
            <option value="">演奏歴を選択</option>
            <option>半年未満</option><option>1年未満</option><option>1〜3年</option>
            <option>3〜5年</option><option>5〜10年</option><option>10年以上</option>
          </select>

          {/* 第二希望 */}
          <h3 style={{ color: "var(--color-accent)" }}>第二希望パート</h3>
          <select name="part2" value={form.part2} onChange={handleChange} style={selectStyle}>
            <option value="">第二希望パートを選択（任意）</option>
            <option>ギター</option><option>ベース</option><option>ドラム</option>
            <option>キーボード</option><option>ボーカル</option>
            <option>コーラス</option><option>パーカッション</option>
          </select>
          <select name="level2" value={form.level2} onChange={handleChange} style={selectStyle}>
            <option value="">演奏歴を選択（任意）</option>
            <option>半年未満</option><option>1年未満</option><option>1〜3年</option>
            <option>3〜5年</option><option>5〜10年</option><option>10年以上</option>
          </select>

          {/* 参加可能日 */}
          <h3 style={{ color: "var(--color-accent)" }}>参加可能日</h3>
          <textarea
            name="availability"
            value={form.availability}
            onChange={handleChange}
            placeholder="例）土曜は参加できません／10月下旬は不可 など"
            style={textareaStyle}
          />

          {/* メッセージ */}
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="メッセージ（任意）"
            style={textareaStyle}
          />

          {/* reCAPTCHA */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReCAPTCHA
              sitekey="6Ld9bcsrAAAAAP9WT1TovVk8Vg4LxGkdXdM1yAI3"
              onChange={(token) => setCaptchaToken(token ?? "")}
              theme="dark"
            />
          </div>

          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-accent)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#111";
              e.currentTarget.style.color = "var(--color-accent)";
            }}
          >
            エントリーする
          </button>
        </form>
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
          現在はエントリー期間外です。
        </p>
      )}
      <p
        style={{
          fontSize: "0.9rem",
          color: "#aaa",
          textAlign: "center",
          marginTop: "1rem",
          lineHeight: "1.6",
        }}
      >
        ご参加にあたっては、必ず
        <a
          href="/guideline"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--color-accent)", textDecoration: "underline", marginLeft: "0.25rem" }}
        >
          参加ガイドライン
        </a>
        をご確認ください。
      </p>

      {status && (
        <p style={{ marginTop: "1rem", textAlign: "center", color: "gray" }}>
          {status}
        </p>
      )}
    </section>
  );
}
