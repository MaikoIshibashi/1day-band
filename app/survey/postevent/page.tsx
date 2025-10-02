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

const SCALE5_DIFFICULTY = [
  { value: 5, label: "とても難しかった" },
  { value: 4, label: "やや難しかった" },
  { value: 3, label: "普通" },
  { value: 2, label: "やや簡単だった" },
  { value: 1, label: "とても簡単だった" },
];

export default function PostEventSurveyPage() {
  const [mounted, setMounted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [surveyId, setSurveyId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

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
      setSurveyId(survey.id);

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

  if (!mounted) return null;
  if (loading) return <p className="p-6 text-white">読み込み中...</p>;
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-2xl font-bold">🎉 回答ありがとうございました！</h1>
      </div>
    );
  }

  // 📌 フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!surveyId) return;

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const entries = Array.from(formData.entries());

    // ニックネームを必須チェック
    const nicknameEntry = entries.find(([key]) => {
      const q = questions.find((qq) => qq.id === key);
      return q?.text.includes("ニックネーム");
    });
    const nickname = nicknameEntry ? nicknameEntry[1].toString().trim() : "";

    if (!nickname) {
      alert("ニックネームを入力してください。");
      return;
    }

    // 1. responses に親レコードを作成
    const { data: response, error: respError } = await supabase
      .from("responses")
      .insert([{ survey_id: surveyId, nickname }])
      .select("id")
      .single();

    if (respError || !response) {
      console.error("responses insert error:", respError);
      alert("保存に失敗しました。");
      return;
    }

    // 2. answers に各質問の回答を保存（ニックネームは除外）
    const records = entries
      .filter(([key]) => {
        const q = questions.find((qq) => qq.id === key);
        return !q?.text.includes("ニックネーム");
      })
      .map(([questionId, value]) => ({
        response_id: response.id,
        question_id: questionId,
        answer_text: value.toString(),
      }));

    if (records.length > 0) {
      const { error: ansError } = await supabase.from("answers").insert(records);

      if (ansError) {
        console.error("answers insert error:", ansError);
        alert("保存に失敗しました。");
        return;
      }
    }

    // 3. 完了画面に切り替え
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">📝 参加者アンケート</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-8"
        suppressHydrationWarning
      >
        {questions.length === 0 && (
          <p className="text-center text-gray-400">現在アンケートはありません。</p>
        )}

        {questions.map((q) => {
          const scaleOptions = q.text.includes("難易度")
            ? SCALE5_DIFFICULTY
            : SCALE5_POSITIVE;

          return (
            <div
              key={q.id}
              className="bg-gray-900/70 p-6 rounded-2xl shadow-md border border-gray-700"
            >
              <label className="block text-lg font-semibold mb-3">
                {q.text}
              </label>

              {q.input_type === "text" && (
                <input
                  name={q.id}
                  type="text"
                  required={q.text.includes("ニックネーム")}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="入力してください"
                />
              )}

              {q.input_type === "textarea" && (
                <textarea
                  name={q.id}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                  rows={4}
                  placeholder="ご記入ください"
                />
              )}

              {q.input_type === "select" && (
                <div className="flex flex-col space-y-2">
                  {scaleOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.value}
                        className="text-purple-500 focus:ring-purple-400"
                      />
                      <span>
                        {opt.value}. {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}

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
