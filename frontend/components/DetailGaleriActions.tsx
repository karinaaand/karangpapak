"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function DetailGaleriActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWA = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Lihat Dokumentasi Galeri Desa Karangpapak: ${title}`);
      window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, "_blank");
    }
  };

  const handleShareFB = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    }
  };

  return (
    <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-xs font-bold text-[#0f2d4a]">
        <Share2 size={16} className="text-[#2c73b9]" />
        <span>Bagikan Foto:</span>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={handleShareWA}
          className="rounded-full border border-[#d2dfec] bg-white px-4 py-2 font-bold text-[#334155] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all shadow-sm"
        >
          WhatsApp
        </button>

        <button
          onClick={handleShareFB}
          className="rounded-full border border-[#d2dfec] bg-white px-4 py-2 font-bold text-[#334155] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all shadow-sm"
        >
          Facebook
        </button>

        <button
          onClick={handleCopyLink}
          className="rounded-full border border-[#d2dfec] bg-white px-4 py-2 font-bold text-[#334155] hover:bg-[#2c73b9] hover:text-white hover:border-[#2c73b9] transition-all shadow-sm flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-500" />
              <span className="text-emerald-600 font-extrabold">Tautan Tersalin!</span>
            </>
          ) : (
            <span>Salin Tautan</span>
          )}
        </button>
      </div>
    </div>
  );
}
