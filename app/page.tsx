"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [part, setPart] = useState("Vo");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, part, message }),
    });
    setResult(await res.text());
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">🎸 1Day Studio Band 応募フォーム</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="お名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <select
          value={part}
          onChange={(e) => setPart(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="Vo">Vo（ボーカル）</option>
          <option value="Gt">Gt（ギター）</option>
          <option value="Ba">Ba（ベース）</option>
          <option value="Key">Key（キーボード）</option>
          <option value="Dr">Dr（ドラム）</option>
        </select>

        <textarea
          placeholder="メッセージ（任意）"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition"
        >
          送信
        </button>
      </form>

      {result && (
        <p className="mt-4 text-green-400 font-semibold">{result}</p>
      )}
    </main>
  );
}
