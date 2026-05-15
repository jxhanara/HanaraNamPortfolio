export type Capability = {
  id: string;
  num: string;
  title: string;
  oneLiner: string;
  paras: readonly string[];
};

export const CAPABILITIES: readonly Capability[] = [
  {
    id: "ux",
    num: "01",
    title: "UX Design",
    oneLiner: "Decisions that earn their place.",
    paras: [
      "I approach UX with a strong focus on purpose — every decision should serve a clear user need, not a slide.",
      "I work closely with engineers and product partners across Figma, website builders, or hand-rolled CSS — whatever the problem actually needs.",
      "I care about clarity, usability, and building experiences that hold up under real-world constraints.",
    ],
  },
  {
    id: "brand",
    num: "02",
    title: "Branding",
    oneLiner: "Identities that feel intentional and human.",
    paras: [
      "I help brands shape visual identities that feel intentional — like someone behind it actually decided.",
      "I blend strategy and craft: type, color, motion, copy — every visual choice in service of the brand's values and audience.",
      "I focus on cohesive systems that tell a clear story and can grow over time without falling apart.",
    ],
  },
  {
    id: "collab",
    num: "03",
    title: "Collaborate & Adapt",
    oneLiner: "Cross-functional by default, generous on purpose.",
    paras: [
      "I thrive in cross-functional environments and adapt quickly to what a team needs in the moment.",
      "Multiple hats or one deep problem — my goal is to bridge user needs and business goals through clear, honest communication.",
      "I value empathy, trust, and collaboration. I bring a positive, solutions-oriented mindset to every team I join.",
    ],
  },
] as const;
