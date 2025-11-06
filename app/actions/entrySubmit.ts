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

  console.log("[entrySubmit] start", formData);

  /* ✅ members.email または members.xaccount で既存ユーザー確認 */
  const { data: existingMember, error: findError } = await supabase
    .from("members")
    .select("id")
    .or(`email.eq.${formData.email},xaccount.eq.${formData.xaccount}`)
    .maybeSingle();

  if (findError) {
    console.error("[entrySubmit] find error:", findError);
    throw findError;
  }

  let memberId = existingMember?.id;

  /* ✅ 既存メンバーが居ない場合のみ、membersにinsert */
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
      console.error("[entrySubmit] insert members error:", memberError);
      throw memberError;
    }

    memberId = newMember.id;
  }

  /* ✅ entries に INSERT */
  const { error: entryError } = await supabase.from("entries").insert({
    member_id: memberId,
    event_id: formData.eventId,

    nickname: formData.name,      // ← entries.nickname に保存
    region: formData.region,      // ← entries.region に保存

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

  if (entryError) {
    console.error("[entrySubmit] insert entries error:", entryError);
    throw entryError;
  }

  console.log("[entrySubmit] completed");
  return { ok: true };
}
