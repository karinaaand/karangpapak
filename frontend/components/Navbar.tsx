"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
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
  MapPin,
  ImageIcon,
  ChevronDown,
  Sparkles,
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

export default function Navbar({ profile }: { profile: Profile }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const [kabarDropdownOpen, setKabarDropdownOpen] = useState(false);
  const [mobileKabarOpen, setMobileKabarOpen] = useState(false);
  const kabarDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (kabarDropdownRef.current && !kabarDropdownRef.current.contains(event.target as Node)) {
        setKabarDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    
    const hasShown = sessionStorage.getItem("welcome-modal-shown");
    if (!hasShown) {
      setShowModal(true);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCloseModal = () => {
    sessionStorage.setItem("welcome-modal-shown", "true");
    setShowModal(false);
  };

  const isProfileActive =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/geografis") ||
    pathname.startsWith("/peta") ||
    pathname.startsWith("/layanan");

  const isKabarActive =
    pathname.startsWith("/berita") ||
    pathname.startsWith("/galeri");

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-[#d2dfec] bg-white p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 rounded-full p-2 text-[#718a9e] hover:bg-[#f4f8fc] hover:text-[#0f2d4a] transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef4fc] text-[#2c73b9] shadow-inner">
                {profile.logo_image_url ? (
                  <img src={profile.logo_image_url} alt="Logo Desa" className="h-10 w-auto object-contain" />
                ) : (
                  <VillageLogo size={36} />
                )}
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d2dfec] bg-[#f4f8fc] px-3.5 py-1 text-xs font-bold text-[#2c73b9]">
                <Sparkles size={14} />
                Selamat Datang
              </span>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f2d4a]">
                Portal Resmi {profile.village_name || "Desa Karangpapak"}
              </h3>
              
              <p className="text-xs sm:text-sm text-[#5a6e7f] leading-relaxed max-w-md">
                Platform digital terpadu untuk informasi publik, layanan kependudukan, peta GIS geografis, kabar berita desa, UMKM lokal, dan edukasi warga.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="rounded-xl border border-[#d2dfec] bg-[#f4f8fc] p-3 text-center">
                <span className="font-bold text-[#2c73b9] block">{profile.district || "Kec. Cisolok"}</span>
                <span className="text-[11px] text-[#5a6e7f]">Kecamatan</span>
              </div>
              <div className="rounded-xl border border-[#d2dfec] bg-[#f4f8fc] p-3 text-center">
                <span className="font-bold text-[#2c73b9] block">{profile.regency || "Kab. Sukabumi"}</span>
                <span className="text-[11px] text-[#5a6e7f]">Kabupaten</span>
              </div>
            </div>

            <button
              onClick={handleCloseModal}
              className="w-full rounded-full bg-[#2c73b9] py-3 text-xs font-bold text-white shadow-lg hover:bg-[#1e5a9a] transition-all"
            >
              Mulai Menjelajah Portal
            </button>
          </div>
        </div>
      )}

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_4px_25px_rgba(44,115,185,0.08)] border-b border-[#edf3f9]"
            : "bg-white border-b border-[#edf2f7]"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              {profile.logo_image_url ? (
                <img
                  src={profile.logo_image_url}
                  alt="Logo Desa"
                  className="h-10 w-auto object-contain rounded transition-transform group-hover:scale-105"
                />
              ) : (
                <VillageLogo />
              )}
              <div>
                <p className="text-sm font-bold text-[#1e3a8a] leading-tight group-hover:text-[#2c73b9] transition-colors">
                  {profile.village_name || "Desa Karangpapak"}
                </p>
                <p className="text-[10px] text-[#5a6e7f] leading-tight">
                  {profile.district || "Kec. Cisolok"} · {profile.regency || "Kab. Sukabumi"}
                </p>
              </div>
            </Link>

            <nav className="hidden lg:flex lg:items-center lg:gap-1.5">
              <Link
                href="/"
                className={`rounded-lg px-3 py-2 text-[13px] font-medium transition-all flex items-center gap-1.5 ${
                  pathname === "/"
                    ? "bg-[#eef4fc] text-[#2c73b9] font-semibold"
                    : "text-[#334155] hover:bg-[#f0f7ff] hover:text-[#2c73b9]"
                }`}
              >
                <Home size={14} className="text-[#2c73b9]" />
                <span>Beranda</span>
              </Link>

              <div
                className="relative"
                ref={profileDropdownRef}
                onMouseEnter={() => setProfileDropdownOpen(true)}
                onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className={`rounded-lg px-3 py-2 text-[13px] font-medium transition-all flex items-center gap-1 ${
                    isProfileActive
                      ? "bg-[#eef4fc] text-[#2c73b9] font-semibold"
                      : "text-[#334155] hover:bg-[#f0f7ff] hover:text-[#2c73b9]"
                  }`}
                >
                  <Building2 size={14} className="text-[#2c73b9]" />
                  <span>Profil Desa</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute left-0 top-full pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="overflow-hidden rounded-2xl border border-[#1e293b]/10 bg-[#18181b] p-2.5 shadow-2xl text-white backdrop-blur-md">
                      <Link
                        href="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-[#27272a]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#27272a] text-white group-hover:bg-[#2c73b9] group-hover:text-white transition-colors">
                          <Building2 size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-[#60a5fa]">Tentang Profil Desa</p>
                          <p className="mt-0.5 text-[11px] text-[#a1a1aa] leading-snug">
                            Sejarah, visi misi, identitas, & struktur desa
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/geografis"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-[#27272a]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#27272a] text-white group-hover:bg-[#2c73b9] group-hover:text-white transition-colors">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-[#60a5fa]">Geografis & Peta GIS</p>
                          <p className="mt-0.5 text-[11px] text-[#a1a1aa] leading-snug">
                            Peta GIS wilayah, batas desa, & koordinat publik
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/layanan"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-[#27272a]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#27272a] text-white group-hover:bg-[#2c73b9] group-hover:text-white transition-colors">
                          <ClipboardList size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-[#60a5fa]">Layanan Warga</p>
                          <p className="mt-0.5 text-[11px] text-[#a1a1aa] leading-snug">
                            Layanan kependudukan & formulir surat desa
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="relative"
                ref={kabarDropdownRef}
                onMouseEnter={() => setKabarDropdownOpen(true)}
                onMouseLeave={() => setKabarDropdownOpen(false)}
              >
                <button
                  onClick={() => setKabarDropdownOpen(!kabarDropdownOpen)}
                  className={`rounded-lg px-3 py-2 text-[13px] font-medium transition-all flex items-center gap-1 ${
                    isKabarActive
                      ? "bg-[#eef4fc] text-[#2c73b9] font-semibold"
                      : "text-[#334155] hover:bg-[#f0f7ff] hover:text-[#2c73b9]"
                  }`}
                >
                  <Newspaper size={14} className="text-[#2c73b9]" />
                  <span>Kabar Desa</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${kabarDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {kabarDropdownOpen && (
                  <div className="absolute left-0 top-full pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="overflow-hidden rounded-2xl border border-[#1e293b]/10 bg-[#18181b] p-2.5 shadow-2xl text-white backdrop-blur-md">
                      <Link
                        href="/berita"
                        onClick={() => setKabarDropdownOpen(false)}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-[#27272a]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#27272a] text-white group-hover:bg-[#2c73b9] group-hover:text-white transition-colors">
                          <Newspaper size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-[#60a5fa]">Berita Desa</p>
                          <p className="mt-0.5 text-[11px] text-[#a1a1aa] leading-snug">
                            Kumpulan berita, artikel, dan pengumuman terbaru desa
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/galeri"
                        onClick={() => setKabarDropdownOpen(false)}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-[#27272a]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#27272a] text-white group-hover:bg-[#2c73b9] group-hover:text-white transition-colors">
                          <ImageIcon size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-[#60a5fa]">Galeri Desa</p>
                          <p className="mt-0.5 text-[11px] text-[#a1a1aa] leading-snug">
                            Dokumentasi foto kegiatan dan pembangunan desa
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/edukasi"
                className={`rounded-lg px-3 py-2 text-[13px] font-medium transition-all flex items-center gap-1.5 ${
                  pathname.startsWith("/edukasi")
                    ? "bg-[#eef4fc] text-[#2c73b9] font-semibold"
                    : "text-[#334155] hover:bg-[#f0f7ff] hover:text-[#2c73b9]"
                }`}
              >
                <BookOpen size={14} className="text-[#2c73b9]" />
                Edukasi Warga
              </Link>

              <Link
                href="/umkm"
                className={`rounded-lg px-3 py-2 text-[13px] font-medium transition-all flex items-center gap-1.5 ${
                  pathname.startsWith("/umkm")
                    ? "bg-[#eef4fc] text-[#2c73b9] font-semibold"
                    : "text-[#334155] hover:bg-[#f0f7ff] hover:text-[#2c73b9]"
                }`}
              >
                <Store size={14} className="text-[#2c73b9]" />
                <span>UMKM</span>
              </Link>

              <Link
                href="/kontak"
                className={`rounded-lg px-3 py-2 text-[13px] font-medium transition-all flex items-center gap-1.5 ${
                  pathname.startsWith("/kontak")
                    ? "bg-[#eef4fc] text-[#2c73b9] font-semibold"
                    : "text-[#334155] hover:bg-[#f0f7ff] hover:text-[#2c73b9]"
                }`}
              >
                <Phone size={14} className="text-[#2c73b9]" />
                <span>Hubungi Kami</span>
              </Link>
            </nav>

            <button
              className="flex lg:hidden items-center justify-center p-2 rounded-lg hover:bg-[#eef4fc] text-[#2c73b9]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {mobileOpen && (
            <div className="bg-white px-4 pb-6 pt-2 lg:hidden space-y-1 border-t border-[#edf2f7]">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#334155] hover:bg-[#f0f7ff]"
              >
                <Home size={18} className="text-[#2c73b9]" />
                Beranda
              </Link>

              <div className="rounded-xl border border-[#d2dfec] bg-[#f8fafc] p-2 mt-1">
                <button
                  onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm font-bold text-[#0f2d4a]"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 size={18} className="text-[#2c73b9]" />
                    <span>Profil Desa</span>
                  </div>
                  <ChevronDown size={16} className={`transition-transform ${mobileProfileOpen ? "rotate-180" : ""}`} />
                </button>

                {mobileProfileOpen && (
                  <div className="pl-4 pr-2 pt-2 space-y-1.5 border-t border-[#edf2f7] mt-1">
                    <Link
                      href="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg p-2 hover:bg-white text-xs font-semibold text-[#334155]"
                    >
                      <p className="text-[#2c73b9] font-bold">Tentang Profil Desa</p>
                      <p className="text-[10px] text-[#5a6e7f]">Sejarah, Visi Misi, Identitas Desa</p>
                    </Link>
                    <Link
                      href="/geografis"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg p-2 hover:bg-white text-xs font-semibold text-[#334155]"
                    >
                      <p className="text-[#2c73b9] font-bold">Geografis & Peta GIS</p>
                      <p className="text-[10px] text-[#5a6e7f]">Peta Wilayah, Batas & Koordinat</p>
                    </Link>
                    <Link
                      href="/layanan"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg p-2 hover:bg-white text-xs font-semibold text-[#334155]"
                    >
                      <p className="text-[#2c73b9] font-bold">Layanan Warga</p>
                      <p className="text-[10px] text-[#5a6e7f]">Layanan Administrasi Surat Menyurat</p>
                    </Link>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-[#d2dfec] bg-[#f8fafc] p-2 mt-1">
                <button
                  onClick={() => setMobileKabarOpen(!mobileKabarOpen)}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm font-bold text-[#0f2d4a]"
                >
                  <div className="flex items-center gap-2.5">
                    <Newspaper size={18} className="text-[#2c73b9]" />
                    <span>Kabar Desa</span>
                  </div>
                  <ChevronDown size={16} className={`transition-transform ${mobileKabarOpen ? "rotate-180" : ""}`} />
                </button>

                {mobileKabarOpen && (
                  <div className="pl-4 pr-2 pt-2 space-y-1.5 border-t border-[#edf2f7] mt-1">
                    <Link
                      href="/berita"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg p-2 hover:bg-white text-xs font-semibold text-[#334155]"
                    >
                      <p className="text-[#2c73b9] font-bold">Berita Desa</p>
                      <p className="text-[10px] text-[#5a6e7f]">Kumpulan berita, artikel, dan pengumuman</p>
                    </Link>
                    <Link
                      href="/galeri"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg p-2 hover:bg-white text-xs font-semibold text-[#334155]"
                    >
                      <p className="text-[#2c73b9] font-bold">Galeri Desa</p>
                      <p className="text-[10px] text-[#5a6e7f]">Dokumentasi foto kegiatan desa</p>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/edukasi"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#334155] hover:bg-[#f0f7ff]"
              >
                <BookOpen size={18} className="text-[#2c73b9]" />
                Edukasi Warga
              </Link>

              <Link
                href="/umkm"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#334155] hover:bg-[#f0f7ff]"
              >
                <Store size={18} className="text-[#2c73b9]" />
                UMKM Desa
              </Link>

              <Link
                href="/kontak"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#334155] hover:bg-[#f0f7ff]"
              >
                <Phone size={18} className="text-[#2c73b9]" />
                Hubungi Kami
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}