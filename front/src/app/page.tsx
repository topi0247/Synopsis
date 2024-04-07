"use client";
import { useState } from "react";
import SignUpModal from "./components/signupModal";
import LoginModal from "./components/loginModal";

export default function Home() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginWIthGoogle = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${API_URL}/auth/google_oauth2`;
  };

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
          <button
            onClick={() => handleLoginWIthGoogle()}
            className="bg-green-100 px-4 py-2 rounded hover:bg-green-400 transition-all"
          >
            Googleでログイン
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
