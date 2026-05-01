import type { Metadata } from "next";
import type { SiteConfig } from "./site-config";

interface PageMetaInput {
  site: SiteConfig;
  title?: string;
  description?: string;
  /** Absolute path from public/ — defaults to site.ogImage */
  ogImagePath?: string;
  /** Canonical path (e.g. "/blog/my-post") */
  canonicalPath?: string;
  noIndex?: boolean;
  /** Optional keywords for the page */
  keywords?: string[];
}

export function buildMetadata({
  site,
  title,
  description,
  ogImagePath,
  canonicalPath = "",
  noIndex,
  keywords,
}: PageMetaInput): Metadata {
  const pageTitle = title ? `${title} | ${site.name}` : site.name;
  const pageDescription = description ?? site.tagline;
  const canonical = `${site.url}${canonicalPath}`;
  const rawOgImage = ogImagePath ?? site.ogImage;
  const ogImage = rawOgImage.startsWith("http")
    ? rawOgImage
    : `${site.url}${rawOgImage}`;
  const shouldNoIndex = noIndex ?? site.noIndex ?? false;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(site.url),
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: pageTitle,
      description: pageDescription,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      ...(ogImage && { images: [ogImage] }),
      ...(site.person.twitterHandle && {
        creator: site.person.twitterHandle,
        site: site.person.twitterHandle,
      }),
    },
    keywords: keywords?.join(", "),
    robots: shouldNoIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
