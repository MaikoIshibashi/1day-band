"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import ReCAPTCHA from "react-google-recaptcha";
import { entrySubmit } from "@/app/actions/entrySubmit";

export default function EntryPage() {
  type EventData = {
    id: number;
    name: string;
    event_note: string | null;   // ← 表示用テキスト
    entry_period: string | null; // ← 表示用テキスト
    is_entry_open: boolean;      // ← 募集状態（true / false）
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
  difficulty1: "",   // ← 追加
  part2: "",
  level2: "",
  difficulty2: "",   // ← 追加
  songs: [] as string[],
  plan: "",
  availability: "",
  message: "",
});


  // === 最新イベント読み込み ===
  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, name, event_note, entry_period, is_entry_open")
        .order("id", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error(error);
        setStatus("イベント情報の取得に失敗しました。");
        return;
      }
      setEvent(data);
    };
    fetchEvent();
  }, []);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSongChange = (song: string) => {
    setForm((prev) => {
      const selected = prev.songs.includes(song)
        ? prev.songs.filter((s) => s !== song)
        : [...prev.songs, song];
      return selected.length > 2 ? prev : { ...prev, songs: selected };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!event?.is_entry_open) {
      setStatus("現在はエントリー期間外です。");
      return;
    }

    if (!captchaToken) {
      setStatus("reCAPTCHA を確認してください。");
      return;
    }

    if (!form.name || !form.email || !form.xaccount || !form.region) {
      setStatus("必須項目を入力してください。");
      return;
    }

    setStatus("送信中...");

    try {
      await entrySubmit({ ...form, eventId: event.id });

      await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

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
          <p style={{ color: "var(--color-accent)", fontWeight: "bold" }}>
            開催予定日
          </p>
          <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
            {event.event_note || "調整中"}
          </p>
        </div>

        <div style={boxStyle}>
          <p style={{ color: "var(--color-accent)", fontWeight: "bold" }}>
            エントリー期間
          </p>
          <p style={{ whiteSpace: "pre-line" }}>
            {event.entry_period || "調整中"}
          </p>
        </div>

        <div style={boxStyle}>
          <p style={{ color: "var(--color-accent)", fontWeight: "bold" }}>
            ステータス
          </p>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            {event.is_entry_open ? "募集中" : "準備中"}
          </p>
        </div>
      </div>

      {/* --- form --- */}
      {event.is_entry_open ? (
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

<h3 style={{ color: "var(--color-accent)" }}>地域（都道府県）</h3>
<select name="region" value={form.region} onChange={handleChange} required style={selectStyle}>
  <option value="">都道府県を選択</option>
  <option>北海道</option>
  <option>青森県</option>
  <option>岩手県</option>
  <option>宮城県</option>
  <option>秋田県</option>
  <option>山形県</option>
  <option>福島県</option>
  <option>茨城県</option>
  <option>栃木県</option>
  <option>群馬県</option>
  <option>埼玉県</option>
  <option>千葉県</option>
  <option>東京都</option>
  <option>神奈川県</option>
  <option>新潟県</option>
  <option>富山県</option>
  <option>石川県</option>
  <option>福井県</option>
  <option>山梨県</option>
  <option>長野県</option>
  <option>岐阜県</option>
  <option>静岡県</option>
  <option>愛知県</option>
  <option>三重県</option>
  <option>滋賀県</option>
  <option>京都府</option>
  <option>大阪府</option>
  <option>兵庫県</option>
  <option>奈良県</option>
  <option>和歌山県</option>
  <option>鳥取県</option>
  <option>島根県</option>
  <option>岡山県</option>
  <option>広島県</option>
  <option>山口県</option>
  <option>徳島県</option>
  <option>香川県</option>
  <option>愛媛県</option>
  <option>高知県</option>
  <option>福岡県</option>
  <option>佐賀県</option>
  <option>長崎県</option>
  <option>熊本県</option>
  <option>大分県</option>
  <option>宮崎県</option>
  <option>鹿児島県</option>
  <option>沖縄県</option>
</select>


          {/* 希望曲 */}
          <h3 style={{ color: "var(--color-accent)" }}>希望曲（2曲選択）</h3>
          {["SOUL LOVE", "HOWEVER", "サバイバル"].map((song) => (
            <label key={song} style={{ display: "block" }}>
              <input type="checkbox" checked={form.songs.includes(song)} onChange={() => handleSongChange(song)} /> {song}
            </label>
          ))}

      <h3 style={{ color: "var(--color-accent)" }}>第一希望パート</h3>

      <select name="part1" value={form.part1} onChange={handleChange} required style={selectStyle}>
        <option value="">第一希望パートを選択</option>
        <option>ギター</option><option>ベース</option><option>ドラム</option>
        <option>キーボード</option><option>ボーカル</option>
        <option>コーラス</option><option>パーカッション</option>
      </select>

      <h4 style={{ marginTop: "1rem", color: "var(--color-accent)" }}>演奏歴</h4>
      <select name="level1" value={form.level1} onChange={handleChange} required style={selectStyle}>
        <option value="">演奏歴を選択</option>
        <option>半年未満</option><option>1年未満</option><option>1〜3年</option>
        <option>3〜5年</option><option>5〜10年</option><option>10年以上</option>
      </select>

      <h4 style={{ marginTop: "1rem", color: "var(--color-accent)" }}>希望する難易度</h4>
      <select name="difficulty1" value={form.difficulty1} onChange={handleChange} required style={selectStyle}>
        <option value="">希望の難易度を選択</option>
        <option value="やさしめ">✅ やさしめ</option>
        <option value="普通">🎯 普通</option>
        <option value="チャレンジ">🔥 チャレンジ</option>
      </select>


<h3 style={{ color: "var(--color-accent)" }}>第二希望パート（任意）</h3>

<select name="part2" value={form.part2} onChange={handleChange} style={selectStyle}>
  <option value="">第二希望パートを選択（任意）</option>
  <option>ギター</option><option>ベース</option><option>ドラム</option>
  <option>キーボード</option><option>ボーカル</option>
  <option>コーラス</option><option>パーカッション</option>
</select>

<h4 style={{ marginTop: "1rem", color: "var(--color-accent)" }}>演奏歴（任意）</h4>
<select
  name="level2"
  value={form.level2}
  onChange={handleChange}
  style={selectStyle}
>
  <option value="">演奏歴を選択（任意）</option>
  <option>半年未満</option><option>1年未満</option><option>1〜3年</option>
  <option>3〜5年</option><option>5〜10年</option><option>10年以上</option>
</select>

<h4 style={{ marginTop: "1rem", color: "var(--color-accent)" }}>
  希望する難易度（任意）
</h4>
<select
  name="difficulty2"
  value={form.difficulty2}
  onChange={handleChange}
  style={selectStyle}
>
  <option value="">希望の難易度を選択（任意）</option>
  <option value="やさしめ">✅ やさしめ</option>
  <option value="普通">🎯 普通</option>
  <option value="チャレンジ">🔥 チャレンジ</option>
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

          <button type="submit" style={buttonStyle}>
            エントリーする
          </button>
        </form>
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
          現在はエントリー期間外です。
        </p>
      )}

      {status && (
        <p style={{ marginTop: "1rem", textAlign: "center", color: "gray" }}>
          {status}
        </p>
      )}
    </section>
  );
}

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
