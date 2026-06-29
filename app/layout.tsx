import type { Metadata } from "next";
import { Caveat, Cormorant, DM_Sans, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LeaveAMarkRoot } from "@/components/leaveAMark/LeaveAMarkRoot";
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

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hanaranam.com"),
  title: "Hanara Nam — Portfolio",
  description:
    "Multidisciplinary designer crafting thoughtful interfaces for complex systems.",
  icons: {
    icon: "/images/namelogo.png",
  },
  openGraph: {
    title: "Hanara Nam — Portfolio",
    description:
      "Multidisciplinary designer crafting thoughtful interfaces for complex systems.",
    url: "https://www.hanaranam.com",
    siteName: "Hanara Nam",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanara Nam — Portfolio",
    description:
      "Multidisciplinary designer crafting thoughtful interfaces for complex systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable} ${displaySerif.variable} ${caveat.variable}`}
    >
      <head>
        {/* Mark mounts client-side after hydration; warming the sprite in cache
            avoids a visible pop-in when the launcher/intro first paints. */}
        <link rel="preload" as="image" href="/images/leaveamark.png" />
      </head>
      <body className={dmSans.className}>
        <LeaveAMarkRoot>{children}</LeaveAMarkRoot>
        <Analytics />
      </body>
    </html>
  );
}
