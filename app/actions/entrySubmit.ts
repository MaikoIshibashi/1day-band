"use server";
import { createClient } from "@supabase/supabase-js";

type EntrySubmitForm = {
  name: string;
  email: string;
  xaccount: string;
  region: string;
  part1: string;
  level1: string;
  difficulty1: string;
  part2?: string;
  level2?: string;
  difficulty2?: string;
  songs: string[];
  availability: string;
  message?: string;
  eventId: number;
};

export async function entrySubmit(formData: EntrySubmitForm) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  /* ✅ 1. members.xaccount で重複確認 */
  const { data: existingMember } = await supabase
    .from("members")
    .select("id")
    .eq("xaccount", formData.xaccount)
    .single();

  let memberId = existingMember?.id;

  /* ✅ 2. なければ members に insert */
  if (!memberId) {
    const { data: newMember, error: memberError } = await supabase
      .from("members")
      .insert({
        nickname: formData.name,     // ← nickname カラムに保存（ここ重要）
        email: formData.email,
        xaccount: formData.xaccount,
        region: formData.region,
      })
      .select()
      .single();

    if (memberError) throw memberError;
    memberId = newMember.id;
  }

  /* ✅ 3. entries は常に insert */
  const { error: entryError } = await supabase.from("entries").insert({
    member_id: memberId,
    event_id: formData.eventId,

    nickname: formData.name,        // ← entries.nickname に保存
    region: formData.region,        // ← entries.region に保存

    part1: formData.part1,
    level1: formData.level1,
    difficulty1: formData.difficulty1,

    part2: formData.part2 || null,
    level2: formData.level2 || null,
    difficulty2: formData.difficulty2 || null,

    songs: formData.songs,
    availability: formData.availability,
    message: formData.message || null,

    status: "pending",
  });

  if (entryError) throw entryError;

  return { ok: true };
}
