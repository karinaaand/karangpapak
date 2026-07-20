"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getAllUmkm,
  createUmkm,
  updateUmkm,
  deleteUmkm,
  type Umkm,
} from "@/services/api";
import { Plus, Pencil, Trash2, X, Check, Loader2, Eye } from "lucide-react";

const emptyForm: Omit<Umkm, "id"> = {
  name: "",
  slug: "",
  owner_name: "",
  category: "kuliner",
  description: "",
  address: "",
  phone: "",
  whatsapp: "",
  image: null,
  is_featured: false,
  is_published: true,
};

export default function AdminUmkmPage() {
  const [items, setItems] = useState<Umkm[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Umkm | null>(null);
  const [form, setForm] = useState<Omit<Umkm, "id">>(emptyForm);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllUmkm(1, 100);
      setItems(res.data);
    } catch {
      setError("Gagal memuat data UMKM. Pastikan backend berjalan.");
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

  function openEdit(item: Umkm) {
    setEditId(item.id);
    setForm({
      name: item.name,
      slug: item.slug,
      owner_name: item.owner_name ?? "",
      category: item.category ?? "kuliner",
      description: item.description ?? "",
      address: item.address ?? "",
      phone: item.phone ?? "",
      whatsapp: item.whatsapp ?? "",
      image: item.image,
      is_featured: item.is_featured,
      is_published: item.is_published,
    });
    setShowForm(true);
    setSuccess(null);
    setError(null);
  }

  function openDetail(item: Umkm) {
    setSelectedItem(item);
    setSuccess(null);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Auto-generate slug from name if empty
    const payload = {
      ...form,
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
    };

    try {
      if (editId !== null) {
        await updateUmkm(editId, payload);
        setSuccess("UMKM berhasil diperbarui.");
      } else {
        await createUmkm(payload);
        setSuccess("UMKM berhasil ditambahkan.");
      }
      setShowForm(false);
      setEditId(null);
      fetchItems();
    } catch {
      setError("Gagal menyimpan UMKM. Periksa inputan Anda.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!window.confirm(`Hapus UMKM "${name}"?`)) return;
    try {
      await deleteUmkm(id);
      setSuccess(`UMKM "${name}" berhasil dihapus.`);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      setError("Gagal menghapus UMKM.");
    }
  }

  return (
    <section className="space-y-6">

      <div className="rounded-2xl bg-gradient-to-r from-[#2c73b9] to-[#1f5f9e] p-7 shadow-sm text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-[#93c5fd]">Modul</p>
        <h3 className="mt-1 text-2xl font-extrabold">UMKM Desa</h3>
        <p className="mt-2 text-sm leading-7 text-[#eef4fc] max-w-2xl">
          Kelola data UMKM dan usaha lokal Desa Karangpapak untuk dipromosikan di portal publik.
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
                {editId ? "Edit UMKM" : "Tambah UMKM Baru"}
              </h4>
              <button onClick={() => setShowForm(false)} className="rounded-full p-1 hover:bg-[#f3f4f6]">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh] px-6 py-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Nama Usaha *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                    placeholder="Kripik Pisang Renyah Jaya"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Nama Pemilik</label>
                  <input
                    type="text"
                    value={form.owner_name ?? ""}
                    onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                    placeholder="Pak Budi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Slug / Link Tautan (Boleh Dikosongkan)</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                    placeholder="kripik-pisang-renyah-jaya"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Kategori *</label>
                  <select
                    value={form.category ?? "kuliner"}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  >
                    <option value="kuliner">Kuliner / Makanan</option>
                    <option value="kerajinan">Kerajinan Tangan</option>
                    <option value="jasa">Jasa</option>
                    <option value="pertanian">Pertanian / Hasil Bumi</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Deskripsi Usaha</label>
                <textarea
                  rows={3}
                  value={form.description ?? ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none resize-none"
                  placeholder="Ceritakan tentang produk, keunikan, dan detail usaha..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Alamat Lengkap Tempat Usaha</label>
                <input
                  type="text"
                  value={form.address ?? ""}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="RT 02 RW 03, Kedusunan Karangpapak"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Telepon</label>
                  <input
                    type="text"
                    value={form.phone ?? ""}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                    placeholder="081234567890"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Nomor WhatsApp</label>
                  <input
                    type="text"
                    value={form.whatsapp ?? ""}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                    placeholder="081234567890"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 text-sm text-[#374151] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_featured}
                      onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                      className="h-4 w-4 rounded accent-[#2c73b9]"
                    />
                    Tampilkan di Beranda Utama (Featured)
                  </label>
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
                  {editId ? "Simpan Perubahan" : "Tambah UMKM"}
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
                <p className="text-xs font-bold uppercase tracking-widest text-[#2c73b9]">Detail UMKM</p>
                <h4 className="mt-1 text-lg font-bold text-[#111827]">{selectedItem.name}</h4>
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
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Pemilik & Kategori</p>
                  <p className="mt-2 text-sm font-semibold text-[#111827]">
                    {selectedItem.owner_name || "-"} | {selectedItem.category}
                  </p>
                </div>
                <div className="rounded-xl bg-[#f8fafc] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Kontak</p>
                  <p className="mt-2 text-sm font-semibold text-[#111827]">
                    Telp: {selectedItem.phone || "-"} / WA: {selectedItem.whatsapp || "-"}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#e5e7eb] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Alamat</p>
                <p className="mt-2 text-sm text-[#111827]">{selectedItem.address || "-"}</p>
              </div>

              <div className="rounded-xl border border-[#e5e7eb] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Deskripsi Usaha</p>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#374151]">
                  {selectedItem.description || "Tidak ada deskripsi."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}


      <div className="rounded-2xl border border-[#d2dfec] bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
          <div>
            <h4 className="text-base font-bold text-[#111827]">Daftar UMKM</h4>
            <p className="text-xs text-[#5a6e7f] mt-0.5">{items.length} UMKM terdaftar</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-[#2c73b9] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f5f9e] transition-colors"
          >
            <Plus size={16} />
            Tambah UMKM
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-[#5a6e7f]">
            <Loader2 size={24} className="animate-spin mr-2" />
            Memuat data UMKM...
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#5a6e7f]">
            <p className="text-3xl mb-3">🛒</p>
            Belum ada data UMKM. Klik &ldquo;Tambah UMKM&rdquo; untuk memulai.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="divide-y divide-[#edf3f9] min-w-[750px]">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#f8fafc] transition-colors">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#eef4fc] text-sm font-bold text-[#2c73b9]">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111827] truncate">{item.name}</p>
                    <p className="text-xs text-[#5a6e7f] mt-0.5 truncate">
                      Pemilik: {item.owner_name || "-"} | {item.address ?? "Tidak ada alamat"}
                    </p>
                  </div>
                  {item.is_featured && (
                    <span className="flex-shrink-0 rounded-full bg-[#fff8ec] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#92600a] border border-[#f5d99a]">
                      Unggulan
                    </span>
                  )}
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
                      onClick={() => handleDelete(item.id, item.name)}
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
