"use server";
import { createClient } from "@supabase/supabase-js";

export async function entrySubmit(formData: any) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // ← ここ重要！！ anonじゃない
  );

  // メンバー確認（email 重複チェック）
  const { data: member } = await supabase
    .from("members")
    .select("id")
    .eq("email", formData.email)
    .single();

  let memberId = member?.id;

  // なければ members 追加
  if (!memberId) {
    const { data: newMember, error: memberError } = await supabase
      .from("members")
      .insert({
        name: formData.name,
        email: formData.email,
        xaccount: formData.xaccount,
      })
      .select()
      .single();

    if (memberError) throw memberError;
    memberId = newMember.id;
  }

  // entries を登録
  const { error: entryError } = await supabase.from("entries").insert({
    member_id: memberId,
    event_id: formData.eventId,
    part1: formData.part1,
    level1: formData.level1,
    part2: formData.part2,
    level2: formData.level2,
    availability: formData.availability,
    message: formData.message,
  });

  if (entryError) throw entryError;

  return { ok: true };
}
