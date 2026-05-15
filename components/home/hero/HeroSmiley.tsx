import styles from "../styles.module.css";

/** Inline smiley — wink + bounce on greeting hover (PRD §05). */
export function HeroSmiley() {
  return (
    <svg
      className={styles.heroSmiley}
      viewBox="0 0 26 18"
      width={22}
      height={15}
      aria-hidden
    >
      <circle className={styles.heroSmileyEyeLeft} cx="7" cy="7" r="1.4" fill="currentColor" />
      <circle className={styles.heroSmileyEyeRight} cx="19" cy="7" r="1.4" fill="currentColor" />
      <path
        className={styles.heroSmileyWink}
        d="M4 7 Q7 4 10 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        className={styles.heroSmileyMouth}
        d="M5.5 11.5 Q13 16 20.5 11.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
