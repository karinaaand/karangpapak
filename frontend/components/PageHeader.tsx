type PageHeaderProps = {
  title: string;
  description: string;
  badge?: string;
};

export default function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[#0f2d4a]">
      <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          {badge && (
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#93c5fd]">
              {badge}
            </span>
          )}
          <h1 className="text-2xl font-extrabold leading-[1.2] text-white sm:text-3xl md:text-4xl lg:text-[44px] md:whitespace-nowrap">
            {title}
          </h1>
          <p className="mt-6 mx-auto max-w-3xl text-base leading-8 text-[#d2e2f5] sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
