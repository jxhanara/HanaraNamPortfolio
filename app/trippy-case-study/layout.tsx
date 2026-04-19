import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trippy — Case Study | Hanara Nam",
  description:
    "AI-powered travel platform for local-first discovery — case study by Hanara Nam.",
};

export default function TrippyCaseStudyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
