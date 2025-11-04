"use server";

import { createClient } from "@supabase/supabase-js";

interface EntrySubmitForm {
  eventId: number;
  name: string;
  email: string;
  xaccount: string;
  part1: string;
  level1: string;
  part2?: string;
  level2?: string;
  availability: string;
  message: string;
}

export async function entrySubmit(formData: EntrySubmitForm) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // ← anon じゃなく Service Key!
    { auth: { persistSession: false } }
  );

  /** ✅ members に email が登録済みか確認 */
  const { data: member, error: selectError } = await supabase
    .from("members")
    .select("id")
    .eq("email", formData.email)
    .single();

  if (selectError && selectError.code !== "PGRST116") {
    // PGRST116 は "row not found" なので正常扱い
    console.error("select members error:", selectError);
  }

  let memberId = member?.id;

  /** ✅ 未登録なら insert */
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

    if (memberError) {
      console.error("members insert error:", memberError);
      throw new Error("メンバー登録に失敗しました");
    }

    memberId = newMember.id;
  }

  /** ✅ entries に insert */
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

  if (entryError) {
    console.error("entries insert error:", entryError);
    throw new Error("エントリー登録に失敗しました");
  }

  return { ok: true };
}
