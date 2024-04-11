"use client";

import { authClient } from "./base";

export const useAccount = () => {
  // アカウント情報取得
  async function getAccountInfo() {
    try {
      const res = await authClient.get("/account");

      if (res.status !== 200 || res.data.success === false) {
        throw new Error("認証エラー");
      }

      return res.data.user;
    } catch (e: any) {
      return { success: false, errors: [e.message] };
    }
  }

  return {
    getAccountInfo,
  };
};
