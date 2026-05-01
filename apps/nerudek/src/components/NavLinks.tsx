"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NavLinks() {
  const t = useTranslations("nav");
  const links = [
    { href: "#hero", label: t("home") },
    { href: "#about", label: t("about") },
    { href: "#gallery", label: t("gallery") },
    { href: "#blog", label: t("blog") },
  ];

  return (
    <ul className="flex items-center gap-6 lg:gap-8">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-sm uppercase tracking-wider text-muted hover:text-ink transition-colors duration-300"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
