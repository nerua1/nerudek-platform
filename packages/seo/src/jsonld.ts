import type { SiteConfig } from "./site-config";

/** Generates JSON-LD Person + WebSite schema for the root layout */
export function buildRootJsonLd(site: SiteConfig): string {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.tagline,
        inLanguage: site.locales.length > 1 ? Array.from(site.locales) : site.defaultLocale,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${site.url}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.person.name,
        url: site.url,
        sameAs: [
          site.person.instagramUrl,
          site.person.twitterHandle
            ? `https://twitter.com/${site.person.twitterHandle.replace("@", "")}`
            : undefined,
        ].filter((item): item is string => typeof item === "string"),
      },
    ],
  };

  return JSON.stringify(schema);
}

/** JSON-LD for a blog article */
export function buildArticleJsonLd(opts: {
  site: SiteConfig;
  title: string;
  description: string;
  url: string;
  publishedAt: string; // ISO 8601
  modifiedAt?: string;
  imageUrl?: string;
}): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    datePublished: opts.publishedAt,
    dateModified: opts.modifiedAt ?? opts.publishedAt,
    author: {
      "@type": "Person",
      "@id": `${opts.site.url}/#person`,
      name: opts.site.person.name,
    },
    publisher: {
      "@type": "Person",
      "@id": `${opts.site.url}/#person`,
    },
    ...(opts.imageUrl && {
      image: { "@type": "ImageObject", url: opts.imageUrl },
    }),
  };

  return JSON.stringify(schema);
}
