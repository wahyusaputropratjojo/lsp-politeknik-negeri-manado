// Packages
import express from "express";

// Controllers
import {
  createPertanyaanTertulisPilihanGanda,
  deletePertanyaanTertulisPilihanGanda,
  listPertanyaanTertulisPilihanGandaByUnitKompetensi,
  updatePertanyaanTertulisPilihanGanda,
} from "../controllers/pertanyaanTertulisPilihanGandaController.js";

export const router = express.Router();

router.post(
  "/pertanyaan-tertulis-pilihan-ganda",
  createPertanyaanTertulisPilihanGanda
);
router.patch(
  "/pertanyaan-tertulis-pilihan-ganda/:id",
  updatePertanyaanTertulisPilihanGanda
);
router.delete(
  "/pertanyaan-tertulis-pilihan-ganda/:id",
  deletePertanyaanTertulisPilihanGanda
);
router.get(
  "/:id/pertanyaan-tertulis-pilihan-ganda",
  listPertanyaanTertulisPilihanGandaByUnitKompetensi
);
