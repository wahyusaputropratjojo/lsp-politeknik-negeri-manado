import prisma from "../utils/prisma.js";

export const createTugasPraktikDemonstrasi = async (req, res, next) => {
  const { skenario, id_unit_kompetensi } = req.body;

  try {
    await prisma.tugasPraktikDemonstrasi.create({
      data: {
        skenario,
        unit_kompetensi: {
          connect: {
            id: id_unit_kompetensi,
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
    console.log(error);
  }
};

export const createLangkahKerjaTugasPraktikDemonstrasi = async (
  req,
  res,
  next
) => {
  const { id_tugas_praktik_demonstrasi, langkah_kerja, instruksi_kerja } =
    req.body;

  try {
    await prisma.langkahKerjaTugasPraktikDemonstrasi.create({
      data: {
        langkah_kerja,
        instruksi_kerja_tugas_praktik_demonstrasi: {
          createMany: {
            data: instruksi_kerja,
          },
        },
        tugas_praktik_demonstrasi: {
          connect: {
            id: id_tugas_praktik_demonstrasi,
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
    console.log(error);
  }
};

export const listTugasPraktikDemonstrasi = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tugasPraktikDemonstrasi = await prisma.unitKompetensi.findUnique({
      where: {
        id,
      },
      select: {
        tugas_praktik_demonstrasi: {
          select: {
            id: true,
            skenario: true,
            langkah_kerja_tugas_praktik_demonstrasi: {
              select: {
                id: true,
                langkah_kerja: true,
                instruksi_kerja_tugas_praktik_demonstrasi: {
                  select: {
                    id: true,
                    instruksi_kerja: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      data: tugasPraktikDemonstrasi,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const deleteTugasPraktikDemonstrasi = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.tugasPraktikDemonstrasi.delete({
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

export const deleteLangkahKerjaTugasPraktikDemonstrasi = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    await prisma.langkahKerjaTugasPraktikDemonstrasi.delete({
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
