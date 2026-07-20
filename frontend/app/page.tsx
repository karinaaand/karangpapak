import { ArrowRight, Users, Home, Store, PhoneCall } from "lucide-react";
import Link from "next/link";
import CardBerita from "@/components/CardBerita";
import Hero from "@/components/Hero";
import StatCard from "@/components/StatCard";
import { getBerita, getLayanan, getProfile, getUmkm } from "@/services/api";

export default async function HomePage() {
  const [profile, beritaResponse, umkmResponse, layananResponse] = await Promise.all([
    getProfile(),
    getBerita(1, 3),
    getUmkm(1, 6),
    getLayanan(1, 2),
  ]);

  const berita = beritaResponse?.data ?? [];
  const layanan = layananResponse?.data ?? [];
  const umkmCount = umkmResponse?.total ?? 0;
  const beritaTotal = beritaResponse?.total ?? 0;
  const villageLocation = [profile?.district, profile?.regency, profile?.province]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="overflow-hidden bg-[#f8fafc] min-h-screen">
      <Hero profile={profile} />

      <section className="relative z-10 -mt-10 px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          <StatCard
            icon={<Users size={24} strokeWidth={1.8} />}
            label="Total Penduduk"
            value={String(profile.population_total ?? 0)}
            description="Data kependudukan terkini untuk mendukung pelayanan publik yang terarah."
          />
          <StatCard
            icon={<Home size={24} strokeWidth={1.8} />}
            label="Jumlah Keluarga"
            value={String(profile.families_total ?? 0)}
            description="Data keluarga membantu perencanaan program sosial and administrasi kependudukan."
          />
          <StatCard
            icon={<Store size={24} strokeWidth={1.8} />}
            label="UMKM Desa"
            value={String(profile.umkm_total ?? umkmCount)}
            description="Potensi usaha lokal yang terus tumbuh dan menjadi penggerak ekonomi warga."
          />
        </div>
      </section>


      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 items-stretch">
          <div className="relative overflow-hidden rounded-[28px] border border-[#d2dfec] bg-white p-8 shadow-[0_12px_35px_rgba(44,115,185,0.04)] sm:p-10 h-full flex flex-col">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#d2dfec] bg-[#f4f8fc] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2c73b9] self-start">
              Profil Singkat Desa
            </p>
            <h2 className="mt-5 max-w-xl text-3xl font-extrabold leading-tight text-[#0f2d4a] sm:text-4xl">
              Mengenal Lebih Dekat Desa Karangpapak dan Potensi Warganya
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#5a6e7f] sm:text-[15px] mb-8 line-clamp-4">
              {profile.description ??
                "Desa Karangpapak merupakan desa pesisir yang terletak di Kecamatan Cisolok, Kabupaten Sukabumi, Jawa Barat. Dikenal dengan keindahan alam pantai serta potensi pertanian dan UMKM yang melimpah, kami berkomitmen untuk mewujudkan pelayanan publik yang cepat, transparan, dan prima bagi seluruh masyarakat."}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              <div className="rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#718a9e]">
                  Nama Desa
                </p>
                <p className="mt-2 text-lg font-bold text-[#0f2d4a]">{profile.village_name}</p>
              </div>
              <div className="rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#718a9e]">
                  Wilayah
                </p>
                <p className="mt-2 text-lg font-bold text-[#0f2d4a]">
                  {villageLocation || "Informasi wilayah belum tersedia"}
                </p>
              </div>
            </div>

            <Link
              href="/profile"
              className="mt-auto inline-flex items-center gap-2 rounded-full bg-[#2c73b9] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e5a9a] self-start"
            >
              Lihat profil lengkap
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="rounded-[28px] border border-[#d2dfec] bg-white p-8 shadow-[0_12px_35px_rgba(44,115,185,0.04)] sm:p-10 h-full flex flex-col">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#d2dfec] bg-[#f4f8fc] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2c73b9] self-start">
              Layanan Administrasi Warga
            </p>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#0f2d4a] sm:text-[32px]">
              {profile.service_banner_title ?? "Pelayanan Publik Digital Mandiri & Terpadu"}
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#5a6e7f] sm:text-[15px] mb-8">
              {profile.service_banner_description ??
                "Berbagai layanan administrasi dan kependudukan disajikan secara digital untuk kemudahan, kecepatan, dan kenyamanan seluruh warga Desa Karangpapak."}
            </p>

            <div className="space-y-3 mb-8">
              {layanan.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] p-4"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#eef4fc] text-sm font-bold text-[#2c73b9]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0f2d4a]">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#5a6e7f]">
                      {item.summary ?? "Panduan lengkap mengenai persyaratan administrasi, alur pengajuan, dan informasi operasional kantor desa."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/layanan"
              className="mt-auto inline-flex items-center gap-2 rounded-full border border-[#d2dfec] bg-white px-5 py-3 text-sm font-semibold text-[#2c73b9] transition-colors hover:bg-[#f4f8fc] hover:border-[#a8c3e0] self-start"
            >
              Jelajahi semua layanan
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>


      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-[#d2dfec] bg-white p-8 shadow-[0_12px_35px_rgba(44,115,185,0.04)] sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#eef4fc] bg-[#f4f8fc] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2c73b9]">
                Informasi Terbaru
              </p>
              <h2 className="mt-5 text-3xl font-extrabold text-[#0f2d4a] sm:text-4xl">
                Kabar & Pengumuman Resmi Desa Karangpapak
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#5a6e7f] sm:text-[15px]">
                Ikuti terus perkembangan pembangunan desa, kegiatan dinas pemerintah desa, serta pengumuman resmi terbaru langsung dari Desa Karangpapak.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#718a9e]">
                  Total Berita Terbit
                </p>
                <p className="mt-2 text-2xl font-extrabold text-[#0f2d4a]">{beritaTotal}</p>
              </div>
              <Link
                href="/berita"
                className="flex items-center justify-between rounded-2xl bg-[#2c73b9] px-5 py-4 text-white transition-colors hover:bg-[#1e5a9a]"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d2e2f5]">
                    Arsip Berita
                  </p>
                  <p className="mt-2 text-base font-bold">Lihat semua berita</p>
                </div>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            {berita.map((item) => (
              <CardBerita key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>


      <section className="px-4 py-8 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 rounded-[32px] border border-[#d2dfec] bg-white p-8 shadow-[0_12px_35px_rgba(44,115,185,0.04)] lg:grid-cols-[0.95fr_1.05fr] lg:items-center sm:p-10">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#d2dfec] bg-[#f4f8fc] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2c73b9]">
              Akses Cepat
            </p>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#0f2d4a] sm:text-4xl">
              Pusat Integrasi Informasi Kependudukan & Publik
            </h2>
            <p className="mt-4 text-sm leading-8 text-[#5a6e7f] sm:text-[15px]">
              Portal web Desa Karangpapak ini dirancang untuk mempermudah akses informasi publik bagi seluruh warga masyarakat, pelaku usaha, wisatawan, serta pihak yang berkepentingan.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-1">
            <Link
              href="/kontak"
              className="rounded-[24px] border border-[#d2dfec] bg-[#f4f8fc] p-5 transition-colors hover:border-[#2c73b9]/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8a020] text-white">
                <PhoneCall size={20} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#0f2d4a]">Hubungi Kami</h3>
              <p className="mt-2 text-sm leading-7 text-[#5a6e7f]">
                Temukan alamat kantor, email, nomor telepon, dan jalur komunikasi resmi desa.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
