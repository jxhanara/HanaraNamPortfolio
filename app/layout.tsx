import type { Metadata } from "next";
import { Cormorant, DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["italic", "normal"],
  display: "swap",
});

/** Stand-in for Figma’s P22 Mackinac Book Italic (not on Google Fonts). */
const displaySerif = Cormorant({
  subsets: ["latin"],
  variable: "--font-display-serif",
  weight: ["500", "600"],
  style: ["italic", "normal"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hanara Nam — Portfolio",
  description:
    "Multidisciplinary designer crafting thoughtful interfaces for complex systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable} ${displaySerif.variable}`}
    >
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
