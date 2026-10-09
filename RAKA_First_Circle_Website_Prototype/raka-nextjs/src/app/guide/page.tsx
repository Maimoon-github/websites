import type { Metadata } from "next";
import PrototypeRibbon from "@/components/layout/PrototypeRibbon";
import Header from "@/components/layout/Header";
import GuideHero from "@/components/guide/GuideHero";
import GuideBody from "@/components/guide/GuideBody";
import GuideFooter from "@/components/guide/GuideFooter";

export const metadata: Metadata = {
  title: "7 Days to Better Hair-Care Habits | RAKA First Circle",
  description:
    "Seven simple daily lessons to understand and practice more thoughtful hair care, from RAKA First Circle.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function GuidePage() {
  return (
    <>
      <PrototypeRibbon text="COMPLIMENTARY GUIDE — RAKA FIRST CIRCLE" />
      <Header variant="guide" />
      <main id="main">
        <GuideHero />
        <GuideBody />
      </main>
      <GuideFooter />
    </>
  );
}
