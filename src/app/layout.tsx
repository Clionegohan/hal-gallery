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
      <body className="bg-black">
        <Header />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
