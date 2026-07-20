<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Layanan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class LayananController extends Controller
{
    public function index(): View
    {
        return view('admin.layanan.index', [
            'layanans' => Layanan::query()->orderBy('sort_order')->latest()->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.layanan.create', [
            'layanan' => new Layanan(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request);
        $data['user_id'] = $request->user()->id;
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);
        $data['is_published'] = $request->boolean('is_published');

        Layanan::create($data);

        return redirect()->route('admin.layanan.index')->with('status', 'Layanan berhasil ditambahkan.');
    }

    public function edit(Layanan $layanan): View
    {
        return view('admin.layanan.edit', compact('layanan'));
    }

    public function update(Request $request, Layanan $layanan): RedirectResponse
    {
        $data = $this->validateData($request, $layanan->id);
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);
        $data['is_published'] = $request->boolean('is_published');
        $layanan->update($data);

        return redirect()->route('admin.layanan.index')->with('status', 'Layanan berhasil diperbarui.');
    }

    public function destroy(Layanan $layanan): RedirectResponse
    {
        $layanan->delete();

        return redirect()->route('admin.layanan.index')->with('status', 'Layanan berhasil dihapus.');
    }

    private function validateData(Request $request, ?int $id = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('layanans', 'slug')->ignore($id)],
            'summary' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'requirements' => ['nullable', 'string', 'max:255'],
            'service_hours' => ['nullable', 'string', 'max:255'],
            'contact_person' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }
}