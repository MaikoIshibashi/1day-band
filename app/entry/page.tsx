"use client";
import { useState, useEffect } from "react";
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

  type FormData = {
    name: string;
    email: string;
    xaccount: string;
    region: string;
    songs: string[];
    part1: string;
    level1: string;
    difficulty1: string;
    part2: string;
    level2: string;
    difficulty2: string;
    availability: string;
    message: string;
  };

  /* ===== state ===== */
  const [event, setEvent] = useState<EventData | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [status, setStatus] = useState("");

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    xaccount: "",
    region: "",
    songs: [],
    part1: "",
    level1: "",
    difficulty1: "",
    part2: "",
    level2: "",
    difficulty2: "",
    availability: "",
    message: "",
  });

  /* ===== 最新イベント読み込み ===== */
  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, name, event_note, entry_period, is_entry_open")
        .order("id", { ascending: false })
        .limit(1)
        .single();

      if (!error) setEvent(data);
      else setStatus("イベント情報の取得に失敗しました。");
    };
    fetchEvent();
  }, []);

  /* ===== 共通 change ===== */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  /* ===== 曲選択（最大2つ） ===== */
  const handleSongChange = (song: string) => {
    setForm((prev) => {
      const selected = prev.songs.includes(song)
        ? prev.songs.filter((s) => s !== song)
        : [...prev.songs, song];

      return selected.length > 2 ? prev : { ...prev, songs: selected };
    });
  };

  /* ===== Submit ===== */
  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <section style={section}>
      {/* ===== タイトル ===== */}
      <div style={titleArea}>
        <h1 style={titleStyle}>{event.name} Entry</h1>
      </div>

      {/* ===== イベント情報 ===== */}
      <div style={eventCardsStyle}>
        <InfoCard label="開催予定日" value={event.event_note || "調整中"} />
        <InfoCard label="エントリー期間" value={event.entry_period || "調整中"} />
        <InfoCard
          label="ステータス"
          value={event.is_entry_open ? "募集中" : "準備中"}
        />
      </div>

      {/* ===== エントリーフォーム ===== */}
      {event.is_entry_open ? (
        <form onSubmit={handleSubmit} style={formStyle}>
          {/* ---- 基本情報 ---- */}
          <EntryInput name="name" placeholder="ニックネーム" required />
          <EntryInput name="email" type="email" placeholder="メールアドレス" required />
          <EntryInput
            name="xaccount"
            placeholder="Xアカウント（@なし）"
            required
          />

          {/* ---- 地域 ---- */}
          <Field label="地域（都道府県）">
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              required
              style={selectStyle}
            >
              <option value="">都道府県を選択</option>
              {jpPrefectures.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>

          {/* ---- 希望曲 ---- */}
          <Field label="希望曲（最大2曲）">
            {["SOUL LOVE", "HOWEVER", "サバイバル"].map((song) => (
              <Checkbox
                key={song}
                song={song}
                checked={form.songs.includes(song)}
                onChange={handleSongChange}
              />
            ))}
          </Field>

          {/* ---- 第一希望 ---- */}
          <GroupBox title="🎸 第一希望パート">
            <Field label="パート">
              <SelectWithOptions name="part1" value={form.part1} required options={parts} />
            </Field>

            <Field label="演奏歴">
              <SelectWithOptions name="level1" value={form.level1} required options={levels} />
            </Field>

            <Field label="希望難易度">
              <SelectWithOptions
                name="difficulty1"
                value={form.difficulty1}
                required
                options={difficulties}
              />
            </Field>
          </GroupBox>

          {/* ---- 第二希望 ---- */}
          <GroupBox title="🎤 第二希望パート（任意）">
            <Field label="パート（任意）">
              <SelectWithOptions name="part2" value={form.part2} options={parts} />
            </Field>

            <Field label="演奏歴（任意）">
              <SelectWithOptions name="level2" value={form.level2} options={levels} />
            </Field>

            <Field label="希望難易度（任意）">
              <SelectWithOptions name="difficulty2" value={form.difficulty2} options={difficulties} />
            </Field>
          </GroupBox>

          {/* ---- 参加可能日 ---- */}
          <Field label="参加可能日">
            <textarea
              name="availability"
              value={form.availability}
              onChange={handleChange}
              style={textareaStyle}
            />
          </Field>

          {/* ---- メッセージ ---- */}
          <Field label="メッセージ（任意）">
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              style={textareaStyle}
            />
          </Field>

          {/* ---- reCAPTCHA ---- */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReCAPTCHA
              sitekey="6Ld9bcsrAAAAAP9WT1TovVk8Vg4LxGkdXdM1yAI3"
              onChange={(t) => setCaptchaToken(t ?? "")}
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
        <p style={{ textAlign: "center", marginTop: "1rem" }}>{status}</p>
      )}
    </section>
  );

  /* ===== sub components ===== */
  function EntryInput({
    name,
    type = "text",
    placeholder,
    required,
  }: {
    name: keyof FormData;
    type?: string;
    placeholder: string;
    required?: boolean;
  }) {
    return (
      <Field label={placeholder}>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={form[name]}
          onChange={handleChange}
          style={inputStyle}
        />
      </Field>
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
      <label style={checkboxRow}>
        <input type="checkbox" checked={checked} onChange={() => onChange(song)} />{" "}
        {song}
      </label>
    );
  }

  function SelectWithOptions({
    name,
    value,
    required,
    options,
  }: {
    name: keyof FormData;
    value: string;
    required?: boolean;
    options: string[];
  }) {
    return (
      <select
        name={name}
        value={value}
        required={required}
        onChange={handleChange}
        style={selectStyle}
      >
        <option value="">選択してください</option>
        {options.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>
    );
  }
}

/* ===== グループ化 / UI ===== */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={field}>
      <div style={fieldLabel}>{label}</div>
      {children}
    </div>
  );
}

function GroupBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={boxGroup}>
      <div style={groupTitle}>{title}</div>
      {children}
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={boxStyle}>
      <p style={labelMain}>{label}</p>
      <p style={boxValue}>{value}</p>
    </div>
  );
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
  lineHeight: 1.6,
};

const titleArea = {
  textAlign: "center" as const,
  marginBottom: "3rem",
};

const titleStyle = {
  fontSize: "2.6rem",
  fontWeight: 800,
  color: "var(--color-accent)",
  textTransform: "uppercase" as const,
  borderBottom: "2px solid var(--color-accent)",
  paddingBottom: "0.4rem",
  display: "inline-block",
};

const eventCardsStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "1.5rem",
  flexWrap: "wrap" as const,
  marginBottom: "3rem",
};

const formStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column" as const,
  gap: "1.8rem",
};

const field = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "0.4rem",
};

const fieldLabel = {
  color: "var(--color-accent)",
  fontWeight: "bold",
  fontSize: "0.95rem",
};

const boxGroup = {
  border: "1px solid var(--color-accent)",
  borderRadius: "12px",
  padding: "1.2rem",
  marginTop: "1rem",
};

const groupTitle = {
  color: "var(--color-accent)",
  fontWeight: "bold",
  marginBottom: "0.8rem",
};

const boxStyle = {
  border: "1px solid var(--color-accent)",
  borderRadius: "12px",
  padding: "1.5rem",
  textAlign: "center" as const,
  minWidth: "200px",
};

const labelMain = { color: "var(--color-accent)", fontWeight: "bold" };
const boxValue = { fontSize: "1.3rem", fontWeight: 700 };

const checkboxRow = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const inputStyle = {
  padding: "0.8rem 1rem",
  borderRadius: "10px",
  border: "1px solid #555",
  backgroundColor: "#111",
  color: "white",
};

const selectStyle = { ...inputStyle };
const textareaStyle = { ...inputStyle, minHeight: "140px" };
const buttonStyle = {
  ...inputStyle,
  border: "1px solid var(--color-accent)",
  color: "var(--color-accent)",
  cursor: "pointer",
  fontWeight: "bold",
};

function Loading() {
  return <section style={{ padding: "4rem", textAlign: "center", color: "white" }}>読み込み中...</section>;
}
