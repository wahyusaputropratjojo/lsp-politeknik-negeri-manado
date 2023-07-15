import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listUnitKompetensi = asyncHandler(async (req, res) => {
  const { id: id_skema_sertifikasi } = req.params;

  const unitKompetensi = await prisma.unitKompetensi.findMany({
    where: {
      id_skema_sertifikasi,
    },
  });

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Berhasil mendapatkan semua unit kompetensi",
    data: [...unitKompetensi],
  });
});

export const createUnitKompetensi = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { kode, nama, standar_kompetensi } = req.body;

  const unitKompetensi = await prisma.unitKompetensi.create({
    data: {
      kode,
      nama,
      standar_kompetensi,
      skema_sertifikasi: {
        connect: {
          id,
        },
      },
    },
  });

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Berhasil membuat unit kompetensi",
    data: {
      ...unitKompetensi,
    },
  });
});

export const updateUnitKompetensi = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { kode, nama, standar_kompetensi } = req.body;

  const unitKompetensi = await prisma.unitKompetensi.update({
    where: {
      id,
    },
    data: {
      kode,
      nama,
      standar_kompetensi,
    },
  });

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Berhasil mengubah unit kompetensi",
    data: {
      ...unitKompetensi,
    },
  });
});

export const deleteUnitKompetensi = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.unitKompetensi.delete({
    where: {
      id,
    },
  });

  res.status(200).json({
    code: 200,
    status: "Ok",
    message: "Berhasil menghapus unit kompetensi",
  });
});
