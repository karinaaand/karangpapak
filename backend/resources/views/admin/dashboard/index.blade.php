@extends('layouts.admin')

@section('content')
    <div class="space-y-8">
        <section class="rounded-[2rem] bg-[linear-gradient(135deg,#0f3c31,#145445_55%,#d4a63c)] px-8 py-10 text-white shadow-xl">
            <p class="text-sm uppercase tracking-[0.35em] text-white/70">Dashboard</p>
            <h2 class="mt-3 max-w-2xl text-4xl font-semibold">Pusat Kendali Konten Website Desa Karangpapak</h2>
            <p class="mt-4 max-w-3xl text-sm leading-7 text-white/85">Gunakan panel ini untuk memperbarui profil desa, menerbitkan berita, mengelola layanan, menambahkan UMKM, dan membagikan konten edukasi kepada masyarakat.</p>
        </section>
        <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div class="rounded-[1.75rem] bg-white p-6 shadow-sm">
                <p class="text-sm text-slate-500">Total Berita</p>
                <p class="mt-3 text-4xl font-semibold text-slate-900">{{ $stats['berita'] }}</p>
            </div>
            <div class="rounded-[1.75rem] bg-white p-6 shadow-sm">
                <p class="text-sm text-slate-500">Total Layanan</p>
                <p class="mt-3 text-4xl font-semibold text-slate-900">{{ $stats['layanan'] }}</p>
            </div>
            <div class="rounded-[1.75rem] bg-white p-6 shadow-sm">
                <p class="text-sm text-slate-500">Total UMKM</p>
                <p class="mt-3 text-4xl font-semibold text-slate-900">{{ $stats['umkm'] }}</p>
            </div>
            <div class="rounded-[1.75rem] bg-white p-6 shadow-sm">
                <p class="text-sm text-slate-500">Total Edukasi</p>
                <p class="mt-3 text-4xl font-semibold text-slate-900">{{ $stats['edukasi'] }}</p>
            </div>
        </div>
        <section class="grid gap-5 lg:grid-cols-2">
            <div class="rounded-[1.75rem] bg-white p-6 shadow-sm">
                <h3 class="text-xl font-semibold text-slate-900">Tugas Harian Admin</h3>
                <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                    <li>Perbarui berita dan informasi kegiatan desa secara berkala.</li>
                    <li>Pastikan data layanan dan kontak mudah dipahami warga.</li>
                    <li>Tampilkan UMKM unggulan untuk mendukung promosi ekonomi lokal.</li>
                </ul>
            </div>
            <div class="rounded-[1.75rem] border border-amber-100 bg-amber-50 p-6 shadow-sm">
                <h3 class="text-xl font-semibold text-slate-900">Catatan Sistem</h3>
                <p class="mt-4 text-sm leading-7 text-slate-600">Gambar berita, UMKM, dan edukasi kini bisa diunggah langsung dari dashboard admin dan otomatis tersedia untuk frontend publik.</p>
            </div>
        </section>
    </div>
@endsection