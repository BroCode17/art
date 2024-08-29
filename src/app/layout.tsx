import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/Provider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastProvider } from "./(root)/shop/_components/toast";
import CartModal, { ProductDetail } from "@/components/CartList";
import CountDown from "@/components/CountDown";

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
        className={`${inter.className} flex flex-col justify-between relative  custom-scrollbar`}
        suppressHydrationWarning={true}
      >
        <ReduxProvider>
          <ToastProvider>
            <Header />
            <CartModal />
           {children}
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
