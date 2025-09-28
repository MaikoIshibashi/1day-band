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

  const isSurveyPage = pathname.startsWith("/survey");

  return (
    <>
      {!isSurveyPage && <Header />}
      {!isSurveyPage && <RevealOnScroll />}
      <main>{children}</main>
    </>
  );
}
