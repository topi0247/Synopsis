import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

export default function Home() {
  const t_Main = useTranslations("Main");
  const t_Auth = useTranslations("Auth");
  return (
    <article className="w-full flex flex-col justify-center items-center gap-8">
      <h2>{t_Main("title")}</h2>
      <section className="flex gap-8">
        <Link
          href="/signup"
          className="bg-green-100 py-4 px-8 rounded hover:bg-green-500 hover:text-white transition-all"
        >
          {t_Auth("signup")}
        </Link>
        <Link
          href="/login"
          className="bg-green-100 py-4 px-8 rounded hover:bg-green-500 hover:text-white transition-all"
        >
          {t_Auth("login")}
        </Link>
      </section>
    </article>
  );
}
