<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? 'Dashboard Admin Karangpapak' }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen text-slate-800">
    <div class="min-h-screen lg:grid lg:grid-cols-[290px_1fr]">
        <aside class="relative overflow-hidden bg-[linear-gradient(180deg,#0f3c31,#0b2e26)] px-6 py-8 text-white">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.25),transparent_30%)]"></div>
            <div class="relative">
                <div class="mb-10 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
                    <p class="text-xs uppercase tracking-[0.35em] text-emerald-200">Admin Desa</p>
                    <h1 class="mt-3 text-3xl font-semibold">Karangpapak</h1>
                    <p class="mt-3 text-sm leading-7 text-emerald-100/80">Kelola seluruh konten website desa dari panel admin yang sederhana dan rapi.</p>
                </div>
                <nav class="space-y-2 text-sm font-medium">
                    <a href="{{ route('admin.dashboard') }}" class="block rounded-2xl px-4 py-3 transition hover:bg-white/10">Dashboard</a>
                    <a href="{{ route('admin.profile.edit') }}" class="block rounded-2xl px-4 py-3 transition hover:bg-white/10">Kelola Profil Desa</a>
                    <a href="{{ route('admin.layanan.index') }}" class="block rounded-2xl px-4 py-3 transition hover:bg-white/10">Kelola Layanan</a>
                    <a href="{{ route('admin.berita.index') }}" class="block rounded-2xl px-4 py-3 transition hover:bg-white/10">Kelola Berita</a>
                    <a href="{{ route('admin.umkm.index') }}" class="block rounded-2xl px-4 py-3 transition hover:bg-white/10">Kelola UMKM</a>
                    <a href="{{ route('admin.edukasi.index') }}" class="block rounded-2xl px-4 py-3 transition hover:bg-white/10">Kelola Edukasi</a>
                    <a href="{{ route('admin.transparansi.index') }}" class="block rounded-2xl px-4 py-3 transition hover:bg-white/10">Kelola Transparansi</a>
                    <a href="{{ route('admin.kontak.edit') }}" class="block rounded-2xl px-4 py-3 transition hover:bg-white/10">Kelola Kontak</a>
                </nav>
                <form method="POST" action="{{ route('admin.logout') }}" class="mt-10">
                    @csrf
                    <button type="submit" class="w-full rounded-2xl bg-amber-400 px-4 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-amber-300">Logout</button>
                </form>
            </div>
        </aside>
        <div class="p-6 lg:p-10">
            <div class="mb-8 flex flex-col gap-3 rounded-[1.75rem] bg-white/75 px-6 py-5 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
                <div>
                    <p class="text-xs uppercase tracking-[0.35em] text-emerald-700">Panel Admin</p>
                    <h2 class="mt-2 text-2xl font-semibold text-slate-900">Website Desa Karangpapak</h2>
                </div>
                <div class="text-sm text-slate-500">
                    Login sebagai: <span class="font-semibold text-slate-700">{{ auth()->user()->name ?? 'Admin' }}</span>
                </div>
            </div>
            @if (session('status'))
                <div class="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700 shadow-sm">
                    {{ session('status') }}
                </div>
            @endif
            @yield('content')
        </div>
    </div>
</body>
</html>