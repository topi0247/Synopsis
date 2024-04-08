"use client";

export default function Login() {
  const handleLoginWIthGoogle = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${API_URL}/auth/google_oauth2`;
  };

  const handleLoginWIthDiscord = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${API_URL}/auth/discord`;
  };

  return (
    <>
      <article className="w-full flex flex-col justify-center items-center gap-8">
        <section>Devise, DeviseTokenAuth, OmniAuthによる認証テスト</section>
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="flex gap-4">
            <button
              onClick={() => handleLoginWIthGoogle()}
              className="bg-green-100 px-4 py-2 rounded hover:bg-green-400 transition-all"
            >
              Login with Google
            </button>
            <button
              onClick={() => handleLoginWIthDiscord()}
              className="bg-green-100 px-4 py-2 rounded hover:bg-green-400 transition-all"
            >
              Login with Discord
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
