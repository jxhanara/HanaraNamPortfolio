"use client";

import { HeroSmiley } from "./hero/HeroSmiley";
import styles from "./styles.module.css";

const CMU_MHCI = "https://hcii.cmu.edu/academics/mhci";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p id="hero-heading" className={styles.heroGreeting}>
            hey there <HeroSmiley /> i&apos;m hanara
          </p>

          <h1 className={styles.heroHeadline}>
            <span className={styles.heroHText}>I design </span>
            <em className={`${styles.heroHEm} ${styles.heroEmProducts}`}>
              AI-powered products
              <span className={styles.heroProductsAnnot}>
                <a href="#trippy">Trippy</a>
                <span className={styles.heroAnnotDot} aria-hidden />
                <a href="#bumble-flow">Bumble Flow</a>
                <span className={styles.heroAnnotDot} aria-hidden />
                <a href="#ui-for-ai">UI for AI</a>
              </span>
            </em>
            <span className={styles.heroHText}> that amplify what people can do — </span>
            <em className={`${styles.heroHEm} ${styles.heroEmOutOfWay}`}>
              without getting in the way
            </em>
            <span className={styles.heroHText}>.</span>
          </h1>

          <div className={styles.heroBelowHeadline}>
            <p className={styles.heroSub}>
              I&apos;m passionate about shaping how people work, think, and create through
              thoughtful interfaces.
            </p>
            <div className={styles.heroMetaRow}>
              <span className={styles.heroStatusDot} aria-hidden />
              <p className={styles.heroMeta}>
                Currently pursuing my master&apos;s in{" "}
                <a
                  href={CMU_MHCI}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.heroCmuLink}
                  data-badge="MHCI '26 · graduating Aug 2026"
                >
                  HCI at Carnegie Mellon University
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
