import { setSession } from "@/session";
import { userState } from "@/state/user";
import { ILoginResponse } from "@/types";
import { useSetRecoilState } from "recoil";
import { authClient, baseClient } from "./base";

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
      const res = await baseClient.post("/auth", {
        name: userName,
        email,
        password,
        password_confirmation,
      });

      if (res.status !== 200) {
        throw new Error("認証エラー");
      }

      const data = res.data;
      if (!data.success) {
        // サーバー側での処理失敗
        return {
          success: false,
          href: null,
          errors: data.message,
        };
      }

      // // 成功時の処理
      setSession("access-token", res.headers["access-token"] ?? "");
      setSession("client", res.headers["client"] ?? "");
      setSession("uid", res.headers["uid"] ?? "");
      setSession("expiry", res.headers["expiry"] ?? "");
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
      const res = await baseClient.post("/auth/sign_in", {
        email,
        password,
      });

      if (res.status !== 200) {
        throw new Error("認証エラー");
      }

      const data = res.data;
      if (!data.success) {
        // サーバー側での処理失敗
        return {
          success: false,
          href: null,
          errors: data.message,
        };
      }

      // // 成功時の処理
      setSession("access-token", res.headers["access-token"] ?? "");
      setSession("client", res.headers["client"] ?? "");
      setSession("uid", res.headers["uid"] ?? "");
      setSession("expiry", res.headers["expiry"] ?? "");
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
    try {
      const res = await authClient.get("/me");

      if (res.status !== 200) {
        throw new Error("認証エラー");
      }

      const data = res.data;
      if (!data.success) {
        // サーバー側での処理失敗
        return false;
      }

      setUser({ id: data.user.id, name: data.user.name });
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
