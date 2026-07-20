<form method="POST" action="{{ $action }}" enctype="multipart/form-data" class="mt-8 grid gap-5 md:grid-cols-2">
    @csrf
    @if ($method !== 'POST')
        @method($method)
    @endif
    <div>
        <label class="mb-2 block text-sm font-medium">Nama UMKM</label>
        <input type="text" name="name" value="{{ old('name', $umkm->name) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">Slug</label>
        <input type="text" name="slug" value="{{ old('slug', $umkm->slug) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">Pemilik</label>
        <input type="text" name="owner_name" value="{{ old('owner_name', $umkm->owner_name) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">Kategori</label>
        <input type="text" name="category" value="{{ old('category', $umkm->category) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">Telepon</label>
        <input type="text" name="phone" value="{{ old('phone', $umkm->phone) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">WhatsApp</label>
        <input type="text" name="whatsapp" value="{{ old('whatsapp', $umkm->whatsapp) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div class="md:col-span-2">
        <label class="mb-2 block text-sm font-medium">Upload Gambar</label>
        <input type="file" name="image" accept="image/*" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    @if (!empty($umkm->image_url))
        <div class="md:col-span-2">
            <img src="{{ $umkm->image_url }}" alt="Gambar UMKM" class="h-44 w-full max-w-sm rounded-2xl object-cover shadow-sm">
        </div>
    @endif
    <div class="md:col-span-2">
        <label class="mb-2 block text-sm font-medium">Alamat</label>
        <textarea name="address" rows="3" class="w-full rounded-2xl border border-slate-200 px-4 py-3">{{ old('address', $umkm->address) }}</textarea>
    </div>
    <div class="md:col-span-2">
        <label class="mb-2 block text-sm font-medium">Deskripsi</label>
        <textarea name="description" rows="5" class="w-full rounded-2xl border border-slate-200 px-4 py-3">{{ old('description', $umkm->description) }}</textarea>
    </div>
    <div class="md:col-span-2 flex flex-wrap items-center gap-6">
        <label class="flex items-center gap-3 text-sm">
            <input type="checkbox" name="is_featured" value="1" {{ old('is_featured', $umkm->is_featured ?? false) ? 'checked' : '' }}>
            Jadikan unggulan
        </label>
        <label class="flex items-center gap-3 text-sm">
            <input type="checkbox" name="is_published" value="1" {{ old('is_published', $umkm->is_published ?? true) ? 'checked' : '' }}>
            Tampilkan di website
        </label>
    </div>
    <div class="md:col-span-2">
        <button type="submit" class="rounded-2xl bg-emerald-700 px-5 py-3 font-medium text-white">Simpan UMKM</button>
    </div>
</form>