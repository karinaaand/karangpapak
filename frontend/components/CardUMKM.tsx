"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, UserRound } from "lucide-react";
import { Umkm } from "@/types/umkm";

type CardUMKMProps = {
  item: Umkm;
};

export default function CardUMKM({ item }: CardUMKMProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#d2dfec] bg-white shadow-[0_16px_40px_rgba(44,115,185,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#a8c3e0] hover:shadow-[0_24px_55px_rgba(44,115,185,0.12)]">
      <div className="relative w-full flex-shrink-0" style={{ paddingTop: "58%" }}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#eef4fc_0%,#d2dfec_45%,#fffaf0_100%)]">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-semibold uppercase tracking-[0.24em] text-[#2c73b9]">
              Foto UMKM
            </div>
          )}
        </div>
      </div>


      <div className="flex flex-1 flex-col p-6">

        <div className="flex flex-wrap items-center gap-2">
          {item.category ? (
            <span className="rounded-full bg-[#eef4fc] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2c73b9]">
              {item.category}
            </span>
          ) : null}
          {item.is_featured ? (
            <span className="rounded-full bg-[#fff4dd] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#c8861a]">
              Unggulan
            </span>
          ) : null}
        </div>


        <h3 className="mt-3 text-lg font-bold leading-snug text-[#0f2d4a] transition-colors group-hover:text-[#2c73b9]">
          {item.name}
        </h3>


        <div className="mt-3 space-y-1.5">
          {item.owner_name ? (
            <p className="flex items-center gap-2 text-sm text-[#5a6e7f]">
              <UserRound size={14} className="flex-shrink-0 text-[#2c73b9]" />
              <span className="truncate">{item.owner_name}</span>
            </p>
          ) : null}
          {item.address ? (
            <p className="flex items-start gap-2 text-sm text-[#5a6e7f]">
              <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#2c73b9]" />
              <span className="line-clamp-1">{item.address}</span>
            </p>
          ) : null}
          {item.phone ? (
            <p className="flex items-center gap-2 text-sm text-[#5a6e7f]">
              <Phone size={14} className="flex-shrink-0 text-[#2c73b9]" />
              <span>{item.phone}</span>
            </p>
          ) : null}
        </div>


        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-[#5a6e7f]">
          {item.description ?? "Informasi usaha warga Desa Karangpapak."}
        </p>

        <div className="mt-5 pt-4">
          <Link
            href={`/umkm/${item.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#2c73b9] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#1e5a9a] hover:gap-3"
          >
            Lihat Detail
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
