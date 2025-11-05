"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import ReCAPTCHA from "react-google-recaptcha";
import { entrySubmit } from "@/app/actions/entrySubmit";

export default function EntryPage() {
  /* ===== 型 ===== */
  type EventData = {
    id: number;
    name: string;
    event_note: string | null;
    entry_period: string | null;
    is_entry_open: boolean;
  };

  /* ===== state ===== */
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
    difficulty1: "",
    part2: "",
    level2: "",
    difficulty2: "",
    songs: [] as string[],
    availability: "",
    message: "",
  });

  /* ===== 最新イベント読み込み ===== */
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, name, event_note, entry_period, is_entry_open")
        .order("id", { ascending: false })
        .limit(1)
        .single();

      if (!error) setEvent(data);
      else setStatus("イベント情報の取得に失敗しました。");
    })();
  }, []);

  /* ===== Handler ===== */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSongChange = (song: string) => {
    setForm((prev) => {
      const exists = prev.songs.includes(song);
      const list = exists
        ? prev.songs.filter((s) => s !== song)
        : [...prev.songs, song];
      return list.length <= 2 ? { ...prev, songs: list } : prev;
    });
  };

  /* ===== Submit ===== */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!event?.is_entry_open) return setStatus("現在はエントリー期間外です。");
    if (!captchaToken) return setStatus("reCAPTCHA を確認してください。");

    if (!form.name || !form.email || !form.xaccount || !form.region)
      return setStatus("必須項目を入力してください。");

    setStatus("送信中...");

    try {
      await entrySubmit({ ...form, eventId: event.id });

      fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      window.location.href = "/entry/thanks";
    } catch {
      setStatus("送信に失敗しました。");
    }
  };

  if (!event) return <Loading />;

  /* ==========================================================
      JSX
  ========================================================== */
  return (
    <section style={section}>
      {/* ===== タイトル ===== */}
      <div style={titleArea}>
        <h1 style={titleStyle}>{event.name} Entry</h1>
      </div>

      {/* ===== イベント情報カード ===== */}
      <div style={eventCardsStyle}>
        <InfoCard label="開催予定日" value={event.event_note} />
        <InfoCard label="エントリー期間" value={event.entry_period} />
        <InfoCard label="ステータス" value={event.is_entry_open ? "募集中" : "準備中"} />
      </div>

      {/* ===== エントリーフォーム ===== */}
      {event.is_entry_open ? (
        <form onSubmit={handleSubmit} style={formStyle}>
          <EntryInput name="name" placeholder="ニックネーム" required />
          <EntryInput name="email" placeholder="メールアドレス" type="email" required />
          <EntryInput name="xaccount" placeholder="Xアカウント（@なし）" required />

          <Label>地域（都道府県）</Label>
          <Select name="region" value={form.region} required options={jpPrefectures} />

          <Label>希望曲（2曲まで）</Label>
          {["SOUL LOVE", "HOWEVER", "サバイバル"].map((song) => (
            <Checkbox
              key={song}
              song={song}
              checked={form.songs.includes(song)}
              onChange={handleSongChange}
            />
          ))}

          <Label>第一希望パート</Label>
          <Select name="part1" value={form.part1} required options={parts} />

          <Label small>演奏歴</Label>
          <Select name="level1" value={form.level1} required options={levels} />

          <Label small>希望する難易度</Label>
          <Select name="difficulty1" value={form.difficulty1} required options={difficulties} />

          {/* ===== 第二希望 ===== */}
          <Label>第二希望パート（任意）</Label>
          <Select name="part2" value={form.part2} options={parts} />

          <Label small>演奏歴（任意）</Label>
          <Select name="level2" value={form.level2} options={levels} />

          <Label small>希望する難易度（任意）</Label>
          <Select name="difficulty2" value={form.difficulty2} options={difficulties} />

          <Label>参加可能日</Label>
          <textarea
            name="availability"
            value={form.availability}
            onChange={handleChange}
            style={textareaStyle}
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="メッセージ（任意）"
            style={textareaStyle}
          />

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

  /* ===== Sub Components ===== */
  function EntryInput(props: {
    name: keyof typeof form;
    type?: string;
    placeholder?: string;
    required?: boolean;
  }) {
    return (
      <input
        {...props}
        value={form[props.name]}
        onChange={handleChange}
        style={inputStyle}
      />
    );
  }

  function Checkbox({
    song,
    checked,
    onChange,
  }: {
    song: string;
    checked: boolean;
    onChange: (song: string) => void;
  }) {
    return (
      <label style={{ display: "block" }}>
        <input type="checkbox" checked={checked} onChange={() => onChange(song)} /> {song}
      </label>
    );
  }

  function Select({
    name,
    value,
    required,
    options,
  }: {
    name: keyof typeof form;
    value: string;
    required?: boolean;
    options: string[];
  }) {
    return (
      <select name={name} value={value} required={required} onChange={handleChange} style={selectStyle}>
        <option value="">選択してください</option>
        {options.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>
    );
  }

  function Label({ children, small }: { children: React.ReactNode; small?: boolean }) {
    return <h3 style={small ? labelSmall : labelStyle}>{children}</h3>;
  }

  function InfoCard({ label, value }: { label: string; value: string | null }) {
    return (
      <div style={boxStyle}>
        <p style={labelMain}>{label}</p>
        <p style={boxText}>{value ?? "調整中"}</p>
      </div>
    );
  }
}

/* ===== options ===== */
const parts = ["ギター", "ベース", "ドラム", "キーボード", "ボーカル", "コーラス", "パーカッション"];
const levels = ["半年未満", "1年未満", "1〜3年", "3〜5年", "5〜10年", "10年以上"];
const difficulties = ["✅ やさしめ", "🎯 普通", "🔥 チャレンジ", "✨ お任せ"];

const jpPrefectures = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"];

/* ===== Style ===== */
const section: React.CSSProperties = {
  minHeight: "100vh",
  padding: "6rem 2rem",
  backgroundColor: "#000",
  color: "white",
  lineHeight: 1.5,
};

const titleArea: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "2rem",
};

const titleStyle: React.CSSProperties = {
  fontSize: "2.4rem",
  fontWeight: "bold",
  color: "var(--color-accent)",
  textTransform: "uppercase",
  borderBottom: "2px solid var(--color-accent)",
  display: "inline-block",
  paddingBottom: "0.5rem",
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
  gap: "1.7rem",
};

const boxStyle: React.CSSProperties = {
  border: "1px solid var(--color-accent)",
  borderRadius: "10px",
  padding: "1.5rem",
  textAlign: "center",
  minWidth: "200px",
};

const labelMain = { color: "var(--color-accent)", fontWeight: "bold" };
const boxText = { fontSize: "1.3rem", fontWeight: "bold" };

const labelStyle = { marginBottom: "0.4rem", color: "var(--color-accent)", fontWeight: "bold" };
const labelSmall = { fontSize: "0.9rem", color: "var(--color-accent)", marginBottom: "0.2rem" };

const inputStyle: React.CSSProperties = {
  padding: "1rem",
  borderRadius: "8px",
  border: "1px solid #555",
  backgroundColor: "#111",
  color: "white",
  fontSize: "1rem",
};

const selectStyle: React.CSSProperties = { ...inputStyle };
const textareaStyle: React.CSSProperties = { ...inputStyle, minHeight: "100px" };
const buttonStyle: React.CSSProperties = {
  ...inputStyle,
  border: "1px solid var(--color-accent)",
  color: "var(--color-accent)",
  cursor: "pointer",
  fontWeight: "bold",
};

function Loading() {
  return <section style={{ padding: "4rem", textAlign: "center", color: "white" }}>読み込み中...</section>;
}
