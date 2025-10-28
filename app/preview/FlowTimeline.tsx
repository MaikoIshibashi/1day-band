"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FlowTimeline() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const steps = [
    {
      icon: "📝",
      title: "Entry Open",
      time: "本番 約5ヶ月前",
      desc:
        "エントリーページを公開します。\n" +
        "参加希望の方はサイトからお申し込みください。",
    },
    {
      icon: "🎶",
      title: "Member Selection",
      time: "エントリー 約1週間後",
      desc:
        "希望パートや全体バランスを考慮し、\n" +
        "メンバーを決定します。\n" +
        "結果はメールでご案内します。",
    },
    {
      icon: "🎸",
      title: "Part Assignment",
      time: "メンバー確定後",
      desc:
        "同一パート希望者がいる場合は、\n" +
        "希望難易度や全体構成を踏まえて\n" +
        "パートを調整します。",
    },
    {
      icon: "💬",
      title: "Practice Log",
      time: "本番まで",
      desc:
        "グループDMで練習状況を共有します。\n" +
        "相談しながら本番に向けて準備を進めます。",
    },
    {
      icon: "🎤",
      title: "Midpoint Event",
      time: "本番 約2ヶ月前",
      desc:
        "任意参加の中間イベントを開催します。\n" +
        "進捗確認やプチセッションを行います。",
    },
    {
      icon: "📸",
      title: "Performance Day",
      time: "当日",
      desc:
        "スタジオで本番演奏を収録します。\n" +
        "映像は後日YouTubeで公開します。",
    },
    {
      icon: "🍻",
      title: "After Party",
      time: "当日 夜",
      desc:
        "本番後に交流会を開催します。\n" +
        "音楽仲間と語らいながら\n" +
        "特別な時間を楽しみましょう。",
    },
  ];

  return (
    <section className="bg-[#111] text-white py-16 text-center overflow-x-auto">
      <h2 className="text-2xl text-[var(--color-accent)] mb-10">
        当日までの流れ
      </h2>

      <div className="flex gap-6 px-4 sm:px-6 min-w-max justify-center">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 sm:gap-4">
            <motion.div
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="relative bg-gradient-to-tr from-purple-700/30 to-purple-500/10 
                         border border-purple-400/40 rounded-lg transform skew-x-[-10deg]
                         min-w-[150px] sm:min-w-[200px] p-3 sm:p-4 text-left cursor-pointer 
                         hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
            >
              <div className="transform skew-x-[10deg]">
                <div className="text-2xl sm:text-3xl mb-1">{step.icon}</div>
                <h3 className="text-base sm:text-lg font-semibold text-purple-300">
                  {step.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-400">
                  {step.time}
                </p>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      className="text-sm text-gray-300 mt-3 leading-relaxed overflow-hidden"
                      style={{ whiteSpace: "pre-line" }} // ← 改行対応
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      {step.desc}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {i < steps.length - 1 && (
              <div className="text-purple-400 text-2xl sm:text-3xl font-bold transform translate-y-[-6px]">
                ➤
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-gray-400 mt-8 text-xs sm:text-sm">
        タップして詳細を見る 👉
      </p>
    </section>
  );
}
