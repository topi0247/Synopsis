"use client";

import { Button } from "@mui/material";
import { H2 } from "../components/ui/h2";
import { useState } from "react";
import { ErrorMessage } from "../components/ui/errorMsg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/api/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputText } from "../components/forms/inputText";

interface IFormInputs {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignUp() {
  const { signUp, loginWithGoogle, loginWithDiscord } = useAuth();
  const [error, setError] = useState([] as string[]);
  const router = useRouter();

  const { handleSubmit, control, getValues } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const res = await signUp(
      data.name,
      data.email,
      data.password,
      data.passwordConfirmation
    );
    if (res.success) {
      router.push(res.href ?? "/");
    } else {
      setError(res.errors ?? []);
    }
  };

  return (
    <>
      <article className="w-full flex flex-col justify-center items-center gap-8">
        <section className="flex flex-col justify-center items-center w-96">
          <H2>新規登録</H2>
          <div className="flex flex-col gap-2 justify-center items-center my-8 w-full">
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <ErrorMessage error={error} />
              <InputText
                control={control}
                name="name"
                label="名前"
                rules={{
                  required: { value: true, message: "必須入力" },
                }}
                autoComplete="name"
              />
              <InputText
                control={control}
                name="email"
                label="メールアドレス"
                rules={{
                  required: { value: true, message: "入力必須" },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "メールアドレスの形式で入力してください",
                  },
                }}
                autoComplete="email"
              />
              <InputText
                control={control}
                name="password"
                label="パスワード"
                type="password"
                rules={{
                  required: { value: true, message: "入力必須" },
                  minLength: {
                    value: 6,
                    message: "6文字以上で入力してください",
                  },
                }}
                autoComplete="new-password"
              />
              <InputText
                control={control}
                name="passwordConfirmation"
                label="パスワード（確認）"
                type="password"
                rules={{
                  required: { value: true, message: "入力必須" },
                  validate: (value: string) =>
                    value === getValues("password") ||
                    "パスワードが一致しません",
                  minLength: {
                    value: 6,
                    message: "6文字以上で入力してください",
                  },
                }}
                autoComplete="new-password"
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
              <Button variant="outlined" onClick={() => loginWithGoogle}>
                Googleで新規登録
              </Button>
              <Button variant="outlined" onClick={() => loginWithDiscord}>
                Discordで新規登録
              </Button>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
