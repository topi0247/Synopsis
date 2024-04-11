"use client";
import { H2 } from "../components/ui/h2";
import { useEffect, useState } from "react";
import { useAccount } from "@/api/account";

interface IUser {
  id: number;
  name: string;
  email: string;
}

export default function User() {
  const [user, setUser] = useState({} as IUser);
  const account = useAccount();

  useEffect(() => {
    account.getAccountInfo().then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <article>
      <H2>{user?.name}さん</H2>
      <section className="w-96 m-auto">
        <p>ユーザー名: {user?.name}</p>
        <p>メールアドレス：{user?.email}</p>
      </section>
    </article>
  );
}
