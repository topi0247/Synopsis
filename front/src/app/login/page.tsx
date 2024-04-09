"use client";

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { H2 } from "../components/ui/h2";
import { useRouter } from "next/navigation";
import { setSession } from "@/session";
import { ErrorMessage } from "../components/ui/errorMsg";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const router = useRouter();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    await fetch(`${API_URL}/auth/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
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
          console.log(data);
        } else {
          setError(data.errors);
        }
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
        <section className="w-96">
          <H2>ログイン</H2>
          <div className="flex flex-col gap-2 justify-center items-center w-full">
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={(e) => handleOnSubmit(e)}
            >
              <ErrorMessage error={error} />
              <TextField
                label="メールアドレス"
                variant="outlined"
                type="email"
                autoComplete="email"
                name="email"
                required
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="パスワード"
                variant="outlined"
                type="password"
                autoCapitalize="current-password"
                name="password"
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" variant="outlined">
                ログイン
              </Button>
            </form>
            <div className="text-center">
              <Link
                href="/signup"
                className="text-center text-sm text-blue-500 underline hover:opacity-50 transition-all"
              >
                新規登録はこちら
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
