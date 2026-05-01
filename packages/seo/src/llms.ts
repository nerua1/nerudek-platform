import type { SiteConfig } from "./site-config";

/**
 * Generates llms.txt content — the emerging standard for AI agent discoverability.
 * See: https://llmstxt.org/
 */
export function buildLlmsTxt(site: SiteConfig, opts: {
  blogPosts?: Array<{ title: string; url: string; description: string }>;
  sections?: Array<{ name: string; description: string }>;
}): string {
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.tagline}`,
    "",
    "## Overview",
    "",
    `${site.name} is a personal brand and content platform. All content visible to AI agents is SFW.`,
    "The site publishes original articles on AI tools, vibe coding, fashion photography, and digital aesthetics.",
    "",
  ];

  if (opts.sections && opts.sections.length > 0) {
    lines.push("## Sections", "");
    for (const s of opts.sections) {
      lines.push(`- **${s.name}**: ${s.description}`);
    }
    lines.push("");
  }

  if (opts.blogPosts && opts.blogPosts.length > 0) {
    lines.push("## Blog", "");
    for (const post of opts.blogPosts) {
      lines.push(`- [${post.title}](${post.url}): ${post.description}`);
    }
    lines.push("");
  }

  lines.push(
    "## Privacy",
    "",
    "This site does not collect personal data. No cookies requiring consent are set.",
    "",
    `## Contact`,
    "",
    `Site: ${site.url}`,
  );

  return lines.join("\n");
}
