"use client";

import { useTranslations } from "next-intl";
import { sisterSites } from "../../../site.config";

export default function PromoSection() {
  const t = useTranslations("promo");

  return (
    <section
      id="promo"
      aria-label={t("heading")}
      className="relative bg-bg py-24 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center lg:mb-16">
          <h3 className="font-serif text-2xl font-semibold tracking-wide text-gold lg:text-3xl">
            {t("heading")}
          </h3>
          <p className="mt-3 font-sans text-base text-muted lg:text-lg">
            {t("subheading")}
          </p>
        </div>

        {/* Sister site cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {sisterSites.map((site) => {
            const siteKey = site.name === "wonna.best" ? "wonna" : "aztun";
            return (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-2xl bg-surface p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                aria-label={
                  site.status === "coming-soon"
                    ? `${site.name} — ${t("status.comingSoon")}`
                    : `${site.name} — ${t("status.live")}`
                }
              >
                {/* Status badge */}
                <div className="mb-6">
                  {site.status === "coming-soon" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-line/40 px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-widest text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted/60" />
                      {t("status.comingSoon")}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-widest text-success">
                      <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                      {t("status.live")}
                    </span>
                  )}
                </div>

                {/* Site name */}
                <h4 className="font-serif text-2xl font-semibold tracking-wide text-ink transition-colors group-hover:text-gold lg:text-3xl">
                  {site.name}
                </h4>

                {/* Description */}
                <p className="mt-3 font-sans text-sm leading-relaxed text-muted">
                  {t(`${siteKey}.description`)}
                </p>

                {/* CTA */}
                <div className="mt-auto flex items-center gap-2 pt-8">
                  <span className="font-sans text-sm font-medium uppercase tracking-wider text-ink underline-offset-4 group-hover:underline group-hover:text-gold">
                    {t(`${siteKey}.cta`)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-lg text-gold transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>

                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, oklch(0.68 0.080 35 / 0.08), transparent 60%)",
                  }}
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
