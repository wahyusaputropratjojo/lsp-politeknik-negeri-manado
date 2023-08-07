import prisma from "../utils/prisma.js";

export const listJenisKelamin = async (req, res, next) => {
  try {
    const jenisKelamin = await prisma.jenisKelamin.findMany({
      orderBy: {
        jenis_kelamin: "asc",
      },
    });

    if (jenisKelamin.length === 0) {
      res.sendStatus(204);
    }

    res.status(200).json({
      code: "200",
      status: "OK",
      data: jenisKelamin,
    });
  } catch (error) {
    next(error);
  }
};
