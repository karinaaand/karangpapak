"use client";

import { useState, useEffect } from "react";
import {
  Search,
  X,
  Calculator,
  Info,
  BookOpen,
  Filter,
  HeartPulse,
  Baby,
  Laptop,
  TreePine,
  ShieldCheck,
  Loader2,
  RotateCcw,
  Sparkles,
  Milk,
  Utensils,
  Activity,
  Award,
  QrCode,
  Sprout,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import CardEdukasi from "@/components/CardEdukasi";
import Pagination from "@/components/Pagination";
import { Edukasi } from "@/types/edukasi";
import { getEdukasi } from "@/services/api";

type EdukasiClientViewProps = {
  initialItems: Edukasi[];
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
};

const CATEGORIES = [
  { id: "all", label: "Semua Topik", icon: BookOpen },
  { id: "stunting-gizi", label: "Stunting & Gizi", icon: Baby },
  { id: "kebun-edukasi", label: "Kebun Edukasi & Tani", icon: Sprout },
  { id: "literasi-digital", label: "Literasi Digital", icon: Laptop },
  { id: "lingkungan-sehat", label: "Lingkungan Sehat", icon: TreePine },
  { id: "kesiapsiagaan", label: "Kesiapsiagaan Bencana", icon: ShieldCheck },
  { id: "keamanan", label: "Keamanan Lingkungan", icon: HeartPulse },
];

const STAT_CARDS = [
  {
    value: "2",
    title: "Sasaran Utama",
    desc: "Ibu Hamil & Pasca Lahir",
    isQr: false,
  },
  {
    value: "1000",
    title: "Hari Pertama Kehidupan",
    desc: "Periode Emas Tumbuh Kembang",
    isQr: false,
  },
  {
    value: "QR",
    title: "Integrasi Digital",
    desc: "Web Direktori Gizi Desa",
    isQr: true,
  },
];

const TOPIC_CARDS = [
  {
    id: "gizi-ibu-hamil",
    title: "Gizi Ibu Hamil",
    desc: "Menu trimester, zat gizi penting, dan variasi makanan harian",
    icon: Baby,
    query: "hamil",
    category: "stunting-gizi",
  },
  {
    id: "gizi-balita-anak",
    title: "Gizi Balita & Anak",
    desc: "Kebutuhan nutrisi makro & mikro, porsi seimbang, dan suplemen",
    icon: Milk,
    query: "gizi",
    category: "stunting-gizi",
  },
  {
    id: "mpasi-resep",
    title: "MPASI & Resep",
    desc: "Resep MPASI lengkap sesuai usia bayi beserta nilai gizi",
    icon: Utensils,
    query: "mpasi",
    category: "stunting-gizi",
  },
  {
    id: "pencegahan-stunting",
    title: "Pencegahan Stunting",
    desc: "Penyebab, dampak, dan langkah nyata cegah stunting",
    icon: Activity,
    query: "stunting",
    category: "stunting-gizi",
  },
  {
    id: "1000-hpk",
    title: "1000 HPK",
    desc: "Periode emas tumbuh kembang sejak janin hingga usia 2 tahun",
    icon: Award,
    query: "1000 hpk",
    category: "stunting-gizi",
  },
  {
    id: "posyandu-pemantauan",
    title: "Posyandu & Pemantauan",
    desc: "Jadwal posyandu, grafik KMS, dan imunisasi berkala anak",
    icon: HeartPulse,
    query: "posyandu",
    category: "stunting-gizi",
  },
];

export default function EdukasiClientView({
  initialItems,
  currentPage,
  lastPage,
  total,
  perPage,
}: EdukasiClientViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [page, setPage] = useState<number>(currentPage);

  const [items, setItems] = useState<Edukasi[]>(initialItems);
  const [lastPageNum, setLastPageNum] = useState<number>(lastPage);
  const [totalCount, setTotalCount] = useState<number>(total);
  const [loading, setLoading] = useState<boolean>(false);

  const [showCalc, setShowCalc] = useState<boolean>(false);

  const [calcGender, setCalcGender] = useState<"laki" | "perempuan">("laki");
  const [calcAgeMonth, setCalcAgeMonth] = useState<string>("");
  const [calcWeight, setCalcWeight] = useState<string>("");
  const [calcHeight, setCalcHeight] = useState<string>("");
  const [calcResult, setCalcResult] = useState<{
    bmi: number;
    status: string;
    badgeStyle: string;
    advice: string;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await getEdukasi(page, perPage, activeCategory, searchQuery);
        if (isMounted) {
          setItems(res.data);
          setLastPageNum(res.last_page);
          setTotalCount(res.total);
        }
      } catch {
      } finally {
        if (isMounted) setLoading(false);
      }
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [activeCategory, searchQuery, page, perPage]);

  function handleCategoryChange(catId: string) {
    setActiveCategory(catId);
    setSelectedTopic(null);
    setSearchQuery("");
    setPage(1);
  }

  function handleSearchChange(query: string) {
    setSearchQuery(query);
    setSelectedTopic(null);
    setPage(1);
  }

  function handleTopicClick(topic: typeof TOPIC_CARDS[0]) {
    if (selectedTopic === topic.id) {
      setSelectedTopic(null);
      setActiveCategory("stunting-gizi");
      setSearchQuery("");
    } else {
      setSelectedTopic(topic.id);
      setActiveCategory("stunting-gizi");
      setSearchQuery(topic.query || "");
    }
    setPage(1);

    const el = document.getElementById("artikel-grid-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function handleResetCalc() {
    setCalcAgeMonth("");
    setCalcWeight("");
    setCalcHeight("");
    setCalcResult(null);
  }

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const w = parseFloat(calcWeight);
    const h = parseFloat(calcHeight) / 100;
    const age = parseInt(calcAgeMonth, 10);

    if (!w || !h || h <= 0 || isNaN(age)) return;

    const bmi = parseFloat((w / (h * h)).toFixed(1));
    let status = "Gizi Baik (Normal)";
    let badgeStyle = "bg-[#eef4fc] text-[#2c73b9] border-[#c0d4f7]";
    let advice =
      "Tumbuh kembang anak berada dalam rentang normal. Pertahankan pemberian pola makan seimbang berbahan pangan lokal serta rutin mengikuti posyandu.";

    if (bmi < 14) {
      status = "Beresiko Gizi Kurang / Stunting";
      badgeStyle = "bg-[#fff0f0] text-[#9a2020] border-[#f5b8b8]";
      advice =
        "Disarankan untuk berkonsultasi langsung dengan kader Posyandu / Bidan Desa Karangpapak untuk mendapatkan evaluasi nutrisi dan PMT (Pemberian Makanan Tambahan).";
    } else if (bmi > 18) {
      status = "Beresiko Gizi Lebih";
      badgeStyle = "bg-[#fff8ec] text-[#92600a] border-[#f5d99a]";
      advice =
        "Perhatikan asupan gula dan jajanan anak, tingkatkan konsumsi sayur dan buah lokal, serta pastikan anak aktif bergerak.";
    }

    setCalcResult({ bmi, status, badgeStyle, advice });
  }

  const isStuntingGizi = activeCategory === "stunting-gizi" || Boolean(selectedTopic);

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-[#d2dfec] bg-white p-6 sm:p-8 shadow-[0_12px_35px_rgba(44,115,185,0.04)] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d2dfec] bg-[#f4f8fc] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2c73b9]">
              Pusat Edukasi Publik
            </span>
            <h2 className="text-2xl font-extrabold text-[#0f2d4a] sm:text-3xl">
              Informasi & Panduan Warga Desa Karangpapak
            </h2>
            <p className="text-sm text-[#5a6e7f] max-w-2xl leading-7">
              Jelajahi berbagai materi edukasi kesehatan, gizi balita, pencegahan stunting, serta literasi digital untuk meningkatkan wawasan masyarakat Desa Karangpapak.
            </p>
          </div>

          {isStuntingGizi && (
            <button
              onClick={() => setShowCalc(true)}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#2c73b9] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#1e5a9a] shadow-md shadow-[#2c73b9]/15 flex-shrink-0"
            >
              <Calculator size={18} />
              <span>Kalkulator Status Gizi Balita</span>
            </button>
          )}
        </div>

        {isStuntingGizi && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {STAT_CARDS.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] p-5 text-center shadow-sm flex flex-col items-center justify-center min-h-[110px]"
              >
                {stat.isQr ? (
                  <div className="flex items-center justify-center py-0.5 text-[#2c73b9]">
                    <div className="flex items-center justify-center rounded-xl bg-[#eef4fc] p-2 border border-[#c5d8f2]">
                      <QrCode size={30} className="text-[#2c73b9]" />
                    </div>
                  </div>
                ) : (
                  <div className="text-3xl font-extrabold text-[#2c73b9] leading-none">
                    {stat.value}
                  </div>
                )}
                <h4 className="mt-2 text-xs font-bold text-[#0f2d4a]">{stat.title}</h4>
                <p className="mt-0.5 text-[11px] text-[#5a6e7f]">{stat.desc}</p>
              </div>
            ))}
          </div>
        )}

        {isStuntingGizi && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#718a9e] flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#2c73b9]" /> PILIHAN TOPIK STUNTING & GIZI:
              </p>
              {selectedTopic && (
                <button
                  onClick={() => handleCategoryChange("all")}
                  className="text-xs text-[#2c73b9] font-bold hover:underline"
                >
                  Reset Filter Topik
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOPIC_CARDS.map((topic) => {
                const IconComponent = topic.icon;
                return (
                  <Link
                    key={topic.id}
                    href={`/edukasi/panduan/${topic.id}`}
                    className="group cursor-pointer rounded-2xl border border-[#d2dfec] bg-white p-5 hover:border-[#2c73b9] hover:bg-[#f4f8fc] hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center text-center justify-between shadow-sm"
                  >
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4fc] text-[#2c73b9] transition-transform group-hover:scale-110 group-hover:bg-[#2c73b9] group-hover:text-white">
                        <IconComponent size={24} />
                      </div>
                      <h4 className="text-xs font-bold text-[#0f2d4a] group-hover:text-[#2c73b9]">
                        {topic.title}
                      </h4>
                      <p className="mt-1.5 text-[11px] text-[#5a6e7f] leading-snug">
                        {topic.desc}
                      </p>
                    </div>
                    <div className="mt-4 w-full">
                      <span className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#eef4fc] px-3.5 py-2 text-xs font-extrabold text-[#2c73b9] transition-all duration-200 group-hover:bg-[#2c73b9] group-hover:text-white group-hover:shadow-sm">
                        Detail Panduan <ChevronRight size={14} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div
        id="artikel-grid-section"
        className="rounded-[28px] border border-[#d2dfec] bg-white p-6 sm:p-8 shadow-[0_12px_35px_rgba(44,115,185,0.04)] space-y-6"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#718a9e] mb-3 flex items-center gap-1.5">
            <Filter size={14} className="text-[#2c73b9]" /> PILIH KATEGORI EDUKASI:
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id && !selectedTopic;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all border ${
                    isActive
                      ? "border-[#2c73b9] bg-[#2c73b9] text-white shadow-sm"
                      : "border-[#d2dfec] bg-[#f4f8fc] text-[#5a6e7f] hover:border-[#a8c3e0] hover:bg-white hover:text-[#0f2d4a]"
                  }`}
                >
                  <Icon size={14} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
          <div>
            <h3 className="text-lg font-bold text-[#0f2d4a] flex items-center gap-2">
              Daftar Artikel & Panduan
              {loading && <Loader2 size={16} className="animate-spin text-[#2c73b9]" />}
            </h3>
          </div>

          <div className="relative w-full sm:w-80">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#718a9e]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Cari kata kunci edukasi..."
              className="w-full rounded-full border border-[#d2dfec] bg-[#f4f8fc] pl-10 pr-9 py-2 text-xs text-[#0f2d4a] focus:border-[#2c73b9] focus:bg-white focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#718a9e] hover:text-[#0f2d4a]"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#2c73b9] space-y-3">
            <Loader2 size={32} className="animate-spin" />
            <p className="text-xs font-semibold">Memuat data artikel...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#b8cde4] bg-[#f4f8fc] px-6 py-12 text-center text-sm text-[#5a6e7f]">
            Belum ada artikel edukasi yang sesuai dengan pencarian/kategori.
          </div>
        ) : (
          <>
            <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <CardEdukasi key={item.id} item={item} />
              ))}
            </div>

            <Pagination
              currentPage={page}
              lastPage={lastPageNum}
              total={totalCount}
              perPage={perPage}
              basePath="/edukasi"
              onPageChange={(newPage) => {
                setPage(newPage);
                const el = document.getElementById("artikel-grid-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </>
        )}
      </div>

      {showCalc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowCalc(false);
          }}
        >
          <div className="w-full max-w-lg rounded-[28px] border border-[#d2dfec] bg-white p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#edf3f9] pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef4fc] text-[#2c73b9]">
                  <Calculator size={20} />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#0f2d4a]">
                    Kalkulator Status Gizi Balita
                  </h4>
                  <p className="text-xs text-[#5a6e7f]">
                    Cek estimasi pertumbuhan anak secara mandiri
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCalc(false)}
                className="rounded-full p-2 text-[#718a9e] hover:bg-[#f4f8fc] hover:text-[#0f2d4a] transition-colors border border-transparent hover:border-[#d2dfec]"
                title="Tutup Modal (X)"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCalculate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0f2d4a] mb-1.5">
                  Jenis Kelamin Balita
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCalcGender("laki")}
                    className={`rounded-2xl border py-2.5 text-xs font-bold transition-all ${
                      calcGender === "laki"
                        ? "border-[#2c73b9] bg-[#eef4fc] text-[#2c73b9]"
                        : "border-[#d2dfec] bg-[#f4f8fc] text-[#5a6e7f]"
                    }`}
                  >
                    👦 Laki-Laki
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcGender("perempuan")}
                    className={`rounded-2xl border py-2.5 text-xs font-bold transition-all ${
                      calcGender === "perempuan"
                        ? "border-[#2c73b9] bg-[#eef4fc] text-[#2c73b9]"
                        : "border-[#d2dfec] bg-[#f4f8fc] text-[#5a6e7f]"
                    }`}
                  >
                    👧 Perempuan
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-[#0f2d4a]">
                    Usia Balita (Bulan) *
                  </label>
                  {calcAgeMonth && (
                    <button
                      type="button"
                      onClick={() => setCalcAgeMonth("")}
                      className="text-[11px] text-[#2c73b9] hover:underline"
                    >
                      Kosongkan
                    </button>
                  )}
                </div>
                <input
                  type="number"
                  min="0"
                  max="60"
                  required
                  value={calcAgeMonth}
                  onChange={(e) => setCalcAgeMonth(e.target.value)}
                  className="w-full rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] px-4 py-2.5 text-xs text-[#0f2d4a] focus:border-[#2c73b9] focus:bg-white focus:outline-none"
                  placeholder="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#0f2d4a]">
                      Berat Badan (kg) *
                    </label>
                    {calcWeight && (
                      <button
                        type="button"
                        onClick={() => setCalcWeight("")}
                        className="text-[11px] text-[#2c73b9] hover:underline"
                      >
                        Kosongkan
                      </button>
                    )}
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(e.target.value)}
                    className="w-full rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] px-4 py-2.5 text-xs text-[#0f2d4a] focus:border-[#2c73b9] focus:bg-white focus:outline-none"
                    placeholder="0"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#0f2d4a]">
                      Tinggi / Panjang (cm) *
                    </label>
                    {calcHeight && (
                      <button
                        type="button"
                        onClick={() => setCalcHeight("")}
                        className="text-[11px] text-[#2c73b9] hover:underline"
                      >
                        Kosongkan
                      </button>
                    )}
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={calcHeight}
                    onChange={(e) => setCalcHeight(e.target.value)}
                    className="w-full rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] px-4 py-2.5 text-xs text-[#0f2d4a] focus:border-[#2c73b9] focus:bg-white focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-[#2c73b9] py-3 text-xs font-bold text-white shadow-md hover:bg-[#1e5a9a] transition-all flex items-center justify-center gap-2"
                >
                  <Calculator size={16} />
                  <span>Hitung Status Gizi</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetCalc}
                  className="rounded-full border border-[#d2dfec] bg-[#f4f8fc] px-5 py-3 text-xs font-bold text-[#5a6e7f] hover:bg-[#e1ecf7] hover:text-[#0f2d4a] hover:border-[#a0bce0] transition-all flex items-center justify-center gap-1.5"
                  title="Hapus / Reset Semua Input"
                >
                  <RotateCcw size={15} />
                  <span>Hapus</span>
                </button>
              </div>
            </form>

            {calcResult && (
              <div className="mt-5 space-y-3 pt-3 border-t border-[#edf3f9]">
                <div className={`rounded-2xl border p-4 ${calcResult.badgeStyle}`}>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                    Hasil Estimasi:
                  </p>
                  <p className="text-sm font-extrabold mt-0.5">{calcResult.status}</p>
                  <p className="text-[11px] opacity-80 mt-0.5">
                    Indeks Massa Tubuh (IMT): {calcResult.bmi} kg/m²
                  </p>
                </div>

                <div className="rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] p-4 text-xs text-[#5a6e7f] leading-6">
                  <p className="font-bold text-[#0f2d4a] flex items-center gap-1.5 mb-1">
                    <Info size={14} className="text-[#2c73b9]" /> Catatan Kesehatan:
                  </p>
                  <p>{calcResult.advice}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
