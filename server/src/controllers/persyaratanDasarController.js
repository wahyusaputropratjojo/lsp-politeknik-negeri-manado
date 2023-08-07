import prisma from "../utils/prisma.js";

export const listPersyaratanDasar = async (req, res, next) => {
  try {
    const persyaratanDasar = await prisma.persyaratanDasar.findMany({
      where: {
        id_skema_sertifikasi: req.params.id,
      },
    });

    if (persyaratanDasar.length === 0 || persyaratanDasar === null) {
      res.status(404);
      throw new Error("Persyaratan Dasar tidak ditemukan");
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      data: persyaratanDasar,
    });
  } catch (error) {
    next(error);
  }
};
