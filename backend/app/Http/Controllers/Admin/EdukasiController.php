<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Edukasi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class EdukasiController extends Controller
{
    public function index(): View
    {
        return view('admin.edukasi.index', [
            'edukasis' => Edukasi::query()->latest()->get(),
            'categories' => $this->categories(),
        ]);
    }

    public function create(): View
    {
        return view('admin.edukasi.create', [
            'edukasi' => new Edukasi(),
            'categories' => $this->categories(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request);
        $data['user_id'] = $request->user()->id;
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);
        $data['is_published'] = $request->boolean('is_published');
        $data['thumbnail'] = $this->storeImage($request, 'thumbnail');

        Edukasi::create($data);

        return redirect()->route('admin.edukasi.index')->with('status', 'Konten edukasi berhasil ditambahkan.');
    }

    public function edit(Edukasi $edukasi): View
    {
        return view('admin.edukasi.edit', [
            'edukasi' => $edukasi,
            'categories' => $this->categories(),
        ]);
    }

    public function update(Request $request, Edukasi $edukasi): RedirectResponse
    {
        $data = $this->validateData($request, $edukasi->id);
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);
        $data['is_published'] = $request->boolean('is_published');

        if ($request->hasFile('thumbnail')) {
            $this->deleteImage($edukasi->thumbnail);
            $data['thumbnail'] = $this->storeImage($request, 'thumbnail');
        }

        $edukasi->update($data);

        return redirect()->route('admin.edukasi.index')->with('status', 'Konten edukasi berhasil diperbarui.');
    }

    public function destroy(Edukasi $edukasi): RedirectResponse
    {
        $this->deleteImage($edukasi->thumbnail);
        $edukasi->delete();

        return redirect()->route('admin.edukasi.index')->with('status', 'Konten edukasi berhasil dihapus.');
    }

    private function validateData(Request $request, ?int $id = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('edukasis', 'slug')->ignore($id)],
            'category' => ['required', 'string', Rule::in(array_keys($this->categories()))],
            'excerpt' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'thumbnail' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);
    }

    private function categories(): array
    {
        return [
            'literasi-digital' => 'Literasi Digital',
            'lingkungan-sehat' => 'Lingkungan Sehat',
            'kesiapsiagaan' => 'Kesiapsiagaan Bencana',
            'keamanan' => 'Keamanan Masyarakat',
        ];
    }

    private function storeImage(Request $request, string $field): ?string
    {
        return $request->hasFile($field)
            ? $request->file($field)->store('uploads/edukasi', 'public')
            : null;
    }

    private function deleteImage(?string $path): void
    {
        if ($path && ! str_starts_with($path, 'http')) {
            Storage::disk('public')->delete($path);
        }
    }
}