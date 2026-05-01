"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { sisterSites } from "../../site.config";

export default function Footer() {
  const t = useTranslations("footer");
  const promoT = useTranslations("promo");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/30 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Image
              src="/logo/nerudek-logo.png"
              alt="Nerudek"
              width={100}
              height={34}
              className="h-7 w-auto object-contain opacity-80"
            />
            <p className="text-sm text-muted">
              {t("copyright", { year: String(year) })}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs uppercase tracking-widest text-muted">
              Links
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/privacy"
                className="text-sm text-ink hover:text-gold transition-colors duration-300"
              >
                {t("links.privacy")}
              </Link>
              <Link
                href="/contact"
                className="text-sm text-ink hover:text-gold transition-colors duration-300"
              >
                {t("links.contact")}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs uppercase tracking-widest text-muted">
              {promoT("heading")}
            </h3>
            <div className="flex flex-col gap-2">
              {sisterSites.map((site) => (
                <div key={site.name} className="flex items-center gap-2">
                  <span className="text-sm text-muted">{site.name}</span>
                  <span className="inline-flex items-center rounded-full bg-paper px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                    {promoT("status.comingSoon")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
