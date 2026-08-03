import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DanceHero from "@/components/dance/Hero";
import Intro from "@/components/dance/Intro";
import Schedule from "@/components/dance/Schedule";
import DanceRepertoire from "@/components/dance/DanceRepertoire";
import DanceGallery from "@/components/dance/Gallery";
import ClosingCTA from "@/components/dance/ClosingCTA";

export const metadata = {
  title: "Balinese Dance Performance",
  description:
    "Experience a timeless Balinese dance performance at Raja Bali every Thursday evening — live music, traditional costumes, and a rotating repertoire of sacred stories.",
  alternates: { canonical: "/dance" },
};

export default function DancePage() {
  return (
    <main>
      <Navbar />
      <DanceHero />
      <Intro />
      <Schedule />
      <DanceRepertoire />
      <DanceGallery />
      <ClosingCTA />
      <Footer />
    </main>
  );
}