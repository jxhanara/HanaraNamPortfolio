import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bumble Flow — Case Study | Hanara Nam",
  description:
    "From proximity alerts to intent-first coordination — speculative product design by Hanara Nam.",
};

export default function BumbleFlowCaseStudyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
