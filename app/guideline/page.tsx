
export default function GuidelinePage() {
  return (
    <main className="min-h-screen bg-black text-gray-100 px-6 py-12 pt-28">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <header className="text-center space-y-4">
        <h1
          className="text-center font-bold text-purple-400"
          style={{
            fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
            lineHeight: "1.4",
            wordBreak: "keep-all",
            whiteSpace: "normal", // ← nowrapを解除！
          }}
        >
          🎸1Day Studio Band
          <br className="block md:hidden" /> {/* ← スマホでは強制改行 */}
          <span
            style={{
              fontSize: "clamp(1rem, 3.5vw, 1.4rem)",
              opacity: 0.9,
              display: "inline-block",
              marginTop: "0.3rem",
            }}
          >
            ｜参加にあたってのお願い
          </span>
        </h1>



          <p className="text-gray-300 leading-relaxed">
            1Day Studio Bandは、音楽を通じて仲間と楽しく演奏することを目的としたイベントです。
          </p>
          <p className="text-gray-300 leading-relaxed">
            みんなが安心して気持ちよく参加できるよう、以下の内容にご理解とご協力をお願いします🎶
          </p>
        </header>

        {/* 🎧 演奏について */}
      <section>
        <h2 className="text-xl font-semibold text-purple-300 mb-3">🎧 演奏について</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>事前に音源や譜面を確認し、スムーズな進行にご協力をお願いします。</li>
          <li>
            パート分担に不安がある場合は、事前にご相談ください。
            必要に応じてパートの調整やアレンジにも柔軟に対応します！
          </li>
          <li>割り当てられたパートや担当箇所を尊重し、他のメンバーの演奏を妨げないようにお願いします。</li>
          <li>みんなでひとつの音を作る意識を持ち、チーム全体での調和を大切にしましょう🎶</li>
        </ul>
      </section>


        {/* 💬 コミュニケーションについて */}
        <section>
          <h2 className="text-xl font-semibold text-purple-300 mb-3">💬 コミュニケーションについて</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>
            グループDMは、イベント当日までの連絡共有と交流の場として利用します。
          </li>
          <li>
            会話に無理に参加したり、毎回返信していただく必要はありません。ご自身のペースで大丈夫です😊
          </li>
          <li>
            ただし、運営からの全体連絡・確認が必要な内容には、👍などのリアクション または 簡単な返信での確認をお願いします。
          </li>
            <li>
              他イベントや個人活動などの告知・宣伝・勧誘はご自身のSNSでお願いします。
            </li>
            <li>
              批判・マウントなど、他の方が不快に感じる行為は禁止とさせていただきます。
            </li>
          </ul>
        </section>



        {/* 🤝 マナーとリスペクト */}
        <section>
          <h2 className="text-xl font-semibold text-purple-300 mb-3">🤝 マナーとリスペクト</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>相手を思いやり、安心して楽しめる空間づくりにご協力ください。</li>
            <li>トラブルや不安なことがあれば、遠慮なく運営までご相談ください。</li>
            <li>みんなで気持ちよく音を楽しめる場を一緒につくっていきましょう🌈</li>
            <li>
              イベントの趣旨にそぐわない言動や、他の参加者への配慮を欠く行為があった場合は、
              参加をお断りさせていただく場合があります。参加者の皆様が安心して楽しめる空間を守るための
              対応となりますので、ご理解ください🙏
            </li>
          </ul>
        </section>

        {/* 🪩 SNS投稿について */}
        <section>
        <h2 className="text-xl font-semibold text-purple-300 mb-3">📱 SNS投稿について</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>
            1Day Studio Bandに関する投稿時のタグは
            <span className="text-purple-400 font-semibold"> #1DayStudioBand </span>
            をぜひご利用ください！
            </li>
            <li>
            <span className="text-gray-300">
                #ギター や #バンド など、一般的な音楽関連タグとの併用はOKです🎸
            </span>
            </li>
            <li>
            ただし、他の団体・イベントなどのタグと混在しないようにご配慮をお願いします。
            誤解や混乱を避けるため、他コミュニティのタグ併用や関連投稿との同時掲載はご遠慮ください🙏
            </li>
            <li>
            参加メンバーの公表については、各自の判断にお任せします。<br />
            ご本人の了承がない限り、他の方の出演情報やお名前をSNS等で公表しないようご配慮をお願いします🙇‍♀️
            </li>
            <li>
              運営の個人アカウントはプライベート用途も含むため、<br />
              拡散やタグ付けはイベント公式アカウントを中心にしていただけると助かります💜<br />
              （※ 個人アカウントへのタグ付けやリンクは控えていただけると嬉しいです🙏）
            </li>
        </ul>
        </section>


        {/* 📅 当日について */}
        <section>
          <h2 className="text-xl font-semibold text-purple-300 mb-3">📅 当日について</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>キャンセルとなる場合は、わかった時点で早めにお知らせいただけると助かります。</li>
            <li>当日は限られた時間で進行します。集合・準備・撤収のタイミングにご協力をお願いします。</li>
            <li>機材の接続など困っている方を見かけた時は、できる範囲でサポートしていただけると助かります🙏</li>
            <li>忘れ物や体調不良、小さな心配事などでも構いません。何かあればすぐに運営までお声かけください。</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
