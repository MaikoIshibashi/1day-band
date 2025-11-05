"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import ReCAPTCHA from "react-google-recaptcha";
import { entrySubmit } from "@/app/actions/entrySubmit";

export default function EntryPage() {
  type EventData = {
    id: number;
    name: string;
    event_note: string | null;
    entry_period: string | null;
    is_entry_open: boolean;
  };

  const [event, setEvent] = useState<EventData | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [status, setStatus] = useState("");

  // 入力フォーム
  const [form, setForm] = useState({
    name: "",
    email: "",
    xaccount: "",
    region: "",
    part1: "",
    level1: "",
    difficulty1: "",
    part2: "",
    level2: "",
    difficulty2: "",
    songs: [] as string[],
    plan: "",
    availability: "",
    message: "",
  });

  // === イベント情報読み込み ===
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

  // === 送信 ===
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
    <section style={sectionStyle}>
      {/* ===== タイトル ===== */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={titleStyle}>{event.name} Entry</h1>
      </div>

      {/* ===== イベント情報カード ===== */}
      <div style={eventInfoWrapper}>
        <div style={boxStyle}>
          <p style={labelMain}>開催予定日</p>
          <p style={boxText}>{event.event_note || "調整中"}</p>
        </div>
        <div style={boxStyle}>
          <p style={labelMain}>エントリー期間</p>
          <p style={{ whiteSpace: "pre-line" }}>{event.entry_period || "調整中"}</p>
        </div>
        <div style={boxStyle}>
          <p style={labelMain}>ステータス</p>
          <p style={boxText}>{event.is_entry_open ? "募集中" : "準備中"}</p>
        </div>
      </div>

      {/* ===== FORM ===== */}
      {event.is_entry_open ? (
        <form onSubmit={handleSubmit} style={formWrapper}>
          {/* 基本情報 */}
          <input name="name" value={form.name} onChange={handleChange} placeholder="ニックネーム" required style={inputStyle} />
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="メールアドレス" required style={inputStyle} />
          <input name="xaccount" value={form.xaccount} onChange={handleChange} placeholder="Xアカウント（@なし）" required style={inputStyle} />

          {/* 地域 */}
          <label style={labelStyle}>地域（都道府県）</label>
          <select name="region" value={form.region} onChange={handleChange} required style={selectStyle}>
            <option value="">都道府県を選択</option>
            {jpPrefectures.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          {/* 希望曲 */}
          <label style={labelStyle}>希望曲（2曲選択）</label>
          {["SOUL LOVE", "HOWEVER", "サバイバル"].map((song) => (
            <label key={song} style={{ display: "block" }}>
              <input type="checkbox" checked={form.songs.includes(song)} onChange={() => handleSongChange(song)} /> {song}
            </label>
          ))}

          {/* ===== 第一希望 ===== */}
          <label style={labelStyle}>第一希望パート</label>
          <select name="part1" value={form.part1} onChange={handleChange} required style={selectStyle}>
            <option value="">第一希望パートを選択</option>
            {parts.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          <label style={labelStyle}>演奏歴</label>
          <select name="level1" value={form.level1} onChange={handleChange} required style={selectStyle}>
            <option value="">演奏歴を選択</option>
            {levels.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>

          <label style={labelStyle}>希望する難易度</label>
          <select name="difficulty1" value={form.difficulty1} onChange={handleChange} required style={selectStyle}>
            <option value="">難易度を選択</option>
            {difficulties.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>

          {/* ===== 第二希望 ===== */}
          <label style={labelStyle}>第二希望パート（任意）</label>
          <select name="part2" value={form.part2} onChange={handleChange} style={selectStyle}>
            <option value="">第二希望パートを選択</option>
            {parts.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          <label style={labelStyle}>演奏歴（任意）</label>
          <select name="level2" value={form.level2} onChange={handleChange} style={selectStyle}>
            <option value="">演奏歴を選択</option>
            {levels.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>

          <label style={labelStyle}>希望する難易度（任意）</label>
          <select name="difficulty2" value={form.difficulty2} onChange={handleChange} style={selectStyle}>
            <option value="">難易度を選択</option>
            {difficulties.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>

          {/* 参加可能日 */}
          <label style={labelStyle}>参加可能日</label>
          <textarea name="availability" value={form.availability} onChange={handleChange} placeholder="例）土曜は参加できません／10月下旬は不可 など" style={textareaStyle} />

          <label style={labelStyle}>メッセージ（任意）</label>
          <textarea name="message" value={form.message} onChange={handleChange} style={textareaStyle} />

          {/* reCAPTCHA */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReCAPTCHA
              sitekey="6Ld9bcsrAAAAAP9WT1TovVk8Vg4LxGkdXdM1yAI3"
              onChange={(token) => setCaptchaToken(token ?? "")}
              theme="dark"
            />
          </div>

          <button type="submit" style={buttonStyle}>エントリーする</button>
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

/* ───────── options ───────── */
const parts = ["ギター", "ベース", "ドラム", "キーボード", "ボーカル", "コーラス", "パーカッション"];
const levels = ["半年未満", "1年未満", "1〜3年", "3〜5年", "5〜10年", "10年以上"];
const difficulties = [
  { label: "🤝 お任せ", value: "お任せ" },
  { label: "✅ やさしめ", value: "やさしめ" },
  { label: "🎯 普通", value: "普通" },
  { label: "🔥 チャレンジ", value: "チャレンジ" },
];
const jpPrefectures = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"];

/* ───────── styles ───────── */
const sectionStyle = {
  minHeight: "100vh",
  padding: "6rem 2rem",
  backgroundColor: "#000",
  color: "white",
  lineHeight: 1.7,
};

const eventInfoWrapper = {
  display: "flex",
  justifyContent: "center",
  gap: "1.5rem",
  flexWrap: "wrap",
  marginBottom: "3rem",
};

const boxStyle = {
  border: "1px solid var(--color-accent)",
  borderRadius: "10px",
  padding: "1.5rem",
  textAlign: "center" as const,
  minWidth: "200px",
};

const labelMain = { color: "var(--color-accent)", fontWeight: "bold" };
const labelStyle = { marginBottom: "0.3rem", color: "var(--color-accent)", fontWeight: "bold" };
const boxText = { fontSize: "1.3rem", fontWeight: "bold" };
const titleStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "var(--color-accent)",
  textTransform: "uppercase",
  borderBottom: "2px solid var(--color-accent)",
  display: "inline-block",
  paddingBottom: "0.4rem",
};
const formWrapper = {
  maxWidth: "600px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "1.3rem",
};
const inputStyle = {
  padding: "1rem",
  borderRadius: "8px",
  border: "1px solid #555",
  backgroundColor: "#111",
  color: "white",
  fontSize: "1rem",
};
const selectStyle = { ...inputStyle };
const textareaStyle = { ...inputStyle, minHeight: "100px" };
const buttonStyle = {
  ...inputStyle,
  border: "1px solid var(--color-accent)",
  color: "var(--color-accent)",
  cursor: "pointer",
  fontWeight: "bold",
};
