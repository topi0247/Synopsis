"use client";

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { H2 } from "../components/ui/h2";
import { useRouter } from "next/navigation";
import { setSession } from "@/session";

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
        console.log(res.headers.get("Access-Token"));
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
              {error.length > 0 && (
                <p className="bg-red-400 bg-opacity-40 p-3 rounded border border-red-600 text-center text-gray-700 my-2">
                  {error.map((e) => {
                    return e;
                  })}
                </p>
              )}
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
            <hr className="or" />
            <div className="flex gap-4">
              <button
                onClick={() => handleLoginWIthGoogle()}
                className="bg-green-100 px-4 py-2 rounded hover:bg-green-400 transition-all"
              >
                Login with Google
              </button>
              <button
                onClick={() => handleLoginWIthDiscord()}
                className="bg-green-100 px-4 py-2 rounded hover:bg-green-400 transition-all"
              >
                Login with Discord
              </button>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
