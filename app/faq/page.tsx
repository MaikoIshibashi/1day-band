"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function FAQPage() {
  const faqCategories = [
    {
      category: "参加について",
      items: [
        { q: "初心者でも大丈夫ですか？", a: "はい、大丈夫です！むしろ大歓迎です！ぜひみんなで一緒に弾く楽しさを体感してみてください。" },
        { q: "誰でも参加できますか？", a: "不特定多数の応募があるため参加には選考があります。また、安全性確認とグループDM運用のためXアカウントのある方を対象としています。" },
        { q: "楽器が演奏できなくても参加できますか？", a: "基本的にはバンド楽器演奏がメインですが、ボーカルやコーラス、タンバリンなど楽器が弾けなくてもOKです！" },
        { q: "年齢制限はありますか？", a: "何歳でも大丈夫です！お子様の場合は保護者の同意が必要です。" },
        { q: "キーボードとギターなど掛け持ちはできますか？", a: "はい！可能です。ご希望はお伺いしますが人数調整で難しい場合もあります。" },
        { q: "初対面の人ばかりで不安ですが大丈夫ですか？", a: "本番までの5ヶ月間、グループDMで練習の様子や相談を共有できます！良い方ばかりなので安心してご参加ください🎵" },
        { q: "練習は当日だけですか？事前に集まることはありますか？", a: "各地からの参加が多いため全員集合は難しいですが、一部メンバーでの練習も可能です。(主催は基本遠方です)" },
        { q: "キャンセルは可能ですか？", a: "はい、可能ですが出来るだけ早めにご連絡ください。" },
        { q: "打ち上げ参加は必須ですか？", a: "いいえ、オプションです。ご希望に応じて選択できます。" },
      ],
    },
    {
      category: "費用について",
      items: [
        {
          q: "参加費はいくらですか？",
          a: `A. 参加費は **5,000円** です。  
＋オプション **4,000円** 追加で打ち上げに参加できます。

---

**参加費の内訳**
- スタジオ利用（5H）＋機材レンタル
- 記念品（バンドメンバーの名前入り）
- スコア（パート割含む）
- YouTube動画（本番2本／MIX込）
- YouTubeショート ※任意参加（中間イベントコラボ2本／MIX込）
- 当日動画と写真の共有
- メンバー限定XグループDMご案内
- メンバーズサイト利用
- イベントチケット兼領収書発行`
        },
        { q: "支払い方法は何がありますか？", a: "現金、PayPay、クレジットカード各種に対応しています。" },
        { q: "キャンセル料は発生しますか？", a: "キャンセル料はありません。参加不可が分かり次第早めにご連絡ください。" },
        { q: "領収証など発行してもらえますか？", a: "はい、チケット兼領収書を発行いたします。" },
      ],
    },
    {
      category: "当日について",
      items: [
        { q: "日にちはいつになりますか？", a: "基本的に土日です。参加メンバーの都合を調整して決定します。" },
        { q: "集合時間は何時ですか？", a: "昼前〜夜までが多いです。スタジオの時間に合わせてご案内します。" },
        { q: "会場はどこですか？", a: "毎回地域により異なります。開催地はエントリー時にお知らせします。" },
        { q: "当日体調不良で参加できなくなった場合は？", a: "公式メール（info@1daystudioband.com）までご連絡ください。" },
      ],
    },
    {
      category: "その他",
      items: [
        { q: "次回開催予定はありますか？", a: "春と秋の年2回を予定しています。開催地は毎回異なります。" },
        { q: "写真や動画は公開されますか？", a: "動画や写真はYouTubeなどで公開しますが、事前に確認を行いご希望があればモザイク対応します。" },
      ],
    },
  ];

  // 初期状態：全カテゴリ＆項目を開いた状態
  const [openCategory, setOpenCategory] = useState(Object.fromEntries(faqCategories.map((_, i) => [i, true])));
  const [openItem, setOpenItem] = useState(
    Object.fromEntries(faqCategories.flatMap((cat, i) => cat.items.map((_, j) => [`${i}-${j}`, true])))
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const toggleCategory = (i: number) => setOpenCategory((prev) => ({ ...prev, [i]: !prev[i] }));
  const toggleItem = (key: string) => setOpenItem((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <section className={`reveal ${visible ? "visible" : ""}`} style={{ padding: "4rem", backgroundColor: "#000", color: "white" }}>
      <h2 style={{ fontSize: "2rem", color: "var(--color-accent)", textAlign: "center", marginBottom: "2rem" }}>
        FAQ（よくある質問）
      </h2>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {faqCategories.map((cat, i) => (
          <div key={i} style={{ marginBottom: "2rem" }}>
            <div
              onClick={() => toggleCategory(i)}
              style={{
                cursor: "pointer",
                fontSize: "1.5rem",
                fontWeight: "bold",
                borderBottom: "2px solid var(--color-accent)",
                paddingBottom: "0.5rem",
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "space-between",
                color: "#eee",
              }}
            >
              <span>{cat.category}</span>
              <span>{openCategory[i] ? "−" : "+"}</span>
            </div>

            {openCategory[i] && (
              <div>
                {cat.items.map((faq, j) => {
                  const key = `${i}-${j}`;
                  const isOpen = openItem[key];
                  return (
                    <div key={key} style={{ marginBottom: "1rem", border: "1px solid #444", borderRadius: "6px", overflow: "hidden" }}>
                      <div
                        onClick={() => toggleItem(key)}
                        style={{
                          cursor: "pointer",
                          backgroundColor: "#1a1a1a",
                          padding: "0.8rem 1rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          color: "#fff",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>Q. {faq.q}</span>
                        <span>{isOpen ? "−" : "+"}</span>
                      </div>

                      <div
                        style={{
                          padding: isOpen ? "1rem" : "0 1rem",
                          backgroundColor: "#262626",
                          color: "#ddd",
                          display: isOpen ? "block" : "none",
                        }}
                      >
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p style={{ marginBottom: "0.6rem", lineHeight: "1.7" }}>{children}</p>,
                            ul: ({ children }) => <ul style={{ paddingLeft: "1.5rem", marginBottom: "0.8rem" }}>{children}</ul>,
                            li: ({ children }) => <li style={{ marginBottom: "0.3rem" }}>{children}</li>,
                            strong: ({ children }) => <strong style={{ color: "var(--color-accent)" }}>{children}</strong>,
                            a: ({ children, href }) => (
                              <Link href={href || "#"} style={{ color: "var(--color-accent)", textDecoration: "underline" }}>
                                {children}
                              </Link>
                            ),
                          }}
                        >
                          {faq.a}
                        </ReactMarkdown>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
