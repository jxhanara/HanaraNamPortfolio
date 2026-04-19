import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

const RESUME_URL =
  "https://drive.google.com/file/d/1wuLTCdBGwUwspxh7_4w92iZK62ddLI_N/view";

export function SiteNav() {
  return (
    <header className={styles.navOuter}>
      <div className={styles.navInner}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink} aria-label="Hanara Nam home">
              <Image
                className={styles.logoImage}
                src="/images/namelogo.png"
                alt=""
                width={75}
                height={101}
                priority
              />
            </Link>
          </div>
          <nav className={styles.navLinks} aria-label="Primary">
            <Link className={styles.navLink} href="/">
              Home
            </Link>
            <Link className={styles.navLink} href="/about">
              About
            </Link>
            <Link className={styles.navLink} href="/#portfolios">
              Work
            </Link>
            <a
              className={styles.navLink}
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
