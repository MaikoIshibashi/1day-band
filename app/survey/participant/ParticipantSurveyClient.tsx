"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import { supabase } from "@/lib/supabaseClient";

// ===== 型定義 =====
interface Survey {
  id: string;
  title: string | null;
}

interface Question {
  id: string;
  text: string;
  input_type: "text" | "textarea" | "select";
  options?: string | null;
  order_no: number;
}

interface Member {
  id: string;
  name: string;
  email: string;
  xaccount: string;
}

function ParticipantSurveyClient() {
  const SURVEY_ID = "fe0aa4ba-03f3-4a41-b0fb-0fb1edc475fc";
  const searchParams = useSearchParams();
  const memberId = searchParams.get("member_id");

  // ==== useState（型完全定義） ====
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [member, setMember] = useState<Member | null>(null);
  const [status, setStatus] = useState<string>("");

  // ==== メンバー情報を取得 ====
  useEffect(() => {
    if (!memberId) return;

    const fetchMember = async () => {
      const { data, error } = await supabase
        .from("members")
        .select("id, name, email, xaccount")
        .eq("id", memberId)
        .single();

      if (error || !data) {
        console.error("メンバー情報取得エラー:", error);
        setStatus("メンバー情報が取得できませんでした。");
        return;
      }

      const typedData: Member = {
        id: data.id,
        name: data.name,
        email: data.email,
        xaccount: data.xaccount,
      };

      setMember(typedData);
      setAnswers((prev) => ({
        ...prev,
        "ニックネーム（自動入力または確認のみ）": data.name || "",
      }));
    };

    fetchMember();
  }, [memberId]);

  // ==== アンケート設問を取得 ====
  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const { data: surveyData, error: surveyErr } = await supabase
          .from("surveys")
          .select("*")
          .eq("id", SURVEY_ID)
          .single();

        if (surveyErr) throw surveyErr;

        const { data: questionData, error: questionErr } = await supabase
          .from("questions")
          .select("*")
          .eq("survey_id", SURVEY_ID)
          .order("order_no", { ascending: true });

        if (questionErr) throw questionErr;

        setSurvey(surveyData as Survey);
        setQuestions((questionData || []) as Question[]);
      } catch (err) {
        console.error("アンケート取得エラー:", err);
        setStatus("アンケートの読み込みに失敗しました。");
      }
    };

    fetchSurvey();
  }, []);

  // ==== 入力変更 ====
  const handleChange = (qid: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  // ==== 送信 ====
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("送信中...");

    try {
      const payload = Object.entries(answers).map(([qid, value]) => ({
        survey_id: SURVEY_ID,
        question_id: qid,
        answer_text: value,
        member_id: member?.id || null,
      }));

      const { error } = await supabase.from("responses").insert(payload);
      if (error) throw error;

      setStatus("ご回答ありがとうございました！");
    } catch (err) {
      console.error(err);
      setStatus("送信に失敗しました。");
    }
  };

  // ==== タイトル整形 ====
  const getFormattedTitle = (rawTitle?: string | null): string => {
    if (!rawTitle) return "参加者アンケート";
    if (rawTitle.includes("CONFIRMED")) return "参加確定アンケート";
    if (rawTitle.includes("END")) return "イベント終了アンケート";
    if (rawTitle.includes("ENTRY")) return "エントリーアンケート";
    return "アンケート";
  };

  // ==== JSX ====
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <section style={{ padding: "4rem", background: "#000", color: "#fff" }}>
        <h1
          style={{
            fontSize: "2rem",
            color: "var(--color-accent)",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          {getFormattedTitle(survey?.title)}
        </h1>

        {/* ✅ メンバー情報 */}
        {member && (
          <div
            style={{
              border: "1px solid #444",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "2rem",
              background: "#111",
            }}
          >
            <p>ニックネーム：{member.name}</p>
            <p>メールアドレス：{member.email}</p>
            <p>Xアカウント：@{member.xaccount}</p>
          </div>
        )}

        {/* ✅ アンケートフォーム */}
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {questions.map((q) => (
            <div key={q.id}>
              <label
                style={{
                  fontWeight: "bold",
                  color: "var(--color-accent)",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                {q.text}
              </label>

              {q.input_type === "text" && (
                <input
                  type="text"
                  value={answers[q.text] || ""}
                  onChange={(e) => handleChange(q.text, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    background: "#111",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #444",
                  }}
                />
              )}

              {q.input_type === "textarea" && (
                <textarea
                  value={answers[q.text] || ""}
                  onChange={(e) => handleChange(q.text, e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "100px",
                    background: "#111",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #444",
                    padding: "0.8rem",
                  }}
                />
              )}

              {q.input_type === "select" && (
                <select
                  value={answers[q.text] || ""}
                  onChange={(e) => handleChange(q.text, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    background: "#111",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #444",
                  }}
                >
                  <option value="">選択してください</option>
                  {(q.options?.split(",") || []).map((opt) => (
                    <option key={opt.trim()}>{opt.trim()}</option>
                  ))}
                </select>
              )}
            </div>
          ))}

          <button
            type="submit"
            style={{
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid var(--color-accent)",
              backgroundColor: "#111",
              color: "var(--color-accent)",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            送信する
          </button>
        </form>

        {status && (
          <p style={{ textAlign: "center", color: "gray", marginTop: "1rem" }}>
            {status}
          </p>
        )}
      </section>
    </>
  );
}

export default function ParticipantSurveyPage() {
  return (
    <Suspense
      fallback={
        <div style={{ color: "#fff", padding: "2rem" }}>読み込み中...</div>
      }
    >
      <ParticipantSurveyClient />
    </Suspense>
  );
}
