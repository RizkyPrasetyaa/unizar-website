import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Amiri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { UtilBar } from "@/components/layout/UtilBar";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { BottomBar } from "@/components/layout/BottomBar";
import { MockupPill } from "@/components/layout/MockupPill";
import { PageInteractivity } from "@/components/layout/PageInteractivity";
import { UnizarProviders } from "@/components/layout/UnizarProviders";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Universitas Islam Al-Azhar",
  description:
    "Universitas Islam Al-Azhar (UNIZAR) — kampus Rahmatan lil 'Alamin di jantung Kota Mataram, Nusa Tenggara Barat.",
  keywords: [
    "UNIZAR",
    "Universitas Islam Al-Azhar",
    "Mataram",
    "NTB",
    "Perguruan Tinggi",
  ],
  authors: [{ name: "Universitas Islam Al-Azhar" }],
  icons: {
    icon: "/unizar/logo144.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${amiri.variable} antialiased`}
      >
        <UnizarProviders>
          <a className="skip" href="#main">
            Lewati ke konten
          </a>
          <UtilBar />
          <SiteHeader />
          <MobileDrawer />
          <SearchOverlay />
          <main id="main" tabIndex={-1}>
            <PageInteractivity>{children}</PageInteractivity>
          </main>
          <SiteFooter />
          <BottomBar />
          <MockupPill />
        </UnizarProviders>
        <Toaster />
      </body>
    </html>
  );
}
