import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function NotFound() {
  return (
    <div className="bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_45%,#ffffff_100%)] min-h-screen">
      <PageHeader
        title="Halaman Tidak Ditemukan (404)"
        description="Halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia."
      />

      <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#d2dfec] bg-white p-8 sm:p-12 shadow-[0_18px_50px_rgba(44,115,185,0.08)] space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#eef4fc] text-[#2c73b9]">
            <FileQuestion size={40} />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-[#0f2d4a]">
              Informasi Tidak Ditemukan
            </h2>
            <p className="text-sm text-[#5a6e7f] leading-relaxed max-w-md mx-auto">
              Maaf, konten yang Anda minta tidak dapat ditemukan atau belum dipublikasikan oleh pihak desa.
            </p>
          </div>

          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#2c73b9] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#1e5a9a] transition-all"
            >
              <ArrowLeft size={16} />
              <span>Kembali ke Beranda Utama</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
