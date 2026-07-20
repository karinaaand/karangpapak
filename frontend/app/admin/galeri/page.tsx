"use client";

import { useState } from "react";
import { Image as ImageIcon, Plus, Trash2, Save, ExternalLink, Calendar, Tag } from "lucide-react";

type GalleryPhoto = {
  id: string;
  title: string;
  categoryLabel: string;
  date: string;
  imageUrl: string;
  description: string;
};

const INITIAL_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    title: "Pengaspalan & Perbaikan Jalan Usaha Tani Karangpapak",
    categoryLabel: "Pembangunan Desa",
    date: "14 Juli 2026",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
    description: "Dokumentasi pengerjaan pengaspalan jalan akses pertanian untuk mempermudah distribusi hasil panen padi dan perkebunan warga.",
  },
  {
    id: "g2",
    title: "Kebun Edukasi: Panen Bersama & Pelatihan Biochar Organik",
    categoryLabel: "Kebun Edukasi & Tani",
    date: "10 Juli 2026",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    description: "Inovasi pemanfaatan biochar arang hayati untuk meningkatkan kesuburan lahan tani dan pembibitan tanaman unggul warga Karangpapak.",
  },
  {
    id: "g3",
    title: "Pelayanan Posyandu Balita & Pembagian PMT Bergizi",
    categoryLabel: "Kesehatan & Posyandu",
    date: "05 Juli 2026",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    description: "Pemeriksaan tumbuh kembang balita, imunisasi rutin, dan edukasi gizi pencegahan stunting oleh bidan serta kader Posyandu.",
  },
  {
    id: "g4",
    title: "Gotong Royong Pembersihan Saluran Air & Pesisir Pantai",
    categoryLabel: "Gotong Royong",
    date: "28 Juni 2026",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
    description: "Aksi kebersamaan warga dan perangkat desa dalam kerja bakti menjaga kelestarian kawasan pesisir pantai Karangpapak.",
  },
];

export default function AdminGaleriPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(INITIAL_PHOTOS);
  const [saved, setSaved] = useState(false);

  function handleAddPhoto() {
    const newPhoto: GalleryPhoto = {
      id: Date.now().toString(),
      title: "Dokumentasi Kegiatan Desa Baru",
      categoryLabel: "Dokumentasi Umum",
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      description: "Deskripsi dokumentasi kegiatan desa...",
    };
    setPhotos([newPhoto, ...photos]);
  }

  function handleRemovePhoto(id: string) {
    setPhotos(photos.filter((p) => p.id !== id));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#7e22ce] to-[#2c73b9] p-7 shadow-sm text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#e9d5ff]">Modul Web Publik</span>
          <h3 className="mt-1 text-2xl font-extrabold flex items-center gap-2">
            <ImageIcon size={24} /> Galeri & Dokumentasi Desa
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#eef4fc] max-w-2xl">
            Kelola foto-foto album dokumentasi pembangunan, kegiatan gotong royong warga, pelayanan kesehatan, serta potensi desa Karangpapak.
          </p>
        </div>

        <a
          href="/galeri"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#7e22ce] shadow-sm hover:bg-[#f4f8fc] shrink-0"
        >
          <span>Lihat Galeri Publik</span>
          <ExternalLink size={14} />
        </a>
      </div>

      {saved && (
        <div className="rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] p-4 text-xs font-bold text-[#15803d]">
          ✓ Dokumentasi foto galeri desa berhasil disimpan!
        </div>
      )}

      <div className="rounded-2xl border border-[#d2dfec] bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#edf3f9] pb-4">
          <div>
            <h4 className="text-base font-bold text-[#0f2d4a]">Daftar Album Foto Dokumentasi</h4>
            <p className="text-xs text-[#5a6e7f] mt-0.5">Total {photos.length} foto dokumentasi terdaftar</p>
          </div>

          <button
            onClick={handleAddPhoto}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2c73b9] px-4 py-2 text-xs font-bold text-white hover:bg-[#1e5a9a] transition-all"
          >
            <Plus size={16} />
            <span>Tambah Foto Baru</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              className="rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] p-5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2c73b9]">Foto #{idx + 1}</span>
                  <button
                    onClick={() => handleRemovePhoto(photo.id)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50"
                    title="Hapus Foto"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-[#d2dfec] aspect-[16/9] bg-white">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="block font-semibold text-[#5a6e7f] mb-1">Judul Dokumentasi</label>
                    <input
                      type="text"
                      value={photo.title}
                      onChange={(e) => {
                        const copy = [...photos];
                        copy[idx].title = e.target.value;
                        setPhotos(copy);
                      }}
                      className="w-full rounded-lg border border-[#d2dfec] bg-white px-3 py-2 text-[#0f2d4a] font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-[#5a6e7f] mb-1">Kategori Foto</label>
                      <input
                        type="text"
                        value={photo.categoryLabel}
                        onChange={(e) => {
                          const copy = [...photos];
                          copy[idx].categoryLabel = e.target.value;
                          setPhotos(copy);
                        }}
                        className="w-full rounded-lg border border-[#d2dfec] bg-white px-3 py-2 text-[#0f2d4a]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#5a6e7f] mb-1">Tanggal Kegiatan</label>
                      <input
                        type="text"
                        value={photo.date}
                        onChange={(e) => {
                          const copy = [...photos];
                          copy[idx].date = e.target.value;
                          setPhotos(copy);
                        }}
                        className="w-full rounded-lg border border-[#d2dfec] bg-white px-3 py-2 text-[#0f2d4a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#5a6e7f] mb-1">URL Gambar (Image Link)</label>
                    <input
                      type="text"
                      value={photo.imageUrl}
                      onChange={(e) => {
                        const copy = [...photos];
                        copy[idx].imageUrl = e.target.value;
                        setPhotos(copy);
                      }}
                      className="w-full rounded-lg border border-[#d2dfec] bg-white px-3 py-2 text-[#0f2d4a]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#5a6e7f] mb-1">Keterangan / Deskripsi Foto</label>
                    <textarea
                      rows={2}
                      value={photo.description}
                      onChange={(e) => {
                        const copy = [...photos];
                        copy[idx].description = e.target.value;
                        setPhotos(copy);
                      }}
                      className="w-full rounded-lg border border-[#d2dfec] bg-white px-3 py-2 text-[#0f2d4a]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#edf3f9] flex justify-end">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2c73b9] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#1e5a9a] transition-all shadow-md"
          >
            <Save size={16} />
            <span>Simpan Album Dokumentasi</span>
          </button>
        </div>
      </div>
    </section>
  );
}
