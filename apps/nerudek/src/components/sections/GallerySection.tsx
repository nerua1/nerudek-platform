"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  getGalleryImages,
  getImagesByCategory,
  galleryCategories,
  type GalleryImage,
} from "@/data/gallery";

export default function GallerySection() {
  const t = useTranslations("gallery");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const images = getImagesByCategory(activeCategory as GalleryImage["category"] | "all");

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      if (lightboxIndex === null) return;
      const delta = direction === "next" ? 1 : -1;
      const next =
        (lightboxIndex + delta + images.length) % images.length;
      setLightboxIndex(next);
    },
    [lightboxIndex, images.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, navigateLightbox]);

  return (
    <section
      id="gallery"
      aria-label={t("heading")}
      className="relative bg-bg py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center lg:mb-16">
          <h3 className="font-serif text-2xl font-semibold tracking-wide text-gold lg:text-3xl">
            {t("heading")}
          </h3>
          <p className="mt-3 font-sans text-base text-muted lg:text-lg">
            {t("subheading")}
          </p>
        </div>

        {/* Category filter */}
        <div
          className="mb-10 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Gallery categories"
        >
          {galleryCategories.map(({ key, labelKey }) => (
            <button
              key={key}
              role="tab"
              aria-selected={activeCategory === key}
              type="button"
              onClick={() => setActiveCategory(key)}
              className={`rounded-full px-5 py-2 font-sans text-sm uppercase tracking-wider transition-all duration-300 ${
                activeCategory === key
                  ? "bg-ink text-bg shadow-sm"
                  : "bg-surface text-muted hover:bg-line/40 hover:text-ink"
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4"
          role="tabpanel"
        >
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => openLightbox(i)}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="w-full p-3 text-left">
                  <p className="font-sans text-xs font-medium uppercase tracking-wider text-white">
                    {image.title}
                  </p>
                  <p className="mt-0.5 font-sans text-[10px] uppercase tracking-widest text-white/70">
                    {image.category}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {images.length === 0 && (
          <p className="py-16 text-center font-sans text-sm text-muted">
            No images in this category.
          </p>
        )}
      </div>

      {/* Lightbox */}
      {mounted && lightboxIndex !== null && images[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-scrim backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={images[lightboxIndex]!.alt}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-bg/10 p-2 text-white backdrop-blur transition-colors hover:bg-bg/20 lg:right-8 lg:top-8"
            aria-label={t("lightbox.close")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Nav prev */}
          <button
            type="button"
            onClick={() => navigateLightbox("prev")}
            className="absolute left-2 z-10 rounded-full bg-bg/10 p-3 text-white backdrop-blur transition-colors hover:bg-bg/20 lg:left-8"
            aria-label={t("lightbox.prev")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Image */}
          <div className="relative mx-16 flex max-h-[85vh] max-w-[85vw] items-center justify-center">
            <Image
              src={images[lightboxIndex]!.src}
              alt={images[lightboxIndex]!.alt}
              width={1200}
              height={1600}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
              priority
            />
          </div>

          {/* Nav next */}
          <button
            type="button"
            onClick={() => navigateLightbox("next")}
            className="absolute right-2 z-10 rounded-full bg-bg/10 p-3 text-white backdrop-blur transition-colors hover:bg-bg/20 lg:right-8"
            aria-label={t("lightbox.next")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-ink/60 px-4 py-1.5 backdrop-blur">
            <span className="font-mono text-xs text-white">
              {t("lightbox.counter", {
                current: lightboxIndex + 1,
                total: images.length,
              })}
            </span>
          </div>
        </div>
      )}

      {/* Decorative line */}
      <div className="mx-auto mt-20 h-px w-full max-w-6xl px-4 lg:px-8" aria-hidden="true">
        <div className="h-full bg-gradient-to-r from-transparent via-line/40 to-transparent" />
      </div>
    </section>
  );
}
