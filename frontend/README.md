# Frontend Desa Karangpapak

Frontend menggunakan Next.js 16 untuk website publik desa.

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Frontend lokal akan berjalan di:
- `http://127.0.0.1:3000`

## Konfigurasi Environment

File `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

## URL Website Publik

- Beranda: `/`
- Profil Desa: `/profile`
- Layanan: `/layanan`
- Berita: `/berita`
- Detail Berita: `/berita/{slug}`
- UMKM: `/umkm`
- Detail UMKM: `/umkm/{slug}`
- Edukasi: `/edukasi`
- Literasi Digital: `/edukasi/literasi-digital`
- Lingkungan Sehat: `/edukasi/lingkungan-sehat`
- Kesiapsiagaan: `/edukasi/kesiapsiagaan`
- Keamanan: `/edukasi/keamanan`
- Transparansi: `/transparansi`
- Kontak: `/kontak`

## Deploy Ringkas

### Frontend

- Set `NEXT_PUBLIC_API_URL` ke domain API backend
- Jalankan:

```bash
npm install
npm run build
npm run start
```

### Vercel

- Root project: `frontend`
- Environment variable: `NEXT_PUBLIC_API_URL`