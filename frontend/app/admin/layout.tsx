"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import RequireAdminAuth from "@/components/admin/RequireAdminAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Halaman login tidak perlu sidebar / auth guard
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <RequireAdminAuth>
      <div className="h-screen bg-[#f4f8fc] grid grid-cols-[85px_minmax(0,1fr)] md:grid-cols-[280px_minmax(0,1fr)] overflow-hidden">
        <AdminSidebar />
        <main className="p-4 md:p-8 overflow-y-auto overflow-x-hidden h-full">
          <AdminHeader />
          {children}
        </main>
      </div>
    </RequireAdminAuth>
  );
}