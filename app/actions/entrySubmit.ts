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
    process.env.SUPABASE_SERVICE_ROLE_KEY! // ✅ 必ず service_role
  );

  /* ✅ members.xaccount で判定 */
  const { data: existingMember } = await supabase
    .from("members")
    .select("id")
    .eq("xaccount", formData.xaccount)
    .single();

  let memberId = existingMember?.id;

  /* ✅ members insert (name が正しい) */
  if (!memberId) {
    const { data: newMember, error: memberError } = await supabase
      .from("members")
      .insert({
        name: formData.name,        // ← ✅ nickname じゃなくて name!!
        email: formData.email,
        xaccount: formData.xaccount,
      })
      .select()
      .single();
    if (memberError) throw memberError;
    memberId = newMember.id;
  }

  /* ✅ entries insert */
  const { error: entryError } = await supabase.from("entries").insert({
    member_id: memberId,
    event_id: formData.eventId,

    nickname: formData.name,   // ✅ entries は nickname カラムに入れる
    region: formData.region,   // ✅ entries.region に入る

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
