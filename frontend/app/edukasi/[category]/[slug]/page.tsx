import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { getEdukasiDetail } from "@/services/api";

type DetailProps = {
  params: Promise<{ category: string; slug: string }>;
};

export default async function EdukasiDetailPage({ params }: DetailProps) {
  const { category, slug } = await params;
  const item = await getEdukasiDetail(slug);

  return (
    <div className="bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_45%,#ffffff_100%)] min-h-screen">
      <PageHeader 
        title={item.title} 
        description={item.excerpt ?? "Detail artikel edukasi resmi Desa Karangpapak."} 
      />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/edukasi"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d2dfec] bg-white px-4 py-2 text-sm font-semibold text-[#2c73b9] shadow-sm transition-all hover:bg-[#eef4fc] hover:border-[#2c73b9]"
        >
          <ArrowLeft size={16} />
          Kembali ke Edukasi
        </Link>
        <article className="overflow-hidden rounded-[30px] border border-[#d2dfec] bg-white shadow-[0_18px_45px_rgba(44,115,185,0.06)]">
          {item.thumbnail_url && (
            <div className="relative h-[400px] w-full bg-[linear-gradient(135deg,#eef4fc,#d2dfec)]">
              <img
                src={item.thumbnail_url}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="p-8 sm:p-10">
            <div className="prose prose-blue max-w-none">
              <span className="inline-block rounded-full bg-[#eef4fc] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2c73b9] mb-6">
                Kategori: {category.replace("-", " ")}
              </span>
              <p className="text-base leading-8 text-[#4f5d6d] whitespace-pre-line">
                {item.content}
              </p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
