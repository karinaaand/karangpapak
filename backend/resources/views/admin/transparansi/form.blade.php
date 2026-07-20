<form method="POST" action="{{ $action }}" class="mt-8 grid gap-5 md:grid-cols-2">
    @csrf
    @if ($method !== 'POST')
        @method($method)
    @endif
    <div>
        <label class="mb-2 block text-sm font-medium">Bagian</label>
        <select name="section" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
            <option value="apbdes" @selected(old('section', $item->section) === 'apbdes')>APBDes</option>
            <option value="bantuan" @selected(old('section', $item->section) === 'bantuan')>Bantuan</option>
        </select>
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">Urutan</label>
        <input type="number" name="sort_order" value="{{ old('sort_order', $item->sort_order ?? 0) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div class="md:col-span-2">
        <label class="mb-2 block text-sm font-medium">Judul</label>
        <input type="text" name="title" value="{{ old('title', $item->title) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div class="md:col-span-2">
        <label class="mb-2 block text-sm font-medium">Subjudul</label>
        <input type="text" name="subtitle" value="{{ old('subtitle', $item->subtitle) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">Nilai 1</label>
        <input type="text" name="value_one" value="{{ old('value_one', $item->value_one) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">Nilai 2</label>
        <input type="text" name="value_two" value="{{ old('value_two', $item->value_two) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">Nilai 3</label>
        <input type="text" name="value_three" value="{{ old('value_three', $item->value_three) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div>
        <label class="mb-2 block text-sm font-medium">Nilai 4</label>
        <input type="text" name="value_four" value="{{ old('value_four', $item->value_four) }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3">
    </div>
    <div class="md:col-span-2">
        <button type="submit" class="rounded-2xl bg-emerald-700 px-5 py-3 font-medium text-white">Simpan Transparansi</button>
    </div>
</form>