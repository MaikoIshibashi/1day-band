"use client";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";


export default function EntryPage() {

  const [captchaToken, setCaptchaToken] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    xaccount: "",
    part1: "",
    level1: "",
    part2: "",
    level2: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // ===== エントリー期間設定（仮の日付） =====
  const entryStart = new Date("2025-09-16T00:00:00");
  const entryEnd = new Date("2025-09-30T23:59:59");
  const now = new Date();
  const isEntryPeriod = now >= entryStart && now <= entryEnd;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ===== 入力チェック =====
    if (!form.name.trim()) {
      setStatus("ニックネームを入力してください。");
      return;
    }

    if (!form.email.trim()) {
      setStatus("メールアドレスを入力してください。");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus("メールアドレスの形式が正しくありません。");
      return;
    }

    if (!form.xaccount.trim()) {
      setStatus("Xのアカウントを入力してください。");
      return;
    }

    if (!form.part1) {
      setStatus("第一希望のパートを選択してください。");
      return;
    }

    if (!form.level1) {
      setStatus("第一希望の演奏歴を選択してください。");
      return;
    }

    if (form.part2 && !form.level2) {
      setStatus("第二希望の演奏歴を選択してください。");
      return;
    }
    if (!captchaToken) {
      setStatus("reCAPTCHA を確認してください。");
      return;
    }

    // ===== 送信処理 =====
    setStatus("送信中...");

    try {
      const res = await fetch("/api/entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          captchaToken, // 👈 reCAPTCHA トークンを一緒に送る
        }),
      });


      if (res.ok) {
          window.location.href = "/entry/thanks"; // サンクスページに遷移
      } else {
        setStatus("送信に失敗しました。もう一度お試しください。");
      }
} catch (err) {
  console.error(err);  // ← 追加
  setStatus("送信に失敗しました");
}
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "4rem",
        backgroundColor: "#000",
        color: "white",
      }}
    >
      <h1
        className="fade-in-up"
        style={{
          fontSize: "2rem",
          color: "var(--color-accent)",
          textAlign: "center",
        }}
      >
        4th 参加エントリー
      </h1>

      <p
        className="reveal"
        style={{
          textAlign: "center",
          marginTop: "1rem",
          color: "gray",
        }}
      >
        エントリー期間: 2025/09/20 ～ 2025/09/30
      </p>

      {isEntryPeriod ? (
        <>
          <p
            className="reveal"
            style={{
              textAlign: "center",
              marginTop: "1rem",
              color: "gray",
            }}
          >
            必要事項を入力して「エントリー」を押してください。<br />
            存在しないメールアドレスやXアカウントを指定した場合はエントリー対象外とさせていただきます。<br />
          </p>

          <form
            onSubmit={handleSubmit}
            className="reveal"
            style={{
              marginTop: "2rem",
              maxWidth: "600px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="ニックネーム"
              required
              style={{
                padding: "0.8rem",
                borderRadius: "6px",
                border: "1px solid #444",
                backgroundColor: "#111",
                color: "white",
              }}
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="メールアドレス"
              required
              style={{
                padding: "0.8rem",
                borderRadius: "6px",
                border: "1px solid #444",
                backgroundColor: "#111",
                color: "white",
              }}
            />

            <input
              name="xaccount"
              value={form.xaccount}
              onChange={handleChange}
              placeholder="X（旧Twitter）アカウント @なしで入力"
              required
              style={{
                padding: "0.8rem",
                borderRadius: "6px",
                border: "1px solid #444",
                backgroundColor: "#111",
                color: "white",
              }}
            />

            {/* 第一希望 */}
            <h3 style={{ marginTop: "1rem", color: "var(--color-accent)" }}>
              🎸 第一希望
            </h3>
            <select
              name="part1"
              value={form.part1}
              onChange={handleChange}
              required
              style={{
                padding: "0.8rem",
                borderRadius: "6px",
                border: "1px solid #444",
                backgroundColor: "#111",
                color: "white",
              }}
            >
              <option value="">第一希望パートを選択</option>
              <option>ギター</option>
              <option>ベース</option>
              <option>ドラム</option>
              <option>キーボード</option>
              <option>ボーカル</option>
            </select>

            <select
              name="level1"
              value={form.level1}
              onChange={handleChange}
              required
              style={{
                padding: "0.8rem",
                borderRadius: "6px",
                border: "1px solid #444",
                backgroundColor: "#111",
                color: "white",
              }}
            >
              <option value="">演奏歴を選択</option>
              <option>歴3年未満</option>
              <option>歴3年以上5年未満</option>
              <option>5年以上10年未満</option>
              <option>10年以上</option>
            </select>

            {/* 第二希望 */}
            <h3 style={{ marginTop: "1rem", color: "var(--color-accent)" }}>
              🎶 第二希望
            </h3>
            <select
              name="part2"
              value={form.part2}
              onChange={handleChange}
              style={{
                padding: "0.8rem",
                borderRadius: "6px",
                border: "1px solid #444",
                backgroundColor: "#111",
                color: "white",
              }}
            >
              <option value="">第二希望パートを選択（任意）</option>
              <option>ギター</option>
              <option>ベース</option>
              <option>ドラム</option>
              <option>キーボード</option>
              <option>ボーカル</option>
            </select>

            <select
              name="level2"
              value={form.level2}
              onChange={handleChange}
              style={{
                padding: "0.8rem",
                borderRadius: "6px",
                border: "1px solid #444",
                backgroundColor: "#111",
                color: "white",
              }}
            >
              <option value="">演奏歴を選択（任意）</option>
              <option>歴3年未満</option>
              <option>歴3年以上5年未満</option>
              <option>5年以上10年未満</option>
              <option>10年以上</option>
            </select>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="メッセージ（任意）"
              style={{
                padding: "0.8rem",
                borderRadius: "6px",
                border: "1px solid #444",
                backgroundColor: "#111",
                color: "white",
                minHeight: "120px",
              }}
            />
      <div style={{ display: "flex", justifyContent: "center" }}>

<ReCAPTCHA
  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
  onChange={(token: string | null) => setCaptchaToken(token ?? "")}
  theme="dark"
/></div>
            <button
              type="submit"
              style={{
                padding: "0.8rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "var(--color-accent)",
                color: "white",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              エントリー
            </button>
          </form>
        </>
      ) : (
        <p
          style={{
            marginTop: "2rem",
            textAlign: "center",
            color: "red",
            fontSize: "1.2rem",
          }}
        >
          現在はエントリー期間外です。
        </p>
      )}

      {status && (
        <p
          style={{
            marginTop: "1rem",
            textAlign: "center",
            color: "gray",
          }}
        >
          {status}
        </p>
      )}
    </section>
  );
}
