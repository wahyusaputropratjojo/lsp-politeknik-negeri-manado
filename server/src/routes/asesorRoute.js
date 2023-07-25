// Packages
import express from "express";

// Controllers
import {
  listAsesi,
  getAsesiSkemaSertifikasi,
  updateAsesiSkemaSertifikasi,
} from "../controllers/asesorController.js";

export const router = express.Router();

router.get("/:id/tempat-uji-kompetensi/asesi", listAsesi);
router.get("/tempat-uji-kompetensi/asesi/:id", getAsesiSkemaSertifikasi);
router.patch("/tempat-uji-kompetensi/asesi/:id", updateAsesiSkemaSertifikasi);
