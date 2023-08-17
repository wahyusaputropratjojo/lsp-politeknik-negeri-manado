// Packages
import express from "express";

import { upload } from "../middlewares/upload.js";

// Controllers
import {
  createAsesorObservasiAktivitasTempatKerja,
  createAsesorPertanyaanObservasi,
  createAsesorPertanyaanLisan,
  createAsesorVerifikasiPortofolio,
  createAsesorProyekTerkaitPekerjaan,
  getAsesiSkemaSertifikasi,
  getKompetensiAsesmenMandiri,
  getKompetensiObservasiTempatKerja,
  getKompetensiPertanyaanObservasi,
  getKompetensiPertanyaanTertulisPilihanGanda,
  getKompetensiPertanyaanTertulisEsai,
  getKompetensiPertanyaanLisan,
  getKompetensiPortofolio,
  listAsesi,
  listSkemaSertifikasi,
  updateAsesiSkemaSertifikasi,
  updateEvaluasiPertanyaanTertulisEsai,
  registerAsesor,
  getTempatUjiKompetensi,
} from "../controllers/asesorController.js";

export const router = express.Router();

router.post("/register", upload.any(), registerAsesor);

router.post(
  "/tempat-uji-kompetensi/skema-sertifikasi/asesi/observasi-aktivitas-tempat-kerja",
  createAsesorObservasiAktivitasTempatKerja
);
router.post(
  "/tempat-uji-kompetensi/skema-sertifikasi/asesi/pertanyaan-observasi",
  createAsesorPertanyaanObservasi
);
router.post(
  "/tempat-uji-kompetensi/skema-sertifikasi/asesi/pertanyaan-lisan",
  createAsesorPertanyaanLisan
);
router.post(
  "/tempat-uji-kompetensi/skema-sertifikasi/asesi/verifikasi-portofolio",
  createAsesorVerifikasiPortofolio
);
router.post(
  "/tempat-uji-kompetensi/skema-sertifikasi/asesi/proyek-terkait-pekerjaan",
  createAsesorProyekTerkaitPekerjaan
);

router.get("/:id/tempat-uji-kompetensi/asesi", listAsesi);
router.get("/tempat-uji-kompetensi/asesi/:id", getAsesiSkemaSertifikasi);
router.get(
  "/tempat-uji-kompetensi/asesi/:id/kompetensi-asesmen-mandiri",
  getKompetensiAsesmenMandiri
);
router.get(
  "/tempat-uji-kompetensi/asesi/:id/kompetensi-observasi-tempat-kerja",
  getKompetensiObservasiTempatKerja
);
router.get(
  "/tempat-uji-kompetensi/asesi/:id/kompetensi-pertanyaan-observasi",
  getKompetensiPertanyaanObservasi
);
router.get(
  "/tempat-uji-kompetensi/asesi/:id/kompetensi-pertanyaan-tertulis-pilihan-ganda",
  getKompetensiPertanyaanTertulisPilihanGanda
);
router.get(
  "/tempat-uji-kompetensi/asesi/:id/kompetensi-pertanyaan-tertulis-esai",
  getKompetensiPertanyaanTertulisEsai
);
router.get(
  "/tempat-uji-kompetensi/asesi/:id/kompetensi-pertanyaan-lisan",
  getKompetensiPertanyaanLisan
);
router.get(
  "/tempat-uji-kompetensi/asesi/:id/kompetensi-portofolio",
  getKompetensiPortofolio
);
router.patch("/tempat-uji-kompetensi/asesi/:id", updateAsesiSkemaSertifikasi);
router.post(
  "/tempat-uji-kompetensi/asesi/evaluasi-jawaban-pertanyaan-esai",
  updateEvaluasiPertanyaanTertulisEsai
);

router.get("/:id/tempat-uji-kompetensi", getTempatUjiKompetensi);
router.get(
  "/:id/tempat-uji-kompetensi/skema-sertifikasi",
  listSkemaSertifikasi
);
