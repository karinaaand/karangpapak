"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home,
  Building2,
  ClipboardList,
  Newspaper,
  BookOpen,
  Store,
  Phone,
  Menu,
  X,
} from "lucide-react";
import { Profile } from "@/services/api";

function VillageLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#2c73b9"/>
      <line x1="20" y1="30" x2="20" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="20" cy="10" rx="2" ry="4" fill="white" opacity="0.9"/>
      <line x1="16" y1="30" x2="14" y2="14" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cx="13.5" cy="13" rx="1.5" ry="3.5" fill="white" opacity="0.7" transform="rotate(-15 13.5 13)"/>
      <line x1="24" y1="30" x2="26" y2="14" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cx="26.5" cy="13" rx="1.5" ry="3.5" fill="white" opacity="0.7" transform="rotate(15 26.5 13)"/>
      <line x1="10" y1="30" x2="30" y2="30" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

const links = [
  { href: "/"        as const, label: "Beranda", Icon: Home },
  { href: "/profile" as const, label: "Profil Desa",  Icon: Building2 },
  { href: "/layanan" as const, label: "Layanan Warga", Icon: ClipboardList },
  { href: "/berita"  as const, label: "Kabar Desa",  Icon: Newspaper },
  { href: "/edukasi" as const, label: "Edukasi Warga", Icon: BookOpen },
  { href: "/umkm"    as const, label: "UMKM",    Icon: Store },
  { href: "/kontak"  as const, label: "Hubungi Kami",  Icon: Phone },
];

export default function Navbar({ profile }: { profile: Profile }) {
  const pathname   = usePathname();
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [showModal, setShowModal]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    
    const hasShown = sessionStorage.getItem("welcome-modal-shown");
    if (!hasShown) {
      const timer = setTimeout(() => {
        setShowModal(true);
        sessionStorage.setItem("welcome-modal-shown", "true");
      }, 500);
      return () => {
        window.removeEventListener("scroll", onScroll);
        clearTimeout(timer);
      };
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
          scrolled ? "bg-white shadow-md" : "bg-white/98"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {profile.logo_image_url ? (
              <img src={profile.logo_image_url} alt="Logo Desa" className="h-10 w-auto object-contain rounded" />
            ) : (
              <VillageLogo size={40} />
            )}
            <div>
              <p className="text-sm font-bold text-[#1e3a8a] leading-tight">{profile.village_name || "Desa Karangpapak"}</p>
              <p className="text-[10px] text-[#5a6e7f] leading-tight">
                {profile.district || "Kec. Cisolok"} · {profile.regency || "Kab. Sukabumi"}
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex md:items-center md:gap-8">
            {links.map(({ href, label, Icon }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-lg px-3 py-2 text-[13px] font-medium transition-all ${
                    active
                      ? "bg-[#eef4fc] text-[#2c73b9]"
                      : "text-[#334155] hover:bg-[#f0f7ff] hover:text-[#2c73b9]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <button
            className="flex md:hidden items-center justify-center p-2 rounded-lg hover:bg-[#eef4fc] text-[#2c73b9]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          </div>

          {mobileOpen && (
          <div className="bg-white px-4 pb-4 md:hidden">
            {links.map(({ href, label, Icon }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium mt-1 transition-all ${
                    active
                      ? "bg-[#eef4fc] text-[#2c73b9]"
                      : "text-[#334155] hover:bg-[#f0f7ff]"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </div>
        )}
        </div>
      </header>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-[#d2dfec] bg-white p-8 shadow-[0_24px_70px_rgba(44,115,185,0.18)] text-center flex flex-col items-center">
            
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-[#718a9e] hover:bg-[#f0f7ff] hover:text-[#0f2d4a] transition-all"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef4fc] text-[#2c73b9] mb-6 shadow-sm">
              <Building2 size={30} strokeWidth={1.5} />
            </div>

            <h2 className="text-2xl font-black text-[#0f2d4a] leading-snug px-2">
              Selamat Datang di Portal Resmi
            </h2>
            <h3 className="text-xl font-bold text-[#2c73b9] mt-1">
              {profile.village_name || "Desa Karangpapak"}
            </h3>

            <div className="mt-4 rounded-full bg-[#f4f8fc] border border-[#d2dfec] px-4.5 py-1.5 text-xs font-semibold text-[#2c73b9] tracking-wide">
              {profile.district || "Kecamatan Cisolok"} · {profile.regency || "Kabupaten Sukabumi"}
            </div>

            <p className="mt-5 text-[14px] leading-7 text-[#5a6e7f] px-1">
              Pusat informasi publik, layanan administrasi digital, berita pembangunan desa, direktori UMKM lokal, dan media edukasi masyarakat.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-8 w-full rounded-full bg-[#2c73b9] py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(44,115,185,0.15)] transition-all hover:bg-[#1e5a9a] hover:shadow-[0_12px_28px_rgba(44,115,185,0.25)] active:scale-[0.98]"
            >
              Mulai Menjelajah
            </button>
          </div>
        </div>
      )}
    </>
  );
}