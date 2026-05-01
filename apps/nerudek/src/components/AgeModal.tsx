"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

interface AgeModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function AgeModal({ onConfirm, onCancel }: AgeModalProps) {
  const t = useTranslations("modal");
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("age-verified", "true");
    }
    setIsOpen(false);
    onConfirm();
  }, [onConfirm]);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    onCancel();
  }, [onCancel]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      confirmButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleCancel]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;

    const focusableElements = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    dialog.addEventListener("keydown", handleTab);
    return () => dialog.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center bg-ink/60 backdrop-luxury"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCancel();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-modal-title"
        className="mx-4 max-w-md rounded-lg bg-surface p-8 shadow-2xl border border-line/30"
      >
        <h2
          id="age-modal-title"
          className="font-serif text-3xl tracking-wide text-ink mb-4"
        >
          18+
        </h2>
        <p className="text-muted mb-6 leading-relaxed">{t("ageBody")}</p>
        <p className="text-xs text-muted/70 mb-8">{t("ageSessionNote")}</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2.5 rounded text-sm uppercase tracking-wider text-muted hover:text-ink hover:bg-hover transition-colors duration-300"
          >
            {t("ageDeny")}
          </button>
          <button
            ref={confirmButtonRef}
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2.5 rounded text-sm uppercase tracking-wider bg-ink text-bg hover:bg-navy transition-colors duration-300"
          >
            {t("ageConfirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
