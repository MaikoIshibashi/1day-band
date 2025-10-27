"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function GalleryClient({
  galleries,
}: {
  galleries: {
    id: string;
    title: string;
    date: string;
    description: string;
    credit?: string;
    photos: { src: string; alt: string }[];
  }[];
}) {
  const [selected, setSelected] = useState(galleries[0]);

  return (
    <section
      style={{
        padding: "5rem 1.5rem",
        backgroundColor: "#000",
        color: "white",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      {/* タイトル */}
      <h1
        style={{
          fontSize: "2.4rem",
          color: "var(--color-accent)",
          marginBottom: "0.3rem",
          letterSpacing: "1px",
        }}
      >
        GALLERY
      </h1>
      <p
        style={{
          color: "gray",
          fontSize: "0.9rem",
          marginBottom: "2.5rem",
        }}
      >
        1Day Studio Band Session Archive — from the 3rd session onward
      </p>

      {/* 回選択ボタン */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "3rem",
        }}
      >
        {galleries.map((g) => (
          <button
            key={g.id}
            onClick={() => setSelected(g)}
            style={{
              backgroundColor:
                selected.id === g.id ? "var(--color-accent)" : "#111",
              color: selected.id === g.id ? "#fff" : "#ccc",
              border: "1px solid var(--color-accent)",
              borderRadius: "10px",
              padding: "0.8rem 1.4rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              minWidth: "160px",
              lineHeight: "1.4",
            }}
          >
            <span style={{ display: "block", fontSize: "1rem" }}>
              {g.title}
            </span>
            <span
              style={{
                display: "block",
                fontSize: "0.8rem",
                opacity: 0.8,
              }}
            >
              {g.date}
            </span>
          </button>
        ))}
      </div>

      {/* ギャラリー本体 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {selected.photos.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(240px, 1fr))", // 自動で幅に応じてフィット
                gap: "1rem",
                justifyItems: "center", // 常に中央寄せ
                alignItems: "stretch",
              }}
            >
              {selected.photos
                .sort((a, b) => a.src.localeCompare(b.src))
                .map((photo, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    style={{
                      aspectRatio: "1 / 1",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "1px solid rgba(168,85,247,0.3)",
                      background: "#111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={500}
                      height={500}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain", // ← 見切れ防止
                        backgroundColor: "#000", // ← 余白をなじませる
                      }}
                    />
                  </motion.div>
                ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: "center",
                color: "#aaa",
                padding: "3rem",
                fontStyle: "italic",
                border: "1px dashed rgba(168,85,247,0.4)",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              📷 この回の写真ギャラリーは準備中です
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
