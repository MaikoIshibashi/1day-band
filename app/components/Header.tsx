"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "About", href: "/preview#about" },
    { label: "Events", href: "/preview#events" },
    { label: "Gallery", href: "/gallery" }, // ← 追加 ✨
    { label: "Entry", href: "/entry" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Members", href: "/members", special: true }, // ← special
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur z-50 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/preview">
          <img src="/logo.png" alt="1Day Studio Band ロゴ" className="h-8 w-8" />
        </Link>

        {/* PCナビ */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative group transition-colors duration-300 flex items-center ${
                item.special
                  ? "text-amber-500 hover:text-amber-400"
                  : "text-gray-300 hover:text-purple-400"
              }`}
            >
              {item.special && <span className="text-sm">🔒</span>}
              <span className="ml-[2px]">{item.label}</span>
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${
                  item.special ? "bg-amber-500" : "bg-purple-400"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* ハンバーガー (SP) */}
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* SPメニュー */}
      {isOpen && (
        <nav className="md:hidden bg-black border-t border-gray-800 flex flex-col items-center py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition flex items-center gap-1 ${
                item.special
                  ? "text-amber-500 hover:text-amber-400"
                  : "text-gray-300 hover:text-purple-400"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.special && <span className="mr-1">🔒</span>}
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
