"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

const WORK_SECTION_ID = "trippy";

type WorkNavLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href?: string;
};

/** Scrolls to the first case study title with sticky-nav offset (same as hero pill). */
export function WorkNavLink({ onClick, href = "/#trippy", ...props }: WorkNavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;

        if (pathname === "/") {
          e.preventDefault();
          document.getElementById(WORK_SECTION_ID)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }}
    />
  );
}
