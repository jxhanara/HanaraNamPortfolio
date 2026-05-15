import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

type ProjectCardProps = {
  id?: string;
  title: string;
  description: ReactNode;
  dateLabel: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  external?: boolean;
};

export function ProjectCard({
  id,
  title,
  description,
  dateLabel,
  imageSrc,
  imageAlt,
  href,
  external,
}: ProjectCardProps) {
  const head = (
    <div className={styles.projectHead}>
      <div>
        <h2 id={id} className={styles.projectTitle}>
          {title}
        </h2>
        <div className={styles.projectDesc}>{description}</div>
      </div>
      <p className={styles.projectDate}>{dateLabel}</p>
    </div>
  );

  const thumb = (
    <div className={styles.thumbWrap}>
      <Image
        className={styles.thumb}
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 1037px) 100vw, 1037px"
        priority={title === "TRIPPY"}
      />
    </div>
  );

  if (href) {
    const content = (
      <>
        {head}
        {thumb}
      </>
    );

    if (external) {
      return (
        <a
          className={styles.projectCardLink}
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          {content}
        </a>
      );
    }

    return (
      <Link className={styles.projectCardLink} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <div className={styles.projectStack}>
      {head}
      {thumb}
    </div>
  );
}
