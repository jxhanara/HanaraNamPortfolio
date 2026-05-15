import Link from "next/link";
import { WorkNavLink } from "@/components/home/WorkNavLink";
import styles from "./SiteFooter.module.css";

const RESUME_URL =
  "https://drive.google.com/file/d/1wuLTCdBGwUwspxh7_4w92iZK62ddLI_N/view";
const LINKEDIN = "https://www.linkedin.com/in/hanaranam/";
const MAIL = "mailto:jxhanara@gmail.com";

function IconArrowOut() {
  return (
    <svg className={styles.footExtIcon} viewBox="0 0 10 10" aria-hidden>
      <path
        d="M1 9 9 1M9 1H4M9 1V6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footWrap}>
        <h2 className={styles.footCta}>
          Let&apos;s make
          <br />
          something <em>together.</em>
        </h2>

        <div className={styles.footGrid}>
          <div className={styles.footEmailBlock}>
            <h5 className={styles.footColTitle}>Email</h5>
            <a className={styles.footEmail} href={MAIL}>
              jxhanara@gmail.com
            </a>
            <p className={styles.footEmailNote}>
              I&apos;m always up for a chat — especially anything design, dogs,
              or food.
            </p>
          </div>

          <div className={styles.footCol}>
            <h5 className={styles.footColTitle}>Main</h5>
            <ul className={styles.footList}>
              <li>
                <WorkNavLink className={styles.footLink}>Work</WorkNavLink>
              </li>
              <li>
                <Link className={styles.footLink} href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className={styles.footLink} href="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footCol}>
            <h5 className={styles.footColTitle}>Contact</h5>
            <ul className={styles.footList}>
              <li>
                <a
                  className={styles.footLinkExt}
                  href={LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                  <IconArrowOut />
                </a>
              </li>
              <li>
                <a
                  className={styles.footLinkExt}
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Resume
                  <IconArrowOut />
                </a>
              </li>
              <li>
                <a className={styles.footLinkExt} href={MAIL}>
                  Email me
                  <IconArrowOut />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
