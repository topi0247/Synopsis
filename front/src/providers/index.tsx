"use client";
import { NextIntlClientProvider } from "next-intl";
import { RecoilRoot } from "recoil";

export default function AppProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  return (
    <>
      <RecoilRoot>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </RecoilRoot>
    </>
  );
}
