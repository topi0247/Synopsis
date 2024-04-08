class Auth {
  private API_URL = process.env.NEXT_PUBLIC_API_URL;
  private API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

  // 新規登録
  async signUp(
    userName: string,
    email: string,
    password: string,
    password_confirmation: string
  ) {
    const response = await fetch(`${this.API_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        registration: {
          name: userName,
          email,
          password,
          password_confirmation,
        },
      }),
    });
    const result = await response.json();
    if (result.status === "success") {
      return true;
    } else {
      return false;
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
