"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { getAllUsers, createUser, updateUser, deleteUser, type User } from "@/services/api";
import { Plus, Pencil, Trash2, X, Check, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

type FormState = {
  name: string;
  email: string;
  password?: string;
};

export default function AdminUsersPage() {
  const [items, setItems] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", email: "", password: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllUsers();
      setItems(res);
    } catch {
      setError("Gagal memuat data akun. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  function openCreate() {
    setEditId(null);
    setForm({ name: "", email: "", password: "" });
    setSelectedFile(null);
    setPreviewUrl(null);
    setShowForm(true);
    setSuccess(null);
    setError(null);
  }

  function openEdit(item: User) {
    setEditId(item.id);
    setForm({ name: item.name, email: item.email, password: "" });
    setSelectedFile(null);
    setPreviewUrl(item.avatar ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/storage/${item.avatar}` : null);
    setShowForm(true);
    setSuccess(null);
    setError(null);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    if (form.password) {
      formData.append("password", form.password);
    }
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    try {
      if (editId !== null) {
        const response = await updateUser(editId, formData);
        setSuccess("Akun berhasil diperbarui.");
        
        // Sync local storage if the user editing themselves
        const stored = localStorage.getItem("admin_user");
        if (stored) {
          const currentUser = JSON.parse(stored);
          if (currentUser.id === editId) {
            localStorage.setItem("admin_user", JSON.stringify(response.user));
            window.dispatchEvent(new Event("storage"));
          }
        }
      } else {
        await createUser(formData);
        setSuccess("Akun berhasil dibuat.");
      }
      setShowForm(false);
      setEditId(null);
      fetchItems();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Gagal menyimpan akun. Periksa inputan Anda.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!window.confirm(`Hapus akun "${name}"?`)) return;
    try {
      await deleteUser(id);
      setSuccess(`Akun "${name}" berhasil dihapus.`);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err: any) {
      setError(err?.response?.data?.message || "Gagal menghapus akun.");
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#2c73b9] to-[#1f5f9e] p-7 shadow-sm text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-[#93c5fd]">Modul</p>
        <h3 className="mt-1 text-2xl font-extrabold">Pengelola Akun</h3>
        <p className="mt-2 text-sm leading-7 text-[#eef4fc] max-w-2xl">
          Kelola akun administrator website. Anda bisa menambah admin, mengganti profil dan kata sandi, serta menghapus akun.
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
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] px-6 py-4">
              <h4 className="text-base font-bold text-[#111827]">
                {editId ? "Edit Akun" : "Tambah Akun Baru"}
              </h4>
              <button onClick={() => setShowForm(false)} className="rounded-full p-1 hover:bg-[#f3f4f6]">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh] px-6 py-5">
              
              <div className="flex items-center gap-4">
                <div 
                  className="flex h-20 w-20 flex-shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-[#d1d5db] bg-[#f9fafb] text-[#6b7280] hover:bg-[#f3f4f6] relative"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewUrl ? (
                    <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                  ) : (
                    <>
                      <ImageIcon size={24} className="mb-1" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider">Foto</span>
                    </>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111827]">Foto Profil</h4>
                  <p className="mt-1 text-xs text-[#6b7280]">
                    Pilih foto dengan rasio 1:1. Maksimal 2MB. (Opsional)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 text-xs font-semibold text-[#2c73b9] hover:underline"
                  >
                    Ubah Foto Profil
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Nama Lengkap *</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="Nama Pengguna"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1">
                  Kata Sandi {editId ? "(Kosongkan jika tidak ingin mengubah)" : "*"}
                </label>
                <input
                  required={!editId}
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-lg border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#2c73b9] focus:outline-none"
                  placeholder="Minimal 6 karakter"
                  minLength={6}
                />
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
                  {editId ? "Simpan Perubahan" : "Tambah Akun"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-[#d2dfec] bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
          <div>
            <h4 className="text-base font-bold text-[#111827]">Daftar Administrator</h4>
            <p className="text-xs text-[#5a6e7f] mt-0.5">{items.length} akun terdaftar</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-[#2c73b9] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1f5f9e] transition-colors"
          >
            <Plus size={16} />
            Tambah Akun
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-[#5a6e7f]">
            <Loader2 size={24} className="animate-spin mr-2" />
            Memuat data akun...
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#5a6e7f]">
            Belum ada akun terdaftar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="divide-y divide-[#edf3f9] min-w-[600px]">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#f8fafc] transition-colors">
                  <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#eef4fc] text-sm font-bold text-[#2c73b9] border border-[#d2dfec]">
                    {item.avatar ? (
                      <img src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "http://127.0.0.1:8000"}/storage/${item.avatar}`} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <span>{item.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111827] truncate">
                      {item.name} {item.id === 1 && <span className="ml-1 text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">Admin Utama</span>}
                    </p>
                    <p className="text-xs text-[#5a6e7f] mt-0.5 truncate">
                      {item.email}
                    </p>
                  </div>
                  
                  <div className="flex flex-shrink-0 gap-2">
                    <button
                      onClick={() => openEdit(item)}
                      className="flex items-center gap-1.5 rounded-lg border border-[#d1d5db] px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
                    >
                      <Pencil size={12} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      disabled={item.id === 1}
                      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                        item.id === 1 
                          ? 'border-[#e5e7eb] text-[#9ca3af] bg-[#f9fafb] cursor-not-allowed opacity-60' 
                          : 'border-[#f5b8b8] text-[#9a2020] hover:bg-[#fff0f0]'
                      }`}
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
