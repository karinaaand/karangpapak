<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kontak;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class KontakController extends Controller
{
    public function edit(): View
    {
        $kontak = Kontak::query()->firstOrCreate(
            ['id' => 1],
            ['office_name' => 'Kantor Desa Karangpapak']
        );

        return view('admin.kontak.edit', compact('kontak'));
    }

    public function update(Request $request): RedirectResponse
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

        return back()->with('status', 'Kontak desa berhasil diperbarui.');
    }
}