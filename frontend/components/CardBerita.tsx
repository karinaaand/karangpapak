import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Berita } from "@/types/berita";

type CardBeritaProps = {
  item: Berita;
  compact?: boolean;
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function CardBeritaCompact({ item }: { item: Berita }) {
  return (
    <Link
      href={`/berita/${item.slug}`}
      className="group flex gap-3 rounded-2xl border border-[#d2dfec] bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-[#a8c3e0] hover:shadow-sm"
    >
      <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-[linear-gradient(135deg,#eef4fc_0%,#d2dfec_100%)]">
        {item.thumbnail_url ? (
          <Image
            src={item.thumbnail_url}
            alt={item.title}
            fill
            sizes="80px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-[#2c73b9]">
            Berita
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center gap-1">
        {item.published_at ? (
          <p className="flex items-center gap-1.5 text-[11px] text-[#718a9e]">
            <CalendarDays size={12} />
            {formatDate(item.published_at)}
          </p>
        ) : null}
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#0f2d4a] group-hover:text-[#2c73b9]">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}


function CardBeritaFull({ item }: { item: Berita }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#d2dfec] bg-white shadow-[0_16px_40px_rgba(44,115,185,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#a8c3e0] hover:shadow-[0_24px_55px_rgba(44,115,185,0.12)]">
      <div className="relative w-full flex-shrink-0" style={{ paddingTop: "58%" }}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#eef4fc_0%,#d2dfec_45%,#fffaf0_100%)]">
          {item.thumbnail_url ? (
            <Image
              src={item.thumbnail_url}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-semibold uppercase tracking-[0.24em] text-[#2c73b9]">
              Informasi Desa
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#eef4fc] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2c73b9]">
            Berita Desa
          </span>
          {item.published_at ? (
            <span className="flex items-center gap-1.5 text-[11px] text-[#718a9e]">
              <CalendarDays size={12} />
              {formatDate(item.published_at)}
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-[#0f2d4a] transition-colors group-hover:text-[#2c73b9]">
          {item.title}
        </h3>

        <p className="mt-2 flex-1 line-clamp-3 text-sm leading-7 text-[#5a6e7f]">
          {item.excerpt ?? item.content}
        </p>

        <div className="mt-5 pt-4">
          <Link
            href={`/berita/${item.slug}`}
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

export default function CardBerita({ item, compact = false }: CardBeritaProps) {
  return compact ? <CardBeritaCompact item={item} /> : <CardBeritaFull item={item} />;
}
