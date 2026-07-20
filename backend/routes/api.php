<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EdukasiController;
use App\Http\Controllers\KontakController;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UMKMController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::get('/profile', [ProfileController::class, 'show']);
Route::get('/berita', [BeritaController::class, 'index']);
Route::get('/berita/{id}', [BeritaController::class, 'show']);
Route::get('/layanan', [LayananController::class, 'index']);
Route::get('/layanan/{layanan}', [LayananController::class, 'show']);
Route::get('/umkm', [UMKMController::class, 'index']);
Route::get('/umkm/{id}', [UMKMController::class, 'show']);
Route::get('/edukasi', [EdukasiController::class, 'index']);
Route::get('/edukasi/{category}', [EdukasiController::class, 'byCategory'])
    ->whereIn('category', ['stunting-gizi', 'kebun-edukasi', 'literasi-digital', 'lingkungan-sehat', 'kesiapsiagaan', 'keamanan']);
Route::get('/kontak', [KontakController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::put('/profile', [ProfileController::class, 'update']);

    Route::post('/berita', [BeritaController::class, 'store']);
    Route::put('/berita/{berita}', [BeritaController::class, 'update']);
    Route::delete('/berita/{berita}', [BeritaController::class, 'destroy']);

    Route::post('/layanan', [LayananController::class, 'store']);
    Route::put('/layanan/{layanan}', [LayananController::class, 'update']);
    Route::delete('/layanan/{layanan}', [LayananController::class, 'destroy']);

    Route::post('/umkm', [UMKMController::class, 'store']);
    Route::put('/umkm/{umkm}', [UMKMController::class, 'update']);
    Route::delete('/umkm/{umkm}', [UMKMController::class, 'destroy']);

    Route::post('/edukasi', [EdukasiController::class, 'store']);
    Route::put('/edukasi/{edukasi}', [EdukasiController::class, 'update']);
    Route::delete('/edukasi/{edukasi}', [EdukasiController::class, 'destroy']);

    Route::put('/kontak', [KontakController::class, 'update']);

    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::post('/users/{user}', [UserController::class, 'update']); // Use POST because of multipart/form-data
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
});