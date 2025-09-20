export default function PreviewPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="h-[80vh] flex flex-col items-center justify-center text-center bg-gradient-to-b from-black via-[#28003c] to-black">
        <div id="hero" className="animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            1Day Studio Band
          </h1>
          <p className="text-purple-400 text-lg md:text-xl">
            音楽仲間とつくる、最高の一日。
          </p>
        </div>
      </section>

      {/* Status */}
      <section id="status" className="py-16 text-center bg-zinc-900">
        <h2 className="text-2xl md:text-3xl text-purple-400 mb-4">
          現在のステータス
        </h2>
        <p className="text-gray-200">
          🎶 <strong className="text-purple-400">第3回 名古屋セッション</strong> は
          <br />2025年10月12日（日）に開催予定です！
        </p>
      </section>
    </main>
  );
}
