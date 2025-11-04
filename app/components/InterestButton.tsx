"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ブラウザユーザー識別
function ensureUserKey(eventId: string) {
  const keyName = `interest_userkey_${eventId}`;
  let k = localStorage.getItem(keyName);
  if (!k) {
    k = crypto.randomUUID();
    localStorage.setItem(keyName, k);
  }
  return k;
}

export default function InterestButton() {
  const eventId = "4th-fukuoka";

  const [open, setOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  // ✅ Other を押したとき専用の入力値
  const [otherText, setOtherText] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // 初期処理
  useEffect(() => {
    const storedPart = localStorage.getItem(`interest_part_${eventId}`);
    if (storedPart) {
      setSubmitted(true);

      // 保存されたパートが Other の場合は入力欄に反映
      if (
        ["Vocal", "Guitar", "Bass", "Drums", "Keyboard", "Other"].includes(
          storedPart
        ) === false
      ) {
        setSelectedPart("Other");
        setOtherText(storedPart);
      } else {
        setSelectedPart(storedPart);
      }
    }

    // 初回 / 最新 count 取得
    const fetchCount = async () => {
      const { count } = await supabase
        .from("event_interest")
        .select("*", { count: "exact" })
        .eq("event_id", eventId);
      setCount(count ?? 0);
    };
    fetchCount();
  }, [eventId]);

  // ✅ submit処理
  async function handleSubmit() {
    const userKey = ensureUserKey(eventId);

    // Other の場合は入力値を使用
    const partToSave =
      selectedPart === "Other" ? otherText.trim() : selectedPart;

    if (!partToSave) return;
    setSubmitting(true);

    const { data: existing } = await supabase
      .from("event_interest")
      .select("id")
      .eq("event_id", eventId)
      .eq("user_key", userKey)
      .limit(1);

    if (existing && existing.length > 0) {
      await supabase
        .from("event_interest")
        .update({ part: partToSave })
        .eq("id", existing[0].id);
    } else {
      await supabase.from("event_interest").insert({
        event_id: eventId,
        user_key: userKey,
        part: partToSave,
      });
    }

    localStorage.setItem(`interest_part_${eventId}`, partToSave);

    setSubmitted(true);
    setOpen(false);
    setSubmitting(false);

    const { count: refreshed } = await supabase
      .from("event_interest")
      .select("*", { count: "exact" })
      .eq("event_id", eventId);
    setCount(refreshed ?? 0);
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      {/* ==== ボタン部分 ==== */}
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
            💜 登録済み（{selectedPart === "Other" ? otherText : selectedPart}）
            {count ? ` (${count})` : ""}
          </div>
          <button
            onClick={() => setOpen(true)}
            className="text-sm text-gray-400 hover:text-purple-300 mt-2 underline"
          >
            パートを変更する
          </button>
        </div>
      )}

      {/* ==== モーダル ==== */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !submitting && setOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-purple-400 rounded-xl p-6 text-white w-[90%] max-w-md shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-xl text-purple-300 mb-4">
                パートを選択してください 🎸
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {["Vocal", "Guitar", "Bass", "Drums", "Keyboard", "Other"].map(
                  (part) => (
                    <button
                      key={part}
                      onClick={() => {
                        setSelectedPart(part);
                        if (part !== "Other") {
                          setOtherText("");
                        } else {
                          setTimeout(() => inputRef.current?.focus(), 50);
                        }
                      }}
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

              {/* ✅ Other 入力欄 / 修正版 */}
              {selectedPart === "Other" && (
                <input
                  ref={inputRef}
                  type="text"
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  placeholder="例：Chorus / Percussion / Tambourine etc."
                  className="w-full mt-3 px-3 py-2 rounded-md bg-black border border-purple-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                  disabled={submitting}
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
