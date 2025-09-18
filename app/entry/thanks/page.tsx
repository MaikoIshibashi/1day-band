export default function EntryThanksPage() {
  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "4rem",
        backgroundColor: "#000",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", color: "var(--color-accent)" }}>
        🎶 エントリーありがとうございます！
      </h1>
      <p style={{ marginTop: "1rem", color: "gray" }}>
        自動返信メールをお送りしましたのでご確認ください。<br />
        選考結果は1週間以内に改めてご連絡いたします。
      </p>

      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: "2rem",
          padding: "0.8rem 1.5rem",
          borderRadius: "6px",
          backgroundColor: "var(--color-accent)",
          color: "white",
          textDecoration: "none",
        }}
      >
        ホームに戻る
      </a>
    </section>
  );
}
