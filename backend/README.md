# Backend Desa Karangpapak

Backend menggunakan Laravel 12 sebagai REST API dan dashboard admin.

## Menjalankan Lokal

1. Pastikan MySQL aktif.
2. Buat database `karangpapak`.
3. Jalankan:

```bash
composer install
npm install
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
```

4. Untuk mode pengembangan admin Blade, jalankan dua terminal:

Terminal 1:
```bash
php artisan serve
```

Terminal 2:
```bash
npm run dev
```

5. Jika ingin admin berjalan tanpa `npm run dev`, build asset sekali:

```bash
npm run build
php artisan serve
```

Backend lokal akan berjalan di:
- `http://127.0.0.1:8000`

## Login Admin

- Email: `admin@karangpapak.test`
- Password: `password`

## URL Admin

- Login admin: `/admin/login`
- Dashboard admin: `/admin`
- Profil desa: `/admin/profile`
- Layanan: `/admin/layanan`
- Berita: `/admin/berita`
- UMKM: `/admin/umkm`
- Edukasi: `/admin/edukasi`
- Transparansi: `/admin/transparansi`
- Kontak: `/admin/kontak`

## URL API Publik

- `GET /api/profile`
- `GET /api/layanan`
- `GET /api/berita`
- `GET /api/berita/{slug|id}`
- `GET /api/umkm`
- `GET /api/umkm/{slug|id}`
- `GET /api/edukasi`
- `GET /api/edukasi/{category}`
- `GET /api/kontak`
- `GET /api/transparansi`

## Deploy Ringkas

### Backend

- Set `APP_ENV=production`
- Set `APP_DEBUG=false`
- Set `APP_URL` ke domain backend
- Atur koneksi database produksi
- Jalankan:

```bash
composer install --optimize-autoloader --no-dev
npm install
npm run build
php artisan migrate --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```