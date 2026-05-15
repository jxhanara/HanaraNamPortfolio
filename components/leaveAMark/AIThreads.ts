export function todayId(): string {
  return new Date().toISOString().slice(0, 10);
}

export function fmtDateLabel(id: string): string {
  const today = todayId();
  if (id === today) return "Today";
  const yest = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (id === yest) return "Yesterday";
  const d = new Date(id + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function classify(text: string): "question" | "reaction" | "observation" {
  const t = text.toLowerCase();
  if (/\?|why|how|what|when|where|which|would|could|should|does|did/.test(t)) return "question";
  if (/love|nice|cool|great|beautiful|clean|amazing|like|enjoy|wow|stunning|cute/.test(t)) return "reaction";
  return "observation";
}

// ─── Response library ───────────────────────────────────────────────────────

type ResponseEntry = {
  keywords: string[];
  response: string;
};

const RESPONSE_LIBRARY: ResponseEntry[] = [
  {
    keywords: ["who are you", "about you", "background", "experience", "hci", "uw", "washington", "degree", "studied"],
    response:
      "I studied Human Centered Design & Engineering at UW, then came to CMU for HCI. The throughline has been designing for systems where the stakes are real, decisions people actually have to make, not just flows to optimize.",
  },
  {
    keywords: ["looking for", "job", "roles", "hiring", "available", "open to", "opportunity", "position"],
    response:
      "I'm looking for UX or Product Design roles right now, ideally on teams building thoughtful products at the intersection of AI and human decision-making. Happy to chat more at jxhanara@gmail.com!",
  },
  {
    keywords: ["different", "stand out", "unique", "why you", "what makes", "special"],
    response:
      "I care a lot about intent. Not just whether something looks clean but whether it actually earns trust and serves a real need. I'm drawn to the hard problems, especially in human-AI systems where design decisions have real consequences.",
  },
  {
    keywords: ["contact", "reach out", "email", "linkedin", "connect", "talk", "chat"],
    response:
      "Best way to reach me is jxhanara@gmail.com or linkedin.com/in/hanaranam. Always up for a conversation, especially about design!",
  },
  {
    keywords: ["nasa", "mars", "capstone", "space", "onboard interface"],
    response:
      "My capstone at CMU is with NASA, designing onboard interfaces for future Mars missions. It's the most constrained design problem I've worked on. Latency makes real-time AI assistance impossible, so everything has to be designed for offline-first decision support. Very different from the consumer work but the underlying question is the same: how do you support human judgment when the stakes are high?",
  },
  {
    keywords: ["thor", "dog", "personal", "outside work", "hobbies", "travel", "food"],
    response:
      "Outside of design I walk my dog Thor a lot, travel whenever I can, and think about how people experience new places and cultures, which honestly feeds directly into the Trippy work. Curiosity about how people think and make decisions is what pulled me into design in the first place.",
  },
  {
    keywords: ["what is trippy", "tell me about trippy", "trippy overview", "what did you build at trippy"],
    response:
      "Trippy is a Hong Kong-based startup building an AI travel platform for authentic local discovery. I was the sole designer, no design team, just me working directly with the CEO, CFO, and engineering. I took it from a blank canvas to a high-fidelity beta that launched to 200+ users. I wrapped up there last month after about a year and a half on the project.",
  },
  {
    keywords: ["hong kong", "why hong kong", "local market", "hong kong locals", "local focus"],
    response:
      "The problem is especially acute in Hong Kong because existing platforms are overwhelmingly tourist-first. Locals planning a weekend outing can't get vibe-based recommendations, they're surfaced the same generic spots as someone visiting for three days. That gap between what locals know and what platforms surface was the core opportunity.",
  },
  {
    keywords: ["sole designer", "only designer", "solo designer trippy", "no design team"],
    response:
      "Yes, sole designer end to end. No design team to sanity check with, which meant I had to be intentional about getting feedback from other sources. I ran things by the CEO, CFO, and engineering constantly, and the beta testing with 200+ users was partly my way of pressure-testing decisions I couldn't stress-test internally.",
  },
  {
    keywords: ["trippy left", "left trippy", "no longer", "wrapped up", "trippy ongoing", "still at trippy"],
    response:
      "I wrapped up at Trippy last month. I was there from the very beginning, blank canvas to beta launch, so it was a full arc. The product is still live with real users, which means everything I designed is out in the world being tested. That's a different kind of accountability than a course project.",
  },
  {
    keywords: ["frankenstein", "fragmented planning", "app hopping", "multiple tools", "juggling apps"],
    response:
      "The core friction is that travel planning is spread across five different tools. Instagram for inspiration, Google Maps for navigation, spreadsheets for scheduling, Tripadvisor for reviews, and some booking platform for reservations. Users are manually stitching together a trip across all of those. Trippy's job was to collapse that into one flow without losing the depth any single tool offers.",
  },
  {
    keywords: ["vibe based", "vibe discovery", "good date spot", "near me now", "spontaneous discovery"],
    response:
      "Vibe-based discovery means surfacing places by mood and context, not category. 'Good date spot near me that's not too loud' is a vibe. Filtering by 'restaurants, 0 to 2km, 4+ stars' is not, that's a search engine. The gap between those two is where existing platforms fail Hong Kong locals who already know the basic stuff and want something more contextually relevant.",
  },
  {
    keywords: ["trippy pivot", "crowdsource", "expert marketplace", "reddit style", "why pivot trippy"],
    response:
      "The original hypothesis was verified local experts curating recommendations for a fee, a two-sided marketplace. It was the right authenticity goal but the wrong vehicle. Verification processes, payment infrastructure, expert onboarding, all of that would have delayed our MVP by months. Reddit-style crowdsourcing got us to the same authenticity goal with 70% less complexity and validated in weeks instead of months.",
  },
  {
    keywords: ["200 users", "beta launch trippy", "beta testing", "52 percent", "retention trippy"],
    response:
      "200+ active beta participants and 50 in-depth interviews. 52.8% day-one retention told us people were coming back to plan, not just exploring once and leaving. For a beta with no marketing budget and a new concept, that number validated the core premise was landing.",
  },
  {
    keywords: ["two modes", "deep planning", "instant decisions", "planning modes", "two speeds"],
    response:
      "The two-modes insight came directly from interviews. Users planning a full weekend trip wanted to go deep, build an itinerary, check reviews, lock in bookings. Users planning a Wednesday evening wanted to tap a vibe and see what came up. The original design was too filter-heavy to support the second mode, so we built Instant TripList as the fast lane and AI-generated TripList as the deliberate lane.",
  },
  {
    keywords: ["instant triplist", "what is instant triplist", "fast discovery", "quick access"],
    response:
      "Instant TripList is the fast lane. Tap a vibe theme, get a curated set of spots instantly. No filtering, no building a query. It's designed for the user who knows they want 'something good for a date tonight' but doesn't know the specifics. Community-vetted recommendations surface based on the vibe pick.",
  },
  {
    keywords: ["ai triplist", "ai generated trippy", "itinerary generator", "playlist metaphor"],
    response:
      "The AI-generated TripList turns preferences into a ready-to-use itinerary. You tell it your vibe, how long you have, who you're going with, and it builds the structure. The key design decision was keeping the user in control of every choice: every spot can be swapped, reordered, or removed. AI handles the logistics, you stay the author of your own trip.",
  },
  {
    keywords: ["community hub", "local insights trippy", "real time trippy", "ask locals"],
    response:
      "The community hub lets users ask context-specific questions and get real-time local answers without leaving the planning flow. 'Is this place crowded on a Sunday afternoon?' is the kind of question no review platform answers well. The goal was to bring that knowledge inside the app so users never have to break their planning flow to find it.",
  },
  {
    keywords: ["trippy differently", "do differently trippy", "change trippy", "if more time trippy"],
    response:
      "I'd push harder to validate the community behavior earlier, not just whether the UI tested well, but whether users actually posted and got answers. Community dynamics are different from feature adoption: you need critical mass for it to feel alive, and that's a chicken-and-egg problem we were still working through.",
  },
  {
    keywords: ["trippy remote", "timezone trippy", "hong kong korea", "async trippy", "distributed team"],
    response:
      "Working across US, Hong Kong, and Korea time zones meant I couldn't rely on a quick call to clarify something. Good documentation wasn't optional, it was the only way things got built correctly. I got much more rigorous about writing specs that could stand alone, with enough context that an engineer could make a reasonable call without waiting 12 hours for my response.",
  },
  {
    keywords: ["trippy design system", "trippy components", "trippy figma"],
    response:
      "I built the design system alongside the product, not ahead of it. Components got created when we needed them, which kept the system lean and actually used. Starting with a full design system before shipping anything would have been premature because we were still learning what the product was.",
  },
  {
    keywords: ["why not google maps", "why not tripadvisor", "existing apps trippy", "why not existing"],
    response:
      "Google Maps tells you what's nearby, not what fits your vibe. Tripadvisor buries booking behind content. Klook and Agoda are booking-first, discovery-second. None of them are designed for a local planning a spontaneous Saturday. They're optimized for tourists with a week and a checklist. Trippy was built for the other mode: I know Hong Kong, I want something specific, give me that fast.",
  },
  {
    keywords: ["bumble flow", "bumble project", "dating app", "bumble overview"],
    response:
      "Bumble Flow started as a brief about proximity notifications and ended up being about something more interesting, the gap between matching and actually meeting. The scheduling labor that kills most matches felt like a more honest problem to solve.",
  },
  {
    keywords: ["why bumble", "choose bumble", "bumble brief", "how did bumble start"],
    response:
      "It started as a course brief, but the proximity premise didn't hold up when I looked at the retention data. 18% down to 6% in seven months. That gap was more interesting to me than the original feature ask, so I chased it.",
  },
  {
    keywords: ["bumble reframe", "proximity wrong", "18 percent", "6 percent", "retention drop bumble"],
    response:
      "The original brief wanted proximity to drive premium conversion, but retention data showed engagement with proximity alerts dropped from 18% to 6% in seven months. Proximity without readiness isn't valuable. I reframed the whole problem around shared intent and coordination, which gave the premium tier a much more compelling reason to exist.",
  },
  {
    keywords: ["distance of readiness", "readiness bumble", "mentally ready", "social alibi"],
    response:
      "Distance of readiness is the gap between being physically close to someone and actually being in the right headspace to meet them. Being 0.5km away tells you nothing about whether that person wants to go on a date right now. And social alibi is the cover you have to say you're busy without having to prove it. Broadcasting 'available now' removes that cover, which is a safety problem in a dating context.",
  },
  {
    keywords: ["bumble biggest decision", "calendar integration", "calendar sync", "why calendar bumble"],
    response:
      "Integrating calendar sync was the decision everything else depended on. Without it, you're just nudging people toward an awkward manual back-and-forth. With it, the system can make a confident suggestion. The tiered approach, different experiences for premium and free users, came from needing to make that ask feel proportional to the value.",
  },
  {
    keywords: ["bumble automated", "first concept bumble", "invasive", "automated scheduling"],
    response:
      "The first concept was fully automated. Find a calendar gap, suggest a time, done. Testing showed that efficiency came at the cost of control. Users felt monitored, not helped. One person said 'just because I'm not in a meeting at 5pm doesn't mean I'm available.' The system was optimizing for schedule gaps, not emotional readiness.",
  },
  {
    keywords: ["bumble hard", "hardest part bumble", "safety bumble", "privacy bumble"],
    response:
      "The hardest tension was efficiency versus safety. The pivot to intent-first, where users opt into availability windows rather than exposing their schedule, was the insight that made the whole thing feel right. Safety came up in almost every testing conversation and I hadn't fully anticipated how much it would matter in a dating context specifically.",
  },
  {
    keywords: ["meeting vibe", "coffee drinks", "why vibe first bumble", "intent first"],
    response:
      "Meeting vibes, coffee, drinks, lunch, dinner, come before availability because they establish shared expectations before anything logistical. If you and a match both want coffee, you've already agreed on the type of interaction. That shared intent makes the coordination that follows feel grounded rather than transactional.",
  },
  {
    keywords: ["three scenarios", "premium premium", "premium free", "free free", "tiered model bumble"],
    response:
      "Premium x premium is the full experience: both users have synced availability and set vibes, so the system surfaces real overlap and suggests specific times in chat. Premium x free means only one side has data, so it's asymmetric but still functional. Free x free is intent-only, more back-and-forth needed. Each tier has a clear next step, none of them are dead ends.",
  },
  {
    keywords: ["blurred calendar", "soft paywall", "free user privacy bumble"],
    response:
      "The blurred calendar for free users was intentional: visible but inaccessible, so users understand what they're missing without feeling like we're hiding it from them arbitrarily. It's a soft paywall that communicates value without creating confusion. Getting that balance right so it didn't feel dark-pattern-y took a lot of iteration.",
  },
  {
    keywords: ["no overlap", "zero overlap bumble", "no shared availability", "edge case bumble"],
    response:
      "That's one of the edge cases I designed for explicitly. If there's no direct overlap within the week, the system generates smart suggestions based on shared vibe preferences, starred time windows, and general availability patterns. Users can pick from those or add a custom time. The goal was to prevent a dead end: coordination should always have a next step.",
  },
  {
    keywords: ["codex", "vibe coding bumble", "working prototype bumble", "why code bumble"],
    response:
      "I used Codex CLI to vibe-code a working interactive prototype for the premium x premium scenario. Figma prototypes can't show real system behavior, like how suggested times actually surface or how the UI responds to different availability states. For the other two scenarios I used hi-fi Figma. Building three working codebases in four weeks would have been the wrong call.",
  },
  {
    keywords: ["bumble differently", "do differently bumble", "more testing bumble", "edge cases bumble"],
    response:
      "I'd run a proper usability test on this version. I pivoted from the initial concept but didn't have time to validate the new direction with the same rigor. I'd specifically want to know whether the blurred calendar reads as a soft paywall or just as something confusing, and whether users actually send time suggestions or just look at them.",
  },
  {
    keywords: ["bumble design system", "bumble components", "bumble style"],
    response:
      "I grounded it in Bumble's existing visual language, card structures, yellow brand color, typography, so nothing in the new feature felt foreign. The scheduling-specific components like the calendar view and availability tags were designed to feel like natural extensions, not a different product inserted into the app.",
  },
  {
    keywords: ["ui for ai", "context switching", "re-entry", "long thread", "scroll momentum"],
    response:
      "Context switching came out of a real frustration: AI chats work great for short sessions but break down when work stretches across days. Scrolling to reconstruct context is an invisible tax. We wanted re-entry to feel like picking up where you left off, not starting over.",
  },
  {
    keywords: ["context gap", "cold trail", "where was i", "re-entry problem"],
    response:
      "The context gap is the window of time you spend scrolling and re-reading just to remember what you were doing before you stepped away. For power users, it's a cognitive tax that kills momentum every single time. Linear chat treats every return as if it's your first time seeing the conversation.",
  },
  {
    keywords: ["team lead ui for ai", "leading team", "5 designers", "role ui for ai"],
    response:
      "I was the team lead for a team of five designers. The hardest part wasn't the design work, it was convergence. We had five strong concepts in round one and had to get to one coherent direction without just picking a winner and losing the rest. The dot-voting session that led us to integrate rather than eliminate was the turning point.",
  },
  {
    keywords: ["dan saffer", "professor ui for ai", "cmu course", "ui for ai course"],
    response:
      "This was part of Dan Saffer's UI for AI course at CMU, an ongoing collaborative exploration of interface patterns for long-horizon AI work. Everything gets published on Medium under the UI for AI publication, so the work is out in the world, not just a slide deck.",
  },
  {
    keywords: ["pieces", "rewind ai", "gem-ni", "adjacent systems ui for ai", "competitive research ui for ai"],
    response:
      "We looked at three adjacent systems. Pieces is a persistent workflow engine that passively captures context so you never restate it. Rewind AI makes everything keyword searchable. GEM-NI is an academic tool for non-linear design exploration. Together they pointed toward the same direction: context recovery needs to be lightweight, automatic, and keyword-driven.",
  },
  {
    keywords: ["ruled out", "momentum concept", "timethread", "what you cut ui for ai"],
    response:
      "In round one we cut two concepts. Momentum used tabs and clusters to link chats but created too much visual overhead, it felt like a second app. Timethread used a calendar timeline but time turned out to be the wrong anchor. People don't remember 'I worked on this Tuesday.' They remember 'I was working on the hotel budget.' Keyword anchors, not time anchors.",
  },
  {
    keywords: ["re-entry panel", "what is re-entry panel", "heads up display", "persistent panel"],
    response:
      "The Re-Entry Panel is a persistent sidebar that acts as a heads-up display for your work. It doesn't show you what was said, it shows you how the work is structured. Two main entry points: Recall Search for finding things by keyword, and the Thread Map for jumping to a specific section.",
  },
  {
    keywords: ["recall search", "keyword search ui for ai", "find past", "fragment memory"],
    response:
      "Recall Search lets you type in keywords you remember from a previous session and the system surfaces relevant past messages. It also surfaces related topic suggestions when your memory is approximate. It's built around how people actually remember things: fragments, not timelines.",
  },
  {
    keywords: ["thread map", "chapters", "jump to section", "navigating structure"],
    response:
      "The Thread Map uses AI to automatically group the conversation into logical chapters. If you're building a marketing plan, you can skip the early brainstorming and jump straight to the Final Budget section. It gives you a structural map of the work rather than a chronological scroll.",
  },
  {
    keywords: ["welcome back summary", "collapsible brief", "reorient"],
    response:
      "The Welcome-Back Summary is a collapsible brief that appears when you return to an older chat. It catches you up on the conversation's status without you having to re-read the last ten prompts. The goal is reorientation, not a report.",
  },
  {
    keywords: ["prompt bridge", "next steps ui for ai", "in flow continuation", "suggested prompts"],
    response:
      "Prompt Bridge offers context-aware follow-ups that pre-fill the chat input so you can resume with a single click. The key design pivot came from testing: users treated Next Steps as a prompt to act on, not a summary to read. So we moved it out of the panel and into the chat input where the action actually happens.",
  },
  {
    keywords: ["side by side", "resume state", "related chats", "drag to reuse", "merge conversations"],
    response:
      "Resume State lets users pull up related chats side by side, drag outputs from one chat directly into another, or merge related threads into one. Work is rarely contained in one window, and these features let ideas carry across threads without starting over or repeating yourself.",
  },
  {
    keywords: ["56 seconds", "baseline ui for ai", "measure the problem", "timing test"],
    response:
      "Before building anything we gave participants a standard AI chat and asked them to find a specific piece of information. We timed it. The average was 56 seconds of scrolling, backtracking, and failed Cmd+F searches. That became the number we designed against.",
  },
  {
    keywords: ["29 seconds", "48 percent faster", "results ui for ai", "testing results ui for ai"],
    response:
      "With the hi-fi Re-Entry Panel, average re-entry time dropped from 56 seconds to 29 seconds, about 48% faster, across 16 participants. The number held up because we were measuring actual task completion time, not asking people how they felt about the design.",
  },
  {
    keywords: ["placement is everything", "next steps moved", "panel to chat input", "design pivot ui for ai"],
    response:
      "Placement turned out to be the most impactful design decision we made. The same content, Next Steps, felt completely different depending on where it appeared. In a sidebar panel it read as informational. In the chat input it read as actionable. That's the difference between a feature people use and one they ignore.",
  },
  {
    keywords: ["ui for ai differently", "do differently ui for ai", "longitudinal", "weeks of use"],
    response:
      "I'd want to test with people who use AI tools for real work across weeks, not just in a single session. Our testing gave us a timing snapshot, but the context gap is a longitudinal problem. It compounds over time. A single-session test tells you the feature is usable, not whether it actually changes behavior.",
  },
  {
    keywords: ["breaking the scroll", "conversation flow", "bookmarks", "non linear chat"],
    response:
      "Breaking the Scroll was a collaboration I was part of in the same semester. That team tackled navigation and iteration within a long-running conversation, not re-entry but staying oriented while the chat grows. They designed a bookmarking system that turns outputs into a non-linear workspace with collections that persist across sessions. Read it at medium.com/ui-for-ai/breaking-the-scroll-reimagining-conversation-flow-in-ai-chats-4fc4202dbacf",
  },
  {
    keywords: ["ai for ai", "agents", "orchestration", "managing agents", "multi agent", "decision inbox"],
    response:
      "AI for AI is a project I did with Dave Song in the second semester of the independent study. We designed an orchestration layer that sits above a growing ecosystem of AI agents and manages them on the user's behalf. The core problem: as you add more agents, you get silently promoted to project manager of your own AI stack. The design prevents that by routing only the decisions that genuinely need a human call. Read it at medium.com/ui-for-ai/ai-for-ai-designing-the-layer-that-manages-your-ai-agents-426c3bcf0898",
  },
  {
    keywords: [
      "ephemeral",
      "ephemeral ai",
      "ambient",
      "in context assistant",
      "minimal intrusion",
      "browser tabs",
      "tab clustering",
      "focus mode",
    ],
    response:
      "Ephemeral AI is a project I led in the second semester. The premise is that the design challenge in ambient AI is restraint, not capability. We designed two systems: an AI-native browser that organizes around user intent rather than open tabs, and an in-context productivity assistant that surfaces inside whatever tool you're already in and disappears when it's done. Read it at medium.com/ui-for-ai/ephemeral-ai-minimal-intrusion-maximum-impact-5e7d86908a81",
  },
  {
    keywords: ["medium publication", "ui for ai publication", "other teams", "full publication", "more articles"],
    response:
      "The UI for AI Medium publication covers everything from both semesters across all the teams. Work on blank canvas onboarding, conversation flow, context switching, agent orchestration, ambient AI, and more. Worth exploring at medium.com/ui-for-ai if you're curious about the breadth of what we were exploring.",
  },
  {
    keywords: ["second semester", "independent study", "spring 2026", "most recent work", "current work"],
    response:
      "The second semester was an independent study that went more speculative and future-facing. I worked on two projects: AI for AI, which designed an orchestration layer for managing multiple AI agents, and Ephemeral AI, which explored how AI assistants could appear contextually within your existing tools rather than requiring you to context-switch to reach them.",
  },
  {
    keywords: ["design process", "how do you work", "workflow", "approach", "method", "start to finish"],
    response:
      "I usually start by questioning the brief. Both Trippy and Bumble Flow required reframing before I could design anything useful. From there: research to understand the real problem, fast concept sketching, concept testing to cut early, then hi-fi and prototype. I try to test behavior, not just preference.",
  },
  {
    keywords: ["work with engineers", "dev", "developers", "technical", "handoff", "implementation"],
    response:
      "I've always worked close to engineers, daily at Trippy, real-time with Codex on Bumble Flow. Good documentation matters more to me than most designers because I've felt what bad handoff costs. I annotate Figma files like I'm writing for someone who can't ask me a follow-up question.",
  },
  {
    keywords: ["feedback", "pushback", "criticism", "handle feedback", "disagree", "stakeholder"],
    response:
      "The Bumble pivot is probably my clearest example. Users told me the automation felt invasive and instead of defending the concept I reframed the whole premise. I try to treat feedback as data. If something isn't working, the question is why, not whether.",
  },
  {
    keywords: ["user research", "interviews", "testing", "usability", "validate", "how you research"],
    response:
      "Research informs every major call I make. At Trippy we ran 50 interviews and 200+ beta testers. At UI for AI we ran two rounds of testing against a timed baseline. I care about measuring behavior, not just asking what people think they'd do.",
  },
  {
    keywords: ["systems thinking", "edge cases", "scale", "states", "think in systems"],
    response:
      "Designing for different user states, like the three-tier model in Bumble Flow or the re-entry states in UI for AI, pushed me toward systems thinking early. Screens are easy. The states between screens and the edge cases are where design actually matters.",
  },
  {
    keywords: ["shipped", "real product", "speculative", "shipped to production", "real users"],
    response:
      "Trippy is the one that shipped to real users. I was the sole designer taking it from zero to a high-fidelity beta, 200+ beta testers, 50 interviews, 52.8% day-one retention. I wrapped up there last month after about a year and a half. The speculative projects like Bumble Flow are grounded in real data and research, and they're where I get to push the thinking further than a production timeline usually allows.",
  },
  {
    keywords: ["solo project", "how do you know", "right direction", "without a team", "validate alone"],
    response:
      "I ran the thinking by people constantly. 2 professors and 7 peers during concept testing on Bumble, and I kept checking back as the design evolved. It's not the same as a full design team but it keeps you from designing in isolation. The professors in particular pushed on the business logic, which is where solo projects can drift if you're not careful.",
  },
  {
    keywords: ["connects to other work", "thread", "portfolio thread", "through line", "what connects"],
    response:
      "The thread across everything is designing systems where people stay in control even when AI or automation is involved. In Bumble Flow the system facilitates coordination without broadcasting status. In Trippy AI builds the itinerary but the user stays the author. In UI for AI we designed re-entry so people pick up where they left off without re-explaining context. The design problem is always the same: how much should the system do, and how much should stay with the person?",
  },
  {
    keywords: ["cmu", "carnegie mellon", "hci", "masters", "grad school", "program", "why cmu"],
    response:
      "CMU's HCI program sits at the intersection of research rigor and real application in a way most design programs don't. I wanted to develop the vocabulary and methods to think about human-AI systems more precisely, not just make them look good. The UI for AI course specifically is unlike anything I've seen at other programs.",
  },
  {
    keywords: ["academic connects", "school connects", "theory practice", "how cmu connects"],
    response:
      "The thread across everything, Trippy, Bumble Flow, UI for AI, is human-AI systems where design choices carry real consequences. CMU is where I'm developing the research methods to evaluate those choices more rigorously, not just intuitively. The capstone with NASA is the most direct example of that.",
  },
  {
    keywords: ["why hci", "why design", "why this field", "drawn to design", "passion"],
    response:
      "I'm drawn to the problems where design decisions actually matter, not just aesthetics but trust, safety, agency. Human-AI systems are full of those decisions right now, and most products are getting them wrong. That's where I want to be working.",
  },
];

const FALLBACK_LIBRARY: Record<string, string[]> = {
  question: [
    "Good question. The honest answer probably lives in the case study, but happy to go deeper. What specifically are you curious about?",
    "The short version depends on which project you're thinking about. The reasoning is pretty different across them.",
  ],
  reaction: [
    "Thank you! That one took a while to get right. The process behind it is in the case study if you want the full story.",
    "Glad that landed. There's more detail in the case study on how that decision came together.",
  ],
  observation: [
    "You're picking up on something real. I'd love to know what prompted that, it's a tension I thought about a lot.",
    "Interesting read. That's one I'm still thinking about honestly.",
  ],
};

// ─── Match function ───────────────────────────────────────────────────────────

function matchResponse(text: string): string {
  const lower = text.toLowerCase();

  let bestScore = 0;
  let bestResponse = "";

  for (const entry of RESPONSE_LIBRARY) {
    const score = entry.keywords.filter((k) => lower.includes(k)).length;
    if (score > bestScore) {
      bestScore = score;
      bestResponse = entry.response;
    }
  }

  if (bestScore >= 1 && bestResponse) {
    return bestResponse;
  }

  const kind = classify(text);
  const opts = FALLBACK_LIBRARY[kind];
  return opts[Math.floor(Math.random() * opts.length)];
}

// ─── Main export (replaces the old API-calling version) ───────────────────────

export async function generateAIReply(
  thread: { from: "visitor" | "ai"; text: string; at: number }[],
  pageContext?: string,
): Promise<string> {
  const visitorText =
    [...thread].reverse().find((m) => m.from === "visitor")?.text ?? "";

  // Small delay so the thinking dots show briefly
  await new Promise((r) =>
    setTimeout(r, 800 + Math.random() * 400)
  );

  return matchResponse(visitorText);
}
