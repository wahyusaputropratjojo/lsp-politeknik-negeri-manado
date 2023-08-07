import prisma from "../utils/prisma.js";

export const listKualifikasiPendidikan = async (req, res, next) => {
  try {
    const kualifikasiPendidikan = await prisma.kualifikasiPendidikan.findMany({
      orderBy: {
        kualifikasi_pendidikan: "asc",
      },
    });

    if (kualifikasiPendidikan.length === 0) {
      res.sendStatus(204);
    }

    res.status(200).json({
      code: "200",
      status: "OK",
      data: kualifikasiPendidikan,
    });
  } catch (error) {
    next(error);
  }
};
