"use client";

import { useState, useEffect, type KeyboardEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import { SiteNav } from "@/components/home";
import { SiteFooter } from "@/components/SiteFooter";
import portraitImage from "@/assets/aboutme/HanaraBW.jpeg";
import halmoniImage from "@/assets/aboutme/Grandma&Me.JPG";
import seoulImage from "@/assets/aboutme/Korea.jpeg";
import sketchImage from "@/assets/aboutme/Sketch.jpeg";
import ummaToruImage from "@/assets/aboutme/Mom&Toru.JPEG";
import hongKongImage from "@/assets/aboutme/HongKong2.JPG";
import familyImage from "@/assets/aboutme/FamilyPic.JPEG";
import bestFriendsPhoto from "@/assets/aboutme/Friends.JPG";
import thorImage from "@/assets/aboutme/Toru.JPEG";
import golfImage from "@/assets/aboutme/Family_golf.jpeg";
import styles from "./about.module.css";

const THOR_INSTAGRAM_URL =
  "https://www.instagram.com/toru.coton15?igsh=MXJocWNtNGI3ZmRjaw==";

type ArchiveItem = {
  id: string;
  title: string;
  meta: string;
  blurb: string;
  linkLabel?: string;
  link?: string;
  linkExternal?: boolean;
  captionLeft: string;
  captionRight: string;
  alt: string;
  imgSrc?: StaticImageData;
};

const ARCHIVE_ROTATE_MS = 6500;

const ARCHIVE: ArchiveItem[] = [
  {
    id: "family",
    title: "Renewed family pic since 2008",
    meta: "Family · My greatest happiness",
    blurb:
      "Mom, Dad, my brother, and Toru. The lineup that made me — and the people I'm building everything for.",
    captionLeft: "Family",
    captionRight: "Since 2008",
    alt: "Family portrait under a wooden pergola",
    imgSrc: familyImage,
  },
  {
    id: "friends",
    title: "The friends who filled every chapter with joy",
    meta: "UW · Spring '25",
    blurb:
      "The girls who've been there at my lowest, celebrate my wins louder than I did, and kept smiling through it all with their contagious laughter.",
    captionLeft: "Best friends",
    captionRight: "Grad '25",
    alt: "Three friends in white dresses on a staircase",
    imgSrc: bestFriendsPhoto,
  },
  {
    id: "gwanghwamun",
    title: "Gwanghwamun at night",
    meta: "Seoul, Korea · 2023",
    blurb:
      "Old palaces lit blue, my grandmother's old neighborhood a few blocks over. The first trip back as an adult — and the reason I keep saying 'designed for both halves of me.'",
    captionLeft: "Seoul",
    captionRight: "Gwanghwamun · 2023",
    alt: "Gwanghwamun palace lit up at night",
    imgSrc: seoulImage,
  },
  {
    id: "golf",
    title: "Golf with the fam",
    meta: "Family · Summer evenings",
    blurb:
      "Sunset rounds on the green. Mom putts straight, my brother reads breaks like books, my dad keeps score honestly. The best kind of therapy I know.",
    captionLeft: "Family",
    captionRight: "Golf · Summer evenings",
    alt: "Family playing golf on a green at golden hour",
    imgSrc: golfImage,
  },
  {
    id: "hongkong",
    title: "Hong Kong, in neon",
    meta: "Hong Kong · Fall '24",
    blurb:
      "Walking past Lin Heung Tea House at midnight, taxi idling, neon humming. The trip that reset what I wanted next.",
    captionLeft: "Traveling",
    captionRight: "Hong Kong, Fall '24",
    alt: "Hong Kong street with neon signs at night",
    imgSrc: hongKongImage,
  },
  {
    id: "thor",
    title: "Thor, the boss",
    meta: "Coton de Tulear · The boss · 11 yrs",
    blurb:
      "My most demanding client. Sets the morning standup at 6:30 am, gives feedback in barks, and has never missed a deadline (for treats).",
    linkLabel: "Thor on IG ↗",
    link: THOR_INSTAGRAM_URL,
    linkExternal: true,
    captionLeft: "The boss",
    captionRight: "Thor",
    alt: "Thor the Coton de Tulear in a field of daisies",
    imgSrc: thorImage,
  },
  {
    id: "sketchbook",
    title: "Sketchbook, since age 9",
    meta: "Drawing · Paper + iPad",
    blurb:
      "I drew before I designed. Halmoni couldn't read English but she could read pictures — that's where the empathy reflex started.",
    captionLeft: "Sketchbook",
    captionRight: "2018",
    alt: "An ink sketch of a girl holding a phone",
    imgSrc: sketchImage,
  },
];

const NOW_ITEMS: { k: string; v: string }[] = [
  { k: "Building", v: "an Interview Prep Tracker" },
  { k: "Reading", v: "I See You Like a Flower: Korean Poem" },
  { k: "Watching", v: "Hospital Playlist" },
  { k: "Listening", v: "Bruno Mars — Risk It All" },
  { k: "Drinking", v: "milk, always" },
];

export default function AboutPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isLovesHoverPaused, setLovesHoverPaused] = useState(false);

  function selectArchive(targetIndex: number) {
    setActiveIdx((prev) => {
      const wrapped = (targetIndex + ARCHIVE.length) % ARCHIVE.length;
      if (wrapped === prev) return prev;
      setIsSwapping(true);
      window.setTimeout(() => {
        setActiveIdx(wrapped);
        setIsSwapping(false);
      }, 180);
      return prev;
    });
  }

  useEffect(() => {
    if (isLovesHoverPaused) return undefined;
    const id = window.setInterval(() => {
      setActiveIdx((prev) => {
        const wrapped = (prev + 1) % ARCHIVE.length;
        if (wrapped === prev) return prev;
        setIsSwapping(true);
        window.setTimeout(() => {
          setActiveIdx(wrapped);
          setIsSwapping(false);
        }, 180);
        return prev;
      });
    }, ARCHIVE_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [isLovesHoverPaused, activeIdx]);

  const active = ARCHIVE[activeIdx];

  return (
    <div className={styles.aboutRoot}>
      <SiteNav />

      {/* HERO */}
      <section className={`${styles.section} ${styles.hero}`}>
        <div className={styles.wrap}>
          <div className={styles.heroTop}>
            <div className={styles.heroMeta}>
              <div>
                <span className={styles.dot} />
                <b>Currently in Pittsburgh, PA</b>
              </div>
              <div>UX / Product Designer · M.HCI &apos;26</div>
            </div>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.heroRow}>I am</span>
            <span className={`${styles.heroRow} ${styles.heroRowIndent}`}>
              <em>Hanara</em>
              <span className={styles.han}>하나라</span>
            </span>
          </h1>

          <div className={styles.heroBottom}>
            <p className={styles.heroTag}>
              like <span>panera</span> &nbsp;:D
            </p>
            <p className={`${styles.heroTag} ${styles.heroTagCenter}`}>
              designer, daughter,
              <br />
              K-drama enthusiast.
            </p>
            <div className={styles.heroScroll}>Scroll to read</div>
          </div>
        </div>
      </section>

      {/* 01 INTRO */}
      <section className={`${styles.section} ${styles.intro}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>
            <span className={styles.num}>01 —</span> Introduction
          </div>

          <div className={styles.introGrid}>
            <div className={styles.introCopy}>
              <p className={styles.lede}>
                I design products that make space for people whose voices have
                been <em>left out of the&nbsp;room.</em>
              </p>

              <p>
                <span className={styles.hiBadge}>Hi 👋</span>
                My name is Hanara — a self-driven UX/Product Designer currently
                earning my Master&apos;s in{" "}
                <b>Human–Computer Interaction at Carnegie Mellon University.</b>
              </p>

              <p>
                In my latest role, I was involved in a startup&apos;s core
                strategy and product development, collaborating closely with
                leadership to bring an <b>AI-powered leisure and travel app</b>{" "}
                to life.
              </p>

              <p>
                Over the past 2 years, I&apos;ve worked as a product designer,
                design lead, and research assistant — developing robust
                problem-solving skills and experience leading projects.
              </p>

              <p>
                When I&apos;m not designing, I like to watch K-dramas or
                animations like Studio Ghibli or Disney!!
              </p>
            </div>

            <div className={styles.portrait}>
              <Image
                src={portraitImage}
                alt="Hanara Nam portrait"
                className={styles.portraitImage}
                sizes="(max-width: 1000px) 90vw, 40vw"
                placeholder="blur"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* NOW / CURRENTLY */}
      <section className={`${styles.section} ${styles.nowBand}`}>
        <div className={`${styles.wrap} ${styles.nowWrap}`}>
          <div>
            <div className={styles.nowTitle}>
              <em className={styles.nowTitleNow}>Now</em>
            </div>
            <p className={styles.nowSub}>
              a snapshot of this week — refreshed often
            </p>
          </div>
          <div className={styles.nowGrid}>
            {NOW_ITEMS.map((item) => (
              <div key={item.k} className={styles.nowCell}>
                <span className={styles.k}>{item.k}</span>
                <em>{item.v}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 ORIGIN */}
      <section className={`${styles.section} ${styles.origin}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>
            <span className={styles.num}>02 —</span> How a grandmother taught me design
          </div>

          <div className={styles.originGrid}>
            <div className={styles.originImages}>
              <div className={`${styles.frame} ${styles.tiltL}`}>
                <Image
                  src={halmoniImage}
                  alt="Young Hanara with her grandmother in autumn"
                  fill
                  sizes="(max-width: 900px) 90vw, 380px"
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.frameTag}>With Halmoni · Autumn 2008</div>
              </div>
              <div className={`${styles.frame} ${styles.tiltR}`}>
                <Image
                  src={ummaToruImage}
                  alt="Hanara's mom kneeling on grass with Thor the dog"
                  fill
                  sizes="(max-width: 900px) 90vw, 380px"
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.frameTag}>Umma and Thor</div>
              </div>
            </div>

            <div className={styles.originText}>
              <h2 className={styles.originHeading}>
                How I got <em>into design</em> —
              </h2>
              <p>
                Growing up with my grandmother, who faced challenges with
                English, sparked my interest in customer experience and{" "}
                <strong>
                  advocating for underrepresented voices in technology.
                </strong>
              </p>
              <p>
                Using a mix of Korean language and drawings to communicate with
                her allowed me to explore my artistic side.
              </p>
              <p>
                Additionally, witnessing my mother&apos;s impactful work as a UX
                designer inspired me to pursue a similar path. My goal is to{" "}
                <strong>
                  leverage my emotions, design skills, and problem-solving
                  abilities
                </strong>{" "}
                to create an <strong>inclusive environment</strong> where
                individuals can be their <strong>authentic selves.</strong>
              </p>

              <blockquote className={styles.pullquote}>
                Design, for me, started as a way to translate for someone I
                loved.
                <cite>— what I&apos;d say if someone asked</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 03 LISTS */}
      <section className={`${styles.section} ${styles.lists}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>
            <span className={styles.num}>03 —</span> A small inventory of self
          </div>

          <div className={styles.listsGrid}>
            <div className={styles.listBlock}>
              <h3>
                <em>I&apos;m</em> —
              </h3>
              <ul>
                <li>
                  <span className={styles.idx}>01</span>
                  <span>
                    a <b>Korean-American</b> raised between Seoul and the
                    suburbs of Seattle
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>02</span>
                  <span>
                    an <b>INFJ</b> — <span className={styles.k}>I</span>ntrovert,
                    i<span className={styles.k}>N</span>tuitive,{" "}
                    <span className={styles.k}>F</span>eeling,{" "}
                    <span className={styles.k}>J</span>udging
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>03</span>
                  <span>
                    a past <b>K-pop star</b> (well, kind of)
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>04</span>
                  <span>
                    an <b>animal lover</b> — especially pandas and otters!
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>05</span>
                  <span>
                    a person that loves to <b>travel &amp; meet new people</b>
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>06</span>
                  <span>
                    a <b>flower enthusiast</b> — baby&apos;s breath in particular
                  </span>
                </li>
              </ul>
            </div>

            <div className={styles.listBlock}>
              <h3>
                <em>I appreciate</em> —
              </h3>
              <ul>
                <li>
                  <span className={styles.idx}>01</span>
                  <span>
                    <b>user-centered designs</b> that respect cognitive load
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>02</span>
                  <span>
                    being <b>inquisitive</b> and open to learning, always
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>03</span>
                  <span>
                    valuing and showing <b>respect for others</b>
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>04</span>
                  <span>
                    <b>contributing to the community</b> beyond the screen
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>05</span>
                  <span>
                    a great pun (see: <i>panera</i>)
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>06</span>
                  <span>the first cold morning of October</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 04 LOVES · featured + thumb rail (Layout D) */}
      <section className={`${styles.section} ${styles.loves}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>
            <span className={styles.num}>04 —</span> Things I love, in no order
          </div>

          <div
            className={styles.lovesStage}
            onMouseEnter={() => setLovesHoverPaused(true)}
            onMouseLeave={() => setLovesHoverPaused(false)}
          >
            <div className={styles.lovesLeft}>
              <div className={styles.lovesLeftTop}>
                <h2 className={styles.lovesHeadline}>
                  Things I keep <em>coming back to.</em>
                </h2>
                <p className={styles.lovesLead}>
                  A loose archive — films I rewatch, places that shaped me, the dog
                  that lets me work from home.
                </p>
              </div>

              <div
                className={`${styles.lovesDetail} ${isSwapping ? styles.lovesDetailSwapping : ""}`}
                aria-live="polite"
              >
                <div className={styles.lovesDetailHead}>
                  <span className={styles.dEyebrow}>Now viewing —</span>
                  <span className={styles.dCounter}>
                    <b>{String(activeIdx + 1).padStart(2, "0")}</b>{" "}
                    <i>/ {String(ARCHIVE.length).padStart(2, "0")}</i>
                  </span>
                </div>
                <h3 className={styles.dTitle}>{active.title}</h3>
                <p className={styles.dMeta}>{active.meta}</p>
                <p className={styles.dBlurb}>{active.blurb}</p>
                {active.linkLabel && active.link ? (
                  <a
                    className={styles.dLink}
                    href={active.link}
                    {...(active.linkExternal
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {active.linkLabel}
                  </a>
                ) : null}

                <div className={styles.lovesNav}>
                  <button
                    type="button"
                    className={styles.lovesNavBtn}
                    onClick={() => selectArchive(activeIdx - 1)}
                    aria-label="Previous photo"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className={styles.lovesNavBtn}
                    onClick={() => selectArchive(activeIdx + 1)}
                    aria-label="Next photo"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.lovesRight}>
              <figure
                className={`${styles.lovesFeatured} ${isSwapping ? styles.lovesFeaturedSwapping : ""}`}
                aria-label={active.alt}
              >
                {active.imgSrc ? (
                  <Image
                    key={active.id}
                    src={active.imgSrc}
                    alt={active.alt}
                    fill
                    sizes="(max-width: 1000px) 100vw, 58vw"
                    style={{
                      objectFit: "cover",
                      objectPosition:
                        active.id === "gwanghwamun" || active.id === "golf"
                          ? "50% 75%"
                          : active.id === "friends"
                            ? "50% 22%"
                            : "50% 50%",
                    }}
                    priority={activeIdx === 0}
                  />
                ) : (
                  <div className={styles.imgPlaceholder}>{active.title}</div>
                )}
                <figcaption className={styles.lovesFeaturedCap}>
                  {active.captionLeft}
                  {"\u00a0·\u00a0"}
                  {active.captionRight}
                </figcaption>
              </figure>

              <div className={styles.lovesThumbs}>
                {ARCHIVE.filter((_, i) => i !== activeIdx)
                  .slice(0, 5)
                  .map((item) => {
                    const realIdx = ARCHIVE.findIndex((p) => p.id === item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={styles.lovesThumb}
                        onClick={() => selectArchive(realIdx)}
                        onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
                          if (e.key === "ArrowRight") {
                            e.preventDefault();
                            selectArchive(activeIdx + 1);
                          } else if (e.key === "ArrowLeft") {
                            e.preventDefault();
                            selectArchive(activeIdx - 1);
                          }
                        }}
                        aria-label={`View ${item.title}`}
                      >
                        {item.imgSrc ? (
                          <Image
                            key={item.id}
                            src={item.imgSrc}
                            alt=""
                            fill
                            sizes="(max-width: 1000px) 33vw, 12vw"
                            style={{
                              objectFit: "cover",
                              objectPosition:
                                item.id === "gwanghwamun" || item.id === "golf"
                                  ? "50% 75%"
                                  : item.id === "friends"
                                    ? "50% 22%"
                                    : "50% 50%",
                            }}
                          />
                        ) : null}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
