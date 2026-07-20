"use client";

import { useEffect, useState } from "react";
import { getKontak, updateKontak, type Kontak } from "@/services/api";
import { Check, X, Loader2, Save } from "lucide-react";

export default function AdminKontakPage() {
  const [form, setForm] = useState<Partial<Kontak>>({
    office_name: "",
    address: "",
    phone: "",
    email: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    youtube: "",
    maps_embed: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadKontak() {
      try {
        const data = await getKontak();
        setForm({
          office_name: data.office_name ?? "",
          address: data.address ?? "",
          phone: data.phone ?? "",
          email: data.email ?? "",
          whatsapp: data.whatsapp ?? "",
          facebook: data.facebook ?? "",
          instagram: data.instagram ?? "",
          youtube: data.youtube ?? "",
          maps_embed: data.maps_embed ?? "",
        });
      } catch {
        setError("Gagal memuat kontak desa.");
      } finally {
        setLoading(false);
      }
    }
    loadKontak();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      await updateKontak(form);
      setMessage("Informasi kontak berhasil disimpan.");
    } catch {
      setError("Gagal menyimpan kontak. Pastikan Anda masuk sebagai admin.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-[#5a6e7f]">
        <Loader2 size={24} className="animate-spin mr-2" />
        Memuat data kontak desa...
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#2c73b9] to-[#1f5f9e] p-7 shadow-sm text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-[#93c5fd]">Modul</p>
        <h3 className="mt-1 text-2xl font-extrabold">Informasi Kontak</h3>
        <p className="mt-2 text-sm leading-7 text-[#eef4fc] max-w-2xl">
          Kelola informasi alamat kantor, telepon, email, whatsapp, media sosial resmi, dan peta lokasi yang terintegrasi di portal publik.
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
          <h4 className="text-base font-bold text-[#111827]">Pengaturan Kontak Resmi</h4>
          <p className="text-xs text-[#5a6e7f] mt-0.5">Informasi di bawah ini digunakan untuk kebutuhan formulir kontak dan footer portal desa</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <h5 className="text-sm font-bold text-[#2c73b9] border-b border-[#f1f5f9] pb-2 mb-4">Kontak Utama</h5>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Nama Kantor / Instansi *</label>
                <input
                  required
                  type="text"
                  value={form.office_name}
                  onChange={(e) => setForm({ ...form, office_name: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Email Resmi</label>
                <input
                  type="email"
                  value={form.email ?? ""}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="desa.karangpapak@sukabumikab.go.id"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Nomor Telepon</label>
                <input
                  type="text"
                  value={form.phone ?? ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="(0266) 421234"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Nomor WhatsApp Resmi</label>
                <input
                  type="text"
                  value={form.whatsapp ?? ""}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="081234567890"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#374151] mb-1">Alamat Lengkap Kantor Desa</label>
                <input
                  type="text"
                  value={form.address ?? ""}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-bold text-[#2c73b9] border-b border-[#f1f5f9] pb-2 mb-4">Media Sosial Resmi</h5>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Facebook</label>
                <input
                  type="text"
                  value={form.facebook ?? ""}
                  onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="Desa Karangpapak"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Instagram</label>
                <input
                  type="text"
                  value={form.instagram ?? ""}
                  onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="@desa.karangpapak"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">YouTube Channel</label>
                <input
                  type="text"
                  value={form.youtube ?? ""}
                  onChange={(e) => setForm({ ...form, youtube: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="Desa Karangpapak Official"
                />
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-bold text-[#2c73b9] border-b border-[#f1f5f9] pb-2 mb-4">Integrasi Peta</h5>
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1">URL Google Maps Embed (src attribute)</label>
              <textarea
                rows={3}
                value={form.maps_embed ?? ""}
                onChange={(e) => setForm({ ...form, maps_embed: e.target.value })}
                className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none font-mono text-xs"
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
              <p className="text-[10px] text-[#64748b] mt-1">
                Salin hanya bagian link yang ada di dalam parameter `src` dari kode HTML iframe yang didapatkan dari Google Maps Share Menu.
              </p>
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
              Simpan Informasi Kontak
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
