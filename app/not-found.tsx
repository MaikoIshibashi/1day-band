export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", color: "var(--color-accent)" }}>
        404 - ページが見つかりません
      </h1>
    </section>
  );
}
