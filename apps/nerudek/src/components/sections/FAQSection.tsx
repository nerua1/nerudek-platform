"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FAQSection() {
  const t = useTranslations("faq");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: t("items.0.q"), a: t("items.0.a") },
    { q: t("items.1.q"), a: t("items.1.a") },
    { q: t("items.2.q"), a: t("items.2.a") },
    { q: t("items.3.q"), a: t("items.3.a") },
    { q: t("items.4.q"), a: t("items.4.a") },
  ];

  return (
    <section
      id="faq"
      aria-label={t("heading")}
      className="relative bg-bg py-24 lg:py-32"
    >
      <div className="mx-auto max-w-xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center lg:mb-16">
          <h3 className="font-serif text-2xl font-semibold tracking-wide text-gold lg:text-3xl">
            {t("heading")}
          </h3>
          <p className="mt-3 font-sans text-base text-muted lg:text-lg">
            {t("subheading")}
          </p>
        </div>

        {/* Accordion */}
        <div className="relative">
          {/* Glassmorphism blob — decorative */}
          <div
            className="pointer-events-none absolute -inset-8 -z-10 rounded-[40%] opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, #C5A882 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="space-y-px rounded-2xl border border-line/20 bg-bg/80 backdrop-blur-sm">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border-b border-line/20 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left font-sans text-sm font-medium text-ink transition-colors hover:text-gold"
                  aria-expanded={openIdx === i}
                >
                  <span className="pr-4">{faq.q}</span>
                  <span
                    className={`flex-shrink-0 text-gold transition-transform duration-300 ${
                      openIdx === i ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    openIdx === i
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 font-sans text-sm leading-relaxed text-muted">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="mx-auto mt-20 h-px w-full max-w-6xl px-4 lg:px-8" aria-hidden="true">
        <div className="h-full bg-gradient-to-r from-transparent via-line/40 to-transparent" />
      </div>
    </section>
  );
}
