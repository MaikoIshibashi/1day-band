"use server";

import { createClient } from "@supabase/supabase-js";

export async function entrySubmit(formData: any) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // ← anon じゃない（Service key）
  );

  // メンバー照会（email 基準）
  const { data: member } = await supabase
    .from("members")
    .select("id")
    .eq("email", formData.email)
    .single();

  let memberId = member?.id;

  // メンバー未登録なら insert
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

  // entries 登録
  const { error: entryError } = await supabase.from("entries").insert({
    member_id: memberId,
    event_id: formData.eventId,

    part1: formData.part1,
    level1: formData.level1,
    difficulty1: formData.difficulty1,

    part2: formData.part2 || null,
    level2: formData.level2 || null,
    difficulty2: formData.difficulty2 || null,

    availability: formData.availability,
    message: formData.message,
  });

  if (entryError) throw entryError;

  return { ok: true };
}
