import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, UserRound } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { getUmkmDetail } from "@/services/api";

type DetailProps = {
  params: Promise<{ id: string }>;
};

const defaultMap = "https://www.google.com/maps?q=-6.95781568282219,106.47659387339709&z=16&output=embed";

export default async function UmkmDetailPage({ params }: DetailProps) {
  const { id } = await params;
  const umkm = await getUmkmDetail(id);
  const mapSrc = umkm.maps_embed ?? defaultMap;

  return (
    <div className="bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_45%,#ffffff_100%)]">
      <PageHeader
        title={umkm.name}
        description={umkm.description ?? "Informasi lengkap UMKM desa."}
        badge="Detail UMKM"
      />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/umkm"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d2dfec] bg-white px-4 py-2 text-sm font-semibold text-[#2c73b9] shadow-sm transition-all hover:bg-[#f4f8fc] hover:border-[#2c73b9]"
        >
          <ArrowLeft size={16} />
          Kembali ke Katalog UMKM
        </Link>

        <div className="rounded-[30px] border border-[#d2dfec] bg-white p-6 shadow-[0_18px_45px_rgba(44,115,185,0.08)] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="relative overflow-hidden rounded-[28px] border border-[#d2dfec] bg-[linear-gradient(135deg,#eef4fc_0%,#d2dfec_45%,#fffaf0_100%)]" style={{ paddingTop: "66%" }}>
                {umkm.image_url ? (
                  <Image
                    src={umkm.image_url}
                    alt={umkm.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold uppercase tracking-[0.24em] text-[#2c73b9]">
                    Foto UMKM
                  </div>
                )}
              </div>

              <div className="mt-6 overflow-hidden rounded-[28px] border border-[#d2dfec] bg-[#f4f8fc] p-3">
                <div className="mb-3 px-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2c73b9]">Lokasi UMKM</p>
                  <p className="mt-2 text-sm leading-7 text-[#5a6e7f]">
                    Peta lokasi usaha membantu warga menemukan tempat usaha dengan lebih mudah.
                  </p>
                </div>
                <div className="overflow-hidden rounded-[22px] border border-[#d2dfec] bg-white">
                  <iframe
                    title={`Lokasi ${umkm.name}`}
                    src={mapSrc}
                    className="h-[300px] w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-[#d2dfec] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_100%)] p-6">
                <div className="flex flex-wrap items-center gap-2">
                  {umkm.category ? (
                    <span className="rounded-full bg-[#eef4fc] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2c73b9]">
                      {umkm.category}
                    </span>
                  ) : null}
                  {umkm.is_featured ? (
                    <span className="rounded-full bg-[#fff4dd] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#c8861a]">
                      UMKM Unggulan
                    </span>
                  ) : null}
                </div>

                <h2 className="mt-4 text-2xl font-extrabold text-[#0f2d4a]">Informasi UMKM</h2>

                <div className="mt-6 space-y-4 text-sm text-[#5a6e7f]">
                  {umkm.owner_name ? (
                    <div className="flex items-start gap-3 rounded-2xl border border-[#d2dfec] bg-white p-4">
                      <UserRound size={18} className="mt-0.5 flex-shrink-0 text-[#2c73b9]" />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#718a9e]">Pemilik</p>
                        <p className="mt-2 text-sm leading-7 text-[#0f2d4a]">{umkm.owner_name}</p>
                      </div>
                    </div>
                  ) : null}

                  {umkm.phone ? (
                    <div className="flex items-start gap-3 rounded-2xl border border-[#d2dfec] bg-white p-4">
                      <Phone size={18} className="mt-0.5 flex-shrink-0 text-[#2c73b9]" />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#718a9e]">Nomor Telepon</p>
                        <a href={`tel:${umkm.phone}`} className="mt-2 inline-block text-sm leading-7 text-[#0f2d4a] hover:text-[#2c73b9] hover:underline">
                          {umkm.phone}
                        </a>
                      </div>
                    </div>
                  ) : null}

                  {umkm.address ? (
                    <div className="flex items-start gap-3 rounded-2xl border border-[#d2dfec] bg-white p-4">
                      <MapPin size={18} className="mt-0.5 flex-shrink-0 text-[#2c73b9]" />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#718a9e]">Alamat UMKM</p>
                        <p className="mt-2 text-sm leading-7 text-[#0f2d4a]">{umkm.address}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="rounded-[28px] border border-[#d2dfec] bg-white p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2c73b9]">Deskripsi UMKM</p>
                <p className="mt-4 whitespace-pre-line text-sm leading-8 text-[#5a6e7f]">
                  {umkm.description ?? "UMKM ini merupakan bagian dari potensi usaha warga Desa Karangpapak yang terus berkembang dan melayani kebutuhan masyarakat."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
