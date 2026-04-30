"use client";

import Image from "next/image";
import Link from "next/link";
import { useLeaveAMarkNavOptional } from "@/components/leaveAMark/LeaveAMarkNavContext";
import styles from "./styles.module.css";

const RESUME_URL =
  "https://drive.google.com/file/d/1wuLTCdBGwUwspxh7_4w92iZK62ddLI_N/view";

function NavPrimaryLinks() {
  return (
    <>
      <Link className={styles.navLink} href="/">
        Home
      </Link>
      <Link className={styles.navLink} href="/about">
        About
      </Link>
      <Link className={styles.navLink} href="/#portfolios">
        Work
      </Link>
      <a className={styles.navLink} href={RESUME_URL} target="_blank" rel="noreferrer">
        Resume
      </a>
    </>
  );
}

export function SiteNav() {
  const lamNav = useLeaveAMarkNavOptional();
  const lamSlot = lamNav?.slot ?? null;
  const editing = lamSlot !== null;

  return (
    <header className={`${styles.navOuter} ${editing ? styles.navOuterLeaveAMark : ""}`}>
      <div className={styles.navInner}>
        <div className={`${styles.navContent} ${editing ? styles.navContentLeaveAMark : ""}`}>
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
          <nav
            className={`${styles.navLinks} ${editing ? styles.navLinksLeaveAMark : ""}`}
            aria-label="Primary"
          >
            <NavPrimaryLinks />
            {editing && lamNav ? (
              <button
                type="button"
                className={styles.navVisitorPill}
                onClick={() => lamNav.triggerPill()}
                aria-label={`Edit visitor card: ${lamSlot.visitorName}`}
                data-lam-ui
              >
                <span
                  className={styles.navVisitorPillSwatch}
                  style={{ background: lamSlot.gradientCSS }}
                  aria-hidden
                />
                <span className={styles.navVisitorPillName}>{lamSlot.visitorName}</span>
                <span className={styles.navVisitorPillCaret} aria-hidden />
              </button>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  );
}
