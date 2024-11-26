import type { Metadata } from "next";
import Header from "./components/Header";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Machine Name",
  description: "Welcome to Machine Name",
  keywords: "innovation, showcase, open source, projects, technology, creative solutions, paper take",
  authors: [
    { name: "Machine Name" }
  ],
  openGraph: {
    title: "Machine Name",
    description: "Welcome to Machine Name",
    url: 'https://www.machinename.dev',
    siteName: 'Machine Name',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const Id = process.env.GOOGLE_AD_SENSE_ID as string;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Head>
          {/* Add the Google AdSense script here */}
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${Id}`}
            crossOrigin="anonymous"
          ></script>
        </Head>
        <Header />
        {children}
      </body>
    </html>
  );
}
