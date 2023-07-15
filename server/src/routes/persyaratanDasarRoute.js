// Packages
import express from "express";

// Middlewares
import { upload } from "../middlewares/upload.js";

// Controllers
import { listPersyaratanDasar } from "../controllers/persyaratanDasarController.js";

export const router = express.Router();

router.get("/:id/persyaratan-dasar", listPersyaratanDasar);
