// Packages
import express from "express";

import { upload } from "../middlewares/upload.js";

// Controllers
import {
  registerAdministrator,
  listAsesiByTempatUjiKompetensi,
  listAsesorByTempatUjiKompetensi,
  listSkemaSertifikasi,
  createAsesorAsesi,
  createSkemaSertifikasi,
  updateAsesiSkemaSertifikasi,
  getTempatUjiKompetensi,
  deleteSkemaSertifikasi,
  // updateStatusVerifikasiBerkasAsesi,
  // updateStatusPunyaAsesor,
} from "../controllers/administratorController.js";

export const router = express.Router();
router.post("/register", upload.any(), registerAdministrator);
router.get("/:id/tempat-uji-kompetensi/asesi", listAsesiByTempatUjiKompetensi);
router.get(
  "/:id/tempat-uji-kompetensi/skema-sertifikasi",
  listSkemaSertifikasi
);
router.get(
  "/:id/tempat-uji-kompetensi/asesor",
  listAsesorByTempatUjiKompetensi
);
router.post(
  "/tempat-uji-kompetensi/skema-sertifikasi/asesor/asesi",
  createAsesorAsesi
);
router.post(
  "/tempat-uji-kompetensi/skema-sertifikasi",
  upload.any(),
  createSkemaSertifikasi
);
router.patch(
  "/tempat-uji-kompetensi/skema-sertifikasi/asesi/:id",
  updateAsesiSkemaSertifikasi
);
router.get("/:id/tempat-uji-kompetensi", getTempatUjiKompetensi);
router.delete(
  "/tempat-uji-kompetensi/skema-sertifikasi/:id",
  deleteSkemaSertifikasi
);
