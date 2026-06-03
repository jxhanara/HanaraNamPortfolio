import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NASA (MHCI Capstone) | Hanara Nam",
  description:
    "Designing tools for asynchronous coordination on Mars missions — MHCI Capstone case study by Hanara Nam. Coming soon.",
};

export default function NasaCaseStudyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
