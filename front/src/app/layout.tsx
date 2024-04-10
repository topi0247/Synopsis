import type { Metadata } from "next";
import "@/styles/globals.css";
import Headers from "./components/layouts/headers";

export const metadata: Metadata = {
  title: "認証テスト",
  description: "認証テスト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="w-full">
        <div className="bg-green-100 shadow-md">
          <Headers />
        </div>
        <main className="w-full p-8 max-w-[1000px] m-auto">{children}</main>
      </body>
    </html>
  );
}
