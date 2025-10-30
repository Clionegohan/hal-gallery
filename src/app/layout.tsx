import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "hal-gallery",
  description: "halが好きな絵師さんにskebにて依頼したイラストを自慢するだけのサイトです",
};

export default function RootLayout({
  children,
}: {
    children: React.ReactNode;
}) {
  return (
  <html lang="ja">
    <body className="mx-auto max-w-5xl bg-gray-50 text-gray-900">
      <header className="border-b bg-white px-4 py-3 font-semibold">
        <div>
          hal gallery
        </div>
      </header>
      <main className="px-4 py-8">{children}</main>
      <footer className="border-t bg-white px-4 py-6 text-gray-500">
        <div>
          © {new Date().getFullYear()} hal gallery
        </div>
      </footer>
    </body>
  </html>
  );
}
