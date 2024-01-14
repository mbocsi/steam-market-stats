import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts";
import "./globals.css";
import Navbar from "@/app/ui/navbar";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Steam Market Stats",
  description: "A site that displays market statistics from steam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          href="/apple-icon?png"
          type="image/png"
          sizes="png"
        />
      </Head>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
