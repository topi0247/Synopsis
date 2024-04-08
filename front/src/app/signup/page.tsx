"use client";

import { Button, TextField } from "@mui/material";
import CustomStyle from "./style.module.css";
import { H2 } from "../components/ui/h2";

export default function SignUp() {
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <div className="flex flex-col gap-2 justify-center items-center my-8">
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => handleOnSubmit(e)}
            >
              <TextField label="名前" variant="outlined" type="text" />
              <TextField
                label="メールアドレス"
                variant="outlined"
                type="email"
              />
              <TextField
                label="パスワード"
                variant="outlined"
                type="password"
              />
              <TextField
                label="パスワード（確認）"
                variant="outlined"
                type="password"
              />
              <Button variant="outlined">新規登録</Button>
            </form>
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
