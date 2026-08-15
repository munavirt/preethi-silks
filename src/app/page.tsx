import { Navbar } from "@/components/site/Navbar";
import { MotionInit } from "@/components/site/MotionInit";
import { CinematicHero } from "@/components/site/CinematicHero";
import { BrandStory } from "@/components/site/BrandStory";
import { Collections } from "@/components/site/Collections";
import { WhyPreethi } from "@/components/site/WhyPreethi";
import { FeaturedCollections } from "@/components/site/FeaturedCollections";
import { CustomerVoices } from "@/components/site/CustomerVoices";
import { VisitPreethi } from "@/components/site/VisitPreethi";
import { Footer } from "@/components/site/Footer";

export const metadata = {
  title: "Preethi Silks — Handpicked Silk Sarees & Bridal Weaves",
  description: "Preethi Silks is a premier textile destination in Kerala for silk sarees, bridal weaves, women's, men's and kids' wear. Explore our collections and visit our stores.",
  openGraph: {
    title: "Preethi Silks — Handpicked Silk Sarees & Bridal Weaves",
    description: "Preethi Silks is a premier textile destination in Kerala for silk sarees, bridal weaves, women's, men's and kids' wear. Explore our collections and visit our stores.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <MotionInit />
      <Navbar transparentOnTop={true} />
      <main>
        <CinematicHero />
        <BrandStory />
        <Collections />
        <WhyPreethi />
        <FeaturedCollections />
        <CustomerVoices />
        <VisitPreethi />
      </main>
      <Footer />
    </div>
  );
}