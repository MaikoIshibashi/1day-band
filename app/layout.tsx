import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1Day Studio Band", // ← タブに表示されるタイトル
  description: "音楽仲間と作る特別な一日を！",
  icons: {
    icon: "/favicon.ico", // public/favicon.ico を置けば自動で使われる
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
         <Header />   {/* ←ここに追加 */}
  <main className="pt-20">{children}</main>

      </body>
    </html>
  );
}
