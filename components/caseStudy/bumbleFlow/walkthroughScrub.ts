/** Scroll progress through a sticky pin region (0 at entry, 1 at exit). */
export function getPinScrollProgress(pin: HTMLElement): number {
  const rect = pin.getBoundingClientRect();
  const viewportH = window.innerHeight;
  const scrollRange = rect.height - viewportH;
  if (scrollRange <= 0) return 0;
  const scrolled = Math.max(0, Math.min(scrollRange, -rect.top));
  return scrolled / scrollRange;
}

/** Scroll the page so the pin sits at a fractional step position. */
export function scrollPinToStepFloat(
  pin: HTMLElement,
  stepFloat: number,
  stepCount: number,
): void {
  const rect = pin.getBoundingClientRect();
  const pinHeight = rect.height;
  const viewportH = window.innerHeight;
  const scrollRange = pinHeight - viewportH;
  if (scrollRange <= 0) return;
  const progress = Math.max(0, Math.min(1, stepFloat / stepCount));
  const targetIntoPin = scrollRange * progress;
  const newScrollY = window.scrollY + rect.top + targetIntoPin;
  window.scrollTo({ top: newScrollY, behavior: "smooth" });
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function segmentEnd(
  pauseAt: number | null,
  start: number,
  nextStart: number | null | undefined,
  configuredEnd: number | null | undefined,
  duration: number | null,
): number {
  if (pauseAt != null) return pauseAt;
  if (configuredEnd != null) return configuredEnd;
  if (nextStart != null && nextStart > start) return nextStart;
  if (duration != null && Number.isFinite(duration) && duration > start) return duration;
  return start;
}

export type DualPhoneScrubStep = {
  johnTime: number;
  johnPauseAt: number | null;
  johnPlay: boolean;
  johnVisible?: boolean;
  johnEndTime?: number | null;
  jenniferVisible: boolean;
  jenniferTime: number;
  jenniferPauseAt: number | null;
  jenniferPlay: boolean;
  jenniferEndTime?: number | null;
};

/** Which phones are actively playing in a step — used to group steps into phases. */
function stepPlaybackSignature(step: DualPhoneScrubStep): string {
  const johnActive = step.johnVisible !== false && step.johnPlay;
  const jenniferActive = step.jenniferVisible && step.jenniferPlay;
  return `${johnActive ? 1 : 0}-${jenniferActive ? 1 : 0}`;
}

export type DualPhoneHandoffConfig = {
  /** Step index (0-based) where Jennifer sends and John resumes — step 5 = 4. */
  handoffStepIndex: number;
  /** John freezes here after sending his yellow suggestion. */
  johnPauseAtSendTime: number;
  /** Jennifer's yellow send bubble in her recording. */
  jenniferSendTime: number;
  /** John seeks here once Jennifer sends so he shows the received message. */
  johnResumeAtReceiveTime: number;
};

/** Scroll fraction within the handoff step (must match resolveDualPhoneScrub). */
export const DUAL_PHONE_HANDOFF = {
  jenniferSendEnd: 0.5,
} as const;

export function dualPhoneHandoffPhase(
  stepFloat: number,
  handoffStepIndex: number,
): "jennifer-send" | "sync" | null {
  if (Math.floor(stepFloat) !== handoffStepIndex) return null;
  const t = stepFloat - handoffStepIndex;
  if (t < DUAL_PHONE_HANDOFF.jenniferSendEnd) return "jennifer-send";
  return "sync";
}

export type DualPhoneScrubState = {
  stepIndex: number;
  stepFloat: number;
  johnTime: number;
  jenniferTime: number;
  johnVisible: boolean;
  jenniferVisible: boolean;
  johnShouldPlay: boolean;
  jenniferShouldPlay: boolean;
  johnEnd: number;
  jenniferEnd: number;
};

export function resolveDualPhoneScrub(
  steps: readonly DualPhoneScrubStep[],
  stepFloat: number,
  durations: { john: number; jennifer: number },
  handoff?: DualPhoneHandoffConfig,
): DualPhoneScrubState {
  const n = steps.length;
  const clamped = Math.max(0, Math.min(stepFloat, n - 0.0001));
  const idx = Math.floor(clamped);
  const t = clamped - idx;
  const step = steps[idx];
  const next = idx < n - 1 ? steps[idx + 1] : null;

  // Per-step ends drive the scrub position (each step maps to its own slice).
  const johnStepEnd = segmentEnd(
    step.johnPauseAt,
    step.johnTime,
    next?.johnTime,
    step.johnEndTime,
    durations.john,
  );
  const jenniferStepEnd = segmentEnd(
    step.jenniferPauseAt,
    step.jenniferTime,
    next?.jenniferTime,
    step.jenniferEndTime,
    durations.jennifer,
  );

  const johnVisible = step.johnVisible !== false;
  const jenniferVisible = step.jenniferVisible;

  // A "phase" is a run of consecutive steps where the same phone(s) are
  // playing. Within a phase the video should play straight through on release;
  // it only pauses at the phase boundary, where a phone hands off to the other.
  const phaseSig = stepPlaybackSignature(step);
  let phaseLast = idx;
  while (
    phaseLast + 1 < n &&
    stepPlaybackSignature(steps[phaseLast + 1]) === phaseSig
  ) {
    phaseLast += 1;
  }
  const lastInPhase = steps[phaseLast];
  const afterPhase = phaseLast < n - 1 ? steps[phaseLast + 1] : null;

  let johnEnd = segmentEnd(
    lastInPhase.johnPauseAt,
    lastInPhase.johnTime,
    afterPhase?.johnTime,
    lastInPhase.johnEndTime,
    durations.john,
  );
  let jenniferEnd = segmentEnd(
    lastInPhase.jenniferPauseAt,
    lastInPhase.jenniferTime,
    afterPhase?.jenniferTime,
    lastInPhase.jenniferEndTime,
    durations.jennifer,
  );

  const isLastStep = idx >= n - 1;
  const jenniferOnlyStepIndex = handoff
    ? steps.findIndex((s) => s.jenniferVisible && s.jenniferPlay && !s.johnPlay)
    : -1;

  let johnTime: number;
  let jenniferTime: number;
  let johnShouldPlay = johnVisible && step.johnPlay;
  let jenniferShouldPlay = jenniferVisible && step.jenniferPlay;

  if (handoff && idx === handoff.handoffStepIndex) {
    // Step 5: first half Jennifer sends, second half John receives.
    const JENNIFER_SEND_END = DUAL_PHONE_HANDOFF.jenniferSendEnd;
    const jenniferStart = step.jenniferTime;

    if (t < JENNIFER_SEND_END) {
      johnTime = handoff.johnPauseAtSendTime;
      jenniferTime = lerp(
        jenniferStart,
        handoff.jenniferSendTime,
        t / JENNIFER_SEND_END,
      );
      johnShouldPlay = false;
      jenniferShouldPlay = true;
      johnEnd = handoff.johnPauseAtSendTime;
      jenniferEnd = handoff.jenniferSendTime;
    } else {
      const tail = (t - JENNIFER_SEND_END) / (1 - JENNIFER_SEND_END);
      johnTime = lerp(handoff.johnResumeAtReceiveTime, durations.john, tail);
      jenniferTime = lerp(handoff.jenniferSendTime, durations.jennifer, tail);
      johnShouldPlay = true;
      jenniferShouldPlay = true;
      johnEnd = durations.john;
      jenniferEnd = durations.jennifer;
    }
  } else if (
    handoff &&
    idx >= jenniferOnlyStepIndex &&
    idx < handoff.handoffStepIndex
  ) {
    // Step 4: Jennifer only — John stays frozen on his sent message.
    johnTime = handoff.johnPauseAtSendTime;
    jenniferTime =
      jenniferVisible && step.jenniferPlay
        ? lerp(step.jenniferTime, jenniferStepEnd, t)
        : step.jenniferTime;
    johnShouldPlay = false;
    jenniferShouldPlay = jenniferVisible && step.jenniferPlay;
    johnEnd = handoff.johnPauseAtSendTime;
  } else if (handoff && isLastStep) {
    // Step 6: both pick up after the sync and play to the end.
    johnTime = handoff.johnResumeAtReceiveTime;
    jenniferTime = handoff.jenniferSendTime;
    johnShouldPlay = true;
    jenniferShouldPlay = true;
    johnEnd = durations.john;
    jenniferEnd = durations.jennifer;
  } else if (isLastStep) {
    johnTime = step.johnTime;
    jenniferTime = step.jenniferTime;
  } else {
    johnTime =
      johnVisible && (step.johnPlay || step.johnTime < johnStepEnd)
        ? lerp(step.johnTime, johnStepEnd, t)
        : step.johnTime;
    jenniferTime =
      jenniferVisible && step.jenniferPlay
        ? lerp(step.jenniferTime, jenniferStepEnd, t)
        : step.jenniferTime;
  }

  return {
    stepIndex: idx,
    stepFloat: clamped,
    johnTime,
    jenniferTime,
    johnVisible,
    jenniferVisible,
    johnShouldPlay,
    jenniferShouldPlay,
    johnEnd,
    jenniferEnd,
  };
}

export type KevinLindseyScrubStep = {
  kevinTime: number;
  lindseyShowAtKevinTime: number | null;
};

/** Scroll fractions within the step-5 handoff (must match resolveKevinLindseyScrub). */
export const KEVIN_LINDSEY_HANDOFF = {
  kevinSendEnd: 0.42,
  lindseySendEnd: 0.72,
} as const;

export function kevinLindseyHandoffPhase(
  stepFloat: number,
  handoffStepIndex: number,
): "kevin-send" | "lindsey-send" | "sync" | null {
  if (Math.floor(stepFloat) !== handoffStepIndex) return null;
  const t = stepFloat - handoffStepIndex;
  if (t < KEVIN_LINDSEY_HANDOFF.kevinSendEnd) return "kevin-send";
  if (t < KEVIN_LINDSEY_HANDOFF.lindseySendEnd) return "lindsey-send";
  return "sync";
}

export type KevinLindseyScrubState = {
  stepIndex: number;
  stepFloat: number;
  kevinTime: number;
  lindseyTime: number;
  lindseyVisible: boolean;
  kevinShouldPlay: boolean;
  lindseyShouldPlay: boolean;
  kevinEnd: number;
  lindseyEnd: number;
};

export function resolveKevinLindseyScrub(
  steps: readonly KevinLindseyScrubStep[],
  stepFloat: number,
  kevinDuration: number,
  lindseyDuration: number,
  kevinPauseAtTime: number,
  lindseyResumeKevinAt: number,
  kevinResumeAtTime: number | null,
): KevinLindseyScrubState {
  const n = steps.length;
  const clamped = Math.max(0, Math.min(stepFloat, n - 0.0001));
  const idx = Math.floor(clamped);
  const t = clamped - idx;
  const step = steps[idx];
  const next = idx < n - 1 ? steps[idx + 1] : null;

  const kevinStepEnd = next?.kevinTime ?? kevinDuration;
  const isLastStep = idx >= n - 1;

  let kevinTime = lerp(step.kevinTime, kevinStepEnd, t);
  let lindseyVisible = false;
  let lindseyTime = 0;
  let kevinShouldPlay = true;
  let lindseyShouldPlay = false;
  let kevinEnd = kevinStepEnd;
  let lindseyEnd = lindseyDuration;

  const handoffStep = step.lindseyShowAtKevinTime != null;
  if (handoffStep) {
    // Step 5 choreography:
    //   A — Kevin sends his suggestion and freezes
    //   B — Lindsey appears, picks a time, sends (Kevin stays frozen)
    //   C — Kevin receives Lindsey's counter; both play to the end
    const KEVIN_SEND_END = KEVIN_LINDSEY_HANDOFF.kevinSendEnd;
    const LINDSEY_SEND_END = KEVIN_LINDSEY_HANDOFF.lindseySendEnd;

    if (t < KEVIN_SEND_END) {
      kevinTime = lerp(step.kevinTime, kevinPauseAtTime, t / KEVIN_SEND_END);
      lindseyVisible = false;
      kevinShouldPlay = true;
      kevinEnd = kevinPauseAtTime;
    } else if (t < LINDSEY_SEND_END) {
      kevinTime = kevinPauseAtTime;
      lindseyVisible = true;
      lindseyTime = lerp(
        0,
        lindseyResumeKevinAt,
        (t - KEVIN_SEND_END) / (LINDSEY_SEND_END - KEVIN_SEND_END),
      );
      kevinShouldPlay = false;
      lindseyShouldPlay = true;
      kevinEnd = kevinPauseAtTime;
      lindseyEnd = lindseyResumeKevinAt;
    } else {
      const tail = (t - LINDSEY_SEND_END) / (1 - LINDSEY_SEND_END);
      kevinTime =
        kevinResumeAtTime != null
          ? lerp(kevinResumeAtTime, kevinStepEnd, tail)
          : kevinPauseAtTime;
      lindseyTime = lerp(lindseyResumeKevinAt, lindseyDuration, tail);
      lindseyVisible = true;
      kevinShouldPlay = kevinResumeAtTime != null;
      lindseyShouldPlay = true;
      kevinEnd = kevinStepEnd;
      lindseyEnd = lindseyDuration;
    }
  } else if (isLastStep) {
    // Final step: pin Kevin to the segment start so releasing scroll plays
    // the closing beat instead of scrubbing to the last frame.
    kevinTime = step.kevinTime;
    lindseyVisible = false;
    kevinShouldPlay = true;
    kevinEnd = kevinDuration;
  } else {
    kevinTime = lerp(step.kevinTime, kevinStepEnd, t);
    lindseyVisible = false;
    kevinShouldPlay = true;
    kevinEnd = kevinStepEnd;
  }

  return {
    stepIndex: idx,
    stepFloat: clamped,
    kevinTime,
    lindseyTime,
    lindseyVisible,
    kevinShouldPlay,
    lindseyShouldPlay,
    kevinEnd,
    lindseyEnd,
  };
}

/** Fill ratio (0–1) for the connector after dot `segmentIndex`. */
export function timelineSegmentFill(stepFloat: number, segmentIndex: number): number {
  return Math.max(0, Math.min(1, stepFloat - segmentIndex));
}
