import express from "express";

import { listJenisKelamin } from "../controllers/jenisKelaminController.js";

export const router = express.Router();

router.get("/", listJenisKelamin);
