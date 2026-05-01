"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { platformLinks } from "../../../site.config";
import AgeModal from "../AgeModal";

export default function HeroSection() {
  const t = useTranslations("hero");
  const [mounted, setMounted] = useState(false);
  const [ageModalOpen, setAgeModalOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePlatformClick = useCallback(
    (url: string) => {
      if (typeof window === "undefined") return;
      const verified = sessionStorage.getItem("age-verified");
      if (verified === "true") {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        setPendingUrl(url);
        setAgeModalOpen(true);
      }
    },
    []
  );

  const handleAgeConfirm = useCallback(() => {
    if (pendingUrl) {
      window.open(pendingUrl, "_blank", "noopener,noreferrer");
    }
    setAgeModalOpen(false);
    setPendingUrl(null);
  }, [pendingUrl]);

  const handleAgeCancel = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.href = "https://www.google.com";
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-end justify-center overflow-hidden"
      aria-label={t("tagline")}
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, var(--color-paper) 60%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-32 text-center lg:px-8">
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-wide text-ink mb-6">
          Nerudek
        </h1>
        <p className="text-lg sm:text-xl text-muted max-w-xl mx-auto mb-10 leading-relaxed">
          {t("tagline")}
        </p>

        {mounted && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handlePlatformClick(platformLinks.onlyfans)}
              className="px-8 py-3.5 rounded bg-ink text-bg text-sm uppercase tracking-wider hover:bg-navy transition-colors duration-300"
            >
              {t("ctaPrimary")}
            </button>
            <button
              type="button"
              onClick={() => handlePlatformClick(platformLinks.fansly)}
              className="px-8 py-3.5 rounded border border-ink text-ink text-sm uppercase tracking-wider hover:bg-ink hover:text-bg transition-colors duration-300"
            >
              {t("ctaSecondary")}
            </button>
          </div>
        )}

        <div className="mt-16 animate-bounce">
          <span className="text-xs uppercase tracking-widest text-muted">
            {t("scrollHint")}
          </span>
        </div>
      </div>

      {ageModalOpen && (
        <AgeModal onConfirm={handleAgeConfirm} onCancel={handleAgeCancel} />
      )}
    </section>
  );
}
