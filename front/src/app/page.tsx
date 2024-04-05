"use client";
import { useState } from "react";
import SignUpModal from "./components/signupModal";
import LoginModal from "./components/loginModal";

export default function Home() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <article className="w-full flex flex-col justify-center items-center gap-8">
        <section>Devise, DeviseTokenAuth, OmniAuthによる認証テスト</section>
        <div className="flex gap-8">
          <button
            onClick={() => setIsSignUpModalOpen(true)}
            className="bg-green-100 px-4 py-2 rounded hover:bg-green-400 transition-all"
          >
            新規登録
          </button>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="bg-green-100 px-4 py-2 rounded hover:bg-green-400 transition-all"
          >
            ログイン
          </button>
        </div>
      </article>
      {isSignUpModalOpen && (
        <SignUpModal setIsSignUpModalOpen={setIsSignUpModalOpen} />
      )}
      {isLoginModalOpen && (
        <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />
      )}
    </>
  );
}
