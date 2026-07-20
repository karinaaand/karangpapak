<?php

namespace App\Http\Controllers;

use App\Models\Edukasi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Cache;

class EdukasiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->integer('per_page', 6);
        $category = $request->query('category');
        $search = $request->query('search');

        $query = Edukasi::query()->where('is_published', true);

        if ($category && $category !== 'all') {
            $query->where('category', $category);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $data = $query->latest()->paginate($perPage);

        return response()->json($data);
    }

    public function byCategory(Request $request, string $category): JsonResponse
    {
        $page = $request->integer('page', 1);
        $perPage = (int) $request->integer('per_page', 6);
        $search = $request->query('search');
        $cacheKey = "edukasi_category_{$category}_p{$page}_pp{$perPage}_s{$search}";

        $data = Cache::remember($cacheKey, 3600, function () use ($perPage, $category, $search) {
            $query = Edukasi::query()
                ->where('category', $category)
                ->where('is_published', true);

            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('excerpt', 'like', "%{$search}%")
                      ->orWhere('content', 'like', "%{$search}%");
                });
            }

            return $query->latest()->paginate($perPage)->toArray();
        });

        return response()->json($data);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validateData($request);
        $data['user_id'] = $request->user()->id;
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('uploads/edukasi', 'public');
        }

        $edukasi = Edukasi::create($data);
        Cache::flush();

        return response()->json([
            'message' => 'Konten edukasi berhasil dibuat.',
            'data' => $edukasi,
        ], 201);
    }

    public function update(Request $request, Edukasi $edukasi): JsonResponse
    {
        $data = $this->validateData($request, $edukasi->id);
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);

        if ($request->hasFile('thumbnail')) {
            if ($edukasi->thumbnail && !str_starts_with($edukasi->thumbnail, 'http')) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($edukasi->thumbnail);
            }
            $data['thumbnail'] = $request->file('thumbnail')->store('uploads/edukasi', 'public');
        } else {
            unset($data['thumbnail']);
        }

        $edukasi->update($data);
        Cache::flush();

        return response()->json([
            'message' => 'Konten edukasi berhasil diperbarui.',
            'data' => $edukasi->fresh(),
        ]);
    }

    public function destroy(Edukasi $edukasi): JsonResponse
    {
        $edukasi->delete();
        Cache::flush();

        return response()->json([
            'message' => 'Konten edukasi berhasil dihapus.',
        ]);
    }

    private function validateData(Request $request, ?int $id = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('edukasis', 'slug')->ignore($id)],
            'category' => ['required', 'string', Rule::in(['stunting-gizi', 'kebun-edukasi', 'literasi-digital', 'lingkungan-sehat', 'kesiapsiagaan', 'keamanan'])],
            'excerpt' => ['nullable', 'string'],
            'content' => ['required', 'string'],
            'thumbnail' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'is_published' => ['nullable', 'boolean'],
        ]);
    }
}
