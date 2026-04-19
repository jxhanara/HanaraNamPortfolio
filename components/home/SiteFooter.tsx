import styles from "./styles.module.css";

const RESUME_URL =
  "https://drive.google.com/file/d/1wuLTCdBGwUwspxh7_4w92iZK62ddLI_N/view";
const LINKEDIN = "https://www.linkedin.com/in/hanaranam/";
const MAIL = "mailto:jxhanara@gmail.com";

function IconMail() {
  return (
    <svg className={styles.pillIcon} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v.01L12 13l8-4.99V8L12 11 4 8Z"
      />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg className={styles.pillIcon} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M6.5 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 20V9h5v11H4Zm7 0V9h4.7v1.5h.1A4.6 4.6 0 0 1 20 9.7V20h-5v-5.6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V20H11Z"
      />
    </svg>
  );
}

function IconDoc() {
  return (
    <svg className={styles.pillIcon} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M7 3h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm6 1.5V9H19L13 4.5ZM8 13h8v1.5H8V13Zm0 3h8V18H8v-2Z"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerTitle}>Let&apos;s work together : )</p>
      <p className={styles.footerLine}>
        I&apos;m always open to discussing new projects and opportunities
      </p>
      <div className={styles.pills}>
        <a className={`${styles.pill} ${styles.pillLight}`} href={MAIL}>
          <IconMail />
          <span>Email me</span>
        </a>
        <a
          className={`${styles.pill} ${styles.pillDark}`}
          href={LINKEDIN}
          target="_blank"
          rel="noreferrer"
        >
          <IconLinkedIn />
          <span>LinkedIn</span>
        </a>
        <a
          className={`${styles.pill} ${styles.pillDark}`}
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
        >
          <IconDoc />
          <span>Resume</span>
        </a>
      </div>
    </footer>
  );
}
