// Packages
import express from "express";

// Controllers
import {
  listUnitKompetensi,
  createUnitKompetensi,
  updateUnitKompetensi,
  deleteUnitKompetensi,
} from "../controllers/unitKompetensiController.js";

export const router = express.Router();

router.post("/unit-kompetensi", createUnitKompetensi);

router.route("/:id/unit-kompetensi").get(listUnitKompetensi);

router
  .route("/unit-kompetensi/:id")
  .patch(updateUnitKompetensi)
  .delete(deleteUnitKompetensi);
