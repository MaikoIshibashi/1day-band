export default function Hero() {
  return (
    <section
      style={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(to bottom, black, rgb(40, 0, 60), black)",
      }}
    >
      <div id="hero" className="fade-in-up">
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          1Day Studio Band
        </h1>
        <p
          style={{
            color: "var(--color-accent)",
            fontSize: "1.2rem",
          }}
        >
          音楽仲間とつくる、最高の一日。
        </p>
      </div>
    </section>
  );
}
