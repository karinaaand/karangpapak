"use client";

import { useEffect, useState } from "react";
import { UserCircle2, CalendarDays, Wheat } from "lucide-react";

type AdminUser = {
  name?: string;
  email?: string;
};

function getStoredUser(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("admin_user");
  return raw ? JSON.parse(raw) : null;
}

export default function AdminHeader() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    setUser(getStoredUser());
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-8 rounded-2xl border border-[#d2dfec] bg-white px-6 py-5 shadow-sm flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#2c73b9]">
          Panel Admin · Desa Karangpapak
        </p>
        <h2 className="mt-1 text-xl font-extrabold text-[#0f2d4a]">
          Kelola Konten Website Desa
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[#eef4fc] flex items-center justify-center flex-shrink-0">
          <Wheat size={20} className="text-[#2c73b9]" />
        </div>
        <div className="text-left md:text-right">
          <p className="flex items-center justify-start md:justify-end gap-1.5 text-xs text-[#5a6e7f]">
            <CalendarDays size={12} />
            {time}
          </p>
          <p className="flex items-center justify-start md:justify-end gap-1.5 mt-0.5 text-sm font-semibold text-[#0f2d4a]">
            <UserCircle2 size={14} className="text-[#2c73b9]" />
            {user?.name ?? "Admin"}
          </p>
        </div>
      </div>
    </div>
  );
}