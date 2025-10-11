import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const form = await req.json();

    // === メール送信設定 ===
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // === メール本文を整形 ===
    const songsText = form.songs && form.songs.length > 0
      ? form.songs.join("・")
      : "未選択";

    const planText = form.plan || "未選択";
    const regionText = form.region || "未選択";
    const availabilityText = form.availability || "（特になし）";
    const messageText = form.message || "（なし）";

    const mailText = `
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

■ お住まいの地域
${regionText}

■ 第一希望
${form.part1}（演奏歴: ${form.level1}）

■ 第二希望
${form.part2 ? `${form.part2}（演奏歴: ${form.level2 || "未記入"}）` : "なし"}

■ 希望曲（2曲）
${songsText}

■ 参加可能日
${availabilityText}

■ メッセージ
${messageText}
────────────────────

選考結果は 1週間以内にご連絡いたします。
ご応募内容をもとに、パートや全体のバランスを考慮して選考を進めさせていただきます。

================================
1Day Studio Band 🎸
公式サイト: https://1daystudioband.com
公式メール: info@1daystudioband.com
================================
`;

    // === メール送信 ===
    const mailOptions = {
      from: `"1Day Studio Band" <info@1daystudioband.com>`,
      to: form.email, // 応募者宛
      bcc: process.env.MAIL_USER, // 運営にもコピー
      subject: "【1Day Studio Band】エントリーを受け付けました",
      text: mailText,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("メール送信エラー:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
