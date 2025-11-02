"use client";
import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("参加に関して");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // マウント時に一度だけふわっと発火
    setVisible(false); // ←一旦リセット
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      setStatus("reCAPTCHA を確認してください。");
      return;
    }

    setStatus("送信中...");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, topic, message, captchaToken }),
    });

    if (res.ok) {
      setStatus("送信しました！");
      setName("");
      setEmail("");
      setTopic("参加に関して");
      setMessage("");
      setCaptchaToken("");
    } else {
      setStatus("送信に失敗しました");
    }
  };

  return (
    <section
      className={`reveal ${visible ? "visible" : ""}`}
      style={{
        minHeight: "100vh",
        padding: "8rem 1.5rem 4rem", // ← ここを4rem→6remに変更（上に余白追加）
        backgroundColor: "var(--color-background)",
        color: "var(--color-foreground)",
        textAlign: "center",
        scrollMarginTop: "80px", // ← これも追加するとページ内リンクにも対応
      }}
>
      <h1 style={{ fontSize: "2rem", color: "var(--color-accent)" }}>
        お問い合わせ
      </h1>
      <p style={{ marginTop: "1rem", color: "gray" }}>
        ご質問やご相談はこちらからお気軽にどうぞ。
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "2rem",
          maxWidth: "600px",
          marginInline: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="お名前"
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{
            padding: "0.8rem",
            borderRadius: "6px",
            border: "1px solid #444",
            backgroundColor: "#111",
            color: "white",
          }}
        >
          <option>参加に関して</option>
          <option>お支払いについて</option>
          <option>その他</option>
        </select>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="お問い合わせ内容"
          required
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
            sitekey="6Ld9bcsrAAAAAP9WT1TovVk8Vg4LxGkdXdM1yAI3"
            onChange={(token) => setCaptchaToken(token ?? "")}
            theme="dark"
          />
        </div>
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
          送信する
        </button>
      </form>

      {status && <p style={{ marginTop: "1rem", color: "gray" }}>{status}</p>}
    </section>
  );
}
