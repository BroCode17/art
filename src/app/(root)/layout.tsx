"use client";

import CountDown from "@/components/CountDown";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function AdimLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      {children}
      <Footer />
    </div>
  );
}
