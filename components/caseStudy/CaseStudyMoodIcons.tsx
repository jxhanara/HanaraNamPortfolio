import cs from "./caseStudy.module.css";

export function ProblemFrownIcon({ color }: { color: string }) {
  return (
    <svg
      className={cs.problemCardIconSvg}
      width="44"
      height="44"
      viewBox="0 0 44 44"
      aria-hidden
    >
      <circle cx="22" cy="22" r="15.5" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="17.25" cy="17" r="1.05" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="26.75" cy="17" r="1.05" fill="none" stroke={color} strokeWidth="1" />
      <path
        d="M 15.5 28.5 C 18.2 24.5 25.8 24.5 28.5 28.5"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SolutionSmileIcon({ color }: { color: string }) {
  return (
    <svg
      className={cs.problemCardIconSvg}
      width="44"
      height="44"
      viewBox="0 0 44 44"
      aria-hidden
    >
      <circle cx="22" cy="22" r="15.5" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="17.25" cy="17" r="1.05" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="26.75" cy="17" r="1.05" fill="none" stroke={color} strokeWidth="1" />
      <path
        d="M 15.5 28 Q 22 22 28.5 28"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
