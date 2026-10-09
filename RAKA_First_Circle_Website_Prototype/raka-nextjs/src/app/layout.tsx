import type { Metadata, Viewport } from "next";
import { Inter, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://raka.pk"),
  title: "RAKA First Circle | Your Private Invitation",
  description:
    "Enter RAKA First Circle. Join the private pre-launch list for thoughtful scalp and hair care, get the 7 Days to Better Hair-Care Habits guide, and hear about the launch first.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "RAKA First Circle — An Invitation to What Comes Next",
    description:
      "A new perspective on scalp and hair care. Discover the thinking behind RAKA and join the First Circle before launch.",
    url: "https://raka.pk/first-circle",
    siteName: "RAKA",
  },
  twitter: {
    card: "summary",
    title: "RAKA First Circle — An Invitation to What Comes Next",
    description:
      "A new perspective on scalp and hair care. Discover the thinking behind RAKA and join the First Circle before launch.",
  },
  icons: {
    icon: "/brand/raka-mark.png",
    apple: "/brand/raka-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-PK" className={`${inter.variable} ${bodoniModa.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
