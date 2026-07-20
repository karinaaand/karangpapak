<?php

namespace App\Http\Controllers;

use App\Models\UMKM;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Cache;

class UMKMController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $page = $request->integer('page', 1);
        $perPage = (int) $request->integer('per_page', 6);
        $cacheKey = "umkm_index_page_{$page}_per_page_{$perPage}";

        $umkm = Cache::remember($cacheKey, 3600, function () use ($perPage) {
            return UMKM::query()
                ->latest()
                ->paginate($perPage)->toArray();
        });

        return response()->json($umkm);
    }

    public function show(string $id): JsonResponse
    {
        $cacheKey = "umkm_show_{$id}";
        $umkm = Cache::remember($cacheKey, 3600, function () use ($id) {
            return UMKM::query()
                ->where('id', $id)
                ->orWhere('slug', $id)
                ->firstOrFail();
        });

        return response()->json($umkm);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validateData($request);
        $data['user_id'] = $request->user()->id;
        $data['slug'] = $data['slug'] ?: Str::slug($data['name']);

        $umkm = UMKM::create($data);
        Cache::flush();

        return response()->json([
            'message' => 'UMKM berhasil dibuat.',
            'data' => $umkm,
        ], 201);
    }

    public function update(Request $request, UMKM $umkm): JsonResponse
    {
        $data = $this->validateData($request, $umkm->id);
        $data['slug'] = $data['slug'] ?: Str::slug($data['name']);
        $umkm->update($data);
        Cache::flush();

        return response()->json([
            'message' => 'UMKM berhasil diperbarui.',
            'data' => $umkm->fresh(),
        ]);
    }

    public function destroy(UMKM $umkm): JsonResponse
    {
        $umkm->delete();
        Cache::flush();

        return response()->json([
            'message' => 'UMKM berhasil dihapus.',
        ]);
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
            'image' => ['nullable', 'string', 'max:255'],
            'is_featured' => ['nullable', 'boolean'],
            'is_published' => ['nullable', 'boolean'],
        ]);
    }
}
