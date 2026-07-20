<form method="POST" action="{{ $action }}" class="mt-8 grid gap-5 md:grid-cols-2">
    @csrf
    @if ($method !== 'POST')
        @method($method)
    @endif
    <div>
        <label class="mb-2 block text-sm font-medium">Judul</label>
        <input type="text" name="title" value="{{ old('title', $layanan->title) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">Slug</label>
        <input type="text" name="slug" value="{{ old('slug', $layanan->slug) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">Persyaratan</label>
        <input type="text" name="requirements" value="{{ old('requirements', $layanan->requirements) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">Jam Layanan</label>
        <input type="text" name="service_hours" value="{{ old('service_hours', $layanan->service_hours) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">Kontak Petugas</label>
        <input type="text" name="contact_person" value="{{ old('contact_person', $layanan->contact_person) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">Urutan</label>
        <input type="number" name="sort_order" value="{{ old('sort_order', $layanan->sort_order ?? 0) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div class="md:col-span-2">
        <label class="mb-2 block text-sm font-medium">Ringkasan</label>
        <textarea name="summary" rows="3" class="w-full rounded-2xl border border-slate-200 px-4 py-3">{{ old('summary', $layanan->summary) }}</textarea>
    </div>
    <div class="md:col-span-2">
        <label class="mb-2 block text-sm font-medium">Konten</label>
        <textarea name="content" rows="5" class="w-full rounded-2xl border border-slate-200 px-4 py-3">{{ old('content', $layanan->content) }}</textarea>
    </div>
    <div class="md:col-span-2 flex items-center gap-3">
        <input type="checkbox" name="is_published" value="1" {{ old('is_published', $layanan->is_published ?? true) ? 'checked' : '' }}>
        <label class="text-sm">Tampilkan layanan</label>
    </div>
    <div class="md:col-span-2">
        <button type="submit" class="rounded-2xl bg-emerald-700 px-5 py-3 font-medium text-white">Simpan Layanan</button>
    </div>
</form>