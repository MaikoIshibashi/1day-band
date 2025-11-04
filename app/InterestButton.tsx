"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";

// Supabaseクライアント
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 乱数キー（ブラウザ1人＝1キー）
function ensureUserKey(eventId: string) {
  const keyName = `interest_userkey_${eventId}`;
  let k = localStorage.getItem(keyName);
  if (!k) {
    k = crypto.randomUUID(); // ブラウザ内のユニークID
    localStorage.setItem(keyName, k);
  }
  return k;
}

export default function InterestButton() {
  const eventId = "4th-fukuoka";

  const [open, setOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false); // 参加登録済みか
  const [count, setCount] = useState<number | null>(null);

  // 初期ロード
  useEffect(() => {
    const storedPart = localStorage.getItem(`interest_part_${eventId}`);
    if (storedPart) {
      setSubmitted(true);
      setSelectedPart(storedPart);
    }

    const fetchCount = async () => {
      const { count } = await supabase
        .from("event_interest")
        .select("*", { count: "exact" })
        .eq("event_id", eventId);
      setCount(count ?? 0);
    };
    fetchCount();
  }, [eventId]);

  // 登録・変更処理
  async function handleSubmit() {
    if (!selectedPart) return;
    setSubmitting(true);

    const userKey = ensureUserKey(eventId);
    let action: "新規登録" | "変更" = "新規登録";

    const { data: existing, error: fetchErr } = await supabase
      .from("event_interest")
      .select("id")
      .eq("event_id", eventId)
      .eq("user_key", userKey)
      .limit(1);

    if (fetchErr) console.error(fetchErr);

    if (existing && existing.length > 0) {
      const targetId = existing[0].id;
      const { error: updateErr } = await supabase
        .from("event_interest")
        .update({ part: selectedPart })
        .eq("id", targetId);
      if (updateErr) console.error(updateErr);
      action = "変更";
    } else {
      const { error: insertErr } = await supabase.from("event_interest").insert({
        event_id: eventId,
        part: selectedPart,
        user_key: userKey,
      });
      if (insertErr) console.error(insertErr);
      action = "新規登録";
    }

    // localStorage更新
    localStorage.setItem(`interest_part_${eventId}`, selectedPart);

    // UI更新
    setSubmitted(true);
    setOpen(false);
    setSubmitting(false);

    // 最新count更新
    const { count: refreshedCount } = await supabase
      .from("event_interest")
      .select("*", { count: "exact" })
      .eq("event_id", eventId);
    setCount(refreshedCount ?? 0);

    // ✅ メール通知API呼び出し
    try {
      await fetch("/api/notify-part", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          part: selectedPart,
          userKey,
          action, // ← "新規登録" or "変更"
        }),
      });
    } catch (err) {
      console.error("メール通知APIエラー:", err);
    }
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      {!submitted ? (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(true)}
          className="px-6 py-2 rounded-full border border-purple-400 text-purple-300 hover:bg-purple-700/30 transition"
        >
          💜 興味ある {count ? `(${count})` : ""}
        </motion.button>
      ) : (
        <div className="flex flex-col items-center">
          <div className="px-6 py-2 rounded-full border border-purple-400 text-purple-300 bg-purple-700/30 text-center">
            💜 登録済み（{selectedPart}） {count ? `(${count})` : ""}
          </div>
          <button
            onClick={() => setOpen(true)}
            className="text-sm text-gray-400 hover:text-purple-300 mt-2 underline"
          >
            パートを変更する
          </button>
        </div>
      )}

      {/* モーダル */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!submitting) setOpen(false);
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-purple-400 rounded-xl p-6 text-white w-[90%] max-w-md shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-xl text-purple-300 mb-4">
                パートを{submitted ? "変更" : "選択"}してください 🎸
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {["Vocal", "Guitar", "Bass", "Drums", "Keyboard", "Other"].map(
                  (part) => (
                    <button
                      key={part}
                      onClick={() => setSelectedPart(part)}
                      className={`border rounded-lg px-3 py-2 transition ${
                        selectedPart === part
                          ? "bg-purple-600 border-purple-400"
                          : "border-gray-600 hover:border-purple-400"
                      }`}
                    >
                      {part}
                    </button>
                  )
                )}
              </div>

              {/* Other を押したとき */}
              {selectedPart === "Other" && (
                <input
                  type="text"
                  placeholder="例：Chorus / Percussion / Tambourine など"
                  className="w-full mt-3 px-3 py-2 rounded-md bg-black border border-purple-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onChange={(e) => {
                    const v = e.target.value.trim();
                    if (v.length > 0) {
                      setSelectedPart(v);
                    }
                  }}
                />
              )}

              <div className="flex justify-end mt-6 gap-3">
                <button
                  onClick={() => !submitting && setOpen(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !selectedPart}
                  className={`px-4 py-2 rounded-full font-bold transition ${
                    submitting
                      ? "bg-gray-500"
                      : "bg-purple-500 hover:bg-purple-600 text-white"
                  }`}
                >
                  {submitting ? "送信中..." : "確定"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
