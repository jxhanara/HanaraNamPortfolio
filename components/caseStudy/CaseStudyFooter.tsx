import Image from "next/image";
import Link from "next/link";
import cs from "./caseStudy.module.css";

const RESUME_URL =
  "https://drive.google.com/file/d/1wuLTCdBGwUwspxh7_4w92iZK62ddLI_N/view";
const LINKEDIN = "https://www.linkedin.com/in/hanaranam/";
const MAIL = "mailto:jxhanara@gmail.com";

function IconArrowOut() {
  return (
    <svg className={cs.footerExtIcon} viewBox="0 0 10 10" aria-hidden>
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

export function CaseStudyFooter() {
  return (
    <footer className={cs.caseStudyFooter}>
      <div className={cs.caseStudyFooterInner}>
        <div className={cs.caseStudyFooterBrand}>
          <Link href="/" className={cs.caseStudyFooterLogoLink} aria-label="Hanara Nam home">
            <Image
              className={cs.caseStudyFooterLogo}
              src="/images/namelogo.png"
              alt=""
              width={75}
              height={101}
            />
          </Link>
          <p className={cs.caseStudyFooterTagline}>
            Let&apos;s collaborate &amp; create something together! I&apos;m always up for a chat,
            especially about design related topics : )
          </p>
        </div>
        <div className={cs.caseStudyFooterCols}>
          <div className={cs.caseStudyFooterCol}>
            <p className={cs.caseStudyFooterColTitle}>Main</p>
            <ul className={cs.caseStudyFooterList}>
              <li>
                <Link className={cs.caseStudyFooterLink} href="/#portfolios">
                  Work
                </Link>
              </li>
              <li>
                <Link className={cs.caseStudyFooterLink} href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className={cs.caseStudyFooterLink} href="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className={cs.caseStudyFooterCol}>
            <p className={cs.caseStudyFooterColTitle}>Contact</p>
            <ul className={cs.caseStudyFooterList}>
              <li>
                <a
                  className={cs.caseStudyFooterLinkExternal}
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
                  className={cs.caseStudyFooterLinkExternal}
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Resume
                  <IconArrowOut />
                </a>
              </li>
              <li>
                <a className={cs.caseStudyFooterLinkExternal} href={MAIL}>
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
