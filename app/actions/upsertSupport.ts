"use server";

import { createClient } from "@supabase/supabase-js";

export async function upsertSupport(eventId: string, userKey: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // ← anonじゃなくて service-role
  );

  // 既に登録済みなら insert しない
  const { data: existing } = await supabase
    .from("event_support")
    .select("id")
    .eq("event_id", eventId)
    .eq("user_key", userKey)
    .limit(1);

  if (existing && existing.length > 0) {
    return { ok: true }; // なにもしない
  }

  const { error } = await supabase.from("event_support").insert({
    event_id: eventId,
    user_key: userKey,
  });

  if (error) throw error;

  return { ok: true };
}
