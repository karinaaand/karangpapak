import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
  basePath: string;
};

export default function Pagination({
  currentPage,
  lastPage,
  total,
  perPage,
  basePath,
}: PaginationProps) {
  if (total === 0) return null;

  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, total);

  const pages: (number | "...")[] = [];
  if (lastPage <= 7) {
    for (let i = 1; i <= lastPage; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(lastPage - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < lastPage - 2) pages.push("...");
    pages.push(lastPage);
  }

  function href(page: number) {
    const separator = basePath.includes("?") ? "&" : "?";
    return `${basePath}${separator}page=${page}`;
  }

  return (
    <nav
      aria-label="Navigasi halaman"
      className="mt-10 flex flex-col gap-4 rounded-[24px] border border-[#d2dfec] bg-[#f4f8fc] px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-[#5a6e7f]">
        Menampilkan{" "}
        <span className="font-semibold text-[#0f2d4a]">
          {from}–{to}
        </span>{" "}
        dari{" "}
        <span className="font-semibold text-[#0f2d4a]">{total}</span> entri
      </p>

      {lastPage > 1 && (
        <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end">
          {currentPage > 1 ? (
            <Link
              href={href(currentPage - 1)}
              className="flex h-9 items-center gap-1.5 rounded-full border border-[#d2dfec] bg-white px-4 text-sm font-medium text-[#2c73b9] transition hover:border-[#2c73b9] hover:bg-[#f0f7ff]"
            >
              &lt;
            </Link>
          ) : (
            <span className="flex h-9 items-center gap-1.5 rounded-full border border-[#d2dfec] bg-white px-4 text-sm font-medium text-[#94a3b8] cursor-not-allowed">
              &lt;
            </span>
          )}

          <div className="flex items-center gap-1">
            {pages.map((p, i) =>
              p === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  className="flex h-9 w-9 items-center justify-center text-sm text-[#94a3b8]"
                >
                  ...
                </span>
              ) : (
                <Link
                  key={p}
                  href={href(p)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition ${
                    p === currentPage
                      ? "bg-[#2c73b9] text-white shadow-sm"
                      : "border border-[#d2dfec] bg-white text-[#374151] hover:border-[#2c73b9] hover:text-[#2c73b9]"
                  }`}
                  aria-current={p === currentPage ? "page" : undefined}
                >
                  {p}
                </Link>
              )
            )}
          </div>

          {currentPage < lastPage ? (
            <Link
              href={href(currentPage + 1)}
              className="flex h-9 items-center gap-1.5 rounded-full border border-[#d2dfec] bg-white px-4 text-sm font-medium text-[#2c73b9] transition hover:border-[#2c73b9] hover:bg-[#f0f7ff]"
            >
              &gt;
            </Link>
          ) : (
            <span className="flex h-9 items-center gap-1.5 rounded-full border border-[#d2dfec] bg-white px-4 text-sm font-medium text-[#94a3b8] cursor-not-allowed">
              &gt;
            </span>
          )}
        </div>
      )}
    </nav>
  );
}
