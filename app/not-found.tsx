export default function NotFoundPage() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        color: "white",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", color: "var(--color-accent)" }}>
        404 - ページが見つかりません
      </h1>
      <p style={{ marginTop: "1rem", color: "gray" }}>
        URL が間違っているか、すでに削除された可能性があります。
      </p>
    </section>
  );
}
