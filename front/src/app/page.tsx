import Link from "next/link";

export default function Home() {
  return (
    <article className="w-full flex flex-col justify-center items-center gap-8">
      <h2>認証テスト</h2>
      <section className="flex gap-8">
        <Link
          href="/signup"
          className="bg-green-100 py-4 px-8 rounded hover:bg-green-500 hover:text-white transition-all"
        >
          新規登録
        </Link>
        <Link
          href="/login"
          className="bg-green-100 py-4 px-8 rounded hover:bg-green-500 hover:text-white transition-all"
        >
          ログイン
        </Link>
      </section>
    </article>
  );
}
