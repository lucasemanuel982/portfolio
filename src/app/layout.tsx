import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SuppressHydrationWarning from "@/components/SuppressHydrationWarning";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { FloatingElements } from "@/components/FloatingElements";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeColorProvider } from "@/contexts/ThemeColorContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-iota-nine-6xjhiwl0yw.vercel.app/"),
  title: "Lucas Emanuel - Desenvolvedor Full Stack | Portfolio",
  description: "Lucas Emanuel - Desenvolvedor Full Stack especializado em React, Next.js, Node.js e PHP. Conheça meus projetos e experiência profissional.",
  keywords: "Lucas Emanuel, desenvolvedor, programador, full stack, frontend, backend, React, Next.js, Node.js, PHP, portfolio",
  authors: [{ name: "Lucas Emanuel" }],
  creator: "Lucas Emanuel",
  publisher: "Lucas Emanuel",
  robots: "index, follow",
  alternates: {
    canonical: "https://portfolio-iota-nine-6xjhiwl0yw.vercel.app/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://portfolio-iota-nine-6xjhiwl0yw.vercel.app/",
    title: "Lucas Emanuel - Desenvolvedor Full Stack | Portfolio",
    description: "Lucas Emanuel - Desenvolvedor Full Stack especializado em React, Next.js, Node.js e PHP. Conheça meus projetos e experiência profissional.",
    siteName: "Portfolio de Lucas Emanuel",
    images: [
      {
        url: "/Perfil.png",
        width: 800,
        height: 600,
        alt: "Lucas Emanuel - Desenvolvedor Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Emanuel - Desenvolvedor Full Stack | Portfolio",
    description: "Lucas Emanuel - Desenvolvedor Full Stack especializado em React, Next.js, Node.js e PHP. Conheça meus projetos e experiência profissional.",
    images: ["/Perfil.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <ThemeColorProvider>
            <GoogleAnalytics />
            <SuppressHydrationWarning />
            <ScrollIndicator />
            <FloatingElements />
            {children}
          </ThemeColorProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
