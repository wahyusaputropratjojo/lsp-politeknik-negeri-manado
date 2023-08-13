// Packages
import express from "express";

// Controllers
import {
  createProyekTerkaitPekerjaan,
  deleteProyekTerkaitPekerjaan,
  listProyekTerkaitPekerjaanByUnitKompetensi,
} from "../controllers/proyekTerkaitPekerjaanController.js";

export const router = express.Router();

router.post("/proyek-terkait-pekerjaan", createProyekTerkaitPekerjaan);
router.delete("/proyek-terkait-pekerjaan/:id", deleteProyekTerkaitPekerjaan);
router.get(
  "/:id/proyek-terkait-pekerjaan",
  listProyekTerkaitPekerjaanByUnitKompetensi
);
