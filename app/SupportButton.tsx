"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SupportButton() {
  const [count, setCount] = useState<number | null>(null);
  const [clicked, setClicked] = useState(false);
  const [userKey, setUserKey] = useState<string | null>(null);
  const eventId = "4th-fukuoka";

  // ✅ 初期化：ユーザーキーとカウントをセット
  useEffect(() => {
    // 1️⃣ user_key 確保
    let key = localStorage.getItem("user_key");
    if (!key) {
      key = crypto.randomUUID();
      localStorage.setItem("user_key", key);
    }
    setUserKey(key);

    // 2️⃣ 応援済みチェック
    const stored = localStorage.getItem(`supported_${eventId}`);
    if (stored === "true") setClicked(true);

    // 3️⃣ カウント取得
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
    if (clicked || !userKey) return;
    setClicked(true);

    const { error } = await supabase
      .from("event_support")
      .insert({ event_id: eventId, user_key: userKey });

    if (error) {
      console.error("Insert error:", error);
      return;
    }

    localStorage.setItem(`supported_${eventId}`, "true");

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
      disabled={clicked}
      className={`px-4 py-2 rounded-full border transition ${
        clicked
          ? "bg-amber-500 border-amber-400 text-white"
          : "border-amber-400 text-amber-300 hover:bg-amber-700/30"
      }`}
      style={{ marginLeft: "1rem" }}
    >
      {clicked ? "📣 応援中！" : "📣 応援してるよー"}{" "}
      {count ? `(${count})` : ""}
    </motion.button>
  );
}
