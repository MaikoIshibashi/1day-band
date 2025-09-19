// app/not-found.tsx
export default function NotFound() {
  return (
    <html>
      <body
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
        <div>
          <h1 style={{ fontSize: "2rem", color: "var(--color-accent)" }}>
            404 - ページが見つかりません
          </h1>
          <p style={{ marginTop: "1rem", color: "gray" }}>
            入力したURLが間違っているか、すでに削除された可能性があります。
          </p>
        </div>
      </body>
    </html>
  );
}
