"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Image as ImageIcon,
  Calendar,
  X,
  Search,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { getBerita, Berita } from "@/services/api";

type GalleryPhoto = {
  id: string;
  title: string;
  category: "pembangunan" | "pertanian" | "sosial" | "kesehatan" | "kebudayaan";
  categoryLabel: string;
  date: string;
  imageUrl: string;
  description: string;
  source?: "berita" | "dokumentasi";
};

const DEFAULT_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    title: "Pengaspalan & Perbaikan Jalan Usaha Tani Karangpapak",
    category: "pembangunan",
    categoryLabel: "Pembangunan Desa",
    date: "14 Juli 2026",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
    description: "Dokumentasi pengerjaan pengaspalan jalan akses pertanian untuk mempermudah distribusi hasil panen padi dan perkebunan warga.",
    source: "dokumentasi",
  },
  {
    id: "g2",
    title: "Kebun Edukasi: Panen Bersama & Pelatihan Biochar Organik",
    category: "pertanian",
    categoryLabel: "Kebun Edukasi & Tani",
    date: "10 Juli 2026",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    description: "Inovasi pemanfaatan biochar arang hayati untuk meningkatkan kesuburan lahan tani dan pembibitan tanaman unggul warga Karangpapak.",
    source: "dokumentasi",
  },
  {
    id: "g3",
    title: "Pelayanan Posyandu Balita & Pembagian PMT Bergizi",
    category: "kesehatan",
    categoryLabel: "Kesehatan & Posyandu",
    date: "05 Juli 2026",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    description: "Pemeriksaan tumbuh kembang balita, imunisasi rutin, dan edukasi gizi pencegahan stunting oleh bidan serta kader Posyandu.",
    source: "dokumentasi",
  },
  {
    id: "g4",
    title: "Gotong Royong Pembersihan Saluran Air & Pesisir Pantai",
    category: "sosial",
    categoryLabel: "Gotong Royong",
    date: "28 Juni 2026",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
    description: "Aksi kebersamaan warga dan perangkat desa dalam kerja bakti menjaga kelestarian kawasan pesisir pantai Karangpapak.",
    source: "dokumentasi",
  },
  {
    id: "g5",
    title: "Pameran Produk Olahan Ikan Laut & Kerajinan UMKM",
    category: "kebudayaan",
    categoryLabel: "Pemberdayaan UMKM",
    date: "20 Juni 2026",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
    description: "Gelaran bazar UMKM memperkenal karya kerajinan bambu dan olahan hasil laut khas masyarakat Cisolok Sukabumi.",
    source: "dokumentasi",
  },
  {
    id: "g6",
    title: "Pemasangan Penerangan Jalan Umum Tenaga Surya",
    category: "pembangunan",
    categoryLabel: "Pembangunan Desa",
    date: "12 Juni 2026",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    description: "Pemasangan PJU ramah lingkungan di sepanjang jalan protokol desa untuk keamanan dan kenyamanan aktivitas malam warga.",
    source: "dokumentasi",
  },
];

export default function GaleriClientView() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>(DEFAULT_GALLERY_PHOTOS);

  useEffect(() => {
    async function loadNewsPhotos() {
      try {
        const res = await getBerita(1, 12);
        if (res && res.data && res.data.length > 0) {
          const apiNewsPhotos: GalleryPhoto[] = res.data
            .filter((item: Berita) => item.thumbnail_url)
            .map((item: Berita) => ({
              id: `news-${item.id}`,
              title: item.title,
              category: "pembangunan" as const,
              categoryLabel: "Berita & Publikasi",
              date: item.published_at
                ? new Date(item.published_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Dokumentasi Desa",
              imageUrl: item.thumbnail_url!,
              description: item.excerpt || item.content.slice(0, 120),
              source: "berita" as const,
            }));

          if (apiNewsPhotos.length > 0) {
            setPhotos([...apiNewsPhotos, ...DEFAULT_GALLERY_PHOTOS]);
          }
        }
      } catch {
      }
    }
    loadNewsPhotos();
  }, []);

  const filteredPhotos = photos.filter((photo) => {
    return (
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-[#d2dfec] bg-white p-5 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#0f2d4a]">
          <ImageIcon size={18} className="text-[#2c73b9]" />
          <span>Dokumentasi Foto Desa</span>
        </div>

        <div className="relative w-full max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#718a9e]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari dokumentasi foto..."
            className="w-full rounded-full border border-[#d2dfec] bg-[#f4f8fc] pl-10 pr-4 py-2 text-xs text-[#0f2d4a] focus:border-[#2c73b9] focus:bg-white focus:outline-none transition-colors"
          />
        </div>
      </div>

      {filteredPhotos.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-[#b8cde4] bg-white p-12 text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4f8fc] text-[#718a9e]">
            <ImageIcon size={28} />
          </div>
          <p className="text-sm font-bold text-[#0f2d4a]">Tidak Ada Foto Ditemukan</p>
          <p className="text-xs text-[#5a6e7f]">Coba gunakan kata kunci lain untuk mencari dokumentasi.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group overflow-hidden rounded-[24px] border border-[#d2dfec] bg-white shadow-[0_8px_25px_rgba(44,115,185,0.04)] hover:shadow-xl hover:border-[#2c73b9] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#eef4fc]">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="p-5 space-y-3 bg-white flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#5a6e7f]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar size={13} className="text-[#2c73b9]" />
                      {photo.date}
                    </span>
                    {photo.source === "berita" && (
                      <span className="text-[10px] font-bold text-[#2c73b9] bg-[#eef4fc] px-2 py-0.5 rounded-md">
                        Dari Berita
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-extrabold text-[#0f2d4a] group-hover:text-[#2c73b9] transition-colors leading-snug line-clamp-2">
                    {photo.title}
                  </h3>

                  <p className="text-xs text-[#5a6e7f] leading-relaxed line-clamp-2">
                    {photo.description}
                  </p>
                </div>

                <div className="pt-3">
                  <Link
                    href={`/galeri/${photo.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#2c73b9] px-4 py-2 text-xs font-bold text-white transition-all hover:bg-[#1e5a9a] hover:gap-2.5 shadow-sm"
                  >
                    <span>Detail Dokumentasi</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPhoto(null);
          }}
        >
          <div className="w-full max-w-4xl overflow-hidden rounded-[30px] border border-white/20 bg-[#121214] text-white shadow-2xl relative space-y-5 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#2c73b9] px-3.5 py-1 text-xs font-bold text-white">
                  {selectedPhoto.categoryLabel}
                </span>
                <span className="text-xs text-[#a1a1aa] flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#60a5fa]" />
                  {selectedPhoto.date}
                </span>
              </div>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="rounded-full p-2 text-[#a1a1aa] hover:bg-[#27272a] hover:text-white transition-all"
                title="Tutup Modal"
              >
                <X size={22} />
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl bg-black max-h-[62vh] flex items-center justify-center border border-[#27272a]">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain max-h-[62vh]"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white leading-snug">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-[#d4d4d8]">
                {selectedPhoto.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#a1a1aa]">Dokumentasi Resmi Desa Karangpapak</span>
              <a
                href={selectedPhoto.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 font-bold text-white transition-colors flex items-center gap-2"
              >
                <span>Buka Gambar Ukuran Penuh</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
