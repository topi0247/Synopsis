import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "@/localStorage";
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
      setLocalStorage("access-token", res.headers["access-token"] ?? "");
      setLocalStorage("client", res.headers["client"] ?? "");
      setLocalStorage("uid", res.headers["uid"] ?? "");
      setLocalStorage("expiry", res.headers["expiry"] ?? "");
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
      setLocalStorage("access-token", res.headers["access-token"] ?? "");
      setLocalStorage("client", res.headers["client"] ?? "");
      setLocalStorage("uid", res.headers["uid"] ?? "");
      setLocalStorage("expiry", res.headers["expiry"] ?? "");
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
  async function currentUser({
    uid = "",
    client = "",
    token = "",
    expiry = "",
  }: {
    uid?: string;
    client?: string;
    token?: string;
    expiry?: string;
  } = {}): Promise<boolean> {
    if (uid && client && token && expiry) {
      setLocalStorage("access-token", token);
      setLocalStorage("client", client);
      setLocalStorage("uid", uid);
      setLocalStorage("expiry", expiry);
    }
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
      return false;
    }
  }

  // ログアウト
  async function logout(): Promise<boolean> {
    try {
      const res = await baseClient.delete("/auth/sign_out", {
        headers: {
          "access-token": getLocalStorage("access-token"),
          client: getLocalStorage("client"),
          uid: getLocalStorage("uid"),
          expiry: getLocalStorage("expiry"),
        },
      });
      if (res.status !== 200) {
        throw new Error("認証エラー");
      }

      clearLocalStorage();

      setUser({ id: null, name: "" });
      return true;
    } catch (e: any) {
      console.error(e);
      return false;
    }
  }

  return {
    signUp,
    login,
    loginWithGoogle,
    loginWithDiscord,
    currentUser,
    logout,
  };
};
