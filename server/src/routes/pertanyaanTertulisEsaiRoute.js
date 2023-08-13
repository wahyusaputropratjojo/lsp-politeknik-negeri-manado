// Packages
import express from "express";

// Controllers
import {
  createPertanyaanTertulisEsai,
  deletePertanyaanTertulisEsai,
  listPertanyaanTertulisEsaiByUnitKompetensi,
  updatePertanyaanTertulisEsai,
} from "../controllers/pertanyaanTertulisEsaiController.js";

export const router = express.Router();

router.post("/pertanyaan-tertulis-esai", createPertanyaanTertulisEsai);
router.patch("/pertanyaan-tertulis-esai/:id", updatePertanyaanTertulisEsai);
router.delete("/pertanyaan-tertulis-esai/:id", deletePertanyaanTertulisEsai);
router.get(
  "/:id/pertanyaan-tertulis-esai",
  listPertanyaanTertulisEsaiByUnitKompetensi
);
