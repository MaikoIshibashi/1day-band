// app/api/contact/route.ts
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

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

    // ===== メール送信 =====
    await transporter.sendMail({
      from: `"1Day Studio Band" <info@1daystudioband.com>`,
      to: "info@1daystudioband.com",
      subject: `[${topic}] 新しいお問い合わせ`,
      text: `名前: ${name}\nメール: ${email}\n件名: ${topic}\n内容:\n${message}`,
      replyTo: email, // ← ここ入れると返信が送信者に返るよ
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
