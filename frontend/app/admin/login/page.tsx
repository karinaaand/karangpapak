"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, ShieldAlert } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api"}/login`, {
        email,
        password,
      });

      localStorage.setItem("admin_token", response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("admin_user", JSON.stringify(response.data.user));
      router.push("/admin/dashboard");
    } catch {
      setError("Email atau password salah. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  // Prevent hydration mismatch by only rendering the form client-side
  if (!mounted) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d4f82] via-[#0f2d4a] to-[#071624] px-4 py-12">
        <div className="relative w-full max-w-md h-[400px] rounded-[28px] border border-white/10 bg-white/95 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-md sm:p-10 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2c73b9] border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d4f82] via-[#0f2d4a] to-[#071624] px-4 py-12">
      <div className="absolute top-1/4 left-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-[#2c73b9]/15 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 translate-x-1/2 rounded-full bg-[#0ea5e9]/10 blur-[120px]" />

      <div className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-white/95 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-md sm:p-10">
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#718096] transition hover:text-[#2c73b9]"
        >
          <ArrowLeft size={14} />
          Kembali ke Beranda
        </Link>

        <div className="mt-6 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center rounded-2xl bg-[#eef4fc] p-3 text-[#2c73b9] mb-4">
            <Lock size={24} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2c73b9]">Admin Portal</p>
          <h1 className="mt-2 text-2xl font-extrabold text-[#0f2d4a]">Masuk Dashboard</h1>
          <p className="mt-2 text-xs leading-relaxed text-[#5a6e7f] max-w-[300px]">
            Gunakan kredensial administrator Anda untuk masuk dan mengelola portal resmi Desa Karangpapak.
          </p>
        </div>

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-[#fff5f5] p-4 text-xs font-medium text-[#c53030]">
            <ShieldAlert size={16} className="mt-0.5 flex-shrink-0 text-[#e53e3e]" />
            <p className="leading-relaxed">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#4a5568]">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#a0aec0]">
                <Mail size={18} />
              </span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                autoComplete="username email"
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-[#cbd5e1] bg-white py-3 pl-10 pr-4 text-sm text-[#0f2d4a] outline-none transition-all focus:border-[#2c73b9] focus:ring-2 focus:ring-[#2c73b9]/10"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#4a5568]">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#a0aec0]">
                <Lock size={18} />
              </span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#cbd5e1] bg-white py-3 pl-10 pr-10 text-sm text-[#0f2d4a] outline-none transition-all focus:border-[#2c73b9] focus:ring-2 focus:ring-[#2c73b9]/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#a0aec0] transition hover:text-[#2c73b9]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#2c73b9] py-3 text-sm font-bold text-white shadow-lg shadow-[#2c73b9]/25 transition hover:bg-[#1f5f9e] hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Masuk ke Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}