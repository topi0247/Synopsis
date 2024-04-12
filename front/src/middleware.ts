import createMiddleware from "next-intl/middleware";
import { locales } from "./lib/navigation";

export default createMiddleware({
  defaultLocale: "ja",
  locales,
});

export const config = {
  matcher: ["/", "/(ja|en)/:path*"],
};
