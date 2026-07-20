<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UMKM;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class UMKMController extends Controller
{
    public function index(): View
    {
        return view('admin.umkm.index', [
            'umkms' => UMKM::query()->latest()->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.umkm.create', [
            'umkm' => new UMKM(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request);
        $data['user_id'] = $request->user()->id;
        $data['slug'] = $data['slug'] ?: Str::slug($data['name']);
        $data['is_featured'] = $request->boolean('is_featured');
        $data['is_published'] = $request->boolean('is_published');
        $data['image'] = $this->storeImage($request, 'image');

        UMKM::create($data);

        return redirect()->route('admin.umkm.index')->with('status', 'UMKM berhasil ditambahkan.');
    }

    public function edit(UMKM $umkm): View
    {
        return view('admin.umkm.edit', compact('umkm'));
    }

    public function update(Request $request, UMKM $umkm): RedirectResponse
    {
        $data = $this->validateData($request, $umkm->id);
        $data['slug'] = $data['slug'] ?: Str::slug($data['name']);
        $data['is_featured'] = $request->boolean('is_featured');
        $data['is_published'] = $request->boolean('is_published');

        if ($request->hasFile('image')) {
            $this->deleteImage($umkm->image);
            $data['image'] = $this->storeImage($request, 'image');
        }

        $umkm->update($data);

        return redirect()->route('admin.umkm.index')->with('status', 'UMKM berhasil diperbarui.');
    }

    public function destroy(UMKM $umkm): RedirectResponse
    {
        $this->deleteImage($umkm->image);
        $umkm->delete();

        return redirect()->route('admin.umkm.index')->with('status', 'UMKM berhasil dihapus.');
    }

    private function validateData(Request $request, ?int $id = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('umkms', 'slug')->ignore($id)],
            'owner_name' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:30'],
            'whatsapp' => ['nullable', 'string', 'max:30'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);
    }

    private function storeImage(Request $request, string $field): ?string
    {
        return $request->hasFile($field)
            ? $request->file($field)->store('uploads/umkm', 'public')
            : null;
    }

    private function deleteImage(?string $path): void
    {
        if ($path && ! str_starts_with($path, 'http')) {
            Storage::disk('public')->delete($path);
        }
    }
}