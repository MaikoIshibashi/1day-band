import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    // フロントから受け取るデータ
    const { eventId, part, userKey, action } = await req.json();

    // SMTP（PrivateEmail）設定
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // 件名を動的に
    const subject = `🎸 ${eventId} パート${action ?? "登録"}通知`;

    // 宛先（必要に応じて追加可能）
    const recipients = [
      process.env.MAIL_USER, // 自分（info@1daystudioband.com）
      // 例: 他に通知したい人がいればここに追加
      // "staff@example.com",
    ];

    // 本文
    const textBody = `
📩 1Day Studio Band 公式サイトより通知が届きました！

━━━━━━━━━━━━━━━
📆 イベント：${eventId}
⚙️ 操作　　：${action ?? "登録"}
🎸 パート　：${part}
🧩 ユーザーキー：${userKey}
━━━━━━━━━━━━━━━

このユーザーがパート${action ?? "登録"}を行いました。
`;

    // メール送信
    await transporter.sendMail({
      from: `"1Day Studio Band" <${process.env.MAIL_USER}>`,
      to: recipients.join(", "),
      subject,
      text: textBody,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("メール送信エラー:", error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
