import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getDataDiri = asyncHandler(async (req, res) => {
  const dataDiri = await prisma.dataDiri.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.status(201).json({
    code: 200,
    status: "Created",
    message: "Data diri berhasil didapatkan!",
    data: { ...dataDiri },
  });
});
