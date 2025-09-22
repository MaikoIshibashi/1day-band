"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* 左上ロゴ → preview のトップへ */}
        <Link
          href="/preview"
          className="text-xl font-bold text-[var(--color-accent)] tracking-wide"
        >
          1Day Studio Band
        </Link>

        {/* ナビゲーション */}
        <nav className="flex gap-6 text-sm">
          {[
            { href: "/preview#about", label: "About" },
            { href: "/preview#timeline", label: "Timeline" },
            { href: "/preview#events", label: "Events" },
            { href: "/preview/entry", label: "Entry" },
            { href: "/preview/faq", label: "FAQ" },
            { href: "/preview/contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative group text-white no-underline font-medium tracking-wide transition-colors duration-300 hover:text-[var(--color-accent)]"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* 🔑 特別な Members */}
          <Link
            href="/preview/members"
            className="relative group flex items-center gap-1 text-white no-underline font-medium tracking-wide transition-colors duration-300 hover:text-[var(--color-accent)]"
          >
            <span className="text-xs">🔑</span> Members
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
