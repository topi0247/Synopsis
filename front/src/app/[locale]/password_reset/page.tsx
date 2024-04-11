"use client";

import { useState } from "react";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {};

  return (
    <article>
      <h2>パスワード再設定の申請</h2>
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>送信</button>
        </form>
      </section>
    </article>
  );
};

PasswordReset.displayName = "PasswordReset";
export default PasswordReset;
