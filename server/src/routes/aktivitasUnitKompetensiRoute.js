// Packages
import express from "express";

// Controllers
import {
  createAktivitasUnitKompetensi,
  deleteAktivitasUnitKompetensi,
  listAktivitasUnitKompetensiByUnitKompetensi,
} from "../controllers/aktivitasUnitKompetensiController.js";

export const router = express.Router();

router.post("/aktivitas-unit-kompetensi", createAktivitasUnitKompetensi);
router.delete("/aktivitas-unit-kompetensi/:id", deleteAktivitasUnitKompetensi);
router.get(
  "/:id/aktivitas-unit-kompetensi",
  listAktivitasUnitKompetensiByUnitKompetensi
);
