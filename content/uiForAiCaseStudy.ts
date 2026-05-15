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
      type: "Academic Research",
      linkLabel: "Paper ↗",
      linkHref: "https://dl.acm.org/doi/10.1145/2702123.2702398",
      name: "GEM-NI",
      description:
        "A graph-based design tool that supports parallel exploration of alternatives — branching, merging, recalling history, and comparing design states simultaneously. Designers naturally work non-linearly, revisiting and recombining earlier ideas, but most tools force a single forward path.",
      quote:
        "\"creating alternatives from history is superior because I like the idea of being able to pick something from the actual history, which could contain ideas that were not further developed.\"",
      visualLabel: undefined,
    },
  ],
  synthesis: {
    label: "Synthesis",
    title: "What the research pointed toward",
    body: "Across all three sources, the same tension surfaced: users need structure to re-enter complex work, but too much structure creates new overhead. GEM-NI showed the value of making history recoverable without forcing a linear path. Rewind AI demonstrated that passive indexing removes the burden of deciding what to save. Pieces showed how periodic roll-ups and a persistent memory layer let users jump between contexts without losing momentum. Together, they shaped a clear direction: context recovery should feel lightweight, automatic, and keyword-driven.",
  },
} as const;

export const uiForAiConceptTesting = {
  eyebrow: "02b · Concept Testing",
  title: "How we narrowed to what mattered",
  intro:
    "We ran two rounds of concept sketching across the team. The first round helped us understand what kinds of structure felt helpful versus burdensome, and gave us clear direction on what to cut.",
  ruledOut: [
    {
      name: "Momentum",
      verdict: "Ruled out",
      reason:
        "Tabs, clusters, and linked chats created too much visual overhead. Useful ideas were buried inside a structure that felt like a second app rather than something that fits into existing flow.",
    },
    {
      name: "Timethread",
      verdict: "Ruled out",
      reason:
        "Users liked entry points into long chats, but time turned out to be the wrong anchor. Most people do not remember sessions by day, and a calendar view felt limiting as usage and project complexity scaled.",
    },
  ],
  dividerLabel: "Concepts that moved forward",
  concepts: [
    {
      id: "01",
      name: "Contexts",
      imageAlt:
        "Contexts sketch showing AI-detected workflow threads spanning multiple chats",
      imageKey: "contexts",
      description:
        "AI-detected workflow threads spanning multiple chats. Users switch between recent contexts and jump to the last instance without losing their place.",
    },
    {
      id: "02",
      name: "Re-Entry Panel",
      imageAlt:
        "Re-Entry Panel sketch showing AI summary, key topics, and next steps panel",
      imageKey: "reentry",
      description:
        "An always-updated AI recap of the last session, with key topics and suggested next steps, that opens automatically when returning to an older chat.",
    },
    {
      id: "03",
      name: "Thematic Chat Grouping",
      imageAlt:
        "Thematic Chat Grouping sketch showing chats clustered by shared themes with summaries",
      imageKey: "thematic",
      description:
        "AI clusters chats by shared theme with summaries and dates, so users can trace ideas and jump between connected threads.",
    },
  ],
  convergence: {
    label: "How we converged",
    text: "Rather than picking one concept, the team used dot-votes and recognized that each direction solved a different slice of the same problem. We moved forward by integrating the strongest elements of all three into a single foundation for lo-fi prototyping and user testing.",
  },
} as const;

export const uiForAiTesting = {
  eyebrow: "04 · Testing",
  titleLines: ["From baseline", "to breakthrough"] as const,
  intro:
    "We started by measuring the problem directly — then ran two rounds of testing to close the gap.",
  baseline: {
    tag: "Baseline",
    title: "Measuring the problem first",
    body:
      "Before building anything, we gave participants a standard AI chat interface with a long scrolling conversation and asked them to find a specific piece of information. We timed how long it took — scrolling up and down, backtracking, and using Cmd+F with multiple failed attempts.",
    statValue: "~56s",
    statLabel: "Average re-entry time with standard chat",
    statContext:
      "Scrolling, backtracking, repeated Cmd+F searches with no clear anchor point",
    footnote: "This gave us a concrete number to design against.",
  },
  round1: {
    tag: "Round 1 — Lo-Fi Prototype",
    title: "Combining concepts, testing structure",
    body:
      "After team discussions, we synthesized our three concept sketches — Contexts, the Re-Entry Panel, and Thematic Chat Grouping — into a single lo-fi prototype. We tested this with participants to validate the core structure and identify what needed to change before moving to hi-fi.",
    chips: [
      "Re-entry orientation landed well",
      "Next Steps felt action-oriented, not summary",
      "Panel placement needed refinement",
    ] as const,
    mediaLabel: "Round 1 — lo-fi prototype screens",
    pivot: {
      label: "Design pivot from Round 1",
      text:
        "Users treated Next Steps as a prompt to act on immediately — not a summary to read. It moved out of the panel and into the chat input area where the action was actually happening.",
    },
  },
  round2: {
    tag: "Round 2 — Hi-Fi Prototype",
    title: "Validating with the real thing",
    body:
      "With the pivot applied, we rebuilt the prototype in hi-fi and repeated the same task-based timing test against the baseline. Participants were given the same long-chat task — find a specific piece of information — this time with the Re-Entry Panel available.",
    stats: [
      { number: "29", suffix: "s", label: "Avg. re-entry time with hi-fi panel" },
      { number: "~48", suffix: "%", label: "Faster than the 56s baseline" },
      { number: "16", suffix: "ppl", label: "Participants across both rounds" },
    ] as const,
    mediaLabel: "Round 2 — hi-fi prototype screens",
  },
} as const;

export const uiForAiToc = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "concept-testing", label: "Concepts" },
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
