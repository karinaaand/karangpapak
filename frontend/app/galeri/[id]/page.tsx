import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  User,
  MapPin,
  Shield,
  Image as ImageIcon,
  Info,
  ChevronLeft,
} from "lucide-react";
import { GALLERY_PHOTOS } from "@/services/galleryData";
import DetailGaleriActions from "@/components/DetailGaleriActions";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const photo = GALLERY_PHOTOS.find((p) => p.id === id) || GALLERY_PHOTOS[0];
  return {
    title: `${photo.title} - Galeri Desa Karangpapak`,
    description: photo.description.slice(0, 160),
  };
}

export default async function DetailGaleriPage({ params }: PageProps) {
  const { id } = await params;
  const photo = GALLERY_PHOTOS.find((p) => p.id === id) || GALLERY_PHOTOS.find((p) => `news-${p.id}` === id);

  if (!photo) {
    notFound();
  }

  const otherPhotos = GALLERY_PHOTOS.filter((p) => p.id !== photo.id);

  return (
    <div className="bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_45%,#ffffff_100%)] min-h-screen py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <Link
            href="/berita?tab=galeri"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#d2dfec] bg-white px-4 py-2 text-xs font-bold text-[#2c73b9] shadow-sm hover:bg-[#eef4fc] transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Kembali ke Galeri Desa</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6 bg-white p-6 sm:p-8 rounded-[32px] border border-[#d2dfec] shadow-[0_10px_35px_rgba(44,115,185,0.05)]">
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#5a6e7f]">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar size={14} className="text-[#2c73b9]" />
                {photo.date}
              </span>

              <span className="flex items-center gap-1.5 font-medium">
                <User size={14} className="text-[#2c73b9]" />
                Kontributor: <strong className="text-[#0f2d4a]">{photo.contributor}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2d4a] leading-snug">
              {photo.title}
            </h1>

            <div className="overflow-hidden rounded-[24px] border border-[#d2dfec] bg-[#f4f8fc] aspect-[16/10] relative shadow-md">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-[24px] border border-[#d2dfec] bg-[#f8fafc]/70 p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2c73b9] uppercase tracking-wider">
                  <Info size={16} />
                  <span>Deskripsi Dokumentasi</span>
                </div>
                <div className="text-xs sm:text-sm text-[#475569] leading-relaxed whitespace-pre-line space-y-3">
                  {photo.description}
                </div>
              </div>

              {photo.additionalImages && photo.additionalImages.length > 0 && (
                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2c73b9] uppercase tracking-wider">
                    <ImageIcon size={16} />
                    <span>Foto Dokumentasi Tambahan</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {photo.additionalImages.map((img, idx) => (
                      <div key={idx} className="overflow-hidden rounded-xl border border-[#d2dfec] aspect-[4/3] bg-[#eef4fc]">
                        <img
                          src={img}
                          alt={`Dokumentasi Tambahan ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5a6e7f]">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#2c73b9] shrink-0" />
                  <span>Lokasi: <strong className="text-[#0f2d4a]">{photo.location}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={15} className="text-[#2c73b9] shrink-0" />
                  <span>Hak Cipta: <strong className="text-[#0f2d4a]">{photo.copyright}</strong></span>
                </div>
              </div>
            </div>

            <DetailGaleriActions title={photo.title} />
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="rounded-[28px] border border-[#d2dfec] bg-white p-5 shadow-[0_8px_30px_rgba(44,115,185,0.04)] space-y-4">
              <div className="flex items-center gap-2 pb-1">
                <ImageIcon size={18} className="text-[#2c73b9]" />
                <h3 className="text-sm font-extrabold text-[#0f2d4a]">Dokumentasi Lainnya</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {otherPhotos.slice(0, 6).map((item) => (
                  <Link
                    key={item.id}
                    href={`/galeri/${item.id}`}
                    className="group overflow-hidden rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] aspect-square relative hover:border-[#2c73b9] hover:shadow-md transition-all block"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-end">
                      <p className="text-[10px] font-bold text-white line-clamp-2 leading-tight">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
