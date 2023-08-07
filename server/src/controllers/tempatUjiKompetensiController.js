import prisma from "../utils/prisma.js";

export const listTempatUjiKompetensi = async (req, res, next) => {
  try {
    const tempatUjiKompetensi = await prisma.tempatUjiKompetensi.findMany({
      orderBy: {
        tempat_uji_kompetensi: "asc",
      },
      select: {
        id: true,
        kode_tempat_uji_kompetensi: true,
        tempat_uji_kompetensi: true,
      },
    });

    if (!tempatUjiKompetensi) {
      res.status(204);
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      data: tempatUjiKompetensi,
    });
  } catch (error) {
    next(error);
  }
};
