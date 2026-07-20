import { BadgeCheck, Building2, Sparkles, Compass, Target, BookOpen, User, MapPin, Mail, Map, ArrowRight } from "lucide-react";

import StatCard from "@/components/StatCard";
import { getProfile } from "@/services/api";

export default async function ProfilePage() {
  const profile = await getProfile();
  const villageLocation = [profile?.district, profile?.regency, profile?.province]
    .filter(Boolean)
    .join(", ");

  const infoList = [
    { label: "Nama Kepala Desa", value: profile?.head_name ?? "Belum diperbarui", icon: User },
    { label: "Wilayah", value: villageLocation || "Informasi wilayah belum tersedia", icon: MapPin },
    { label: "Kode Pos", value: profile?.postal_code ?? "Belum tersedia", icon: Mail },
    { label: "Alamat Kantor Desa", value: profile?.address ?? "Alamat kantor desa belum tersedia", icon: Map },
  ];

  function getYoutubeEmbedUrl(url: string) {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=0&showinfo=0&rel=0&modestbranding=1` : null;
  }
  
  const embedUrl = profile?.video_url ? getYoutubeEmbedUrl(profile.video_url) : null;

  return (
    <div className="bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_45%,#ffffff_100%)] min-h-screen">
      <section className="relative overflow-hidden bg-[#0f2d4a] min-h-[400px] flex items-center justify-center">
        {embedUrl && (
          <div className="absolute inset-0 z-0 pointer-events-none opacity-90">
            <iframe
              src={embedUrl}
              title="Video Profil Desa"
              className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] min-w-[1920px] min-h-[1080px] -translate-x-1/2 -translate-y-1/2"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <div className="absolute inset-0 bg-[#0f2d4a]/10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2d4a] via-transparent to-transparent"></div>
          </div>
        )}

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8 lg:pt-32 lg:pb-48 w-full">
          <div className="mx-auto flex max-w-4xl flex-col items-center">
            <h1 className="text-2xl font-extrabold leading-[1.2] text-white sm:text-3xl md:text-4xl lg:text-[44px] md:whitespace-nowrap drop-shadow-md">
              Profil {profile?.village_name ?? "Desa Karangpapak"}
            </h1>
            <p className="mt-6 mx-auto max-w-3xl text-base leading-8 text-[#d2e2f5] sm:text-lg drop-shadow">
              Mengenal lebih dekat sejarah, visi, misi, dan arah pembangunan desa dalam tampilan yang lebih rapi dan mudah dibaca.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-16 px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          <StatCard
            icon={<Building2 size={24} strokeWidth={1.8} />}
            label="Total Penduduk"
            value={String(profile.population_total ?? 0)}
            description="Gambaran jumlah warga yang menjadi dasar pelayanan dan pembangunan desa."
          />
          <StatCard
            icon={<BadgeCheck size={24} strokeWidth={1.8} />}
            label="Jumlah Keluarga"
            value={String(profile.families_total ?? 0)}
            description="Data keluarga membantu perencanaan program sosial dan administrasi kependudukan."
          />
          <StatCard
            icon={<Sparkles size={24} strokeWidth={1.8} />}
            label="UMKM Desa"
            value={String(profile.umkm_total ?? 0)}
            description="Potensi usaha masyarakat yang ikut memperkuat ekonomi lokal desa."
          />
        </div>
      </section>

      <section className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/geografis"
            className="group rounded-2xl border border-[#d2dfec] bg-white p-5 shadow-sm hover:border-[#2c73b9] hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef4fc] text-[#2c73b9] group-hover:bg-[#2c73b9] group-hover:text-white transition-colors">
                <MapPin size={22} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-extrabold text-[#0f2d4a] group-hover:text-[#2c73b9] transition-colors truncate">
                  Geografis & Peta GIS Desa
                </h4>
                <p className="text-xs text-[#5a6e7f] mt-0.5 line-clamp-1">
                  Peta digital wilayah, batas administratif, & titik sarana publik
                </p>
              </div>
            </div>
            <span className="shrink-0 pl-4 text-xs font-extrabold text-[#2c73b9] whitespace-nowrap flex items-center gap-1.5">
              <span>Lihat Peta</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </a>

          <a
            href="/layanan"
            className="group rounded-2xl border border-[#d2dfec] bg-white p-5 shadow-sm hover:border-[#2c73b9] hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef4fc] text-[#2c73b9] group-hover:bg-[#2c73b9] group-hover:text-white transition-colors">
                <Building2 size={22} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-extrabold text-[#0f2d4a] group-hover:text-[#2c73b9] transition-colors truncate">
                  Layanan Warga Desa
                </h4>
                <p className="text-xs text-[#5a6e7f] mt-0.5 line-clamp-1">
                  Panduan persyaratan administrasi & pelayanan surat kependudukan
                </p>
              </div>
            </div>
            <span className="shrink-0 pl-4 text-xs font-extrabold text-[#2c73b9] whitespace-nowrap flex items-center gap-1.5">
              <span>Buka Layanan</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </section>

      <section className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-[24px] border border-[#d2dfec] bg-[linear-gradient(135deg,#ffffff_0%,#f4f8fc_100%)] p-6 shadow-[0_10px_30px_rgba(44,115,185,0.03)] transition-all hover:-translate-y-1 hover:border-[#a8c3e0] hover:shadow-[0_14px_35px_rgba(44,115,185,0.06)] flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4fc] text-[#2c73b9] mb-3 shadow-sm">
              <Compass size={24} />
            </div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2c73b9]">Visi Desa</h3>
            <div className="mt-2.5 max-h-[140px] overflow-y-auto px-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#cbd5e1] [&::-webkit-scrollbar-track]:bg-transparent w-full">
              <p className="text-xs leading-6 text-[#475569] font-medium italic">
                &ldquo;{profile.vision ?? "Visi desa akan ditampilkan di sini setelah diperbarui melalui dashboard admin."}&rdquo;
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#d2dfec] bg-[linear-gradient(135deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_10px_30px_rgba(44,115,185,0.03)] transition-all hover:-translate-y-1 hover:border-[#a8c3e0] hover:shadow-[0_14px_35px_rgba(44,115,185,0.06)] flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4fc] text-[#2c73b9] mb-3 shadow-sm">
              <Target size={24} />
            </div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2c73b9]">Misi Desa</h3>
            <div className="mt-2.5 max-h-[140px] overflow-y-auto px-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#cbd5e1] [&::-webkit-scrollbar-track]:bg-transparent w-full">
              <p className="text-xs leading-6 text-[#475569] whitespace-pre-line">
                {profile.mission ?? "Misi desa akan ditampilkan di sini setelah diperbarui melalui dashboard admin."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 items-stretch">
          <div className="rounded-[24px] border border-[#d2dfec] bg-white p-6 shadow-[0_12px_35px_rgba(44,115,185,0.04)] transition-all hover:-translate-y-1 hover:border-[#a8c3e0] hover:shadow-[0_16px_40px_rgba(44,115,185,0.08)] sm:p-8 h-full">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#eef4fc] text-[#2c73b9]">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2c73b9]">Sejarah Desa</h3>
                  <h4 className="text-lg font-extrabold text-[#0f2d4a] mt-0.5">Asal usul & perkembangan Desa</h4>
                </div>
              </div>
              <div className="max-h-[280px] overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#cbd5e1] [&::-webkit-scrollbar-track]:bg-transparent">
                <p className="text-sm leading-7 text-[#5a6e7f] whitespace-pre-line">
                  {profile.history ?? profile.description ?? "Sejarah desa akan ditampilkan di sini setelah dikelola dari dashboard admin."}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#d2dfec] bg-white p-6 shadow-[0_12px_35px_rgba(44,115,185,0.04)] transition-all hover:-translate-y-1 hover:border-[#a8c3e0] hover:shadow-[0_16px_40px_rgba(44,115,185,0.08)] sm:p-8 h-full">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#eef4fc] text-[#2c73b9]">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2c73b9]">Informasi Desa</h3>
                  <h4 className="text-lg font-extrabold text-[#0f2d4a] mt-0.5">Ringkasan Identitas Pemerintahan</h4>
                </div>
              </div>

              <div className="space-y-3">
                {infoList.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-3 rounded-xl border border-[#eef4fc] bg-[#f4f8fc]/40 p-3 transition-all hover:bg-[#eef4fc]/40 hover:border-[#a8c3e0]">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#eef4fc] text-[#2c73b9]">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#718a9e]">{label}</p>
                      <p className="mt-0.5 text-xs font-semibold text-[#0f2d4a] leading-relaxed">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
