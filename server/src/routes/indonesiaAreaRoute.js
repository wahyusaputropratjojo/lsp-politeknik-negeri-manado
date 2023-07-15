// Packages
import express from "express";

// Controllers
import {
  getProvinsi,
  listProvinsi,
  listKabupatenByProvinsiID,
  listKecamatanByKabupatenID,
  listDesaByKecamatanID,
} from "../controllers/indonesiaAreaController.js";

export const router = express.Router();

router.route("/provinsi").get(listProvinsi);
router.route("/provinsi/:id").get(getProvinsi);
router.route("/provinsi/:id/kabupaten").get(listKabupatenByProvinsiID);
router
  .route("/provinsi/kabupaten/:id/kecamatan")
  .get(listKecamatanByKabupatenID);
router
  .route("/provinsi/kabupaten/kecamatan/:id/desa")
  .get(listDesaByKecamatanID);
