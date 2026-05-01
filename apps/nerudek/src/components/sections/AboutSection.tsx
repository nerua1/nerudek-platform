"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const stats = [
  { key: "experience", value: "8+" },
  { key: "content", value: "2.4K" },
  { key: "audience", value: "85K" },
] as const;

export default function AboutSection() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      aria-label={t("heading")}
      className="relative overflow-hidden bg-bg py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[40%_1fr] lg:gap-16">
          {/* Left — Photo */}
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="/images/about.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Subtle vignette overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 40%, transparent 55%, var(--color-bg) 100%)",
                }}
              />
            </div>

            {/* Photo caption */}
            <p className="mt-4 text-center font-sans text-sm font-light tracking-wide text-muted">
              172cm &middot; 88-62-90
            </p>
          </div>

          {/* Right — Text + Stats */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-wide text-gold lg:text-3xl">
                {t("heading")}
              </h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-muted lg:text-lg">
                {t("subheading")}
              </p>
            </div>

            <div className="space-y-5 font-sans text-base leading-relaxed text-ink/80">
              <p>{t("body.p1")}</p>
              <p>{t("body.p2")}</p>
            </div>

            {/* Stats tiles */}
            <div className="mt-2 grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.key}
                  className="flex flex-col items-center rounded-2xl bg-surface px-4 py-5 text-center lg:px-6 lg:py-6"
                >
                  <span className="font-serif text-3xl font-semibold tracking-wide text-ink lg:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 font-sans text-xs font-light uppercase tracking-wider text-muted">
                    {t(`stats.${stat.key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle decorative line */}
      <div
        className="mx-auto mt-20 h-px w-full max-w-6xl px-4 lg:px-8"
        aria-hidden="true"
      >
        <div className="h-full bg-gradient-to-r from-transparent via-line/40 to-transparent" />
      </div>
    </section>
  );
}
