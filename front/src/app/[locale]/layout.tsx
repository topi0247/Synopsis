import "@/styles/globals.css";
import MainLayout from "./components/layouts/mainLayout";
import AppProvider from "@/providers";

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <body className="w-full">
        <AppProvider locale={locale}>
          <MainLayout lang={locale}>{children}</MainLayout>
        </AppProvider>
      </body>
    </html>
  );
}
