// Packages
import express from "express";

// Middlewares
import { upload } from "../middlewares/upload.js";

// Controllers
import {
  createPersyaratanDasar,
  deletePersyaratanDasar,
  listPersyaratanDasar,
} from "../controllers/persyaratanDasarController.js";

export const router = express.Router();

router.get("/:id/persyaratan-dasar", listPersyaratanDasar);
router.post("/persyaratan-dasar", createPersyaratanDasar);
router.delete("/persyaratan-dasar/:id", deletePersyaratanDasar);
