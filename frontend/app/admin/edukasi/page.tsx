"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getAllEdukasi,
  createEdukasi,
  updateEdukasi,
  deleteEdukasi,
  type Edukasi,
} from "@/services/api";
import { Plus, Pencil, Trash2, X, Check, Loader2, Eye } from "lucide-react";

const emptyForm: Omit<Edukasi, "id" | "slug"> & { slug?: string } = {
  title: "",
  slug: "",
  category: "literasi-digital",
  excerpt: "",
  content: "",
  thumbnail: null,
  is_published: true,
};

export default function AdminEdukasiPage() {
  const [items, setItems] = useState<Edukasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Edukasi | null>(null);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllEdukasi(1, 100);
      setItems(res.data);
    } catch {
      setError("Gagal memuat data edukasi. Pastikan backend berjalan.");
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

  function openEdit(item: Edukasi) {
    setEditId(item.id);
    setForm({
      title: item.title,
      slug: item.slug,
      category: item.category ?? "literasi-digital",
      excerpt: item.excerpt ?? "",
      content: item.content ?? "",
      thumbnail: item.thumbnail,
      is_published: item.is_published,
    });
    setShowForm(true);
    setSuccess(null);
    setError(null);
  }

  function openDetail(item: Edukasi) {
    setSelectedItem(item);
    setSuccess(null);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
    };

    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== null && value !== undefined && key !== "thumbnail_url") {
        if (key === "thumbnail" && !(value instanceof File)) {
          return; // Skip if it's a string from the API (not a new file)
        }
        formData.append(key, value as any);
      }
    });

    try {
      if (editId !== null) {
        formData.append("_method", "PUT");
        await updateEdukasi(editId, formData as any);
        setSuccess("Konten edukasi berhasil diperbarui.");
      } else {
        await createEdukasi(formData as any);
        setSuccess("Konten edukasi berhasil dibuat.");
      }
      setShowForm(false);
      setEditId(null);
      fetchItems();
    } catch {
      setError("Gagal menyimpan edukasi. Periksa inputan Anda.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, title: string) {
    if (!window.confirm(`Hapus konten edukasi "${title}"?`)) return;
    try {
      await deleteEdukasi(id);
      setSuccess(`Konten edukasi "${title}" berhasil dihapus.`);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      setError("Gagal menghapus konten edukasi.");
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#2c73b9] to-[#1f5f9e] p-7 shadow-sm text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-[#93c5fd]">Modul</p>
        <h3 className="mt-1 text-2xl font-extrabold">Edukasi Warga</h3>
        <p className="mt-2 text-sm leading-7 text-[#eef4fc] max-w-2xl">
          Kelola konten edukasi masyarakat seperti materi literasi digital, lingkungan sehat, kesiapsiagaan bencana, dan keamanan lingkungan.
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
                {editId ? "Edit Edukasi" : "Tambah Edukasi Baru"}
              </h4>
              <button onClick={() => setShowForm(false)} className="rounded-full p-1 hover:bg-[#f3f4f6]">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh] px-6 py-5">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Judul Edukasi *</label>
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="Tips Menjaga Keamanan Lingkungan dengan Ronda Malam"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Slug / Link Tautan (Boleh Dikosongkan)</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                    placeholder="tips-ronda-malam"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Kategori *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  >
                    <option value="literasi-digital">Literasi Digital</option>
                    <option value="lingkungan-sehat">Lingkungan Sehat</option>
                    <option value="kesiapsiagaan">Kesiapsiagaan Bencana</option>
                    <option value="keamanan">Keamanan Lingkungan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Ringkasan Materi *</label>
                <textarea
                  required
                  rows={2}
                  value={form.excerpt ?? ""}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none resize-none"
                  placeholder="Deskripsi singkat materi edukasi..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Isi Materi Lengkap *</label>
                <textarea
                  required
                  rows={6}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="Tuliskan materi edukasi lengkap di sini..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Gambar Thumbnail (Opsional)</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setForm({ ...form, thumbnail: file });
                  }}
                  className="block w-full text-sm text-[#64748b] file:mr-4 file:rounded-full file:border-0 file:bg-[#eef4fc] file:px-4 file:py-2 file:text-xs file:font-bold file:text-[#2c73b9] hover:file:bg-[#d2dfec] transition-all cursor-pointer"
                />
                {(form.thumbnail instanceof File || (typeof form.thumbnail === "string" && form.thumbnail)) && (
                  <p className="mt-2 text-xs text-[#2c73b9]">
                    Gambar telah dipilih.
                  </p>
                )}
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
                  {editId ? "Simpan Perubahan" : "Tambah Edukasi"}
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
                <p className="text-xs font-bold uppercase tracking-widest text-[#2c73b9]">Detail Edukasi</p>
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
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Kategori</p>
                  <p className="mt-2 text-sm font-semibold text-[#111827] capitalize">
                    {selectedItem.category ? selectedItem.category.replace("-", " ") : "Literasi Digital"}
                  </p>
                </div>
                <div className="rounded-xl bg-[#f8fafc] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Status</p>
                  <p className="mt-2 text-sm font-semibold text-[#111827]">
                    {selectedItem.is_published ? "Publik" : "Draft"}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#e5e7eb] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Ringkasan</p>
                <p className="mt-2 text-sm leading-7 text-[#374151]">{selectedItem.excerpt || "-"}</p>
              </div>

              <div className="rounded-xl border border-[#e5e7eb] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Isi Materi</p>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#374151]">
                  {selectedItem.content || "Tidak ada materi."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-[#d2dfec] bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
          <div>
            <h4 className="text-base font-bold text-[#111827]">Daftar Edukasi</h4>
            <p className="text-xs text-[#5a6e7f] mt-0.5">{items.length} materi terbit</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-[#2c73b9] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f5f9e] transition-colors"
          >
            <Plus size={16} />
            Tambah Edukasi
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-[#5a6e7f]">
            <Loader2 size={24} className="animate-spin mr-2" />
            Memuat data edukasi...
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#5a6e7f]">
            <p className="text-3xl mb-3">📚</p>
            Belum ada materi edukasi. Klik &ldquo;Tambah Edukasi&rdquo; untuk memulai.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="divide-y divide-[#edf3f9] min-w-[700px]">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#f8fafc] transition-colors">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#eef4fc] text-sm font-bold text-[#2c73b9]">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111827] truncate">{item.title}</p>
                    <p className="text-xs text-[#5a6e7f] mt-0.5 truncate">
                      {item.excerpt ?? item.content ?? "Tidak ada deskripsi singkat"}
                    </p>
                  </div>
                  <span className="flex-shrink-0 rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#475569]">
                    {item.category ? item.category.replace("-", " ") : "literasi digital"}
                  </span>
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
