"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import RevealOnScroll from "./components/Reveal";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // SSRとCSRのズレを避けるためマウント前は何も描画しない
    return <main>{children}</main>;
  }

  // 特定ページで非表示にしたい条件をまとめて定義
  const isSurveyPage = pathname.startsWith("/survey");
  const isTopPage = pathname === "/"; // トップページ（準備中ページ）

  const hideHeader = isSurveyPage || isTopPage;

  return (
    <>
      {!hideHeader && <Header />}
      {!hideHeader && <RevealOnScroll />}
      <main>{children}</main>
    </>
  );
}
