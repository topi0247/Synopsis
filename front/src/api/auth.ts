import { getSession, setSession } from "@/session";
import { userState } from "@/state/user";
import { ILoginResponse } from "@/types";
import { useSetRecoilState } from "recoil";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const useAuth = () => {
  const setUser = useSetRecoilState(userState);

  // 新規登録
  async function signUp(
    userName: string,
    email: string,
    password: string,
    password_confirmation: string
  ): Promise<ILoginResponse> {
    try {
      const res = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email,
          password,
          password_confirmation,
        }),
      });

      const data = await res.json();
      if (data.status !== "success") {
        // サーバー側での処理失敗
        return {
          success: false,
          href: null,
          errors: data.errors.full_messages,
        };
      }

      // 成功時の処理
      setSession("access-token", res.headers.get("Access-Token") ?? "");
      setSession("client", res.headers.get("Client") ?? "");
      setSession("uid", res.headers.get("Uid") ?? "");
      setSession("expiry", res.headers.get("Expiry") ?? "");
      setSession("authorization", res.headers.get("Authorization") ?? "");
      setUser({ id: data.data.id, name: data.data.name });
      return { success: true, href: "/tasks", errors: null };
    } catch (e: any) {
      return { success: false, href: null, errors: [e.message] };
    }
  }

  // メアド・パスワードログイン
  async function login(
    email: string,
    password: string
  ): Promise<ILoginResponse> {
    try {
      const res = await fetch(`${API_URL}/auth/sign_in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("認証エラー");
      }

      const data = await res.json();
      if (data.success !== true) {
        // サーバー側での処理失敗
        return { success: false, href: null, errors: data.errors };
      }

      setSession("access-token", res.headers.get("Access-Token") ?? "");
      setSession("client", res.headers.get("Client") ?? "");
      setSession("uid", res.headers.get("Uid") ?? "");
      setSession("expiry", res.headers.get("Expiry") ?? "");
      setUser({ id: data.user.id, name: data.user.name });
      return { success: true, href: "/tasks", errors: null };
    } catch (e: any) {
      return { success: false, href: null, errors: [e.message] };
    }
  }

  // Googleでログイン
  async function loginWithGoogle(): Promise<void> {
    window.location.href = `${API_URL}/auth/google_oauth2`;
  }

  // Discordでログイン
  async function loginWithDiscord(): Promise<void> {
    window.location.href = `${API_URL}/auth/discord`;
  }

  // 現在ユーザーの取得
  async function currentUser(): Promise<boolean> {
    const accessToken = getSession("access-token");
    const client = getSession("client");
    const uid = getSession("uid");
    const expiry = getSession("expiry");
    const authorization = getSession("authorization");
    if (!accessToken || !client || !uid || !expiry || !authorization) {
      return false;
    }
    try {
      const res = await fetch(`${API_URL}/api/v1/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": accessToken,
          client: client,
          uid: uid,
          expiry: expiry,
          authorization: authorization,
        },
      });
      console.log(res);

      if (!res.ok) {
        throw new Error("認証エラー");
      }
      const json = await res.json();
      setUser({ id: json.data.id, name: json.data.name });
      return true;
    } catch (e: any) {
      console.error(e.message);
      return true;
    }
  }

  return {
    signUp,
    login,
    loginWithGoogle,
    loginWithDiscord,
    currentUser,
  };
};
