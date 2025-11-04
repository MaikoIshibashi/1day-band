"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import RevealOnScroll from "./components/Reveal";
import Footer from "./components/Footer";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <main>{children}</main>;
  }

  // 🔹 トップでもヘッダー出すために isTopPage は使わない
  const isSurveyPage = pathname.startsWith("/survey");

  // ✅ survey だけヘッダー非表示にする
  const hideHeader = isSurveyPage;
  const hideFooter = isSurveyPage;

  return (
    <>
      {!hideHeader && <Header />}
      {!hideHeader && <RevealOnScroll />}

      <main>{children}</main>

      {!hideFooter && <Footer />}
    </>
  );
}
