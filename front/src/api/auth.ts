import { setSession } from "@/session";

interface SignUpResponse {
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
  ): Promise<SignUpResponse> {
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
      if (data.status === "success") {
        // 成功時の処理
        setSession("access-token", res.headers.get("Access-Token") ?? "");
        setSession("client", res.headers.get("Client") ?? "");
        setSession("uid", res.headers.get("Uid") ?? "");
        setSession("expiry", res.headers.get("Expiry") ?? "");
        return { success: true, href: "/tasks", errors: null };
      }

      // サーバー側での処理失敗
      return { success: false, href: null, errors: data.errors.full_messages };
    } catch (e: any) {
      return { success: false, href: null, errors: [e.message] };
    }
  }

  // メアド・パスワードログイン
  async login(email: string, password: string) {
    const response = await fetch(`${this.API_URL}/auth/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await response.json();
    if (result.status === "success") {
      return true;
    } else {
      return false;
    }
  }

  // パスワード再設定
  async passwordReset(email: string) {
    const response = await fetch(`${this.API_URL}/auth/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const result = await response.json();
    if (result.status === "success") {
      return true;
    } else {
      return false;
    }
  }
}
