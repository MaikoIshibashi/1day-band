import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteChrome from "./site-chrome";
import { Analytics } from "@vercel/analytics/react";  // ✅ 追加

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1Day Studio Band",
  description: "音楽仲間と作る特別な一日を！",
  icons: {
    icon: "/logo.png", // ← favicon もこれでOK
  },
  openGraph: {
    title: "1Day Studio Band",
    description: "音楽仲間と作る特別な一日を！",
    url: "https://www.1daystudioband.com",
    siteName: "1Day Studio Band",
    images: [
      {
        url: "/logo.png", // または /og-image.png に差し替え可
        width: 800,
        height: 600,
        alt: "1Day Studio Band ロゴ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@1DayStudioBand",
    title: "1Day Studio Band",
    description: "音楽仲間と作る特別な一日を！",
    images: ["/logo.png"], // or /og-image.png
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteChrome>{children}</SiteChrome>
        {/* ✅ Web Analytics tracking */}
        <Analytics />   {/* ← これを追加！ */}

      </body>
    </html>
  );
}
