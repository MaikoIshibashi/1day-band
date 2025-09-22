"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Events", href: "/#events" },
  { label: "Entry", href: "/#entry" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Members", href: "/members", special: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

{/* 左上のタイトル */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-purple-400 hover:scale-105 transition">
        <Image
            src="/logo.png" // public/logo.png を置く
            alt="1Day Studio Band Logo"
            width={32}
            height={32}
            className="rounded" // 角丸にしたいとき
        />
        1Day Studio Band
        </Link>

        {/* PCナビ */}
        <nav className="hidden md:flex gap-6">
        {navItems.map((item) => (
            <Link
            key={item.label}
            href={item.href}
            className={`relative transition-all duration-300 hover:text-purple-400
                after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1
                after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full
                ${item.special ? "flex items-center gap-1" : ""}`}
            >
            {item.special ? "🔒 Members" : item.label}
            </Link>
        ))}
        </nav>

        {/* スマホ用 🍔 */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-purple-400 text-2xl">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-2/3 bg-black/95 p-6 flex flex-col gap-6 z-40"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white text-lg hover:text-purple-400 transition"
                onClick={() => setOpen(false)} // メニュークリックで閉じる
              >
                {item.special ? "🔒 Members" : item.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
