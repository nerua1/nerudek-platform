export interface GalleryImage {
  src: string;
  alt: string;
  category: "fashion" | "editorial" | "digital";
  title: string;
}

const baseImages: GalleryImage[] = [
  {
    src: "/gallery/portfolio-1.jpg",
    alt: "Fashion editorial — studio portrait",
    category: "fashion",
    title: "Studio Noir",
  },
  {
    src: "/gallery/portfolio-2.jpg",
    alt: "Editorial fashion photography",
    category: "editorial",
    title: "Golden Hour",
  },
  {
    src: "/gallery/portfolio-3.jpg",
    alt: "Fashion portrait with creative lighting",
    category: "fashion",
    title: "Light Study I",
  },
  {
    src: "/gallery/portfolio-4.jpg",
    alt: "Editorial concept shoot",
    category: "editorial",
    title: "Raw Form",
  },
  {
    src: "/gallery/portfolio-5.jpg",
    alt: "Digital art and fashion fusion",
    category: "digital",
    title: "Synthetic Bloom",
  },
  {
    src: "/gallery/portfolio-6.jpg",
    alt: "Fashion portrait — natural light",
    category: "fashion",
    title: "Morning Grace",
  },
  {
    src: "/gallery/portfolio-7.jpg",
    alt: "Editorial — high contrast",
    category: "editorial",
    title: "Contrast Theory",
  },
  {
    src: "/gallery/portfolio-8.jpg",
    alt: "Creative fashion editorial",
    category: "editorial",
    title: "Soft Geometry",
  },
  {
    src: "/gallery/portfolio-9.jpg",
    alt: "Digital manipulation and portraiture",
    category: "digital",
    title: "Pixel Skin",
  },
  {
    src: "/gallery/portfolio-a10.jpg",
    alt: "Fashion editorial — outdoor",
    category: "fashion",
    title: "Open Air",
  },
  {
    src: "/gallery/portfolio-a15.jpg",
    alt: "Artistic fashion portrait",
    category: "editorial",
    title: "Shadow Play",
  },
  {
    src: "/gallery/portfolio-a19.jpg",
    alt: "Digital dreamscape",
    category: "digital",
    title: "Neon Reverie",
  },
];

export function getGalleryImages(): GalleryImage[] {
  return baseImages;
}

export function getImagesByCategory(
  category?: GalleryImage["category"] | "all"
): GalleryImage[] {
  if (!category || category === "all") return baseImages;
  return baseImages.filter((img) => img.category === category);
}

export const galleryCategories = [
  { key: "all" as const, labelKey: "gallery.categories.all" },
  { key: "fashion" as const, labelKey: "gallery.categories.fashion" },
  { key: "editorial" as const, labelKey: "gallery.categories.editorial" },
  { key: "digital" as const, labelKey: "gallery.categories.digital" },
];
