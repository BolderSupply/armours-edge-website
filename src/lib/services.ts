export type Service = {
  slug: string;
  title: string;
  /** One-line summary used on cards. */
  summary: string;
  /** Slightly longer description used on the Services page. */
  description: string;
};

export const services: Service[] = [
  {
    slug: "interlock",
    title: "Interlock Patios, Pool Decks & Driveways",
    summary:
      "Durable, stable and beautiful interlocking stonework for the surfaces you use every day.",
    description:
      "Durable, stable and aesthetically pleasing, interlocking stonework is an excellent choice for a customized and flexible surface. From patios and pool decks to driveways, we design and build surfaces made to last.",
  },
  {
    slug: "retaining-walls",
    title: "Retaining Walls",
    summary:
      "Natural stone and precast walls that solve soil retention and look good doing it.",
    description:
      "Where function meets aesthetics. We build natural stone and precast retaining walls that give you a visually appealing solution for your soil retention needs.",
  },
  {
    slug: "steps",
    title: "Steps",
    summary:
      "Natural stone and precast steps that elevate your landscape, and not only literally.",
    description:
      "With many unique varieties of natural stone and precast, step installation can elevate your landscape in more ways than one.",
  },
  {
    slug: "water-features-fire-pits",
    title: "Water Features & Fire Pits",
    summary:
      "Natural elements that add sensory depth, ambiance and a place to relax.",
    description:
      "Natural elements add an unmatched sensory experience. Water features and fire pits turn an ordinary yard into an oasis for relaxation and ambiance.",
  },
  {
    slug: "landscape-lighting",
    title: "Landscape Lighting",
    summary:
      "Bring out the best of your landscape after dark with thoughtful lighting.",
    description:
      "Unlock the beauty of your landscape day and night. Well-planned lighting gives your property an entirely different perspective after dark.",
  },
  {
    slug: "irrigation",
    title: "Irrigation Install & Maintenance",
    summary: "Effective, thoughtful irrigation to keep your property green and lush.",
    description:
      "Keep your property green and lush with effective, thoughtful irrigation solutions, from new installation through ongoing maintenance.",
  },
  {
    slug: "excavation-grading",
    title: "Excavation & Grading",
    summary: "Whether you are a homeowner or a contractor, we can help with your excavation project.",
    description:
      "Whether you are a DIYer or a contractor, we can help with your excavation and grading project.",
  },
  {
    slug: "decks-fences",
    title: "Decks & Fences",
    summary: "Wood and composite decks and fences built to suit your space.",
    description:
      "Our deck and fence team will build to suit your outdoor wood and composite projects.",
  },
];

export function getServiceBySlug(slug: string | undefined) {
  return services.find((s) => s.slug === slug);
}
