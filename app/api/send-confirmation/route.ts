import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const form = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailHtml = `
<h2>🎸 エントリーありがとうございます！</h2>
<p>以下の内容でエントリーを受け付けました。</p>

<hr />
<h3>🧑‍🎤 基本情報</h3>
<p><b>名前：</b>${form.name}</p>
<p><b>Email：</b>${form.email}</p>
<p><b>X：</b>@${form.xaccount}</p>
<p><b>地域：</b>${form.region}</p>

<h3>🎶 希望パート</h3>
<b>第一希望:</b><br />
パート：${form.part1}<br />
演奏歴：${form.level1}<br />
難易度：${form.difficulty1 || "未選択"}

<br /><br />
<b>第二希望:</b><br />
パート：${form.part2 || "（なし）"}<br />
演奏歴：${form.level2 || "（なし）"}<br />
難易度：${form.difficulty2 || "（なし）"}

<h3>🎤 希望曲</h3>
<p>${form.songs.join(" / ")}</p>

<h3>📅 参加可能日</h3>
<p>${form.availability || "未入力"}</p>

<h3>💬 メッセージ</h3>
<p>${form.message || "未入力"}</p>

<hr />

<p>
メンバー調整後、結果をご連絡いたしますのでしばらくお待ちください✨<br />
</p>

<pre style="font-family: inherit; line-height: 1.6;">
────────────────────────
🎸 1Day Studio Band 運営事務局

Mail：info@1daystudioband.com
Web ：https://1daystudioband.com
X（旧Twitter）：@1DayStudioBand
────────────────────────
</pre>
`;

await transporter.sendMail({
  from: `"1Day Studio Band" <${process.env.MAIL_USER}>`,
  to: form.email,                    // 参加者
  bcc: process.env.MAIL_USER,        // ✅ 運営にも送る（BCCで同じアドレスへ）
  subject: "【1Day Studio Band】エントリーを受け付けました！",
  html: mailHtml,
});


    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("メール送信エラー:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
