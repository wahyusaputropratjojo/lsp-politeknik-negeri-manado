// Packages
import express from "express";

// Controllers
import {
  createPertanyaanObservasi,
  listPertanyaanObservasiByUnitKompetensi,
  updatePertanyaanObservasi,
  deletePertanyaanObservasi,
} from "../controllers/pertanyaanObservasiController.js";

export const router = express.Router();

router.post("/pertanyaan-observasi", createPertanyaanObservasi);
router.patch("/pertanyaan-observasi/:id", updatePertanyaanObservasi);
router.delete("/pertanyaan-observasi/:id", deletePertanyaanObservasi);
router.get(
  "/:id/pertanyaan-observasi",
  listPertanyaanObservasiByUnitKompetensi
);
