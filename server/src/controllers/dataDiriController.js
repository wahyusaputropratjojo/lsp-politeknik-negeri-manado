import prisma from "../utils/prisma.js";

const getDataDiri = async (req, res, next) => {
  const { id } = req.params;

  try {
    const dataDiri = await prisma.dataDiri.findUnique({
      where: {
        id,
      },
    });

    if (dataDiri.length === 0) {
      res.status(404);
      throw new Error("Data diri tidak ditemukan!");
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      data: dataDiri,
    });
  } catch (error) {
    next(error);
  }
};
