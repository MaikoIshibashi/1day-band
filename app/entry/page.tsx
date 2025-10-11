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
      if (selected.length > 2) return prev; // 2曲まで制限
      return { ...prev, songs: selected };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.xaccount.trim() || !form.region) {
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
      let { data: member } = await supabase
        .from("members")
        .select("id")
        .eq("email", form.email)
        .single();

      if (!member) {
        const { data: newMember, error: memberError } = await supabase
          .from("members")
          .insert([
            { name: form.name, email: form.email, xaccount: form.xaccount },
          ])
          .select()
          .single();

        if (memberError) throw memberError;
        member = newMember;
      }

      if (!member) throw new Error("メンバーを作成できませんでした");
      if (!event) {
        setStatus("イベント情報が取得できませんでした。");
        return;
      }

      const { error: entryError } = await supabase.from("entries").insert([
        {
          member_id: member.id,
          event_id: event.id,
          part1: form.part1,
          level1: form.level1,
          part2: form.part2,
          level2: form.level2,
          plan: form.plan,
          availability: form.availability,
          message: form.message,
        },
      ]);
      if (entryError) throw entryError;

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

  if (!event) {
    return (
      <section style={{ padding: "4rem", textAlign: "center", color: "white" }}>
        読み込み中...
      </section>
    );
  }

  const now = new Date();
  const isOpen =
    event.start_date &&
    event.end_date &&
    now >= new Date(event.start_date) &&
    now <= new Date(event.end_date);

  const fieldTitle = {
    color: "var(--color-accent)",
    fontWeight: "bold",
    fontSize: "1.2rem",
    borderLeft: "4px solid var(--color-accent)",
    paddingLeft: "0.5rem",
  } as React.CSSProperties;

  const inputStyle = {
    padding: "1rem",
    borderRadius: "8px",
    border: "1px solid #555",
    backgroundColor: "#111",
    color: "white",
    fontSize: "1rem",
    width: "100%",
  } as React.CSSProperties;

  const selectStyle = { ...inputStyle };
  const textareaStyle = { ...inputStyle, minHeight: "120px" };
  const buttonStyle = {
    padding: "1rem",
    borderRadius: "8px",
    border: "1px solid var(--color-accent)",
    backgroundColor: "#111",
    color: "var(--color-accent)",
    fontSize: "1.1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease",
  } as React.CSSProperties;

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
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "var(--color-accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            borderBottom: "2px solid var(--color-accent)",
            display: "inline-block",
            paddingBottom: "0.5rem",
          }}
        >
          {event.name} Entry
        </h1>
      </div>

      {isOpen ? (
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <input name="name" value={form.name} onChange={handleChange} placeholder="ニックネーム" required style={inputStyle} />
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="メールアドレス" required style={inputStyle} />
          <input name="xaccount" value={form.xaccount} onChange={handleChange} placeholder="Xアカウント（@なし）" required style={inputStyle} />

          <h3 style={fieldTitle}>地域</h3>
          <select name="region" value={form.region} onChange={handleChange} required style={selectStyle}>
            <option value="">地域を選択</option>
            <option>北海道</option>
            <option>東北</option>
            <option>関東</option>
            <option>中部</option>
            <option>近畿</option>
            <option>中国</option>
            <option>四国</option>
            <option>九州</option>
            <option>沖縄</option>
          </select>

          <h3 style={fieldTitle}>希望曲（2曲選択）</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {["SOUL LOVE", "HOWEVER", "サバイバル"].map((song) => (
              <label key={song} style={{ cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.songs.includes(song)}
                  onChange={() => handleSongChange(song)}
                />{" "}
                {song}
              </label>
            ))}
          </div>

          <h3 style={fieldTitle}>参加プラン</h3>
          <select name="plan" value={form.plan} onChange={handleChange} required style={selectStyle}>
            <option value="">参加プランを選択</option>
            <option>スタジオのみ（¥5,000）</option>
            <option>スタジオ＋打ち上げ（¥9,000）</option>
          </select>

          <h3 style={fieldTitle}>第一希望パート</h3>
          <select name="part1" value={form.part1} onChange={handleChange} required style={selectStyle}>
            <option value="">第一希望パートを選択</option>
            <option>ギター</option>
            <option>ベース</option>
            <option>ドラム</option>
            <option>キーボード</option>
            <option>ボーカル</option>
            <option>コーラス</option>
            <option>パーカッション</option>
          </select>
          <select name="level1" value={form.level1} onChange={handleChange} required style={selectStyle}>
            <option value="">演奏歴を選択</option>
            <option>半年未満</option>
            <option>1年未満</option>
            <option>1〜3年</option>
            <option>3〜5年</option>
            <option>5〜10年</option>
            <option>10年以上</option>
          </select>

          <h3 style={fieldTitle}>第二希望パート（任意）</h3>
          <select name="part2" value={form.part2} onChange={handleChange} style={selectStyle}>
            <option value="">第二希望パートを選択</option>
            <option>ギター</option>
            <option>ベース</option>
            <option>ドラム</option>
            <option>キーボード</option>
            <option>ボーカル</option>
            <option>コーラス</option>
            <option>パーカッション</option>
          </select>
          <select name="level2" value={form.level2} onChange={handleChange} style={selectStyle}>
            <option value="">演奏歴を選択</option>
            <option>半年未満</option>
            <option>1年未満</option>
            <option>1〜3年</option>
            <option>3〜5年</option>
            <option>5〜10年</option>
            <option>10年以上</option>
          </select>

          <h3 style={fieldTitle}>参加可能日について</h3>
          <textarea
            name="availability"
            value={form.availability}
            onChange={handleChange}
            placeholder="例）土曜は参加できません／10月下旬は不可 など"
            style={textareaStyle}
          />

          <h3 style={fieldTitle}>メッセージ（任意）</h3>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="補足事項やご質問などがあればご記入ください"
            style={textareaStyle}
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReCAPTCHA
              sitekey="6Ld9bcsrAAAAAP9WT1TovVk8Vg4LxGkdXdM1yAI3"
              onChange={(token: string | null) => setCaptchaToken(token ?? "")}
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

      {status && <p style={{ marginTop: "1rem", textAlign: "center", color: "gray" }}>{status}</p>}
    </section>
  );
}
