"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Building2,
  Compass,
  ClipboardList,
  Newspaper,
  Image as ImageIcon,
  BookOpen,
  Store,
  Phone,
  Users,
  Lightbulb,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [showGuide, setShowGuide] = useState(true);

  const publicModules = [
    {
      label: "1. Beranda",
      subTitle: "Halaman Utamab Web Publik",
      desc: "Lihat dan pratinjau tampilan beranda publik Desa Karangpapak secara langsung.",
      Icon: Home,
      href: "/",
      isExternal: true,
      color: "bg-[#eef4fc] border-[#d2dfec]",
      accent: "text-[#2c73b9]",
    },
    {
      label: "2. Profil Desa",
      subTitle: "Pengaturan Identitas & Visi Misi",
      desc: "Ubah nama desa, sejarah, visi-misi, nama Kepala Desa, logo, serta statistik kependudukan.",
      Icon: Building2,
      href: "/admin/profile",
      color: "bg-[#f4f8fc] border-[#d2dfec]",
      accent: "text-[#0f2d4a]",
    },
    {
      label: "3. Geografis (Peta GIS)",
      subTitle: "Peta & Sarana Publik Desa",
      desc: "Atur batas wilayah desa, titik koordinat fasilitas publik, poskesdes, sekolah, dan tempat ibadah.",
      Icon: Compass,
      href: "/admin/geografis",
      color: "bg-[#f0fafb] border-[#b8d9e0]",
      accent: "text-[#0e6c7c]",
    },
    {
      label: "4. Layanan Warga",
      subTitle: "Surat & Administrasi Desa",
      desc: "Atur jenis surat kependudukan, syarat pengajuan, dan petunjuk pelayanan warga desa.",
      Icon: ClipboardList,
      href: "/admin/layanan",
      color: "bg-[#eef4ff] border-[#c0d4f7]",
      accent: "text-[#2550a0]",
    },
    {
      label: "5. Kabar & Berita Desa",
      subTitle: "Pengumuman & Publikasi",
      desc: "Tulis berita terbaru, informasi kegiatan desa, pengumuman publik, dan artikel berita warga.",
      Icon: Newspaper,
      href: "/admin/berita",
      color: "bg-[#fff8ec] border-[#f5d99a]",
      accent: "text-[#92600a]",
    },
    {
      label: "6. Galeri Dokumentasi",
      subTitle: "Album Foto Kegiatan Desa",
      desc: "Upload dan kelola foto-foto dokumentasi pembangunan, kegiatan gotong royong, dan potensi desa.",
      Icon: ImageIcon,
      href: "/admin/galeri",
      color: "bg-[#fdf4ff] border-[#e9d5ff]",
      accent: "text-[#7e22ce]",
    },
    {
      label: "7. Edukasi Warga",
      subTitle: "Materi Stunting & Gizi",
      desc: "Kelola panduan gizi ibu hamil, pencegahan stunting, resep MPASI, dan artikel edukasi warga.",
      Icon: BookOpen,
      href: "/admin/edukasi",
      color: "bg-[#f0fdf4] border-[#bbf7d0]",
      accent: "text-[#15803d]",
    },
    {
      label: "8. UMKM Lokal",
      subTitle: "Promosi Produk & Usaha Warga",
      desc: "Tambahkan dan update katalog produk UMKM desa, harga, lokasi, dan kontak pemesanan pemilik.",
      Icon: Store,
      href: "/admin/umkm",
      color: "bg-[#fef3f2] border-[#f5b8b8]",
      accent: "text-[#9a2020]",
    },
    {
      label: "9. Hubungi Kami",
      subTitle: "Alamat & Kontak Kantor Desa",
      desc: "Perbarui nomor telepon Balai Desa, alamat email resmi, jam kerja pelayanan, dan peta lokasi.",
      Icon: Phone,
      href: "/admin/kontak",
      color: "bg-[#fff7ed] border-[#fed7aa]",
      accent: "text-[#c2410c]",
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
            <p className="text-sm font-bold text-[#0f2d4a]">
              Panduan Pengoperasian Web untuk Operator Desa
            </p>
            <p className="mt-1 text-xs text-[#5a6e7f]">
              Panel pengelola ini dirancang khusus mengikuti struktur 9 Halaman Publik Website Desa Karangpapak. Pilih menu di bawah untuk mengedit informasi web publik:
            </p>
            <ul className="mt-3 text-xs leading-6 text-[#5a6e7f] list-disc list-outside ml-4 space-y-1 grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <li>Pilih <b>Profil Desa</b> untuk mengubah Visi-Misi, Sejarah, atau data Kades.</li>
              <li>Pilih <b>Geografis</b> untuk mengubah informasi peta GIS & lokasi fasilitas desa.</li>
              <li>Pilih <b>Layanan Warga</b> untuk menambah/mengubah alur surat administrasi.</li>
              <li>Pilih <b>Kabar & Berita</b> untuk rilis berita atau pengumuman warga.</li>
              <li>Pilih <b>Galeri</b> untuk unggah foto dokumentasi kegiatan desa.</li>
              <li>Pilih <b>Edukasi Warga</b> untuk kelola materi stunting, gizi & panduan balita.</li>
              <li>Pilih <b>UMKM Lokal</b> untuk daftarkan produk jualan milik warga.</li>
              <li>Pilih <b>Hubungi Kami</b> untuk perbarui nomor telepon Balai Desa.</li>
            </ul>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-gradient-to-r from-[#0f2d4a] via-[#1f5f9e] to-[#2c73b9] p-7 shadow-sm text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#93c5fd] border border-white/10">
            <Sparkles size={12} /> Dashboard Pengelola Website Desa
          </span>
          <h3 className="text-2xl font-black text-white leading-snug">
            Pengaturan Konten Website Publik Karangpapak
          </h3>
          <p className="text-xs sm:text-sm leading-6 text-[#eef4fc]">
            Selamat datang Operator Desa! Setiap modul pengelolaan di panel ini disesuaikan 100% dengan menu pada website publik Karangpapak.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#0f2d4a] shadow-md hover:bg-[#f4f8fc] transition-all self-start md:self-auto shrink-0"
        >
          <span>Buka Web Publik</span>
          <ExternalLink size={15} />
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="flex items-center gap-2 text-sm font-bold text-[#0f2d4a]">
            <Home size={18} className="text-[#2c73b9]" /> 9 Modul Pengelolaan Halaman Web Publik
          </p>
          <span className="text-xs text-[#5a6e7f]">Sesuai Struktur Navigasi Publik</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {publicModules.map((card) => {
            const Icon = card.Icon;
            return (
              <Link
                key={card.label}
                href={card.href as any}
                target={card.isExternal ? "_blank" : undefined}
                className={`rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between h-full bg-white ${card.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-[#d2dfec] ${card.accent}`}
                    >
                      <Icon size={20} strokeWidth={2.5} />
                    </div>

                    <span className="text-[10px] font-bold text-[#718a9e] uppercase tracking-wider bg-white/80 px-2.5 py-1 rounded-full border border-[#d2dfec]">
                      Web Publik
                    </span>
                  </div>

                  <h4 className={`text-base font-extrabold ${card.accent}`}>
                    {card.label}
                  </h4>
                  <p className="text-[11px] font-semibold text-[#5a6e7f] mt-0.5">
                    {card.subTitle}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#5a6e7f]">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#edf3f9] flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-widest shadow-sm ring-1 ring-black/5 transition-all group-hover:shadow-md group-hover:-translate-y-0.5 ${card.accent}`}
                  >
                    {card.isExternal ? "Lihat Web" : "Kelola Konten"}
                  </span>

                  {card.isExternal ? (
                    <ExternalLink size={14} className="text-[#718a9e]" />
                  ) : (
                    <span className="text-xs text-[#2c73b9] font-bold">Atur →</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-[#d2dfec] bg-white p-5 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4f6f8] text-[#374151] border border-[#d1d5db]">
            <Users size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0f2d4a]">Modul 10. Pengelola Akun Operator</h4>
            <p className="text-xs text-[#5a6e7f]">Tambah akun admin baru, ubah email, atau perbarui kata sandi login operator.</p>
          </div>
        </div>

        <Link
          href="/admin/users"
          className="rounded-xl border border-[#d2dfec] bg-[#f4f8fc] px-4 py-2 text-xs font-bold text-[#0f2d4a] hover:bg-[#2c73b9] hover:text-white transition-all shrink-0"
        >
          Kelola Akun →
        </Link>
      </div>
    </section>
  );
}