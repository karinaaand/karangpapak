import Link from "next/link";
import { MapPin, Mail, Phone, ChevronRight, Heart } from "lucide-react";
import { Profile } from "@/services/api";

function VillageLogo() {
  return (
    <svg width="38" height="38" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="rgba(255,255,255,0.15)"/>
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

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="mt-16 bg-[#0f2d4a]">
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-3">

          <div>
            <div className="flex items-center gap-3">
              {profile.logo_image_url ? (
                <img src={profile.logo_image_url} alt="Logo Desa" className="h-10 w-auto object-contain rounded" />
              ) : (
                <VillageLogo />
              )}
              <div>
                <p className="font-bold text-white text-sm leading-tight">{profile.village_name || "Desa Karangpapak"}</p>
                <p className="text-[11px] text-[#a5f3fc] leading-tight">
                  {profile.district || "Kec. Cisolok"} · {profile.regency || "Kab. Sukabumi"}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#b0c4de]">
              Portal resmi pemerintah {profile.village_name || "Desa Karangpapak"} untuk menyajikan informasi publik,
              layanan administrasi, berita, UMKM, dan edukasi masyarakat.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#a5f3fc]">
              Tautan Cepat
            </h3>
            <div className="mt-4 flex flex-col gap-2.5">
              {[
                { href: "/",        label: "Beranda" },
                { href: "/profile", label: "Profil Desa" },
                { href: "/layanan", label: "Layanan Warga" },
                { href: "/berita",  label: "Kabar Desa" },
                { href: "/edukasi", label: "Edukasi Warga" },
                { href: "/umkm",    label: "UMKM" },
                { href: "/kontak",  label: "Hubungi Kami" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  className="flex items-center gap-1.5 text-sm text-[#b0c4de] hover:text-[#e8a020] transition-colors group"
                >
                  <ChevronRight
                    size={12}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#e8a020]"
                  />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#a5f3fc]">
              Kontak Kami
            </h3>
            <div className="mt-4 space-y-3 text-sm text-[#b0c4de]">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                <p>{profile.address || "Desa Karangpapak, Kecamatan Cisolok, Kabupaten Sukabumi, Jawa Barat"}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="flex-shrink-0" />
                <p>info@karangpapak.desa.id</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="flex-shrink-0" />
                <p>0266-000000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0b1f33] py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center text-xs text-[#8da0b6]">
          <p>© 2026 Pemerintah {profile.village_name || "Desa Karangpapak"}. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}