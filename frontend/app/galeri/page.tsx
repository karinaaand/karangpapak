import PageHeader from "@/components/PageHeader";
import GaleriClientView from "@/components/GaleriClientView";

export const metadata = {
  title: "Galeri Desa - Karangpapak",
  description: "Dokumentasi foto kegiatan pembangunan, kebun edukasi tani, posyandu, dan kebudayaan Desa Karangpapak.",
};

export default function GaleriPage() {
  return (
    <div className="bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_45%,#ffffff_100%)] min-h-screen">
      <PageHeader
        title="Galeri Dokumentasi Desa"
        description="Dokumentasi foto kegiatan pembangunan infrastruktur desa, pemberdayaan UMKM, kebun edukasi tani, dan kegiatan sosial warga Karangpapak."
      />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <GaleriClientView />
        </div>
      </section>
    </div>
  );
}
