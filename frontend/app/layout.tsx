import type { Metadata } from "next";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";
import { getProfile } from "@/services/api";
import "./globals.css";

export const metadata: Metadata = {
  title: "Desa Karangpapak – Portal Resmi Pemerintah Desa",
  description:
    "Portal resmi Desa Karangpapak, Kecamatan Cisolok, Kabupaten Sukabumi. Informasi layanan publik, berita, UMKM, dan edukasi masyarakat.",
  keywords: "Desa Karangpapak, Cisolok, Sukabumi, portal desa, layanan publik",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfile();
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Merriweather:wght@700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#fafaf8] text-[#1c2b1e] overflow-x-hidden">
        <MainLayoutWrapper profile={profile}>{children}</MainLayoutWrapper>
      </body>
    </html>
  );
}