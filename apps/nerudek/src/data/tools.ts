export interface Tool {
  slug: string
  name: string
  description: string
  category: 'images' | 'dev' | 'text' | 'ai'
  seoScore: number
  wip?: boolean
}

export const TOOLS: Tool[] = [
  { slug: 'webp-to-jpg',      name: 'WebP to JPG',           description: 'Convert WebP images to JPG — free, instant, no upload',              category: 'images', seoScore: 7.5 },
  { slug: 'remove-bg',        name: 'Remove Background',     description: 'Remove image background automatically — AI-powered, runs in browser', category: 'images', seoScore: 7.4 },
  { slug: 'word-counter',     name: 'Word Counter SEO',      description: 'Count words, characters, sentences and readability score',             category: 'text',   seoScore: 7.3 },
  { slug: 'qr-generator',     name: 'QR Code Generator',     description: 'Generate QR codes for URLs, text, WiFi — download PNG/SVG',           category: 'dev',    seoScore: 7.2 },
  { slug: 'heic-to-jpg',      name: 'HEIC to JPG',           description: 'Convert iPhone HEIC photos to JPG — no upload needed',                category: 'images', seoScore: 7.0 },
  { slug: 'image-to-svg',     name: 'Image to SVG',          description: 'Vectorize raster images to SVG — runs locally in browser',            category: 'images', seoScore: 6.8 },
  { slug: 'color-palette',    name: 'Color Palette',         description: 'Extract color palettes from images or generate from seed color',       category: 'dev',    seoScore: 6.7 },
  { slug: 'compress-image',   name: 'Compress Image',        description: 'Reduce image file size without losing quality — WASM-powered',         category: 'images', seoScore: 6.5 },
  { slug: 'glass-css',        name: 'Glass CSS Maker',       description: 'Generate glassmorphism CSS effects with live preview',                 category: 'dev',    seoScore: 6.3 },
  { slug: 'pdf-to-word',      name: 'PDF to Word',           description: 'Convert PDF documents to editable Word format',                       category: 'dev',    seoScore: 6.1 },
  { slug: 'code-diff',        name: 'Code Diff Viewer',      description: 'Compare two code snippets side by side with syntax highlighting',      category: 'dev',    seoScore: 5.9 },
  { slug: 'case-converter',   name: 'Case Converter',        description: 'Convert text between camelCase, snake_case, UPPER_CASE and more',      category: 'text',   seoScore: 5.8 },
  { slug: 'prompt-enhancer',  name: 'Prompt Enhancer',       description: 'Improve your AI prompts for better image and text generation',         category: 'ai',     seoScore: 5.5 },
]

export const CATEGORIES = { images: 'Images', dev: 'Developer', text: 'Text', ai: 'AI' } as const

export const getToolBySlug = (slug: string) => TOOLS.find(t => t.slug === slug)
export const getToolsByCategory = (cat: Tool['category']) => TOOLS.filter(t => t.category === cat)
export const topTools = () => [...TOOLS].sort((a, b) => b.seoScore - a.seoScore)
