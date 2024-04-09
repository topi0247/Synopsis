"use client";

import { Button, TextField } from "@mui/material";
import { H2 } from "../components/ui/h2";
import { useState } from "react";
import { ErrorMessage } from "../components/ui/errorMsg";
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";
import { setSession } from "@/session";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${API_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setSession("access-token", res.headers.get("Access-Token") ?? "");
          setSession("client", res.headers.get("Client") ?? "");
          setSession("uid", res.headers.get("Uid") ?? "");
          setSession("expiry", res.headers.get("Expiry") ?? "");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          router.push("/login");
        } else {
          setError(data.errors);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLoginWIthGoogle = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${API_URL}/auth/google_oauth2`;
  };

  const handleLoginWIthDiscord = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${API_URL}/auth/discord`;
  };

  return (
    <>
      <article className="w-full flex flex-col justify-center items-center gap-8">
        <section className="flex flex-col justify-center items-center w-96">
          <H2>新規登録</H2>
          <div className="flex flex-col gap-2 justify-center items-center my-8 w-full">
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={(e) => handleOnSubmit(e)}
            >
              <ErrorMessage error={error} />
              <TextField
                label="名前"
                variant="outlined"
                type="text"
                autoComplete="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="メールアドレス"
                variant="outlined"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="パスワード"
                variant="outlined"
                type="password"
                autoComplete="new-password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="パスワード（確認）"
                variant="outlined"
                type="password"
                autoComplete="new-password"
                required
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <Button variant="outlined" type="submit">
                新規登録
              </Button>
            </form>
            <div className="text-center">
              <Link
                href="/login"
                className="text-center text-sm text-blue-500 underline hover:opacity-50 transition-all"
              >
                ログインはこちら
              </Link>
            </div>
            <hr className="or" />
            <div className="flex gap-4">
              <Button
                variant="outlined"
                onClick={() => handleLoginWIthGoogle()}
              >
                Googleで新規登録
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleLoginWIthDiscord()}
              >
                Discordで新規登録
              </Button>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
