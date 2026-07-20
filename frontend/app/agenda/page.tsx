import PageHeader from "@/components/PageHeader";
import AgendaClientView from "@/components/AgendaClientView";

export const metadata = {
  title: "Agenda Kegiatan Desa - Karangpapak",
  description: "Daftar jadwal kegiatan, musyawarah desa, posyandu, pelatihan UMKM, dan aksi gotong royong Desa Karangpapak.",
};

export default function AgendaPage() {
  return (
    <div className="bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_45%,#ffffff_100%)] min-h-screen">
      <PageHeader
        title="Agenda Kegiatan Desa"
        description="Jadwal lengkap kegiatan desa, musyawarah APBDes, pelayanan posyandu, pelatihan keterampilan warga, dan aksi lingkungan Karangpapak."
      />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <AgendaClientView />
        </div>
      </section>
    </div>
  );
}
