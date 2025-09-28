"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Question = {
  id: string;
  text: string;
  input_type: string;
  order_no: number;
};

const SCALE5_POSITIVE = [
  { value: 5, label: "とても良かった" },
  { value: 4, label: "まあ良かった" },
  { value: 3, label: "どちらともいえない" },
  { value: 2, label: "あまり良くなかった" },
  { value: 1, label: "全く良くなかった" },
];

export default function PostEventSurveyPage() {
  const [mounted, setMounted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data: surveys } = await supabase
        .from("surveys")
        .select("id, title, category, is_active")
        .eq("category", "EventEnd")
        .eq("is_active", true);

      if (!surveys || surveys.length === 0) {
        setLoading(false);
        return;
      }
      const survey = surveys[0];

      const { data: qs } = await supabase
        .from("questions")
        .select('id, text: "text", input_type, order_no, survey_id')
        .eq("survey_id", survey.id)
        .order("order_no");

      if (qs) setQuestions(qs as Question[]);
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  // マウント前は描画しない → SSR/CSR差分を防ぐ
  if (!mounted) return null;
  if (loading) return <p className="p-6 text-white">読み込み中...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">📝 参加者アンケート</h1>

      <form suppressHydrationWarning className="w-full max-w-2xl space-y-8">

        {questions.length === 0 && (
          <p className="text-center text-gray-400">現在アンケートはありません。</p>
        )}

        {questions.map((q) => (
          <div
            key={q.id}
            className="bg-gray-900/70 p-6 rounded-2xl shadow-md border border-gray-700"
          >
            <label className="block text-lg font-semibold mb-3">{q.text}</label>

            {q.input_type === "text" && (
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="入力してください"
              />
            )}

            {q.input_type === "textarea" && (
              <textarea
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                rows={4}
                placeholder="ご記入ください"
              />
            )}

            {q.input_type === "select" && (
              <div className="flex flex-col space-y-2">
                {SCALE5_POSITIVE.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={q.id}  // 質問ごとにグループ化
                      value={opt.value}
                      className="text-purple-500 focus:ring-purple-400"
                    />
                    <span>{opt.value}. {opt.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        {questions.length > 0 && (
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg transition"
            >
              回答を送信 🚀
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
