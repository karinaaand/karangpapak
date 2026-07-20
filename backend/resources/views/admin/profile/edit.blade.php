@extends('layouts.admin')

@section('content')
    @include('admin.partials.errors')
    <div class="rounded-[1.75rem] bg-white p-8 shadow-sm">
        <div class="mb-8">
            <p class="text-sm uppercase tracking-[0.35em] text-emerald-700">Profil Desa</p>
            <h2 class="mt-2 text-3xl font-semibold text-slate-900">Kelola Profil Desa</h2>
        </div>
        <form method="POST" action="{{ route('admin.profile.update') }}" enctype="multipart/form-data" class="grid gap-5 md:grid-cols-2">
            @csrf
            @method('PUT')
            <div>
                <label class="mb-2 block text-sm font-medium">Nama Desa</label>
                <input type="text" name="village_name" value="{{ old('village_name', $profile->village_name) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">Kecamatan</label>
                <input type="text" name="district" value="{{ old('district', $profile->district) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">Kabupaten</label>
                <input type="text" name="regency" value="{{ old('regency', $profile->regency) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">Provinsi</label>
                <input type="text" name="province" value="{{ old('province', $profile->province) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">Kode Pos</label>
                <input type="text" name="postal_code" value="{{ old('postal_code', $profile->postal_code) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">Kepala Desa</label>
                <input type="text" name="head_name" value="{{ old('head_name', $profile->head_name) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div class="md:col-span-2">
                <label class="mb-2 block text-sm font-medium">Jabatan Kepala Desa</label>
                <input type="text" name="head_title" value="{{ old('head_title', $profile->head_title) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div class="md:col-span-2">
                <label class="mb-2 block text-sm font-medium">Alamat</label>
                <textarea name="address" rows="3" class="w-full rounded-2xl border border-slate-200 px-4 py-3">{{ old('address', $profile->address) }}</textarea>
            </div>
            <div class="md:col-span-2">
                <label class="mb-2 block text-sm font-medium">Deskripsi</label>
                <textarea name="description" rows="4" class="w-full rounded-2xl border border-slate-200 px-4 py-3">{{ old('description', $profile->description) }}</textarea>
            </div>
            <div class="md:col-span-2">
                <label class="mb-2 block text-sm font-medium">Visi</label>
                <textarea name="vision" rows="3" class="w-full rounded-2xl border border-slate-200 px-4 py-3">{{ old('vision', $profile->vision) }}</textarea>
            </div>
            <div class="md:col-span-2">
                <label class="mb-2 block text-sm font-medium">Misi</label>
                <textarea name="mission" rows="3" class="w-full rounded-2xl border border-slate-200 px-4 py-3">{{ old('mission', $profile->mission) }}</textarea>
            </div>
            <div class="md:col-span-2">
                <label class="mb-2 block text-sm font-medium">Sejarah Desa</label>
                <textarea name="history" rows="5" class="w-full rounded-2xl border border-slate-200 px-4 py-3">{{ old('history', $profile->history) }}</textarea>
            </div>
            <div class="md:col-span-2">
                <label class="mb-2 block text-sm font-medium">Upload Hero Image</label>
                <input type="file" name="hero_image" accept="image/*" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            @if (!empty($profile->hero_image_url))
                <div class="md:col-span-2">
                    <img src="{{ $profile->hero_image_url }}" alt="Hero desa" class="h-52 w-full max-w-2xl rounded-2xl object-cover shadow-sm">
                </div>
            @endif

            <div class="md:col-span-2 mt-4 border-t border-slate-200 pt-6">
                <h3 class="text-xl font-semibold text-slate-900">Statistik Publik</h3>
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">Total Penduduk</label>
                <input type="number" name="population_total" value="{{ old('population_total', $profile->population_total) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">Total Keluarga</label>
                <input type="number" name="families_total" value="{{ old('families_total', $profile->families_total) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">Total UMKM</label>
                <input type="number" name="umkm_total" value="{{ old('umkm_total', $profile->umkm_total) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">Realisasi Anggaran (%)</label>
                <input type="number" step="0.01" name="budget_realization_percent" value="{{ old('budget_realization_percent', $profile->budget_realization_percent) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div class="md:col-span-2 mt-4 border-t border-slate-200 pt-6">
                <h3 class="text-xl font-semibold text-slate-900">Informasi Layanan Beranda</h3>
            </div>
            <div class="md:col-span-2">
                <label class="mb-2 block text-sm font-medium">Judul Banner Layanan</label>
                <input type="text" name="service_banner_title" value="{{ old('service_banner_title', $profile->service_banner_title) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div class="md:col-span-2">
                <label class="mb-2 block text-sm font-medium">Deskripsi Banner Layanan</label>
                <textarea name="service_banner_description" rows="3" class="w-full rounded-2xl border border-slate-200 px-4 py-3">{{ old('service_banner_description', $profile->service_banner_description) }}</textarea>
            </div>
            <div class="md:col-span-2">
                <button type="submit" class="rounded-2xl bg-emerald-700 px-5 py-3 font-medium text-white">Simpan Profil</button>
            </div>
        </form>
    </div>
@endsection