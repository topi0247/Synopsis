import { setSession } from "@/session";

interface ILoginResponse {
  success: boolean;
  href: string | null;
  errors: string[] | null;
}

export class Auth {
  private API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 新規登録
  async signUp(
    userName: string,
    email: string,
    password: string,
    password_confirmation: string
  ): Promise<ILoginResponse> {
    try {
      const res = await fetch(`${this.API_URL}/auth`, {
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
      return { success: true, href: "/tasks", errors: null };
    } catch (e: any) {
      return { success: false, href: null, errors: [e.message] };
    }
  }

  // メアド・パスワードログイン
  async login(email: string, password: string): Promise<ILoginResponse> {
    try {
      const res = await fetch(`${this.API_URL}/auth/sign_in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      if (data.status !== "success") {
        // サーバー側での処理失敗
        return { success: false, href: null, errors: data.errors };
      }

      setSession("access-token", res.headers.get("Access-Token") ?? "");
      setSession("client", res.headers.get("Client") ?? "");
      setSession("uid", res.headers.get("Uid") ?? "");
      setSession("expiry", res.headers.get("Expiry") ?? "");
      return { success: true, href: "/tasks", errors: null };
    } catch (e: any) {
      return { success: false, href: null, errors: [e.message] };
    }
  }

  // Googleでログイン
  async loginWithGoogle(): Promise<void> {
    window.location
      .href = `${this.API_URL}/auth/google_oauth2`;
  }

  // Discordでログイン
  async loginWithDiscord(): Promise<void> {
    window.location
      .href = `${this.API_URL}/auth/discord`;
  }

  // 現在ユーザーの取得
  async currentUser(): Promise<void> {
    try {
      const res = await fetch(`${this.API_URL}/auth/validate_token`, {
        method: "GET",
        headers: {
          "access-token": sessionStorage.getItem("access-token") ?? "",
          client: sessionStorage.getItem("client") ?? "",
          uid: sessionStorage.getItem("uid") ?? "",
        },
      });

      const data = await res.json();
      if (data.status !== "success") {
        // サーバー側での処理失敗
        return;
      }
      return;
    } catch (e: any) {
      return;
    }
  }
}
