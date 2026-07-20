"use client";

import {
  X,
  Sparkles,
  Lightbulb,
  Calendar,
  Dna,
  Utensils,
  AlertTriangle,
  Video,
  Globe,
  ExternalLink,
  BookOpen,
  Baby,
  HeartPulse,
  Droplet,
  ChevronRight,
} from "lucide-react";
import { TopicGuide } from "@/services/topicGuidesData";

interface TopicDetailModalProps {
  guide: TopicGuide;
  onClose: () => void;
  onFilterArticles: () => void;
}

export default function TopicDetailModal({
  guide,
  onClose,
  onFilterArticles,
}: TopicDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[28px] border border-[#d2dfec] bg-white p-6 sm:p-8 shadow-2xl space-y-8 my-auto text-[#0f2d4a]">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f8fc] text-[#5a6e7f] border border-[#d2dfec] hover:bg-[#2c73b9] hover:text-white transition-all shadow-sm z-10"
        >
          <X size={20} />
        </button>

        <div className="space-y-3 border-b border-[#edf3f9] pb-6 pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c0d4f7] bg-[#eef4fc] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#2c73b9]">
              <Sparkles size={14} /> {guide.badge}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d2dfec] bg-[#f4f8fc] px-3 py-1 text-xs font-semibold text-[#5a6e7f]">
              Panduan Edukasi Desa
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2d4a]">
            {guide.title}
          </h2>
          <p className="text-sm text-[#5a6e7f] leading-relaxed">
            {guide.subtitle}
          </p>
        </div>

        <div className="rounded-2xl border border-[#c5d8f2] bg-[#f4f8fc] p-5 sm:p-6 space-y-2">
          <h3 className="text-base font-extrabold text-[#0f2d4a] flex items-center gap-2">
            <Lightbulb size={20} className="text-[#2c73b9]" />
            {guide.definitionTitle}
          </h3>
          <p className="text-xs sm:text-sm text-[#40566d] leading-relaxed">
            {guide.definitionDesc}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#0f2d4a] flex items-center gap-2">
              <Calendar size={20} className="text-[#2c73b9]" />
              {guide.dailyNeedsTitle}
            </h3>
            <p className="text-xs text-[#5a6e7f]">{guide.dailyNeedsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guide.dailyNeeds.map((need, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#d2dfec] bg-white p-5 shadow-sm space-y-3"
              >
                <h4 className="text-xs font-extrabold text-[#2c73b9] uppercase tracking-wide">
                  {need.stage}
                </h4>
                <ul className="space-y-2 text-xs text-[#40566d]">
                  {need.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2c73b9] mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {guide.fluidsAndSupplements.length > 0 && (
            <div className="rounded-xl border border-[#d2dfec] bg-[#f9fcff] p-4 flex flex-wrap items-center justify-around gap-3 text-xs font-semibold text-[#0f2d4a]">
              {guide.fluidsAndSupplements.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Droplet size={14} className="text-[#2c73b9]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4 pt-4 border-t border-[#edf3f9]">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#0f2d4a] flex items-center gap-2">
              <Dna size={20} className="text-[#2c73b9]" />
              {guide.nutrientsTitle}
            </h3>
            <p className="text-xs text-[#5a6e7f]">{guide.nutrientsSubtitle}</p>
          </div>

          <div className="space-y-4">
            {guide.nutrientStages.map((stage, stageIdx) => (
              <div key={stageIdx} className="space-y-3">
                <h4 className="text-xs font-bold text-[#0f2d4a] bg-[#eef4fc] p-3 rounded-xl border border-[#c0d4f7]">
                  {stage.title}
                </h4>

                <div className="overflow-x-auto rounded-2xl border border-[#d2dfec]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f4f8fc] text-[#5a6e7f] font-bold border-b border-[#d2dfec]">
                      <tr>
                        <th className="py-3 px-4">Zat Gizi</th>
                        <th className="py-3 px-4">Fungsi Utama</th>
                        <th className="py-3 px-4">Bahan Makanan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#edf3f9] text-[#40566d]">
                      {stage.nutrients.map((n, nIdx) => (
                        <tr key={nIdx} className="hover:bg-[#f9fcff]">
                          <td className="py-3 px-4 font-bold text-[#0f2d4a]">
                            {n.name}
                          </td>
                          <td className="py-3 px-4">{n.function}</td>
                          <td className="py-3 px-4 font-medium text-[#2c73b9]">
                            {n.sources}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#edf3f9]">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#0f2d4a] flex items-center gap-2">
              <Utensils size={20} className="text-[#2c73b9]" />
              {guide.menuTitle}
            </h3>
            <p className="text-xs text-[#5a6e7f]">{guide.menuSubtitle}</p>
          </div>

          <div className="space-y-4">
            {guide.menus.map((menuStage, mIdx) => (
              <div
                key={mIdx}
                className="rounded-2xl border border-[#d2dfec] bg-[#f9fcff] p-5 space-y-3"
              >
                <h4 className="text-xs font-bold text-[#2c73b9]">
                  {menuStage.stage}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {menuStage.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="rounded-xl border border-[#d2dfec] bg-white p-3 space-y-1 shadow-xs"
                    >
                      <span className="text-[10px] font-extrabold uppercase text-[#718a9e] tracking-wider block">
                        {item.time}
                      </span>
                      <p className="text-xs text-[#0f2d4a] font-medium leading-snug">
                        {item.menu}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#edf3f9]">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#0f2d4a] flex items-center gap-2">
              <AlertTriangle size={20} className="text-[#9a2020]" />
              {guide.impactTitle}
            </h3>
            <p className="text-xs text-[#5a6e7f]">{guide.impactSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guide.impacts.map((imp, impIdx) => (
              <div
                key={impIdx}
                className="rounded-2xl border border-[#f5b8b8] bg-[#fff8f8] p-5 space-y-3"
              >
                <h4 className="text-xs font-bold text-[#9a2020] flex items-center gap-2">
                  {imp.iconType === "mother" ? (
                    <HeartPulse size={16} />
                  ) : (
                    <Baby size={16} />
                  )}
                  {imp.target}
                </h4>
                <ul className="space-y-2 text-xs text-[#7a1818]">
                  {imp.points.map((pt, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9a2020] mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] p-5 sm:p-6 space-y-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-[#0f2d4a] flex items-center gap-2">
              <Video size={18} className="text-[#2c73b9]" />
              {guide.videoTitle}
            </h4>
            <p className="text-xs text-[#5a6e7f] leading-relaxed max-w-xl">
              {guide.videoDesc}
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              onFilterArticles();
            }}
            className="inline-flex items-center gap-2 rounded-full bg-[#2c73b9] px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#1e5a9a] shadow-sm shrink-0"
          >
            <BookOpen size={14} />
            <span>Lihat Artikel Terkait</span>
          </button>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#edf3f9]">
          <div>
            <h3 className="text-base font-extrabold text-[#0f2d4a] flex items-center gap-2">
              <Globe size={18} className="text-[#2c73b9]" />
              Referensi Website Terkait Stunting & Gizi
            </h3>
            <p className="text-xs text-[#5a6e7f]">
              Platform resmi & terpercaya untuk informasi stunting dan gizi anak
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {guide.references.map((ref, rIdx) => (
              <a
                key={rIdx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-[#d2dfec] bg-white p-4 hover:border-[#2c73b9] hover:bg-[#f4f8fc] hover:-translate-y-0.5 transition-all block space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#0f2d4a] group-hover:text-[#2c73b9]">
                    {ref.name}
                  </span>
                  <ExternalLink
                    size={14}
                    className="text-[#718a9e] group-hover:text-[#2c73b9] transition-colors"
                  />
                </div>
                <span className="text-[11px] font-semibold text-[#2c73b9] block">
                  {ref.org}
                </span>
                <p className="text-[11px] text-[#5a6e7f] leading-snug">
                  {ref.desc}
                </p>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#edf3f9]">
          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-full border border-[#d2dfec] bg-white px-6 py-2.5 text-xs font-bold text-[#5a6e7f] hover:bg-[#f4f8fc] hover:text-[#0f2d4a] transition-all text-center"
          >
            Tutup Panduan
          </button>
          <button
            onClick={() => {
              onClose();
              onFilterArticles();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#2c73b9] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#1e5a9a] transition-all shadow-sm text-center"
          >
            <span>Tampilkan Daftar Artikel Topik Ini</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
