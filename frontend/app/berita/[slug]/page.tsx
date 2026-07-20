import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { getBeritaDetail } from "@/services/api";

type DetailProps = {
  params: Promise<{ slug: string }>;
};

export default async function BeritaDetailPage({ params }: DetailProps) {
  const { slug } = await params;
  const berita = await getBeritaDetail(slug);

  if (!berita || !berita.title) {
    notFound();
  }

  return (
    <div className="bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_45%,#ffffff_100%)] min-h-screen">
      <PageHeader title={berita.title} description={berita.excerpt ?? "Detail berita resmi desa."} />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/berita"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d2dfec] bg-white px-4 py-2 text-sm font-semibold text-[#2c73b9] shadow-sm transition-all hover:bg-[#f4f8fc] hover:border-[#2c73b9]"
        >
          <ArrowLeft size={16} />
          Kembali ke Berita
        </Link>
        <article className="rounded-[30px] border border-[#d2dfec] bg-white p-8 shadow-[0_18px_45px_rgba(44,115,185,0.08)] sm:p-10">
          <p className="text-base leading-8 text-[#4f5d6d] whitespace-pre-line">{berita.content}</p>
        </article>
      </main>
    </div>
  );
}