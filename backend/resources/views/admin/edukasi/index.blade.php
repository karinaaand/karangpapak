@extends('layouts.admin')

@section('content')
    <div class="space-y-6">
        <div class="flex items-center justify-between gap-4">
            <div>
                <p class="text-sm uppercase tracking-[0.35em] text-emerald-700">Edukasi</p>
                <h2 class="mt-2 text-3xl font-semibold text-slate-900">Kelola Edukasi</h2>
            </div>
            <a href="{{ route('admin.edukasi.create') }}" class="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white">Tambah Edukasi</a>
        </div>
        <div class="overflow-hidden rounded-[1.5rem] bg-white shadow-sm">
            <table class="min-w-full divide-y divide-slate-100 text-sm">
                <thead class="bg-slate-50 text-left text-slate-500">
                    <tr>
                        <th class="px-6 py-4">Judul</th>
                        <th class="px-6 py-4">Kategori</th>
                        <th class="px-6 py-4">Status</th>
                        <th class="px-6 py-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @foreach ($edukasis as $item)
                        <tr>
                            <td class="px-6 py-4">{{ $item->title }}</td>
                            <td class="px-6 py-4">{{ $categories[$item->category] ?? $item->category }}</td>
                            <td class="px-6 py-4">{{ $item->is_published ? 'Tampil' : 'Draft' }}</td>
                            <td class="px-6 py-4 text-right">
                                <a href="{{ route('admin.edukasi.edit', $item) }}" class="mr-3 text-emerald-700">Edit</a>
                                <form method="POST" action="{{ route('admin.edukasi.destroy', $item) }}" class="inline">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-rose-600" onclick="return confirm('Hapus konten edukasi ini?')">Hapus</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection