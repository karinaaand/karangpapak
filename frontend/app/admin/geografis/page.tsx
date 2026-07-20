"use client";

import { useState } from "react";
import { Compass, MapPin, Building2, Layers, Save, Plus, Trash2, ExternalLink } from "lucide-react";

type FacilityItem = {
  id: string;
  name: string;
  category: string;
  address: string;
  operationalHours: string;
  description: string;
  lat: number;
  lng: number;
};

const INITIAL_FACILITIES: FacilityItem[] = [
  {
    id: "kantor-desa",
    name: "Kantor & Balai Desa Karangpapak",
    category: "Pemerintahan Desa",
    address: "Jl. Raya Karangpapak No. 01, Kec. Cisolok, Kab. Sukabumi",
    operationalHours: "Senin - Jumat | 08.00 - 15.30 WIB",
    description: "Pusat pelayanan administrasi kependudukan, balai musyawarah warga, dan balai pertemuan resmi pemerintah desa.",
    lat: -6.9587,
    lng: 106.4526,
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
  },
];

export default function AdminGeografisPage() {
  const [facilities, setFacilities] = useState<FacilityItem[]>(INITIAL_FACILITIES);
  const [areaSize, setAreaSize] = useState("485,5 Ha");
  const [dusunCount, setDusunCount] = useState("4 Dusun");
  const [elevation, setElevation] = useState("0 - 150 mdpl");
  const [subdistrict, setSubdistrict] = useState("Cisolok");
  const [saved, setSaved] = useState(false);

  function handleAddFacility() {
    const newFac: FacilityItem = {
      id: Date.now().toString(),
      name: "Fasilitas Baru Desa",
      category: "Fasilitas Umum",
      address: "Karangpapak, Kec. Cisolok",
      operationalHours: "08.00 - 16.00 WIB",
      description: "Deskripsi fasilitas publik baru...",
      lat: -6.958,
      lng: 106.452,
    };
    setFacilities([...facilities, newFac]);
  }

  function handleRemoveFacility(id: string) {
    setFacilities(facilities.filter((f) => f.id !== id));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#0e6c7c] to-[#2c73b9] p-7 shadow-sm text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#b8d9e0]">Modul Web Publik</span>
          <h3 className="mt-1 text-2xl font-extrabold flex items-center gap-2">
            <Compass size={24} /> Geografis & Peta GIS Desa
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#eef4fc] max-w-2xl">
            Kelola statistik wilayah geografis, batas administratif desa, serta titik koordinat fasilitas umum yang tampil pada peta digital interaktif web publik.
          </p>
        </div>

        <a
          href="/geografis"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#0e6c7c] shadow-sm hover:bg-[#f4f8fc] shrink-0"
        >
          <span>Lihat Peta Publik</span>
          <ExternalLink size={14} />
        </a>
      </div>

      {saved && (
        <div className="rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] p-4 text-xs font-bold text-[#15803d]">
          ✓ Data geografis & lokasi fasilitas desa berhasil diperbarui!
        </div>
      )}

      <div className="rounded-2xl border border-[#d2dfec] bg-white p-6 shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-[#0f2d4a] flex items-center gap-2">
          <Layers size={18} className="text-[#2c73b9]" /> Statistik Wilayah & Geografis Desa
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-[#5a6e7f] mb-1">Luas Wilayah</label>
            <input
              type="text"
              value={areaSize}
              onChange={(e) => setAreaSize(e.target.value)}
              className="w-full rounded-xl border border-[#d2dfec] bg-[#f4f8fc] px-3.5 py-2 font-bold text-[#0f2d4a]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#5a6e7f] mb-1">Pembagian Dusun</label>
            <input
              type="text"
              value={dusunCount}
              onChange={(e) => setDusunCount(e.target.value)}
              className="w-full rounded-xl border border-[#d2dfec] bg-[#f4f8fc] px-3.5 py-2 font-bold text-[#0f2d4a]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#5a6e7f] mb-1">Ketinggian Wilayah</label>
            <input
              type="text"
              value={elevation}
              onChange={(e) => setElevation(e.target.value)}
              className="w-full rounded-xl border border-[#d2dfec] bg-[#f4f8fc] px-3.5 py-2 font-bold text-[#0f2d4a]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#5a6e7f] mb-1">Kecamatan</label>
            <input
              type="text"
              value={subdistrict}
              onChange={(e) => setSubdistrict(e.target.value)}
              className="w-full rounded-xl border border-[#d2dfec] bg-[#f4f8fc] px-3.5 py-2 font-bold text-[#0f2d4a]"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#d2dfec] bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#edf3f9] pb-4">
          <div>
            <h4 className="text-base font-bold text-[#0f2d4a] flex items-center gap-2">
              <Building2 size={18} className="text-[#2c73b9]" /> Titik Fasilitas Umum & Sarana Publik
            </h4>
            <p className="text-xs text-[#5a6e7f] mt-0.5">
              Daftar titik lokasi yang akan ditampilkan pada Peta GIS Digital publik.
            </p>
          </div>

          <button
            onClick={handleAddFacility}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2c73b9] px-4 py-2 text-xs font-bold text-white hover:bg-[#1e5a9a] transition-all"
          >
            <Plus size={16} />
            <span>Tambah Fasilitas</span>
          </button>
        </div>

        <div className="space-y-4">
          {facilities.map((fac, idx) => (
            <div
              key={fac.id}
              className="rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2c73b9]">Fasilitas #{idx + 1}</span>
                <button
                  onClick={() => handleRemoveFacility(fac.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50"
                  title="Hapus Fasilitas"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#5a6e7f] mb-1">Nama Fasilitas</label>
                  <input
                    type="text"
                    value={fac.name}
                    onChange={(e) => {
                      const copy = [...facilities];
                      copy[idx].name = e.target.value;
                      setFacilities(copy);
                    }}
                    className="w-full rounded-lg border border-[#d2dfec] bg-white px-3 py-2 text-[#0f2d4a]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5a6e7f] mb-1">Kategori Sarana</label>
                  <input
                    type="text"
                    value={fac.category}
                    onChange={(e) => {
                      const copy = [...facilities];
                      copy[idx].category = e.target.value;
                      setFacilities(copy);
                    }}
                    className="w-full rounded-lg border border-[#d2dfec] bg-white px-3 py-2 text-[#0f2d4a]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5a6e7f] mb-1">Alamat Lengkap</label>
                  <input
                    type="text"
                    value={fac.address}
                    onChange={(e) => {
                      const copy = [...facilities];
                      copy[idx].address = e.target.value;
                      setFacilities(copy);
                    }}
                    className="w-full rounded-lg border border-[#d2dfec] bg-white px-3 py-2 text-[#0f2d4a]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5a6e7f] mb-1">Jam Operasional</label>
                  <input
                    type="text"
                    value={fac.operationalHours}
                    onChange={(e) => {
                      const copy = [...facilities];
                      copy[idx].operationalHours = e.target.value;
                      setFacilities(copy);
                    }}
                    className="w-full rounded-lg border border-[#d2dfec] bg-white px-3 py-2 text-[#0f2d4a]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-semibold text-[#5a6e7f] mb-1">Deskripsi Singkat</label>
                  <textarea
                    rows={2}
                    value={fac.description}
                    onChange={(e) => {
                      const copy = [...facilities];
                      copy[idx].description = e.target.value;
                      setFacilities(copy);
                    }}
                    className="w-full rounded-lg border border-[#d2dfec] bg-white px-3 py-2 text-[#0f2d4a]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5a6e7f] mb-1">Koordinat Lintang (Lat)</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={fac.lat}
                    onChange={(e) => {
                      const copy = [...facilities];
                      copy[idx].lat = parseFloat(e.target.value) || 0;
                      setFacilities(copy);
                    }}
                    className="w-full rounded-lg border border-[#d2dfec] bg-white px-3 py-2 text-[#0f2d4a]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5a6e7f] mb-1">Koordinat Bujur (Lng)</label>
                  <input
                    type="number"
                    step="0.000001"
                    value={fac.lng}
                    onChange={(e) => {
                      const copy = [...facilities];
                      copy[idx].lng = parseFloat(e.target.value) || 0;
                      setFacilities(copy);
                    }}
                    className="w-full rounded-lg border border-[#d2dfec] bg-white px-3 py-2 text-[#0f2d4a]"
                  />
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
            <span>Simpan Pengaturan Geografis</span>
          </button>
        </div>
      </div>
    </section>
  );
}
