"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Profile } from "@/services/api";

export default function MainLayoutWrapper({ children, profile }: { children: React.ReactNode; profile: Profile }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar profile={profile} />}
      {children}
      {!isAdmin && <Footer profile={profile} />}
    </>
  );
}
