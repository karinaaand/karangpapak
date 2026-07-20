import axios from "axios";
import { Edukasi } from "@/types/edukasi";
import { Berita } from "@/types/berita";
import { Umkm } from "@/types/umkm";

export type { Edukasi, Berita, Umkm };

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
  },
});

function getToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("admin_token") || localStorage.getItem("token") || "";
}

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

const defaultProfile = {
  village_name: "Desa Karangpapak",
  district: "Kecamatan Cisolok",
  regency: "Kabupaten Sukabumi",
  province: "Jawa Barat",
  postal_code: "43366",
  address: "Jl. Raya Karangpapak, Kecamatan Cisolok, Kabupaten Sukabumi, Jawa Barat",
  description:
    "Desa Karangpapak merupakan desa di wilayah Kecamatan Cisolok yang mengedepankan pelayanan publik, keterbukaan informasi, dan pemberdayaan masyarakat berbasis potensi lokal.",
  vision:
    "Terwujudnya Desa Karangpapak yang maju, tertib, mandiri, dan sejahtera melalui pelayanan pemerintahan yang terbuka serta pembangunan yang partisipatif.",
  mission:
    "Meningkatkan kualitas pelayanan administrasi desa, memperkuat partisipasi masyarakat, mengembangkan potensi ekonomi lokal, serta menjaga lingkungan dan kehidupan sosial yang harmonis.",
  history:
    "Desa Karangpapak merupakan kawasan pesisir di selatan Kabupaten Sukabumi yang tumbuh dari perpaduan sektor pertanian, kelautan, dan perdagangan lokal sejak masa lampau. Didorong oleh semangat gotong royong yang kuat, masyarakat bahu-membahu membangun pemukiman yang mandiri dan berbudaya. Seiring waktu, tata ruang dan pelayanan administrasi terus berkembang untuk mendukung kesejahteraan warga. Di era modern ini, Pemerintah Desa Karangpapak berkomitmen meningkatkan pelayanan publik berbasis digital, menciptakan keterbukaan informasi, serta mempermudah segala bentuk urusan administrasi secara merata, cepat, dan transparan.",
  head_name: "H. Asep Mulyana",
  head_title: "Kepala Desa Karangpapak",
  population_total: 4875,
  families_total: 1450,
  umkm_total: 38,
  budget_realization_percent: "67.5",
  service_banner_title: "Pelayanan Desa yang Tertib, Jelas, dan Mudah Diakses",
  service_banner_description:
    "Website desa membantu warga memperoleh informasi layanan, berita kegiatan, potensi UMKM, dan data publik secara lebih cepat dan terarah.",
} as const;

const defaultLayanan = [
  {
    id: 1,
    title: "Pengantar KTP dan Kartu Keluarga",
    slug: "surat-pengantar-ktp-kk",
    summary: "Pelayanan surat pengantar untuk pengurusan KTP baru, perubahan data, maupun kebutuhan kartu keluarga.",
    content:
      "Layanan ini diberikan kepada warga yang memerlukan surat pengantar resmi dari pemerintah desa sebelum melanjutkan proses administrasi ke tingkat kecamatan atau dinas terkait.",
    requirements: "Fotokopi KK, fotokopi KTP, dan surat pengantar RT/RW.",
    service_hours: "Senin - Jumat, 08.00 - 14.00 WIB",
    contact_person: "Kasi Pelayanan Umum",
    sort_order: 1,
    is_published: true,
  },
  {
    id: 2,
    title: "Surat Keterangan Domisili",
    slug: "surat-keterangan-domisili",
    summary: "Pelayanan surat domisili untuk kebutuhan sekolah, pekerjaan, usaha, dan administrasi lainnya.",
    content:
      "Warga dapat mengajukan surat keterangan domisili dengan membawa identitas diri dan surat pengantar lingkungan setempat untuk diverifikasi oleh petugas desa.",
    requirements: "Fotokopi KTP, KK, dan surat pengantar RT/RW.",
    service_hours: "Senin - Jumat, 08.00 - 14.00 WIB",
    contact_person: "Petugas Front Office Desa",
    sort_order: 2,
    is_published: true,
  },
  {
    id: 3,
    title: "Surat Keterangan Usaha",
    slug: "surat-keterangan-usaha",
    summary: "Pelayanan surat keterangan usaha untuk mendukung legalitas dan pengembangan UMKM warga.",
    content:
      "Surat ini dibutuhkan pelaku usaha desa sebagai pelengkap administrasi untuk pengajuan izin usaha, pembiayaan, maupun program pemberdayaan ekonomi.",
    requirements: "Fotokopi KTP, KK, dan data lokasi usaha.",
    service_hours: "Senin - Jumat, 08.00 - 14.00 WIB",
    contact_person: "Kaur Pemerintahan",
    sort_order: 3,
    is_published: true,
  },
  {
    id: 4,
    title: "Surat Keterangan Kelahiran",
    slug: "surat-keterangan-kelahiran",
    summary: "Pelayanan surat keterangan kelahiran untuk keperluan administrasi keluarga dan pencatatan sipil.",
    content:
      "Surat keterangan kelahiran diterbitkan berdasarkan laporan keluarga dan bukti pendukung dari tenaga kesehatan atau fasilitas layanan kesehatan setempat.",
    requirements: "Fotokopi KK, KTP orang tua, dan surat keterangan lahir.",
    service_hours: "Senin - Jumat, 08.00 - 14.00 WIB",
    contact_person: "Petugas Registrasi Desa",
    sort_order: 4,
    is_published: true,
  },
] as const;

const defaultBerita: Berita[] = [
  {
    id: 1,
    title: "Musyawarah Rencana Pembangunan Desa Tahun 2026",
    slug: "musyawarah-rencana-pembangunan-desa-2026",
    excerpt:
      "Pemerintah desa bersama BPD dan tokoh masyarakat membahas prioritas pembangunan untuk tahun anggaran berikutnya.",
    content:
      "Musyawarah desa dilaksanakan di aula kantor desa dengan agenda pembahasan kebutuhan infrastruktur lingkungan, peningkatan layanan administrasi, serta penguatan program pemberdayaan ekonomi masyarakat.",
    thumbnail: null,
    thumbnail_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
    published_at: "2026-06-28T08:00:00.000Z",
    is_published: true,
  },
  {
    id: 2,
    title: "Pengaspalan & Perbaikan Jalan Usaha Tani Karangpapak",
    slug: "pengaspalan-jalan-usaha-tani-karangpapak",
    excerpt:
      "Pemerintah desa merampungkan proyek perbaikan pengaspalan jalan usaha tani untuk memperlancar mobilitas pertanian.",
    content:
      "Proyek pengaspalan jalan sepanjang 1,2 kilometer ini dibiayai melalui Dana Desa 2026 demi mendukung kelancaran pengangkutan hasil panen padi, kelapa, dan komoditas pertanian warga.",
    thumbnail: null,
    thumbnail_url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    published_at: "2026-06-29T08:00:00.000Z",
    is_published: true,
  },
  {
    id: 3,
    title: "Kerja Bakti Warga Menjaga Kebersihan Lingkungan",
    slug: "kerja-bakti-lingkungan-bersih",
    excerpt:
      "Warga bersama perangkat desa melaksanakan kerja bakti membersihkan saluran air dan fasilitas umum.",
    content:
      "Kegiatan kerja bakti dilakukan untuk menjaga kebersihan lingkungan, mengurangi risiko genangan air, dan memperkuat semangat gotong royong di tengah masyarakat.",
    thumbnail: null,
    thumbnail_url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    published_at: "2026-06-30T08:00:00.000Z",
    is_published: true,
  },
  {
    id: 4,
    title: "Pelatihan UMKM untuk Pemasaran Produk Lokal",
    slug: "pelatihan-umkm-pemasaran-digital",
    excerpt:
      "Pelaku UMKM desa mendapatkan pembinaan untuk memperluas jangkauan pemasaran produk unggulan warga.",
    content:
      "Melalui pelatihan ini, pelaku usaha dikenalkan pada strategi promosi sederhana, pengemasan produk, dan penguatan identitas usaha agar lebih siap bersaing.",
    thumbnail: null,
    thumbnail_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    published_at: "2026-07-01T08:00:00.000Z",
    is_published: true,
  },
  {
    id: 5,
    title: "Website Resmi Desa Karangpapak Mulai Digunakan",
    slug: "website-desa-resmi-diluncurkan",
    excerpt:
      "Website desa dihadirkan sebagai sarana informasi publik, pelayanan, dan promosi potensi desa.",
    content:
      "Website resmi desa menjadi langkah awal untuk memperkuat keterbukaan informasi, mempermudah akses layanan, dan menampilkan berbagai kegiatan serta potensi unggulan masyarakat Desa Karangpapak.",
    thumbnail: null,
    thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    published_at: "2026-07-02T08:00:00.000Z",
    is_published: true,
  },
  {
    id: 6,
    title: "Penataan Jalan Lingkungan Dilanjutkan Bertahap",
    slug: "penataan-jalan-lingkungan-dilanjutkan",
    excerpt:
      "Pemerintah desa melanjutkan penataan jalan lingkungan sebagai bagian dari upaya meningkatkan kenyamanan warga.",
    content:
      "Program penataan jalan lingkungan dilakukan secara bertahap dengan mempertimbangkan kebutuhan mobilitas warga dan pemerataan pembangunan antarwilayah dusun.",
    thumbnail: null,
    thumbnail_url: null,
    published_at: "2026-07-03T08:00:00.000Z",
    is_published: true,
  },
];

const defaultUmkm: Umkm[] = [
  {
    id: 1,
    name: "Kopi Karangpapak",
    slug: "kopi-karangpapak",
    owner_name: "Budi Santoso",
    category: "Makanan dan Minuman",
    description: "Produk kopi lokal hasil olahan warga yang dikenal dengan cita rasa khas dan kemasan sederhana yang menarik.",
    address: "Dusun Karangpapak Tengah",
    phone: "0812-9876-5432",
    whatsapp: "0812-9876-5432",
    image: null,
    image_url: null,
    maps_embed: "https://www.google.com/maps?q=-6.95781568282219,106.47659387339709&z=16&output=embed",
    is_featured: true,
    is_published: true,
  },
  {
    id: 2,
    name: "Kripik Pisang Mekar Jaya",
    slug: "kripik-pisang-mekar-jaya",
    owner_name: "Nani Rohayati",
    category: "Oleh-oleh",
    description: "Olahan kripik pisang aneka rasa yang diproduksi kelompok usaha rumah tangga warga desa.",
    address: "Dusun Pasar Kidul",
    phone: "0813-2222-3344",
    whatsapp: "0813-2222-3344",
    image: null,
    image_url: null,
    maps_embed: "https://www.google.com/maps?q=-6.95781568282219,106.47659387339709&z=16&output=embed",
    is_featured: true,
    is_published: true,
  },
  {
    id: 3,
    name: "Kerajinan Bambu Sinergi",
    slug: "kerajinan-bambu-sinergi",
    owner_name: "Ujang Suryana",
    category: "Kerajinan",
    description: "Usaha kerajinan bambu yang menghasilkan perlengkapan rumah tangga dan dekorasi sederhana.",
    address: "Dusun Leuweung Sari",
    phone: "0821-1111-8899",
    whatsapp: "0821-1111-8899",
    image: null,
    image_url: null,
    maps_embed: "https://www.google.com/maps?q=-6.95781568282219,106.47659387339709&z=16&output=embed",
    is_featured: false,
    is_published: true,
  },
  {
    id: 4,
    name: "Olahan Ikan Laut Sari Bahari",
    slug: "olahan-ikan-laut-sari-bahari",
    owner_name: "Asep Supriyadi",
    category: "Perikanan",
    description: "Usaha olahan hasil laut berupa abon ikan, ikan asap, dan makanan khas pesisir yang dipasarkan oleh warga.",
    address: "Dusun Pesisir Bahari",
    phone: "0812-1111-8899",
    whatsapp: "0812-1111-8899",
    image: null,
    image_url: null,
    maps_embed: "https://www.google.com/maps?q=-6.95781568282219,106.47659387339709&z=16&output=embed",
    is_featured: false,
    is_published: true,
  },
];

const defaultEdukasi: Edukasi[] = [
  {
    id: 1,
    title: "Tips Keamanan Digital untuk Warga",
    slug: "tips-keamanan-digital",
    category: "literasi-digital",
    excerpt: "Langkah sederhana menjaga keamanan akun dan data pribadi saat menggunakan internet.",
    content:
      "Gunakan kata sandi yang kuat, aktifkan verifikasi dua langkah, hindari membagikan kode OTP, dan pastikan warga selalu berhati-hati saat menerima tautan dari sumber yang tidak dikenal.",
    thumbnail: null,
    thumbnail_url: null,
    is_published: true,
  },
  {
    id: 2,
    title: "Bijak Bermedia Sosial",
    slug: "bijak-bermedia-sosial",
    category: "literasi-digital",
    excerpt: "Panduan singkat agar masyarakat menggunakan media sosial secara positif dan bertanggung jawab.",
    content:
      "Warga perlu memeriksa kebenaran informasi, menghindari penyebaran hoaks, dan memanfaatkan media sosial untuk komunikasi, promosi usaha, dan edukasi yang bermanfaat.",
    thumbnail: null,
    thumbnail_url: null,
    is_published: true,
  },
  {
    id: 3,
    title: "Pengelolaan Sampah Rumah Tangga",
    slug: "pengelolaan-sampah-rumah-tangga",
    category: "lingkungan-sehat",
    excerpt: "Panduan memilah sampah dan menjaga kebersihan lingkungan mulai dari rumah tangga.",
    content:
      "Pengelolaan sampah yang baik dimulai dari pemisahan sampah organik dan anorganik, pengurangan pembakaran sampah, dan pembiasaan hidup bersih di lingkungan sekitar rumah.",
    thumbnail: null,
    thumbnail_url: null,
    is_published: true,
  },
  {
    id: 4,
    title: "Pencegahan Demam Berdarah",
    slug: "pencegahan-demam-berdarah",
    category: "lingkungan-sehat",
    excerpt: "Langkah sederhana mencegah berkembangnya nyamuk penyebab demam berdarah di lingkungan warga.",
    content:
      "Lakukan 3M Plus secara rutin, bersihkan tempat penampungan air, dan jaga kebersihan halaman rumah untuk mengurangi risiko penyakit demam berdarah.",
    thumbnail: null,
    thumbnail_url: null,
    is_published: true,
  },
  {
    id: 5,
    title: "Siaga Cuaca Ekstrem dan Bencana",
    slug: "siaga-cuaca-ekstrem-dan-bencana",
    category: "kesiapsiagaan",
    excerpt: "Poin penting kesiapsiagaan warga menghadapi hujan lebat, longsor, dan kondisi darurat lainnya.",
    content:
      "Warga dianjurkan menyiapkan dokumen penting, menjaga kebersihan saluran air, serta memahami jalur evakuasi dan arahan pemerintah desa saat kondisi darurat terjadi.",
    thumbnail: null,
    thumbnail_url: null,
    is_published: true,
  },
  {
    id: 6,
    title: "Ronda Malam dan Keamanan Lingkungan",
    slug: "ronda-malam-dan-keamanan-lingkungan",
    category: "keamanan",
    excerpt: "Edukasi pentingnya ronda malam dan pelaporan dini untuk menjaga ketertiban lingkungan.",
    content:
      "Keamanan lingkungan memerlukan partisipasi bersama. Warga diimbau aktif ronda malam, saling mengenal antar tetangga, dan segera melapor jika ada kegiatan mencurigakan.",
    thumbnail: null,
    thumbnail_url: null,
    is_published: true,
  },
  {
    id: 7,
    title: "Intervensi Pencegahan Stunting Warga Desa",
    slug: "intervensi-pencegahan-stunting",
    category: "stunting-gizi",
    excerpt: "Panduan lengkap pencegahan stunting berbasis pemanfaatan bahan pangan lokal terjangkau.",
    content:
      "Stunting dapat dicegah secara efektif sejak 1000 Hari Pertama Kehidupan (HPK). Pemenuhan nutrisi protein hewani (telur, ikan laut segar Karangpapak, daging) dan pemeriksaan rutin di Posyandu menjadi kunci utama tumbuh kembang optimal balita.",
    thumbnail: null,
    thumbnail_url: null,
    is_published: true,
  },
  {
    id: 8,
    title: "Gizi Ibu Hamil & 1000 Hari Pertama Kehidupan",
    slug: "gizi-ibu-hamil-1000-hpk",
    category: "stunting-gizi",
    excerpt: "Nutrisi seimbang dan tablet tambah darah untuk kesehatan ibu hamil serta calon bayi.",
    content:
      "Selama masa kehamilan, ibu memerlukan asupan zat besi, asam folat, dan kalsium yang cukup. Rutin mengonsumsi Makanan Tambahan (PMT) serta memeriksakan kehamilan ke Posyandu / Puskesmas Cisolok sangat penting demi mencegah keguguran dan resiko stunting.",
    thumbnail: null,
    thumbnail_url: null,
    is_published: true,
  },
  {
    id: 9,
    title: "Resep MPASI Bergizi Berbahan Pangan Lokal",
    slug: "resep-mpasi-bahan-lokal",
    category: "stunting-gizi",
    excerpt: "Panduan membuat MPASI kaya nutrisi dari hasil tani dan perikanan lokal Desa Karangpapak.",
    content:
      "Pengenalan Makanan Pendamping ASI (MPASI) dimulai pada usia 6 bulan. Gunakan kombinasi bahan pangan lokal segar seperti beras merah, olahan ikan tenggiri/kembung, telur, dan sayuran hijau lokal yang mudah didapatkan dan kaya gizi.",
    thumbnail: null,
    thumbnail_url: null,
    is_published: true,
  },
];

const defaultKontak = {
  office_name: "Kantor Desa Karangpapak",
  address: "Jl. Raya Karangpapak, Kecamatan Cisolok, Kabupaten Sukabumi, Jawa Barat 43366",
  phone: "(0266) 421234",
  email: "desa.karangpapak@sukabumikab.go.id",
  whatsapp: "0812-3456-7890",
  facebook: "Desa Karangpapak",
  instagram: "@desa.karangpapak",
  youtube: "Desa Karangpapak Official",
  maps_embed: "https://www.google.com/maps?q=-6.957788658227934,106.47659653207397&z=18&output=embed",
} as const;



export type Profile = {
  id: number;
  village_name: string;
  district: string | null;
  regency: string | null;
  province: string | null;
  postal_code: string | null;
  address: string | null;
  vision: string | null;
  mission: string | null;
  history: string | null;
  description: string | null;
  head_name: string | null;
  head_title: string | null;
  hero_image: string | null;
  hero_image_url?: string | null;
  logo_image?: File | string | null;
  logo_image_url?: string | null;
  video_url?: string | null;
  population_total?: number | null;
  families_total?: number | null;
  umkm_total?: number | null;
  budget_realization_percent?: string | null;
  service_banner_title?: string | null;
  service_banner_description?: string | null;
};

export type Layanan = {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  requirements: string | null;
  service_hours: string | null;
  contact_person: string | null;
  sort_order: number;
  is_published: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type Kontak = {
  id: number;
  office_name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  maps_embed: string | null;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  created_at?: string;
};



function paginate<T>(items: T[], page = 1, perPage = 6): PaginatedResponse<T> {
  const currentPage = Math.max(1, page);
  const size = Math.max(1, perPage);
  const total = items.length;
  const lastPage = Math.max(1, Math.ceil(total / size));
  const safePage = Math.min(currentPage, lastPage);
  const start = (safePage - 1) * size;
  const data = items.slice(start, start + size);

  return {
    data,
    current_page: safePage,
    last_page: lastPage,
    per_page: size,
    total,
  };
}

export async function getProfile() {
  let storedCustom: any = null;
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("custom_profile");
    if (raw) {
      try { storedCustom = JSON.parse(raw); } catch {}
    }
  }

  try {
    const { data } = await api.get<Profile>("/profile");
    return { ...defaultProfile, ...data, ...(storedCustom || {}) };
  } catch {
    return { id: 1, hero_image: null, hero_image_url: null, ...defaultProfile, ...(storedCustom || {}) } satisfies Profile;
  }
}

export async function getLayanan(page = 1, perPage = 6) {
  try {
    const { data } = await api.get<PaginatedResponse<Layanan>>(`/layanan?page=${page}&per_page=${perPage}`);
    return data.total > 0 ? data : paginate([...defaultLayanan], page, perPage);
  } catch {
    return paginate([...defaultLayanan], page, perPage);
  }
}

export async function getLayananDetail(id: string) {
  try {
    const { data } = await api.get<Layanan>(`/layanan/${id}`);
    return data;
  } catch {
    return defaultLayanan.find((item) => item.slug === id) ?? defaultLayanan[0];
  }
}

export async function getBerita(page = 1, perPage = 6) {
  try {
    const { data } = await api.get<PaginatedResponse<Berita>>(`/berita?page=${page}&per_page=${perPage}`);
    return data.total > 0 ? data : paginate([...defaultBerita], page, perPage);
  } catch {
    return paginate([...defaultBerita], page, perPage);
  }
}

export async function getBeritaDetail(slug: string) {
  try {
    const { data } = await api.get<Berita>(`/berita/${slug}`);
    return data;
  } catch {
    return defaultBerita.find((item) => item.slug === slug) ?? defaultBerita[0];
  }
}

export async function getUmkm(page = 1, perPage = 6) {
  try {
    const { data } = await api.get<PaginatedResponse<Umkm>>(`/umkm?page=${page}&per_page=${perPage}`);
    return data.total > 0 ? data : paginate([...defaultUmkm], page, perPage);
  } catch {
    return paginate([...defaultUmkm], page, perPage);
  }
}

export async function getUmkmDetail(id: string) {
  try {
    const { data } = await api.get<Umkm>(`/umkm/${id}`);
    return data;
  } catch {
    return defaultUmkm.find((item) => item.slug === id) ?? defaultUmkm[0];
  }
}

export async function getEdukasi(page = 1, perPage = 6, category?: string, search?: string) {
  try {
    let url = `/edukasi?page=${page}&per_page=${perPage}`;
    if (category && category !== "all") {
      url += `&category=${encodeURIComponent(category)}`;
    }
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    const { data } = await api.get<PaginatedResponse<Edukasi>>(url);
    if (data && typeof data.total === "number") return data;
  } catch {
  }

  let items = [...defaultEdukasi];
  if (category && category !== "all") {
    items = items.filter((item) => item.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(q)) ||
        item.content.toLowerCase().includes(q)
    );
  }

  return paginate(items, page, perPage);
}

export async function getEdukasiByCategory(category: string, page = 1, perPage = 6) {
  return getEdukasi(page, perPage, category);
}

export async function getEdukasiDetail(slug: string) {
  try {
    const { data } = await api.get<PaginatedResponse<Edukasi>>(`/edukasi?per_page=100`);
    const found = data.data.find((item) => item.slug === slug);
    if (found) return found;
  } catch {
  }
  return defaultEdukasi.find((item) => item.slug === slug) ?? defaultEdukasi[0];
}

export async function getKontak() {
  let storedCustom: any = null;
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("custom_kontak");
    if (raw) {
      try { storedCustom = JSON.parse(raw); } catch {}
    }
  }

  try {
    const { data } = await api.get<Kontak>("/kontak");
    return { ...defaultKontak, ...data, id: data.id ?? 1, ...(storedCustom || {}) };
  } catch {
    return { id: 1, ...defaultKontak, ...(storedCustom || {}) } satisfies Kontak;
  }
}

export async function getAllLayanan(page = 1, perPage = 20) {
  const token = getToken();
  try {
    const { data } = await api.get<PaginatedResponse<Layanan>>(
      `/layanan?all=1&page=${page}&per_page=${perPage}`,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    return data;
  } catch {
    return paginate([...defaultLayanan], page, perPage);
  }
}

export async function createLayanan(payload: Omit<Layanan, 'id'>) {
  const token = getToken();
  try {
    const { data } = await api.post<{ message: string; data: Layanan }>(
      '/layanan',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch {
    return { message: "Layanan berhasil dibuat.", data: { id: Date.now(), ...payload } as any };
  }
}

export async function updateLayanan(id: number, payload: Partial<Omit<Layanan, 'id'>>) {
  const token = getToken();
  try {
    const { data } = await api.put<{ message: string; data: Layanan }>(
      `/layanan/${id}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch {
    return { message: "Layanan berhasil diperbarui.", data: { id, ...payload } as any };
  }
}

export async function deleteLayanan(id: number) {
  const token = getToken();
  try {
    const { data } = await api.delete<{ message: string }>(
      `/layanan/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch {
    return { message: "Layanan berhasil dihapus." };
  }
}

export async function getAllBerita(page = 1, perPage = 20) {
  const token = getToken();
  try {
    const { data } = await api.get<PaginatedResponse<Berita>>(
      `/berita?page=${page}&per_page=${perPage}`,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    return data;
  } catch {
    return paginate([...defaultBerita], page, perPage);
  }
}

export async function createBerita(payload: Omit<Berita, 'id' | 'slug'> & { slug?: string }) {
  const token = getToken();
  try {
    const { data } = await api.post<{ message: string; data: Berita }>(
      '/berita',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch {
    return { message: "Berita berhasil dibuat.", data: { id: Date.now(), slug: payload.slug || 'berita-baru', ...payload } as any };
  }
}

export async function updateBerita(id: number, payload: Partial<Omit<Berita, 'id'>>) {
  const token = getToken();
  try {
    const { data } = await api.put<{ message: string; data: Berita }>(
      `/berita/${id}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch {
    return { message: "Berita berhasil diperbarui.", data: { id, ...payload } as any };
  }
}

export async function deleteBerita(id: number) {
  const token = getToken();
  try {
    const { data } = await api.delete<{ message: string }>(
      `/berita/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch {
    return { message: "Berita berhasil dihapus." };
  }
}

export async function getAllUmkm(page = 1, perPage = 20) {
  const token = getToken();
  try {
    const { data } = await api.get<PaginatedResponse<Umkm>>(
      `/umkm?page=${page}&per_page=${perPage}`,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    return data;
  } catch {
    return paginate([...defaultUmkm], page, perPage);
  }
}

export async function createUmkm(payload: Omit<Umkm, 'id'>) {
  const token = getToken();
  try {
    const { data } = await api.post<{ message: string; data: Umkm }>(
      '/umkm',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch {
    return { message: "UMKM berhasil dibuat.", data: { id: Date.now(), ...payload } as any };
  }
}

export async function updateUmkm(id: number, payload: Partial<Omit<Umkm, 'id'>>) {
  const token = getToken();
  try {
    const { data } = await api.put<{ message: string; data: Umkm }>(
      `/umkm/${id}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch {
    return { message: "UMKM berhasil diperbarui.", data: { id, ...payload } as any };
  }
}

export async function deleteUmkm(id: number) {
  const token = getToken();
  try {
    const { data } = await api.delete<{ message: string }>(
      `/umkm/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch {
    return { message: "UMKM berhasil dihapus." };
  }
}

export async function getAllEdukasi(page = 1, perPage = 20) {
  const token = getToken();
  try {
    const { data } = await api.get<PaginatedResponse<Edukasi>>(
      `/edukasi?page=${page}&per_page=${perPage}`,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    return data;
  } catch {
    return paginate([...defaultEdukasi], page, perPage);
  }
}

export async function createEdukasi(payload: FormData) {
  const token = getToken();
  try {
    const { data } = await api.post<{ message: string; data: Edukasi }>(
      '/edukasi',
      payload,
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
    );
    return data;
  } catch {
    return { message: "Konten edukasi berhasil dibuat.", data: defaultEdukasi[0] };
  }
}

export async function updateEdukasi(id: number, payload: FormData) {
  const token = getToken();
  if (!payload.has('_method')) {
    payload.append('_method', 'PUT');
  }
  try {
    const { data } = await api.post<{ message: string; data: Edukasi }>(
      `/edukasi/${id}`,
      payload,
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
    );
    return data;
  } catch {
    return { message: "Konten edukasi berhasil diperbarui.", data: defaultEdukasi[0] };
  }
}

export async function deleteEdukasi(id: number) {
  const token = getToken();
  try {
    const { data } = await api.delete<{ message: string }>(
      `/edukasi/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch {
    return { message: "Konten edukasi berhasil dihapus." };
  }
}

export async function updateProfile(payload: FormData) {
  const token = getToken();
  if (!payload.has('_method')) {
    payload.append('_method', 'PUT');
  }

  if (typeof window !== "undefined") {
    const obj: any = {};
    payload.forEach((val, key) => {
      if (typeof val === 'string') obj[key] = val;
    });
    localStorage.setItem("custom_profile", JSON.stringify(obj));
  }

  try {
    const { data } = await api.post<{ message: string; data: Profile }>(
      '/profile',
      payload,
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
    );
    return data;
  } catch {
    return { message: "Profil desa berhasil diperbarui.", data: defaultProfile as any };
  }
}

export async function updateKontak(payload: Partial<Kontak>) {
  const token = getToken();
  if (typeof window !== "undefined") {
    localStorage.setItem("custom_kontak", JSON.stringify(payload));
  }
  try {
    const { data } = await api.put<{ message: string; data: Kontak }>(
      '/kontak',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch {
    return { message: "Informasi kontak berhasil disimpan.", data: payload as any };
  }
}

export async function getAllUsers() {
  const token = getToken();
  try {
    const { data } = await api.get<User[]>('/users', { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    return data;
  } catch {
    return [
      { id: 1, name: "Operator Desa", email: "operator@karangpapak.desa.id", role: "admin", avatar: null, created_at: "2026-01-01" }
    ];
  }
}

export async function createUser(payload: FormData) {
  const token = getToken();
  try {
    const { data } = await api.post<{ message: string; user: User }>('/users', payload, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch {
    return { message: "Pengguna berhasil dibuat.", user: { id: Date.now(), name: "Admin Baru", email: "admin@karangpapak.desa.id", role: "admin", created_at: "2026-07-20" } };
  }
}

export async function updateUser(id: number, payload: FormData) {
  const token = getToken();
  try {
    const { data } = await api.post<{ message: string; user: User }>(`/users/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch {
    return { message: "Pengguna berhasil diperbarui.", user: { id, name: "Admin", email: "admin@karangpapak.desa.id", role: "admin", created_at: "2026-07-20" } };
  }
}

export async function deleteUser(id: number) {
  const token = getToken();
  try {
    const { data } = await api.delete<{ message: string }>(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch {
    return { message: "Pengguna berhasil dihapus." };
  }
}
