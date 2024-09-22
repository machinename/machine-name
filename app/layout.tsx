import type { Metadata } from "next";
import ProviderWrapper from "./providers/ProviderWrapper";
import Header from "./components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Machine Name",
  description: "Machine Name Projects",
  keywords: "innovation, showcase, open source, projects, technology, creative solutions, nesta note",
  authors: [
    { name: "Machine Name" }
  ],
  robots: "index, follow"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>
          <Header />
          {children}
        </ ProviderWrapper>
        <footer>
          <p>
            © 2024 Machine Name LLC. All Rights Reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
