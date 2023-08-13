// Packages
import express from "express";

// Controllers
import {
  createTugasPraktikDemonstrasi,
  createLangkahKerjaTugasPraktikDemonstrasi,
  deleteTugasPraktikDemonstrasi,
  deleteLangkahKerjaTugasPraktikDemonstrasi,
  listTugasPraktikDemonstrasi,
} from "../controllers/tugasPraktikDemonstrasiController.js";

export const router = express.Router();

router.post("/tugas-praktik-demonstrasi", createTugasPraktikDemonstrasi);
router.post(
  "/tugas-praktik-demonstrasi/langkah-kerja",
  createLangkahKerjaTugasPraktikDemonstrasi
);
router.post("/tugas-praktik-demonstrasi/:id", deleteTugasPraktikDemonstrasi);
router.post(
  "/tugas-praktik-demonstrasi/langkah-kerja/:id",
  deleteLangkahKerjaTugasPraktikDemonstrasi
);
router.get("/:id/tugas-praktik-demonstrasi", listTugasPraktikDemonstrasi);
