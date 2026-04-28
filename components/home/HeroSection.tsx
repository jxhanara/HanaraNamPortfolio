import { HeroLottie } from "./HeroLottie";
import styles from "./styles.module.css";

const CMU_MHCI = "https://hcii.cmu.edu/academics/mhci";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <div className={styles.heroTop}>
            <p id="hero-heading" className={styles.heroGreeting}>
              Hey there ¨̮ I&apos;m Hanara —
            </p>
            <div className={styles.heroVisual}>
              <HeroLottie />
            </div>
          </div>
          <p className={styles.heroLead}>
            I design thoughtful interfaces for complex systems, working
            cross-functionally with engineers, researchers, and product teams to
            support real human decision-making.
          </p>
          <div className={styles.heroMetaRow}>
            <span className={styles.heroStatusDot} aria-hidden />
            <p className={styles.heroMeta}>
              Currently pursuing a Master&apos;s in Human-Computer Interaction at{" "}
              <a href={CMU_MHCI} target="_blank" rel="noreferrer">
                Carnegie Mellon University
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
