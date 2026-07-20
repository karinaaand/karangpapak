"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_45%,#ffffff_100%)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white border border-[#d2dfec] rounded-[32px] p-8 sm:p-10 text-center shadow-[0_18px_50px_rgba(44,115,185,0.08)] space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff2f2] text-[#e53e3e]">
          <AlertTriangle size={32} />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-[#0f2d4a]">
            Terjadi Kendala Memuat Halaman
          </h1>
          <p className="text-sm text-[#5a6e7f] leading-relaxed">
            Sistem mengalami kendala sementara saat memuat data dari server. Silakan coba muat ulang atau kembali ke beranda.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#2c73b9] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#1e5a9a] transition-all cursor-pointer"
          >
            <RefreshCw size={16} />
            <span>Coba Lagi</span>
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#d2dfec] bg-white px-6 py-3 text-xs font-bold text-[#2c73b9] shadow-sm hover:bg-[#f4f8fc] transition-all"
          >
            <Home size={16} />
            <span>Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
