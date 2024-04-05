"use client";
import Link from "next/link";
import React, { memo, useState } from "react";
import SignUpModal from "./signupModal";
import LoginModal from "./loginModal";

const Headers = memo(() => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center max-w-full w-[900px] m-auto">
        <h1>
          <Link href="/">認証テスト</Link>
        </h1>
        <nav>
          <ul className="flex items-center">
            <li>
              <button
                onClick={() => setIsSignUpModalOpen(true)}
                className={`p-4 hover:bg-white transition-all ${
                  isSignUpModalOpen ? "bg-white" : ""
                }`}
              >
                新規登録
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className={`p-4 hover:bg-white transition-all ${
                  isLoginModalOpen ? "bg-white" : ""
                }`}
              >
                ログイン
              </button>
            </li>
            <li>
              <Link href="/tasks" className="p-4 hover:bg-white transition-all">
                Tasks
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {isSignUpModalOpen && (
        <SignUpModal setIsSignUpModalOpen={setIsSignUpModalOpen} />
      )}
      {isLoginModalOpen && (
        <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />
      )}
    </>
  );
});

Headers.displayName = "Headers";
export default Headers;
