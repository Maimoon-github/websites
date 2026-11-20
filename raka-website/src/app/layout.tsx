import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Manrope, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const libreCaslonCondensed = localFont({
  src: [
    {
      path: "../fonts/libre-caslon-condensed-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/libre-caslon-condensed-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-raka-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-raka-interface",
  display: "swap",
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-raka-urdu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RAKA · Purely powerful",
  description:
    "Care for Pakistani hair, water and weather. Named after Mount Rakaposhi.",
  icons: {
    icon: "/brand/raka-logo.webp",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F6F0E8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${libreCaslonCondensed.variable} ${manrope.variable} ${notoNastaliqUrdu.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-raka-snow text-raka-ink font-interface selection:bg-raka-copper-wash selection:text-raka-ink">
        {children}
      </body>
    </html>
  );
}
