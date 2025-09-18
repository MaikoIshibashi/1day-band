// app/api/entry/route.ts
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    let {
      name,
      email,
      xaccount,
      part1,
      level1,
      part2,
      level2,
      message,
      captchaToken, // 👈 追加
    } = await req.json();

    // ===== reCAPTCHA 検証 =====
    const captchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
      }
    );

    const captchaJson = await captchaRes.json();
    if (!captchaJson.success) {
      console.error("reCAPTCHA verification failed:", captchaJson);
      return new Response("reCAPTCHA エラー", { status: 400 });
    }

    // ===== Xアカウント整形 =====
    const normalizedX = xaccount.startsWith("@")
      ? xaccount.slice(1)
      : xaccount;

    // ===== Supabaseへ保存（@なしで保存） =====
    const { error } = await supabase.from("entries").insert([
      {
        name,
        email,
        xaccount: normalizedX,
        part1,
        level1,
        part2: part2 || null,
        level2: level2 || null,
        message: message || null,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return new Response("DB登録に失敗しました", { status: 500 });
    }

    // ===== 運営宛メール =====
    await transporter.sendMail({
      from: `"1Day Studio Band 運営" <info@1daystudioband.com>`,
      to: "info@1daystudioband.com",
      subject: `[エントリー] ${name} さんからの応募`,
      text: `
新しいエントリーがありました。

ニックネーム: ${name}
メール: ${email}
Xアカウント: @${normalizedX}

第一希望: ${part1} (${level1})
${part2 ? `第二希望: ${part2} (${level2 || "未入力"})` : ""}
メッセージ:
${message || "（なし）"}
      `,
    });

    // ===== ユーザー宛自動返信 =====
    await transporter.sendMail({
      from: `"1Day Studio Band 運営" <info@1daystudioband.com>`,
      to: email,
      subject: "【確認】エントリーを受け付けました",
      text: `
${name} 様

この度は1Day Studio Bandにエントリーいただきありがとうございます！
以下の内容で受付いたしました。

----------------------
第一希望: ${part1} (${level1})
${part2 ? `第二希望: ${part2} (${level2 || "未入力"})` : ""}
Xアカウント: @${normalizedX}
メッセージ: ${message || "（なし）"}
----------------------

選考結果は1週間以内にご連絡します。

────────────────────
🎸 1Day Studio Band 運営事務局 🎶
Mail: info@1daystudioband.com
Web : https://1daystudioband.com
────────────────────
      `,
    });

    return new Response("送信OK", { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new Response("送信失敗: " + err.message, { status: 500 });
  }
}
