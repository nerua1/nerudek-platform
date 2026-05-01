import Link from "next/link";
import { useTranslations } from "next-intl";
import fs from "node:fs";
import path from "node:path";

interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: number;
}

function extractFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match || !match[1]) return {};
  const frontmatter: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      frontmatter[key.trim()] = rest.join(":").trim().replace(/^["']|["']$/g, "");
    }
  }
  return frontmatter;
}

function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

async function getPosts(): Promise<BlogPostMeta[]> {
  const postsDir = path.join(process.cwd(), "src/content/posts");
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const content = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const fm = extractFrontmatter(content);
      const body = content.replace(/^---\n[\s\S]*?\n---/, "");
      const date: string = fm.date || new Date().toISOString().split("T")[0]!;
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: fm.title || "Untitled",
        description: fm.description || "",
        date,
        category: fm.category || "uncategorized",
        readingTime: estimateReadingTime(body),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function BlogSection() {
  const t = useTranslations("blog");
  const posts = await getPosts();

  return (
    <section
      id="blog"
      aria-label={t("heading")}
      className="relative bg-surface py-24 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center lg:mb-16">
          <h3 className="font-serif text-2xl font-semibold tracking-wide text-gold lg:text-3xl">
            {t("heading")}
          </h3>
          <p className="mt-3 font-sans text-base text-muted lg:text-lg">
            {t("subheading")}
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="py-16 text-center font-sans text-sm text-muted">
            {t("empty")}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl bg-bg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {/* Category badge */}
                <div className="mb-3">
                  <span className="inline-block rounded-full bg-surface px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-widest text-muted">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-serif text-lg font-semibold leading-snug tracking-wide text-ink transition-colors group-hover:text-gold lg:text-xl">
                  {post.title}
                </h4>

                {/* Description */}
                {post.description && (
                  <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-muted">
                    {post.description}
                  </p>
                )}

                {/* Meta */}
                <div className="mt-auto flex items-center gap-3 pt-4">
                  <time
                    dateTime={post.date}
                    className="font-sans text-xs text-muted/70"
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="font-sans text-xs text-muted/50" aria-hidden="true">
                    ·
                  </span>
                  <span className="font-sans text-xs text-muted/70">
                    {t("readingTime", { minutes: post.readingTime })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View all link */}
        {posts.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium uppercase tracking-wider text-ink underline-offset-4 transition-colors hover:text-gold"
            >
              {t("readMore")}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>

      {/* Decorative line */}
      <div className="mx-auto mt-20 h-px w-full max-w-4xl px-4 lg:px-8" aria-hidden="true">
        <div className="h-full bg-gradient-to-r from-transparent via-line/40 to-transparent" />
      </div>
    </section>
  );
}
