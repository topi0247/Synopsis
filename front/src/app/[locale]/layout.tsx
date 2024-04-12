import "@/styles/globals.css";
import MainLayout from "./components/layouts/mainLayout";
import AppProvider from "@/providers";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "認証テスト",
  description: "devise-token-authの認証テスト",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body className="w-full">
        <AppProvider>
          {/* next-inilのプロバイダーはサーバーサイドでのみ動くのでここで設定 */}
          <NextIntlClientProvider locale={locale} messages={messages}>
            <MainLayout>{children}</MainLayout>
          </NextIntlClientProvider>
        </AppProvider>
      </body>
    </html>
  );
}
