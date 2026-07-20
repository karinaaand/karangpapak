"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getAllLayanan,
  createLayanan,
  updateLayanan,
  deleteLayanan,
  type Layanan,
} from "@/services/api";
import { Plus, Pencil, Trash2, X, Check, Loader2, Eye } from "lucide-react";

const emptyForm: Omit<Layanan, "id"> = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  requirements: "",
  service_hours: "Senin - Jumat, 08.00 - 14.00 WIB",
  contact_person: "",
  sort_order: 1,
  is_published: true,
};

export default function AdminLayananPage() {
  const [items, setItems] = useState<Layanan[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Layanan | null>(null);
  const [form, setForm] = useState<Omit<Layanan, "id">>(emptyForm);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllLayanan(1, 50);
      setItems(res.data);
    } catch {
      setError("Gagal memuat data layanan. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  function openCreate() {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
    setSuccess(null);
    setError(null);
  }

  function openEdit(item: Layanan) {
    setEditId(item.id);
    setForm({
      title: item.title,
      slug: item.slug,
      summary: item.summary ?? "",
      content: item.content ?? "",
      requirements: item.requirements ?? "",
      service_hours: item.service_hours ?? "Senin - Jumat, 08.00 - 14.00 WIB",
      contact_person: item.contact_person ?? "",
      sort_order: item.sort_order,
      is_published: item.is_published,
    });
    setShowForm(true);
    setSuccess(null);
    setError(null);
  }

  function openDetail(item: Layanan) {
    setSelectedItem(item);
    setSuccess(null);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (editId !== null) {
        await updateLayanan(editId, form);
        setSuccess("Layanan berhasil diperbarui.");
      } else {
        await createLayanan(form);
        setSuccess("Layanan berhasil dibuat.");
      }
      setShowForm(false);
      setEditId(null);
      fetchItems();
    } catch {
      setError("Gagal menyimpan. Pastikan Anda sudah login sebagai admin.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, title: string) {
    if (!window.confirm(`Hapus layanan "${title}"?`)) return;
    try {
      await deleteLayanan(id);
      setSuccess(`Layanan "${title}" berhasil dihapus.`);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      setError("Gagal menghapus layanan.");
    }
  }

  return (
    <section className="space-y-6">

      <div className="rounded-2xl bg-gradient-to-r from-[#2c73b9] to-[#1f5f9e] p-7 shadow-sm text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-[#93c5fd]">Modul</p>
        <h3 className="mt-1 text-2xl font-extrabold">Layanan Publik</h3>
        <p className="mt-2 text-sm leading-7 text-[#eef4fc] max-w-2xl">
          Kelola daftar layanan administrasi desa. Tambah, edit, atau hapus data layanan yang tampil di halaman publik.
        </p>
      </div>


      {success && (
        <div className="fixed top-10 right-10 z-[100] flex min-w-[300px] items-center gap-3 rounded-xl border border-[#d2dfec] bg-[#eef4fc] px-5 py-4 text-sm text-[#2c73b9] shadow-2xl shadow-[#2c73b9]/20 transition-all">
          <Check size={16} />
          {success}
          <button className="ml-auto" onClick={() => setSuccess(null)}><X size={14} /></button>
        </div>
      )}
      {error && (
        <div className="fixed top-10 right-10 z-[100] flex min-w-[300px] items-center gap-3 rounded-xl border border-[#f5b8b8] bg-[#fff0f0] px-5 py-4 text-sm text-[#9a2020] shadow-2xl shadow-[#9a2020]/20 transition-all">
          <X size={16} />
          {error}
          <button className="ml-auto" onClick={() => setError(null)}><X size={14} /></button>
        </div>
      )}


      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] px-6 py-4">
              <h4 className="text-base font-bold text-[#111827]">
                {editId ? "Edit Layanan" : "Tambah Layanan Baru"}
              </h4>
              <button onClick={() => setShowForm(false)} className="rounded-full p-1 hover:bg-[#f3f4f6]">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh] px-6 py-5">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Judul Layanan *</label>
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="Pengantar KTP dan Kartu Keluarga"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Ringkasan</label>
                <textarea
                  rows={2}
                  value={form.summary ?? ""}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none resize-none"
                  placeholder="Deskripsi singkat layanan..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Keterangan Lengkap</label>
                <textarea
                  rows={3}
                  value={form.content ?? ""}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none resize-none"
                  placeholder="Penjelasan detail alur pelayanan..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Persyaratan</label>
                <input
                  type="text"
                  value={form.requirements ?? ""}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="Fotokopi KTP, KK, surat pengantar RT/RW"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Jam Pelayanan</label>
                  <input
                    type="text"
                    value={form.service_hours ?? ""}
                    onChange={(e) => setForm({ ...form, service_hours: e.target.value })}
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                    placeholder="Senin - Jumat, 08.00 - 14.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Kontak Petugas</label>
                  <input
                    type="text"
                    value={form.contact_person ?? ""}
                    onChange={(e) => setForm({ ...form, contact_person: e.target.value })}
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                    placeholder="Kasi Pelayanan Umum"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Urutan</label>
                  <input
                    type="number"
                    min={1}
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 1 })}
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 text-sm text-[#374151] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_published}
                      onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                      className="h-4 w-4 rounded accent-[#2c73b9]"
                    />
                    Publikasikan
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-[#d1d5db] px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-[#2c73b9] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1f5f9e] disabled:opacity-60"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {editId ? "Simpan Perubahan" : "Tambah Layanan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-[#e2e8f0] px-6 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#2c73b9]">Detail Layanan</p>
                <h4 className="mt-1 text-lg font-bold text-[#111827]">{selectedItem.title}</h4>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="rounded-full p-1 text-[#6b7280] hover:bg-[#f3f4f6]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[75vh] space-y-5 overflow-y-auto px-6 py-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-[#f8fafc] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Jam Layanan</p>
                  <p className="mt-2 text-sm font-semibold text-[#111827]">
                    {selectedItem.service_hours || "-"}
                  </p>
                </div>
                <div className="rounded-xl bg-[#f8fafc] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Petugas</p>
                  <p className="mt-2 text-sm font-semibold text-[#111827]">
                    {selectedItem.contact_person || "-"}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#e5e7eb] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Persyaratan</p>
                <p className="mt-2 text-sm text-[#111827]">{selectedItem.requirements || "-"}</p>
              </div>

              <div className="rounded-xl border border-[#e5e7eb] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Keterangan / Isi</p>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#374151]">
                  {selectedItem.content || "Tidak ada keterangan."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}


      <div className="rounded-2xl border border-[#d2dfec] bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
          <div>
            <h4 className="text-base font-bold text-[#111827]">Daftar Layanan</h4>
            <p className="text-xs text-[#5a6e7f] mt-0.5">{items.length} layanan terdaftar</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-[#2c73b9] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f5f9e] transition-colors"
          >
            <Plus size={16} />
            Tambah Layanan
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-[#5a6e7f]">
            <Loader2 size={24} className="animate-spin mr-2" />
            Memuat data layanan...
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#5a6e7f]">
            <p className="text-3xl mb-3">📋</p>
            Belum ada data layanan. Klik &ldquo;Tambah Layanan&rdquo; untuk memulai.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="divide-y divide-[#edf3f9] min-w-[700px]">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#f8fafc] transition-colors">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#eef4fc] text-sm font-bold text-[#2c73b9]">
                    {item.sort_order}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111827] truncate">{item.title}</p>
                    <p className="text-xs text-[#5a6e7f] mt-0.5 truncate">
                      {item.summary ?? item.content ?? "Tidak ada ringkasan"}
                    </p>
                  </div>
                  <span className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                    item.is_published ? "bg-[#eef4fc] text-[#2c73b9]" : "bg-[#f3f4f6] text-[#6b7280]"
                  }`}>
                    {item.is_published ? "Publik" : "Draft"}
                  </span>
                  <div className="flex flex-shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => openDetail(item)}
                      className="flex items-center gap-1.5 rounded-lg border border-[#d1d5db] px-3 py-1.5 text-xs font-medium text-[#2c73b9] hover:bg-[#eef4fc] transition-colors"
                    >
                      <Eye size={12} />
                      Lihat
                    </button>
                    <button
                      onClick={() => openEdit(item)}
                      className="flex items-center gap-1.5 rounded-lg border border-[#d1d5db] px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
                    >
                      <Pencil size={12} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="flex items-center gap-1.5 rounded-lg border border-[#f5b8b8] px-3 py-1.5 text-xs font-medium text-[#9a2020] hover:bg-[#fff0f0] transition-colors"
                    >
                      <Trash2 size={12} />
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
