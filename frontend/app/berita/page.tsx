import CardBerita from "@/components/CardBerita";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { getBerita } from "@/services/api";

export const metadata = {
  title: "Berita Desa - Karangpapak",
  description: "Informasi terkini mengenai kegiatan, program, dan pengumuman resmi dari Pemerintah Desa Karangpapak.",
};

type BeritaPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BeritaPage({ searchParams }: BeritaPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? "1"));
  const res = await getBerita(page, 3);

  return (
    <div className="bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_45%,#ffffff_100%)]">
      <PageHeader
        title="Berita Desa"
        description="Informasi kegiatan, program, dan pengumuman resmi desa kini tampil lebih terstruktur agar mudah diikuti warga."
      />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[30px] border border-[#d2dfec] bg-white p-8 shadow-[0_18px_50px_rgba(44,115,185,0.08)] sm:p-10">
          {res.data.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-[#b8cde4] bg-[#f4f8fc] px-6 py-12 text-center text-sm leading-7 text-[#5a6e7f]">
              Berita dan pengumuman desa belum tersedia. Area ini akan otomatis menampilkan konten setelah dipublikasikan dari dashboard admin.
            </div>
          ) : (
            <>
              <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {res.data.map((item) => (
                  <CardBerita key={item.id} item={item} />
                ))}
              </div>

              <Pagination
                currentPage={res.current_page}
                lastPage={res.last_page}
                total={res.total}
                perPage={res.per_page}
                basePath="/berita"
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
}
