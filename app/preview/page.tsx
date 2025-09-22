import Link from "next/link";
import Hero from "../components/Hero";
import Reveal from "../components/Reveal"; // ← スクロールアニメーション

export default function PreviewPage() {
  return (
    <>
      {/* Reveal を全体で有効化 */}
      <Reveal />

      {/* Hero */}
      <Hero />

      {/* Status */}
<section
  id="status"
  className="reveal"
  style={{
    padding: "4rem",
    textAlign: "center",
    backgroundColor: "#111",
  }}
>
  <h2 style={{ fontSize: "2rem", color: "var(--color-accent)", marginBottom: "1rem" }}>
    現在のステータス
  </h2>
<div
  style={{
    background: "linear-gradient(145deg, #1a1a1a, #111)",
    border: "1px solid rgba(168,85,247,0.4)",
    borderRadius: "12px",
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    boxShadow: "0 0 20px rgba(168,85,247,0.2)",
    textAlign: "center",
  }}
>
  <h2 style={{ fontSize: "1.8rem", color: "var(--color-accent)" }}>
    4th in Fukuoka
  </h2>
  <p style={{ marginTop: "0.5rem", fontSize: "1.2rem", color: "#fff" }}>
    2026.04 開催予定
  </p>
  <p style={{ marginTop: "0.5rem", color: "gray" }}>🟣 募集開始前</p>
  {/* ↓ カード内に配置 */}
  <p style={{ fontSize: "0.95rem", color: "#aaa", marginTop: "1rem" }}>
    公開までしばらくお待ちください。。
  </p>
  </div>

</section>

      {/* About */}
      <section
        id="about"
        className="reveal"
        style={{
          padding: "4rem",
          textAlign: "center",
          backgroundColor: "#1a1a1a", // 濃いグレー
        }}
      >
        <h2 style={{ fontSize: "2rem", color: "var(--color-accent)" }}>
          プロジェクト概要
        </h2>
        <p
          style={{
            maxWidth: "650px",
            margin: "1rem auto",
            lineHeight: "1.8",
          }}
        >
          音楽好きが集まりその日限りのバンドを結成してスタジオで演奏<br />
          その様子を映像として残す企画です。
        </p>
        <p
          style={{
            maxWidth: "650px",
            margin: "1rem auto",
            lineHeight: "1.8",
          }}
        >
          開催は春と秋の年2回。<br />全国様々な場所で開催し
          音楽仲間と出会う機会を提供します。
          <br />
          演奏曲はGLAYの中から2曲。こちらで選曲します！
        </p>
        <p
          style={{
            maxWidth: "650px",
            margin: "1rem auto",
            lineHeight: "1.8",
          }}
        >
          初心者からベテランまで、
          音楽を楽しみたい気持ちがあれば大歓迎♪<br />
          メンバーとは当日までグループDMでやりとり可能！<br />
          当日は限られた時間で音を合わせ特別な1日をお楽しみください！
        </p>

        <a
          href="https://note.com/1daystudioband"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: "1.5rem",
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            backgroundColor: "var(--color-accent)",
            color: "white",
            fontSize: "1rem",
            textDecoration: "none",
          }}
        >
          活動記録を note で見る
        </a>
      </section>

{/* Fee */}
<section
  id="fee"
  className="reveal"
  style={{
    padding: "4rem",
    textAlign: "center",
    backgroundColor: "#111",
  }}
>
  <h2 style={{ fontSize: "2rem", color: "var(--color-accent)" }}>
    参加費
  </h2>
  <div
    style={{
      maxWidth: "600px",
      margin: "2rem auto",
      textAlign: "left",
      lineHeight: "1.8",
    }}
  >
    <p>
      <strong style={{ color: "var(--color-accent)" }}>
        Studio only：
      </strong>{" "}
      ¥5,000
    </p>
    <p>
      <strong style={{ color: "var(--color-accent)" }}>
        Studio ＋ After party：
      </strong>{" "}
      ¥9,000{" "}
      <span style={{ color: "gray" }}>
        (Studio only ¥5,000 ＋ After party ¥4,000)
      </span>
    </p>

    <hr
      style={{
        margin: "2rem 0",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    />
<ul
  style={{
    paddingLeft: "1.2rem",
    listStyleType: "square",
    color: "white",
  }}
  className="custom-list"
>
  <li>スタジオ利用 (5H) ＋ 機材レンタル</li>
  <li>記念品 (バンドメンバーの名前入り)</li>
  <li>スコア (パート割含む)</li>
  <li>YouTube動画（本番2本／MIX込）</li>
  <li>YouTubeショート ※任意参加（中間イベントコラボ2本／MIX込）</li>
  <li>当日動画と写真の共有</li>
  <li>メンバー限定グループDMご案内</li>
  <li>メンバー用Infoサイトの提供</li>
  <li>イベントチケット・領収書発行</li>
  <li>
    ＋ After party（別途 ¥4,000）
    <br />
    美味しい料理とお酒で交流＆音楽トーク！
  </li>
</ul>

<p
  style={{
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "gray",
    textAlign: "left",
  }}
>
  ※ お支払い方法：現金(当日払いのみ)／PayPay／クレジット決済
</p>

<div
  style={{
    display: "flex",
    justifyContent: "left",
    gap: "1rem",
    marginTop: "0.5rem",
  }}
>
  <img src="/credit.avif" alt="credit" style={{ height: "20px" }} />
  
</div>

  </div>
</section>
    </>
  );
}
