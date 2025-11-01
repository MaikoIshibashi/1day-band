"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import RevealOnScroll from "./components/Reveal";
import Footer from "./components/Footer"; // ← 追加

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // SSRとCSRのズレを避けるためマウント前は何も描画しない
    return <main>{children}</main>;
  }

  // 🔹 特定ページ条件
  const isSurveyPage = pathname.startsWith("/survey");
  const isTopPage = pathname === "/"; // トップ（準備中ページ）

  const hideHeader = isSurveyPage || isTopPage;
  const hideFooter = isSurveyPage; // ← surveyページだけフッター非表示

  return (
    <>
      {!hideHeader && <Header />}
      {!hideHeader && <RevealOnScroll />}

      <main>{children}</main>

      {/* ✅ フッター（surveyページ以外で表示） */}
      {!hideFooter && <Footer />}
    </>
  );
}
