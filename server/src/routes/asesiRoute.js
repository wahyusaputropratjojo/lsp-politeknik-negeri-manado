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
  listAktivitasUnitKompetensiUntukAsesmenMandiri,
  listPertanyaanTertulisEsai,
  listPertanyaanTertulisPilihanGanda,
  listSkemaSertifikasiAsesi,
  listTugasPraktikDemonstrasi,
  registerAsesi,
  updateAsesiSkemaSertifikasi,
} from "../controllers/asesiController.js";

export const router = express.Router();

router.get("/:id/status-pendaftaran", getStatusPendaftaran);
router.get("/skema-sertifikasi/:id", getSkemaSertifikasiAsesi);
router.get("/skema-sertifikasi/:id/status", getStatusSkemaSertifikasiAsesi);
router.get("/:id/skema-sertifikasi", listSkemaSertifikasiAsesi);
router.get(
  "/skema-sertifikasi/:id/aktivitas-unit-kompetensi",
  listAktivitasUnitKompetensiUntukAsesmenMandiri,
);
router.get(
  "/skema-sertifikasi/:id/tugas-praktik-demonstrasi",
  listTugasPraktikDemonstrasi,
);

router.get(
  "/skema-sertifikasi/:id/pertanyaan-tertulis-esai",
  listPertanyaanTertulisEsai,
);
router.get(
  "/skema-sertifikasi/:id/pertanyaan-tertulis-pilihan-ganda",
  listPertanyaanTertulisPilihanGanda,
);

router.post("/register", upload.any(), registerAsesi);
router.post("/asesmen-mandiri", createAsesmenMandiri);
router.post(
  "/skema-sertifikasi/jawaban-pertanyaan-tertulis-pilihan-ganda",
  createJawabanPertanyaanTertulisPilihanGanda,
);
router.post(
  "/skema-sertifikasi/jawaban-pertanyaan-tertulis-esai",
  createJawabanPertanyaanTertulisEsai,
);

router.patch("/skema-sertifikasi/:id", updateAsesiSkemaSertifikasi);
