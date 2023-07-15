import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listPersyaratanDasar = asyncHandler(async (req, res) => {
  const persyaratanDasar = await prisma.persyaratanDasar.findMany({
    where: {
      id_skema_sertifikasi: req.params.id,
    },
  });

  if (persyaratanDasar.length === 0 || persyaratanDasar === null) {
    res.status(404);
    throw new Error("Persyaratan Dasar tidak ditemukan");
  }

  res.status(201).json({
    code: 200,
    status: "OK",
    message: "Persyaratan Dasar berhasil diperoleh",
    data: persyaratanDasar,
  });
});
