import PageHeader from "@/components/PageHeader";
import GisMap from "@/components/GisMap";

export const metadata = {
  title: "Geografis & Peta GIS - Desa Karangpapak",
  description: "Peta GIS Wilayah, Batas Administratif, Fasilitas Publik, serta Potensi Wilayah Desa Karangpapak, Kecamatan Cisolok, Kabupaten Sukabumi.",
};

export default function GeografisPage() {
  return (
    <div className="bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_45%,#ffffff_100%)] min-h-screen">
      <PageHeader
        title="Geografis & Peta GIS Wilayah"
        description="Peta digital GIS interaktif wilayah Desa Karangpapak, batas administratif desa, letak fasilitas publik, sentra UMKM, dan pusat edukasi pertanian tani."
      />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <GisMap />
        </div>
      </section>
    </div>
  );
}
