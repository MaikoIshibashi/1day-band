export default function ThanksPage() {
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
        lineHeight: 1.8,
      }}
    >
      <h1
        style={{
          color: "var(--color-accent)",
          fontSize: "2rem",
          marginBottom: "1.5rem",
        }}
      >
        エントリーありがとうございました！
      </h1>

      <p style={{ maxWidth: "600px", marginBottom: "1.5rem" }}>
        ご登録いただいたメールアドレス宛に確認用のコピーをお送りしました。<br />
        選考結果は <strong>1週間以内にご連絡</strong>いたします。
      </p>

      <p style={{ maxWidth: "600px", fontSize: "0.9rem", color: "gray" }}>
        <strong>※</strong> 送信元は
        <span style={{ color: "var(--color-accent)" }}> 1daystudioband.com </span>
        です。<br />
        ドメイン受信設定をご確認のうえ、迷惑メールフォルダに振り分けられないようご注意ください。
      </p>
    </section>
  );
}
