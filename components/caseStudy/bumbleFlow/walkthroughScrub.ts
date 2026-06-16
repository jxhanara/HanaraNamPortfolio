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
): DualPhoneScrubState {
  const n = steps.length;
  const clamped = Math.max(0, Math.min(stepFloat, n - 0.0001));
  const idx = Math.floor(clamped);
  const t = clamped - idx;
  const step = steps[idx];
  const next = idx < n - 1 ? steps[idx + 1] : null;

  const johnEnd = segmentEnd(
    step.johnPauseAt,
    step.johnTime,
    next?.johnTime,
    step.johnEndTime,
    durations.john,
  );
  const jenniferEnd = segmentEnd(
    step.jenniferPauseAt,
    step.jenniferTime,
    next?.jenniferTime,
    step.jenniferEndTime,
    durations.jennifer,
  );

  const johnVisible = step.johnVisible !== false;
  const jenniferVisible = step.jenniferVisible;

  const johnTime =
    johnVisible && (step.johnPlay || step.johnTime < johnEnd)
      ? lerp(step.johnTime, johnEnd, t)
      : step.johnTime;

  const jenniferTime =
    jenniferVisible && step.jenniferPlay
      ? lerp(step.jenniferTime, jenniferEnd, t)
      : step.jenniferTime;

  return {
    stepIndex: idx,
    stepFloat: clamped,
    johnTime,
    jenniferTime,
    johnVisible,
    jenniferVisible,
    johnShouldPlay: johnVisible && step.johnPlay,
    jenniferShouldPlay: jenniferVisible && step.jenniferPlay,
    johnEnd,
    jenniferEnd,
  };
}

export type KevinLindseyScrubStep = {
  kevinTime: number;
  lindseyShowAtKevinTime: number | null;
};

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

  const kevinEnd = next?.kevinTime ?? kevinDuration;
  let kevinTime = lerp(step.kevinTime, kevinEnd, t);

  let lindseyVisible = false;
  let lindseyTime = 0;

  const handoffStep = step.lindseyShowAtKevinTime != null;
  if (handoffStep) {
    const handoffStart = step.kevinTime;
    const handoffEnd = kevinPauseAtTime;
    const handoffSpan = Math.max(handoffEnd - handoffStart, 0.001);
    const kevinPhaseEnd = handoffStart + handoffSpan * 0.55;

    if (t < 0.55) {
      kevinTime = lerp(step.kevinTime, kevinPhaseEnd, t / 0.55);
      lindseyVisible = false;
    } else {
      kevinTime =
        kevinResumeAtTime != null
          ? lerp(kevinPauseAtTime, kevinResumeAtTime, (t - 0.55) / 0.45)
          : kevinPauseAtTime;
      lindseyVisible = true;
      lindseyTime = lerp(0, lindseyResumeKevinAt, (t - 0.55) / 0.45);
      if (t > 0.85) {
        const tail = (t - 0.85) / 0.15;
        lindseyTime = lerp(lindseyResumeKevinAt, lindseyDuration, tail);
        if (kevinResumeAtTime != null) {
          kevinTime = lerp(kevinResumeAtTime, kevinEnd, tail);
        }
      }
    }
  } else {
    kevinTime = lerp(step.kevinTime, kevinEnd, t);
    lindseyVisible = false;
  }

  return {
    stepIndex: idx,
    stepFloat: clamped,
    kevinTime,
    lindseyTime,
    lindseyVisible,
    kevinShouldPlay: true,
    lindseyShouldPlay: lindseyVisible,
    kevinEnd,
    lindseyEnd: lindseyDuration,
  };
}

/** Fill ratio (0–1) for the connector after dot `segmentIndex`. */
export function timelineSegmentFill(stepFloat: number, segmentIndex: number): number {
  return Math.max(0, Math.min(1, stepFloat - segmentIndex));
}
