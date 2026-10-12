import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Navlinks from "@/components/Navlinks";
import Marquee from "@/components/Marquee";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রতিদিনের বাজারদর এক নজরে",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <Suspense
          fallback={
            <nav className="category-nav" aria-label="বিভাগ লোড হচ্ছে">
              <div className="category-nav__inner" aria-hidden="true" />
            </nav>
          }
        >
          <Navlinks />
        </Suspense>
        <Suspense
          fallback={
            <div className="price-ticker price-ticker--loading" aria-hidden="true" />
          }
        >
          <Marquee />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
