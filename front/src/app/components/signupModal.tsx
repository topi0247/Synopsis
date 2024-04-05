"use client";

import { memo, useState } from "react";
import Modal from "./modal";
import { useRouter } from "next/navigation";

const SignUpModal = memo(
  ({
    setIsSignUpModalOpen,
  }: {
    setIsSignUpModalOpen: (isOpen: boolean) => void;
  }) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState("");

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = {
        registration: {
          name: userName,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        },
      };

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;
      const response = await fetch(`${API_URL}/api/${API_VERSION}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status === "success") {
        router.push("/tasks");
      } else {
        setErrorMsg(result.message);
      }
    };

    return (
      <Modal onClose={() => setIsSignUpModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">
          <span className="px-4 pb-2 border-b-2 border-green-400">
            新規登録
          </span>
        </h2>
        {errorMsg ?? (
          <div className="w-full my-8 mx-8">
            <p className="p-2 border border-red-400 bg-red-400 bg-opacity-40 w-full text-center text-gray-500">
              {errorMsg}
            </p>
          </div>
        )}
        <section className="w-40 m-auto">
          <form
            className="flex flex-col gap-4 w-full justify-center items-center"
            onSubmit={handleOnSubmit}
          >
            <div>
              <label>ユーザー名</label>
              <input
                type="text"
                className="bg-slate-200 rounded focus:outline-none p-1 ml-8 leading-3"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label>メールアドレス</label>
              <input
                type="email"
                className="bg-slate-200 rounded focus:outline-none p-1 ml-8 leading-3"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード</label>
              <input
                type="password"
                className="bg-slate-200 rounded focus:outline-none p-1 ml-8 leading-3"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード確認</label>
              <input
                type="password"
                className="bg-slate-200 rounded focus:outline-none p-1 ml-8 leading-3"
                autoComplete="new-password"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
            <button className="bg-green-100 rounded px-4 py-2 hover:bg-green-400 transition-all">
              登録
            </button>
          </form>
        </section>
      </Modal>
    );
  }
);

SignUpModal.displayName = "SignUpModal";
export default SignUpModal;
