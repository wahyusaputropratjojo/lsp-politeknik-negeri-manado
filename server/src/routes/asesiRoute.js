// Packages
import express from "express";

// Middlewares
import { upload } from "../middlewares/upload.js";

// Controllers
import { registerAsesi } from "../controllers/asesiController.js";

export const router = express.Router();

router.post("/register", upload.any(), registerAsesi);
