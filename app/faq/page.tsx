"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function FAQPage() {
  const faqCategories = [
    // ① 参加について
    {
      category: "参加について",
      items: [
        {
          q: "初心者でも大丈夫ですか？",
          a: `もちろん大丈夫です！  
初心者の方もサポートし合いながら一緒に音を作っていくことを大切にしています。  
『弾けるかな？』よりも『楽しみたい！』の気持ちが一番大事です🎶`,
        },
        {
          q: "誰でも参加できますか？",
          a: `年齢や演奏経験を問わず、どなたでもご応募いただけます！  
ただし、参加者同士のやり取りや進捗共有はグループDMで行うため、X（旧Twitter）アカウントをお持ちの方を対象としています。  

また、各パートの人数バランスや難易度を考慮してメンバーを決定しています。  
希望パートが集中した場合や安全面の都合などによりお受けできないこともありますが、  
できるだけ多くの方に楽しんでいただけるよう調整しています🎸`,
        },
        {
          q: "初対面の人ばかりで不安ですが大丈夫ですか？",
          a: `大丈夫です！  
当日だけでなくイベント前からグループDMで練習状況の共有をしたり雑談したりしていますので  
自然と仲良くなれますので安心してください^^ 不安なことがあれば何でもご相談ください♪`,
        },
        {
          q: "練習は当日だけですか？",
          a: `基本的に本番当日のみのセッションとなります。
          希望者同士で事前に練習したり、スタジオを個別に借りて合わせるなどは自由にOKです！  
運営が参加するのは当日のみとなります🙇‍♀️`,
        },
        {
          q: "ZOOMなどオンラインでの打ち合わせはありますか？",
          a: `事前のMTGなどはありません😊  
演奏の不明点などあればDMでの相談や動画を送っていただくなどして不明点を解消していく流れになります。`,
        },
        {
          q: "他のパートと掛け持ちはできますか？",
          a: `キーボードとギターなど複数パートの掛け持ちも可能です🎹🎸  
ただし他の参加希望者とのバランスを見ながら調整させていただきます。`,
        },
        {
          q: "年齢制限はありますか？",
          a: `特にありません🫶🏻これまでは30代〜50代くらいの方が多いです。  
未成年の場合は保護者の同意をお願いします🙇‍♀️`,
        },
        {
          q: "キャンセルは可能ですか？",
          a: `やむを得ない事情がある場合はキャンセル可能です。  
再募集する必要があるため出来るだけ早めにご連絡をお願いします。  
当日の無断キャンセルは次回以降の参加をお断りする場合がありますのでご了承ください。`,
        },
        {
          q: "打ち上げは必須ですか？",
          a: `いいえ、任意参加です👍  
スタジオのみ・打ち上げ込みのどちらでもご参加いただけます🍻`,
        },
      ],
    },

    // ② 演奏について
    {
      category: "演奏について",
      items: [
        {
          q: "どんな曲を演奏しますか？",
          a: `GLAYの楽曲を2曲選曲して演奏します。  
回ごとに少しずつ違った雰囲気を楽しめるようにしています🎸`,
        },
        {
          q: "楽譜（スコア）はどうなっていますか？",
          a: `主催がバンドスコアを用意し、全員で共通の譜面を使用します。  
複数ギターやコーラスなどのパート分担が必要な場合は、  
主催が全体バランスと希望難易度にて調整し別途、譜面をご用意します📖  
譜面が読めない方や複雑なパート割の場合は動画を用意することもあります📹`,
        },
        {
          q: "演奏レベルはどのくらいですか？",
          a: `演奏する曲とパートによって難易度は異なります。
譜面はこちらでバンドスコアを用意しますがそれ通りに演奏する必要はありません。
ただし同じ楽器の演奏者がいる場合は相手の演奏を妨げないよう指定がある場合もありますのでご注意ください🙇‍♀️

弾いてみた動画や簡単パートに置き換えていただくこともOKです！
特にご希望がなければ演奏者のスキルと希望難易度に応じてパート割をします。  
ご希望の方には簡単なパートを優先的にご案内します👍
また、フルパート弾けなくても大丈夫ですのでご安心ください💕`,
        },
        {
          q: "音作りはどのようにしたら良いですか？",
          a: `ギターなど事前に音作りが必要なパートはエフェクターなどで各自作成をお願いします。
お持ちでない場合はアンプの調整のみでも大丈夫です。

音色の細かい指定はありませんがどのように作って良いか不明な場合は音源の音色に寄せていくと理想に近づきやすいかなと思います^^
本番では練習開始前に各パートの音量や音色やバランスを確認します。  
エフェクター設定や音作りに不安がある方は遠慮なくご相談ください🎛️`,
        },
        {
          q: "演奏は撮影されますか？",
          a: `当日は2台のカメラで撮影し、後日編集した映像をYouTubeに公開します。  
撮影データは全員に共有され、思い出としても残ります📸（モザイクも対応します）`,
        },
        {
          q: "もし演奏をミスしたらどうなりますか？",
          a: `ミスしても大丈夫です！  
『完璧に弾くこと』よりも『音を合わせて楽しむこと』を大切にしています😊`,
        },
        {
          q: "みんながどのくらい練習が進んでいるか知りたいです。",
          a: `Membersサイトより各自練習動画をアップできるようにしていきますのでそちらを参考にされてください🌐

また、不明点や質問は同じ悩みを持っている方も解決できることがありますのでグループ内でどんどん共有していきましょう♪`,
        },
        {
          q: "立って演奏するのが難しいです。",
          a: `座って演奏でも問題ないです！好きな演奏スタイルで楽しまれてください⭐️`,
        },      ],
    },

    // ③ 費用について
    {
      category: "費用について",
      items: [
        {
          q: "参加費はいくらですか？",
          a: `参加費は5,000円です。  
＋オプション4,000円で打ち上げにも参加できます🎉  

＜＜ 参加費に含まれるもの ＞＞ 
・スタジオ利用（5H）＋ 機材レンタル含む  
・記念品（メンバー全員の名前入り）  
・スコア（パート割含む）  
・YouTube公開用映像2本（動画編集・MIX込）  
・中間イベント動画2本（動画編集・MIX込）※任意参加  
・当日撮影データ共有  
・メンバー限定グループDM／Membersサイト利用  
・チケット兼領収書発行`,
        },
        {
          q: "支払い方法は？",
          a: `現金・PayPay・各種クレジットカード
（Visa/ Master/ JCB/ AMEX/ JCB/ Diners/ DISCOVER）に対応しています。  
当日までにお支払いでOKです。支払日についてはエントリー確定後のアンケートで確認します。`,
        },
        {
          q: "キャンセル料はありますか？",
          a: `キャンセル料はありませんが、確定後のキャンセルは分かり次第ご連絡をお願いします。
すでにお支払い済みの場合は返金します。`,
        },
        {
          q: "プラン変更は可能ですか？",
          a: `After Party参加の可否については、後からでも変更可能ですがクレジットの場合の差額は相談にて調整させていただきます。`,
        },
        {
          q: "領収書はもらえますか？",
          a: `イベントチケット兼領収書をお渡しします🎫`,
        },
      ],
    },

    // ④ 当日について
    {
      category: "当日について",
      items: [
        {
          q: "開催日はいつ頃ですか？",
          a: `春と秋の年2回開催しています。  
開催地によって異なりますが、基本的には土日祝に実施しています。`,
        },
        {
          q: "集合時間はどのくらい？",
          a: `お昼前に集合し、夕方にかけて本番演奏を行うスケジュールが多いです。  
詳細は参加者決定後にお知らせします。`,
        },
        {
          q: "会場はどこですか？",
          a: `開催地ごとに異なりますが、アクセスしやすく広めの設備の整ったスタジオを選んでいます。  
エントリー確定後に詳細をご案内します。`,
        },
        {
          q: "機材は持参ですか？",
          a: `基本的にはご自身の楽器をお持ちください。  
ドラムやアンプなどの大型機材はスタジオのものを使用します。
どのアンプが良いかなどは後ほどヒアリングします。`,
        },
        {
          q: "体調不良などで参加できなくなった場合は？",
          a: `公式メール（info@1daystudioband.com）までご連絡ください。  
無理せず安全第一でお願いします。`,
        },
      ],
    },

    // ⑤ その他
    {
      category: "その他",
      items: [
        {
          q: "今後も開催予定はありますか？",
          a: `年2回（春・秋）を予定しています。  
開催地は毎回異なります。  
最新情報は公式サイトやXでお知らせします📢`,
        },
        {
          q: "中間イベントのプチセッションというのはどういったものですか？",
          a: `こちらで譜面の範囲の指定をしますので音源なしで楽器のみ音が出るようにして動画を提出いただきます。  
その映像をこちらで編集してコラボ動画としてYouTubeへアップするという企画になります。
可能であれば雑音が入らないようLINE接続だと助かります🙇‍♀️`,
        },        
        {
          q: "友人と一緒に参加できますか？",
          a: `もちろん可能です！  
応募フォームで『同伴希望』を記載していただければ、できる限り調整いたします。`,
        },
        {
          q: "地方からでも参加できますか？",
          a: `全国からのご参加OKです！  
遠方から新幹線や飛行機で来られる方も多くいらっしゃいます✈️  
宿泊先などが必要な場合、早めの確保をお勧めします！`,
        },
        {
          q: "メンバーが揃わない時はどうなりますか？",
          a: `必要なメンバーが揃わない場合、オンラインでの参加やパート変更、打ち込みなどで対応を考えています。  
それでも難しい場合は地域変更や開催を見送ることも検討します。`,
        },
      ],
    },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [openCategory, setOpenCategory] = useState<{ [key: number]: boolean }>({});
  const [openItem, setOpenItem] = useState<{ [key: string]: boolean }>({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);

    // ✅ PCは最初から開く・モバイルは閉じる
    setOpenCategory(Object.fromEntries(faqCategories.map((_, i) => [i, !mobile])));
    setOpenItem(
      Object.fromEntries(
        faqCategories.flatMap((cat, i) =>
          cat.items.map((_, j) => [`${i}-${j}`, !mobile])
        )
      )
    );

    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // ✅ 両方で開閉できる
  const toggleCategory = (i: number) => {
    setOpenCategory((prev) => ({ ...prev, [i]: !prev[i] }));
  };
  const toggleItem = (key: string) => {
    setOpenItem((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section
      className={`reveal ${visible ? "visible" : ""}`}
      style={{
        padding: "8rem 1.5rem 4rem",
        backgroundColor: "#000",
        color: "white",
        scrollMarginTop: "80px",
      }}
    >
      {/* 🔹タイトル */}
      <h2
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
          color: "var(--color-accent)",
          textAlign: "center",
          lineHeight: "1.2",
          whiteSpace: "normal",
          wordBreak: "normal",
          marginBottom: "2.5rem",
        }}
      >
        FAQ
        <span
          style={{
            fontSize: "clamp(1rem, 3vw, 1.2rem)",
            opacity: 0.8,
            marginLeft: "0.3rem",
          }}
        >
          （よくある質問）
        </span>
      </h2>

      {/* 🔹FAQ本体 */}
      <div className="faq-container" style={{ maxWidth: "800px", margin: "0 auto" }}>
        {faqCategories.map((cat, i) => (
          <div key={i} style={{ marginBottom: "1.8rem" }}>
            {/* カテゴリー見出し */}
            <div
              onClick={() => toggleCategory(i)}
              className="faq-category"
              style={{
                cursor: "pointer",
                fontSize: "1.4rem",
                fontWeight: "bold",
                borderBottom: "2px solid var(--color-accent)",
                paddingBottom: "0.3rem",
                marginBottom: "0.8rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#eee",
              }}
            >
              <span>{cat.category}</span>
              <span>{openCategory[i] ? "−" : "+"}</span>
            </div>

            {/* QAリスト */}
            {openCategory[i] && (
              <div>
                {cat.items.map((faq, j) => {
                  const key = `${i}-${j}`;
                  const isOpen = openItem[key];
                  return (
                    <div
                      key={key}
                      style={{
                        marginBottom: "0.8rem",
                        border: "1px solid #444",
                        borderRadius: "6px",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {/* 質問 */}
                      <div
                        onClick={() => toggleItem(key)}
                        className="faq-question"
                        style={{
                          cursor: "pointer",
                          backgroundColor: "#1a1a1a",
                          padding: "0.6rem 1rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          color: "#fff",
                          lineHeight: "1.4",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>Q. {faq.q}</span>
                        <span>{isOpen ? "−" : "+"}</span>
                      </div>
                      {/* 回答 */}
                      <div
                        className="faq-answer"
                        style={{
                          maxHeight: isOpen ? "1000px" : "0px",
                          overflow: "hidden",
                          transition: "max-height 0.3s ease",   // ← ここ変更（opacity を外す）
                          backgroundColor: "#262626",
                          color: "#ddd",
                          padding: isOpen ? "0.5rem 1rem" : "0 1rem",
                          lineHeight: "1.4",
                          whiteSpace: "pre-line",
                          willChange: "max-height",              // ← safari の再描画対策で追加
                        }}
                      >

                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p
                                style={{
                                  marginBottom: "0.3rem",
                                  lineHeight: "1.4",
                                  whiteSpace: "pre-line",
                                }}
                              >
                                {children}
                              </p>
                            ),
                            strong: ({ children }) => (
                              <strong style={{ color: "var(--color-accent)" }}>
                                {children}
                              </strong>
                            ),
                            a: ({ children, href }) => (
                              <Link
                                href={href || "#"}
                                style={{
                                  color: "var(--color-accent)",
                                  textDecoration: "underline",
                                }}
                              >
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

      {/* 🔹スタイル調整 */}
      <style jsx global>{`
        .faq-container p {
          margin-bottom: 0.3rem !important;
          line-height: 1.4 !important;
        }
        .faq-container div {
          line-height: 1.4 !important;
        }
        .faq-question {
          padding: 0.6rem 1rem !important;
        }
        .faq-answer {
          padding: 0.5rem 1rem !important;
        }
        .faq-category {
          margin-bottom: 0.8rem !important;
          padding-bottom: 0.3rem !important;
        }
      `}</style>
    </section>
  );
}