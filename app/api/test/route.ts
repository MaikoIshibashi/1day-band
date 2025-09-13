import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // ← 読み取りだけなので anon でOK
);

export async function GET(req: NextRequest) {
  const { data, error } = await supabase
    .from("applications")
    .select("id")
    .limit(1);

  if (error) {
    return new Response("接続エラー: " + error.message, { status: 500 });
  }
  return new Response("接続成功！（applications は " + (data?.length ?? 0) + " 件）", { status: 200 });
}
