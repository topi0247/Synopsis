"use client";
import Headers from "./headers";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-green-100 shadow-md">
        <Headers />
      </div>
      <main className="w-full p-8 max-w-[1000px] m-auto">{children}</main>
    </>
  );
}
