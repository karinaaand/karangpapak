<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Cache;

class BeritaController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $page = $request->integer('page', 1);
        $perPage = $request->integer('per_page', 6);
        $cacheKey = "berita_index_page_{$page}_per_page_{$perPage}";

        $berita = Cache::remember($cacheKey, 3600, function () use ($perPage) {
            return Berita::query()->latest()->paginate($perPage)->toArray();
        });

        return response()->json($berita);
    }

    public function show(string $id): JsonResponse
    {
        $cacheKey = "berita_show_{$id}";
        $berita = Cache::remember($cacheKey, 3600, function () use ($id) {
            return Berita::query()
                ->where('id', $id)
                ->orWhere('slug', $id)
                ->firstOrFail();
        });

        return response()->json($berita);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validateData($request);
        $data['user_id'] = $request->user()->id;
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);

        $berita = Berita::create($data);
        Cache::flush();

        return response()->json([
            'message' => 'Berita berhasil dibuat.',
            'data' => $berita,
        ], 201);
    }

    public function update(Request $request, Berita $berita): JsonResponse
    {
        $data = $this->validateData($request, $berita->id);
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);
        $berita->update($data);
        Cache::flush();

        return response()->json([
            'message' => 'Berita berhasil diperbarui.',
            'data' => $berita->fresh(),
        ]);
    }

    public function destroy(Berita $berita): JsonResponse
    {
        $berita->delete();
        Cache::flush();

        return response()->json([
            'message' => 'Berita berhasil dihapus.',
        ]);
    }

    private function validateData(Request $request, ?int $id = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('beritas', 'slug')->ignore($id)],
            'excerpt' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'thumbnail' => ['nullable', 'string', 'max:255'],
            'published_at' => ['nullable', 'date'],
            'is_published' => ['nullable', 'boolean'],
        ]);
    }
}