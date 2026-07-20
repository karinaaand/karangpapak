<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Models\Edukasi;
use App\Models\Layanan;
use App\Models\UMKM;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(): View
    {
        return view('admin.dashboard.index', [
            'stats' => [
                'berita' => Berita::count(),
                'layanan' => Layanan::count(),
                'umkm' => UMKM::count(),
                'edukasi' => Edukasi::count(),
            ],
        ]);
    }
}