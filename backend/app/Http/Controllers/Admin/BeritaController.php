<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class BeritaController extends Controller
{
    public function index(): View
    {
        return view('admin.berita.index', [
            'beritas' => Berita::query()->latest()->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.berita.create', [
            'berita' => new Berita(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request);
        $data['user_id'] = $request->user()->id;
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);
        $data['is_published'] = $request->boolean('is_published');
        $data['thumbnail'] = $this->storeImage($request, 'thumbnail');

        Berita::create($data);

        return redirect()->route('admin.berita.index')->with('status', 'Berita berhasil ditambahkan.');
    }

    public function edit(Berita $berita): View
    {
        return view('admin.berita.edit', compact('berita'));
    }

    public function update(Request $request, Berita $berita): RedirectResponse
    {
        $data = $this->validateData($request, $berita->id);
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);
        $data['is_published'] = $request->boolean('is_published');

        if ($request->hasFile('thumbnail')) {
            $this->deleteImage($berita->thumbnail);
            $data['thumbnail'] = $this->storeImage($request, 'thumbnail');
        }

        $berita->update($data);

        return redirect()->route('admin.berita.index')->with('status', 'Berita berhasil diperbarui.');
    }

    public function destroy(Berita $berita): RedirectResponse
    {
        $this->deleteImage($berita->thumbnail);
        $berita->delete();

        return redirect()->route('admin.berita.index')->with('status', 'Berita berhasil dihapus.');
    }

    private function validateData(Request $request, ?int $id = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('beritas', 'slug')->ignore($id)],
            'excerpt' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'thumbnail' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'published_at' => ['nullable', 'date'],
        ]);
    }

    private function storeImage(Request $request, string $field): ?string
    {
        return $request->hasFile($field)
            ? $request->file($field)->store('uploads/berita', 'public')
            : null;
    }

    private function deleteImage(?string $path): void
    {
        if ($path && ! str_starts_with($path, 'http')) {
            Storage::disk('public')->delete($path);
        }
    }
}