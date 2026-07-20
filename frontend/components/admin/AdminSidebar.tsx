"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/api";
import {
  Home,
  Building2,
  Compass,
  ClipboardList,
  Newspaper,
  Image as ImageIcon,
  BookOpen,
  Store,
  Phone,
  Users,
  LogOut,
  Wheat,
} from "lucide-react";

const links = [
  {
    href: "/admin/dashboard" as const,
    label: "Beranda",
    desc: "Tampilan & portal utama",
    Icon: Home,
  },
  {
    href: "/admin/profile" as const,
    label: "Profil Desa",
    desc: "Visi misi, Kades & sejarah",
    Icon: Building2,
  },
  {
    href: "/admin/geografis" as const,
    label: "Geografis (Peta GIS)",
    desc: "Lokasi & fasilitas desa",
    Icon: Compass,
  },
  {
    href: "/admin/layanan" as const,
    label: "Layanan Warga",
    desc: "Surat & administrasi desa",
    Icon: ClipboardList,
  },
  {
    href: "/admin/berita" as const,
    label: "Kabar & Berita Desa",
    desc: "Pengumuman & artikel berita",
    Icon: Newspaper,
  },
  {
    href: "/admin/galeri" as const,
    label: "Galeri Dokumentasi",
    desc: "Foto kegiatan & album desa",
    Icon: ImageIcon,
  },
  {
    href: "/admin/edukasi" as const,
    label: "Edukasi Warga",
    desc: "Panduan stunting, gizi & edukasi",
    Icon: BookOpen,
  },
  {
    href: "/admin/umkm" as const,
    label: "UMKM Lokal",
    desc: "Katalog usaha & produk lokal",
    Icon: Store,
  },
  {
    href: "/admin/kontak" as const,
    label: "Hubungi Kami",
    desc: "Kontak kantor & peta lokasi",
    Icon: Phone,
  },
  {
    href: "/admin/users" as const,
    label: "Pengelola Akun",
    desc: "Manajemen admin & operator",
    Icon: Users,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    async function loadUser() {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("admin_user");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setUser(parsed);
            
            try {
              const users = await getAllUsers();
              const latestUser = users.find((u) => u.id === parsed.id);
              if (latestUser && latestUser.avatar !== parsed.avatar) {
                setUser(latestUser);
                localStorage.setItem("admin_user", JSON.stringify(latestUser));
              }
            } catch {
            }
          } catch {}
        }
      }
    }
    
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  function doLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
    }
    router.push("/admin/login");
  }

  return (
    <aside className="h-full bg-[#0f2d4a] flex flex-col">
      <div className="px-4 md:px-6 py-5 flex justify-center md:justify-start">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 flex-shrink-0">
            <Wheat size={20} className="text-[#38bdf8]" />
          </div>
          <div className="hidden md:block">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#93c5fd]">
              Pengaturan Web Publik
            </p>
            <h1 className="text-base font-extrabold text-white leading-tight">
              Desa Karangpapak
            </h1>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-2 md:px-3 py-4 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-[#64748b] hidden md:block">
          Menu Pengelolaan Web Publik
        </p>
        {links.map(({ href, label, desc, Icon }) => {
          const active = pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-center md:justify-start gap-3 rounded-xl p-3 md:px-3 md:py-2.5 transition-all group ${
                active
                  ? "bg-[#2c73b9] text-white shadow-md shadow-[#2c73b9]/15"
                  : "text-[#cbd5e1] hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon
                size={18}
                className={`flex-shrink-0 ${active ? "text-white" : "text-[#94a3b8] group-hover:text-white"}`}
              />
              <div className="min-w-0 hidden md:block">
                <p className={`text-xs font-bold leading-tight truncate ${active ? "text-white" : ""}`}>
                  {label}
                </p>
                <p className={`text-[10px] leading-tight mt-0.5 truncate ${
                  active ? "text-[#93c5fd]" : "text-[#64748b] group-hover:text-[#94a3b8]"
                }`}>
                  {desc}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 md:p-4 pb-6 md:pb-8 mt-auto border-t border-white/5">
        <div className="flex items-center gap-3 w-full rounded-xl p-2 transition-all hover:bg-white/5">
          <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2c73b9] text-xs font-bold text-white border-2 border-white/10">
            {user?.avatar ? (
              <img 
                src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "http://127.0.0.1:8000"}/storage/${user.avatar}`} 
                alt={user.name} 
                className="h-full w-full object-cover" 
              />
            ) : (
              <span>
                {user?.name
                  ? user.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
                  : "OP"}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0 hidden md:block text-left">
            <p className="text-xs font-bold text-white truncate">
              {user?.name || "Operator Desa"}
            </p>
            <p className="text-[10px] text-[#94a3b8] truncate">
              {user?.email || "operator@karangpapak.desa.id"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="text-[#94a3b8] hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors hidden md:block"
            title="Keluar"
          >
            <LogOut size={18} />
          </button>
        </div>
        
        <button
          type="button"
          onClick={() => setShowLogoutConfirm(true)}
          className="md:hidden mt-2 w-full flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3 text-white hover:bg-white/10"
        >
          <LogOut size={16} />
        </button>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#0f2d4a] border border-white/10 shadow-2xl p-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20 text-red-400 mb-5">
              <LogOut size={28} className="-ml-1" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Konfirmasi Keluar</h3>
            <p className="text-sm text-[#94a3b8] mb-6 px-2">
              Apakah Anda yakin ingin keluar dari panel pengelola Karangpapak? Anda harus login kembali untuk masuk.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 rounded-xl bg-white/10 border border-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-all"
              >
                Batal
              </button>
              <button
                onClick={doLogout}
                className="flex-1 rounded-xl bg-red-500 shadow-lg shadow-red-500/25 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-all"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}