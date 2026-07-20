"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getAllBerita,
  createBerita,
  updateBerita,
  deleteBerita,
  type Berita,
} from "@/services/api";
import { Plus, Pencil, Trash2, X, Check, Loader2, Eye } from "lucide-react";

const emptyForm: Omit<Berita, "id" | "slug"> & { slug?: string } = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  thumbnail: null,
  published_at: null,
  is_published: true,
};

export default function AdminBeritaPage() {
  const [items, setItems] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Berita | null>(null);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);

  const toLocalDatetimeString = (dateStr: string | null | undefined) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllBerita(1, 100);
      setItems(res.data);
    } catch {
      setError("Gagal memuat data berita. Pastikan backend berjalan.");
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

  function openEdit(item: Berita) {
    setEditId(item.id);
    setForm({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt ?? "",
      content: item.content ?? "",
      thumbnail: item.thumbnail,
      published_at: item.published_at,
      is_published: item.is_published,
    });
    setShowForm(true);
    setSuccess(null);
    setError(null);
  }

  function openDetail(item: Berita) {
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

    try {
      if (editId !== null) {
        await updateBerita(editId, payload);
        setSuccess("Berita berhasil diperbarui.");
      } else {
        await createBerita(payload);
        setSuccess("Berita berhasil dibuat.");
      }
      setShowForm(false);
      setEditId(null);
      fetchItems();
    } catch {
      setError("Gagal menyimpan berita. Periksa inputan Anda.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, title: string) {
    if (!window.confirm(`Hapus berita "${title}"?`)) return;
    try {
      await deleteBerita(id);
      setSuccess(`Berita "${title}" berhasil dihapus.`);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      setError("Gagal menghapus berita.");
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#2c73b9] to-[#1f5f9e] p-7 shadow-sm text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-[#93c5fd]">Modul</p>
        <h3 className="mt-1 text-2xl font-extrabold">Berita & Pengumuman</h3>
        <p className="mt-2 text-sm leading-7 text-[#eef4fc] max-w-2xl">
          Kelola berita kegiatan desa, pengumuman resmi, dan artikel informasi untuk warga Karangpapak.
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
                {editId ? "Edit Berita" : "Tambah Berita Baru"}
              </h4>
              <button onClick={() => setShowForm(false)} className="rounded-full p-1 hover:bg-[#f3f4f6]">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh] px-6 py-5">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Judul Berita *</label>
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="Rapat Musrenbang Desa Karangpapak Tahun 2026"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Slug / Link Tautan (Boleh Dikosongkan)</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="rapat-musrenbang-2026"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Ringkasan Berita *</label>
                <textarea
                  required
                  rows={2}
                  value={form.excerpt ?? ""}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none resize-none"
                  placeholder="Deskripsi singkat isi berita..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Isi Berita Lengkap *</label>
                <textarea
                  required
                  rows={6}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="Tuliskan berita lengkap di sini..."
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1">Tanggal Publikasi (Opsional)</label>
                  <input
                    type="datetime-local"
                    value={toLocalDatetimeString(form.published_at)}
                    onChange={(e) => setForm({ ...form, published_at: e.target.value ? e.target.value.replace("T", " ") + ":00" : null })}
                    className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  />
                </div>
                <div className="flex items-center md:pt-5 pb-1">
                  <label className="flex items-center gap-2 text-sm text-[#374151] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_published}
                      onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                      className="h-4 w-4 rounded accent-[#2c73b9]"
                    />
                    Publikasikan Berita Ini
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
                  {editId ? "Simpan Perubahan" : "Tambah Berita"}
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
                <p className="text-xs font-bold uppercase tracking-widest text-[#2c73b9]">Detail Berita</p>
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
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Status</p>
                  <p className="mt-2 text-sm font-semibold text-[#111827]">
                    {selectedItem.is_published ? "Publik" : "Draft"}
                  </p>
                </div>
                <div className="rounded-xl bg-[#f8fafc] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Tanggal Publikasi</p>
                  <p className="mt-2 text-sm font-semibold text-[#111827]">
                    {selectedItem.published_at
                      ? new Date(selectedItem.published_at).toLocaleString("id-ID")
                      : "Belum diatur"}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#e5e7eb] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Slug</p>
                <p className="mt-2 break-all text-sm text-[#111827]">{selectedItem.slug}</p>
              </div>

              <div className="rounded-xl border border-[#e5e7eb] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Ringkasan</p>
                <p className="mt-2 text-sm leading-7 text-[#374151]">
                  {selectedItem.excerpt || "Tidak ada ringkasan."}
                </p>
              </div>

              <div className="rounded-xl border border-[#e5e7eb] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Isi Berita</p>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#374151]">
                  {selectedItem.content || "Tidak ada isi berita."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-[#d2dfec] bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
          <div>
            <h4 className="text-base font-bold text-[#111827]">Daftar Berita</h4>
            <p className="text-xs text-[#5a6e7f] mt-0.5">{items.length} berita terbit</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-[#2c73b9] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f5f9e] transition-colors"
          >
            <Plus size={16} />
            Tambah Berita
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-[#5a6e7f]">
            <Loader2 size={24} className="animate-spin mr-2" />
            Memuat data berita...
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#5a6e7f]">
            <p className="text-3xl mb-3">📰</p>
            Belum ada data berita. Klik &ldquo;Tambah Berita&rdquo; untuk memulai.
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