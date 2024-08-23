import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/Provider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastProvider } from "./shop/_components/toast";
import CartModal, { ProductDetail } from "@/components/CartList";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amo.arte",
  description: "Place to buy professional art work",
  // icons: {
  //   icon: '/favicon.ico',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col justify-between relative min-h-screen`}
        suppressHydrationWarning={true}
      >
        <ReduxProvider>
          <ToastProvider>
            <Header />
            <CartModal />
            {children}
            <Footer />
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
