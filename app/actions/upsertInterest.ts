"use server";

import { createClient } from "@supabase/supabase-js";

export async function upsertInterest(eventId: string, part: string, userKey: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // ← anon じゃない！！
  );

  // 既存確認
  const { data: existing } = await supabase
    .from("event_interest")
    .select("id")
    .eq("event_id", eventId)
    .eq("user_key", userKey)
    .limit(1);

  if (existing && existing.length > 0) {
    // 更新
    return await supabase
      .from("event_interest")
      .update({ part })
      .eq("id", existing[0].id);
  }

  // 新規登録
  return await supabase.from("event_interest").insert({
    event_id: eventId,
    part,
    user_key: userKey,
  });
}
