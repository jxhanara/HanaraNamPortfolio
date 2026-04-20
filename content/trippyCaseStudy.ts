/**
 * Case study copy sourced from Figma frame `1:838` (Portfolio-MCP).
 * Structured for the inspiration layout system — not a rewrite.
 */

export const trippyCaseStudyMeta = {
  title: "Trippy",
  subtitle:
    "Building a Zero to One Local-First Discovery & Booking Ecosystem for a\u00A0Startup",
  caseStudyEyebrow: "Case study",
  displayThesis: [
    "Locals don’t plan travel in one straight line —",
    "but today’s tools behave like they do.",
  ],
  introColumns: [
    "Trippy is a Hong Kong-based startup building an AI travel platform designed to bridge the gap between “tourist-trap” planning and authentic local discovery.",
    "As the sole lead UX designer, I led the product from a blank canvas to a high-fidelity beta, transforming a fragmented planning process into a consolidated experience for Hong Kong locals and travelers.",
  ],
  specRows: [
    { label: "My role", value: "Lead Product Designer · Product strategy · End-to-end UX/UI · Design system · User research · Beta testing" },
    { label: "Team", value: "C-level executives · Technical team · Marketing team" },
    { label: "Timeframe", value: "2024 – 2026 (ongoing)" },
    { label: "Tools", value: "Figma · GitHub · Notion" },
  ],
} as const;

export const trippyProblem = {
  eyebrow: "01 · Problem",
  title: "Fragmented, tourist-centric planning",
  lead: [
    "Travel planning today is a “Frankenstein” workflow. Users juggle Instagram for inspiration, Google Maps for navigation, and spreadsheets for scheduling.",
    "For Hong Kong locals, this is particularly frustrating because existing platforms fail to surface:",
  ],
  cards: [
    {
      kicker: "High planning effort",
      body: "Planning a trip means starting from scratch — jumping between tools, filtering endlessly, and assembling everything yourself.",
      accent: "green",
    },
    {
      kicker: "Authenticity",
      body: "Recommendations are often generic and tourist-heavy. They lack “vibe-based” discovery (e.g., “Where is a good date spot near me now?”).",
      accent: "orange",
    },
    {
      kicker: "Flexibility",
      body: "Rigid 5-day itineraries don’t match the need for short, spontaneous weekend outings.",
      accent: "blue",
    },
  ],
} as const;

export const trippyResearchCompetitors = {
  eyebrow: "02 · Research",
  title: "How popular travel products handle planning, community, and booking",
  intro:
    "Before diving into the design phase, we began by breaking down the problem into key pain points. We then selected and evaluated popular travel planning and booking apps to understand how they addressed these issues.",
  cards: [
    {
      id: "triple",
      logoSrc: "/assets/trippy/competitiveanalysisimages/triplelogo.png",
      logoAlt: "Triple",
      imageSrc: "/assets/trippy/competitiveanalysisimages/tripleappdesigns.png",
      imageAlt: "Triple app interface screenshots",
      ratings: [
        { label: "LLM Driven Travel Itinerary Generator", filled: 2 },
        { label: "Interactive community", filled: 3 },
        { label: "Simple Design", filled: 3 },
      ],
      summary:
        "Triple Korea is our gold standard for high-integration planning. Built-in route navigation eliminates the need to exit the app for Google Maps. Triple keeps users in-app by managing reservations natively.",
    },
    {
      id: "wanderlog",
      logoSrc: "/assets/trippy/competitiveanalysisimages/wanderloglogo.png",
      logoAlt: "Wanderlog",
      imageSrc: "/assets/trippy/competitiveanalysisimages/wanderlogdesigns.png",
      imageAlt: "Wanderlog app interface screenshots",
      ratings: [
        { label: "LLM Driven Travel Itinerary Generator", filled: 1 },
        { label: "Interactive community", filled: 2 },
        { label: "Simple Design", filled: 2 },
      ],
      summary:
        "Real-time “Google Docs-style” collaboration for groups. However, broken booking UX—users are often redirected to external 3rd-party sites, breaking the mobile experience.",
    },
    {
      id: "aggregators",
      logoSrc: "/assets/trippy/competitiveanalysisimages/otherapplogos.png",
      logoAlt: "Trip.com, Klook, Agoda, Tripadvisor",
      imageSrc: "/assets/trippy/competitiveanalysisimages/otherappdesigns.png",
      imageAlt: "Booking aggregator apps and interface collage",
      ratings: [
        { label: "LLM Driven Travel Itinerary Generator", filled: 1 },
        { label: "Interactive community", filled: 2 },
        { label: "Simple Design", filled: 1 },
      ],
      summary:
        "Trip.com, Klook, Tripadvisor, and Agoda all suffer from information overload and identity crisis. Agoda’s AI Review Summarization reduces due diligence time but UI is cluttered. Tripadvisor’s booking features are hidden within content.",
    },
  ],
  footnote: "*Only key insights are shown for simplicity.",
} as const;

export const trippyResearchInsights = {
  eyebrow: "Strategic read",
  title: "Expert-led curation could unlock authenticity",
  body: "Across competitors, the same pattern kept surfacing: generic planning flows, booking-first discovery, and untapped expert trust — leaving room to pair curated local guidance with a real itinerary workflow.",
  /** Converging diagram — 01 (left) + 02 (right) taper to shared opportunity */
  strategicConvergence: {
    opportunity:
      "Pair expert-led local picks with planning workflow to raise discovery quality without the tourist-default noise.",
    left: {
      kicker: "01",
      title: "Discovery Lacks Meaningful Context",
      primary:
        "Planning tools and booking platforms optimize for ease and volume, not relevance.",
      supporting:
        "Users are left sorting through generic recommendations and overwhelming options to find what actually fits their vibe.",
      refs: "Wanderlog · Trip.com · Klook · Tripadvisor",
    },
    right: {
      kicker: "02",
      title: "Experts Exist, Just Not for Travel Planning",
      primary: "People already trust vetted local experts in other marketplaces.",
      supporting: "That model hasn’t been applied to travel discovery yet.",
      refs: "Soomgo",
    },
  },
} as const;

export const trippyStrategy = {
  eyebrow: "03 · Strategy",
  title: "The expert marketplace model was slow and complex to validate",
  body: "To evaluate this hypothesis, we explored what it would take to operationalize a consultant-led model through early research, stakeholder discussions, and feasibility analysis. Early research, stakeholder conversations, and feasibility checks revealed structural challenges.",
  pivotEyebrow: "Pivot",
  pivotTitle: "Strategic shift",
  initialLabel: "Initial approach",
  initialHeadline: "Verified local experts curate recommendations for a fee",
  initialBullets: [
    { title: "High onboarding friction for experts", body: "Verification processes, resume requirements — too much friction for consultants to join." },
    { title: "Marketplace complexity slowed learning", body: "Two-sided marketplace payment infrastructure would delay MVP by months." },
    { title: "Slow to ship", body: "Complex overhead prevented us from validating core assumptions." },
  ],
  workedLabel: "Approach that worked",
  workedHeadline: "Reddit-style crowdsourcing for real-time local insight",
  workedBullets: [
    { title: "Low friction", body: "Anyone can contribute instantly — “Is it raining in Sai Kung now?” gets answered in real time." },
    { title: "Technical debt (acceptable tradeoff)", body: "Achieves the same authenticity goal through community trust, not payment processing." },
    { title: "Fast to validate", body: "No marketplace dependencies means we can test real user demand and behavior immediately." },
  ],
  outcomeLine: "Same authenticity goal, 70% less complexity, and validated in weeks instead of months.",
} as const;

export const trippyValidation = {
  eyebrow: "04 · Validation",
  displayLine: "New insights: users plan in two modes, lose momentum across tools, and struggle with overload",
  body: "We translated these insights and initial research into early concepts. We focused on reducing planning effort through AI-generated itineraries and community-driven discovery, then validated this direction and uncovered additional user needs through testing with 200+ users.",
  userQuotesImageSrc: "/assets/trippy/userquotes.png",
  userQuotesImageAlt: "User research quotes and feedback from beta participants",
  stats: [
    { value: "200+", label: "Active participants joined the beta launch" },
    { value: "50", label: "In-depth interviews were conducted to identify UX friction" },
    { value: "52.8%", label: "Day 1 retention rate recorded during the testing period" },
  ],
  insightModules: [
    {
      n: "01",
      title: "Planning isn’t one-speed-fits-all",
      bullets: [
        "Users wanted two speeds of planning: deep planning and instant decisions.",
        "A single, filter-heavy flow failed to support both mental modes.",
      ],
    },
    {
      n: "02",
      title: "Momentum dies outside the app",
      bullets: [
        "Context switching (leaving the app for other forums) broke momentum.",
        "Re-explaining their trip context each time felt repetitive.",
      ],
    },
    {
      n: "03",
      title: "Too many choices slowed spontaneity",
      bullets: [
        "Over-filtering created friction during spontaneous planning moments.",
        "Users often didn’t know exactly what they wanted upfront.",
      ],
    },
  ],
  synthesis:
    "These patterns pointed toward a product that could flex between fast, vibe-first decisions and deeper planning — without forcing users to rebuild context every time they switched tools.",
} as const;

export const trippySolution = {
  eyebrow: "05 · Solution",
  displayLine: ["The all-in-one travel companion"],
  intro:
    "Trippy streamlines the entire travel lifecycle by consolidating discovery, community, and booking into one seamless journey. By treating every part of your trip like a modular “playlist,” we replace fragmented app-hopping with a single, intuitive platform.",
  pillars: [
    {
      kicker: "Reduce planning effort",
      body: "Generate and refine trips without building everything from scratch.",
    },
    {
      kicker: "Personalized, vibe-based discovery",
      body: "Surface new, relevant spots instantly by combining preferences, selected vibes, and community-driven insights.",
    },
    {
      kicker: "End app hopping",
      body: "Bring discovery, community, and planning into one seamless flow — reducing the need to switch tools and manually piece trips together.",
    },
  ],
  modules: [
    {
      n: "01",
      title: "Personalized, vibe-based discovery",
      body: "Enables quick, vibe-based decisions for spontaneous plans — surfacing relevant spots instantly without requiring full trip planning.",
      imageSrc: "/assets/trippy/Annotations_InstantTripList.png",
      imageAlt: "Annotated Trippy instant TripList experience",
      imageWidth: 2218,
      imageHeight: 2242,
    },
    {
      n: "02",
      title: "Reducing planning effort with AI-generated TripList",
      body: "Turn preferences into a ready-to-use itinerary — eliminating the need to plan from scratch. Generate, refine, and customize trips in seconds while maintaining full control.",
      imageSrc: "/assets/trippy/Annotations_AIGenTripList.png",
      imageAlt: "Annotated Trippy AI-generated TripList",
      imageWidth: 2218,
      imageHeight: 2242,
    },
    {
      n: "03",
      title: "Community hub — real-time local insights",
      body: "Get real-time, context-specific insights from locals — ask questions, explore discussions, and find relevant recommendations without leaving your planning flow.",
      imageSrc: "/assets/trippy/Annotations_Community.png",
      imageAlt: "Annotated Trippy community hub",
      imageWidth: 2218,
      imageHeight: 2242,
    },
  ],
} as const;

export const trippyReflection = {
  eyebrow: "06 · Reflection",
  title: "End-to-end design",
  intro: [
    "Building Trippy taught me that great travel experiences aren’t about adding more features — they’re about removing the noise. I translated the high-anxiety chaos of planning into a modular “playlist” system that feels as intuitive as listening to music.",
    "Beyond the interface, this project shaped how I think about product design holistically — balancing business goals, technical feasibility, and user experience while designing systems that scale.",
  ],
  takeaways: [
    {
      n: "01",
      title: "Simplicity is the product",
      body: "Great experiences come from reducing complexity, not adding features. Distilling planning into a lightweight, modular system made the product feel intuitive and approachable from the first interaction.",
    },
    {
      n: "02",
      title: "Design is alignment",
      body: "This role extended far beyond UI. Working closely with leadership and engineering meant constantly aligning user needs with business priorities and technical constraints to move the product forward.",
    },
    {
      n: "03",
      title: "AI should support, not replace",
      body: "The goal wasn’t automation for its own sake, but preserving user agency. AI handled the heavy lifting, while users remained in control — shaping their own trips rather than being led by the system.",
    },
    {
      n: "04",
      title: "Raise the bar for effort",
      body: "This project redefined my standard for simplicity: if a complex task can’t be reduced to a single, effortless action, the design isn’t finished.",
    },
  ],
} as const;

export const trippyToc = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "strategy", label: "Strategy" },
  { id: "validation", label: "Validation" },
  { id: "solution", label: "Solution" },
  { id: "reflection", label: "Reflection" },
] as const;

/** Next case study promo (after reflection). */
export const trippyNextProject = {
  eyebrow: "Next project",
  title: "Bumble Flow",
  description: "Redesigning dating from passive matching to active coordination.",
  href: "https://hanaranam.com/3/bumbleflow",
  imageSrc: "/images/bumbleflowthumbnail.png",
  imageAlt: "Bumble Flow project preview",
  metaLeft: "Product design · Mobile",
  metaYear: "2026",
} as const;
