"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Megaphone, FileSignature, Store, BookOpen, Phone, Lightbulb, Package, Users, X } from "lucide-react";

export default function AdminDashboardPage() {
  const [showGuide, setShowGuide] = useState(true);
  const cards = [
    {
      label: "Profil Desa",
      desc: "Atur identitas, statistik, dan deskripsi desa",
      Icon: Building2,
      href: "/admin/profile",
      color: "bg-[#eef4fc] border-[#d2dfec]",
      accent: "text-[#2c73b9]",
    },
    {
      label: "Berita & Pengumuman",
      desc: "Kelola berita dan pengumuman untuk warga",
      Icon: Megaphone,
      href: "/admin/berita",
      color: "bg-[#fff8ec] border-[#f5d99a]",
      accent: "text-[#92600a]",
    },
    {
      label: "Layanan Publik",
      desc: "Atur informasi layanan administrasi desa",
      Icon: FileSignature,
      href: "/admin/layanan",
      color: "bg-[#eef4ff] border-[#c0d4f7]",
      accent: "text-[#2550a0]",
    },
    {
      label: "UMKM Desa",
      desc: "Kelola promosi dan profil UMKM lokal",
      Icon: Store,
      href: "/admin/umkm",
      color: "bg-[#fef3f2] border-[#f5b8b8]",
      accent: "text-[#9a2020]",
    },
    {
      label: "Edukasi Warga",
      desc: "Kelola konten edukasi dan artikel informatif",
      Icon: BookOpen,
      href: "/admin/edukasi",
      color: "bg-[#fdf4ff] border-[#d9b8f7]",
      accent: "text-[#6b21a8]",
    },
    {
      label: "Kontak Desa",
      desc: "Perbarui informasi kontak dan lokasi desa",
      Icon: Phone,
      href: "/admin/kontak",
      color: "bg-[#f0fafb] border-[#b8d9e0]",
      accent: "text-[#0e6c7c]",
    },
    {
      label: "Pengelola Akun",
      desc: "Kelola akun dan profil admin website",
      Icon: Users,
      href: "/admin/users",
      color: "bg-[#f4f6f8] border-[#d1d5db]",
      accent: "text-[#374151]",
    },
  ];

  return (
    <section className="space-y-6">
      {showGuide && (
        <div className="relative rounded-2xl border border-[#b8d9e0] bg-[#f0fafb] p-5 shadow-sm flex items-start gap-4">
          <button 
            onClick={() => setShowGuide(false)}
            className="absolute top-4 right-4 p-1 text-[#0e6c7c] hover:bg-[#b8d9e0] rounded-full transition-colors"
            title="Tutup panduan"
          >
            <X size={16} />
          </button>
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0e6c7c] text-white shadow-sm">
            <Lightbulb size={20} strokeWidth={2.5} />
          </div>
          <div className="pr-6">
            <p className="text-sm font-bold text-[#0f2d4a]">Panduan Penggunaan Cepat</p>
            <ul className="mt-3 text-xs leading-6 text-[#5a6e7f] list-disc list-outside ml-4 space-y-1.5 grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <li>Pilih menu <b>Profil Desa</b> jika ingin mengubah jumlah penduduk, letak wilayah, atau visi-misi desa.</li>
              <li>Pilih menu <b>Kabar Desa</b> untuk menulis pengumuman atau berita terbaru agar dibaca warga.</li>
              <li>Pilih menu <b>Layanan Warga</b> untuk mengatur persyaratan surat-menyurat atau administrasi warga.</li>
              <li>Pilih menu <b>UMKM</b> untuk menambahkan dan mempromosikan jualan atau usaha milik warga.</li>
              <li>Pilih menu <b>Edukasi Warga</b> untuk membagikan artikel bermanfaat atau penyuluhan online.</li>
              <li>Pilih menu <b>Hubungi Kami</b> untuk mengubah nomor telepon resmi dan peta lokasi Balai Desa.</li>
              <li>Pilih menu <b>Pengelola Akun</b> jika ingin mengubah kata sandi atau menambahkan admin baru.</li>
              <li className="text-[#0e6c7c] font-medium">Selalu ingat menekan tombol <b>Simpan</b> setelah mengubah data apapun agar tersimpan!</li>
            </ul>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-gradient-to-r from-[#2c73b9] to-[#1f5f9e] p-7 shadow-sm text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-[#93c5fd]">
          Selamat datang
        </p>
        <h3 className="mt-1 text-2xl font-extrabold">Dashboard Admin Desa</h3>
        <p className="mt-2 text-sm leading-7 text-[#eef4fc] max-w-2xl">
          Dari sini Anda dapat mengelola seluruh konten website resmi Desa Karangpapak
          mulai dari profil desa, berita, layanan publik, hingga UMKM dan edukasi masyarakat.
        </p>
      </div>

      <div>
        <p className="flex items-center gap-2 text-sm font-bold text-[#0f2d4a] mb-4">
          <Package size={18} className="text-[#2c73b9]" /> Modul Pengelolaan
        </p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.Icon;
            return (
            <Link
              key={card.label}
              href={card.href as any}
              className={`rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all group flex flex-col h-full ${card.color}`}
            >
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/60 shadow-sm ${card.accent}`}>
                <Icon size={20} strokeWidth={2.5} />
              </div>
              <h4 className={`text-base font-extrabold ${card.accent}`}>{card.label}</h4>
              <p className="mt-1.5 text-xs leading-5 text-[#5a6e7f] flex-1">{card.desc}</p>
              <div className="mt-4">
                <span className={`inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest shadow-sm ring-1 ring-black/5 transition-all group-hover:shadow-md group-hover:-translate-y-0.5 ${card.accent}`}>
                  Kelola
                </span>
              </div>
            </Link>
            );
          })}
        </div>
      </div>

    </section>
  );
}