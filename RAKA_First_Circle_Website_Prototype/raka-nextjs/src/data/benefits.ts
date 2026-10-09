export interface BenefitItem {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export const BENEFIT_ITEMS: BenefitItem[] = [
  {
    number: "01",
    icon: "✳",
    title: "The first word",
    description:
      "Be among the first to receive the official launch announcement and product introduction.",
  },
  {
    number: "02",
    icon: "◈",
    title: "The care notes",
    description:
      "Get thoughtful, easy-to-follow hair-care ideas — starting with a complimentary seven-day guide.",
  },
  {
    number: "03",
    icon: "✧",
    title: "A closer connection",
    description:
      "Join conversations and invitations created for people curious about the RAKA journey.",
  },
];
