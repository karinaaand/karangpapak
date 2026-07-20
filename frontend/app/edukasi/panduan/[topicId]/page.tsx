import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Lightbulb,
  Calendar,
  Dna,
  Utensils,
  AlertTriangle,
  Globe,
  ExternalLink,
  HeartPulse,
  Baby,
  Droplet,
  BookOpen,
  Clock,
  CheckCircle2,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { TOPIC_GUIDES_DATA } from "@/services/topicGuidesData";
import { getEdukasi } from "@/services/api";
import CardEdukasi from "@/components/CardEdukasi";
import { notFound } from "next/navigation";

type PanduanPageProps = {
  params: Promise<{ topicId: string }>;
};

export default async function PanduanTopicDetailPage({ params }: PanduanPageProps) {
  const { topicId } = await params;
  const guide = TOPIC_GUIDES_DATA[topicId];

  if (!guide) {
    notFound();
  }

  let relatedArticles: any[] = [];
  try {
    const searchTerms: Record<string, string> = {
      "gizi-ibu-hamil": "hamil",
      "gizi-balita-anak": "balita",
      "mpasi-resep": "mpasi",
      "pencegahan-stunting": "stunting",
      "1000-hpk": "1000 hpk",
      "posyandu-pemantauan": "posyandu",
    };
    const query = searchTerms[topicId] || "gizi";
    const res = await getEdukasi(1, 6, "stunting-gizi", query);
    relatedArticles = res.data || [];
  } catch {
  }

  return (
    <div className="bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_45%,#ffffff_100%)] min-h-screen pb-16 text-[#0f2d4a]">
      <PageHeader
        title={guide.title}
        description={guide.subtitle}
      />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link
            href="/edukasi"
            className="inline-flex items-center gap-2 rounded-full border border-[#d2dfec] bg-white px-5 py-2.5 text-xs font-bold text-[#2c73b9] shadow-xs transition-all hover:bg-[#eef4fc] hover:border-[#2c73b9] hover:shadow-sm"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Pusat Edukasi</span>
          </Link>
        </div>

        <article className="rounded-[32px] border border-[#d2dfec] bg-white p-6 sm:p-10 shadow-[0_18px_50px_rgba(44,115,185,0.06)] space-y-10">
          <div className="space-y-3 border-b border-[#edf3f9] pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c0d4f7] bg-[#eef4fc] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#2c73b9]">
                <Sparkles size={14} /> {guide.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d2dfec] bg-[#f4f8fc] px-3 py-1 text-xs font-semibold text-[#5a6e7f]">
                Panduan Resmi Desa Karangpapak
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#0f2d4a]">
              {guide.title}
            </h1>
            <p className="text-sm sm:text-base text-[#5a6e7f] leading-relaxed">
              {guide.subtitle}
            </p>
          </div>

          <section className="rounded-2xl border border-[#c5d8f2] bg-[#f4f8fc] p-6 space-y-3">
            <h2 className="text-lg font-extrabold text-[#0f2d4a] flex items-center gap-2.5">
              <Lightbulb size={22} className="text-[#2c73b9]" />
              {guide.definitionTitle}
            </h2>
            <p className="text-sm text-[#40566d] leading-relaxed">
              {guide.definitionDesc}
            </p>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-extrabold text-[#0f2d4a] flex items-center gap-2.5">
                <Calendar size={22} className="text-[#2c73b9]" />
                {guide.dailyNeedsTitle}
              </h2>
              <p className="text-xs text-[#5a6e7f]">{guide.dailyNeedsSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guide.dailyNeeds.map((need, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#d2dfec] bg-[#f9fcff] p-6 shadow-xs space-y-3"
                >
                  <h3 className="text-xs font-extrabold text-[#2c73b9] uppercase tracking-wide flex items-center gap-2">
                    <Clock size={16} className="text-[#2c73b9] shrink-0" />
                    <span>{need.stage}</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-[#40566d]">
                    {need.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-[#2c73b9] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {guide.fluidsAndSupplements.length > 0 && (
              <div className="rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-[#0f2d4a]">
                {guide.fluidsAndSupplements.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <Droplet size={16} className="text-[#2c73b9] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-5 pt-4">
            <div>
              <h2 className="text-xl font-extrabold text-[#0f2d4a] flex items-center gap-2.5">
                <Dna size={22} className="text-[#2c73b9]" />
                {guide.nutrientsTitle}
              </h2>
              <p className="text-xs text-[#5a6e7f]">{guide.nutrientsSubtitle}</p>
            </div>

            <div className="space-y-5">
              {guide.nutrientStages.map((stage, stageIdx) => (
                <div key={stageIdx} className="space-y-3">
                  <h3 className="text-xs font-extrabold text-[#0f2d4a] bg-[#eef4fc] p-3.5 rounded-xl border border-[#c0d4f7] flex items-center gap-2">
                    <Sparkles size={16} className="text-[#2c73b9] shrink-0" />
                    <span>{stage.title}</span>
                  </h3>

                  <div className="overflow-x-auto rounded-2xl border border-[#d2dfec]">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#f4f8fc] text-[#5a6e7f] font-bold border-b border-[#d2dfec]">
                        <tr>
                          <th className="py-3.5 px-4">Zat Gizi</th>
                          <th className="py-3.5 px-4">Fungsi Utama</th>
                          <th className="py-3.5 px-4">Bahan Makanan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#edf3f9] text-[#40566d]">
                        {stage.nutrients.map((n, nIdx) => (
                          <tr key={nIdx} className="hover:bg-[#f9fcff]">
                            <td className="py-3.5 px-4 font-bold text-[#0f2d4a]">
                              {n.name}
                            </td>
                            <td className="py-3.5 px-4">{n.function}</td>
                            <td className="py-3.5 px-4 font-semibold text-[#2c73b9]">
                              {n.sources}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5 pt-4">
            <div>
              <h2 className="text-xl font-extrabold text-[#0f2d4a] flex items-center gap-2.5">
                <Utensils size={22} className="text-[#2c73b9]" />
                {guide.menuTitle}
              </h2>
              <p className="text-xs text-[#5a6e7f]">{guide.menuSubtitle}</p>
            </div>

            <div className="space-y-5">
              {guide.menus.map((menuStage, mIdx) => (
                <div
                  key={mIdx}
                  className="rounded-2xl border border-[#d2dfec] bg-[#f9fcff] p-6 space-y-4"
                >
                  <h3 className="text-xs font-extrabold text-[#2c73b9] flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#2c73b9] shrink-0" />
                    <span>{menuStage.stage}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {menuStage.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className="rounded-xl border border-[#d2dfec] bg-white p-3.5 space-y-1 shadow-xs"
                      >
                        <span className="text-[10px] font-extrabold uppercase text-[#718a9e] tracking-wider block">
                          {item.time}
                        </span>
                        <p className="text-xs text-[#0f2d4a] font-semibold leading-snug">
                          {item.menu}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5 pt-4">
            <div>
              <h2 className="text-xl font-extrabold text-[#0f2d4a] flex items-center gap-2.5">
                <AlertTriangle size={22} className="text-[#9a2020]" />
                {guide.impactTitle}
              </h2>
              <p className="text-xs text-[#5a6e7f]">{guide.impactSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guide.impacts.map((imp, impIdx) => (
                <div
                  key={impIdx}
                  className="rounded-2xl border border-[#f5b8b8] bg-[#fff8f8] p-6 space-y-3"
                >
                  <h3 className="text-xs font-bold text-[#9a2020] flex items-center gap-2">
                    {imp.iconType === "mother" ? (
                      <HeartPulse size={16} />
                    ) : (
                      <Baby size={16} />
                    )}
                    {imp.target}
                  </h3>
                  <ul className="space-y-2 text-xs text-[#7a1818]">
                    {imp.points.map((pt, ptIdx) => (
                      <li key={ptIdx} className="flex items-start gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#9a2020] mt-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 pt-4">
            <div>
              <h2 className="text-lg font-extrabold text-[#0f2d4a] flex items-center gap-2">
                <Globe size={20} className="text-[#2c73b9]" />
                Referensi Website Terkait Stunting & Gizi
              </h2>
              <p className="text-xs text-[#5a6e7f]">
                Platform resmi & terpercaya untuk informasi stunting dan gizi anak
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {guide.references.map((ref, rIdx) => (
                <a
                  key={rIdx}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-[#d2dfec] bg-white p-4 hover:border-[#2c73b9] hover:bg-[#f4f8fc] hover:-translate-y-0.5 transition-all block space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#0f2d4a] group-hover:text-[#2c73b9]">
                      {ref.name}
                    </span>
                    <ExternalLink
                      size={14}
                      className="text-[#718a9e] group-hover:text-[#2c73b9] transition-colors"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-[#2c73b9] block">
                    {ref.org}
                  </span>
                  <p className="text-[11px] text-[#5a6e7f] leading-snug">
                    {ref.desc}
                  </p>
                </a>
              ))}
            </div>
          </section>
        </article>

        {relatedArticles.length > 0 && (
          <section className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-[#0f2d4a] flex items-center gap-2">
                <BookOpen size={20} className="text-[#2c73b9]" />
                Artikel & Berita Edukasi Terkait
              </h2>
              <Link
                href="/edukasi"
                className="text-xs font-bold text-[#2c73b9] hover:underline"
              >
                Lihat Semua Artikel →
              </Link>
            </div>

            <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((item) => (
                <CardEdukasi key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
