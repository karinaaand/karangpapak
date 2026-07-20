<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;

class ProfileController extends Controller
{
    public function edit(): View
    {
        $profile = Profile::query()->firstOrCreate(
            ['id' => 1],
            ['village_name' => 'Desa Karangpapak']
        );

        return view('admin.profile.edit', compact('profile'));
    }

    public function update(Request $request): RedirectResponse
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
            'hero_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'population_total' => ['nullable', 'integer', 'min:0'],
            'families_total' => ['nullable', 'integer', 'min:0'],
            'umkm_total' => ['nullable', 'integer', 'min:0'],
            'budget_realization_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'service_banner_title' => ['nullable', 'string', 'max:255'],
            'service_banner_description' => ['nullable', 'string'],
        ]);

        $profile = Profile::query()->firstOrCreate(['id' => 1], ['village_name' => 'Desa Karangpapak']);

        if ($request->hasFile('hero_image')) {
            $this->deleteImage($profile->hero_image);
            $data['hero_image'] = $request->file('hero_image')->store('uploads/profile', 'public');
        } else {
            unset($data['hero_image']);
        }

        $profile->update($data);

        return back()->with('status', 'Profil desa berhasil diperbarui.');
    }

    private function deleteImage(?string $path): void
    {
        if ($path && ! str_starts_with($path, 'http')) {
            Storage::disk('public')->delete($path);
        }
    }
}