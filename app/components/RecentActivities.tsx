"use client";
import { useEffect, useState } from "react";

type NoteItem = {
  title: string;
  link: string;
  pubDate: string;
};

export default function RecentActivities() {
  const [items, setItems] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const res = await fetch("/api/note");
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("RSS取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRSS();
  }, []);

  return (
    <section
      id="activities"
      className="reveal scroll-mt-20"
      style={{
        padding: "3rem 1.5rem",
        background: "linear-gradient(145deg, #111, #000)",
        color: "white",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "1.8rem",
          color: "var(--color-accent)",
          marginBottom: "2rem",
        }}
      >
        最近の活動
      </h2>

      {loading ? (
        <p style={{ color: "gray" }}>読み込み中...</p>
      ) : (
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.2rem",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#111",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                borderRadius: "12px",
                padding: "1.5rem",
                textAlign: "left",
                boxShadow: "0 0 15px rgba(168, 85, 247, 0.15)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                touchAction: "manipulation", // ← モバイルで軽くタップできるように
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget.style.transform = "translateY(-5px)"),
                (e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(168, 85, 247, 0.4)"))
              }
              onMouseLeave={(e) =>
                ((e.currentTarget.style.transform = "translateY(0)"),
                (e.currentTarget.style.boxShadow =
                  "0 0 15px rgba(168, 85, 247, 0.15)"))
              }
              onTouchStart={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(168, 85, 247, 0.4)")
              }
              onTouchEnd={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 15px rgba(168, 85, 247, 0.15)")
              }
            >
              <p style={{ color: "gray", fontSize: "0.9rem" }}>
                🕒{" "}
                {new Date(item.pubDate).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <h3
                style={{
                  color: "var(--color-accent)",
                  fontSize: "1.05rem",
                  lineHeight: "1.6",
                  margin: "0.3rem 0 0.6rem",
                }}
              >
                {item.title}
              </h3>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#fff",
                  background: "var(--color-accent)",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  display: "inline-block",
                }}
              >
                noteで読む →
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
