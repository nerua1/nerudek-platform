"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (nextLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  return (
    <div
      className="flex items-center gap-2 text-sm"
      role="group"
      aria-label={t("languageSwitcher")}
    >
      {routing.locales.map((loc) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => handleChange(loc)}
            aria-current={isActive ? "true" : undefined}
            className={[
              "uppercase tracking-wider px-2 py-1 rounded transition-colors duration-300",
              isActive
                ? "text-ink font-medium"
                : "text-muted hover:text-ink",
            ].join(" ")}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
