"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import ReCAPTCHA from "react-google-recaptcha";
import { entrySubmit } from "@/app/actions/entrySubmit";

/* ================================
   子コンポーネント (必ずここに置く)
================================ */

/* ---- Field ---- */
function Field(props: { label: string; children: React.ReactNode }) {
  return (
    <div style={field}>
      <label style={fieldLabel}>{props.label}</label>
      {props.children}
    </div>
  );
}

/* ---- Input ---- */
function EntryInput(props: {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { name, label, type = "text", placeholder, required, value, onChange } = props;
  return (
    <Field label={label}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        style={inputStyle}
      />
    </Field>
  );
}

/* ---- Select ---- */
function SelectWithOptions(props: {
  name: string;
  value: string;
  required?: boolean;
  options?: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const { name, value, required, options = [], onChange } = props;
  return (
    <select name={name} value={value} required={required} onChange={onChange} style={selectStyle}>
      <option value="">選択してください</option>
      {options.map((p) => (
        <option key={p}>{p}</option>
      ))}
    </select>
  );
}

/* ---- Checkbox ---- */
function Checkbox(props: {
  song: string;
  checked: boolean;
  onChange: (song: string) => void;
}) {
  return (
    <label style={checkboxRow}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={() => props.onChange(props.song)}
      />
      {props.song}
    </label>
  );
}

/* ---- Group Box ---- */
function GroupBox(props: { title: string; children: React.ReactNode }) {
  return (
    <div style={boxGroup}>
      <div style={groupTitle}>{props.title}</div>
      {props.children}
    </div>
  );
}

/* ---- Info Card ---- */
function InfoCard(props: { label: string; value: string }) {
  return (
    <div style={boxStyle}>
      <p style={labelMain}>{props.label}</p>
      <p style={boxValue}>{props.value}</p>
    </div>
  );
}

/* ================================
   メインページ
================================ */

const parts = ["ギター","ベース","ドラム","キーボード","ボーカル","コーラス","パーカッション"] as const;
const levels = ["半年未満","1年未満","1〜3年","3〜5年","5〜10年","10年以上"] as const;
const difficulties = ["✅ やさしめ","🎯 普通","🔥 チャレンジ","✨ お任せ"] as const;

const jpPrefectures = [
  "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
  "新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
  "奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
  "熊本県","大分県","宮崎県","鹿児島県","沖縄県",
] as const;

type EventData = {
  id: number;
  name: string;
  event_note: string | null;
  entry_period: string | null;
  is_entry_open: boolean;
};

export default function EntryPage() {
  const [event, setEvent] = useState<EventData | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    xaccount: "",
    region: "",
    songs: [] as string[],
    part1: "",
    level1: "",
    difficulty1: "",
    part2: "",
    level2: "",
    difficulty2: "",
    availability: "",
    message: "",
  });

  /* イベント読み込み */
  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await supabase
        .from("events")
        .select("id, name, event_note, entry_period, is_entry_open")
        .order("id", { ascending: false })
        .limit(1)
        .single();
      setEvent(data);
    };
    fetchEvent();
  }, []);

  /* 入力共通 */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* ✔ 曲（最大2つ） */
  const handleSongChange = (song: string) => {
    setForm((prev) => {
      const selected = prev.songs.includes(song)
        ? prev.songs.filter((s) => s !== song)
        : [...prev.songs, song];

      return selected.length > 2 ? prev : { ...prev, songs: selected };
    });
  };

  /* 送信 */
/* 送信 */
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!event?.is_entry_open) return setStatus("現在はエントリー期間外です。");
  if (!captchaToken) return setStatus("reCAPTCHA を確認してください。");

  setStatus("送信中...");

  try {
    await entrySubmit({
      name: form.name,
      email: form.email,
      xaccount: form.xaccount,
      region: form.region,

      part1: form.part1,
      level1: form.level1,
      difficulty1: form.difficulty1,

      part2: form.part2 || "",
      level2: form.level2 || "",
      difficulty2: form.difficulty2 || "",

      songs: form.songs,
      availability: form.availability,
      message: form.message || "",

      eventId: event.id,
    });

    // ✅ メール送信
    await fetch("/api/send-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        xaccount: form.xaccount,
        region: form.region,
        part1: form.part1,
        level1: form.level1,
        difficulty1: form.difficulty1,
        part2: form.part2,
        level2: form.level2,
        difficulty2: form.difficulty2,
        songs: form.songs,
        availability: form.availability,
        message: form.message,
      }),
    });

    window.location.href = "/entry/thanks";
  } catch (err) {
    console.error(err);
    setStatus("送信に失敗しました。");
  }
};


  if (!event) return <p style={{ color: "white" }}>読み込み中...</p>;

  return (
    <section style={section}>
      <div style={titleArea}>
        <h1 style={titleStyle}>{event.name} Entry</h1>
      </div>

      <div style={eventCardsStyle}>
        <InfoCard label="開催予定日" value={event.event_note ?? "調整中"} />
        <InfoCard label="エントリー期間" value={event.entry_period ?? "調整中"} />
        <InfoCard label="ステータス" value={event.is_entry_open ? "募集中" : "準備中"} />
      </div>
{/* ✅ エントリー前のガイドライン */}
{/* ✅ エントリー前のガイドライン */}
<div
  style={{
    border: "1px solid var(--color-accent)",
    borderRadius: "12px",
    padding: "1.2rem",
    marginTop: "2rem",
    maxWidth: "600px",
    marginInline: "auto",
  }}
>
  <p style={{ fontWeight: "bold", color: "var(--color-accent)" }}>
    ✅ エントリー前にご確認ください
  </p>

  <p>参加にあたってのルールや注意事項をまとめています。</p>

  <p>
    ガイドラインをご確認のうえエントリーをお願いします。<br />
    エントリーをいただいた時点で同意いただいたものとみなします。
  </p>

  {/* ✨ 🔗 ここがリンク部分（復活） */}
  <a
    href="/guideline"
    style={{
      display: "inline-block",
      marginTop: "0.8rem",
      color: "var(--color-accent)",
      textDecoration: "underline",
      fontWeight: 600,
    }}
  >
    ▶ ガイドライン / 注意事項を読む
  </a>
</div>


      {event.is_entry_open ? (
        <form onSubmit={handleSubmit} style={formStyle}>
          <EntryInput name="name" label="ニックネーム" value={form.name} onChange={handleChange} />
          <EntryInput name="email" type="email" label="メールアドレス" value={form.email} onChange={handleChange} />
          <EntryInput name="xaccount" label="Xアカウント（@なし）" value={form.xaccount} onChange={handleChange} />

          <Field label="地域（都道府県）">
            <SelectWithOptions name="region" value={form.region} options={jpPrefectures as unknown as string[]} onChange={handleChange} required />
          </Field>

          <Field label="希望曲（最大2曲）">
            {["SOUL LOVE", "HOWEVER", "サバイバル"].map((song) => (
              <Checkbox key={song} song={song} checked={form.songs.includes(song)} onChange={handleSongChange} />
            ))}
          </Field>

          <GroupBox title="🎸 第一希望パート">
            <Field label="パート">
              <SelectWithOptions name="part1" value={form.part1} options={parts as unknown as string[]} onChange={handleChange} required />
            </Field>
            <Field label="演奏歴">
              <SelectWithOptions name="level1" value={form.level1} options={levels as unknown as string[]} onChange={handleChange} required />
            </Field>
            <Field label="難易度">
              <SelectWithOptions name="difficulty1" value={form.difficulty1} options={difficulties as unknown as string[]} onChange={handleChange} required />
            </Field>
          </GroupBox>

          <GroupBox title="🎤 第二希望パート（任意）">
            <Field label="パート">
              <SelectWithOptions name="part2" value={form.part2} options={parts as unknown as string[]} onChange={handleChange} />
            </Field>
            <Field label="演奏歴">
              <SelectWithOptions name="level2" value={form.level2} options={levels as unknown as string[]} onChange={handleChange} />
            </Field>
            <Field label="難易度">
              <SelectWithOptions name="difficulty2" value={form.difficulty2} options={difficulties as unknown as string[]} onChange={handleChange} />
            </Field>
          </GroupBox>

          <Field label="🗓 参加が難しい日（調整のために教えてください）">
            <textarea name="availability" value={form.availability} onChange={handleChange} style={textareaStyle} />
          </Field>

          <Field label="メッセージ（任意）">
            <textarea name="message" value={form.message} onChange={handleChange} style={textareaStyle} />
          </Field>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReCAPTCHA sitekey="6Ld9bcsrAAAAAP9WT1TovVk8Vg4LxGkdXdM1yAI3" onChange={(t) => setCaptchaToken(t ?? "")} theme="dark" />
          </div>

          <button type="submit" style={buttonStyle}>エントリーする</button>
        </form>
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
          現在はエントリー期間外です。
        </p>
      )}

      {status && <p style={{ textAlign: "center", marginTop: "1rem" }}>{status}</p>}
    </section>
  );
}

/* ================================
   Styles
================================ */
const section: React.CSSProperties = {
  minHeight: "100vh",
  padding: "6rem 2rem",
  backgroundColor: "#000",
  color: "white",
  lineHeight: 1.6,
};

const titleArea: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "3rem",
};

const titleStyle: React.CSSProperties = {
  fontSize: "2.6rem",
  fontWeight: 800,
  color: "var(--color-accent)",
  textTransform: "uppercase",
  borderBottom: "2px solid var(--color-accent)",
  paddingBottom: "0.4rem",
  display: "inline-block",
};

const eventCardsStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "1.5rem",
  flexWrap: "wrap",
  marginBottom: "3rem",
};

const formStyle: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "1.8rem",
};

const field: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
};
const fieldLabel: React.CSSProperties = {
  color: "var(--color-accent)",
  fontWeight: "bold",
  fontSize: "0.95rem",
};

const boxGroup: React.CSSProperties = {
  border: "1px solid var(--color-accent)",
  borderRadius: "12px",
  padding: "1.2rem",
  marginTop: "1rem",
};

const groupTitle: React.CSSProperties = {
  color: "var(--color-accent)",
  fontWeight: "bold",
  marginBottom: "0.8rem",
};

const boxStyle: React.CSSProperties = {
  border: "1px solid var(--color-accent)",
  borderRadius: "12px",
  padding: "1.5rem",
  textAlign: "center",
  minWidth: "200px",
};

const labelMain: React.CSSProperties = { color: "var(--color-accent)", fontWeight: "bold" };
const boxValue: React.CSSProperties = { fontSize: "1.3rem", fontWeight: 700 };

const checkboxRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const inputStyle: React.CSSProperties = {
  padding: "0.8rem 1rem",
  borderRadius: "10px",
  border: "1px solid #555",
  backgroundColor: "#111",
  color: "white",
};

const selectStyle: React.CSSProperties = { ...inputStyle };
const textareaStyle: React.CSSProperties = { ...inputStyle, minHeight: "140px", resize: "vertical" };
const buttonStyle: React.CSSProperties = {
  ...inputStyle,
  border: "1px solid var(--color-accent)",
  color: "var(--color-accent)",
  cursor: "pointer",
  fontWeight: "bold",
};
