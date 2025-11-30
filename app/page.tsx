"use client";

import Link from "next/link";
import Hero from "./components/Hero";
import Reveal from "./components/Reveal"; // ← スクロールアニメーション
import RecentActivities from "./components/RecentActivities"; // ←これを追加！
import InterestButton from "./components/InterestButton";
import SupportButton from "./components/SupportButton";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlowTimeline from "./FlowTimeline"; // ← 追加


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
  className="reveal scroll-mt-20" 
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
  4th XXX
</h2>
<p style={{ marginTop: "0.5rem", fontSize: "1.2rem", color: "#fff" }}>
  秋に開催予定！場所は未定で5月にメンバー募集します🙇‍♀️
</p>
<p style={{ marginTop: "0.5rem", color: "gray" }}>
  🟣 準備中
</p>

{/* 👇ここを移動！ */}
{/* <Link
  href="/entry"
  style={{
    marginTop: "0.8rem",
    display: "inline-block",
    padding: "0.8rem 1.6rem",
    backgroundColor: "var(--color-accent)",
    color: "#000",
    fontWeight: "600",
    borderRadius: "8px",
    textDecoration: "none",
    boxShadow: "0 0 12px rgba(168,85,247,0.4)",
    transition: "0.25s",
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.backgroundColor = "#c084fc";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.backgroundColor = "var(--color-accent)";
  }}
>
  エントリーページはこちら ✨
</Link> */}

<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.2rem",
    marginTop: "1.8rem",
  }}
>
  {/* ここにあった興味あるボタンは削除 */}

  <SupportButton />
</div>
  {/* ↓ カード内に配置 */}
  <p style={{ fontSize: "0.95rem", color: "#aaa", marginTop: "1rem" }}>
  {/* ↓ ここにエントリー期間を入れる */}
  </p>
  </div>

</section>
{/* About */}
<section
  id="about"
  className="reveal scroll-mt-20"
  style={{
    padding: "4rem",
    textAlign: "center",
    backgroundColor: "#111",
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
    音楽好きが集まりその日限りのバンドを結成してスタジオで演奏。<br />
    その様子を映像として残す企画です。
  </p>

  <p
    style={{
      maxWidth: "650px",
      margin: "1rem auto",
      lineHeight: "1.8",
    }}
  >
    開催は春と秋の年2回。<br />
    全国様々な場所で開催し、音楽仲間と出会う機会を提供します。<br />
    バンドする機会がない、スタジオ未経験、初参加の方など大歓迎です！<br />
  </p>

  <p
    style={{
      maxWidth: "650px",
      margin: "1rem auto",
      lineHeight: "1.8",
    }}
  >
    初心者からベテランまで経験問わず募集しています！<br />
    メンバーとは当日までグループDMでコミュニケーションを取って仲を深めていきます。<br />
    当日はバンドメンバーひとりひとりが主役です！<br />
    限られた時間となりますが、特別な1日をお楽しみください！
  </p>

</section>
<RecentActivities />


{/* Fee */}
<section
  id="fee"
  className="reveal scroll-mt-20" 
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


{/* タイムラインセクション */}
<FlowTimeline />


{/* Events */}
<section
  id="events"
  className="reveal scroll-mt-20" 
  style={{
    padding: "4rem",
    textAlign: "center",
    backgroundColor: "#111",
  }}
>
  <h2 style={{ fontSize: "2rem", color: "var(--color-accent)" }}>
    過去のイベント
  </h2>

  {/* 第3回 */}
  <h3 style={{ marginTop: "2rem", color: "var(--color-accent)" }}>
    3rd in Nagoya (2025/10)
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
      src="https://www.youtube.com/embed/juiP3-nxLr8?si=wp5E6O4a_lesZ-u1"
      title="第3回 SOUL LOVE"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ borderRadius: "8px" }}
    ></iframe>

    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/pzzRLBBbJhg?si=SwtKqrO7JLXbZUhE"
      title="第3回 グロリアス"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ borderRadius: "8px" }}
    ></iframe>

    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/ictKQgug-u8"
      title="第3回 中期イベント SOUL LOVE"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ borderRadius: "8px" }}
    ></iframe>
    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/Nt3dJAjcwIo"
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
      src="https://www.youtube.com/embed/abAIzFkSw70?si=OclTO-xfQL4w5Pel"
      title="第2回 動画1"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ borderRadius: "8px" }}
    ></iframe>
    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/2Eyq1Zpj-HU?si=cclbXvtWHWuuyOTa"
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
      src="https://www.youtube.com/embed/J9OJbL2975s?si=JRMZVtt5DUOCn01C"
      title="第1回 動画1"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ borderRadius: "8px" }}
    ></iframe>
    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/eci_dTHXkFU?si=gMlYkLYvxu9mdyFi"
      title="第1回 動画2"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ borderRadius: "8px" }}
    ></iframe>
    <iframe
      width="100%"
      height="200"
      src="https://www.youtube.com/embed/BjWMdT3oUFI?si=-rPFK7hXMiXrrDyn"
      title="第1回 動画3"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ borderRadius: "8px" }}
    ></iframe>
  </div>
</section>



{/* Voices */}
<section
  id="voices"
  className="reveal scroll-mt-20"
  style={{
    padding: "4rem",
    textAlign: "center",
    backgroundColor: "#000",
  }}
>
  <h2
    style={{
      fontSize: "2rem",
      color: "var(--color-accent)",
      marginBottom: "2rem",
    }}
  >
    参加者の声
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "1.5rem",
      maxWidth: "1000px",
      margin: "0 auto",
    }}
  >
    {[
      {
        comment:
          "バンドで演奏することが、こんなにも楽しいものなんだって。\n貴重な経験ができてとても幸せです。\n普段は応援する側だけど、メンバーとして参加する側のバンドにも沼りそうです！",
      },
      {
        comment:
          "楽しいの一言でした！\n5時間長いかなと思ったけど、あっという間でした！",
      },
      {
        comment:
          "参加が決まってから目標を持って練習に取り組めたのは良かったです。\n準備期間も含めて、とても充実した時間を過ごすことができました。",
      },
      {
        comment:
          "練習はじめて『できるわけない』と思ったけど、\n日々修行して少しずつ自信がついた。\n本番はみんなと演奏できてゾクゾクした！\nまた参加したいです！",
      },
      {
        comment: "楽しかったの一言に尽きますねん🐸✨",
      },
      {
        comment:
          "初参加で不安もありましたが、皆さんフレンドリーに接してくださって、\nスタジオから打ち上げまでとても楽しく過ごすことができました。",
      },
      {
        comment:
          "各々の練習期間も含め、すごく楽しかったです！\nまた機会あれば参加したいです！\n準備等いろいろ大変かと思いますが、引き続きの開催楽しみにしています！",
      },
      {
        comment:
          "具体的な目標があると練習にも身が入るんですね。\n当日も本当に楽しくてかけがえのない経験＆思い出になりました！\n自分にできるかな？という不安もありましたけど、参加出来て良かったです。\nまたやりたいー！",
      },
      {
        comment:
          "MYAIMYAIさんのお人柄で全国から集まる皆さんは素敵な方たちばかり！\nそんな皆さんとスタジオで曲を演る感動！\nこりゃ行くしかないぜ👍\n本当に楽しく素敵なイベントなので、興味がある方は是非！",
      },
      {
        comment:
          "2ndに引き続き参加させていただきました！\n3rdもとってもとっても楽しかったです✨\n今回もメンバーの皆さまのお人柄が良く、当日までのやり取りや練習が楽しかったです！\n中間イベントがあったことで、より緊張感を保って練習できたし、当日へのワクワクが増しました☺️\n皆での演奏は当日だけですが、参加が決まったその日からバンドメンバーとして楽しませてもらっていたんだと、終わってからしみじみ感じました。\n貴重な経験をさせてもらえて感謝しています！\nありがとうございました😊✨",
      },
      {
        comment:
          "2ndに続き2回目の参加でした。\n準備段階から練習経過を報告し合ったりして楽しく練習できました。\n共通の目標があったので緊張感を持ちつつ、モチベ高く取り組めたのも良かったです。\n当日は初対面の方々もいましたが、皆様いい方々ですぐに馴染めて楽しく音合わせできました。\n是非また参加させていただきたいです！",
      },
    ].map((voice, i) => (
      <div
        key={i}
        style={{
          backgroundColor: "#111",
          border: "1px solid rgba(168, 85, 247, 0.3)",
          borderRadius: "8px",
          padding: "1.5rem",
          textAlign: "left",
          fontSize: "0.95rem",
          lineHeight: "1.7",
          color: "#ddd",
        }}
      >
        <p style={{ margin: 0, whiteSpace: "pre-line" }}>{voice.comment}</p>
      </div>
    ))}
  </div>
</section>


{/* Souvenirs */}
<section
  id="souvenirs"
  className="reveal scroll-mt-20" 
  style={{
    padding: "4rem",
    textAlign: "center",
    backgroundColor: "#000",
  }}
>
  <h2
    style={{
      fontSize: "2rem",
      color: "var(--color-accent)",
      marginBottom: "2rem",
    }}
  >
    過去の記念品
  </h2>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem",
      maxWidth: "1000px",
      margin: "0 auto",
    }}
  >
    {/* 第1回 ピック */}
    <div
      style={{
        backgroundColor: "#111",
        border: "1px solid rgba(168, 85, 247, 0.3)",
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <img
        src="/1st.png" // ← public フォルダに保存しておく
        alt="第1回 記念ピック"
        style={{
          width: "100%",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      />
      <h3
        style={{
          color: "var(--color-accent)",
          marginBottom: "0.5rem",
        }}
      >
        1st 東京セッション
      </h3>
      <p style={{ margin: 0, fontSize: "0.9rem" }}>
        オリジナルピック
      </p>
    </div>

    {/* 第2回 缶バッジ */}
    <div
      style={{
        backgroundColor: "#111",
        border: "1px solid rgba(168, 85, 247, 0.3)",
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <img
        src="/2nd.png"
        alt="第2回 記念缶バッジ"
        style={{
          width: "100%",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      />
      <h3
        style={{
          color: "var(--color-accent)",
          marginBottom: "0.5rem",
        }}
      >
        2nd 大阪セッション
      </h3>
      <p style={{ margin: 0, fontSize: "0.9rem" }}>
        デカデカ缶バッジ
      </p>
    </div>

    {/* 第3回 リストバンド */}
    <div
      style={{
        backgroundColor: "#111",
        border: "1px solid rgba(168, 85, 247, 0.3)",
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <img
        src="/3rd.png"
        alt="第3回 バンド風リストバンド"
        style={{
          width: "100%",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      />
      <h3
        style={{
          color: "var(--color-accent)",
          marginBottom: "0.5rem",
        }}
      >
        3rd 名古屋セッション
      </h3>
      <p style={{ margin: 0, fontSize: "0.9rem" }}>
        バンド風リストバンド
      </p>
    </div>
    </div> 
</section>

    </>
  );
}