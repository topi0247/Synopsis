"use client";

import { Button } from "@mui/material";
import { useState } from "react";
import { H2 } from "../components/ui/h2";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "../components/ui/errorMsg";
import Link from "next/link";
import { InputText } from "../components/forms/inputText";
import { useAuth } from "@/api/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

interface IFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const { login, loginWithGoogle, loginWithDiscord } = useAuth();
  const [error, setError] = useState([] as string[]);
  const router = useRouter();
  const t_Auth = useTranslations("Auth");

  const { handleSubmit, control } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const res = await login(data.email, data.password);
    if (res.success) {
      router.push(res.href ?? "/");
    } else {
      setError(res.errors ?? []);
    }
  };

  return (
    <>
      <article className="w-full flex flex-col justify-center items-center gap-8">
        <section className="w-96">
          <H2>{t_Auth("login")}</H2>
          <div className="flex flex-col gap-2 justify-center items-center w-full">
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <ErrorMessage error={error} />
              <InputText
                control={control}
                name="email"
                label={t_Auth("email")}
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
                label={t_Auth("password")}
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
              <Button type="submit" variant="outlined">
                {t_Auth("login")}
              </Button>
            </form>
            <div className="text-center">
              <Link
                href="/signup"
                className="text-center text-sm text-blue-500 underline hover:opacity-50 transition-all"
              >
                {t_Auth("to_signup")}
              </Link>
            </div>
            <div className="w-full relative h-10">
              <div className="border-t border-green-400 w-full text-center overflow-visible absolute top-1/2 left-0" />
              <p className="w-full text-center absolute top-[6px] left-0">
                <span className="bg-white px-6">{t_Auth("or")}</span>
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outlined" onClick={loginWithGoogle}>
                {t_Auth("login_with_google")}
              </Button>
              <Button variant="outlined" onClick={loginWithDiscord}>
                {t_Auth("login_with_google")}
              </Button>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
