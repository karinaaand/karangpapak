<form method="POST" action="{{ $action }}" enctype="multipart/form-data" class="mt-8 grid gap-5 md:grid-cols-2">
    @csrf
    @if ($method !== 'POST')
        @method($method)
    @endif
    <div>
        <label class="mb-2 block text-sm font-medium">Judul</label>
        <input type="text" name="title" value="{{ old('title', $edukasi->title) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">Slug</label>
        <input type="text" name="slug" value="{{ old('slug', $edukasi->slug) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div class="md:col-span-2">
        <label class="mb-2 block text-sm font-medium">Kategori</label>
        <select name="category" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            @foreach ($categories as $value => $label)
                <option value="{{ $value }}" @selected(old('category', $edukasi->category) === $value)>{{ $label }}</option>
            @endforeach
        </select>
    </div>
    <div class="md:col-span-2">
        <label class="mb-2 block text-sm font-medium">Upload Thumbnail</label>
        <input type="file" name="thumbnail" accept="image/*" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    @if (!empty($edukasi->thumbnail_url))
        <div class="md:col-span-2">
            <img src="{{ $edukasi->thumbnail_url }}" alt="Thumbnail edukasi" class="h-44 w-full max-w-sm rounded-2xl object-cover shadow-sm">
        </div>
    @endif
    <div class="md:col-span-2">
        <label class="mb-2 block text-sm font-medium">Ringkasan</label>
        <textarea name="excerpt" rows="3" class="w-full rounded-2xl border border-slate-200 px-4 py-3">{{ old('excerpt', $edukasi->excerpt) }}</textarea>
    </div>
    <div class="md:col-span-2">
        <label class="mb-2 block text-sm font-medium">Konten</label>
        <textarea name="content" rows="7" class="w-full rounded-2xl border border-slate-200 px-4 py-3">{{ old('content', $edukasi->content) }}</textarea>
    </div>
    <div class="md:col-span-2 flex items-center gap-3">
        <input type="checkbox" name="is_published" value="1" {{ old('is_published', $edukasi->is_published ?? true) ? 'checked' : '' }}>
        <label class="text-sm">Tampilkan konten edukasi</label>
    </div>
    <div class="md:col-span-2">
        <button type="submit" class="rounded-2xl bg-emerald-700 px-5 py-3 font-medium text-white">Simpan Edukasi</button>
    </div>
</form>