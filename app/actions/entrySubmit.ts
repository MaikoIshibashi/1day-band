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
    process.env.SUPABASE_SERVICE_ROLE_KEY! // ✅ anonではない
  );

  // --- メンバー確認（email 重複チェック） ---
  const { data: member } = await supabase
    .from("members")
    .select("id")
    .eq("email", formData.email)
    .single();

  let memberId = member?.id;

  if (!memberId) {
    const { data: newMember, error: memberError } = await supabase
      .from("members")
      .insert({
        name: formData.name,
        email: formData.email,
        xaccount: formData.xaccount,
        region: formData.region,
      })
      .select()
      .single();

    if (memberError) throw memberError;
    memberId = newMember.id;
  }

  // --- entries 登録 ---
  const { error: entryError } = await supabase.from("entries").insert({
    member_id: memberId,
    event_id: formData.eventId,

    part1: formData.part1,
    level1: formData.level1,
    difficulty1: formData.difficulty1,

    part2: formData.part2 || null,
    level2: formData.level2 || null,
    difficulty2: formData.difficulty2 || null,

    songs: formData.songs,
    availability: formData.availability,
    message: formData.message || null,
  });

  if (entryError) throw entryError;

  return { ok: true };
}
