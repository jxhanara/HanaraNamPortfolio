/* ════════════════════════════════════════════════════════════
   Portfolio · Home redesign — data
   ──────────────────────────────────────────────────────────── */

/* 3 hero-copy variations to cycle via Tweaks.
   V1 = current voice, V2 = About-page voice (more personal),
   V3 = terse / punchy. */
const HERO_COPY = [
  {
    id: "current",
    label: "Current",
    greeting: "Hey there ¨̮ I'm Hanara —",
    leadParts: [
      "I design thoughtful interfaces for complex systems, working cross-functionally with engineers, researchers, and product teams to support ",
      { italic: true, accent: true, text: "real human decision-making." },
    ],
    name: "Hanara Nam",
  },
  {
    id: "personal",
    label: "Personal (About-page voice)",
    greeting: "Hey there ¨̮ I'm Hanara —",
    leadParts: [
      "I design products with the people often left out of the room in mind — translating complex systems into interfaces that make space for ",
      { italic: true, accent: true, text: "every kind of user." },
    ],
    name: "Hanara Nam",
  },
  {
    id: "terse",
    label: "Terse",
    greeting: "Hi, I'm Hanara.",
    leadParts: [
      "Designer working at the seam of complex systems and the people who use them — ",
      { italic: true, accent: true, text: "quietly, carefully, on purpose." },
    ],
    name: "Hanara Nam",
  },
];

const STATUS = {
  location: "Pittsburgh, PA",
  role: "UX / Product Designer · M.HCI '26",
  studyAt: {
    label: "Carnegie Mellon University",
    href: "https://hcii.cmu.edu/academics/mhci",
  },
};

/* Live now-snapshot — pulled from About page Now band so the home
   strip stays consistent with About. */
const NOW_SNAPSHOT = [
  { k: "Available", v: "Summer '26 internships" },
  { k: "Based in", v: "Pittsburgh, PA" },
  { k: "Studying", v: "M.HCI at CMU" },
  { k: "Building", v: "Interview Prep Tracker" },
];

const PROJECTS = [
  {
    id: "trippy",
    num: "01",
    title: "Trippy",
    dates: "2024 — 2025",
    tag: "AI travel · sole designer",
    blurb:
      "An intelligent travel planning app I designed end-to-end at a startup focused on AI-powered itineraries and local discovery.",
    href: "/trippy-case-study",
  },
  {
    id: "bumble",
    num: "02",
    title: "Bumble Flow",
    dates: "2026",
    tag: "Dating · concept",
    blurb:
      "Redesigning dating from passive matching to active coordination — turning matches into real plans through shared intent and availability.",
    href: "/bumble-flow-case-study",
  },
  {
    id: "uiforai",
    num: "03",
    title: "UI for AI",
    dates: "2025 — 2026",
    tag: "Research · coming soon",
    blurb: "Coming soon.",
    href: "/ui-for-ai-case-study",
  },
];

/* Capabilities — same three buckets as the current site, but with
   new copy in the About-page voice (more personal, less corporate). */
const CAPS = [
  {
    id: "ux",
    num: "01",
    title: "UX Design",
    italicTitle: "the craft",
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
    italicTitle: "the voice",
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
    italicTitle: "the way",
    oneLiner: "Cross-functional by default, generous on purpose.",
    paras: [
      "I thrive in cross-functional environments and adapt quickly to what a team needs in the moment.",
      "Multiple hats or one deep problem — my goal is to bridge user needs and business goals through clear, honest communication.",
      "I value empathy, trust, and collaboration. I bring a positive, solutions-oriented mindset to every team I join.",
    ],
  },
];

/* Capabilities title-row copy options (the current is generic). */
const CAPS_HEAD = {
  eyebrow: "What I do",
  title: "How I can help —",
  italicWord: "help",
  sub: "Three lenses I keep returning to, in the order they tend to matter.",
};

window.HERO_COPY = HERO_COPY;
window.STATUS = STATUS;
window.NOW_SNAPSHOT = NOW_SNAPSHOT;
window.PROJECTS = PROJECTS;
window.CAPS = CAPS;
window.CAPS_HEAD = CAPS_HEAD;
