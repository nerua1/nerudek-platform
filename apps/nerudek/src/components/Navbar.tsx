import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import LocaleSwitcher from "./LocaleSwitcher";

export default async function Navbar() {
  const locale = await getLocale();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-surface focus:text-ink focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-luxury bg-bg/70 border-b border-line/30">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8"
        >
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image
              src="/logo/nerudek-logo.png"
              alt="Nerudek"
              width={120}
              height={40}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
            <LocaleSwitcher />
          </div>

          <MobileMenu />
        </nav>
      </header>
    </>
  );
}
