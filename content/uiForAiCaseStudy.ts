/** UI for AI / Context Switching case study — copy and TOC. */

export const uiForAiCaseStudyMeta = {
  title: "Context Switching",
  subtitle:
    "How might AI interfaces support re-entry, memory, and momentum across interrupted work?",
  heroMeta: [
    { label: "My role", value: "Team Lead" },
    { label: "Team", value: "5 designers" },
    { label: "Timeframe", value: "Fall 2025: Sept - Dec" },
    { label: "Tools", value: "Figma · Next.js · React" },
  ],
  overviewEyebrow: "00 · OVERVIEW",
  displayThesis: [
    "Linear chat works until work stretches",
    "across hours, days, or weeks.",
  ],
  introColumns: [
    "Returning users scroll, skim, and mentally reconstruct long threads just to resume where they left off. The information is still there — but re-entry often costs more effort than the task itself.",
    "We explored recall search, AI topics, summaries, and mergeable threads so AI chat feels less like a disposable feed and more like a workspace you can return to.",
  ],
} as const;

export const uiForAiProblem = {
  title: "Where AI chats break down",
  intro:
    "Linear chat works fine for quick sessions, but when work stretches across days or weeks, getting back up to speed takes more effort than the actual task. Scrolling, skimming, and mentally reconstructing past context shouldn't be part of the process.",
  mockupSession: "Session · Day 4 · 137 messages",
  painPoints: [
    {
      title: "Disorientation",
      body:
        "Long threads bury decisions, files, and reasoning steps with no way to jump back.",
    },
    {
      title: "High re-entry cost",
      body:
        "After stepping away, users must reconstruct context from scratch before moving forward.",
    },
    {
      title: "Re-prompting loop",
      body:
        "Instead of building forward, users end up repeating prompts they already sent.",
    },
    {
      title: "Lost insights",
      body:
        "Valuable outputs get buried in the scroll and forgotten before they can be acted on.",
    },
  ],
} as const;

/** HMW callout (problem) — label matches Bumble HMW card pattern. */
export const uiForAiHmw = {
  label: "HMW question",
  question:
    "How might we help people quickly re-enter an AI conversation without losing context or momentum?",
} as const;

export const uiForAiReflection = {
  eyebrow: "05 · Reflection",
  title: "Why it matters",
  intro: [
    "Re-entry breaks down when people remember fragments, not timelines. Our solution meets users where they are — searching by keyword, jumping by topic, or picking up from a summary — rather than forcing them to scroll until something looks familiar.",
  ],
  takeaways: [
    {
      n: "01",
      title: "Retrieval beats re-generation",
      body: "The core frustration was finding past outputs, not generating new ones. Treating chat history as a recoverable asset changes the whole experience.",
    },
    {
      n: "02",
      title: "Lightweight wins",
      body: "The best interactions required the least new behavior. Automation and quick recall work best when they surface in the moment, right in the main chat, not in a panel users have to seek out.",
    },
    {
      n: "03",
      title: "AI as a durable workspace",
      body: "This project gestures toward a future where AI chats work less like disposable conversations and more like spaces you can actually return to.",
    },
  ],
} as const;

/** Closing reflection callout — same card treatment as HMW. */
export const uiForAiClosingReflection = {
  label: "Closing thought",
  text: "When you step away from your work, your work should be ready and waiting for you. Not just saving time — saving focus.",
} as const;

export const uiForAiOverviewSeries = {
  label: "Part of a series",
  title: "UI for AI",
  relatedCount: 3,
  description:
    "An ongoing collaborative exploration of interface patterns for long-horizon AI work — experiments, methods, and in-progress reflections.",
  links: [
    {
      title: "Follow UI for AI on Medium",
      subtitle: "The full project stream",
      href: "https://medium.com/ui-for-ai",
    },
    {
      title: "No More Blank Canvas",
      subtitle: "Rethinking how people start with AI",
      href: "https://medium.com/ui-for-ai/no-more-blank-canvas-rethinking-how-people-start-with-ai-fd427af24dc8",
    },
    {
      title: "Breaking the Scroll",
      subtitle: "Reimagining conversation flow in AI chats",
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
        "A workflow engine built on long-term memory across apps, a context-aware copilot, and a workstream timeline that helps users resume work.",
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
        "A passive memory system that automatically records and indexes digital activity, turning everyday context into searchable memory.",
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
        "A graph-based design tool built for non-linear workflows, allowing designers to branch, merge, and compare multiple design directions in parallel.",
      quote:
        "\"creating alternatives from history is superior because I like the idea of being able to pick something from the actual history, which could contain ideas that were not further developed.\"",
      visualLabel: "GEM-NI diagram",
    },
  ],
  synthesis: {
    label: "Synthesis",
    title: "What the research pointed toward",
    body: "Across all three sources, the same tension emerged: users need enough structure to re-enter complex work without adding new overhead. GEM-NI emphasized recoverable history, Rewind AI showed the value of passive indexing, and Pieces highlighted how persistent memory supports seamless context switching.",
    takeaway:
      "Context recovery should feel lightweight, automatic, and keyword-driven.",
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
  eyebrow: "03 · Testing",
  titleLines: ["From baseline", "to breakthrough"] as const,
  intro:
    "We started by measuring the problem directly — then ran two rounds of testing to close the gap.",
  baseline: {
    tag: "Baseline",
    title: "Measuring the problem first",
    body:
      "Before designing anything, we gave participants a standard AI chat with a long conversation and timed how long it took to find a specific piece of information. Most scrolled back and forth, backtracked, and ran multiple Cmd+F searches with no clear result.",
    statValue: "~56s",
    statLabel: "Average re-entry time with standard chat",
    statContext:
      "Scrolling, backtracking, repeated Cmd+F with no clear anchor point",
    footnote: "This gave us a concrete number to design against.",
  },
  round1: {
    tag: "Round 1 — Lo-Fi Prototype",
    title: "Three directions, one clear signal",
    body:
      "We put three directions in front of users. Two earned their place and merged into the design we'd build. The third was set aside.",
    hint: "Click an idea to expand it and see the prototype.",
    ideas: [
      {
        index: "01",
        status: "cut",
        statusLabel: "Set aside",
        name: "Task Contexts",
        desc:
          "Workflows split into a named to-do list. Users tagged chats to a task; a side panel surfaced related past conversations with excerpts to jump into.",
        verdict:
          "Compelling in concept, but it asked users to do organizational work upfront before getting any value.",
        imageAlt: "Task Contexts lo-fi prototype — named to-do list with tagged chats",
      },
      {
        index: "02",
        status: "kept",
        statusLabel: "Validated",
        name: "Re-Entry Panel",
        desc:
          "An AI-generated session recap with key topics and next steps, shown whenever users returned to an older chat.",
        verdict: "Landed immediately, with zero setup.",
        imageAlt: "Re-Entry Panel lo-fi prototype — AI session recap with key topics and next steps",
      },
      {
        index: "03",
        status: "kept",
        statusLabel: "Validated",
        name: "Related Chats",
        desc:
          "When a task is active, the interface automatically pulls in past chats that are relevant to it. Users can browse excerpts from those chats and click directly into the section that matters, no manual searching required.",
        verdict: "Landed immediately, with zero setup.",
        imageAlt: "Related Chats lo-fi prototype — relevant past chats with jumpable excerpts",
      },
    ] as const,
    merge: {
      label: "Combined into the build",
      chips: ["Re-Entry Panel", "Related Chats"] as const,
      result:
        "The two validated directions merged into one experience: an automatic in-chat recap with topics, plus a side panel that surfaces relevant past conversations when you need them.",
    },
  },
  whatChanged: {
    tag: "What changed",
    title: "Narrowing to what users actually valued",
    body:
      "With Task Contexts set aside, the team committed to the combined Re-Entry experience and moved the AI summary directly into the chat, expanding automatically when users returned. No extra steps required.",
    imageAlts: [
      "Re-Entry Panel in context of the chat interface — mid-fi",
      "Related chat surfacing in context of the chat interface — mid-fi",
    ] as const,
  },
  round2: {
    tag: "Round 2 — Hi-Fi Prototype",
    title: "Validating with the real thing",
    body:
      "We rebuilt in hi-fi and ran the same timing task against the baseline. Re-entry time dropped to 29 seconds. One more insight surfaced: users wanted to act on Next Steps immediately while typing, not read them in a panel. It moved into the chat input where the action was.",
    stats: [
      { number: "29", suffix: "s", label: "Avg. re-entry time with hi-fi panel" },
      { number: "~48", suffix: "%", label: "Faster than the 56s baseline" },
      { number: "16", suffix: "ppl", label: "Participants across both rounds" },
    ] as const,
  },
} as const;

export const uiForAiToc = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "concept-testing", label: "Concepts" },
  { id: "testing", label: "Testing" },
  { id: "solution", label: "Solution" },
  { id: "reflection", label: "Reflection" },
] as const;
