/**
 * Bumble Flow case study copy (sourced from Portfolio-MCP frame `32:3` / published case study).
 * Structured to match the Trippy / inspiration case study layout system.
 */

export const bumbleCaseStudyMeta = {
  title: "Bumble Flow",
  subtitle:
    "Redesigning dating from passive matching to active coordination — helping users turn matches into real plans through shared intent and availability.",
  caseStudyEyebrow: "Case study",
  displayThesis: [
    "Designing for readiness,",
    "not just proximity.",
  ],
  introColumns: [
    "This project began with a speculative brief from the Bumble Customer Acquisition Team. The initial mandate was transactional: leverage precise location data and timely notifications to convert non-paying users into subscribers.",
    "I reframed the opportunity around coordination — moving location out of the UI and into system logic — so premium value is tied to mutual readiness and lower-friction scheduling, not “nearby” alone.",
  ],
  specRows: [
    {
      label: "My role",
      value: "Lead Product Designer · Design Engineer",
    },
    { label: "Timeframe", value: "4 weeks" },
    {
      label: "Tools",
      value: "Codex CLI (vibe coding) · Next.js · React · Figma",
    },
  ],
} as const;

export const bumbleChallenge = {
  eyebrow: "01 · Challenge",
  title: "The original design brief",
  lead: [
    "The core focus was purely transactional: use location services to drive subscriptions across mobile, desktop, and watch.",
    "The mandate paired a clear business goal with a proximity-led hypothesis — before validating whether “nearby” actually motivated real-world meetups.",
  ],
  mandateLabel: "The original mandate",
  mandateBlocks: [
    {
      kicker: "The goal",
      body: "Increase conversion among non-paying users — 90% of whom are under 35.",
    },
    {
      kicker: "The hypothesis",
      body: 'Users would convert to paid subscribers if they were notified of matches within 0.5km via “timely notifications”.',
    },
    {
      kicker: "The tech",
      body: "Use precise location services to alert users on mobile, desktop, and watch.",
    },
  ],
} as const;

export const bumbleResearch = {
  eyebrow: "02 · Research",
  title: "Proximity without intent: “nearby matches” don’t lead to dates",
  lead: [
    "While the brief focused on proximity, the data told a different story — engagement with proximity alerts fell from 18% to 6% in six months, suggesting “nearby” wasn’t enough to motivate users.",
    "To uncover the “why” behind the numbers, I synthesized themes from Reddit and community forums:",
  ],
  engagementCaption: "Engagement with proximity alerts (0–20% scale for comparison)",
  engagementWasLabel: "Six months ago",
  engagementWasValue: "18%",
  engagementNowLabel: "Today",
  engagementNowValue: "6%",
  themeCards: [
    {
      kicker: "Misleading proximity",
      body: 'Users are shown people who are “nearby” but not actually available or local, leading to wasted time and frustration.',
      accent: "orange" as const,
    },
    {
      kicker: 'The “awkward” gap',
      body: 'Users liked each other but stalled when it came to the manual “labor” of scheduling.',
      accent: "green" as const,
    },
    {
      kicker: "Distance of readiness",
      body: "Being 0.5km away doesn’t mean a user is mentally ready to go on a date.",
      accent: "blue" as const,
    },
  ],
  bridgeEyebrow: "Strategic read",
  bridgeTitle: "Bridging business goals with user needs through real-world coordination",
  bridgeBody:
    "By solving coordination friction, I could offer a tangible reason to upgrade that proximity alerts lacked. I moved location out of the UI and into system logic — treating proximity as one signal among many, not the headline.",
  hmw: "How might we help users recognize moments of shared readiness — moving beyond proximity to enable real meetups?",
} as const;

export const bumbleStrategy = {
  eyebrow: "03 · Strategy",
  title: "Design transformation",
  body: "I pivoted from a system that simply found gaps in a calendar to one that aligns shared intent before surfacing availability — ensuring every coordination nudge is grounded in mutual readiness, not just empty time.",
  pivotEyebrow: "The pivot",
  initialLabel: "From",
  initialHeadline: "Calendar-first automation",
  initialBullets: [
    {
      title: "Calendar gaps",
      body: "Assumes an empty slot equals social readiness.",
    },
    {
      title: "All-or-nothing",
      body: "Requires full calendar sync to unlock value.",
    },
    {
      title: "Exposed",
      body: "“Available now” markers remove the ability to decline discreetly.",
    },
    {
      title: "Feature-locked",
      body: "Value is hidden behind a high-friction data request.",
    },
  ],
  workedLabel: "To",
  workedHeadline: "Intent-first coordination",
  workedBullets: [
    {
      title: "Intent-based",
      body: 'Users explicitly “opt in” to specific time windows.',
    },
    {
      title: "Flexible entry",
      body: 'Options for manual input or “privacy-first” sync.',
    },
    {
      title: "Protected",
      body: "System suggests matches without broadcasting real-time status.",
    },
    {
      title: "Incentivized",
      body: 'Shows “Suggested Windows” to all; Premium automates them.',
    },
  ],
  outcomeLine:
    "Same subscription goal — reframed around coordination users actually want, with clearer premium reasons than proximity pings alone.",
} as const;

export const bumbleValidation = {
  eyebrow: "04 · Validation",
  displayLine: "Fully automated scheduling felt invasive and reduced user control",
  body: "My initial concept fully automated same-day scheduling through calendar syncing. Testing showed that efficiency came at the cost of control — users felt overexposed, and real-time availability made interactions feel monitored rather than natural.",
  stats: [
    { value: "3", label: "Critical usability themes surfaced from concept testing" },
    { value: "1", label: "Pivot: from calendar gaps to intent-first coordination" },
  ],
  issueModules: [
    {
      n: "01",
      title: "High-friction premium entry",
      bullets: [
        "Forcing full calendar sync as the only premium entry point created a friction-heavy conversion path.",
        "The value proposition relied on high-friction data access, weakening the business upsell.",
      ],
      quote:
        "Wait, if I don’t sync my Google Calendar, this whole feature just… doesn’t work for me? That feels like a huge ask before I even know if the matches are good.",
    },
    {
      n: "02",
      title: "Calendar logic over human readiness",
      bullets: [
        "Automatic switches from Focus Mode to “Available” based on calendar gaps failed to account for non-booked downtime.",
        "The system prioritized schedule holes over how people actually experience free time.",
      ],
      quote:
        "An empty calendar block doesn’t mean I’m emotionally ‘on’ for a date — it just means nothing was booked.",
    },
    {
      n: "03",
      title: "Real-time status and safety",
      bullets: [
        'Identifying users as “Available now” and “Nearby” removed social alibi, creating risk for unwanted confrontation.',
        "Real-time status broadcasting created safety vulnerabilities and social entitlement.",
      ],
      quote:
        "Broadcasting availability feels less like support and more like being watched — I need room to say no without drama.",
    },
  ],
  synthesis:
    "The feedback converged on a single design principle: coordination should amplify mutual intent before it ever surfaces time — and premium value should not require surrendering privacy up front.",
} as const;

export const bumbleSolution = {
  eyebrow: "05 · Solution",
  displayLine: ['Moving from “who is nearby” to “who is ready”'],
  intro:
    "Bumble Flow transforms matching from a passive browsing experience into an active coordination engine. By prioritizing shared intent and real-time availability, the system removes the “scheduling labor” that often causes matches to stall, creating a clear, low-friction path from conversation to a confirmed plan.",
  pillars: [
    {
      kicker: "Intent-first meeting vibes",
      body: "Users select a preferred meetup type — like coffee or drinks — so both parties align on expectations before messaging begins.",
      accent: "green" as const,
    },
    {
      kicker: "Smart mutual availability",
      body: "The system reconciles calendar data to surface overlapping free blocks in chat, so users can suggest or accept times in a single tap.",
      accent: "orange" as const,
    },
    {
      kicker: "Tiered coordination intelligence",
      body: "Premium users get full calendar automation and precision; free users are nudged toward coordination with general time-of-day suggestions.",
      accent: "blue" as const,
    },
  ],
  modules: [
    {
      n: "01",
      title: "Defining availability and intent signals",
      body: "Users input when they’re available and what they’re looking for — combining manual controls, calendar sync, and preference signals to shape matches and time suggestions.",
    },
    {
      n: "02",
      title: "Coordinating the right time to meet",
      body: "Shared availability surfaces across chat, calendar, and list views — helping users compare options quickly, select a time, and move from conversation to a confirmed plan.",
    },
    {
      n: "03",
      title: "Turning plans into confirmed meetups",
      body: "Users move from selecting a time to committing to a plan — proposing, confirming, and managing meetups while keeping availability flexible for future coordination.",
    },
  ],
} as const;

export const bumbleScenarios = {
  eyebrow: "06 · Scenarios",
  title: "User experience scenarios",
  lead: "Three relationship tiers show how the coordination engine behaves at different levels of data access and subscription:",
  tiers: [
    {
      id: "pp",
      label: "Premium × Premium",
      body: "Highest mutual signal fidelity — precise windows, automation, and the fastest path to a confirmed plan.",
    },
    {
      id: "pf",
      label: "Premium × Free",
      body: "Blended coordination: one side brings precision while the other receives guided suggestions without full data exposure.",
    },
    {
      id: "ff",
      label: "Free × Free",
      body: "Lightweight coordination nudges and generalized availability — still useful, with a clear upgrade path when both users want more automation.",
    },
  ],
} as const;

export const bumbleCoreComponents = {
  eyebrow: "07 · Core components",
  title: "Design system",
  body: "The Bumble Flow design system ensures consistency and efficiency through components, guidelines, and patterns — so flows for availability, chat coordination, and subscription surfaces stay coherent as edge cases multiply.",
} as const;

export const bumblePrototype = {
  eyebrow: "08 · Prototype",
  title: "Building Bumble Flow with vibe coding",
  lead: [
    "Using Codex, I vibe coded an interactive prototype by translating high-fidelity wireframes and the design system into a working flow — letting users define availability, signal intent, and explore how the system surfaces overlapping or alternative meeting times in real time.",
    "I connected my Figma file — where the design system and high-fidelity wireframes lived — into Codex, then iterated with handoff-style instructions. I combined structured prompts, screenshots of specific UI states, and MCP links to guide layout, interaction logic, and edge cases — treating the system like a design partner rather than a one-shot generator.",
  ],
} as const;

export const bumbleReflection = {
  eyebrow: "09 · Reflection",
  title: "Reframing the issue: coordination, systems thinking, and real-world outcomes",
  intro: [
    "This project pushed me to balance user empathy with business goals in a more intentional way. By reframing the problem from proximity to coordination, I could address real user pain — like the awkward gap in scheduling — while creating a clearer path for premium value.",
    "Designing for Premium vs Free users and mismatched availability forced systems thinking: every state needed to feel intentional and safe, not like a leaky broadcast of personal data.",
    "On the execution side, I shifted from one-shot prompting to a collaborative workflow with AI — Figma as source of truth, with detailed instructions, screenshots, and checkpoints to guide output like working with a teammate.",
  ],
} as const;

export const bumbleToc = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "research", label: "Research" },
  { id: "strategy", label: "Strategy" },
  { id: "validation", label: "Validation" },
  { id: "solution", label: "Solution" },
  { id: "scenarios", label: "Scenarios" },
  { id: "core-components", label: "Core components" },
  { id: "prototype", label: "Prototype" },
  { id: "reflection", label: "Reflection" },
] as const;

export const bumbleNextProject = {
  eyebrow: "Next project",
  title: "Trippy",
  description:
    "An intelligent travel planning app — AI-powered itineraries, vibe-based discovery, and local community in one place.",
  href: "/trippy-case-study",
  imageSrc: "/images/trippyportfoliothumbnail.png",
  imageAlt: "Trippy portfolio preview",
  metaLeft: "Lead product design · Mobile",
  metaYear: "2024 – 2026",
} as const;
