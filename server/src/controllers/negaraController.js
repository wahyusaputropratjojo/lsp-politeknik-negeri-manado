import prisma from "../utils/prisma.js";

export const listNegara = async (req, res, next) => {
  try {
    const negara = await prisma.negara.findMany({
      orderBy: {
        nama: "asc",
      },
    });

    if (negara.length === 0) {
      res.sendStatus(204);
    }

    res.status(200).json({
      code: "200",
      status: "OK",
      data: negara,
    });
  } catch (error) {
    next(error);
  }
};
