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
    "Redesigning dating from passive matching to active coordination — turning matches into real plans through shared intent and availability.",
  heroMeta: [
    {
      label: "Role",
      value: "Lead Product Designer · Design Engineer",
    },
    {
      label: "Platform",
      value: "iOS, Android, Desktop, Watch",
    },
    {
      label: "Timeline",
      value: "4 weeks",
    },
    {
      label: "Tools",
      value: "Codex CLI (vibe coding) · Next.js · React · Figma",
    },
  ],
  overviewEyebrow: "00 · OVERVIEW",
  displayThesis: [
    "Designing for readiness,",
    "not just proximity.",
  ],
  introColumns: [
    "This project began with a speculative brief inspired by the Bumble Customer Acquisition Team, given as part of a course project. The initial mandate was transactional: leverage precise location data and timely notifications to convert non-paying users into subscribers.",
    "I reframed the opportunity around coordination — moving location out of the UI and into system logic — so premium value is tied to mutual readiness and lower-friction scheduling, not “nearby” alone.",
  ],
} as const;

export const bumbleChallenge = {
  eyebrow: "01 · CHALLENGE",
  title: "The original design brief",
  lead: [
    "The original mandate paired a clear business goal with a proximity-led hypothesis. It assumed nearby would motivate real-world meetups, before anyone checked if that was true.",
  ],
  mandateLabel: "The original mandate",
  mandateBlocks: [
    {
      kicker: "The goal",
      bullets: [
        "Increase conversion among non-paying users — 90% of whom are under 35.",
      ],
    },
    {
      kicker: "The hypothesis",
      bullets: [
        'Users would convert to paid subscribers if they were notified of matches within 0.5km via “timely notifications”.',
      ],
    },
    {
      kicker: "The tech",
      bullets: [
        "Use precise location services to alert users on mobile, desktop, and watch.",
      ],
    },
  ],
} as const;

export const bumbleResearch = {
  eyebrow: "02 · Research",
  title:
    "Proximity without intent is not a date. It is a notification users learned to ignore.",
  lead: [
    "While the brief focused on proximity, the data told a different story — engagement with proximity alerts fell from 18% to 6% in six months, suggesting “nearby” wasn’t enough to motivate users.",
  ],
  engagementCaption: "Engagement with proximity alerts",
  engagementWasLabel: "Six months ago",
  engagementWasValue: "18%",
  engagementWasPct: 18,
  engagementNowLabel: "Today",
  engagementNowValue: "6%",
  engagementNowPct: 6,
  /** Upper bound for the chart axis (comparison scale). */
  engagementScaleMax: 20,
  engagementDeltaLabel: "−12 pts",
  engagementDeltaEyebrow: "Net change",
  engagementDeltaBody:
    "in six months. Whatever nearby promised, it stopped delivering.",
  whyEyebrow: "The why behind the drop",
  whyBody:
    "To understand the gap, I synthesized themes from public dating subreddits and community forums. Three patterns kept showing up.",
  themeCards: [
    {
      pill: "Frustration",
      title: "Misleading proximity",
      body: "People shown as nearby are often not actually local or available. The map lies a little. Time wasted compounds into churn.",
    },
    {
      pill: "Drop-off",
      title: "The awkward gap",
      body: "Users like each other, then stall on the manual work of scheduling. The interesting part of dating is delegated to the user.",
    },
    {
      pill: "Mental model",
      title: "Distance of readiness",
      body: "Half a kilometer apart is geography. It says nothing about whether someone has the energy, time, or interest to meet.",
    },
  ],
  bridgeEyebrow: "Strategic read",
  bridgeHeadlineLead: "I moved location out of the UI and into ",
  bridgeHeadlineAccent: "system logic",
  bridgeBody:
    "Proximity becomes one signal among many, not the headline. The headline becomes coordination, the part of dating people actually struggle with.",
  /** Strategic read + `NewBeforeAfterPicture.png` in `BumbleBridgeShiftVisual`. */
  bridgeDesignShift: {
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
  summary:
    "I pivoted from a system that found gaps in a calendar to one that aligns shared intent before surfacing availability.",
  fromLabel: "FROM — CALENDAR-FIRST AUTOMATION",
  toLabel: "TO — INTENT-FIRST COORDINATION",
  rows: [
    {
      from: {
        title: "Calendar gaps",
        body: "Assumes an empty slot equals social readiness.",
      },
      to: {
        title: "Intent-based",
        body: "Users explicitly opt in to specific time windows.",
      },
    },
    {
      from: {
        title: "All-or-nothing",
        body: "Requires full calendar sync to unlock value.",
      },
      to: {
        title: "Flexible entry",
        body: "Manual input or privacy-first sync — your choice.",
      },
    },
    {
      from: {
        title: "Exposed",
        body: "“Available now” markers remove the ability to decline discreetly.",
      },
      to: {
        title: "Protected",
        body: "Matches suggested without broadcasting real-time status.",
      },
    },
    {
      from: {
        title: "Feature-locked",
        body: "Value hidden behind a high-friction data request.",
      },
      to: {
        title: "Incentivized",
        body: "“Suggested Windows” for all; Premium automates them.",
      },
    },
  ],
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
  eyebrow: "06 · SYSTEM",
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
  eyebrow: "05 · SOLUTION",
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
        lines: [
          "📅 Calendar: synced",
          "👥 Preferred meeting vibe: ☕ Coffee · 🥂 Drinks",
        ],
      },
      userB: {
        initial: "L",
        name: "Lindsey",
        badge: "★ Premium",
        lines: [
          "📅 Calendar: synced",
          "👥 Preferred meeting vibe: ☕ Coffee · 🥂 Drinks",
        ],
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
        lines: [
          "📅 Calendar: synced",
          "👥 Preferred meeting vibe: ☕ Coffee · 🥂 Drinks",
        ],
      },
      userB: {
        initial: "Jo",
        name: "John",
        badge: "Free",
        lines: [
          "📅 Calendar: not synced",
          "👥 Preferred meeting vibe: 🍽️ Dinner · ☕ Coffee",
        ],
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
        lines: [
          "📅 Calendar: not synced",
          "👥 Preferred meeting vibe: ☕ Coffee",
        ],
      },
      userB: {
        initial: "R",
        name: "Ryan",
        badge: "Free",
        lines: [
          "📅 Calendar: not synced",
          "👥 Preferred meeting vibe: 🥂 Drinks",
        ],
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

/**
 * Premium × Premium scroll-driven walkthrough (Kevin × Lindsey).
 *
 * Each step seeks the two screen recordings to the exact moment that backs the
 * narrative on the right. Lindsey's phone only appears once they're matched
 * (step 5), so her video time is `null` for the solo Kevin steps.
 *
 * Video files live under `/public/assets/bumbleflow/` (already in the repo):
 *   - BumbleFlow_Kevin.mov   (Kevin's POV — full ~2:30 recording)
 *   - BumbleFlow_Lindsey.mov (Lindsey's POV — chat onward)
 *
 * Time stamps reflect Kevin's recording timeline. Lindsey's offsets are
 * approximate — tweak `lindseyTime` directly here as the recording firms up.
 */
/** Prototype section shell: tabs + walkthrough (Premium × Premium) + vibe coding pipeline. */
export const bumblePrototypeSection = {
  eyebrow: "05 · SOLUTION",
  title: "A step by step walkthrough",
  tabs: [
    { id: "premium-premium" as const, tabLabel: "Premium × Premium" },
    { id: "premium-premium-partial" as const, tabLabel: "Premium × Free" },
    { id: "free-free" as const, tabLabel: "Free × Free" },
  ],
  premiumPremium: {
    title: "Full coordination, minimal friction",
    description:
      "Both users have synced calendars and set meeting vibes, so the system surfaces real overlap and suggests times directly in chat. Kevin's view is on the left, Lindsey's on the right — scroll to advance the timeline.",
  },
} as const;

export type BumblePrototypeTabId = (typeof bumblePrototypeSection.tabs)[number]["id"];

export const bumblePrototypeDualPhone = {
  /** Single-file relative paths under /public — must exist on disk. */
  kevinVideoSrc: "/assets/bumbleflow/BumbleFlow_Kevin.mov",
  lindseyVideoSrc: "/assets/bumbleflow/BumbleFlow_Lindsey_New.mov",
  kevinPosterLabel: "Kevin",
  lindseyPosterLabel: "Lindsey",
  scrollHint: "Scroll to continue",
  /**
   * Chat-suggestion sync (step 5).
   *   - Kevin's video freezes at `kevinPauseAtTime` so it doesn't show the
   *     "Lindsey sent a new suggestion" message before she actually sends.
   *   - Once Lindsey's video reaches `lindseyResumeKevinAt` (her tap-Send
   *     moment), Kevin resumes. If `kevinResumeAtTime` is set, Kevin seeks
   *     to that frame on resume so his "Lindsey sent" message lines up with
   *     Lindsey's own "You sent" bubble at the same wall-clock instant.
   * Fine-tune by scrubbing each recording to the exact frame.
   */
  kevinPauseAtTime: 112,
  lindseyResumeKevinAt: 19,
  kevinResumeAtTime: 118 as number | null,
  /**
   * Each step exposes:
   *   - `kevinTime` — where to seek Kevin's recording when this step becomes active
   *   - `lindseyShowAtKevinTime` — Lindsey's phone fades in once Kevin's video
   *     reaches this absolute time (in seconds). `null` keeps her hidden.
   *     Lindsey's own recording is only ~20s long and begins with the
   *     "received suggestion" state, so we defer her appearance until Kevin
   *     has actually sent the suggestion (~110s into Kevin's recording).
   *   When Lindsey first appears she starts at t=0 and plays through naturally
   *   (no per-step seek — her short recording stays in sync that way).
   */
  steps: [
    {
      id: "free-preview",
      label: "Step 1",
      title: "Limited preview — see what Premium unlocks",
      body:
        "Kevin starts on Free. He can browse and tap into profiles, but availability and meeting-vibe context are gated — the system signals what unlocks at Premium without forcing the upgrade.",
      kevinTime: 0,
      lindseyShowAtKevinTime: null as number | null,
    },
    {
      id: "premium-unlock",
      label: "Step 2",
      title: "Full profile context — and a place to declare intent",
      body:
        "After upgrading, Kevin sees the full profile: photos, availability days, and meeting vibe. If he's not ready to connect a calendar, he can manually mark the days he's free and the meeting vibe he prefers — no sync required.",
      kevinTime: 20,
      lindseyShowAtKevinTime: null as number | null,
    },
    {
      id: "calendar-connect",
      label: "Step 3",
      title: "Connect Google Calendar when you're ready",
      body:
        "Once he feels comfortable, Kevin connects his Google Calendar. Sync is opt-in and revocable — privacy stays with the user, not the system.",
      kevinTime: 39,
      lindseyShowAtKevinTime: null as number | null,
    },
    {
      id: "curate-availability",
      label: "Step 4",
      title: "Add, remove, and star times that fit",
      body:
        "Kevin can add or remove time blocks beyond what his calendar imported, and star the ones he's generally free. Starred slots feed the recommender — so even when two calendars don't perfectly overlap, the system still suggests times that work for both.",
      kevinTime: 45,
      lindseyShowAtKevinTime: null as number | null,
    },
    {
      id: "chat-coordinate",
      label: "Step 5",
      title: "Overlap surfaced in chat — propose, accept, or counter",
      body:
        "Once matched, both phones drop into the chat. The system surfaces the times Kevin and Lindsey overlap today, with the option to expand the full week in calendar or list view. One side suggests; the other accepts or counters with a new time.",
      kevinTime: 77,
      // Lindsey enters the moment Kevin sends his first suggestion (matches kevinPauseAtTime).
      lindseyShowAtKevinTime: 112 as number | null,
    },
    {
      id: "plan-confirmed",
      label: "Step 6",
      title: "A venue, a calendar invite, a real plan",
      body:
        "When a time is confirmed, the system recommends a venue based on both vibes and the time of day. The meetup drops into Bumble Flow's calendar automatically — and Kevin can mirror it back to Google Calendar if he wants.",
      kevinTime: 124,
      // Lindsey's recording ends with the new suggestion sent; she stays hidden in step 6.
      lindseyShowAtKevinTime: null as number | null,
    },
  ],
} as const;

export type BumblePrototypeDualPhoneStepId =
  (typeof bumblePrototypeDualPhone.steps)[number]["id"];

/**
 * Premium × Free dual-phone walkthrough (John on Free × Jennifer on Premium).
 *
 * Scroll-driven like Premium × Premium: the scroll-pin advances one step per
 * wheel gesture, and each step plays one video segment then pauses at its
 * boundary so the phone stays in sync with the on-screen narrative.
 *
 * Per step:
 *   - `johnTime` / `johnPlay` / `johnPauseAt` — where John seeks on entry,
 *     whether he plays, and the time he pauses at (segment boundary).
 *   - `jenniferVisible` / `jenniferTime` / `jenniferPlay` / `jenniferPauseAt`
 *     — same for Jennifer, plus whether her phone is shown.
 *
 * Choreography: John plays steps 1–3 (and pauses at 34 after he sends his
 * message), Jennifer takes over for steps 4–5, then on the final step John
 * resumes from 34 to "receive" her time and both play to the end.
 */
export const bumblePremiumFreeDualPhone = {
  johnVideoSrc: "/assets/bumbleflow/BumbleFlow_PremiumxFree(John).mov",
  jenniferVideoSrc: "/assets/bumbleflow/BumbleFlow_Premium(Jennifer)xFree.mov",
  johnLabel: "John (Free)",
  jenniferLabel: "Jennifer (Premium)",
  scrollHint: "Scroll to continue",
  title: "Protected availability, guided coordination",
  description:
    "With only one synced calendar, the system helps both users coordinate while keeping availability private. John (Free) is on the left, Jennifer (Premium) on the right. John suggests broad time windows, while Jennifer sees specific options based on her schedule. Scroll to advance the timeline.",
  steps: [
    {
      id: "discovering-match",
      label: "Step 1",
      title: "Discovering a Match",
      body: "John is on the free plan. While browsing the Sunset Summary, he notices Jennifer has an availability badge on her profile, signaling that she uses Premium. He sends a like, she matches back, and they enter the chat with different levels of access to the platform.",
      johnTime: 0,
      johnPlay: true,
      johnPauseAt: 21 as number | null,
      jenniferVisible: false,
      jenniferTime: 0,
      jenniferPlay: false,
      jenniferPauseAt: null as number | null,
    },
    {
      id: "nudge-premium",
      label: "Step 2",
      title: "A Nudge Toward Premium",
      body: "In chat, John sees a hint that there may be a good time to meet based on Jennifer’s availability. He can’t see her calendar or exact free windows, but when he taps “Explore More Suggestions,” he’s prompted to upgrade for more scheduling control.",
      johnTime: 21,
      johnPlay: true,
      johnPauseAt: 30 as number | null,
      jenniferVisible: false,
      jenniferTime: 0,
      jenniferPlay: false,
      jenniferPauseAt: null as number | null,
    },
    {
      id: "flexible-suggestion",
      label: "Step 3",
      title: "Sending a Flexible Suggestion",
      body: "Without access to scheduling tools, John sends a simple preference: “Afternoon.” It gives Jennifer a starting point while leaving room for her to suggest something more specific.",
      johnTime: 30,
      johnPlay: true,
      johnPauseAt: 33 as number | null,
      jenniferVisible: false,
      jenniferTime: 0,
      jenniferPlay: false,
      jenniferPauseAt: null as number | null,
    },
    {
      id: "premium-coordination",
      label: "Step 4",
      title: "Premium Unlocks Better Coordination",
      body: "Jennifer sees John’s like, reviews his profile, and matches back. Because her calendar is connected, the system identifies an available time window and suggests a meeting time she can send with a tap. If the recommendation doesn’t work for her, she can browse her available calendar slots and choose a different time instead.",
      johnTime: 33,
      johnPlay: false,
      johnPauseAt: null as number | null,
      jenniferVisible: true,
      jenniferTime: 0,
      jenniferPlay: true,
      jenniferPauseAt: 10 as number | null,
    },
    {
      id: "choosing-time",
      label: "Step 5",
      title: "Choosing a Specific Time",
      body: "Jennifer opens her scheduling options and selects a time that works for her. The system helps her quickly turn a general interest into a concrete plan.",
      johnTime: 33,
      johnPlay: false,
      johnPauseAt: null as number | null,
      jenniferVisible: true,
      jenniferTime: 10,
      jenniferPlay: true,
      jenniferPauseAt: 17 as number | null,
    },
    {
      id: "clear-boundaries",
      label: "Step 6",
      title: "Clear Boundaries Between Free and Premium",
      body: "John receives Jennifer’s proposed time and can accept it or continue the conversation. He can see the meeting suggestion, but not Jennifer’s full availability. This keeps scheduling easy while preserving the value of Premium access.",
      johnTime: 33,
      johnPlay: true,
      johnPauseAt: null as number | null,
      jenniferVisible: true,
      jenniferTime: 17,
      jenniferPlay: true,
      jenniferPauseAt: null as number | null,
    },
  ],
} as const;

export type BumblePremiumFreeStepId =
  (typeof bumblePremiumFreeDualPhone.steps)[number]["id"];

/**
 * Free × Free dual-phone walkthrough (John on Free × Jennifer on Free).
 *
 * Scroll-driven like the other two tabs, but here the phones hand off rather
 * than coexist: John (left) plays steps 1–3 alone, his recording disappears,
 * then Jennifer (right) plays steps 4–5 alone.
 *
 * Per step (same shape as Premium × Free, plus `johnVisible` so John's phone
 * can be hidden once the focus moves to Jennifer):
 *   - `johnVisible` / `johnTime` / `johnPlay` / `johnPauseAt`
 *   - `jenniferVisible` / `jenniferTime` / `jenniferPlay` / `jenniferPauseAt`
 */
export const bumbleFreeFreeDualPhone = {
  johnVideoSrc: "/assets/bumbleflow/BumbleFlow_FreexFree(John).mov",
  jenniferVideoSrc: "/assets/bumbleflow/BumbleFlow_FreexFree(Jennifer).mov",
  johnLabel: "John (Free)",
  jenniferLabel: "Jennifer (Free)",
  scrollHint: "Scroll to continue",
  title: "Intent-based coordination, user-led planning",
  description:
    "Neither user has a synced calendar, so coordination relies on shared interests and simple time preferences. John (Free) is on the left, Jennifer (Free) is on the right. The system helps them express intent, but confirming a time still requires conversation. Scroll to advance the timeline.",
  steps: [
    {
      id: "discovering-match",
      label: "Step 1",
      title: "Discovering a Match",
      body: "John is on the free plan and has selected Coffee and Drinks as his preferred meeting vibes. While browsing Discover, he finds Jennifer and sends a like. She likes him back, and they match.",
      johnVisible: true,
      johnTime: 0,
      johnPlay: true,
      johnPauseAt: 8 as number | null,
      jenniferVisible: false,
      jenniferTime: 0,
      jenniferPlay: false,
      jenniferPauseAt: null as number | null,
    },
    {
      id: "suggesting-time",
      label: "Step 2",
      title: "Suggesting a Time",
      body: "When John enters the chat, the system notices that both users selected Coffee and suggests broad meeting windows like Morning or Afternoon. Without calendar data, it can only recommend general times. If John taps “Explore More Suggestions,” he encounters an upgrade prompt, reinforcing that calendar syncing, specific time slots, and smarter coordination are Premium features.",
      johnVisible: true,
      johnTime: 8,
      johnPlay: true,
      johnPauseAt: 18 as number | null,
      jenniferVisible: false,
      jenniferTime: 0,
      jenniferPlay: false,
      jenniferPauseAt: null as number | null,
    },
    {
      id: "sending-intent",
      label: "Step 3",
      title: "Sending Intent",
      body: "John selects Afternoon and sends it to Jennifer. Rather than locking in a meeting, the suggestion communicates interest and provides a starting point for coordination.",
      johnVisible: true,
      johnTime: 19,
      johnPlay: true,
      johnPauseAt: null as number | null,
      jenniferVisible: false,
      jenniferTime: 0,
      jenniferPlay: false,
      jenniferPauseAt: null as number | null,
    },
    {
      id: "matching-without-premium",
      label: "Step 4",
      title: "Matching Without Premium",
      body: "Jennifer doesn’t receive a notification that John liked her because that visibility feature is reserved for Premium users. When she visits the Liked You section herself, she notices John’s profile and coffee vibe tag, likes him back, and they match.",
      johnVisible: false,
      johnTime: 19,
      johnPlay: false,
      johnPauseAt: null as number | null,
      jenniferVisible: true,
      jenniferTime: 0,
      jenniferPlay: true,
      jenniferPauseAt: 10 as number | null,
    },
    {
      id: "continuing-conversation",
      label: "Step 5",
      title: "Continuing the Conversation",
      body: "When Jennifer enters the chat, she sees that John suggested coffee this afternoon. Instead of immediately agreeing, she selects “Chat First.” Without synced availability, they must coordinate through conversation alone, trading messages to find a time that works. The extra back-and-forth highlights the difference between Free and Premium, where scheduling support helps reduce coordination effort.",
      johnVisible: false,
      johnTime: 19,
      johnPlay: false,
      johnPauseAt: null as number | null,
      jenniferVisible: true,
      jenniferTime: 10,
      jenniferPlay: true,
      jenniferPauseAt: null as number | null,
    },
  ],
} as const;

export type BumbleFreeFreeStepId =
  (typeof bumbleFreeFreeDualPhone.steps)[number]["id"];

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
  title: "Reframing the Problem Through Coordination and Systems Thinking",
  intro: [
    "This project pushed me to balance user empathy with business goals more intentionally. By reframing the problem from proximity to coordination, I addressed real user pain — like the awkward gap in scheduling — while creating a clearer path for premium value.",
  ],
  takeaways: [
    {
      n: "01",
      title: "Reframe the problem, design the system",
      body: "Shifting from proximity to coordination uncovered scheduling friction and required clear differentiation across Premium, Free, and mismatched availability states.",
    },
    {
      n: "02",
      title: "Privacy is part of the UX",
      body: "Availability is sensitive. Interactions were designed to feel safe and controlled, without exposing or broadcasting personal data.",
    },
    {
      n: "03",
      title: "AI is a collaborator, not a shortcut",
      body: "I used an iterative AI workflow with Figma as the source of truth, guiding outputs through clear instructions, screenshots, and checkpoints like collaborating with a teammate.",
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
  { id: "system", label: "System" },
  { id: "decisions", label: "Decisions" },
  { id: "reflection", label: "Reflection" },
] as const;
