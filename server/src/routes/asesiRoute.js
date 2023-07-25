// Packages
import express from "express";

// Middlewares
import { upload } from "../middlewares/upload.js";

// Controllers
import {
  registerAsesi,
  createAsesmenMandiri,
  updateAsesiSkemaSertifikasi,
  getStatusPendaftaran,
  getSkemaSertifikasiAsesi,
  listSkemaSertifikasiAsesi,
  listAktivitasUnitKompetensiUntukAsesmenMandiri,
} from "../controllers/asesiController.js";

export const router = express.Router();

router.post("/register", upload.any(), registerAsesi);
router.get("/:id/status-pendaftaran", getStatusPendaftaran);
router.get("/:id/skema-sertifikasi", listSkemaSertifikasiAsesi);
router.get(
  "/skema-sertifikasi/:id/aktivitas-unit-kompetensi",
  listAktivitasUnitKompetensiUntukAsesmenMandiri,
);
router.post("/asesmen-mandiri", createAsesmenMandiri);
router.patch("/skema-sertifikasi/:id", updateAsesiSkemaSertifikasi);
router.get("/skema-sertifikasi/:id", getSkemaSertifikasiAsesi);
