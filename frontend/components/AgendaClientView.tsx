"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Tag,
  CheckCircle2,
  BellRing,
  X,
} from "lucide-react";

type AgendaItem = {
  id: string;
  title: string;
  category: "musyawarah" | "kesehatan" | "pelatihan" | "gotong-royong" | "edukasi";
  categoryLabel: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  status: "mendatang" | "berlangsung" | "selesai";
  description: string;
  targetAudience: string;
};

const AGENDA_ITEMS: AgendaItem[] = [
  {
    id: "1",
    title: "Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) 2026",
    category: "musyawarah",
    categoryLabel: "Musyawarah Desa",
    date: "25 Juli 2026",
    time: "09.00 - 12.30 WIB",
    location: "Aula Kantor Desa Karangpapak",
    organizer: "Pemerintah Desa & BPD Karangpapak",
    status: "mendatang",
    description: "Pembahasan rancangan awal APBDes tahun anggaran 2026, evaluasi realisasi pembangunan, dan penyusunan program prioritas sosial ekonomi desa.",
    targetAudience: "BPD, Ketua RT/RW, Tokoh Masyarakat, Karang Taruna",
  },
  {
    id: "2",
    title: "Pelaksanaan Posyandu Balita & Penimbangan Serentak",
    category: "kesehatan",
    categoryLabel: "Kesehatan Warga",
    date: "28 Juli 2026",
    time: "08.00 - 11.30 WIB",
    location: "Poskesdes Karangpapak & RW 03",
    organizer: "Kader Posyandu & Bidan Desa Karangpapak",
    status: "mendatang",
    description: "Penimbangan berat badan, pengukuran tinggi balita, pemberian vitamin A, imunisasi rutin, serta edukasi gizi pencegahan stunting.",
    targetAudience: "Ibu hamil, bayi, dan balita usia 0-5 tahun",
  },
  {
    id: "3",
    title: "Pelatihan Pembuatan Biochar & Pupuk Organik Kebun Edukasi",
    category: "edukasi",
    categoryLabel: "Edukasi & Pertanian",
    date: "02 Agustus 2026",
    time: "08.30 - 14.00 WIB",
    location: "Kebun Edukasi Tani Dusun Leuweung Sari",
    organizer: "Kelompok Tani Desa & Dinas Pertanian",
    status: "mendatang",
    description: "Pelatihan langsung pembuatan arang hayati (biochar) dari limbah pertanian untuk penyuburan tanah sawah dan perkebunan warga.",
    targetAudience: "Petani desa, kelompok pemuda tani, masyarakat umum",
  },
  {
    id: "4",
    title: "Workshop Pemasaran Digital & Foto Produk UMKM Desa",
    category: "pelatihan",
    categoryLabel: "Pemberdayaan Ekonomi",
    date: "08 Agustus 2026",
    time: "13.00 - 16.00 WIB",
    location: "Balai Pertemuan Warga Karangpapak",
    organizer: "Tim Penggerak UMKM & Kominfo Sukabumi",
    status: "mendatang",
    description: "Panduan praktis pembuatan katalog online, pendaftaran toko digital WhatsApp Business, dan teknik fotografi produk usaha lokal.",
    targetAudience: "Pelaku UMKM, pengrajin bambu, produsen kripik & olahan ikan",
  },
  {
    id: "5",
    title: "Kerja Bakti Massal Pembersihan Saluran Drainage & Pantai",
    category: "gotong-royong",
    categoryLabel: "Gotong Royong Lingkungan",
    date: "12 Agustus 2026",
    time: "07.00 - 10.30 WIB",
    location: "Kawasan Pesisir Pantai & Selokan Dusun Pesisir",
    organizer: "Pemerintah Desa & Karang Taruna Karangpapak",
    status: "mendatang",
    description: "Aksi bersih pantai dan normalisasi selokan warga untuk mencegah banjir saat cuaca ekstrem dan mempercantik objek wisata pantai.",
    targetAudience: "Seluruh warga masyarakat Desa Karangpapak",
  },
];

export default function AgendaClientView() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAgenda, setSelectedAgenda] = useState<AgendaItem | null>(null);
  const [notifiedId, setNotifiedId] = useState<string | null>(null);

  const filteredItems = AGENDA_ITEMS.filter((item) => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  function handleSetReminder(id: string) {
    setNotifiedId(id);
    setTimeout(() => {
      setNotifiedId(null);
    }, 3000);
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-[#d2dfec] bg-white p-6 sm:p-8 shadow-[0_12px_35px_rgba(44,115,185,0.04)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d2dfec] bg-[#f4f8fc] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2c73b9]">
              Agenda & Kegiatan Desa
            </span>
            <h2 className="text-2xl font-extrabold text-[#0f2d4a] sm:text-3xl">
              Jadwal Acara & Agenda Mendatang
            </h2>
            <p className="text-sm text-[#5a6e7f] max-w-2xl leading-7">
              Daftar kegiatan, rapat musyawarah desa, posyandu rutin, pelatihan masyarakat, dan aksi gotong royong di Desa Karangpapak.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] p-4 text-center shrink-0 min-w-[160px]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#718a9e]">Total Agenda</p>
            <p className="text-2xl font-extrabold text-[#2c73b9] mt-0.5">{AGENDA_ITEMS.length} Kegiatan</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-4 border-t border-[#edf3f9]">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "Semua Agenda" },
              { id: "musyawarah", label: "Musyawarah" },
              { id: "kesehatan", label: "Kesehatan" },
              { id: "edukasi", label: "Edukasi Tani" },
              { id: "pelatihan", label: "Pelatihan UMKM" },
              { id: "gotong-royong", label: "Gotong Royong" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all border ${
                  activeCategory === cat.id
                    ? "border-[#2c73b9] bg-[#2c73b9] text-white shadow-sm"
                    : "border-[#d2dfec] bg-[#f4f8fc] text-[#5a6e7f] hover:bg-white hover:text-[#0f2d4a]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#718a9e]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kegiatan desa..."
              className="w-full rounded-full border border-[#d2dfec] bg-[#f4f8fc] pl-10 pr-4 py-2 text-xs text-[#0f2d4a] focus:border-[#2c73b9] focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="rounded-[24px] border border-[#d2dfec] bg-white p-6 shadow-[0_8px_25px_rgba(44,115,185,0.04)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d2dfec] bg-[#f4f8fc] px-3 py-1 text-[11px] font-semibold text-[#2c73b9]">
                  <Tag size={12} />
                  {item.categoryLabel}
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-[#eef4fc] px-2.5 py-0.5 text-[10px] font-bold text-[#2c73b9] border border-[#c5d8f2]">
                  <CheckCircle2 size={12} />
                  {item.status === "mendatang" ? "Mendatang" : "Berlangsung"}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-[#0f2d4a] group-hover:text-[#2c73b9] transition-colors leading-snug">
                {item.title}
              </h3>

              <div className="space-y-2 text-xs text-[#5a6e7f]">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-[#2c73b9] shrink-0" />
                  <span className="font-bold text-[#0f2d4a]">{item.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-[#2c73b9] shrink-0" />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={15} className="text-[#2c73b9] shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{item.location}</span>
                </div>
              </div>

              <p className="text-xs text-[#5a6e7f] leading-6 line-clamp-3 border-t border-[#edf3f9] pt-3">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#edf3f9] flex items-center gap-2">
              <button
                onClick={() => setSelectedAgenda(item)}
                className="flex-1 rounded-full bg-[#2c73b9] py-2.5 text-xs font-bold text-white hover:bg-[#1e5a9a] transition-all text-center"
              >
                Detail Acara
              </button>

              <button
                onClick={() => handleSetReminder(item.id)}
                className={`p-2.5 rounded-full border transition-all ${
                  notifiedId === item.id
                    ? "bg-[#2c73b9] text-white border-[#2c73b9]"
                    : "bg-[#f4f8fc] text-[#2c73b9] border-[#d2dfec] hover:bg-white"
                }`}
                title="Ingatkan Saya"
              >
                <BellRing size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedAgenda && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedAgenda(null);
          }}
        >
          <div className="w-full max-w-lg rounded-[28px] border border-[#d2dfec] bg-white p-6 sm:p-8 shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between border-b border-[#edf3f9] pb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d2dfec] bg-[#f4f8fc] px-3.5 py-1 text-xs font-semibold text-[#2c73b9]">
                {selectedAgenda.categoryLabel}
              </span>
              <button
                onClick={() => setSelectedAgenda(null)}
                className="rounded-full p-2 text-[#718a9e] hover:bg-[#f4f8fc] hover:text-[#0f2d4a]"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="text-xl font-extrabold text-[#0f2d4a] leading-snug">
              {selectedAgenda.title}
            </h3>

            <div className="rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] p-4 space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5 text-[#0f2d4a]">
                <Calendar size={16} className="text-[#2c73b9]" />
                <span className="font-bold">{selectedAgenda.date}</span>
                <span>({selectedAgenda.time})</span>
              </div>
              <div className="flex items-start gap-2.5 text-[#0f2d4a]">
                <MapPin size={16} className="text-[#2c73b9] shrink-0 mt-0.5" />
                <span>{selectedAgenda.location}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#5a6e7f]">
                <Users size={16} className="text-[#2c73b9]" />
                <span>Penyelenggara: <strong>{selectedAgenda.organizer}</strong></span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-[#0f2d4a]">Deskripsi Kegiatan:</p>
              <p className="text-xs leading-6 text-[#5a6e7f]">{selectedAgenda.description}</p>
            </div>

            <div className="space-y-2 border-t border-[#edf3f9] pt-4">
              <p className="text-xs font-bold text-[#0f2d4a]">Sasaran Peserta / Peruntukan:</p>
              <p className="text-xs text-[#2c73b9] font-medium">{selectedAgenda.targetAudience}</p>
            </div>

            <div className="pt-3 border-t border-[#edf3f9] flex items-center gap-3">
              <button
                onClick={() => handleSetReminder(selectedAgenda.id)}
                className="flex-1 rounded-full bg-[#2c73b9] py-3 text-xs font-bold text-white hover:bg-[#1e5a9a] transition-all flex items-center justify-center gap-2"
              >
                <BellRing size={16} />
                <span>Simpan Pengingat Acara</span>
              </button>
              <button
                onClick={() => setSelectedAgenda(null)}
                className="rounded-full border border-[#d2dfec] bg-[#f4f8fc] px-5 py-3 text-xs font-bold text-[#5a6e7f] hover:bg-white"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
