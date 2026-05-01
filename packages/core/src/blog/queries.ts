import type { BlogPost } from "./types";

// Stub — will use MDX filesystem or CMS in Phase 3+
const MOCK_POSTS: BlogPost[] = [];

export function getAllPosts(): BlogPost[] {
  return MOCK_POSTS;
}

export function getPostBySlug(_slug: string): BlogPost | null {
  return MOCK_POSTS.find((p) => p.slug === _slug) ?? null;
}

export function getAdjacentPosts(_slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  return { prev: null, next: null };
}
