export type GalleryPhoto = {
  id: string;
  title: string;
  category: "pembangunan" | "pertanian" | "sosial" | "kesehatan" | "kebudayaan";
  categoryLabel: string;
  date: string;
  contributor: string;
  location: string;
  copyright: string;
  imageUrl: string;
  description: string;
  additionalImages?: string[];
  source?: "berita" | "dokumentasi";
};

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    title: "Pengaspalan & Perbaikan Jalan Usaha Tani Karangpapak",
    category: "pembangunan",
    categoryLabel: "Pembangunan Desa",
    date: "14 Juli 2026",
    contributor: "Pemerintah Desa",
    location: "Desa Karangpapak, Kec. Cisolok",
    copyright: "Pemerintah Desa Karangpapak",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    description: `Pelaksanaan program pengaspalan dan perbaikan Jalan Usaha Tani Karangpapak untuk memperlancar mobilitas pertanian warga.

Proyek perbaikan jalan sepanjang 1,2 kilometer ini dibiayai melalui Dana Desa Karangpapak tahun anggaran 2026. Jalan ini menghubungkan sentra perkebunan warga menuju jalan utama desa, memudahkan pengangkutan hasil panen padi, kelapa, dan sayuran secara lebih cepat dan efisien.`,
    additionalImages: [
      "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80",
    ],
    source: "dokumentasi",
  },
  {
    id: "g2",
    title: "Kebun Edukasi: Panen Bersama & Pelatihan Biochar Organik",
    category: "pertanian",
    categoryLabel: "Kebun Edukasi & Tani",
    date: "10 Juli 2026",
    contributor: "Kelompok Tani Karangpapak",
    location: "Kebun Edukasi Tani RT 03/RW 02",
    copyright: "Pemerintah Desa Karangpapak",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    description: `Pelatihan pembuatan dan penggunaan biochar arang hayati untuk meningkatkan produktivitas lahan tani warga.

Biochar diproduksi dari limbah pertanian lokal dan digunakan sebagai media pembenah tanah organik. Hasil panen bersama warga menunjukkan peningkatan kualitas bulir padi dan ketahanan terhadap musim kemarau.`,
    additionalImages: [
      "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
    ],
    source: "dokumentasi",
  },
  {
    id: "g3",
    title: "Pelayanan Posyandu Balita & Pembagian PMT Bergizi",
    category: "kesehatan",
    categoryLabel: "Kesehatan & Posyandu",
    date: "05 Juli 2026",
    contributor: "Tim Bidan & Kader Posyandu",
    location: "Poskesdes Desa Karangpapak",
    copyright: "Pemerintah Desa Karangpapak",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    description: `Pemeriksaan rutin kesehatan balita, penimbangan berat badan, imunisasi berkala, serta pemberian makanan tambahan (PMT) tinggi protein hewani.

Program intervensi penanganan stunting dilaksanakan secara terpadu demi memastikan tumbuh kembang generasi muda Karangpapak secara sehat dan optimal.`,
    additionalImages: [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
    ],
    source: "dokumentasi",
  },
  {
    id: "g4",
    title: "Gotong Royong Pembersihan Saluran Air & Pesisir Pantai",
    category: "sosial",
    categoryLabel: "Gotong Royong",
    date: "28 Juni 2026",
    contributor: "Karang Taruna & Warga",
    location: "Pesisir Pantai Karangpapak",
    copyright: "Pemerintah Desa Karangpapak",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
    description: `Kegiatan kebersihan lingkungan di sepanjang jalur pantai dan saluran pembuangan air utama dusun.

Partisipasi antusias warga Karangpapak dalam memilah sampah plastik dan merawat kelestarian pesisir sebagai aset wisata dan lingkungan bersama.`,
    additionalImages: [
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    ],
    source: "dokumentasi",
  },
  {
    id: "g5",
    title: "Pameran Produk Olahan Ikan Laut & Kerajinan UMKM",
    category: "kebudayaan",
    categoryLabel: "Pemberdayaan UMKM",
    date: "20 Juni 2026",
    contributor: "Sentra UMKM Desa",
    location: "Aula Kantor Desa Karangpapak",
    copyright: "Pemerintah Desa Karangpapak",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
    description: `Pameran produk unggulan warga desa yang menampilkan aneka olahan hasil laut, kripik pisang mekar jaya, serta produk kerajinan anyaman bambu sinergi.`,
    additionalImages: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=600&q=80",
    ],
    source: "dokumentasi",
  },
  {
    id: "g6",
    title: "Pemasangan Penerangan Jalan Umum Tenaga Surya",
    category: "pembangunan",
    categoryLabel: "Pembangunan Desa",
    date: "12 Juni 2026",
    contributor: "Tim Pembangunan Desa",
    location: "Jalan Utama Lintas Dusun",
    copyright: "Pemerintah Desa Karangpapak",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    description: `Pemasangan unit PJU solar cell hemat energi di titik-titik rawan penerangan malam hari untuk mendukung keamanan dan lalu lintas masyarakat.`,
    additionalImages: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80",
    ],
    source: "dokumentasi",
  },
];
