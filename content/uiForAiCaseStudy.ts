/** UI for AI / Context Switching case study — copy, TOC + next project promo. */

export const uiForAiCaseStudyMeta = {
  title: "Context Switching",
  subtitle:
    "How might AI interfaces support re-entry, memory, and momentum across interrupted work?",
  caseStudyEyebrow: "Overview",
  displayThesis: [
    "Linear chat works until work stretches",
    "across hours, days, or weeks.",
  ],
  introColumns: [
    "Returning users scroll, skim, and mentally reconstruct long threads just to resume where they left off. The information is still there — but re-entry often costs more effort than the task itself.",
    "We explored recall search, AI topics, summaries, and mergeable threads so AI chat feels less like a disposable feed and more like a workspace you can return to.",
  ],
  specRows: [
    { label: "My role", value: "Team Lead" },
    { label: "Team", value: "5 designers" },
    { label: "Timeframe", value: "Fall 2025: Sept - Dec" },
    { label: "Tools", value: "Figma · Next.js · React" },
  ],
} as const;

/** HMW callout (problem) — label matches Bumble HMW card pattern. */
export const uiForAiHmw = {
  label: "HMW question",
  question:
    "How might we help people quickly re-enter an AI conversation without losing context or momentum?",
} as const;

/** Closing reflection callout — same card treatment as HMW. */
export const uiForAiClosingReflection = {
  label: "Closing thought",
  text: "When you step away from your work, your work should be ready and waiting for you. Not just saving time — saving focus.",
} as const;

export const uiForAiOverviewLinks = {
  label: "Part of a series",
  description:
    "This case study is part of UI for AI, an ongoing collaborative exploration of interface patterns for long-horizon AI work. Follow the broader project stream for experiments, methods, and in-progress reflections.",
  primaryLink: {
    label: "Follow UI for AI on Medium ↗",
    href: "https://medium.com/ui-for-ai",
  },
  collaborationTitle: "Direct collaborations with partner teams",
  collaborationLinks: [
    {
      label: "No More Blank Canvas — Rethinking How People Start with AI ↗",
      href: "https://medium.com/ui-for-ai/no-more-blank-canvas-rethinking-how-people-start-with-ai-fd427af24dc8",
    },
    {
      label: "Breaking the Scroll — Reimagining Conversation Flow in AI Chats ↗",
      href: "https://medium.com/ui-for-ai/breaking-the-scroll-reimagining-conversation-flow-in-ai-chats-4fc4202dbacf",
    },
  ],
} as const;

export const uiForAiResearch = {
  title: ["Memory exists.", "Recovery doesn't."],
  cards: [
    {
      type: "Academic Research",
      linkLabel: "Paper ↗",
      linkHref: "https://dl.acm.org/doi/10.1145/2702123.2702398",
      name: "GEM-NI",
      description:
        "A graph-based design tool that supports parallel exploration of alternatives — branching, merging, recalling history, and comparing design states simultaneously. Designers naturally work non-linearly, revisiting and recombining earlier ideas, but most tools force a single forward path.",
      quote:
        "\"creating alternatives from history is superior because I like the idea of being able to pick something from the actual history, which could contain ideas that were not further developed.\"",
    },
    {
      type: "Adjacent System",
      linkLabel: "Product ↗",
      linkHref: "https://www.rewind.ai",
      name: "Rewind AI",
      description:
        "A passive memory tool that records everything you see, say, and hear — creating a searchable archive of your full digital activity. Rather than requiring deliberate note-taking, it indexes context automatically and surfaces it through keyword search. Long-term memory without the cognitive overhead of deciding what to save.",
      quote:
        "\"Rewind takes all the pressure of staying organized and taking notes off, letting me focus on getting work done.\"",
      visualLabel: "Rewind AI timeline reference",
    },
    {
      type: "Adjacent System",
      linkLabel: "Product ↗",
      linkHref: "https://docs.pieces.app/products/meet-pieces",
      name: "Pieces",
      description:
        "A persistent, context-aware workflow engine with three core pillars: a Long-Term Memory Engine that passively captures workflow context across websites, code, and apps; a Copilot grounded in that live context; and a Workstream Activity timeline with periodic roll-ups of past activity. Users jump back into a previous workflow without restating context — the system already knows where they left off.",
      quote:
        "\"You don't have to keep explaining context like you do with other AI tools.\"",
      visualLabel: "Pieces timeline and summaries reference",
    },
  ],
  synthesis: {
    label: "Synthesis",
    title: "What the research pointed toward",
    body: "Across all three sources, the same tension surfaced: users need structure to re-enter complex work, but too much structure creates new overhead. GEM-NI showed the value of making history recoverable without forcing a linear path. Rewind AI demonstrated that passive indexing removes the burden of deciding what to save. Pieces showed how periodic roll-ups and a persistent memory layer let users jump between contexts without losing momentum. Together, they shaped a clear direction: context recovery should feel lightweight, automatic, and keyword-driven.",
  },
} as const;

export const uiForAiToc = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "solution", label: "Solution" },
  { id: "testing", label: "Testing" },
  { id: "reflection", label: "Reflection" },
] as const;

export const uiForAiNextProject = {
  eyebrow: "Next project",
  title: "Trippy",
  description:
    "An intelligent travel planning app — AI-powered itinerary planning and local discovery.",
  href: "/trippy-case-study",
  imageSrc: "/images/trippyportfoliothumbnail.png",
  imageAlt: "Trippy portfolio preview",
  metaLeft: "Product design · Mobile",
  metaYear: "2024 – 2025",
} as const;
