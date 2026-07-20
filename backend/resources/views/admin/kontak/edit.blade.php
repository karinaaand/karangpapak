@extends('layouts.admin')

@section('content')
    @include('admin.partials.errors')
    <div class="rounded-[1.75rem] bg-white p-8 shadow-sm">
        <div class="mb-8">
            <p class="text-sm uppercase tracking-[0.35em] text-emerald-700">Kontak</p>
            <h2 class="mt-2 text-3xl font-semibold text-slate-900">Kelola Kontak Desa</h2>
        </div>
        <form method="POST" action="{{ route('admin.kontak.update') }}" class="grid gap-5 md:grid-cols-2">
            @csrf
            @method('PUT')
            <div>
                <label class="mb-2 block text-sm font-medium">Nama Kantor</label>
                <input type="text" name="office_name" value="{{ old('office_name', $kontak->office_name) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">Telepon</label>
                <input type="text" name="phone" value="{{ old('phone', $kontak->phone) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">Email</label>
                <input type="email" name="email" value="{{ old('email', $kontak->email) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">WhatsApp</label>
                <input type="text" name="whatsapp" value="{{ old('whatsapp', $kontak->whatsapp) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">Facebook</label>
                <input type="text" name="facebook" value="{{ old('facebook', $kontak->facebook) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">Instagram</label>
                <input type="text" name="instagram" value="{{ old('instagram', $kontak->instagram) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">YouTube</label>
                <input type="text" name="youtube" value="{{ old('youtube', $kontak->youtube) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium">Embed Maps</label>
                <input type="text" name="maps_embed" value="{{ old('maps_embed', $kontak->maps_embed) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            </div>
            <div class="md:col-span-2">
                <label class="mb-2 block text-sm font-medium">Alamat</label>
                <textarea name="address" rows="4" class="w-full rounded-2xl border border-slate-200 px-4 py-3">{{ old('address', $kontak->address) }}</textarea>
            </div>
            <div class="md:col-span-2">
                <button type="submit" class="rounded-2xl bg-emerald-700 px-5 py-3 font-medium text-white">Simpan Kontak</button>
            </div>
        </form>
    </div>
@endsection