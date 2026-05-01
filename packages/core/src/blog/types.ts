export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
};

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  image?: string;
};

export function parseFrontmatter<T extends Record<string, unknown>>(
  raw: string,
): { frontmatter: T; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match || !match[1] || !match[2]) throw new Error("Invalid frontmatter");
  const frontmatter: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      const value = rest.join(":").trim();
      frontmatter[key.trim()] = isNaN(Number(value)) ? value : Number(value);
    }
  }
  return { frontmatter: frontmatter as T, content: match[2] };
}
