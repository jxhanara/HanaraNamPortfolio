import cs from "./caseStudy.module.css";

/** Tight crop so the circle’s left edge aligns with adjacent text when the SVG is left-aligned. */
const MOOD_VIEWBOX = "6.5 6.5 31 31";

type MoodIconProps = {
  color: string;
  className?: string;
  size?: number;
};

function MoodIcon({
  color,
  className,
  size = 32,
  mouthPath,
}: MoodIconProps & { mouthPath: string }) {
  return (
    <svg
      className={[cs.problemCardIconSvg, className].filter(Boolean).join(" ")}
      width={size}
      height={size}
      viewBox={MOOD_VIEWBOX}
      aria-hidden
    >
      <circle cx="22" cy="22" r="15.5" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="17.25" cy="17" r="1.05" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="26.75" cy="17" r="1.05" fill="none" stroke={color} strokeWidth="1" />
      <path
        d={mouthPath}
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ProblemFrownIcon({ color, className, size }: MoodIconProps) {
  return (
    <MoodIcon
      color={color}
      className={className}
      size={size}
      mouthPath="M 15.5 28.5 C 18.2 24.5 25.8 24.5 28.5 28.5"
    />
  );
}

export function SolutionSmileIcon({ color, className, size }: MoodIconProps) {
  return (
    <MoodIcon
      color={color}
      className={className}
      size={size}
      mouthPath="M 15.5 26.5 Q 22 31.5 28.5 26.5"
    />
  );
}
