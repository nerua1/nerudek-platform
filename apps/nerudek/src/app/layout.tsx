import type { Metadata } from "next";
import { buildMetadata, buildRootJsonLd } from "@platform/seo";
import { siteConfig } from "../../site.config";
import "./globals.css";

export const metadata: Metadata = buildMetadata({ site: siteConfig });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildRootJsonLd(siteConfig) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
