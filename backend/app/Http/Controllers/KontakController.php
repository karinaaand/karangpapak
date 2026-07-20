<?php

namespace App\Http\Controllers;

use App\Models\Kontak;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KontakController extends Controller
{
    public function show(): JsonResponse
    {
        $kontak = Kontak::query()->firstOrCreate(
            ['id' => 1],
            ['office_name' => 'Kantor Desa Karangpapak']
        );

        return response()->json($kontak);
    }

    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'office_name' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:255'],
            'whatsapp' => ['nullable', 'string', 'max:30'],
            'facebook' => ['nullable', 'string', 'max:255'],
            'instagram' => ['nullable', 'string', 'max:255'],
            'youtube' => ['nullable', 'string', 'max:255'],
            'maps_embed' => ['nullable', 'string', 'max:255'],
        ]);

        $kontak = Kontak::query()->firstOrCreate(['id' => 1], ['office_name' => 'Kantor Desa Karangpapak']);
        $kontak->update($data);

        return response()->json([
            'message' => 'Kontak desa berhasil diperbarui.',
            'data' => $kontak->fresh(),
        ]);
    }
}