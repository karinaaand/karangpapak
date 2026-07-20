<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Cache;

class LayananController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $page = $request->integer('page', 1);
        $perPage = (int) $request->integer('per_page', 6);
        $all     = $request->boolean('all', false);
        $cacheKey = "layanan_index_page_{$page}_per_page_{$perPage}_all_" . ($all ? '1' : '0');

        $layanan = Cache::remember($cacheKey, 3600, function () use ($perPage, $all) {
            $query = Layanan::query()->orderBy('sort_order')->latest('id');

            if (! $all) {
                $query->where('is_published', true);
            }

            return $query->paginate($perPage)->toArray();
        });

        return response()->json($layanan);
    }

    public function show(string $id): JsonResponse
    {
        $cacheKey = "layanan_show_{$id}";
        $layanan = Cache::remember($cacheKey, 3600, function () use ($id) {
            return Layanan::query()
                ->where('id', $id)
                ->orWhere('slug', $id)
                ->firstOrFail();
        });

        return response()->json($layanan);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validateData($request);
        $data['user_id'] = $request->user()->id;
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);

        $layanan = Layanan::create($data);
        Cache::flush();

        return response()->json([
            'message' => 'Layanan berhasil dibuat.',
            'data' => $layanan,
        ], 201);
    }

    public function update(Request $request, Layanan $layanan): JsonResponse
    {
        $data = $this->validateData($request, $layanan->id);
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);
        $layanan->update($data);
        Cache::flush();

        return response()->json([
            'message' => 'Layanan berhasil diperbarui.',
            'data' => $layanan->fresh(),
        ]);
    }

    public function destroy(Layanan $layanan): JsonResponse
    {
        $layanan->delete();
        Cache::flush();

        return response()->json([
            'message' => 'Layanan berhasil dihapus.',
        ]);
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
            'is_published' => ['nullable', 'boolean'],
        ]);
    }
}
