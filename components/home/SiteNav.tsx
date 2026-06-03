"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLeaveAMarkNavOptional } from "@/components/leaveAMark/LeaveAMarkNavContext";
import styles from "./styles.module.css";

const RESUME_URL =
  "https://drive.google.com/file/d/10sxb5ZLAJiee6GgIrhVycpQjIIojwHlZ/view?usp=sharing";

function NavPrimaryLinks() {
  return (
    <>
      <Link className={styles.navLink} href="/">
        Home
      </Link>
      <Link className={styles.navLink} href="/about">
        About
      </Link>
      <a className={styles.navLink} href={RESUME_URL} target="_blank" rel="noreferrer">
        Resume
      </a>
    </>
  );
}

type MobileMenuItem = {
  key: string;
  render: (onNavigate: () => void) => React.ReactNode;
};

const MOBILE_MENU_ITEMS: MobileMenuItem[] = [
  {
    key: "home",
    render: (onNavigate) => (
      <Link href="/" className={styles.mobileMenuLink} onClick={onNavigate}>
        home
      </Link>
    ),
  },
  {
    key: "about",
    render: (onNavigate) => (
      <Link href="/about" className={styles.mobileMenuLink} onClick={onNavigate}>
        about
      </Link>
    ),
  },
  {
    key: "resume",
    render: (onNavigate) => (
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noreferrer"
        className={styles.mobileMenuLink}
        onClick={onNavigate}
      >
        resume
      </a>
    ),
  },
];

const MOBILE_NAV_QUERY = "(max-width: 640px)";

export function SiteNav() {
  const lamNav = useLeaveAMarkNavOptional();
  const lamSlot = lamNav?.slot ?? null;
  const editing = lamSlot !== null;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-dismiss the overlay if the viewport grows past the mobile breakpoint,
  // so resizing back to desktop never strands us on the hamburger view.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(MOBILE_NAV_QUERY);
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      if (!event.matches) setMobileMenuOpen(false);
    };
    handleChange(mql);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`${styles.navOuter} ${editing ? styles.navOuterLeaveAMark : ""} ${
          mobileMenuOpen ? styles.navOuterMobileMenuOpen : ""
        }`}
      >
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
            <button
              type="button"
              className={styles.mobileMenuToggle}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="site-mobile-menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span
                className={`${styles.mobileMenuIcon} ${
                  mobileMenuOpen ? styles.mobileMenuIconOpen : ""
                }`}
                aria-hidden
              >
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>
      <div
        id="site-mobile-menu"
        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className={styles.mobileMenuList} aria-label="Mobile primary">
          {MOBILE_MENU_ITEMS.map((item, index) => (
            <div key={item.key} className={styles.mobileMenuItem}>
              <span className={styles.mobileMenuIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.render(() => setMobileMenuOpen(false))}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
