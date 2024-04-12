"use client";

import { useAuth } from "@/api/auth";
import { Link, usePathname, useRouter } from "@/lib/navigation";
import { localeState } from "@/state/locale";
import { userState } from "@/state/user";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function Headers() {
  const { currentUser } = useAuth();
  const user = useRecoilValue(userState);
  const [locale, setLocale] = useRecoilState(localeState);
  const t_Main = useTranslations("Main");
  const t_Auth = useTranslations("Auth");
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    currentUser();
  }, []);

  const handleSelectLocale = (e: SelectChangeEvent<string>) => {
    setLocale(e.target.value);
    router.push(pathName, { locale: e.target.value });
  };

  return (
    <header className="flex justify-between items-center max-w-full w-[900px] m-auto h-16">
      <h1>
        <Link href="/">{t_Main("title")}</Link>
      </h1>
      <nav>
        <ul className="flex items-center justify-center">
          {user.id ? (
            <>
              <li>
                <Link
                  href="/account"
                  className="p-4 hover:bg-white transition-all"
                >
                  {user.name}
                </Link>
              </li>

              <li>
                <button className="p-4 hover:bg-white transition-all">
                  {t_Auth("logout")}
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/signup"
                  className="p-4 hover:bg-white transition-all"
                >
                  {t_Auth("signup")}
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="p-4 hover:bg-white transition-all"
                >
                  {t_Auth("login")}
                </Link>
              </li>
            </>
          )}
          <li className="ml-2">
            <Select
              value={locale}
              label="locale"
              variant="standard"
              onChange={handleSelectLocale}
            >
              <MenuItem value="ja">日本語</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </li>
        </ul>
      </nav>
    </header>
  );
}
