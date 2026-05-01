import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        {/* TODO: <AboutSection /> */}
        <section id="about" aria-label="About" />
        {/* TODO: <GallerySection /> */}
        <section id="gallery" aria-label="Gallery" />
        {/* TODO: <BlogSection /> */}
        <section id="blog" aria-label="Blog" />
        {/* TODO: <PromoSection /> */}
        <section id="promo" aria-label="Sister sites" />
      </main>
      <Footer />
    </>
  );
}
