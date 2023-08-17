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

export const createPersyaratanDasar = async (req, res, next) => {
  const { id_skema_sertifikasi, persyaratan_dasar } = req.body;
  try {
    await prisma.persyaratanDasar.create({
      data: {
        persyaratan_dasar,
        skema_sertifikasi: {
          connect: {
            id: id_skema_sertifikasi,
          },
        },
      },
    });

    res.status(201).json({
      code: 201,
      status: "Created",
    });
  } catch (error) {
    next(error);
  }
};

export const deletePersyaratanDasar = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.persyaratanDasar.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
