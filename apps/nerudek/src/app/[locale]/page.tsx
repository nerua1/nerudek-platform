import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import GallerySection from "@/components/sections/GallerySection";
import HelixSection from "@/components/sections/HelixSection";
import BlogSection from "@/components/sections/BlogSection";
import ToolsSection from "@/components/sections/ToolsSection";
import PromoSection from "@/components/sections/PromoSection";
import FAQSection from "@/components/sections/FAQSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <HelixSection />
        <BlogSection />
        <ToolsSection />
        <PromoSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
