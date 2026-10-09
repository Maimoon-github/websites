export interface GuideLesson {
  day: string;
  title: string;
  description: string;
  practice: string;
}

export const GUIDE_LESSONS: GuideLesson[] = [
  {
    day: "DAY 01",
    title: "Understand your starting point.",
    description:
      "Notice whether your main concern is dryness, tangling, breakage, visible flakes, or shedding. These experiences can have different causes, so avoid assuming that one product or habit solves them all.",
    practice: "Write down your care goals and your current routine.",
  },
  {
    day: "DAY 02",
    title: "Wash with intention.",
    description:
      "Choose washing frequency based on your scalp and hair needs rather than a universal rule. Use a suitable cleanser and avoid aggressive scrubbing with your nails.",
    practice: "Pay attention to your scalp's response after washing.",
  },
  {
    day: "DAY 03",
    title: "Detangle more gently.",
    description:
      "Rough brushing and pulling can contribute to hair breakage. Work carefully through tangles, particularly when hair is fragile or wet, using an approach suitable for your hair type.",
    practice: "Detangle in smaller sections without forcing knots.",
  },
  {
    day: "DAY 04",
    title: "Give hair a break from heat.",
    description:
      "Frequent high heat can damage hair fibers. Lower temperatures, appropriate heat protection, and fewer heat-styling sessions can help reduce avoidable damage.",
    practice: "Try an air-dry or lower-heat styling day if practical.",
  },
  {
    day: "DAY 05",
    title: "Pay attention to your scalp.",
    description:
      "Persistent itching, burning, painful bumps, or flaking may need individual assessment. Dryness and dandruff are not interchangeable, and adding oil is not the answer to every scalp condition.",
    practice: "Note any persistent symptoms instead of trying several new products at once.",
  },
  {
    day: "DAY 06",
    title: "Protect against unnecessary tension.",
    description:
      "Tight hairstyles and repeated pulling can stress hair. Choose comfortable styles and accessories, and avoid keeping tension on the same areas of the scalp.",
    practice: "Choose a gentler hairstyle and check for pulling or discomfort.",
  },
  {
    day: "DAY 07",
    title: "Make your routine sustainable.",
    description:
      "Choose a small number of habits you can maintain. If hair loss is sudden, patchy, progressive, or accompanied by scalp symptoms, consult a qualified clinician for diagnosis and suitable care.",
    practice: "Keep your three most realistic habits for the coming month.",
  },
];
