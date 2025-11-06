import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
export const metadata: Metadata = {
  title: "hal-gallery",
  description:
    "halが好きな絵師さんにskebにて依頼したイラストを自慢するだけのサイトです",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="mx-auto max-w-5xl bg-black">
        <Header />
        <main className="px-4 pt-20 pb-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
