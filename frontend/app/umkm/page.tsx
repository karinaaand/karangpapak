import CardUMKM from "@/components/CardUMKM";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { getUmkm } from "@/services/api";

export const metadata = {
  title: "Katalog UMKM - Desa Karangpapak",
  description:
    "Temukan produk dan usaha warga Desa Karangpapak dalam tampilan yang lebih rapi dan mudah dijelajahi.",
};

type UmkmPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function UmkmPage({ searchParams }: UmkmPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? "1"));
  const res = await getUmkm(page, 3);

  return (
    <div className="bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_45%,#ffffff_100%)]">
      <PageHeader
        title="Katalog UMKM Desa"
        description="Jelajahi berbagai produk dan usaha lokal yang ada di Desa Karangpapak."
      />

      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[30px] border border-[#d2dfec] bg-white p-8 shadow-[0_18px_45px_rgba(44,115,185,0.08)] sm:p-10">
          {res.data.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-[#b8cde4] bg-[#f4f8fc] px-6 py-12 text-center text-sm leading-7 text-[#5a6e7f]">
              Data UMKM belum tersedia. Halaman ini akan langsung menampilkan daftar usaha warga setelah data ditambahkan.
            </div>
          ) : (
            <>
              <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {res.data.map((item) => (
                  <CardUMKM key={item.id} item={item} />
                ))}
              </div>

              <Pagination
                currentPage={res.current_page}
                lastPage={res.last_page}
                total={res.total}
                perPage={res.per_page}
                basePath="/umkm"
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
