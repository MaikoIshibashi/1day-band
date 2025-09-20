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
          backgroundColor: "#111", // 黒
        }}
      >
        <h2 style={{ fontSize: "2rem", color: "var(--color-accent)" }}>
          現在のステータス
        </h2>
        <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
          🎶{" "}
          <strong style={{ color: "var(--color-accent)" }}>
            第3回 名古屋セッション
          </strong>{" "}
          は
          <br />
          2025年10月12日（日）に開催予定です！
        </p>
        <p style={{ marginTop: "0.5rem", color: "gray" }}>
          メンバーはすでに決定しており、当日に向けて準備中です。
          <br />
          イベント終了後には、演奏映像を YouTube に公開します。
        </p>
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
          <strong>1Day Studio Band</strong> は、音楽好きが集まり
          その日限りのバンドを結成してスタジオで演奏し、
          その様子を映像として残す企画です。
        </p>
        <p
          style={{
            maxWidth: "650px",
            margin: "1rem auto",
            lineHeight: "1.8",
          }}
        >
          開催は <strong>春と秋の年2回</strong>。全国様々な場所で開催し、
          音楽仲間と出会う機会を提供します。
          <br />
          演奏曲は固定曲 <strong>GLAY「SOUL LOVE」</strong> と、
          追加の1曲を事前に選曲して発表します。
        </p>
        <p
          style={{
            maxWidth: "650px",
            margin: "1rem auto",
            lineHeight: "1.8",
          }}
        >
          初心者からベテランまで、
          <strong>音楽を楽しみたい気持ち</strong> があれば大歓迎。
          限られた時間で音を合わせるからこそ、特別な一日になります。
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
          backgroundColor: "#111", // 黒に戻す
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

          <ul style={{ paddingLeft: "1.2rem" }}>
            <li>スタジオ利用 (5H) ＋ 機材レンタル</li>
            <li>記念品（参加メンバー名入り）</li>
            <li>スコア（パート割含む）</li>
            <li>YouTube動画（本番2本／MIX込）</li>
            <li>当日の動画・写真共有</li>
            <li>メンバー限定グループDMご案内</li>
          </ul>

          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.9rem",
              color: "gray",
            }}
          >
            ※ お支払い方法：現金／PayPay
            <br />
            ※ キャンセル料はいただきませんので、安心してお申し込みください。
          </p>
        </div>
      </section>
    </>
  );
}
