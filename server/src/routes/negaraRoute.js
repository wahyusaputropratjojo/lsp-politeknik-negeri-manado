import express from "express";

import { listNegara } from "../controllers/negaraController.js";

export const router = express.Router();

router.get("/", listNegara);
