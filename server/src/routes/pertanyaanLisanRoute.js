// Packages
import express from "express";

// Controllers
import {
  createPertanyaanLisan,
  deletePertanyaanTertulisLisan,
  listPertanyaanLisanByUnitKompetensi,
  updatePertanyaanTertulisLisan,
} from "../controllers/pertanyaanLisanController.js";

export const router = express.Router();

router.post("/pertanyaan-lisan", createPertanyaanLisan);
router.patch("/pertanyaan-lisan/:id", updatePertanyaanTertulisLisan);
router.delete("/pertanyaan-lisan/:id", deletePertanyaanTertulisLisan);
router.get("/:id/pertanyaan-lisan", listPertanyaanLisanByUnitKompetensi);
