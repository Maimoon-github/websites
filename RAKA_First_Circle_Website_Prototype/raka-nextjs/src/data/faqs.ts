export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is RAKA First Circle?",
    answer:
      "It's RAKA's free pre-launch community. Members who register with email permission will receive our welcome guide and occasional launch updates.",
  },
  {
    question: "When are the products launching?",
    answer:
      "We're preparing for a launch in the coming months. The confirmed launch date will be shared through RAKA's official website and opted-in updates.",
  },
  {
    question: "Will I see the products before launch?",
    answer:
      "Not yet. We're intentionally keeping product and packaging visuals private until the official reveal. In the meantime, we'll share the thinking and education behind the brand.",
  },
  {
    question: "Is registration free?",
    answer:
      "Yes. There's no registration cost and no purchase requirement. Membership doesn't guarantee a discount, reserved inventory, or priority checkout.",
  },
  {
    question: "Will you contact me on WhatsApp?",
    answer:
      "Only if you separately select WhatsApp updates and that service is activated. The email signup and optional SMS or WhatsApp preferences are kept distinct.",
  },
  {
    question: "Can I unsubscribe or ask for my data to be removed?",
    answer:
      "Yes. Live email messages must include a working unsubscribe mechanism, and the published Privacy Notice will explain how to access, update, or request deletion of your details.",
  },
];
