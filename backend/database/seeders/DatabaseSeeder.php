<?php

namespace Database\Seeders;

use App\Models\Berita;
use App\Models\Edukasi;
use App\Models\Kontak;
use App\Models\Layanan;
use App\Models\Profile;
use App\Models\UMKM;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $admin = User::query()->updateOrCreate(
            ['email' => 'admin@karangpapak.test'],
            [
                'name' => 'Admin Karangpapak',
                'role' => 'admin',
                'password' => 'password',
            ]
        );

        Profile::query()->updateOrCreate(
            ['id' => 1],
            [
                'village_name' => 'Desa Karangpapak',
                'district' => 'Kecamatan Cisolok',
                'regency' => 'Kabupaten Sukabumi',
                'province' => 'Jawa Barat',
                'postal_code' => '43366',
                'address' => 'Jl. Raya Karangpapak, Kecamatan Cisolok, Kabupaten Sukabumi, Jawa Barat',
                'description' => 'Portal resmi Desa Karangpapak sebagai pusat informasi publik, layanan administrasi, promosi UMKM desa, dan edukasi masyarakat.',
                'vision' => 'Terwujudnya Desa Karangpapak yang maju, mandiri, transparan, dan berdaya saing dengan pelayanan publik yang cepat dan ramah.',
                'mission' => 'Meningkatkan kualitas pelayanan administrasi, memperkuat partisipasi masyarakat, mengembangkan ekonomi desa berbasis UMKM, dan mendorong keterbukaan informasi publik.',
                'history' => "Desa Karangpapak merupakan kawasan pesisir di selatan Kabupaten Sukabumi yang tumbuh dari perpaduan sektor pertanian, kelautan, dan perdagangan lokal sejak masa lampau. Didorong oleh semangat gotong royong yang kuat, masyarakat bahu-membahu membangun pemukiman yang mandiri dan berbudaya. Seiring waktu, tata ruang dan pelayanan administrasi terus berkembang untuk mendukung kesejahteraan warga. Di era modern ini, Pemerintah Desa Karangpapak berkomitmen meningkatkan pelayanan publik berbasis digital, menciptakan keterbukaan informasi, serta mempermudah segala bentuk urusan administrasi secara merata, cepat, dan transparan.",
                'head_name' => 'H. Asep Mulyana',
                'head_title' => 'Kepala Desa Karangpapak',
                'population_total' => 4875,
                'families_total' => 1450,
                'umkm_total' => 38,
                'budget_realization_percent' => 67.5,
                'service_banner_title' => 'Pelayanan Administrasi Lebih Jelas dan Mudah',
                'service_banner_description' => 'Masyarakat dapat melihat informasi persyaratan layanan, berita desa, dan perkembangan pembangunan dengan lebih terbuka melalui website resmi desa.',
            ]
        );

        Kontak::query()->updateOrCreate(
            ['id' => 1],
            [
                'office_name' => 'Kantor Desa Karangpapak',
                'address' => 'Jl. Raya Karangpapak, Kecamatan Cisolok, Kabupaten Sukabumi, Jawa Barat 43366',
                'phone' => '(0266) 421234',
                'email' => 'desa.karangpapak@sukabumikab.go.id',
                'whatsapp' => '0812-3456-7890',
                'facebook' => 'desakarangpapak',
                'instagram' => 'desa.karangpapak',
                'youtube' => 'Desa Karangpapak Official',
                'maps_embed' => 'https://maps.google.com/?q=Karangpapak+Cisolok+Sukabumi',
            ]
        );

        $layanans = [
            [
                'slug' => 'surat-pengantar-ktp-kk',
                'title' => 'Pengantar KTP/KK',
                'summary' => 'Pelayanan surat pengantar untuk pengurusan KTP baru, perubahan data, atau kartu keluarga.',
                'content' => 'Layanan ini digunakan untuk warga yang memerlukan surat pengantar dari desa sebelum melanjutkan proses administrasi ke kecamatan atau dinas terkait.',
                'requirements' => 'Fotokopi KK, surat pengantar RT/RW, pas foto jika dibutuhkan',
                'service_hours' => 'Senin - Jumat, 08.00 - 14.00 WIB',
                'contact_person' => 'Kasi Pelayanan Umum',
                'sort_order' => 1,
            ],
            [
                'slug' => 'surat-keterangan-domisili',
                'title' => 'Surat Keterangan Domisili',
                'summary' => 'Pelayanan surat domisili untuk kebutuhan sekolah, pekerjaan, usaha, dan administrasi lainnya.',
                'content' => 'Warga dapat mengajukan surat keterangan domisili dengan membawa identitas diri dan surat pengantar lingkungan setempat.',
                'requirements' => 'Fotokopi KTP, KK, surat pengantar RT/RW',
                'service_hours' => 'Senin - Jumat, 08.00 - 14.00 WIB',
                'contact_person' => 'Petugas Front Office Desa',
                'sort_order' => 2,
            ],
            [
                'slug' => 'surat-keterangan-usaha',
                'title' => 'Surat Keterangan Usaha',
                'summary' => 'Pelayanan surat keterangan usaha untuk kebutuhan perizinan, pembiayaan, dan pengembangan UMKM.',
                'content' => 'Surat ini diperuntukkan bagi pelaku usaha desa yang membutuhkan dokumen legal sebagai pelengkap administrasi usaha.',
                'requirements' => 'Fotokopi KTP, KK, foto lokasi usaha',
                'service_hours' => 'Senin - Jumat, 08.00 - 14.00 WIB',
                'contact_person' => 'Kaur Pemerintahan',
                'sort_order' => 3,
            ],
            [
                'slug' => 'surat-keterangan-kelahiran',
                'title' => 'Surat Keterangan Kelahiran',
                'summary' => 'Pelayanan surat keterangan kelahiran untuk keperluan administrasi keluarga.',
                'content' => 'Surat ini diterbitkan berdasarkan laporan keluarga dan bukti pendukung dari fasilitas kesehatan atau bidan desa.',
                'requirements' => 'Fotokopi KK, KTP orang tua, surat keterangan lahir',
                'service_hours' => 'Senin - Jumat, 08.00 - 14.00 WIB',
                'contact_person' => 'Petugas Registrasi Desa',
                'sort_order' => 4,
            ],
        ];

        foreach ($layanans as $layanan) {
            Layanan::query()->updateOrCreate(
                ['slug' => $layanan['slug']],
                [
                    'user_id' => $admin->id,
                    'title' => $layanan['title'],
                    'summary' => $layanan['summary'],
                    'content' => $layanan['content'],
                    'requirements' => $layanan['requirements'],
                    'service_hours' => $layanan['service_hours'],
                    'contact_person' => $layanan['contact_person'],
                    'sort_order' => $layanan['sort_order'],
                    'is_published' => true,
                ]
            );
        }

        $beritas = [
            [
                'slug' => 'musyawarah-rencana-pembangunan-desa-2026',
                'title' => 'Musyawarah Rencana Pembangunan Desa Tahun 2026',
                'excerpt' => 'Pemerintah desa bersama BPD dan tokoh masyarakat menyusun prioritas pembangunan tahun 2026.',
                'content' => 'Musyawarah desa dilaksanakan di aula kantor desa dengan membahas prioritas pembangunan infrastruktur lingkungan, peningkatan layanan administrasi, serta pemberdayaan ekonomi masyarakat melalui program UMKM dan pelatihan keterampilan warga.',
                'published_at' => now()->subDays(5),
            ],
            [
                'slug' => 'jadwal-penyaluran-bantuan-pangan-juli-2026',
                'title' => 'Jadwal Penyaluran Bantuan Pangan Juli 2026',
                'excerpt' => 'Pemerintah desa mengumumkan jadwal penyaluran bantuan pangan untuk keluarga penerima manfaat.',
                'content' => 'Penyaluran bantuan pangan bulan Juli dilaksanakan secara bertahap di balai desa dengan tetap memperhatikan tertib administrasi dan jadwal masing-masing dusun.',
                'published_at' => now()->subDays(4),
            ],
            [
                'slug' => 'pelatihan-umkm-pemasaran-digital',
                'title' => 'Pelatihan UMKM tentang Pemasaran Digital',
                'excerpt' => 'Pelaku UMKM desa mendapatkan pelatihan pemasaran digital untuk memperluas pasar produk lokal.',
                'content' => 'Melalui pelatihan ini, pelaku UMKM dikenalkan pada strategi promosi sederhana menggunakan media sosial, marketplace, dan katalog digital agar usaha lokal semakin berkembang.',
                'published_at' => now()->subDays(3),
            ],
            [
                'slug' => 'kerja-bakti-lingkungan-bersih',
                'title' => 'Kerja Bakti Lingkungan Bersih Bersama Warga',
                'excerpt' => 'Warga bersama pemerintah desa melakukan kerja bakti membersihkan saluran air dan fasilitas umum.',
                'content' => 'Kegiatan kerja bakti dilaksanakan untuk menjaga kebersihan lingkungan, mencegah genangan, serta memperkuat semangat gotong royong di tengah masyarakat.',
                'published_at' => now()->subDays(2),
            ],
            [
                'slug' => 'website-desa-resmi-diluncurkan',
                'title' => 'Website Resmi Desa Karangpapak Diluncurkan',
                'excerpt' => 'Website desa hadir untuk memperluas akses informasi publik dan pelayanan digital masyarakat.',
                'content' => 'Peluncuran website desa menjadi langkah penting dalam meningkatkan keterbukaan informasi, pelayanan masyarakat, promosi UMKM, dan penyampaian informasi pembangunan desa secara cepat.',
                'published_at' => now()->subDay(),
            ],
        ];

        foreach ($beritas as $berita) {
            Berita::query()->updateOrCreate(
                ['slug' => $berita['slug']],
                [
                    'user_id' => $admin->id,
                    'title' => $berita['title'],
                    'excerpt' => $berita['excerpt'],
                    'content' => $berita['content'],
                    'published_at' => $berita['published_at'],
                    'is_published' => true,
                ]
            );
        }

        $umkms = [
            [
                'slug' => 'kopi-karangpapak',
                'name' => 'Kopi Karangpapak',
                'owner_name' => 'Budi Santoso',
                'category' => 'Makanan dan Minuman',
                'description' => 'Produk kopi lokal hasil olahan warga dengan cita rasa khas pesisir selatan Sukabumi.',
                'address' => 'Dusun Karangpapak Tengah',
                'phone' => '0812-9876-5432',
                'whatsapp' => '0812-9876-5432',
                'is_featured' => true,
            ],
            [
                'slug' => 'kripik-pisang-mekar-jaya',
                'name' => 'Kripik Pisang Mekar Jaya',
                'owner_name' => 'Ibu Nani Rohayati',
                'category' => 'Oleh-oleh',
                'description' => 'Kripik pisang aneka rasa yang diproduksi oleh kelompok usaha ibu rumah tangga desa.',
                'address' => 'Dusun Pasar Kidul',
                'phone' => '0813-2222-3344',
                'whatsapp' => '0813-2222-3344',
                'is_featured' => true,
            ],
            [
                'slug' => 'kerajinan-bambu-sinergi',
                'name' => 'Kerajinan Bambu Sinergi',
                'owner_name' => 'Ujang Suryana',
                'category' => 'Kerajinan',
                'description' => 'Kerajinan rumah tangga berbahan bambu seperti rak, tempat buah, dan hiasan interior.',
                'address' => 'Dusun Leuweung Sari',
                'phone' => '0821-1111-8899',
                'whatsapp' => '0821-1111-8899',
                'is_featured' => false,
            ],
            [
                'slug' => 'olahan-ikan-laut-sari-bahari',
                'name' => 'Olahan Ikan Laut Sari Bahari',
                'owner_name' => 'Asep Supriyadi',
                'category' => 'Perikanan',
                'description' => 'Usaha olahan hasil laut seperti abon ikan, ikan asap, dan kerupuk ikan.',
                'address' => 'Dusun Pesisir Bahari',
                'phone' => '0812-1111-8899',
                'whatsapp' => '0812-1111-8899',
                'is_featured' => false,
            ],
        ];

        foreach ($umkms as $umkm) {
            UMKM::query()->updateOrCreate(
                ['slug' => $umkm['slug']],
                [
                    'user_id' => $admin->id,
                    'name' => $umkm['name'],
                    'owner_name' => $umkm['owner_name'],
                    'category' => $umkm['category'],
                    'description' => $umkm['description'],
                    'address' => $umkm['address'],
                    'phone' => $umkm['phone'],
                    'whatsapp' => $umkm['whatsapp'],
                    'is_featured' => $umkm['is_featured'],
                    'is_published' => true,
                ]
            );
        }

        $edukasis = [
            [
                'slug' => 'intervensi-pencegahan-stunting',
                'title' => 'Intervensi Pencegahan Stunting Warga Desa',
                'category' => 'stunting-gizi',
                'excerpt' => 'Panduan lengkap pencegahan stunting berbasis pemanfaatan bahan pangan lokal terjangkau.',
                'content' => 'Stunting dapat dicegah secara efektif sejak 1000 Hari Pertama Kehidupan (HPK). Pemenuhan nutrisi protein hewani (telur, ikan laut segar Karangpapak, daging) dan pemeriksaan rutin di Posyandu menjadi kunci utama tumbuh kembang optimal balita.',
            ],
            [
                'slug' => 'gizi-ibu-hamil-1000-hpk',
                'title' => 'Gizi Ibu Hamil & 1000 Hari Pertama Kehidupan',
                'category' => 'stunting-gizi',
                'excerpt' => 'Nutrisi seimbang dan tablet tambah darah untuk kesehatan ibu hamil serta calon bayi.',
                'content' => 'Selama masa kehamilan, ibu memerlukan asupan zat besi, asam folat, dan kalsium yang cukup. Rutin mengonsumsi Makanan Tambahan (PMT) serta memeriksakan kehamilan ke Posyandu / Puskesmas Cisolok sangat penting demi mencegah resiko stunting.',
            ],
            [
                'slug' => 'resep-mpasi-bahan-lokal',
                'title' => 'Resep MPASI Bergizi Berbahan Pangan Lokal',
                'category' => 'stunting-gizi',
                'excerpt' => 'Panduan membuat MPASI kaya nutrisi dari hasil tani dan perikanan lokal Desa Karangpapak.',
                'content' => 'Pengenalan Makanan Pendamping ASI (MPASI) dimulai pada usia 6 bulan. Gunakan kombinasi bahan pangan lokal segar seperti beras merah, olahan ikan tenggiri/kembung, telur, dan sayuran hijau lokal yang mudah didapatkan dan kaya gizi.',
            ],
            [
                'slug' => 'tips-keamanan-digital',
                'title' => 'Tips Keamanan Digital untuk Warga',
                'category' => 'literasi-digital',
                'excerpt' => 'Langkah sederhana menjaga keamanan akun dan data pribadi saat menggunakan internet.',
                'content' => 'Gunakan kata sandi yang kuat, aktifkan verifikasi dua langkah, hindari membagikan kode OTP, dan selalu cek ulang informasi sebelum mengklik tautan dari sumber yang tidak dikenal.',
            ],
            [
                'slug' => 'bijak-bermedia-sosial',
                'title' => 'Bijak Bermedia Sosial',
                'category' => 'literasi-digital',
                'excerpt' => 'Panduan singkat agar masyarakat lebih bijak dalam menggunakan media sosial.',
                'content' => 'Selalu periksa kebenaran informasi, hindari menyebarkan hoaks, dan gunakan media sosial untuk hal-hal yang bermanfaat bagi diri sendiri maupun lingkungan.',
            ],
            [
                'slug' => 'pengelolaan-sampah-rumah-tangga',
                'title' => 'Pengelolaan Sampah Rumah Tangga',
                'category' => 'lingkungan-sehat',
                'excerpt' => 'Panduan memilah sampah dan menjaga lingkungan tetap bersih di tingkat rumah tangga.',
                'content' => 'Warga dianjurkan memisahkan sampah organik dan anorganik, memanfaatkan komposter sederhana, serta mengurangi pembakaran sampah terbuka demi kesehatan lingkungan.',
            ],
            [
                'slug' => 'pencegahan-demam-berdarah',
                'title' => 'Pencegahan Demam Berdarah',
                'category' => 'lingkungan-sehat',
                'excerpt' => 'Langkah sederhana untuk mencegah berkembangnya nyamuk penyebab demam berdarah.',
                'content' => 'Lakukan 3M Plus secara rutin, bersihkan lingkungan sekitar rumah, serta periksa tempat penampungan air secara berkala.',
            ],
            [
                'slug' => 'siaga-cuaca-ekstrem-dan-bencana',
                'title' => 'Siaga Cuaca Ekstrem dan Bencana',
                'category' => 'kesiapsiagaan',
                'excerpt' => 'Poin-poin penting kesiapsiagaan warga menghadapi hujan lebat, longsor, dan banjir.',
                'content' => 'Pastikan saluran air bersih, simpan dokumen penting di tempat aman, siapkan tas siaga keluarga, dan ikuti arahan aparat desa atau relawan saat terjadi keadaan darurat.',
            ],
            [
                'slug' => 'ronda-malam-dan-keamanan-lingkungan',
                'title' => 'Ronda Malam dan Keamanan Lingkungan',
                'category' => 'keamanan',
                'excerpt' => 'Edukasi pentingnya ronda malam dan pelaporan dini untuk menjaga ketertiban lingkungan.',
                'content' => 'Keamanan lingkungan memerlukan partisipasi bersama. Warga diimbau aktif dalam ronda malam, mengenali tamu asing, dan segera melapor jika ada aktivitas yang mencurigakan.',
            ],
        ];

        foreach ($edukasis as $edukasi) {
            Edukasi::query()->updateOrCreate(
                ['slug' => $edukasi['slug']],
                [
                    'user_id' => $admin->id,
                    'title' => $edukasi['title'],
                    'category' => $edukasi['category'],
                    'excerpt' => $edukasi['excerpt'],
                    'content' => $edukasi['content'],
                    'is_published' => true,
                ]
            );
        }
    }
}
