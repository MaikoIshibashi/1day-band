import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollReveal from "@/app/components/ScrollReveal";

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
  description: "音楽好きが集まる1日限りのバンドイベント",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ScrollReveal /> 
        <Header />                {/* 👈 ヘッダー追加 */}
        <main>{children}</main>   {/* 👈 ページの中身 */}
        <Footer />                {/* 👈 フッター追加 */}
      </body>
    </html>
  );
}
