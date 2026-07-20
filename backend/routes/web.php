<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BeritaController as AdminBeritaController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\EdukasiController as AdminEdukasiController;
use App\Http\Controllers\Admin\KontakController as AdminKontakController;
use App\Http\Controllers\Admin\LayananController as AdminLayananController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\TransparansiController as AdminTransparansiController;
use App\Http\Controllers\Admin\UMKMController as AdminUMKMController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/admin');

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AuthController::class, 'create'])->name('admin.login');
    Route::post('/admin/login', [AuthController::class, 'store'])->name('admin.login.store');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');

    Route::get('/profile', [AdminProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [AdminProfileController::class, 'update'])->name('profile.update');

    Route::resource('layanan', AdminLayananController::class)->except(['show']);
    Route::resource('berita', AdminBeritaController::class)->except(['show']);
    Route::resource('umkm', AdminUMKMController::class)->except(['show']);
    Route::resource('edukasi', AdminEdukasiController::class)->except(['show']);
    Route::resource('transparansi', AdminTransparansiController::class)->except(['show']);

    Route::get('/kontak', [AdminKontakController::class, 'edit'])->name('kontak.edit');
    Route::put('/kontak', [AdminKontakController::class, 'update'])->name('kontak.update');
});