// app/send-confirmation/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const form = await req.json();

    // ===== nodemailer 設定 =====
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // mail.privateemail.com
      port: Number(process.env.MAIL_PORT), // 465
      secure: Number(process.env.MAIL_PORT) === 465, // 465ならtrue
      auth: {
        user: process.env.MAIL_USER, // info@1daystudioband.com
        pass: process.env.MAIL_PASS, // PrivateEmailのパスワード
      },
    });

    // ===== メール内容 =====
    const mailOptions = {
      from: process.env.MAIL_USER, // ← 必ず送信元は認証済みのアドレスにする
      to: form.email, // 応募者宛
      bcc: process.env.MAIL_USER, // 運営にもコピー
      subject: "【1Day Studio Band】エントリー確認",
      text: `
${form.name} 様

1Day Studio Band へのエントリーありがとうございます🎸

以下の内容で受け付けました。

────────────────────
■ ニックネーム
${form.name}

■ メールアドレス
${form.email}

■ Xアカウント
@${form.xaccount}

■ 第一希望
${form.part1}（演奏歴: ${form.level1}）

■ 第二希望
${form.part2 ? `${form.part2}（演奏歴: ${form.level2 || "未記入"}）` : "なし"}

■ メッセージ
${form.message || "なし"}
────────────────────

選考結果は1週間以内にご連絡いたします。
送信元は「1daystudioband.com」になりますので、
受信できるように設定をご確認ください。

================================
1Day Studio Band 🎸
公式サイト: https://1daystudioband.com
================================
      `,
    };

    // ===== メール送信 =====
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("メール送信エラー:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
