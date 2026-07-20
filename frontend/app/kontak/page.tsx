import { Building2, Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { getKontak } from "@/services/api";

export const metadata = {
  title: "Kontak - Desa Karangpapak",
  description:
    "Temukan alamat, nomor telepon, dan email Kantor Desa Karangpapak.",
};

const LAT = -6.957788658227934;
const LNG = 106.47659653207397;
const DELTA = 0.005;
const OSM_URL = `https://www.openstreetmap.org/export/embed.html?bbox=${LNG - DELTA}%2C${LAT - DELTA}%2C${LNG + DELTA}%2C${LAT + DELTA}&layer=mapnik&marker=${LAT}%2C${LNG}`;

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconYoutube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  );
}

export default async function KontakPage() {
  const kontak = await getKontak();

  const infoItems = [
    {
      label: "Nama Kantor",
      value: kontak?.office_name ?? "Kantor Desa Karangpapak",
      Icon: Building2,
      color: "bg-[#eef4fc] text-[#2c73b9]",
    },
    {
      label: "Alamat Kantor Desa",
      value:
        kontak?.address ??
        "Jl. Raya Karangpapak, Kecamatan Cisolok, Kabupaten Sukabumi, Jawa Barat 43366",
      Icon: MapPin,
      color: "bg-[#fff4dd] text-[#c8861a]",
    },
    {
      label: "Nomor Telepon Kantor",
      value: kontak?.phone ?? "(0266) 421234",
      Icon: Phone,
      color: "bg-[#eef4fc] text-[#2c73b9]",
    },
    {
      label: "Alamat Email Resmi",
      value: kontak?.email ?? "desa.karangpapak@sukabumikab.go.id",
      Icon: Mail,
      color: "bg-[#eef4fc] text-[#2c73b9]",
    },
    {
      label: "Jam Buka Pelayanan",
      value: "Senin – Jumat, 08.00 – 14.00 WIB",
      Icon: Clock,
      color: "bg-[#f5f0ff] text-[#7c3aed]",
    },
  ];

  const socialItems = [
    {
      label: "Facebook",
      value: kontak?.facebook ?? "Desa Karangpapak",
      icon: <IconFacebook />,
      href: "#",
      bg: "bg-[#1877f2]",
    },
    {
      label: "Instagram",
      value: kontak?.instagram ?? "@desa.karangpapak",
      icon: <IconInstagram />,
      href: "#",
      bg: "bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]",
    },
    {
      label: "YouTube",
      value: kontak?.youtube ?? "Desa Karangpapak Official",
      icon: <IconYoutube />,
      href: "#",
      bg: "bg-[#ff0000]",
    },
  ];

  return (
    <div className="bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fc_40%,#ffffff_100%)]">
      <PageHeader
        title="Hubungi Kami"
        description="Dapatkan informasi kontak dan layanan Kantor Desa Karangpapak."
      />


      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.15fr]">
            

            <div className="flex flex-col gap-4">
              <div className="mb-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2c73b9]">
                  Informasi Kontak
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-[#0f2d4a]">
                  Cara menghubungi kami
                </h2>
                <p className="mt-2 text-sm leading-7 text-[#5a6e7f]">
                  Datang langsung ke kantor atau hubungi kami melalui saluran resmi berikut.
                </p>
              </div>

              {infoItems.map(({ label, value, Icon, color }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 rounded-2xl border border-[#d2dfec] bg-white p-5 shadow-[0_4px_16px_rgba(44,115,185,0.05)] transition-all hover:-translate-y-0.5 hover:border-[#a8c3e0] hover:shadow-[0_8px_24px_rgba(44,115,185,0.10)]"
                >
                  <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#718a9e]">
                      {label}
                    </p>
                    <p className="mt-1.5 break-words text-sm font-medium leading-7 text-[#0f2d4a]">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>


            <div className="flex flex-col gap-4">
              <div className="mb-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2c73b9]">
                  Peta Lokasi
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-[#0f2d4a]">
                  Temukan kami di sini
                </h2>
                <p className="mt-2 text-sm leading-7 text-[#5a6e7f]">
                  Lokasi Kantor Desa Karangpapak ditampilkan secara interaktif.
                </p>
              </div>

              <div
                className="w-full rounded-[24px] border border-[#d2dfec] shadow-[0_12px_40px_rgba(44,115,185,0.10)] relative overflow-hidden min-h-[350px] lg:h-full lg:min-h-[450px]"
              >
                <iframe
                  title="Lokasi Kantor Desa Karangpapak"
                  src={OSM_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-[calc(100%+40px)] border-none block"
                />
              </div>
            </div>
          </div>


          <div className="mt-10 rounded-[28px] border border-[#d2dfec] bg-white p-8 shadow-[0_8px_32px_rgba(44,115,185,0.06)] sm:p-10">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2c73b9]">
                  Media Sosial
                </p>
                <h2 className="mt-2 text-xl font-extrabold text-[#0f2d4a]">
                  Ikuti kami di media sosial
                </h2>
              </div>
              <p className="text-sm text-[#5a6e7f]">
                Dapatkan informasi terbaru langsung di feed Anda.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {socialItems.map(({ label, value, icon, href, bg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-[#d2dfec] bg-[#f4f8fc] p-4 transition-all hover:-translate-y-0.5 hover:border-[#a8c3e0] hover:shadow-md"
                >
                  <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${bg} text-white`}>
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#718a9e]">
                      {label}
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-[#0f2d4a] group-hover:text-[#2c73b9]">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
