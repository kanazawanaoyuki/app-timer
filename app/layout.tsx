import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "学習用タイマーアプリ",
  description: "Next.js + React + TypeScript で作るシンプルなタイマー",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
