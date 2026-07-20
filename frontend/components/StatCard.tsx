import { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string;
  description?: string;
  icon?: ReactNode;
};

export default function StatCard({ label, value, description, icon }: StatCardProps) {
  return (
    <div className="group rounded-[28px] border border-[#d2dfec] bg-white p-6 shadow-[0_18px_45px_rgba(44,115,185,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(44,115,185,0.14)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#718a9e]">
            {label}
          </p>
          <p className="mt-3 text-3xl font-extrabold text-[#0f2d4a] sm:text-4xl">{value}</p>
        </div>
        {icon ? (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#eef4fc] text-[#2c73b9] transition-colors group-hover:bg-[#2c73b9] group-hover:text-white">
            {icon}
          </div>
        ) : null}
      </div>
      {description ? (
        <p className="mt-4 text-sm leading-7 text-[#5a6e7f]">{description}</p>
      ) : null}
    </div>
  );
}
