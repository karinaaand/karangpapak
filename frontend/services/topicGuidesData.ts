export interface TopicGuide {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  overview: string;
  definitionTitle: string;
  definitionDesc: string;
  dailyNeedsTitle: string;
  dailyNeedsSubtitle: string;
  dailyNeeds: {
    stage: string;
    items: string[];
  }[];
  fluidsAndSupplements: string[];
  nutrientsTitle: string;
  nutrientsSubtitle: string;
  nutrientStages: {
    title: string;
    nutrients: {
      name: string;
      function: string;
      sources: string;
    }[];
  }[];
  menuTitle: string;
  menuSubtitle: string;
  menus: {
    stage: string;
    items: {
      time: string;
      menu: string;
    }[];
  }[];
  impactTitle: string;
  impactSubtitle: string;
  impacts: {
    target: string;
    iconType: string;
    points: string[];
  }[];
  videoTitle: string;
  videoDesc: string;
  videoUrl?: string;
  references: {
    name: string;
    org: string;
    desc: string;
    url: string;
  }[];
}

export const TOPIC_GUIDES_DATA: Record<string, TopicGuide> = {
  "gizi-ibu-hamil": {
    id: "gizi-ibu-hamil",
    title: "Gizi Ibu Hamil",
    badge: "Nutrisi untuk Ibu & Janin",
    subtitle: "Pemenuhan gizi seimbang selama kehamilan untuk mendukung pertumbuhan janin dan kesehatan ibu",
    overview: "Pemenuhan gizi seimbang selama kehamilan sangat vital untuk mencegah stunting sejak janin dalam kandungan.",
    definitionTitle: "Apa itu Gizi Ibu Hamil?",
    definitionDesc: "Pemenuhan makanan dan minuman yang cukup, seimbang, dan bergizi selama masa kehamilan untuk menjaga kesehatan ibu serta mendukung pertumbuhan dan perkembangan janin. Ibu hamil dianjurkan mengonsumsi makanan beragam dan rutin mengonsumsi Tablet Tambah Darah (TTD).",
    dailyNeedsTitle: "Kebutuhan Makan Harian per Trimester",
    dailyNeedsSubtitle: "Porsi makan bertambah sesuai perkembangan janin",
    dailyNeeds: [
      {
        stage: "Trimester 1 (0–12 minggu)",
        items: [
          "Makanan pokok: 5 porsi",
          "Protein hewani: 4 porsi",
          "Protein nabati: 4 porsi",
          "Sayur & Buah: 4 porsi",
        ],
      },
      {
        stage: "Trimester 2 & 3 (13–40 minggu)",
        items: [
          "Makanan pokok: 6 porsi",
          "Protein hewani: 4 porsi",
          "Protein nabati: 4 porsi",
          "Sayur & Buah: 4 porsi",
        ],
      },
    ],
    fluidsAndSupplements: [
      "Air putih: 8–12 gelas/hari",
      "Tablet Tambah Darah (TTD): 1 tablet/hari (minimal 90 tablet selama hamil)",
      "Pola makan: 3× makan utama + 3× selingan sehat",
    ],
    nutrientsTitle: "Nutrisi Penting per Tahap Kehamilan",
    nutrientsSubtitle: "Detail kandungan gizi yang dibutuhkan sesuai usia kehamilan",
    nutrientStages: [
      {
        title: "Bulan 1–3 Kehamilan — Pembentukan Otak & Organ Bayi",
        nutrients: [
          { name: "Asam Folat", function: "Pembentukan otak & sistem saraf janin", sources: "Sayuran hijau, tempe, tahu, telur" },
          { name: "Lemak Sehat (Omega-3)", function: "Membantu perkembangan otak dan saraf bayi", sources: "Ikan laut (kembung, gabus), telur" },
          { name: "Vitamin D", function: "Membantu penyerapan kalsium", sources: "Ikan salmon, susu, kuning telur, sinar matahari" },
          { name: "Vitamin B12", function: "Membantu pembentukan sel-sel bayi", sources: "Telur, susu, tempe, tahu, daging" },
        ],
      },
      {
        title: "Bulan 4–6 Kehamilan — Pembentukan Tulang, Gigi & Darah Bayi",
        nutrients: [
          { name: "Kalsium", function: "Pembentukan tulang & gigi janin", sources: "Susu, yoghurt, bayam, jeruk, teri" },
          { name: "Zat Besi", function: "Mencegah anemia (kurang darah) pada ibu dan bayi", sources: "Sayuran hijau, daging sapi, hati ayam/sapi, ikan, kacang" },
          { name: "Vitamin A", function: "Kesehatan mata, kulit, dan daya tahan tubuh", sources: "Wortel, telur bebek/ayam, buah kuning-merah" },
        ],
      },
      {
        title: "Bulan 7–9 Kehamilan — Persiapan Persalinan & Daya Tahan Tubuh",
        nutrients: [
          { name: "Vitamin C", function: "Membantu penyerapan zat besi", sources: "Jambu biji, jeruk, pepaya, nanas, tomat" },
          { name: "Seng (Zn)", function: "Imunitas & metabolisme pertumbuhan", sources: "Telur, ikan, hati sapi, daging sapi, kacang-kacangan" },
          { name: "Iodium", function: "Fungsi otak & sistem kelenjar", sources: "Garam beryodium, ikan laut, udang" },
          { name: "Serat", function: "Memperlancar pencernaan & cegah sembelit", sources: "Sayuran hijau, buah-buahan, kacang" },
          { name: "Vitamin B6", function: "Membantu kerja otak & pembentukan antibodi", sources: "Kacang-kacangan, hati, pisang" },
        ],
      },
    ],
    menuTitle: "Contoh Menu Harian Seimbang",
    menuSubtitle: "3× makan utama + 3× selingan sehat",
    menus: [
      {
        stage: "Menu Trimester 1",
        items: [
          { time: "Pagi", menu: "Nasi, Pepes Ikan Pindang, Tempe Ungkep, Tumis Buncis Tauge, Pepaya" },
          { time: "Selingan Pagi", menu: "Sup Jagung Telur" },
          { time: "Siang", menu: "Nasi, Ayam Bakar, Tahu Fantasi, Sayur Bening Bayam, Pisang" },
          { time: "Selingan Siang", menu: "Bubur Kacang Hijau" },
          { time: "Malam", menu: "Nasi, Telur Bacem, Perkedel Tempe, Tumis Kangkung, Melon" },
          { time: "Selingan Malam", menu: "Puding Buah Segar" },
        ],
      },
      {
        stage: "Menu Trimester 2",
        items: [
          { time: "Pagi", menu: "Nasi, Pesmol Ikan Kembung, Oseng Tahu, Tumis Kacang Panjang, Buah Naga" },
          { time: "Selingan Pagi", menu: "Smoothies Pisang Susu" },
          { time: "Siang", menu: "Nasi, Tumis Hati Ayam, Sate Lilit Tempe, Sayur Sop, Jeruk" },
          { time: "Selingan Siang", menu: "Nagasari Pisang" },
          { time: "Malam", menu: "Nasi, Garang Asam Ayam, Tempe Bacem, Capcay, Pepaya" },
          { time: "Selingan Malam", menu: "Jasuke (Jagung Susu Keju)" },
        ],
      },
      {
        stage: "Menu Trimester 3",
        items: [
          { time: "Pagi", menu: "Nasi, Telur Ayam Bumbu Kuning, Oseng Tempe, Tumis Jamur Tiram, Pisang" },
          { time: "Selingan Pagi", menu: "Getuk Singkong Kukus" },
          { time: "Siang", menu: "Nasi, Opor Ayam, Pepes Tempe, Sayur Bening Oyong, Buah Pir" },
          { time: "Selingan Siang", menu: "Puding Susu Buah" },
          { time: "Malam", menu: "Nasi, Otak-Otak Ikan Gabus, Tahu Ungkep, Tumis Labu Siam, Apel" },
          { time: "Selingan Malam", menu: "Ubi Cilembu Oven" },
        ],
      },
    ],
    impactTitle: "Dampak Kekurangan Gizi",
    impactSubtitle: "Risiko jika kebutuhan nutrisi ibu hamil tidak terpenuhi",
    impacts: [
      {
        target: "Dampak pada Ibu",
        iconType: "mother",
        points: [
          "Mudah lelah, lemas, dan pusing berlebihan",
          "Risiko anemia (kurang darah) meningkat pesat",
          "Daya tahan tubuh menurun dan rentan infeksi",
          "Risiko pendarahan & komplikasi saat melahirkan",
        ],
      },
      {
        target: "Dampak pada Janin",
        iconType: "baby",
        points: [
          "Pertumbuhan janin terhambat (IUGR)",
          "Bayi lahir dengan berat badan lahir rendah (BBLR < 2,5 kg)",
          "Risiko kelahiran prematur",
          "Gangguan perkembangan fungsi otak & saraf",
          "Risiko tinggi mengalami Stunting pada balita",
        ],
      },
    ],
    videoTitle: "Video Edukasi: Panduan Gizi Ibu Hamil",
    videoDesc: "Panduan lengkap kebutuhan gizi selama kehamilan — porsi makan, variasi bahan pangan lokal, dan cara menjaga kesehatan ibu dan bayi dalam kandungan.",
    references: [
      { name: "WHO", org: "World Health Organization", desc: "Panduan global stunting, malnutrisi, dan standar tumbuh kembang anak (WHO Growth Standards)", url: "https://www.who.int" },
      { name: "Kemenkes RI", org: "Kementerian Kesehatan RI", desc: "Portal resmi Kemenkes: data stunting nasional, program gizi, dan kebijakan kesehatan ibu & anak", url: "https://kemkes.go.id" },
      { name: "UNICEF Indonesia", org: "UNICEF Indonesia — Gizi", desc: "Informasi program pencegahan stunting dan gizi anak di Indonesia oleh UNICEF", url: "https://www.unicef.org/indonesia" },
      { name: "Pemerintah RI", org: "Stunting.go.id", desc: "Portal resmi pemerintah RI untuk program intervensi, data, dan edukasi percepatan penurunan stunting", url: "https://stunting.go.id" },
      { name: "Poltekkes Semarang", org: "Poltekkes Kemenkes Semarang", desc: "Institusi pendidikan kesehatan resmi Kemenkes RI — pengembang program gizi & kebidanan", url: "https://poltekkes-smg.ac.id" },
      { name: "Kemenkes RI", org: "Sehat Negeriku", desc: "Blog resmi Kemenkes RI: artikel gizi, stunting, MPASI, dan kesehatan ibu & anak terkini", url: "https://sehatnegeriku.kemkes.go.id" },
    ],
  },
  "gizi-balita-anak": {
    id: "gizi-balita-anak",
    title: "Gizi Balita & Anak",
    badge: "Tumbuh Kembang Optimal",
    subtitle: "Kebutuhan gizi makro & mikro seimbang untuk mendukung perkembangan fisik dan otak anak usia 1-5 tahun",
    overview: "Masa balita adalah periode emas pertumbuhan fisik dan perkembangan otak yang membutuhkan asupan nutrisi seimbang setiap hari.",
    definitionTitle: "Apa itu Gizi Balita & Anak?",
    definitionDesc: "Asupan makanan yang memenuhi kebutuhan energi, protein, lemak, vitamin, dan mineral balita sesuai dengan tahap usianya. Gizi baik pada balita memastikan kekebalan tubuh yang kuat dan mendukung pencegahan stunting.",
    dailyNeedsTitle: "Rekomendasi Porsi Makan Balita",
    dailyNeedsSubtitle: "Disesuaikan dengan kelompok usia anak",
    dailyNeeds: [
      {
        stage: "Usia 1–3 Tahun (Batita)",
        items: [
          "Makanan pokok: 3–4 porsi (nasi/kentang/singkong)",
          "Protein hewani: 2–3 porsi (ikan, telur, ayam, daging)",
          "Protein nabati: 1–2 porsi (tempe, tahu)",
          "Sayur & Buah: 2–3 porsi harian",
        ],
      },
      {
        stage: "Usia 4–5 Tahun (Balita)",
        items: [
          "Makanan pokok: 4–5 porsi",
          "Protein hewani: 3 porsi",
          "Protein nabati: 2 porsi",
          "Sayur & Buah: 3–4 porsi",
        ],
      },
    ],
    fluidsAndSupplements: [
      "Air putih: 5–6 gelas/hari (1–1.5 Liter)",
      "Kapsul Vitamin A: 2x setahun (Februari & Agustus) di Posyandu",
      "Pola makan: 3× makan utama + 2–3× selingan nutrisi",
    ],
    nutrientsTitle: "Nutrisi Kunci Pertumbuhan Balita",
    nutrientsSubtitle: "Zat gizi vital yang wajib ada dalam menu anak",
    nutrientStages: [
      {
        title: "Nutrisi Pertumbuhan Fisik & Otak",
        nutrients: [
          { name: "Protein Hewani", function: "Membangun sel tubuh & jaringan otot anak", sources: "Telur, ikan kembung/lele, daging ayam/sapi, susu" },
          { name: "Zat Besi & Seng", function: "Mencegah anemia & mendukung kecerdasan otak", sources: "Hati ayam, daging merah, bayam, kacang-kacangan" },
          { name: "Kalsium & Vit D", function: "Kepadatan tulang & gigi sehat", sources: "Susu, yoghurt, keju, ikan teri, tempe" },
          { name: "Omega 3 & DHA", function: "Perkembangan kognitif & memori anak", sources: "Ikan laut lokal, telur enriched, minyak ikan" },
        ],
      },
    ],
    menuTitle: "Contoh Variasi Menu Balita Sehat",
    menuSubtitle: "Menu lezat kaya protein hewani",
    menus: [
      {
        stage: "Contoh Menu Sehari Batita (1–3 Tahun)",
        items: [
          { time: "Pagi", menu: "Nasi Tim Ayam Telur, Sup Bening Wortel Oyong, Melon Cut" },
          { time: "Selingan Pagi", menu: "Puding Susu Buah" },
          { time: "Siang", menu: "Nasi, Pesmol Ikan Lele Tanpa Duri, Tahu Kukus, Sayur Sop" },
          { time: "Selingan Siang", menu: "Pisang Kukus Keju" },
          { time: "Malam", menu: "Nasi, Bola-Bola Daging Sapi, Tumis Buncis Tahu, Jeruk" },
          { time: "Selingan Malam", menu: "Susu Hangat" },
        ],
      },
    ],
    impactTitle: "Dampak Malnutrisi pada Balita",
    impactSubtitle: "Bahaya jika gizi anak tidak terpenuhi",
    impacts: [
      {
        target: "Dampak Jangka Pendek",
        iconType: "baby",
        points: [
          "Anak mudah sakit dan lambat sembuh dari penyakit",
          "Berat badan tidak naik / cenderung menurun di grafik KMS",
          "Anak sering lemas dan kurang aktif bergerak",
        ],
      },
      {
        target: "Dampak Jangka Panjang",
        iconType: "mother",
        points: [
          "Risiko Stunting (tinggi badan kurang dari standar usianya)",
          "Kemampuan kognitif dan prestasi belajar menurun",
          "Risiko penyakit tidak menular saat dewasa",
        ],
      },
    ],
    videoTitle: "Video Edukasi: Gizi Seimbang Balita",
    videoDesc: "Panduan praktis menyiapkan piring gizi seimbang untuk balita menggunakan bahan pangan lokal terjangkau.",
    references: [
      { name: "WHO", org: "World Health Organization", desc: "Panduan global stunting, malnutrisi, dan standar tumbuh kembang anak (WHO Growth Standards)", url: "https://www.who.int" },
      { name: "Kemenkes RI", org: "Kementerian Kesehatan RI", desc: "Portal resmi Kemenkes: data stunting nasional, program gizi, dan kebijakan kesehatan ibu & anak", url: "https://kemkes.go.id" },
      { name: "UNICEF Indonesia", org: "UNICEF Indonesia — Gizi", desc: "Informasi program pencegahan stunting dan gizi anak di Indonesia oleh UNICEF", url: "https://www.unicef.org/indonesia" },
      { name: "Pemerintah RI", org: "Stunting.go.id", desc: "Portal resmi pemerintah RI untuk program intervensi, data, dan edukasi percepatan penurunan stunting", url: "https://stunting.go.id" },
    ],
  },
  "mpasi-resep": {
    id: "mpasi-resep",
    title: "MPASI & Resep Gizi",
    badge: "Panduan Makanan Pendamping ASI",
    subtitle: "Tekstur, frekuensi, dan resep MPASI bergizi tinggi kaya protein hewani untuk usia 6-24 bulan",
    overview: "MPASI (Makanan Pendamping ASI) dimulai tepat saat bayi berusia 6 bulan untuk melengkapi kebutuhan gizi yang tidak lagi tercukupi dari ASI saja.",
    definitionTitle: "Apa itu MPASI?",
    definitionDesc: "Makanan bergizi yang diberikan kepada bayi mulai usia 6 bulan secara bertahap dalam tekstur, porsi, dan variasi, sembari melanjutkan pemberian ASI hingga usia 2 tahun.",
    dailyNeedsTitle: "Tahapan Pemberian MPASI Sesuai Usia",
    dailyNeedsSubtitle: "Tekstur & porsi bertahap",
    dailyNeeds: [
      {
        stage: "Usia 6–8 Bulan",
        items: [
          "Tekstur: Saring / Puree lembut (halus dan kental)",
          "Frekuensi: 2–3x makan utama + 1–2x selingan",
          "Porsi: 2–3 sendok makan bertahap hingga 1/2 mangkuk kecil (125 ml)",
        ],
      },
      {
        stage: "Usia 9–11 Bulan",
        items: [
          "Tekstur: Cincang halus / Lembut (masakan dicincang/ditumbuk)",
          "Frekuensi: 3–4x makan utama + 1–2x selingan",
          "Porsi: 1/2 hingga 3/4 mangkuk kecil (125–200 ml)",
        ],
      },
      {
        stage: "Usia 12–24 Bulan",
        items: [
          "Tekstur: Makanan keluarga (dipotong kecil-kecil bila perlu)",
          "Frekuensi: 3–4x makan utama + 1–2x selingan",
          "Porsi: 3/4 hingga 1 mangkuk penuh (200–250 ml)",
        ],
      },
    ],
    fluidsAndSupplements: [
      "Tetap lanjutkan pemberian ASI sedendaknya (demand)",
      "Utamakan Protein Hewani (Telur, Daging, Ikan, Hati Ayam) di setiap mangkuk MPASI",
      "Gunakan lemak tambahan (minyak kelapa, mentega, atau santan) untuk penambah kalori",
    ],
    nutrientsTitle: "Komposisi Utama Mangkuk MPASI Bergizi",
    nutrientsSubtitle: "4 Bintang MPASI Berkualitas",
    nutrientStages: [
      {
        title: "Prinsip 4 Bintang MPASI",
        nutrients: [
          { name: "Karbohidrat", function: "Sumber energi utama aktivitas bayi", sources: "Beras putih/merah, kentang, ubi, kabocha" },
          { name: "Protein Hewani (Kunci)", function: "Mencegah stunting & mendukung pertumbuhan otak", sources: "Hati ayam, telur, ikan kembung, daging sapi" },
          { name: "Protein Nabati", function: "Pengenal rasa & serat pendamping", sources: "Tempe, tahu, kacang hijau" },
          { name: "Sayur & Lemak Tambahan", function: "Vitamin & booster BB balita", sources: "Bayam, wortel, minyak goreng/kelapa, santan" },
        ],
      },
    ],
    menuTitle: "Resep Contoh MPASI Kaya Protein Hewani",
    menuSubtitle: "Bahan pangan lokal terjangkau Desa Karangpapak",
    menus: [
      {
        stage: "Resep Tim Puree Hati Ayam & Telur (6-8 Bulan)",
        items: [
          { time: "Bahan Utama", menu: "Nasi putih 2 sdm, Hati ayam 1 potong, Telur 1/2 butir, Santan 1 sdm, Bayam 5 lembar" },
          { time: "Cara Masak", menu: "Rebus nasi, hati ayam, dan bayam hingga lembut. Tambahkan santan & telur kocok. Saring halus." },
        ],
      },
      {
        stage: "Resep Nasi Tim Pesmol Ikan Kembung (9-11 Bulan)",
        items: [
          { time: "Bahan Utama", menu: "Beras 3 sdm, Daging ikan kembung suwir 30g, Tahu 1/2 potong, Wortel parut 1 sdm, Minyak 1 tsp" },
          { time: "Cara Masak", menu: "Tumis bumbu halus dengan minyak, masukkan ikan, tahu, wortel & beras. Tim hingga empuk & cincang." },
        ],
      },
    ],
    impactTitle: "Risiko Kesalahan Pemberian MPASI",
    impactSubtitle: "Dampak jika MPASI tidak bergizi atau terlambat diberikan",
    impacts: [
      {
        target: "Pemberian Kurang Tepat",
        iconType: "baby",
        points: [
          "Hanya diberi bubur beras polos / buah saja tanpa protein hewani",
          "Penurunan grafis pertumbuhan berat badan (faltering growth)",
          "Kurang zat besi yang memicu anemia pada bayi",
        ],
      },
    ],
    videoTitle: "Video Tutorial: Membuat MPASI Kaya Protein Hewani",
    videoDesc: "Langkah-langkah praktis membuat MPASI bergizi dari bahan lokal yang mudah didapatkan warga.",
    references: [
      { name: "Kemenkes RI", org: "Kementerian Kesehatan RI", desc: "Buku KIA (Kesehatan Ibu dan Anak) & Panduan MPASI Kemenkes", url: "https://kemkes.go.id" },
      { name: "WHO", org: "World Health Organization", desc: "Infant and Young Child Feeding (IYCF) Guidelines", url: "https://www.who.int" },
    ],
  },
  "pencegahan-stunting": {
    id: "pencegahan-stunting",
    title: "Pencegahan Stunting",
    badge: "Intervensi Penting",
    subtitle: "Langkah konkrit cegah stunting melalui nutrisi, sanitasi, dan pola asuh sejak masa kehamilan",
    overview: "Stunting dapat dicegah dengan 3 pilar utama: perbaikan pola makan, perbaikan pola asuh, dan perbaikan sanitasi serta akses air bersih.",
    definitionTitle: "Apa itu Stunting?",
    definitionDesc: "Stunting adalah kondisi gagal tumbuh pada anak balita akibat kekurangan gizi kronis terutama pada 1.000 Hari Pertama Kehidupan. Anak stunting cenderung lebih pendek dari standar usianya dan mengalami hambatan kecerdasan.",
    dailyNeedsTitle: "3 Pilar Utama Pencegahan Stunting",
    dailyNeedsSubtitle: "Langkah terpadu warga desa",
    dailyNeeds: [
      {
        stage: "1. Pola Makan Bergizi",
        items: [
          "Ibu hamil wajib mengonsumsi TTD dan makanan kaya protein hewani",
          "ASI Eksklusif 6 bulan tanpa makanan/minuman tambahan",
          "MPASI bergizi kaya protein hewani mulai 6 bulan",
        ],
      },
      {
        stage: "2. Pola Asuh Sehat",
        items: [
          "Rutin menimbang balita di Posyandu setiap bulan",
          "Lengkapi imunisasi dasar lengkap balita",
          "Pemantauan tumbuh kembang secara berkala di KMS",
        ],
      },
      {
        stage: "3. Sanitasi & Air Bersih",
        items: [
          "Mencuci tangan dengan sabun dan air mengalir (CTPS)",
          "Menggunakan jamban sehat keluarga (stop buang air sembarangan)",
          "Menjaga kebersihan lingkungan rumah dan sumber air",
        ],
      },
    ],
    fluidsAndSupplements: [
      "Gunakan garam beryodium",
      "Pastikan air minum dimasak hingga mendidih",
      "Bawa balita ke Posyandu setiap bulan untuk pantau grafik tinggi & berat badan",
    ],
    nutrientsTitle: "Intervensi Gizi Spesifik & Sensitif",
    nutrientsSubtitle: "Strategi percepatan penurunan stunting",
    nutrientStages: [
      {
        title: "Intervensi Spesifik (Sektor Kesehatan)",
        nutrients: [
          { name: "Ibu Hamil", function: "Cegah BBLR & anemia", sources: "TTD 90 tablet, PMT Ibu Hamil KEK, Suplementasi" },
          { name: "Bayi 0-6 Bln", function: "Inisiasi Menyusu Dini (IMD)", sources: "ASI Eksklusif 100%" },
          { name: "Balita 6-59 Bln", function: "Cegah Stunting", sources: "MPASI Protein Hewani, Vit A, Imunisasi Lengkap" },
        ],
      },
    ],
    menuTitle: "Aksi Nyata Desa Karangpapak",
    menuSubtitle: "Kegiatan rutin pencegahan stunting di desa",
    menus: [
      {
        stage: "Program Posyandu & Edukasi Desa",
        items: [
          { time: "Posyandu", menu: "Pemeriksaan balita & ibu hamil setiap bulan di posyandu desa" },
          { time: "PMT Desa", menu: "Pemberian Makanan Tambahan berbahan lokal kaya protein hewani" },
        ],
      },
    ],
    impactTitle: "Dampak Bahaya Stunting",
    impactSubtitle: "Dampak jangka panjang bagi masa depan anak",
    impacts: [
      {
        target: "Akibat Stunting",
        iconType: "baby",
        points: [
          "Kecerdasan di bawah rata-rata dan sulit bersaing di sekolah",
          "Daya tahan tubuh lemah dan mudah terserang penyakit infeksi",
          "Risiko diabetes, stroke, dan penyakit jantung saat dewasa",
          "Produktivitas kerja menurun saat dewasa",
        ],
      },
    ],
    videoTitle: "Video Edukasi: Cegah Stunting Itu Penting",
    videoDesc: "Penjelasan lengkap mengenai pencegahan stunting dan pentingnya 1000 Hari Pertama Kehidupan.",
    references: [
      { name: "Pemerintah RI", org: "Stunting.go.id", desc: "Portal resmi pencegahan stunting nasional", url: "https://stunting.go.id" },
      { name: "Kemenkes RI", org: "Kementerian Kesehatan RI", desc: "Kebijakan dan materi edukasi stunting", url: "https://kemkes.go.id" },
    ],
  },
  "1000-hpk": {
    id: "1000-hpk",
    title: "1000 Hari Pertama Kehidupan",
    badge: "Periode Emas",
    subtitle: "Fase krusial sejak janin (270 hari) hingga anak usia 2 tahun (730 hari)",
    overview: "1.000 Hari Pertama Kehidupan (HPK) adalah penentu masa depan anak. Kerusakan organ dan otak akibat gizi buruk pada fase ini bersifat permanen.",
    definitionTitle: "Apa itu 1000 HPK?",
    definitionDesc: "Periode emas yang dimulai dari 270 hari kehamilan (9 bulan) sampai 730 hari pertama setelah bayi lahir (usia 2 tahun). Pada fase ini, 80% organ vital dan sistem otak anak dibentuk.",
    dailyNeedsTitle: "Pembagian Fase 1000 HPK",
    dailyNeedsSubtitle: "270 hari kehamilan + 730 hari pertama lahir",
    dailyNeeds: [
      {
        stage: "Masa Kehamilan (270 Hari)",
        items: [
          "Asupan gizi seimbang bagi ibu hamil",
          "Pemeriksaan kehamilan rutin minimal 6 kali ke bidan/dokter",
          "Konsumsi Tablet Tambah Darah (TTD)",
        ],
      },
      {
        stage: "Bayi Usia 0–6 Bulan (180 Hari)",
        items: [
          "Inisiasi Menyusu Dini (IMD) saat persalinan",
          "Pemberian ASI Eksklusif tanpa cairan/makanan lain",
          "Pemantauan tumbuh kembang di Posyandu",
        ],
      },
      {
        stage: "Anak Usia 6–24 Bulan (550 Hari)",
        items: [
          "Pemberian MPASI bergizi kaya protein hewani",
          "Lanjutkan ASI hingga usia 2 tahun",
          "Imunisasi dasar lengkap dan suplemen Vit A",
        ],
      },
    ],
    fluidsAndSupplements: [
      "Imunisasi dasar lengkap",
      "Kapsul Vitamin A dosis tinggi setiap 6 bulan",
      "Obat cacing untuk anak di atas 1 tahun",
    ],
    nutrientsTitle: "Perkembangan Otak pada 1000 HPK",
    nutrientsSubtitle: "Mengapa periode ini tidak bisa diulang?",
    nutrientStages: [
      {
        title: "Perkembangan Otak & Pertumbuhan",
        nutrients: [
          { name: "Pertumbuhan Otak", function: "80% kapasitas otak manusia dibentuk pada periode 1000 HPK", sources: "ASI, DHA, Omega-3, Protein Hewani" },
          { name: "Kekebalan Tubuh", function: "Sistem imun terbentuk alami melawan infeksi", sources: "ASI Eksklusif, Vitamin & Mineral" },
        ],
      },
    ],
    menuTitle: "Kunci Sukses Mengawal 1000 HPK",
    menuSubtitle: "Langkah orang tua di rumah",
    menus: [
      {
        stage: "Checklist 1000 HPK",
        items: [
          { time: "Hamil", menu: "Nutrisi seimbang, TTD, Periksa kehamilan berkala" },
          { time: "0-6 Bln", menu: "ASI Eksklusif, Kasih sayang & stimulasi" },
          { time: "6-24 Bln", menu: "MPASI Bergizi, Posyandu rutin, Imunisasi" },
        ],
      },
    ],
    impactTitle: "Dampak Terlewatnya Periode 1000 HPK",
    impactSubtitle: "Konsekuensi yang tidak dapat diperbaiki saat dewasa",
    impacts: [
      {
        target: "Dampak Permanen",
        iconType: "baby",
        points: [
          "Tinggi badan anak terhambat permanen (Stunting)",
          "Kapasitas kognitif & kecerdasan anak terbatas",
          "Risiko tinggi penyakit kronis (diabetes, hipertensi) di kemudian hari",
        ],
      },
    ],
    videoTitle: "Video Edukasi: 1000 Hari Pertama Kehidupan",
    videoDesc: "Penjelasan animasi interaktif pentingnya mengawal gizi anak pada 1000 HPK.",
    references: [
      { name: "WHO", org: "World Health Organization", desc: "First 1000 Days of Life Framework", url: "https://www.who.int" },
      { name: "Kemenkes RI", org: "Kementerian Kesehatan RI", desc: "Gerakan 1000 HPK Kemenkes RI", url: "https://kemkes.go.id" },
    ],
  },
  "posyandu-pemantauan": {
    id: "posyandu-pemantauan",
    title: "Posyandu & Pemantauan Tumbuh Kembang",
    badge: "Layanan Kesehatan Desa",
    subtitle: "Jadwal penimbangan, grafik KMS, dan imunisasi berkala untuk mendeteksi dini risiko stunting",
    overview: "Posyandu Desa Karangpapak siap melayani penimbangan rutin, pengukuran tinggi badan, imunisasi, dan konseling gizi bagi seluruh balita dan ibu hamil.",
    definitionTitle: "Apa itu Posyandu?",
    definitionDesc: "Pos Pelayanan Terpadu (Posyandu) adalah wadah pelayanan kesehatan masyarakat dari, oleh, dan untuk warga desa yang didampingi oleh bidan desa dan kader kesehatan.",
    dailyNeedsTitle: "Pelayanan di Posyandu Desa Karangpapak",
    dailyNeedsSubtitle: "5 Langkah Layanan Posyandu",
    dailyNeeds: [
      {
        stage: "5 Langkah Kegiatan Posyandu",
        items: [
          "Langkah 1: Pendaftaran balita & ibu hamil",
          "Langkah 2: Penimbangan berat badan & pengukuran tinggi/panjang badan",
          "Langkah 3: Pencatatan hasil pengukuran pada buku KMS / Kartu Posyandu",
          "Langkah 4: Penyuluhan & konseling gizi oleh kader & bidan desa",
          "Langkah 5: Pelayanan kesehatan (imunisasi, Vit A, obat cacing, & PMT)",
        ],
      },
    ],
    fluidsAndSupplements: [
      "Bawa Buku KIA / KMS setiap kali datang ke Posyandu",
      "Jadwal Posyandu Desa Karangpapak diadakan rutin setiap bulan",
      "Konsultasikan jika grafik berat badan anak tidak naik 2 bulan berturut-turut",
    ],
    nutrientsTitle: "Membaca Grafik KMS (Kartu Menuju Sehat)",
    nutrientsSubtitle: "Pahami pita warna pada KMS balita",
    nutrientStages: [
      {
        title: "Makna Pita Warna Grafik KMS",
        nutrients: [
          { name: "Pita Hijau", function: "Pertumbuhan balita BAIK & NORMAL", sources: "Pertahankan pola makan seimbang" },
          { name: "Pita Kuning (Bawah)", function: "Berat badan KURANG / Waspada Stunting", sources: "Segera konsultasi bidan desa & dapatkan PMT" },
          { name: "Dua Kali Tidak Naik (2T)", function: "Tanda bahaya gangguan pertumbuhan", sources: "Dirujuk ke Puskesmas untuk pemeriksaan medis" },
        ],
      },
    ],
    menuTitle: "Jadwal Imunisasi & Suplemen",
    menuSubtitle: "Perlindungan penyakit pada anak",
    menus: [
      {
        stage: "Jadwal Rutin Posyandu",
        items: [
          { time: "Februari & Agustus", menu: "Pemberian Kapsul Vitamin A (Biru untuk 6-11 bln, Merah untuk 12-59 bln)" },
          { time: "Setiap Bulan", menu: "Penimbangan, Pengukuran Tinggi Badan, & PMT Penyuluhan" },
        ],
      },
    ],
    impactTitle: "Manfaat Rutin ke Posyandu",
    impactSubtitle: "Mengapa tidak boleh absen Posyandu?",
    impacts: [
      {
        target: "Manfaat Posyandu",
        iconType: "mother",
        points: [
          "Deteksi dini adanya gangguan pertumbuhan / gejala awal stunting",
          "Mendapatkan makanan tambahan (PMT) bergizi gratis",
          "Mendapatkan edukasi & konsultasi gizi langsung dari bidan desa",
          "Mendapatkan imunisasi lengkap untuk mencegah berbagai penyakit berbahaya",
        ],
      },
    ],
    videoTitle: "Video Edukasi: Pentingnya Datang ke Posyandu",
    videoDesc: "Panduan memantau tumbuh kembang balita secara mandiri dan peran penting kader Posyandu desa.",
    references: [
      { name: "Kemenkes RI", org: "Kementerian Kesehatan RI", desc: "Panduan Posyandu & Buku KIA Kemenkes", url: "https://kemkes.go.id" },
      { name: "Pemerintah RI", org: "Stunting.go.id", desc: "Portal resmi percepatan penurunan stunting", url: "https://stunting.go.id" },
    ],
  },
};
