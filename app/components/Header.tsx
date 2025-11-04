"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "About", href: "/#about" },
    { label: "Events", href: "/#events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Entry", href: "/entry" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Members", href: "/members", special: true },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur z-50 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/preview">
          <img
            src="/logo.png"
            alt="1Day Studio Band ロゴ"
            className="h-8 w-8 hover:opacity-80 transition"
          />
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
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-3 rounded-md text-white 
                     hover:bg-purple-700/20 focus:outline-none 
                     transition drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
        >
          <motion.div
            animate={isOpen ? { rotate: 90, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-3xl leading-none"
          >
            ☰
          </motion.div>
        </button>
      </div>

      {/* SPメニュー */}
      <motion.nav
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-black border-t border-gray-800 flex flex-col items-center space-y-4 py-4"
      >
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
            {item.special && <span>🔒</span>}
            {item.label}
          </Link>
        ))}
      </motion.nav>
    </header>
  );
}
