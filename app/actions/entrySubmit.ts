"use server";
import { createClient } from "@supabase/supabase-js";

type EntrySubmitForm = {
  name: string; email: string; xaccount: string; region: string;
  part1: string; level1: string; difficulty1: string;
  part2?: string; level2?: string; difficulty2?: string;
  songs: string[]; availability: string; message?: string; eventId: number;
};

export async function entrySubmit(formData: EntrySubmitForm) {
  // ── A. 環境変数チェック（値が無いと確実に 500 になります）
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasSrv = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  console.log("[entrySubmit] env", { hasUrl, hasSrv });
  if (!hasUrl) throw new Error("ENV:NEXT_PUBLIC_SUPABASE_URL is missing");
  if (!hasSrv) throw new Error("ENV:SUPABASE_SERVICE_ROLE_KEY is missing");

  // ── B. クライアント生成
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // ── C. members.xaccount で既存確認
    const { data: existingMember, error: selErr } = await supabase
      .from("members").select("id").eq("xaccount", formData.xaccount).single();
    if (selErr && selErr.code !== "PGRST116") { // not found を除外
      console.error("[entrySubmit] select members error", selErr);
      throw selErr;
    }

    let memberId = existingMember?.id;
    if (!memberId) {
      const { data: newMember, error: insMemErr } = await supabase
        .from("members")
        .insert({
          name: formData.name,              // ← members は name
          email: formData.email,
          xaccount: formData.xaccount,
        })
        .select()
        .single();
      if (insMemErr) {
        console.error("[entrySubmit] insert members error", insMemErr);
        throw insMemErr;
      }
      memberId = newMember!.id;
    }

    // ── D. entries へ insert（nickname/region を必ず渡す）
    const { error: insEntErr } = await supabase.from("entries").insert({
      member_id: memberId,
      event_id: formData.eventId,
      nickname: formData.name,             // ← entries は nickname
      region: formData.region,
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
    if (insEntErr) {
      console.error("[entrySubmit] insert entries error", insEntErr);
      throw insEntErr;
    }

    console.log("[entrySubmit] success");
    return { ok: true };
  } catch (e) {
    console.error("[entrySubmit] fatal", e);
    throw e; // ここで 500 に見えるが、Vercel の Functions ログに詳細が出ます
  }
}
