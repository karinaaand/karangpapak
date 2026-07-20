import PageHeader from "@/components/PageHeader";
import EdukasiClientView from "@/components/EdukasiClientView";
import { getEdukasi } from "@/services/api";

type EdukasiPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function EdukasiPage({ searchParams }: EdukasiPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? "1"));

  // Ambil artikel edukasi dengan pembatasan 6 per halaman
  const res = await getEdukasi(page, 6);

  return (
    <div className="bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_45%,#ffffff_100%)] min-h-screen">
      <PageHeader
        badge="Edukasi & Literasi Warga"
        title="Edukasi Desa Karangpapak"
        description="Pusat informasi, panduan publik, artikel kesehatan, serta sarana edukasi masyarakat Desa Karangpapak."
      />

      <main className="px-4 py-10 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <EdukasiClientView
          initialItems={res.data}
          currentPage={res.current_page}
          lastPage={res.last_page}
          total={res.total}
          perPage={res.per_page}
        />
      </main>
    </div>
  );
}
