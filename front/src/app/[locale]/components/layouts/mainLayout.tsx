"use client";
import { useSetRecoilState } from "recoil";
import Headers from "./headers";
import { localeState } from "@/state/locale";
import { useEffect } from "react";

export default function MainLayout({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  const setLocale = useSetRecoilState(localeState);
  useEffect(() => {
    setLocale(lang);
  }, [lang]);
  return (
    <>
      <div className="bg-green-100 shadow-md">
        <Headers />
      </div>
      <main className="w-full p-8 max-w-[1000px] m-auto">{children}</main>
    </>
  );
}
