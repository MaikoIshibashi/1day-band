"use client";
import { useState } from "react";

export default function MembersPage() {
  const [input, setInput] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const PASSWORD = "glay2025"; // ←好きなパスワードに変更してね

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      setAuthorized(true);
    } else {
      alert("パスワードが違います");
    }
  };

  if (!authorized) {
    return (
      <section style={{ padding: "4rem", textAlign: "center" }}>
        <h2 style={{ color: "var(--color-accent)" }}>4thメンバー専用ページ</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="パスワードを入力"
            style={{
              padding: "0.8rem",
              borderRadius: "6px",
              border: "1px solid #444",
              backgroundColor: "#111",
              color: "white",
            }}
          />
          <button
            type="submit"
            style={{
              marginLeft: "1rem",
              padding: "0.8rem 1.2rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "var(--color-accent)",
              color: "white",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </section>
    );
  }

  return (
    <section style={{ padding: "4rem", textAlign: "center" }}>
      <h2 style={{ color: "var(--color-accent)" }}>🎸 メンバー専用ページ 🎸</h2>
      <p>ここに現メンバーだけへの連絡事項や資料リンクを書けるよ！</p>
    </section>
  );
}
