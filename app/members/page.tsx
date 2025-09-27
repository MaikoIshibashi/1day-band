"use client";
import { useState } from "react";

export default function MembersPage() {
  const [pw, setPw] = useState("");
  const [ok, setOk] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });

    if (res.ok) {
      setOk(true);
    } else {
      alert("パスワードが違います");
    }
  };

  if (!ok) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-[#111] border border-gray-700 rounded-xl p-8 shadow-xl w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-amber-400 mb-4">
            Members Only 🔒
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="パスワード"
              className="w-full px-4 py-2 rounded-md bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400 text-white"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-amber-500 hover:bg-amber-400 transition text-black font-semibold"
            >
              入室
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-amber-400 mb-4">
          🎸 Members 専用ページ
        </h1>
        <p className="text-gray-300">
          ようこそ！ここにはリハーサル情報・当日の流れなどを掲載予定です。
        </p>
      </div>
    </section>
  );
}
