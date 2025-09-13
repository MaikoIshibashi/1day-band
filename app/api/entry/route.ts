import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ← サーバ専用キー
);

export async function POST(req: NextRequest) {
  const { name, email, part, message } = await req.json();
  const { error } = await supabase.from("applications").insert({ name, email, part, message });
  if (error) return new Response("保存失敗: " + error.message, { status: 500 });
  return new Response("保存OK");
}
