import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
  basePath?: string;
  onPageChange?: (page: number) => void;
};

export default function Pagination({
  currentPage,
  lastPage,
  total,
  perPage,
  basePath = "",
  onPageChange,
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
    if (!basePath) return "#";
    const separator = basePath.includes("?") ? "&" : "?";
    return `${basePath}${separator}page=${page}`;
  }

  function handleClick(e: React.MouseEvent, page: number) {
    if (onPageChange) {
      e.preventDefault();
      onPageChange(page);
    }
  }

  return (
    <nav
      aria-label="Navigasi halaman"
      className="mt-10 flex flex-col gap-4 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-6 py-3 sm:flex-row sm:items-center sm:justify-between shadow-xs"
    >
      <p className="text-xs sm:text-sm text-[#5a6e7f] text-center sm:text-left">
        Menampilkan <span className="font-bold text-[#0f2d4a]">{from}–{to}</span> dari{" "}
        <span className="font-bold text-[#0f2d4a]">{total}</span> entri
      </p>

      {lastPage >= 1 && (
        <div className="flex items-center justify-center gap-2">
          {currentPage > 1 ? (
            <Link
              href={href(currentPage - 1)}
              onClick={(e) => handleClick(e, currentPage - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d2dfec] bg-white text-[#5a6e7f] transition hover:border-[#2c73b9] hover:text-[#2c73b9] hover:bg-white shadow-xs text-xs font-semibold"
              aria-label="Halaman Sebelumnya"
            >
              <ChevronLeft size={16} />
            </Link>
          ) : (
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#cbd5e1] cursor-not-allowed text-xs font-semibold"
              aria-disabled="true"
            >
              <ChevronLeft size={16} />
            </span>
          )}

          <div className="flex items-center gap-1.5">
            {pages.map((p, i) =>
              p === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  className="flex h-9 w-9 items-center justify-center text-xs text-[#94a3b8]"
                >
                  ...
                </span>
              ) : (
                <Link
                  key={p}
                  href={href(p)}
                  onClick={(e) => handleClick(e, p)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition ${
                    p === currentPage
                      ? "bg-[#2c73b9] text-white shadow-md"
                      : "border border-[#d2dfec] bg-white text-[#334155] hover:border-[#2c73b9] hover:text-[#2c73b9]"
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
              onClick={(e) => handleClick(e, currentPage + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d2dfec] bg-white text-[#5a6e7f] transition hover:border-[#2c73b9] hover:text-[#2c73b9] hover:bg-white shadow-xs text-xs font-semibold"
              aria-label="Halaman Selanjutnya"
            >
              <ChevronRight size={16} />
            </Link>
          ) : (
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#cbd5e1] cursor-not-allowed text-xs font-semibold"
              aria-disabled="true"
            >
              <ChevronRight size={16} />
            </span>
          )}
        </div>
      )}
    </nav>
  );
}
