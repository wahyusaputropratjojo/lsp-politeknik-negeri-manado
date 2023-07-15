import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listProvinsi = asyncHandler(async (req, res) => {
  const { nama } = req.query;

  const option = {
    where: {},
    orderBy: {
      nama: "asc",
    },
  };

  if (nama) {
    option.where.nama = {
      contains: nama,
    };
  }

  const provinsi = await prisma.provinsi.findMany(option);

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Berhasil mendapatkan data Provinsi",
    data: provinsi,
  });
});

export const getProvinsi = asyncHandler(async (req, res) => {
  const provinsi = await prisma.provinsi.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Berhasil mendapatkan data Provinsi",
    data: provinsi,
  });
});

export const listKabupatenByProvinsiID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { nama } = req.query;

  const option = {
    where: {
      id_provinsi: id,
    },
    orderBy: {
      nama: "asc",
    },
  };

  if (nama) {
    option.where.nama = {
      contains: nama,
    };
  }

  const kabupaten = await prisma.kabupaten.findMany(option);

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Berhasil mendapatkan data Kota & Kabupaten",
    data: kabupaten,
  });
});

export const listKecamatanByKabupatenID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { nama } = req.query;

  const option = {
    where: {
      id_kabupaten: id,
    },
    orderBy: {
      nama: "asc",
    },
  };

  if (nama) {
    option.where.nama = {
      contains: nama,
    };
  }

  const kecamatan = await prisma.kecamatan.findMany(option);

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Berhasil mendapatkan data Kota & Kabupaten",
    data: kecamatan,
  });
});

export const listDesaByKecamatanID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { nama } = req.query;

  const option = {
    where: {
      id_kecamatan: id,
    },
    orderBy: {
      nama: "asc",
    },
  };

  if (nama) {
    option.where.nama = {
      contains: nama,
    };
  }

  const desa = await prisma.desa.findMany(option);

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Berhasil mendapatkan data Kota & Kabupaten",
    data: desa,
  });
});
