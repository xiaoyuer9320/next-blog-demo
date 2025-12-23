// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // 👈 核心！必须引入全局样式，否则 Tailwind 不生效

export const metadata: Metadata = {
  title: "我的全栈博客",
  description: "Next.js + Supabase Fullstack Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        {children}
      </body>
    </html>
  );
}