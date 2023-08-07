import express from "express";

import { listTempatUjiKompetensi } from "../controllers/tempatUjiKompetensiController.js";

export const router = express.Router();

router.get("/", listTempatUjiKompetensi);
