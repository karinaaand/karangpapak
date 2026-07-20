"use client";

import { useState } from "react";
import {
  Building2,
  HeartPulse,
  School,
  Landmark,
  Trophy,
  MapPin,
  ExternalLink,
  Compass,
  Clock,
  Layers,
} from "lucide-react";

type VillageFacility = {
  id: string;
  name: string;
  category: string;
  address: string;
  operationalHours: string;
  description: string;
  lat: number;
  lng: number;
  icon: any;
  imageUrl: string;
};

const VILLAGE_FACILITIES: VillageFacility[] = [
  {
    id: "kantor-desa",
    name: "Kantor & Balai Desa Karangpapak",
    category: "Pemerintahan Desa",
    address: "Jl. Raya Karangpapak No. 01, Kec. Cisolok, Kab. Sukabumi",
    operationalHours: "Senin - Jumat | 08.00 - 15.30 WIB",
    description: "Pusat pelayanan administrasi kependudukan, balai musyawarah warga, dan balai pertemuan resmi pemerintah desa.",
    lat: -6.9587,
    lng: 106.4526,
    icon: Building2,
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "poskesdes",
    name: "Poskesdes & Posyandu Desa Karangpapak",
    category: "Kesehatan Warga",
    address: "Dusun Karangpapak Tengah, RT 02/RW 03",
    operationalHours: "Senin - Sabtu | 08.00 - 14.00 WIB",
    description: "Pelayanan kesehatan dasar warga, pemeriksaan gizi balita, imunisasi rutin, serta posko penanganan pencegahan stunting.",
    lat: -6.9592,
    lng: 106.4530,
    icon: HeartPulse,
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sdn-karangpapak",
    name: "SD Negeri Karangpapak",
    category: "Pendidikan Dasar",
    address: "Jl. Pendidikan No. 12, Karangpapak, Cisolok",
    operationalHours: "Senin - Sabtu | 07.00 - 12.30 WIB",
    description: "Fasilitas pendidikan dasar negeri untuk mencerdaskan anak-anak generasi penerus masyarakat Desa Karangpapak.",
    lat: -6.9565,
    lng: 106.4520,
    icon: School,
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "masjid-al-hidayah",
    name: "Masjid Jami' Al-Hidayah Karangpapak",
    category: "Sarana Ibadah",
    address: "Dusun Utama RT 01/RW 01, Karangpapak",
    operationalHours: "Buka Setiap Hari (24 Jam)",
    description: "Masjid utama warga untuk kegiatan ibadah shalat berjamaah, pengajian rutin masyarakat, dan peringatan hari besar Islam.",
    lat: -6.9578,
    lng: 106.4515,
    icon: Landmark,
    imageUrl: "https://images.unsplash.com/photo-1590076175571-4b5459efb08c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lapangan-desa",
    name: "Lapangan Serbaguna & Olahraga Desa",
    category: "Fasilitas Olahraga & Keuangan Warga",
    address: "Kawasan Pemuda RT 04/RW 02, Karangpapak",
    operationalHours: "Setiap Hari | 06.00 - 18.00 WIB",
    description: "Sarana kegiatan olahraga sepak bola, bola voli, latihan pemuda Karang Taruna, serta tempat bazar kegiatan umum desa.",
    lat: -6.9602,
    lng: 106.4535,
    icon: Trophy,
    imageUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
  },
];

const BOUNDARIES = [
  { label: "Sebelah Utara", value: "Desa Pasirbaru" },
  { label: "Sebelah Selatan", value: "Samudra Hindia (Wilayah Laut Cisolok)" },
  { label: "Sebelah Timur", value: "Desa Cisolok" },
  { label: "Sebelah Barat", value: "Desa Cikahuripan" },
];

export default function GisMap() {
  const [selectedFacility, setSelectedFacility] = useState<VillageFacility>(VILLAGE_FACILITIES[0]);

  const mapEmbedUrl = `https://maps.google.com/maps?q=${selectedFacility.lat},${selectedFacility.lng}&z=16&output=embed`;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-[24px] border border-[#d2dfec] bg-white p-6 shadow-[0_8px_25px_rgba(44,115,185,0.04)] space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#718a9e]">Luas Wilayah</span>
          <h3 className="text-2xl font-black text-[#0f2d4a]">485,5 Ha</h3>
          <p className="text-xs text-[#5a6e7f]">Daratan & Pesisir Pantai</p>
        </div>

        <div className="rounded-[24px] border border-[#d2dfec] bg-white p-6 shadow-[0_8px_25px_rgba(44,115,185,0.04)] space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#718a9e]">Pembagian Dusun</span>
          <h3 className="text-2xl font-black text-[#0f2d4a]">4 Dusun</h3>
          <p className="text-xs text-[#5a6e7f]">Terdiri dari 8 RW & 24 RT</p>
        </div>

        <div className="rounded-[24px] border border-[#d2dfec] bg-white p-6 shadow-[0_8px_25px_rgba(44,115,185,0.04)] space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#718a9e]">Ketinggian Wilayah</span>
          <h3 className="text-2xl font-black text-[#0f2d4a]">0 - 150 mdpl</h3>
          <p className="text-xs text-[#5a6e7f]">Pesisir Pantai & Dataran Rendah</p>
        </div>

        <div className="rounded-[24px] border border-[#d2dfec] bg-white p-6 shadow-[0_8px_25px_rgba(44,115,185,0.04)] space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#718a9e]">Kecamatan</span>
          <h3 className="text-2xl font-black text-[#0f2d4a]">Cisolok</h3>
          <p className="text-xs text-[#5a6e7f]">Kabupaten Sukabumi</p>
        </div>
      </div>

      <div className="rounded-[32px] border border-[#d2dfec] bg-white p-6 sm:p-8 shadow-[0_16px_45px_rgba(44,115,185,0.06)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#edf3f9]">
          <div>
            <h3 className="text-xl font-extrabold text-[#0f2d4a] flex items-center gap-2">
              <Compass className="text-[#2c73b9]" size={22} />
              <span>Peta Digital Fasilitas Desa Karangpapak</span>
            </h3>
            <p className="text-xs text-[#5a6e7f] mt-0.5">
              Pilih salah satu fasilitas desa di bawah untuk melihat titik lokasi presisi di peta GIS.
            </p>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${selectedFacility.lat},${selectedFacility.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#2c73b9] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#1e5a9a] transition-all self-start sm:self-auto"
          >
            <span>Petunjuk Arah Google Maps</span>
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 relative min-h-[380px] sm:min-h-[440px] rounded-[24px] overflow-hidden border border-[#d2dfec] bg-[#eef4fc] shadow-inner">
            <iframe
              title={`Peta ${selectedFacility.name}`}
              src={mapEmbedUrl}
              className="w-full h-full min-h-[380px] sm:min-h-[440px] border-0"
              loading="lazy"
              allowFullScreen
            />
            
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#d2dfec] px-4 py-2.5 shadow-lg">
              <MapPin size={18} className="text-[#2c73b9]" />
              <span className="text-xs font-extrabold text-[#0f2d4a]">{selectedFacility.name}</span>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#d2dfec] bg-[#f8fafc] p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-[#d2dfec] aspect-[16/10] bg-[#eef4fc]">
                <img
                  src={selectedFacility.imageUrl}
                  alt={selectedFacility.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <span className="inline-block rounded-full bg-[#2c73b9] px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                  {selectedFacility.category}
                </span>

                <h4 className="text-base font-extrabold text-[#0f2d4a] leading-snug">
                  {selectedFacility.name}
                </h4>

                <div className="space-y-1.5 text-xs text-[#5a6e7f]">
                  <p className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-[#2c73b9]" />
                    <span>{selectedFacility.address}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock size={14} className="shrink-0 text-[#2c73b9]" />
                    <span>{selectedFacility.operationalHours}</span>
                  </p>
                </div>

                <p className="text-xs text-[#5a6e7f] leading-relaxed pt-2 border-t border-[#edf3f9]">
                  {selectedFacility.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#d2dfec]">
              <span className="text-[11px] font-bold text-[#2c73b9]">
                Terdaftar dalam Sistem Fasilitas Publik Desa
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Building2 size={20} className="text-[#2c73b9]" />
          <h3 className="text-lg font-extrabold text-[#0f2d4a]">
            Fasilitas Umum & Sarana Publik Desa Karangpapak
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VILLAGE_FACILITIES.map((facility) => {
            const IconComponent = facility.icon;
            const isSelected = selectedFacility.id === facility.id;

            return (
              <div
                key={facility.id}
                onClick={() => setSelectedFacility(facility)}
                className={`group cursor-pointer rounded-[24px] border bg-white p-6 shadow-[0_8px_25px_rgba(44,115,185,0.04)] transition-all duration-300 flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? "border-[#2c73b9] ring-2 ring-[#2c73b9]/20 shadow-xl"
                    : "border-[#d2dfec] hover:border-[#2c73b9] hover:shadow-lg"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef4fc] text-[#2c73b9] group-hover:bg-[#2c73b9] group-hover:text-white transition-colors">
                      <IconComponent size={22} />
                    </div>

                    <span className="rounded-full bg-[#f4f8fc] border border-[#d2dfec] px-3 py-1 text-[10px] font-bold text-[#2c73b9]">
                      {facility.category}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-[#0f2d4a] group-hover:text-[#2c73b9] transition-colors leading-snug">
                    {facility.name}
                  </h4>

                  <p className="text-xs text-[#5a6e7f] leading-relaxed line-clamp-2">
                    {facility.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#edf2f7] flex items-center justify-between text-xs">
                  <span className="text-[#5a6e7f] text-[11px] truncate pr-2">{facility.address}</span>
                  <button className="shrink-0 font-extrabold text-[#2c73b9] group-hover:underline">
                    {isSelected ? "Sedang Dilihat" : "Pilih Titik →"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-[28px] border border-[#d2dfec] bg-[#f8fafc] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Layers size={20} className="text-[#2c73b9]" />
          <h4 className="text-base font-extrabold text-[#0f2d4a]">
            Batas Administratif Wilayah Desa Karangpapak
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {BOUNDARIES.map((boundary, idx) => (
            <div key={idx} className="rounded-2xl border border-[#d2dfec] bg-white p-4 shadow-sm space-y-1">
              <span className="font-extrabold text-[#718a9e] text-[10px] uppercase tracking-wider block">
                {boundary.label}
              </span>
              <span className="font-black text-[#0f2d4a] text-sm block">
                {boundary.value}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
