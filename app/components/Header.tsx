"use client";

import Link from "next/link";
import { useState } from "react";
import { FaLock } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "About", href: "/preview#about" },
    { label: "Events", href: "/preview#events" },
    { label: "Entry", href: "/preview/entry" },
    { label: "Contact", href: "/contacts" },
    { label: "FAQ", href: "/preview/faq" },
    { label: "Members", href: "/preview/members", lock: true },
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
              className="text-gray-300 hover:text-purple-400 transition flex items-center gap-1"
            >
              {item.lock && <FaLock className="text-xs" />}
              {item.label}
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
              className="text-gray-300 hover:text-purple-400 transition flex items-center gap-1"
              onClick={() => setIsOpen(false)}
            >
              {item.lock && <FaLock className="text-xs" />}
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
