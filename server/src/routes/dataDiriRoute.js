// Packages
import express from "express";

// Controllers
import { registerAsesi } from "../controllers/asesiController.js";

export const router = express.Router();

router.post("/:id", registerAsesi);
// router.post("/register", registerAsesi);
