import type { Metadata } from "next";
import { Poppins, IBM_Plex_Sans_Condensed, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const ibmPlexCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-ibm-plex-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BioQuest 2 — Science & Innovation Quest for Young India",
  description:
    "BioQuest 2nd Edition by iGEM IIT Bombay — a science and innovation quest for students across India. Top 50 students get a chance to visit IIT Bombay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${ibmPlexCondensed.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
