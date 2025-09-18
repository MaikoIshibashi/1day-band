"use client";
import { useState } from "react";

export default function SurveyPage() {
  const [form, setForm] = useState({
    nickname: "",
    unavailableDays: "",
    transport: "",
    arrivalTime: "",
    plan: "",
    payment: "",
    bandExp: "",
    scoreReading: "",
    support: "",
    level: "",
    mosaic: "",
    xIntro: "",
    midEvent: "",
    concerns: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("送信中...");

    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("アンケートを送信しました！ありがとうございました。");
        setForm({
          nickname: "",
          unavailableDays: "",
          transport: "",
          arrivalTime: "",
          plan: "",
          payment: "",
          bandExp: "",
          scoreReading: "",
          support: "",
          level: "",
          mosaic: "",
          xIntro: "",
          midEvent: "",
          concerns: "",
        });
      } else {
        setStatus("送信に失敗しました。もう一度お試しください。");
      }
    } catch (err) {
      setStatus("エラーが発生しました。");
    }
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "4rem",
        backgroundColor: "#000",
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          color: "var(--color-accent)",
          textAlign: "center",
        }}
      >
        追加アンケート（参加予定者向け）
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "2rem",
          maxWidth: "700px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <input
          name="nickname"
          value={form.nickname}
          onChange={handleChange}
          placeholder="ニックネーム"
          required
          style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#111", color: "white" }}
        />

        <textarea
          name="unavailableDays"
          value={form.unavailableDays}
          onChange={handleChange}
          placeholder="4月〜5月で都合の悪い日があれば教えてください"
          style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#111", color: "white", minHeight: "80px" }}
        />

        <select name="transport" value={form.transport} onChange={handleChange} style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#111", color: "white" }}>
          <option value="">交通手段を選択</option>
          <option>電車</option>
          <option>車</option>
          <option>バス</option>
          <option>その他</option>
        </select>

        <input
          name="arrivalTime"
          value={form.arrivalTime}
          onChange={handleChange}
          placeholder="開始時間は昼前を予定、何時頃到着可能でしょうか"
          style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#111", color: "white" }}
        />

        <input
          name="plan"
          value={form.plan}
          onChange={handleChange}
          placeholder="プランの確認（例: スタジオのみ / 打ち上げあり）"
          style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#111", color: "white" }}
        />

        <input
          name="payment"
          value={form.payment}
          onChange={handleChange}
          placeholder="支払い方法と時期の確認"
          style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#111", color: "white" }}
        />

        <select name="bandExp" value={form.bandExp} onChange={handleChange} style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#111", color: "white" }}>
          <option value="">バンド経験の有無</option>
          <option>あり</option>
          <option>なし</option>
        </select>

        <select name="scoreReading" value={form.scoreReading} onChange={handleChange} style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#111", color: "white" }}>
          <option value="">譜面が読めるか</option>
          <option>はい</option>
          <option>いいえ</option>
        </select>

        <select name="support" value={form.support} onChange={handleChange} style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#111", color: "white" }}>
          <option value="">機材接続等サポートが必要か</option>
          <option>必要</option>
          <option>不要</option>
        </select>

        <input
          name="level"
          value={form.level}
          onChange={handleChange}
          placeholder="希望する演奏レベル（例: 初心者〜中級）"
          style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#111", color: "white" }}
        />

        <select name="mosaic" value={form.mosaic} onChange={handleChange} style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#111", color: "white" }}>
          <option value="">モザイク処理の希望</option>
          <option>必要</option>
          <option>不要</option>
        </select>

        <select name="xIntro" value={form.xIntro} onChange={handleChange} style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#111", color: "white" }}>
          <option value="">Xアカウント紹介の可否</option>
          <option>紹介してOK</option>
          <option>紹介しないでほしい</option>
        </select>

        <select name="midEvent" value={form.midEvent} onChange={handleChange} style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#111", color: "white" }}>
          <option value="">中期イベント参加予定</option>
          <option>参加予定</option>
          <option>未定</option>
          <option>参加しない</option>
        </select>

        <textarea
          name="concerns"
          value={form.concerns}
          onChange={handleChange}
          placeholder="何か不安なことがあればご記入ください"
          style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#111", color: "white", minHeight: "80px" }}
        />

        <button
          type="submit"
          style={{
            padding: "0.8rem",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "var(--color-accent)",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          アンケートを送信
        </button>
      </form>

      {status && (
        <p style={{ marginTop: "1rem", textAlign: "center", color: "gray" }}>{status}</p>
      )}
    </section>
  );
}
