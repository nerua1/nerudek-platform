"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";

export default function MobileMenu() {
  const t = useTranslations("nav");
  const links = [
    { href: "#hero", label: t("home") },
    { href: "#about", label: t("about") },
    { href: "#gallery", label: t("gallery") },
    { href: "#blog", label: t("blog") },
  ];

  return (
    <details className="md:hidden group">
      <summary
        className="list-none cursor-pointer p-2"
        aria-label="Toggle menu"
      >
        <span className="block w-6 h-0.5 bg-ink mb-1.5 transition-transform group-open:translate-y-2 group-open:rotate-45" />
        <span className="block w-6 h-0.5 bg-ink mb-1.5 transition-opacity group-open:opacity-0" />
        <span className="block w-6 h-0.5 bg-ink transition-transform group-open:-translate-y-2 group-open:-rotate-45" />
      </summary>
      <div className="absolute top-full left-0 right-0 bg-surface border-b border-line/30 shadow-lg">
        <ul className="flex flex-col gap-4 px-4 py-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block text-sm uppercase tracking-wider text-muted hover:text-ink transition-colors duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2 border-t border-line/30">
            <LocaleSwitcher />
          </li>
        </ul>
      </div>
    </details>
  );
}
