import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Edukasi } from "@/types/edukasi";

type CardEdukasiProps = {
  item: Edukasi;
};

const CATEGORY_LABELS: Record<string, string> = {
  "stunting-gizi": "Stunting & Gizi",
  "literasi-digital": "Literasi Digital",
  "lingkungan-sehat": "Lingkungan Sehat",
  "kesiapsiagaan": "Kesiapsiagaan Bencana",
  "keamanan": "Keamanan Lingkungan",
};

const CATEGORY_STYLES: Record<string, string> = {
  "stunting-gizi": "bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]",
  "literasi-digital": "bg-[#eef4fc] text-[#2c73b9] border-[#c0d4f7]",
  "lingkungan-sehat": "bg-[#f0fdf4] text-[#15803d] border-[#bbf7d0]",
  "kesiapsiagaan": "bg-[#fff8ec] text-[#b45309] border-[#fde68a]",
  "keamanan": "bg-[#f4f6f8] text-[#374151] border-[#e5e7eb]",
};

export default function CardEdukasi({ item }: CardEdukasiProps) {
  const categoryLabel = CATEGORY_LABELS[item.category] ?? item.category.replace("-", " ");
  const badgeStyle = CATEGORY_STYLES[item.category] ?? "bg-[#eef4fc] text-[#2c73b9] border-[#c0d4f7]";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#d2dfec] bg-white shadow-[0_12px_32px_rgba(44,115,185,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#a8c3e0] hover:shadow-[0_20px_48px_rgba(44,115,185,0.12)]">
      <div className="relative w-full flex-shrink-0" style={{ paddingTop: "55%" }}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#eef4fc,#d2dfec)]">
          {item.thumbnail_url ? (
            <Image
              src={item.thumbnail_url}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-semibold uppercase tracking-[0.22em] text-[#2c73b9]">
              Edukasi Desa
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className={`inline-block w-fit rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${badgeStyle}`}>
          {categoryLabel}
        </span>

        <h3 className="mt-3 text-base font-bold leading-snug text-[#0f2d4a] transition-colors group-hover:text-[#2c73b9]">
          {item.title}
        </h3>

        <p className="mt-2 flex-1 line-clamp-3 text-sm leading-7 text-[#5a6e7f]">
          {item.excerpt ?? item.content}
        </p>

        <div className="mt-5 pt-4">
          <Link
            href={`/edukasi/${item.category}/${item.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#2c73b9] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#1e5a9a] hover:gap-3"
          >
            Baca Selengkapnya
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}