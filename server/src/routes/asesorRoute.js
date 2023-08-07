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
  listAsesi,
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
router.patch("/tempat-uji-kompetensi/asesi/:id", updateAsesiSkemaSertifikasi);
router.post(
  "/tempat-uji-kompetensi/asesi/evaluasi-jawaban-pertanyaan-esai",
  updateEvaluasiPertanyaanTertulisEsai
);

router.get("/:id/tempat-uji-kompetensi", getTempatUjiKompetensi);
