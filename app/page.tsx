import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      {/* Hero セクション */}
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
  <h2 style={{ fontSize: "2rem", color: "var(--color-accent)" }}>
    現在のステータス
  </h2>
  <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
    🎶 <strong style={{ color: "var(--color-accent)" }}>第3回 名古屋セッション</strong> は  
    <br />2025年10月12日（日）に開催予定です！
  </p>
  <p style={{ marginTop: "0.5rem", color: "gray" }}>
    メンバーはすでに決定しており、当日に向けて準備中です。<br />
    イベント終了後には、演奏映像を YouTube に公開します。
  </p>
</section>

{/* About */}
<section
  id="about"
  className="reveal"
  style={{ padding: "4rem", textAlign: "center" , backgroundColor: "#000" }}
>
  <h2 style={{ fontSize: "2rem", color: "var(--color-accent)" }}>
    プロジェクト概要
  </h2>
  <p style={{ maxWidth: "650px", margin: "1rem auto", lineHeight: "1.8" }}>
    <strong>1Day Studio Band</strong> は、音楽好きが集まり
    <br />その日限りのバンドを結成してスタジオで演奏し
    <br />その様子を映像として残す企画です。
  </p>
  <p style={{ maxWidth: "650px", margin: "1rem auto", lineHeight: "1.8" }}>
    開催は <strong>春と秋の年2回</strong>。全国様々な場所で開催し、音楽仲間と出会う機会を提供します。<br />
    演奏曲は固定曲 <strong>GLAY「SOUL LOVE」</strong> と、追加の1曲を事前に選曲して発表します。
  </p>
  <p style={{ maxWidth: "650px", margin: "1rem auto", lineHeight: "1.8" }}>
    初心者からベテランまで、<strong>音楽を楽しみたい気持ち</strong>があれば大歓迎。<br />
    弾ける範囲での参加可能。フル演奏が難しい場合は調整します。<br />
    当日までにメンバー同士で相談や交流をしながら準備を進めるので<br />
    バンドやスタジオ経験が初めての方でも安心してご参加ください♪<br />
    限られた時間で音を合わせかけがえのない時間を一緒に過ごしましょう！
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


      {/* Timeline */}
<section
  id="timeline"
  className="reveal"
  style={{
    padding: "4rem",
    backgroundColor: "#111",
    color: "white"
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

  {/* 縦のタイムライン */}
  <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}>
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
        period: "本番約5ヶ月前／春・秋頃",
        desc: "募集期間にエントリーページを公開します。参加希望の方は当サイトより直接お申し込みください。",
      },
      {
        title: "Member Selection",
        period: "エントリー開始約1週間後",
        desc: "エントリー内容や希望パートをもとに、全体のバランスを考慮してメンバーを確定します。選考結果は公式メールよりご案内いたします。\nなお、募集枠の都合上、ご希望に添えない場合もございますのでご了承ください。"
      },
      {
        title: "Practice Log & Updates",
        period: "本番約5ヶ月前〜本番",
        desc: "グループDMで練習状況や進捗を共有。メンバー同士で相談・交流しながら準備を進めます。",
      },
      {
        title: "Midpoint Event",
        period: "本番約2ヶ月前",
        desc: "任意参加の中間イベントを開催。進捗確認やプチセッションを通じて交流を深めます。",
      },
      {
        title: "Performance Day",
        period: "本番当日",
        desc: "スタジオにて本番演奏を収録。後日編集した映像をYouTubeに公開します。\n※顔出しNGなどのご要望にも対応いたします。",
      },
      {
        title: "After Party",
        period: "本番後 ※Option",
        desc: "本番後、美味しい料理とお酒で反省会や音楽トークで盛り上がりましょう♪",
      },
    ].map((step, i) => (
      <div
        key={i}
        style={{
          marginBottom: "2rem",
          paddingLeft: "60px",
          position: "relative",
        }}
      >
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
        <h3
          style={{
            margin: "0",
            color: "var(--color-accent)",
            fontSize: "1.3rem",
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            margin: "0.2rem 0 0.8rem",
            fontSize: "0.9rem",
            color: "#aaa",
          }}
        >
          {step.period}
        </p>
        <p style={{ margin: 0, lineHeight: "1.6", whiteSpace: "pre-line" }}>
  {step.desc}
</p>
      </div>
    ))}
  </div>
</section>

{/* Fee */}
<section
  id="fee"
  className="reveal"
  style={{
    padding: "4rem",
    textAlign: "center",
    backgroundColor: "#000"
  }}
>
  <h2 style={{ fontSize: "2rem", color: "var(--color-accent)" }}>参加費</h2>

  <div
    style={{
      maxWidth: "600px",
      margin: "2rem auto",
      textAlign: "left",
      lineHeight: "1.8",
    }}
  >
    <p>
      <strong style={{ color: "var(--color-accent)" }}>Studio only：</strong> ¥5,000
    </p>
    <p>
      <strong style={{ color: "var(--color-accent)" }}>Studio ＋ After party：</strong> 
      ¥9,000 <span style={{ color: "gray" }}>(Studio only ¥5,000 ＋ After party ¥4,000)</span>
    </p>

    <hr style={{ margin: "2rem 0", border: "1px solid rgba(255,255,255,0.1)" }} />

    <ul style={{ paddingLeft: "1.2rem" }}>
      <li>スタジオ利用 (5H) ＋ 機材レンタル</li>
      <li>記念品（参加メンバー名入り）</li>
      <li>スコア（パート割含む）</li>
      <li>YouTube動画（本番2本／MIX込）</li>
      <li>YouTubeショート（中間イベントコラボ2本／任意参加）</li>
      <li>当日の動画・写真共有</li>
      <li>メンバー限定グループDMご案内</li>
      <li>メンバー用Infoサイトの提供</li>
      <li>イベントチケット・領収書発行</li>
      <li>
        <span style={{ color: "var(--color-accent)" }}>＋ After party</span>（別途 ¥4,000）  
        <br />美味しい料理とお酒で交流＆音楽トーク！
      </li>
    </ul>

    <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "gray" }}>
      ※ お支払い方法：現金／PayPay／クレジット決済（リンク決済）<br />
      ※ キャンセル料はいただきませんので、安心してお申し込みください。
    </p>
  </div>
</section>

<section
  id="join"
  className="reveal"
  style={{ padding: "4rem", textAlign: "center",backgroundColor: "#111"
   }}
>
  <h2 style={{ fontSize: "2rem", color: "var(--color-accent)" }}>
    参加方法
  </h2>
  <p style={{ maxWidth: "600px", margin: "1rem auto", lineHeight: "1.6" }}>
    参加希望の方は、
    <strong style={{ color: "var(--color-accent)" }}>エントリーページ</strong>
    からご応募ください。<br />
    エントリー期間についてはXアカウントでも発信しています。
  </p>

  <a
    href="/entry"   // ← ここを将来エントリーページにする
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
    募集ページへ
  </a>
</section>

      {/* Past Events */}
      <section
        id="events"
        className="reveal"
        style={{
          padding: "4rem",
          textAlign: "center",
          backgroundColor: "#000"
        }}
      >
        <h2 style={{ fontSize: "2rem", color: "var(--color-accent)" }}>
          過去のイベント
        </h2>

{/* 第3回 */}
<h3 style={{ marginTop: "2rem", color: "var(--color-accent)" }}>
  第3回 名古屋セッション (2025/10予定)
</h3>
<p style={{ marginTop: "0.5rem", color: "gray" }}>
  本番は 2025年10月12日（日）に開催予定です。
</p>

{/* コラボ動画（中期イベント） */}
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
    src="https:/www.youtube.com/embed/YrbfEhGFHXI" // ← 1本目の動画URL
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
          第2回 大阪セッション (2025/4)
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // ← 2本横並び固定
            gap: "2rem",
            maxWidth: "900px", // ← 少し広げる
            margin: "1.5rem auto",
          }}
        >
          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/aCAz5yXyz7I?si=JAuhyYevfLicZETq"
            title="第2回 動画1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: "8px" }}
          ></iframe>
          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/YLsxuxlOw68?si=2-c3SDjZgg8y5Fr_"
            title="第2回 動画2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: "8px" }}
          ></iframe>
        </div>

        {/* 第1回 */}
        <h3 style={{ marginTop: "2rem", color: "var(--color-accent)" }}>
          第1回 東京セッション (2024/10)
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
            src="https://www.youtube.com/embed/S2MMTYCTmdI?si=nwu2oH6Jqm9WCz8d"
            title="第1回 動画1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: "8px" }}
          ></iframe>
          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/FuO-1i5C7es?si=DlhqApKd3ILoa9yo"
            title="第1回 動画2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: "8px" }}
          ></iframe>
          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/aRuAYXW9Dpk?si=Uh8ZcKsKFflsjApp"
            title="第1回 動画3"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: "8px" }}
          ></iframe>
        </div>
      </section>

{/* Souvenirs */}
<section
  id="souvenirs"
  className="reveal"
  style={{
    padding: "4rem",
    textAlign: "center",
    backgroundColor: "#111",
  }}
>
  <h2 style={{ fontSize: "2rem", color: "var(--color-accent)", marginBottom: "2rem" }}>
    オリジナルグッズ
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
        src="/1st.png" // ← ここにピック写真を保存
        alt="第1回 記念ピック"
        style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
      />
      <h3 style={{ color: "var(--color-accent)", marginBottom: "0.5rem" }}>
        1st 東京セッション
      </h3>
      <p style={{ margin: 0, fontSize: "0.9rem" }}>
        参加メンバー名入りオリジナルピック
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
        src="/2nd.png" // ← ここに缶バッジ写真を保存
        alt="第2回 記念缶バッジ"
        style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
      />
      <h3 style={{ color: "var(--color-accent)", marginBottom: "0.5rem" }}>
        2nd 大阪セッション
      </h3>
      <p style={{ margin: 0, fontSize: "0.9rem" }}>
        デカデカサイズのオリジナル缶バッジ
      </p>
    </div>

    {/* 第3回 Coming Soon */}
    <div
      style={{
        backgroundColor: "#111",
        border: "1px solid rgba(168, 85, 247, 0.3)",
        borderRadius: "8px",
        padding: "3rem 1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "gray",
        fontStyle: "italic",
      }}
    >
      <h3 style={{ color: "var(--color-accent)", marginBottom: "0.5rem" }}>
        第3回 名古屋セッション
      </h3>
      <p style={{ margin: "0 0 1rem" }}>2025年10月12日 開催予定</p>
      <p style={{ fontSize: "1.2rem" }}>Coming Soon...</p>
    </div>
  </div>
</section>
{/* Participant Voices */}
<section
  id="voices"
  className="reveal"
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
          "バンドで演奏することが、こんなにも楽しいものなんだって、貴重な経験ができてとても幸せです。普段は応援する側だけど、メンバーとして参加する側のバンドにも沼りそうです！",
      },
      {
        comment:
          "楽しいの一言でした！5時間長いかなと思ったけど、あっという間でした！",
      },
      {
        comment:
          "参加が決まってから目標を持って練習に取り組めたのは良かったです。準備期間も含めて、とても充実した時間を過ごすことができました。",
      },
      {
        comment:
          "練習はじめて『できるわけない』と思ったけど、日々修行して少しずつ自信がついた。本番はみんなと演奏できてゾクゾクした！また参加したいです！",
      },
      {
        comment: "楽しかったの一言に尽きますねん🐸✨",
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
          lineHeight: "1.6",
        }}
      >
        <p style={{ margin: 0 }}>{voice.comment}</p>
      </div>
    ))}
  </div>
</section>

    </>
  );
}
