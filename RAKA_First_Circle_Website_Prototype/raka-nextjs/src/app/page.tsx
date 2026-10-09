import HomeClient from "@/components/home/HomeClient";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RAKA First Circle",
    description:
      "RAKA's pre-launch registration page for scalp and hair care in Pakistan.",
    url: "https://raka.pk/first-circle",
    inLanguage: "en-PK",
    isPartOf: {
      "@type": "WebSite",
      name: "RAKA",
      url: "https://raka.pk",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
