"use client";
import Protected from "./_components/Protected";

export const dynamic = "force-dynamic";

export default function AdimLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex min-h-screen">{children}</div>;
}
