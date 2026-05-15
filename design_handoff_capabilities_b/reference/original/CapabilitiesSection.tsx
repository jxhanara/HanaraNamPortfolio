import styles from "./styles.module.css";

const UX_PARAS = [
  "I approach UX design with a strong focus on purpose. Every decision should serve a clear user need.",
  "I work closely with engineers and product partners to design seamless experiences across desktop and mobile. That can mean collaborating in Figma, working within website builders, or diving into CSS when needed.",
  "I care deeply about clarity, usability, and building experiences that work within real-world constraints.",
];

const BRAND_PARAS = [
  "I enjoy helping brands shape visual identities that feel intentional and human.",
  "My approach blends strategy and creativity, from choosing typography and color systems to making sure every visual decision supports the brand’s values and audience.",
  "I focus on creating cohesive systems that tell a clear story and can scale over time.",
];

const COLLAB_PARAS = [
  "I thrive in cross-functional environments and adapt quickly to what a team needs.",
  "Whether I am wearing multiple hats or focusing deeply on a single problem, my goal is to bridge user needs and business goals through clear communication and thoughtful design decisions.",
  "I value empathy, trust, and collaboration, and I bring a positive, solutions-oriented mindset to the teams I work with.",
];

export function CapabilitiesSection() {
  return (
    <section className={styles.about} aria-labelledby="capabilities-heading">
      <div className={styles.aboutInner}>
        <div className={styles.aboutHeader}>
          <h2 id="capabilities-heading" className={styles.aboutTitle}>
            How I can help you
          </h2>
          <p className={styles.aboutSubtitle}>
            Combining creativity with strategic thinking to deliver exceptional
            results
          </p>
        </div>
        <div className={styles.columns}>
          <article className={styles.column}>
            <div className={styles.columnHeader}>
              <p className={styles.columnIndex}>01.</p>
              <h3 className={styles.columnTitle}>UX Design</h3>
            </div>
            <div className={styles.columnBody}>
              {UX_PARAS.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </article>
          <article className={styles.column}>
            <div className={styles.columnHeader}>
              <p className={styles.columnIndex}>02.</p>
              <h3 className={styles.columnTitle}>Branding</h3>
            </div>
            <div className={styles.columnBody}>
              {BRAND_PARAS.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </article>
          <article className={styles.column}>
            <div className={styles.columnHeader}>
              <p className={styles.columnIndex}>03.</p>
              <h3 className={styles.columnTitle}>Collaborate &amp; Adapt</h3>
            </div>
            <div className={styles.columnBody}>
              {COLLAB_PARAS.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
