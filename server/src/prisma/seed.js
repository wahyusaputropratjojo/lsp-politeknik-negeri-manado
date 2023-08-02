import { PrismaClient } from "@prisma/client";

import {
  getProvinsi,
  getKabupaten,
  getKecamatan,
  getDesa,
} from "./data-seeding/indonesiaAreadata.js";

import { tempatUjiKompetensi } from "./data-seeding/tempatUjiKompetensi.js";
import { skemaSertifikasi } from "./data-seeding/skemaSertifikasi.js";
import { persyaratanDasar } from "./data-seeding/persyaratanDasar.js";
import {
  userAsAdministrator,
  administrator,
} from "./data-seeding/administrator.js";
import { userAsAsesor, asesor } from "./data-seeding/asesor.js";
import { tujuanAsesmen } from "./data-seeding/tujuanAsesmen.js";
import { unitKompetensiMemasangDanMerakitPHB } from "./data-seeding/unitKompetensi.js";
import {
  aktivitasUnitKompetensi101,
  aktivitasUnitKompetensi102,
  aktivitasUnitKompetensi103,
  aktivitasUnitKompetensi104,
  aktivitasUnitKompetensi105,
  aktivitasUnitKompetensi106,
  aktivitasUnitKompetensi107,
  aktivitasUnitKompetensi108,
  aktivitasUnitKompetensi109,
  aktivitasUnitKompetensi110,
  aktivitasUnitKompetensi111,
  aktivitasUnitKompetensi112,
  aktivitasUnitKompetensi113,
} from "./data-seeding/aktivitasUnitKompetensi.js";

import { kriteriaUnjukKerja } from "./data-seeding/kriteriaUnjukKerja.js";

import { tugasPraktikDemonstrasi } from "./data-seeding/tugas-praktik-demonstrasi/tugasPraktikDemonstrasi.js";
import { langkahKerjaTugasPraktikDemonstrasi } from "./data-seeding/tugas-praktik-demonstrasi/langkahKerjaTugasPraktikDemonstrasi.js";
import { instruksiKerjaTugasPraktikDemonstrasi } from "./data-seeding/tugas-praktik-demonstrasi/instruksiKerjaTugasPraktikDemonstrasi.js";

import { pertanyaanTertulisEsai } from "./data-seeding/pertanyaan-tertulis-esai/pertanyaanTertulisEsai.js";

import { pertanyaanTertulisPilihanGanda } from "./data-seeding/pertanyaan-tertulis-pilihan-ganda/pertanyaanTertulisPilihanGanda.js";
import { jawabanPertanyaanTertulisPilihanGanda } from "./data-seeding/pertanyaan-tertulis-pilihan-ganda/jawabanPertanyaanTertulisPilihanGanda.js";

import { pertanyaanLisan } from "./data-seeding/pertanyaan-lisan/pertanyaanLisan.js";
import { pertanyaanObservasi } from "./data-seeding/pertanyaan-observasi/pertanyaanObservasi.js";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.provinsi.createMany({
    data: await getProvinsi(),
    skipDuplicates: true,
  });

  await prisma.kabupaten.createMany({
    data: await getKabupaten(),
    skipDuplicates: true,
  });

  await prisma.kecamatan.createMany({
    data: await getKecamatan(),
    skipDuplicates: true,
  });

  await prisma.desa.createMany({
    data: await getDesa(),
    skipDuplicates: true,
  });

  await prisma.tempatUjiKompetensi.createMany({
    data: tempatUjiKompetensi,
    skipDuplicates: true,
  });

  await prisma.skemaSertifikasi.createMany({
    data: skemaSertifikasi,
    skipDuplicates: true,
  });

  await prisma.user.createMany({
    data: userAsAdministrator,
    skipDuplicates: true,
  });

  await prisma.administrator.createMany({
    data: administrator,
    skipDuplicates: true,
  });

  await prisma.user.createMany({
    data: userAsAsesor,
    skipDuplicates: true,
  });

  await prisma.asesor.createMany({
    data: asesor,
    skipDuplicates: true,
  });

  await prisma.persyaratanDasar.createMany({
    data: persyaratanDasar,
    skipDuplicates: true,
  });

  await prisma.tujuanAsesmen.createMany({
    data: tujuanAsesmen,
    skipDuplicates: true,
  });

  await prisma.unitKompetensi.createMany({
    data: unitKompetensiMemasangDanMerakitPHB,
    skipDuplicates: true,
  });

  await prisma.aktivitasUnitKompetensi.createMany({
    data: [
      ...aktivitasUnitKompetensi101,
      ...aktivitasUnitKompetensi102,
      ...aktivitasUnitKompetensi103,
      ...aktivitasUnitKompetensi104,
      ...aktivitasUnitKompetensi105,
      ...aktivitasUnitKompetensi106,
      ...aktivitasUnitKompetensi107,
      ...aktivitasUnitKompetensi108,
      ...aktivitasUnitKompetensi109,
      ...aktivitasUnitKompetensi110,
      ...aktivitasUnitKompetensi111,
      ...aktivitasUnitKompetensi112,
      ...aktivitasUnitKompetensi113,
    ],
    skipDuplicates: true,
  });

  await prisma.kriteriaUnjukKerja.createMany({
    data: kriteriaUnjukKerja,
    skipDuplicates: true,
  });

  await prisma.tugasPraktikDemonstrasi.createMany({
    data: tugasPraktikDemonstrasi,
    skipDuplicates: true,
  });

  await prisma.langkahKerjaTugasPraktikDemonstrasi.createMany({
    data: langkahKerjaTugasPraktikDemonstrasi,
    skipDuplicates: true,
  });

  await prisma.instruksiKerjaTugasPraktikDemonstrasi.createMany({
    data: instruksiKerjaTugasPraktikDemonstrasi,
    skipDuplicates: true,
  });

  await prisma.pertanyaanTertulisEsai.createMany({
    data: pertanyaanTertulisEsai,
    skipDuplicates: true,
  });

  await prisma.pertanyaanTertulisPilihanGanda.createMany({
    data: pertanyaanTertulisPilihanGanda,
    skipDuplicates: true,
  });

  await prisma.jawabanPertanyaanTertulisPilihanGanda.createMany({
    data: jawabanPertanyaanTertulisPilihanGanda,
    skipDuplicates: true,
  });

  await prisma.pertanyaanLisan.createMany({
    data: pertanyaanLisan,
    skipDuplicates: true,
  });

  await prisma.pertanyaanObservasi.createMany({
    data: pertanyaanObservasi,
    skipDuplicates: true,
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
