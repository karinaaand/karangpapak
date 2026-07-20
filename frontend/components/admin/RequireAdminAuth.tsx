"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type RequireAdminAuthProps = {
  children: ReactNode;
};

export default function RequireAdminAuth({ children }: RequireAdminAuthProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tokenExists = typeof window !== "undefined" ? Boolean(localStorage.getItem("admin_token")) : false;
    setHasToken(tokenExists);
    if (!tokenExists) {
      router.replace("/admin/login");
    }
  }, [router]);

  // Render matching server-side structure until mounted on the client
  if (!mounted || !hasToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f8fc] p-8 text-sm font-semibold text-[#5a6e7f]">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#2c73b9] border-t-transparent" />
          Memuat dashboard admin...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}