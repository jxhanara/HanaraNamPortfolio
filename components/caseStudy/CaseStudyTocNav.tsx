"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import cs from "./caseStudy.module.css";

type TocItem = { id: string; label: string };

function getScrollLine() {
  return window.scrollY + Math.min(180, window.innerHeight * 0.22);
}

export function CaseStudyTocNav({ items }: { items: readonly TocItem[] }) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "overview");

  const updateActive = useCallback(() => {
    const line = getScrollLine();
    let current = ids[0];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top <= line) current = id;
    }
    if (current) setActiveId(current);
  }, [ids]);

  useEffect(() => {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive]);

  return (
    <nav className={cs.toc} aria-label="On this page">
      {items.map((item) => (
        <a
          key={item.id}
          className={item.id === activeId ? cs.tocLinkActive : cs.tocLink}
          href={`#${item.id}`}
          onClick={() => setActiveId(item.id)}
        >
          {item.label}
        </a>
      ))}
      <a className={cs.tocLinkBackTop} href="#top">
        Back to top ↑
      </a>
    </nav>
  );
}
