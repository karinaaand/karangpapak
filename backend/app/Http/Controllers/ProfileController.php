<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(): JsonResponse
    {
        $profile = Profile::query()->firstOrCreate(
            ['id' => 1],
            ['village_name' => 'Desa Karangpapak']
        );

        return response()->json($profile);
    }

    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'village_name' => ['required', 'string', 'max:255'],
            'district' => ['nullable', 'string', 'max:255'],
            'regency' => ['nullable', 'string', 'max:255'],
            'province' => ['nullable', 'string', 'max:255'],
            'postal_code' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string'],
            'vision' => ['nullable', 'string'],
            'mission' => ['nullable', 'string'],
            'history' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'head_name' => ['nullable', 'string', 'max:255'],
            'head_title' => ['nullable', 'string', 'max:255'],
            'population_total' => ['nullable', 'integer', 'min:0'],
            'families_total' => ['nullable', 'integer', 'min:0'],
            'umkm_total' => ['nullable', 'integer', 'min:0'],
            'budget_realization_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'service_banner_title' => ['nullable', 'string', 'max:255'],
            'service_banner_description' => ['nullable', 'string'],
            'video_url' => ['nullable', 'string', 'max:500'],
            'logo_image' => ['nullable', 'image', 'mimes:png,jpg,jpeg,svg,webp', 'max:2048'],
        ]);

        $profile = Profile::query()->firstOrCreate(['id' => 1], ['village_name' => 'Desa Karangpapak']);

        if ($request->hasFile('logo_image')) {
            if ($profile->logo_image && !str_starts_with($profile->logo_image, 'http')) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($profile->logo_image);
            }
            $data['logo_image'] = $request->file('logo_image')->store('uploads/profile', 'public');
        } else {
            unset($data['logo_image']);
        }

        $profile->update($data);

        return response()->json([
            'message' => 'Profil desa berhasil diperbarui.',
            'data' => $profile->fresh(),
        ]);
    }
}