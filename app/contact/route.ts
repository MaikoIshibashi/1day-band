// app/api/contact/route.ts
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

console.log("ENV CHECK:", {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  user: process.env.MAIL_USER ? "SET" : "MISSING",
  pass: process.env.MAIL_PASS ? "SET" : "MISSING",
});


const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: true, // ← 465ならtrue, 587ならfalse
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, topic, message, captchaToken } = await req.json();

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

    // 運営宛て（今まで通り）
    await transporter.sendMail({
      from: `"1Day Studio Band" <info@1daystudioband.com>`,
      to: "info@1daystudioband.com",
      subject: `[${topic}] 新しいお問い合わせ`,
      text: `名前: ${name}\nメール: ${email}\n件名: ${topic}\n内容:\n${message}`,
    });

    // ユーザー宛て（自動返信）
    await transporter.sendMail({
      from: `"1Day Studio Band" <info@1daystudioband.com>`,
      to: email, // 👈 入力された相手のメール
      subject: "【1Day Studio Band】お問い合わせを受け付けました",
      text: `${name} 様\n\nお問い合わせありがとうございます！\n以下の内容で受け付けました。\n\n---\n件名: ${topic}\n内容:\n${message}\n\n運営より折り返しご連絡いたしますので、しばらくお待ちください。\n\n──────────────\n1Day Studio Band 運営\ninfo@1daystudioband.com`,
    });


    return new Response("送信OK", { status: 200 });
  } catch (err: unknown) {
    console.error("Error in /api/contact:", err);

    if (err instanceof Error) {
      return new Response("送信失敗: " + err.message, { status: 500 });
    }

    return new Response("送信失敗: 不明なエラー", { status: 500 });
  }
}
