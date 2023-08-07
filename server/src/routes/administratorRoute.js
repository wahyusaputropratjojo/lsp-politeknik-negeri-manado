// Packages
import express from "express";

// Controllers
import {
  listAsesiByTempatUjiKompetensi,
  listAsesorByTempatUjiKompetensi,
  createAsesorAsesi,
  updateAsesiSkemaSertifikasi,
  getTempatUjiKompetensi,
  // updateStatusVerifikasiBerkasAsesi,
  // updateStatusPunyaAsesor,
} from "../controllers/administratorController.js";

export const router = express.Router();

router.get("/:id/tempat-uji-kompetensi/asesi", listAsesiByTempatUjiKompetensi);

router.get(
  "/:id/tempat-uji-kompetensi/asesor",
  listAsesorByTempatUjiKompetensi
);
router.post(
  "/tempat-uji-kompetensi/skema-sertifikasi/asesor/asesi",
  createAsesorAsesi
);
router.patch(
  "/tempat-uji-kompetensi/skema-sertifikasi/asesi/:id",
  updateAsesiSkemaSertifikasi
);

router.get("/:id/tempat-uji-kompetensi", getTempatUjiKompetensi);
