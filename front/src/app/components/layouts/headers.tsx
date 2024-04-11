"use client";

import { useAuth } from "@/api/auth";
import { userState } from "@/state/user";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const Headers = () => {
  const { currentUser } = useAuth();
  const user = useRecoilValue(userState);

  useEffect(() => {
    currentUser();
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
          {user.id && (
            <li>
              <Link
                href="/account"
                className="p-4 hover:bg-white transition-all"
              >
                {user.name}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

Headers.displayName = "Headers";
export default Headers;
