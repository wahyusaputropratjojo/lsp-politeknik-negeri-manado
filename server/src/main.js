// Packages
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// Configs
import { corsOptions } from "./configs/corsOptions.js";

// Middleware
import { errorHandler } from "./middlewares/errorHandler.js";
import { credentials } from "./middlewares/credentials.js";

// Routes
import { route as authRoute } from "./routes/authRoute.js";
import { route as userRoute } from "./routes/userRoute.js";
import { route as skemaSertifikasiRoute } from "./routes/skemaSertifikasiRoute.js";
import { router as unitKompetensiRoute } from "./routes/unitKompetensiRoute.js";
import { router as indonesiaAreaRoute } from "./routes/indonesiaAreaRoute.js";
import { router as asesiRoute } from "./routes/asesiRoute.js";
import { router as asesorRoute } from "./routes/asesorRoute.js";
import { router as administratorRoute } from "./routes/administratorRoute.js";
import { router as dataDiriRoute } from "./routes/dataDiriRoute.js";
import { router as persyaratanDasarRoute } from "./routes/persyaratanDasarRoute.js";
import { router as tempatUjiKompetensiRoute } from "./routes/tempatUjiKompetensiRoute.js";
import { router as negaraRoute } from "./routes/negaraRoute.js";
import { router as jenisKelaminRoute } from "./routes/jenisKelaminRoute.js";
import { router as kualifikasiPendidikanRoute } from "./routes/kualifikasiPendidikanRoute.js";
import { router as pertanyaanObservasiRoute } from "./routes/pertanyaanObservasiRoute.js";
import { router as pertanyaanTertulisEsaiRoute } from "./routes/pertanyaanTertulisEsaiRoute.js";
import { router as pertanyaanTertulisPilihanGandaRoute } from "./routes/pertanyaanTertulisPilihanGandaRoute.js";
import { router as pertanyaanLisanRoute } from "./routes/pertanyaanLisanRoute.js";
import { router as tugasPraktikDemonstrasiRoute } from "./routes/tugasPraktikDemonstrasiRoute.js";
import { router as aktivitasUnitKompetensiRoute } from "./routes/aktivitasUnitKompetensiRoute.js";
import { router as proyekTerkaitPekerjaanRoute } from "./routes/proyekTerkaitPekerjaanRoute.js";

const app = express();

const port = 3000;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("src/uploads"));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/skema-sertifikasi", skemaSertifikasiRoute);
app.use("/api/skema-sertifikasi", unitKompetensiRoute);
app.use("/api/skema-sertifikasi", persyaratanDasarRoute);
app.use("/api/skema-sertifikasi/unit-kompetensi", pertanyaanObservasiRoute);
app.use("/api/skema-sertifikasi/unit-kompetensi", pertanyaanTertulisEsaiRoute);
app.use("/api/skema-sertifikasi/unit-kompetensi", tugasPraktikDemonstrasiRoute);
app.use("/api/skema-sertifikasi/unit-kompetensi", aktivitasUnitKompetensiRoute);
app.use("/api/skema-sertifikasi/unit-kompetensi", proyekTerkaitPekerjaanRoute);
app.use(
  "/api/skema-sertifikasi/unit-kompetensi",
  pertanyaanTertulisPilihanGandaRoute
);
app.use("/api/skema-sertifikasi/unit-kompetensi", pertanyaanLisanRoute);
app.use("/api/indonesia", indonesiaAreaRoute);
app.use("/api/asesi", asesiRoute);
app.use("/api/asesor", asesorRoute);
app.use("/api/administrator", administratorRoute);
app.use("/api/data-diri", dataDiriRoute);
app.use("/api/tempat-uji-kompetensi", tempatUjiKompetensiRoute);
app.use("/api/negara", negaraRoute);
app.use("/api/jenis-kelamin", jenisKelaminRoute);
app.use("/api/kualifikasi-pendidikan", kualifikasiPendidikanRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log("");
  console.log(`Server berjalan di http://localhost:${port}`);
});
