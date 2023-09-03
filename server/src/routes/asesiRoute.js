// Packages
import express from "express";

// Middlewares
import { upload } from "../middlewares/upload.js";

// Controllers
import {
  createAsesmenMandiri,
  createJawabanPertanyaanTertulisEsai,
  createJawabanPertanyaanTertulisPilihanGanda,
  getAsesi,
  getKompetensiAsesmenMandiri,
  getKompetensiObservasiTempatKerja,
  getKompetensiPertanyaanLisan,
  getKompetensiPertanyaanObservasi,
  getKompetensiPertanyaanTertulisEsai,
  getKompetensiPertanyaanTertulisPilihanGanda,
  getKompetensiPortofolio,
  getSkemaSertifikasiAsesi,
  getStatusPendaftaran,
  getStatusSkemaSertifikasiAsesi,
  getFRAPL01,
  getFRAPL02,
  getFRIA01,
  getFRIA02,
  getFRIA03,
  getFRIA04,
  getFRIA05,
  getFRIA06,
  getFRIA07,
  getFRIA08,
  listAktivitasUnitKompetensiUntukAsesmenMandiri,
  listPertanyaanTertulisEsai,
  listPertanyaanTertulisPilihanGanda,
  listSkemaSertifikasiAsesi,
  listTugasPraktikDemonstrasi,
  registerAsesi,
  registerAsesiSkemaSertifikasi,
  updateAsesiSkemaSertifikasi,
} from "../controllers/asesiController.js";

export const router = express.Router();

router.get("/:id/status-pendaftaran", getStatusPendaftaran);
router.get("/:id/fr-apl-01", getFRAPL01);
router.get("/:id/fr-apl-02", getFRAPL02);
router.get("/:id/fr-ia-01", getFRIA01);
router.get("/:id/fr-ia-02", getFRIA02);
router.get("/:id/fr-ia-03", getFRIA03);
router.get("/:id/fr-ia-04", getFRIA04);
router.get("/:id/fr-ia-05", getFRIA05);
router.get("/:id/fr-ia-06", getFRIA06);
router.get("/:id/fr-ia-07", getFRIA07);
router.get("/:id/fr-ia-08", getFRIA08);
router.get("/skema-sertifikasi/:id", getSkemaSertifikasiAsesi);
router.get("/skema-sertifikasi/:id/status", getStatusSkemaSertifikasiAsesi);
router.get("/:id/skema-sertifikasi", listSkemaSertifikasiAsesi);
router.get(
  "/skema-sertifikasi/:id/aktivitas-unit-kompetensi",
  listAktivitasUnitKompetensiUntukAsesmenMandiri
);
router.get(
  "/skema-sertifikasi/:id/tugas-praktik-demonstrasi",
  listTugasPraktikDemonstrasi
);

router.get(
  "/skema-sertifikasi/:id/pertanyaan-tertulis-esai",
  listPertanyaanTertulisEsai
);
router.get(
  "/skema-sertifikasi/:id/pertanyaan-tertulis-pilihan-ganda",
  listPertanyaanTertulisPilihanGanda
);
router.get(
  "/skema-sertifikasi/:id/kompetensi-asesmen-mandiri",
  getKompetensiAsesmenMandiri
);
router.get(
  "/skema-sertifikasi/:id/kompetensi-observasi-tempat-kerja",
  getKompetensiObservasiTempatKerja
);
router.get(
  "/skema-sertifikasi/:id/kompetensi-pertanyaan-observasi",
  getKompetensiPertanyaanObservasi
);
router.get(
  "/skema-sertifikasi/:id/kompetensi-pertanyaan-tertulis-pilihan-ganda",
  getKompetensiPertanyaanTertulisPilihanGanda
);
router.get(
  "/skema-sertifikasi/:id/kompetensi-pertanyaan-tertulis-esai",
  getKompetensiPertanyaanTertulisEsai
);
router.get(
  "/skema-sertifikasi/:id/kompetensi-pertanyaan-lisan",
  getKompetensiPertanyaanLisan
);
router.get(
  "/skema-sertifikasi/:id/kompetensi-portofolio",
  getKompetensiPortofolio
);
router.post("/register", upload.any(), registerAsesi);
router.post(
  "/register/skema-sertifikasi",
  upload.any(),
  registerAsesiSkemaSertifikasi
);
router.post("/asesmen-mandiri", createAsesmenMandiri);
router.post(
  "/skema-sertifikasi/jawaban-pertanyaan-tertulis-pilihan-ganda",
  createJawabanPertanyaanTertulisPilihanGanda
);
router.post(
  "/skema-sertifikasi/jawaban-pertanyaan-tertulis-esai",
  createJawabanPertanyaanTertulisEsai
);

router.patch("/skema-sertifikasi/:id", updateAsesiSkemaSertifikasi);
router.get("/:id", getAsesi);
