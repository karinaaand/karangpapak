import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Profile } from "@/services/api";

type HeroProps = {
  profile: Profile;
};

export default function Hero({ profile }: HeroProps) {
  const villageLocation = [profile.district, profile.regency, profile.province]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="relative overflow-hidden bg-[#0f2d4a]">
      {profile.hero_image_url ? (
        <Image
          src={profile.hero_image_url}
          alt={profile.village_name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.15 }}
          unoptimized
        />
      ) : null}

      <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div>
          <h1 className="text-2xl font-extrabold leading-[1.2] text-white sm:text-3xl md:text-4xl lg:text-[44px] md:whitespace-nowrap">
            Selamat Datang di Portal Resmi <span className="text-[#f4c15d]">{profile.village_name}</span>
          </h1>

          <p className="mt-6 mx-auto max-w-3xl text-base leading-8 text-[#d2e2f5] sm:text-lg">
            Portal resmi {profile.village_name} sebagai pusat informasi publik, layanan administrasi, promosi UMKM desa, dan edukasi masyarakat.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/layanan"
              className="inline-flex items-center gap-2 rounded-full bg-[#e8a020] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#c8861a]"
            >
              Layanan Publik
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/20"
            >
              Profil Desa
            </Link>
          </div>
        </div>

        <div className="mt-16 mx-auto max-w-3xl rounded-[32px] border border-[#d2dfec] bg-white p-5 shadow-[0_18px_45px_rgba(44,115,185,0.06)]">
          <div className="rounded-[26px] bg-[#f4f8fc] p-6 text-left sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2c73b9] text-center">
              Sekilas Desa
            </p>
            
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-[#d2dfec] bg-white p-4 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#718a9e]">
                  Wilayah
                </p>
                <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-[#0f2d4a]">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[#2c73b9]" />
                  <span>{villageLocation || "Kecamatan Cisolok, Sukabumi"}</span>
                </p>
              </div>

              <div className="rounded-2xl border border-[#d2dfec] bg-white p-4 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#718a9e]">
                  Kepala Desa
                </p>
                <p className="mt-2 text-sm font-bold text-[#0f2d4a]">
                  {profile.head_name || "Belum diperbarui"}
                </p>
                <p className="mt-0.5 text-xs text-[#5a6e7f]">
                  {profile.head_title || "Pemerintah Desa"}
                </p>
              </div>

              <div className="rounded-2xl border border-[#d2dfec] bg-white p-4 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#718a9e]">
                  Kode Pos
                </p>
                <p className="mt-2 text-sm font-bold text-[#0f2d4a]">
                  {profile.postal_code || "Belum tersedia"}
                </p>
                <p className="mt-0.5 text-xs text-[#5a6e7f]">{profile.village_name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
