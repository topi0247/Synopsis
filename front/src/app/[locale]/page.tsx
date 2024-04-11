import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("Main");
  return (
    <article className="w-full flex flex-col justify-center items-center gap-8">
      <h2>{t("title")}</h2>
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
