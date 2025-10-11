import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      xaccount,
      answers, // ← survey回答内容
    } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: "name または email が不足しています。" },
        { status: 400 }
      );
    }

    // === nodemailer設定 ===
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // === 参加者向けメール ===
    const userMail = {
      from: `"1Day Studio Band" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "【1Day Studio Band】アンケートのご回答ありがとうございます！",
      html: `
        <p>${name} さん、</p>
        <p>1Day Studio Band への参加確定アンケートにご回答いただきありがとうございます！</p>
        <p>内容を確認のうえ、当日のご案内をお送りいたします。</p>

        <h3>📝 ご回答内容</h3>
        <pre style="background:#f6f6f6;padding:12px;border-radius:6px;">
${answers
  ? Object.entries(answers)
      .map(([q, a]) => `・${q}：${a}`)
      .join("\n")
  : "回答データはありません。"}
        </pre>

        <p>ご不明点などありましたら、<a href="mailto:info@1daystudioband.com">info@1daystudioband.com</a> までご連絡ください。</p>

        <br/>
        <p>────────────────────</p>
        <p>🎸1Day Studio Band 事務局</p>
        <p>公式サイト：<a href="https://1daystudioband.com">1daystudioband.com</a></p>
        <p>公式X：<a href="https://x.com/1DayStudioBand">@1DayStudioBand</a></p>
      `,
    };

    // === 運営向けメール ===
    const adminMail = {
      from: `"1Day Studio Band System" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || "info@1daystudioband.com",
      subject: `【参加確定アンケート受信】${name} さんより回答あり`,
      html: `
        <p>以下の参加者からアンケート回答がありました。</p>

        <ul>
          <li><strong>ニックネーム：</strong>${name}</li>
          <li><strong>メール：</strong>${email}</li>
          <li><strong>Xアカウント：</strong>@${xaccount || "未入力"}</li>
        </ul>

        <h3>📝 回答内容</h3>
        <pre style="background:#f6f6f6;padding:12px;border-radius:6px;">
${answers
  ? Object.entries(answers)
      .map(([q, a]) => `・${q}：${a}`)
      .join("\n")
  : "回答データはありません。"}
        </pre>

        <p>────────────────────</p>
        <p>1Day Studio Band System</p>
      `,
    };

    // === メール送信 ===
    await transporter.sendMail(userMail);
    await transporter.sendMail(adminMail);

    return NextResponse.json({ message: "確認メール送信完了" });
  } catch (err) {
    console.error("メール送信エラー:", err);
    return NextResponse.json({ error: "メール送信に失敗しました。" }, { status: 500 });
  }
}
