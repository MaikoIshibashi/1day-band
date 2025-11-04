"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { upsertSupport } from "@/app/actions/upsertSupport"; // ← 追加！

// ✅ Supabase (読み取り専用 / anon)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ ブラウザ識別用キーをローカルに保存
function ensureUserKey(eventId: string) {
  const keyName = `support_userkey_${eventId}`;
  let k = localStorage.getItem(keyName);
  if (!k) {
    k = crypto.randomUUID();
    localStorage.setItem(keyName, k);
  }
  return k;
}

export default function SupportButton() {
  const eventId = "4th-fukuoka";

  const [count, setCount] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // ✅ 初期ロード（count 読み込み & localStorage 反映）
  useEffect(() => {
    const stored = localStorage.getItem(`supported_${eventId}`);
    if (stored === "true") setSubmitted(true);

    const fetchCount = async () => {
      const { count } = await supabase
        .from("event_support")
        .select("*", { count: "exact" })
        .eq("event_id", eventId);
      setCount(count ?? 0);
    };

    fetchCount();
  }, [eventId]);

  // ✅ 応援ボタンクリック
  async function handleClick() {
    if (submitted) return;

    const userKey = ensureUserKey(eventId);

    // 🔥 Server Action 経由で insert（RLS OK）
    await upsertSupport(eventId, userKey);

    localStorage.setItem(`supported_${eventId}`, "true");
    setSubmitted(true);

    // 最新 count 更新
    const { count } = await supabase
      .from("event_support")
      .select("*", { count: "exact" })
      .eq("event_id", eventId);

    setCount(count ?? 0);
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      disabled={submitted}
      className={`px-4 py-2 rounded-full border transition ${
        submitted
          ? "bg-amber-500 border-amber-400 text-white"
          : "border-amber-400 text-amber-300 hover:bg-amber-700/30"
      }`}
      style={{ marginLeft: "1rem" }}
    >
      {submitted ? "📣 応援中！" : "📣 応援してるよー"} {count ? `(${count})` : ""}
    </motion.button>
  );
}
