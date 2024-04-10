"use client";
import Link from "next/link";
import React, { useEffect } from "react";

const Headers = () => {
  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:3000/api/v1/current_user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    };
    //fetchData();
  }, []);
  return (
    <header className="flex justify-between items-center max-w-full w-[900px] m-auto h-16">
      <h1>
        <Link href="/">認証テスト</Link>
      </h1>
      <nav>
        <ul className="flex items-center">
          <li>
            <Link href="/signup" className="p-4 hover:bg-white transition-all">
              新規登録
            </Link>
          </li>
          <li>
            <Link href="/login" className="p-4 hover:bg-white transition-all">
              ログイン
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

Headers.displayName = "Headers";
export default Headers;
