import express from "express";

import { listKualifikasiPendidikan } from "../controllers/kualifikasiPendidikanController.js";

export const router = express.Router();

router.get("/", listKualifikasiPendidikan);
