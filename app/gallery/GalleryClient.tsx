"use client";

import { useState, useCallback, useEffect } from "react";
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
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const openZoom = (idx: number) => setCurrentIndex(idx);
  const closeZoom = () => setCurrentIndex(null);

  const showPrev = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) => {
      if (prev === null) return prev;
      const last = selected.photos.length - 1;
      return prev === 0 ? last : prev - 1;
    });
  }, [currentIndex, selected.photos.length]);

  const showNext = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) => {
      if (prev === null) return prev;
      const last = selected.photos.length - 1;
      return prev === last ? 0 : prev + 1;
    });
  }, [currentIndex, selected.photos.length]);

  // ← → Esc キー操作
  useEffect(() => {
    if (currentIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
      else if (e.key === "Escape") closeZoom();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentIndex, showPrev, showNext]);

  const zoomedPhoto =
    currentIndex !== null ? selected.photos[currentIndex] : null;

  // ✅ ナチュラルソート関数
  const naturalSortedPhotos = [...selected.photos].sort((a, b) => {
    const numA = parseInt(a.src.match(/(\d+)/)?.[0] || "0", 10);
    const numB = parseInt(b.src.match(/(\d+)/)?.[0] || "0", 10);
    return numA - numB;
  });

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
            onClick={() => {
              setSelected(g);
              setCurrentIndex(null);
            }}
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
                  "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1rem",
                justifyItems: "center",
                alignItems: "stretch",
              }}
            >
              {naturalSortedPhotos.map((photo, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => openZoom(i)}
                  style={{
                    aspectRatio: "1 / 1",
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: "#000",
                    border: "1px solid rgba(168,85,247,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
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
                      objectFit: "contain", // 👈 全体表示
                      backgroundColor: "#000",
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

      {/* 拡大モーダル */}
      <AnimatePresence>
        {zoomedPhoto && (
          <motion.div
            key="zoom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeZoom}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999,
              padding: "1rem",
            }}
          >
            <motion.img
              src={zoomedPhoto.src}
              alt={zoomedPhoto.alt}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                objectFit: "contain",
                boxShadow: "0 0 20px rgba(255,255,255,0.15)",
              }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* ✕閉じる */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeZoom();
              }}
              style={{
                position: "fixed",
                top: "2rem",
                right: "2rem",
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "1.5rem",
                cursor: "pointer",
                opacity: 0.8,
              }}
              aria-label="Close"
            >
              ✕
            </button>

            {/* ← 前 */}
            {selected.photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                style={{
                  position: "fixed",
                  left: "2rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(168,85,247,0.6)",
                  borderRadius: "9999px",
                  width: "3rem",
                  height: "3rem",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: "0 0 16px rgba(168,85,247,0.4)",
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            {/* → 次 */}
            {selected.photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                style={{
                  position: "fixed",
                  right: "2rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(168,85,247,0.6)",
                  borderRadius: "9999px",
                  width: "3rem",
                  height: "3rem",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: "0 0 16px rgba(168,85,247,0.4)",
                }}
                aria-label="Next image"
              >
                ›
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
