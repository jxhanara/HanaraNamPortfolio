import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Context Switching — UI for AI | Hanara Nam",
  description:
    "How might AI interfaces support re-entry, memory, and momentum across interrupted work? Case study by Hanara Nam.",
};

export default function UiForAiCaseStudyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
