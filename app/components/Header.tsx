"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const handleLogoClick = () => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.classList.remove("fade-in-up");
      void hero.offsetWidth; // reflow
      hero.classList.add("fade-in-up");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        borderBottom: "1px solid rgba(168, 85, 247, 0.3)",
        position: "sticky",
        top: 0,
        background: "black",
        zIndex: 50,
      }}
    >
      {/* 左上ロゴ＋タイトル */}
      <Link
        href="/"
        onClick={handleLogoClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontWeight: "bold",
          color: "var(--color-accent)",
          cursor: "pointer",
        }}
      >
        <Image src="/icon.png" alt="Logo" width={32} height={32} />
        <span>1Day Studio Band</span>
      </Link>

      {/* ナビゲーション */}
      <nav style={{ display: "flex", gap: "1.5rem" }}>
        <Link href="/#about">About</Link>
        <Link href="/#timeline">Timeline</Link>
        <Link href="/#events">Events</Link>
        <Link href="/entry">Entry</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/members" style={{ color: "var(--color-accent)" }}>
          Members
        </Link>
      </nav>
    </header>
  );
}
