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
    backgroundColor: "#000",
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
          backgroundColor: "#111", // 濃いグレー
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
    backgroundColor: "#000",
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
{/* Timeline */}
<section
  id="timeline"
  className="reveal"
  style={{
    padding: "4rem",
    backgroundColor: "#111",
    color: "white",
  }}
>
  <h2
    style={{
      fontSize: "2rem",
      color: "var(--color-accent)",
      textAlign: "center",
      marginBottom: "3rem",
    }}
  >
    当日までの流れ
  </h2>

  {/* タイムライン本体 */}
  <div
    style={{
      maxWidth: "700px",
      margin: "0 auto",
      position: "relative",
    }}
  >
    {/* 縦のライン */}
    <div
      style={{
        position: "absolute",
        left: "20px",
        top: 0,
        bottom: 0,
        width: "2px",
        background: "#444",
      }}
    ></div>

    {[
      {
        title: "Entry Open",
        note: "約5ヶ月前",
        desc: "募集期間にエントリーページを公開。参加希望の方は当サイトより直接お申し込みください。",
      },
      {
        title: "Member Selection",
        note: "約1週間後",
        desc: "希望パートやバランスを考慮し、メンバーを決定。結果は公式メールでご案内します。",
      },
      {
        title: "Practice Log & Updates",
        note: "本番まで",
        desc: "グループDMで練習状況や進捗を共有。相談・交流しながら準備を進めます。",
      },
      {
        title: "Midpoint Event",
        note: "約2ヶ月前",
        desc: "任意参加の中間イベントで進捗確認やプチセッションを開催。",
      },
      {
        title: "Performance Day",
        note: "当日",
        desc: "スタジオで本番演奏を収録。後日編集して YouTube に公開します。",
      },
      {
        title: "After Party",
        note: "任意参加",
        desc: "終了後に交流会。美味しい料理とお酒で音楽トークを楽しみましょう。",
      },
    ].map((step, i) => (
      <div
        key={i}
        style={{
          marginBottom: "2rem",
          paddingLeft: "60px",
          position: "relative",
        }}
        className="reveal"
      >
        {/* 丸マーカー */}
        <div
          style={{
            position: "absolute",
            left: "11px",
            top: "5px",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "var(--color-accent)",
          }}
        ></div>

        {/* タイトル＋補足 */}
        <h3
          style={{
            margin: "0 0 0.5rem",
            fontSize: "1.3rem",
            color: "var(--color-accent)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {step.title}
          <span style={{ color: "gray", fontSize: "0.9rem" }}>
            （{step.note}）
          </span>
        </h3>

        {/* 説明 */}
        <p style={{ margin: 0, lineHeight: "1.6", color: "#ddd" }}>
          {step.desc}
        </p>
      </div>
    ))}
  </div>
</section>


{/* Events */}
<section
  id="events"
  className="reveal"
  style={{
    padding: "4rem",
    textAlign: "center",
    backgroundColor: "#000",
  }}
>
  <h2 style={{ fontSize: "2rem", color: "var(--color-accent)" }}>
    過去のイベント
  </h2>

  {/* 第3回 */}
  <h3 style={{ marginTop: "2rem", color: "var(--color-accent)" }}>
    3rd in Nagoya (2025/10予定)
  </h3>
  <p style={{ marginTop: "0.5rem", color: "gray" }}>
    本番は 2025年10月12日（日）に開催予定です。
  </p>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      maxWidth: "900px",
      margin: "1.5rem auto",
    }}
  >
    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/YrbfEhGFHXI"
      title="第3回 中期イベント SOUL LOVE"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ borderRadius: "8px" }}
    ></iframe>
    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/GvaX2NYzXqo"
      title="第3回 中期イベント グロリアス"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ borderRadius: "8px" }}
    ></iframe>
  </div>

  {/* 第2回 */}
  <h3 style={{ marginTop: "2rem", color: "var(--color-accent)" }}>
    2nd in Osaka (2025/04)
  </h3>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "2rem",
      maxWidth: "900px",
      margin: "1.5rem auto",
    }}
  >
    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/aCAz5yXyz7I"
      title="第2回 動画1"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ borderRadius: "8px" }}
    ></iframe>
    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/YLsxuxlOw68"
      title="第2回 動画2"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ borderRadius: "8px" }}
    ></iframe>
  </div>

  {/* 第1回 */}
  <h3 style={{ marginTop: "2rem", color: "var(--color-accent)" }}>
    1st in Tokyo (2024/10)
  </h3>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      maxWidth: "900px",
      margin: "1.5rem auto",
    }}
  >
    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/S2MMTYCTmdI"
      title="第1回 動画1"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ borderRadius: "8px" }}
    ></iframe>
    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/FuO-1i5C7es"
      title="第1回 動画2"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ borderRadius: "8px" }}
    ></iframe>
    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/aRuAYXW9Dpk"
      title="第1回 動画3"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ borderRadius: "8px" }}
    ></iframe>
  </div>
</section>

    </>
  );
}
