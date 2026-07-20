<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Edukasi;
use App\Models\Layanan;
use App\Models\UMKM;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'berita' => Berita::count(),
            'layanan' => Layanan::count(),
            'umkm' => UMKM::count(),
            'edukasi' => Edukasi::count(),
        ]);
    }
}