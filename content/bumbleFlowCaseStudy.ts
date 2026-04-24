import bumbleDesignSystem from "@/assets/bumbleflow/BumbleFlow_DesignSystem.png";
import bumbleDiscoverAnnotations from "@/assets/bumbleflow/BumbleFlow_DiscoverAnnotations.png";
import bumbleOverlappingTimesAnnotations from "@/assets/bumbleflow/BumbleFlow_OverlappingTimesAnnotations.png";
import bumbleSetUpTimeAnnotations from "@/assets/bumbleflow/BumbleFlow_SetUpTimeAnnotations.png";

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
  engagementWasPct: 18,
  engagementNowLabel: "Today",
  engagementNowValue: "6%",
  engagementNowPct: 6,
  /** Upper bound for the chart axis (comparison scale). */
  engagementScaleMax: 20,
  engagementDeltaLabel: "−12 pts",
  engagementDeltaSub: "Engagement vs six months prior",
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
  /** Design-shift block: strategic read + `NewBeforeAfterPicture.png` in `BumbleBridgeShiftVisual`. */
  bridgeDesignShift: {
    tag: "Design shift",
    headlineLead: "I moved location out of the UI and into ",
    headlineAccent: "system logic",
    /** `public/assets/bumbleflow/NewBeforeAfterPicture.png` — keep in sync with source in `assets/bumbleflow/`. */
    newBeforeAfterWidth: 1535,
    newBeforeAfterHeight: 631,
    newBeforeAfterAlt:
      "Before and after: proximity-led notification versus multi-signal decision flow and output.",
  },
  hmwEyebrow: "HMW question",
  hmw: "How might we help users recognize moments of shared readiness — moving beyond proximity to enable real meetups?",
} as const;

export const bumbleStrategy = {
  eyebrow: "04 · Strategy",
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
  eyebrow: "03 · Validation",
  displayLine: "Fully automated scheduling felt invasive and reduced user control",
  body: "My initial concept fully automated same-day scheduling through calendar syncing. Testing showed that efficiency came at the cost of control — users felt overexposed, and real-time availability made interactions feel monitored rather than natural.",
  issuesIntro: "From testing, three key issues emerged:",
  initialConceptWidth: 1536,
  initialConceptHeight: 1024,
  initialConceptAlt:
    "Initial Bumble Flow concept: automated same-day scheduling and calendar-led coordination before validation.",
  issueModules: [
    {
      n: "01",
      title: "High-friction premium entry",
      bullets: [
        "Full calendar sync as the only entry point created early drop-off",
        "Value depended on too much upfront user effort",
      ],
      quote:
        "Wait, if I don’t sync my Google Calendar, this whole feature doesn’t work for me? That feels like a huge ask before I even know if the matches are good.",
    },
    {
      n: "02",
      title: "Calendar logic ≠ human readiness",
      bullets: [
        "Empty time ≠ emotional availability",
        "System optimized for schedule gaps, not real-life energy",
      ],
      quote:
        "Just because I’m not in a meeting at 5 PM doesn’t mean I’m available. Sometimes I just need time to decompress before talking to anyone.",
    },
    {
      n: "03",
      title: "Real-time status breaks safety",
      bullets: [
        "“Available now” + “Nearby” removed social cover",
        "Created pressure and unwanted confrontation",
      ],
      quote:
        "If someone thinks I’m free and nearby, it can lead to pushy ‘why can’t you meet?’ messages. I need the ability to say I’m busy without the app calling me a liar.",
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
      image: {
        src: bumbleDiscoverAnnotations,
        alt: "Annotated Discover screens showing intent before availability, flexible availability options, manual gap filling, and preferred times.",
      },
    },
    {
      n: "02",
      title: "Coordinating the right time to meet",
      body: "Shared availability surfaces across chat, calendar, and list views — helping users compare options quickly, select a time, and move from conversation to a confirmed plan.",
      image: {
        src: bumbleOverlappingTimesAnnotations,
        alt: "Annotated screens showing calendar view of overlapping times, suggested times in chat, and mutual availability list view.",
      },
    },
    {
      n: "03",
      title: "Turning plans into confirmed meetups",
      body: "Users move from selecting a time to committing to a plan — proposing, confirming, and managing meetups while keeping availability flexible for future coordination.",
      image: {
        src: bumbleSetUpTimeAnnotations,
        alt: "Annotated screens showing proposing a time in chat, locking in the plan with venue details, and confirmed meetups appearing in Bumble Flow.",
      },
    },
  ],
} as const;

const BUMBLE_FLOW_PROTOTYPE_URL = "https://hanaranam.github.io/BumbleFlowCMU/" as const;

/** Prototype section: structured intro, methods, pipeline, then tabbed scenarios (profiles + phones). */
export const bumblePrototypeInteractive = {
  eyebrow: "06 · Prototype",
  title: "From Figma to code, and back again",
  /** Short lead under the section title (method cards carry the detail). */
  introLead: [
    "To bring Bumble Flow to life, I worked across two modes of prototyping. I used each one where it made the most sense.",
  ],
  /** Two-column “how I built it” summary above the pipeline. */
  prototypeMethods: [
    {
      methodLabel: "Method 01 · Vibe coded",
      title: "Premium × Premium",
      body: "I vibe coded a fully interactive prototype in Codex—translating high-fidelity wireframes and the design system into working flow, and treating the tool like a design partner so I could show real system behavior static screens couldn’t.",
      tag: "Working code · live logic",
    },
    {
      methodLabel: "Method 02 · Figma",
      title: "Premium × Free & Free × Free",
      body: "For the other scenarios, I used high-fidelity Figma prototypes to show how the experience shifts when one or both users haven’t unlocked the full feature set—so the range of the design stayed clear without shipping three codebases.",
      tag: "High-fidelity · full range",
    },
  ],
  /** Small caps label above scenario tabs (same tone as pipeline eyebrow). */
  scenariosEyebrow: "The different use case scenarios",
  vibeCoding: {
    eyebrow: "The vibe coding pipeline",
    intro: [
      "I connected my Figma file into Codex, where my design system and high-fidelity wireframes lived. I iterated with handoff-style instructions—structured prompts, screenshots of specific UI states, and MCP links—to guide layout, interaction logic, and edge cases.",
      "The diagram below shows the full pipeline, from requirements to vibe coding.",
    ],
    diagramAriaLabel:
      "Pipeline from three requirement inputs to PRD prompt, product requirements document, and vibe coding.",
    prdBullets: ["Goals", "Purpose", "Features", "Functionality", "Measures"] as const,
  },
  prototypeEmbedUrl: BUMBLE_FLOW_PROTOTYPE_URL,
  /** Design size for scaled iframe embeds (CSS transform). */
  prototypeDesignWidth: 375,
  prototypeDesignHeight: 812,
  prototypeScenarios: [
    {
      id: "premium-premium",
      tabLabel: "Premium × Premium",
      title: "Full coordination, minimal friction",
      description: [
        "Both users have synced their calendars and set meeting vibes. The system surfaces real overlap and suggests times directly in chat.",
      ],
      outcomeLead: "What users see:",
      outcomeBody:
        "Clear overlap in time and intent · Multiple viable meeting options surfaced · “Look at more times” reveals full week availability",
      userA: {
        initial: "A",
        name: "Alex",
        badge: "★ Premium",
        lines: ["📅 Calendar synced", "☕ Coffee · 🥂 Drinks", "Free: Mon, Thu, Fri"],
      },
      userB: {
        initial: "L",
        name: "Lindsey",
        badge: "★ Premium",
        lines: ["📅 Calendar synced", "☕ Coffee · 🥂 Drinks", "Free: Tue, Wed, Sat"],
      },
      phoneLeft: {
        viewerLabel: "Alex's view",
        iframeSrc: BUMBLE_FLOW_PROTOTYPE_URL,
      },
      phoneRight: {
        viewerLabel: "Lindsey's view",
        iframeSrc: BUMBLE_FLOW_PROTOTYPE_URL,
      },
    },
    {
      id: "premium-premium-partial",
      tabLabel: "Premium × Free",
      title: "One-sided readiness",
      description: [
        "Jennifer is Premium with a synced calendar; John is on Free. The system can only partially coordinate — it surfaces Jennifer’s availability and prompts John to sync or upgrade when he’s ready.",
      ],
      outcomeLead: "What users see:",
      outcomeBody:
        "One-sided availability shown · Prompt to sync calendar · System waits before suggesting times",
      userA: {
        initial: "Je",
        name: "Jennifer",
        badge: "★ Premium",
        lines: ["📅 Calendar synced", "☕ Coffee · 🥂 Drinks", "Free: Mon, Thu, Fri"],
      },
      userB: {
        initial: "Jo",
        name: "John",
        badge: "Free",
        lines: ["📅 No calendar", "🍽️ Dinner · ☕ Coffee", "No availability set"],
      },
      phoneLeft: {
        viewerLabel: "Jennifer's view",
        iframeSrc: BUMBLE_FLOW_PROTOTYPE_URL,
      },
      phoneRight: {
        viewerLabel: "John's view",
        iframeSrc: null,
        placeholderTitle: "Prototype coming soon",
        placeholderHint: "Add John’s prototype link here",
      },
    },
    {
      id: "free-free",
      tabLabel: "Free × Free",
      title: "Vibe only — no coordination",
      description: [
        "Neither user has unlocked Intent Planner. The system matches on vibe alone with no schedule data, surfacing the upgrade prompt as the natural next step.",
      ],
      outcomeLead: "What users see:",
      outcomeBody:
        "Vibe match only · No time overlap · Upgrade prompt to unlock Flow",
      userA: {
        initial: "M",
        name: "Maya",
        badge: "Free",
        lines: ["📅 No calendar", "☕ Coffee", "No availability set"],
      },
      userB: {
        initial: "R",
        name: "Ryan",
        badge: "Free",
        lines: ["📅 No calendar", "🥂 Drinks", "No availability set"],
      },
      phoneLeft: {
        viewerLabel: "Maya's view",
        iframeSrc: null,
        placeholderTitle: "Add Free user prototype",
        placeholderHint: "Paste Maya's prototype link here",
      },
      phoneRight: {
        viewerLabel: "Ryan's view",
        iframeSrc: null,
        placeholderTitle: "Add Free user prototype",
        placeholderHint: "Paste Ryan's prototype link here",
      },
    },
  ],
} as const;

export type BumblePrototypeScenarioId =
  (typeof bumblePrototypeInteractive.prototypeScenarios)[number]["id"];

export const bumbleCoreComponents = {
  eyebrow: "07 · Decisions",
  title: "Design system",
  body: "The Bumble Flow design system ensures consistency and efficiency through components, guidelines, and patterns — so flows for availability, chat coordination, and subscription surfaces stay coherent as edge cases multiply.",
  image: {
    src: bumbleDesignSystem,
    alt: "Bumble Flow design system overview: cards, list items, tags, nav bar, microinteractions, icons, keyboards, buttons, and miscellaneous components.",
  },
} as const;

export const bumbleReflection = {
  eyebrow: "08 · Reflection",
  title:
    "Reframing the Issue: Designing for Coordination, Systems Thinking, and Real-World Outcomes",
  intro: [
    "This project pushed me to balance user empathy with business goals more intentionally. By reframing the problem from proximity to coordination, I addressed real user pain — like the awkward gap in scheduling — while creating a clearer path for premium value.",
  ],
  takeaways: [
    {
      n: "01",
      title: "Reframe to unlock value",
      body: "Shifting from proximity to coordination uncovered a more meaningful problem. Focusing on scheduling friction improved the experience and created a clear path for premium features.",
    },
    {
      n: "02",
      title: "Design systems, not screens",
      body: "Designing for Premium and Free users, along with mismatched availability, required systems thinking. Each state needed to feel intentional, cohesive, and clearly distinct.",
    },
    {
      n: "03",
      title: "Privacy is part of the UX",
      body: "Availability is sensitive. Interactions were designed to feel safe and controlled, without exposing or broadcasting personal data.",
    },
    {
      n: "04",
      title: "AI is a collaborator, not a shortcut",
      body: "I moved from one-shot prompting to a structured, iterative workflow with AI. I used Figma as the source of truth and guided outputs with clear instructions, screenshots, and checkpoints, similar to working with a teammate.",
    },
  ],
} as const;

export const bumbleToc = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "research", label: "Research" },
  { id: "validation", label: "Validation" },
  { id: "strategy", label: "Strategy" },
  { id: "solution", label: "Solution" },
  { id: "prototype", label: "Prototype" },
  { id: "decisions", label: "Decisions" },
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
