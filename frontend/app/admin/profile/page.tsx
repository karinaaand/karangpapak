"use client";

import { useEffect, useState } from "react";
import { getProfile, updateProfile, type Profile } from "@/services/api";
import { Check, X, Loader2, Save } from "lucide-react";

export default function AdminProfilePage() {
  const [form, setForm] = useState<Partial<Profile>>({
    village_name: "",
    district: "",
    regency: "",
    province: "",
    description: "",
    vision: "",
    mission: "",
    history: "",
    head_name: "",
    head_title: "",
    population_total: 0,
    families_total: 0,
    umkm_total: 0,
    video_url: "",
    logo_image: null,
    logo_image_url: null,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        setForm({
          village_name: data.village_name ?? "",
          district: data.district ?? "",
          regency: data.regency ?? "",
          province: data.province ?? "",
          description: data.description ?? "",
          vision: data.vision ?? "",
          mission: data.mission ?? "",
          history: data.history ?? "",
          head_name: data.head_name ?? "",
          head_title: data.head_title ?? "",
          population_total: data.population_total ?? 0,
          families_total: data.families_total ?? 0,
          umkm_total: data.umkm_total ?? 0,
          video_url: data.video_url ?? "",
          logo_image: null,
          logo_image_url: data.logo_image_url ?? null,
        });
      } catch {
        setError("Gagal memuat profil desa.");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined && key !== "logo_image_url") {
        formData.append(key, value as any);
      }
    });
    formData.append("_method", "PUT");

    try {
      await updateProfile(formData);
      setMessage("Profil desa berhasil disimpan.");
    } catch {
      setError("Gagal menyimpan profil desa. Pastikan Anda masuk sebagai admin.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-[#5a6e7f]">
        <Loader2 size={24} className="animate-spin mr-2" />
        Memuat data profil desa...
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#2c73b9] to-[#1f5f9e] p-7 shadow-sm text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-[#93c5fd]">Modul</p>
        <h3 className="mt-1 text-2xl font-extrabold">Profil Desa</h3>
        <p className="mt-2 text-sm leading-7 text-[#eef4fc] max-w-2xl">
          Kelola informasi mendasar desa seperti nama daerah, deskripsi, sejarah, visi-misi, pimpinan, dan statistik kependudukan.
        </p>
      </div>

      {message && (
        <div className="fixed top-10 right-10 z-[100] flex min-w-[300px] items-center gap-3 rounded-xl border border-[#d2dfec] bg-[#eef4fc] px-5 py-4 text-sm text-[#2c73b9] shadow-2xl shadow-[#2c73b9]/20 transition-all">
          <Check size={16} />
          {message}
          <button className="ml-auto" onClick={() => setMessage(null)}><X size={14} /></button>
        </div>
      )}
      {error && (
        <div className="fixed top-10 right-10 z-[100] flex min-w-[300px] items-center gap-3 rounded-xl border border-[#f5b8b8] bg-[#fff0f0] px-5 py-4 text-sm text-[#9a2020] shadow-2xl shadow-[#9a2020]/20 transition-all">
          <X size={16} />
          {error}
          <button className="ml-auto" onClick={() => setError(null)}><X size={14} /></button>
        </div>
      )}

      <div className="rounded-2xl border border-[#d2dfec] bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e2e8f0]">
          <h4 className="text-base font-bold text-[#111827]">Pengaturan Profil Desa</h4>
          <p className="text-xs text-[#5a6e7f] mt-0.5">Semua perubahan langsung tampil pada halaman publik profil desa</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          <div>
            <h5 className="text-sm font-bold text-[#2c73b9] border-b border-[#f1f5f9] pb-2 mb-4">Informasi Geografis</h5>
            

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#374151] mb-2">Logo Desa</label>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#cbd5e1] bg-[#f8fafc]">
                  {(form.logo_image instanceof File ? URL.createObjectURL(form.logo_image) : form.logo_image_url) ? (
                    <img
                      src={form.logo_image instanceof File ? URL.createObjectURL(form.logo_image) : (form.logo_image_url ?? "")}
                      alt="Logo"
                      className="h-full w-full object-contain p-1"
                    />
                  ) : (
                    <span className="text-xs text-[#94a3b8]">Logo</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml, image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setForm({ ...form, logo_image: file });
                  }}
                  className="block w-full text-sm text-[#64748b] file:mr-4 file:rounded-full file:border-0 file:bg-[#eef4fc] file:px-4 file:py-2 file:text-xs file:font-bold file:text-[#2c73b9] hover:file:bg-[#d2dfec] transition-all cursor-pointer"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Nama Desa *</label>
                <input
                  required
                  type="text"
                  value={form.village_name}
                  onChange={(e) => setForm({ ...form, village_name: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Kecamatan</label>
                <input
                  type="text"
                  value={form.district ?? ""}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Kabupaten</label>
                <input
                  type="text"
                  value={form.regency ?? ""}
                  onChange={(e) => setForm({ ...form, regency: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Provinsi</label>
                <input
                  type="text"
                  value={form.province ?? ""}
                  onChange={(e) => setForm({ ...form, province: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                />
              </div>
            </div>
          </div>


          <div>
            <h5 className="text-sm font-bold text-[#2c73b9] border-b border-[#f1f5f9] pb-2 mb-4">Pimpinan Desa</h5>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Nama Kepala Desa</label>
                <input
                  type="text"
                  value={form.head_name ?? ""}
                  onChange={(e) => setForm({ ...form, head_name: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Jabatan / Gelar</label>
                <input
                  type="text"
                  value={form.head_title ?? ""}
                  onChange={(e) => setForm({ ...form, head_title: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                />
              </div>
            </div>
          </div>


          <div>
            <h5 className="text-sm font-bold text-[#2c73b9] border-b border-[#f1f5f9] pb-2 mb-4">Statistik Desa</h5>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Jumlah Penduduk</label>
                <input
                  type="number"
                  value={form.population_total ?? 0}
                  onChange={(e) => setForm({ ...form, population_total: parseInt(e.target.value) || 0 })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Jumlah Kepala Keluarga (KK)</label>
                <input
                  type="number"
                  value={form.families_total ?? 0}
                  onChange={(e) => setForm({ ...form, families_total: parseInt(e.target.value) || 0 })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Jumlah UMKM</label>
                <input
                  type="number"
                  value={form.umkm_total ?? 0}
                  onChange={(e) => setForm({ ...form, umkm_total: parseInt(e.target.value) || 0 })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                />
              </div>
            </div>
          </div>


          <div>
            <h5 className="text-sm font-bold text-[#2c73b9] border-b border-[#f1f5f9] pb-2 mb-4">Narasi & Visi Misi</h5>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Deskripsi Singkat Desa</label>
                <textarea
                  rows={3}
                  value={form.description ?? ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Sejarah Desa</label>
                <textarea
                  rows={4}
                  value={form.history ?? ""}
                  onChange={(e) => setForm({ ...form, history: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Visi</label>
                  <textarea
                    rows={4}
                    value={form.vision ?? ""}
                    onChange={(e) => setForm({ ...form, vision: e.target.value })}
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Misi</label>
                  <textarea
                    rows={4}
                    value={form.mission ?? ""}
                    onChange={(e) => setForm({ ...form, mission: e.target.value })}
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Video Profil Desa (URL YouTube)</label>
                <input
                  type="url"
                  value={form.video_url ?? ""}
                  onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="Contoh: https://www.youtube.com/watch?v=..."
                />
              </div>
            </div>
          </div>


          <div className="border-t border-[#f1f5f9] pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-[#2c73b9] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1f5f9e] transition-colors disabled:opacity-60"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Simpan Profil Desa
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}