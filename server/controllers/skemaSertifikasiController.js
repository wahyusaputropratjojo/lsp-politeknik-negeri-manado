import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSkemaSertifikasi = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const skemaSertifikasi = await prisma.skemaSertifikasi.findUnique({
    where: {
      id,
    },
  });

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Berhasil mendapatkan data skema sertifikasi",
    data: {
      ...skemaSertifikasi,
    },
  });
});

export const listSkemaSertifikasi = asyncHandler(async (req, res) => {
  const skemaSertifikasi = await prisma.skemaSertifikasi.findMany();

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Berhasil mendapatkan data skema sertifikasi",
    data: [...skemaSertifikasi],
  });
});

export const createSkemaSertifikasi = asyncHandler(async (req, res) => {
  const { kode, nama } = req.body;

  const skemaSertifikasi = await prisma.skemaSertifikasi.create({
    data: {
      kode,
      nama,
    },
  });

  res.status(201).json({
    code: 201,
    status: "Created",
    message: "Skema Sertifikasi berhasil dibuat",
    data: {
      ...skemaSertifikasi,
    },
  });
});

export const updateSkemaSertifikasi = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { kode, nama } = req.body;

  const skemaSertifikasi = await prisma.skemaSertifikasi.update({
    where: {
      id,
    },
    data: {
      kode,
      nama,
    },
  });

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Berhasil memperbarui data skema sertifikasi",
    data: {
      ...skemaSertifikasi,
    },
  });
});

export const deleteSkemaSertifikasi = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.skemaSertifikasi.delete({
    where: {
      id,
    },
  });

  res.status(200).json({
    code: 200,
    status: "Ok",
    message: "Berhasil menghapus data skema sertifikasi",
  });
});
