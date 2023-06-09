// Packages
import express from "express";

// Controllers
import {
  getSkemaSertifikasi,
  listSkemaSertifikasi,
  createSkemaSertifikasi,
  createSkemaSertifikasiWithAllRelated,
  updateSkemaSertifikasi,
  deleteSkemaSertifikasi,
} from "../controllers/skemaSertifikasiController.js";

export const route = express.Router();

route.post("/", createSkemaSertifikasi);
route.post(
  "/unit-kompetensi/aktivitas-unit-kompetensi/all",
  createSkemaSertifikasiWithAllRelated,
);
route.get("/", listSkemaSertifikasi);
route.get("/:id", getSkemaSertifikasi);
route.patch("/:id", updateSkemaSertifikasi);
route.delete("/:id", deleteSkemaSertifikasi);
