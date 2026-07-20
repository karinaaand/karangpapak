import { ArrowRight, BadgeCheck, Clock3, FileText } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { getLayanan } from "@/services/api";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function LayananPage({ searchParams }: Props) {
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);
  const result = await getLayanan(page, 3);

  const layanan = result.data;
  const total = result.total;
  const lastPage = result.last_page;
  const currentPage = result.current_page;

  return (
    <div className="bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_45%,#ffffff_100%)]">
      <PageHeader
        title="Layanan Administrasi"
        description="Panduan layanan publik dengan tampilan yang lebih rapi agar warga lebih mudah memahami persyaratan dan alur pelayanan."
      />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[30px] border border-[#d2dfec] bg-white p-8 shadow-[0_18px_45px_rgba(44,115,185,0.08)] sm:p-10">

          {layanan.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-[#b8cde4] bg-[#f4f8fc] px-6 py-12 text-center text-sm leading-7 text-[#5a6e7f]">
              Daftar layanan belum tersedia. Halaman ini sudah disiapkan dengan struktur yang konsisten dan akan otomatis terisi saat data dipublikasikan.
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {layanan.map((item, index) => (
                  <article
                    key={item.id}
                    className="flex h-full flex-col rounded-[28px] border border-[#d2dfec] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_100%)] p-6 shadow-[0_14px_35px_rgba(44,115,185,0.06)] transition-all hover:-translate-y-1 hover:border-[#a8c3e0] hover:shadow-[0_20px_45px_rgba(44,115,185,0.10)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-[#eef4fc] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#2c73b9]">
                        Layanan {String((currentPage - 1) * 3 + index + 1).padStart(2, "0")}
                      </span>
                      <BadgeCheck size={18} className="text-[#2c73b9]" />
                    </div>

                    <h2 className="mt-4 text-xl font-bold leading-snug text-[#0f2d4a]">{item.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-7 text-[#5a6e7f] line-clamp-4">
                      {item.summary ?? item.content ?? "Ringkasan layanan akan tersedia setelah data dilengkapi."}
                    </p>

                    <div className="mt-6 space-y-3 pt-5 text-sm text-[#5a6e7f]">
                      <div className="flex items-start gap-3">
                        <FileText size={16} className="mt-1 flex-shrink-0 text-[#e8a020]" />
                        <p>
                          <span className="font-semibold text-[#0f2d4a]">Persyaratan:</span>{" "}
                          {item.requirements ?? "Persyaratan akan diperbarui dari dashboard admin."}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <ArrowRight size={16} className="mt-1 flex-shrink-0 text-[#2c73b9]" />
                        <p>
                          <span className="font-semibold text-[#0f2d4a]">Kontak:</span>{" "}
                          {item.contact_person ?? "Kontak petugas belum tersedia."}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                total={total}
                perPage={3}
                basePath="/layanan"
              />
            </>
          )}
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[30px] border border-[#d2dfec] bg-[linear-gradient(160deg,#0f2d4a_0%,#2c73b9_48%,#1e5a9a_100%)] p-8 text-white shadow-[0_22px_60px_rgba(44,115,185,0.20)] sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="mt-4 text-3xl font-bold uppercase tracking-[0.24em] text-[#93c5fd]">Informasi Tambahan</h3>
              <p className="mt-4 text-sm leading-8 text-[#d2e2f5] sm:text-[15px]">
                Jam pelayanan Kantor Desa Karangpapak untuk membantu masyarakat memperoleh layanan administrasi sesuai waktu operasional.
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/8 px-6 py-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Clock3 size={20} className="text-[#f4c15d]" />
                <div>
                  <p className="text-sm font-semibold text-white">Senin - Jumat</p>
                  <p className="mt-1 text-sm text-[#d2e2f5]">08:00 - 14:00 WIB</p>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/kontak"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
          >
            Hubungi kantor desa
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
