import Parser from "rss-parser";

export const dynamic = "force-dynamic"; // ← VercelでSSR強制（重要）

// RSSアイテム型を明示的に定義
type RSSItem = {
  title?: string;
  link?: string;
  pubDate?: string;
};

export async function GET() {
  try {
    const parser: Parser = new Parser({
      headers: { Accept: "application/rss+xml, application/xml" },
    });

    const feed = await parser.parseURL("https://note.com/1daystudioband/rss");

    // RSSItem 型を指定して any を排除
    const latest = feed.items.slice(0, 3).map((item: RSSItem) => ({
      title: item.title ?? "",
      link: item.link ?? "",
      pubDate: item.pubDate ?? "",
    }));

    return Response.json(latest);
  } catch (error) {
    console.error("RSS取得失敗:", error);
    return Response.json({ error: "Failed to fetch RSS" }, { status: 500 });
  }
}
