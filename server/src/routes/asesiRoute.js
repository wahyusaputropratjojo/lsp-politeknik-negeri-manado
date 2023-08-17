// Packages
import express from "express";

// Middlewares
import { upload } from "../middlewares/upload.js";

// Controllers
import {
  createAsesmenMandiri,
  createJawabanPertanyaanTertulisPilihanGanda,
  createJawabanPertanyaanTertulisEsai,
  getSkemaSertifikasiAsesi,
  getStatusPendaftaran,
  getStatusSkemaSertifikasiAsesi,
  getAsesi,
  getKompetensiPertanyaanTertulisEsai,
  getKompetensiPertanyaanTertulisPilihanGanda,
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
  "/skema-sertifikasi/:id/kompetensi-pertanyaan-tertulis-pilihan-ganda",
  getKompetensiPertanyaanTertulisPilihanGanda
);
router.get(
  "/skema-sertifikasi/:id/kompetensi-pertanyaan-tertulis-esai",
  getKompetensiPertanyaanTertulisEsai
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
