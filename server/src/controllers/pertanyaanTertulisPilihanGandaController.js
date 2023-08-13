import prisma from "../utils/prisma.js";

export const createPertanyaanTertulisPilihanGanda = async (req, res, next) => {
  const {
    id_unit_kompetensi,
    pertanyaan,
    jawaban_pertanyaan_tertulis_pilihan_ganda,
  } = req.body;

  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400);
      throw new Error("Data yang dikirim kosong");
    }

    if (!id_unit_kompetensi || id_unit_kompetensi === null) {
      res.status(400);
      throw new Error("ID Unit Kompetensi tidak boleh kosong");
    }

    if (!pertanyaan || pertanyaan === null) {
      res.status(400);
      throw new Error("Pertanyaan tidak boleh kosong");
    }

    if (
      !jawaban_pertanyaan_tertulis_pilihan_ganda ||
      jawaban_pertanyaan_tertulis_pilihan_ganda.length === 0
    ) {
      res.status(400);
      throw new Error("Jawaban tidak boleh kosong");
    }

    await prisma.pertanyaanTertulisPilihanGanda.create({
      data: {
        pertanyaan,
        jawaban_pertanyaan_tertulis_pilihan_ganda: {
          createMany: {
            data: jawaban_pertanyaan_tertulis_pilihan_ganda,
          },
        },
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

export const listPertanyaanTertulisPilihanGandaByUnitKompetensi = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    const pertanyaanTertulisPilihanGanda =
      await prisma.unitKompetensi.findUnique({
        where: {
          id,
        },
        select: {
          pertanyaan_tertulis_pilihan_ganda: {
            select: {
              id: true,
              pertanyaan: true,
              jawaban_pertanyaan_tertulis_pilihan_ganda: {
                select: {
                  id: true,
                  jawaban: true,
                  is_benar: true,
                },
              },
            },
          },
        },
      });

    res.status(200).json({
      code: 200,
      status: "OK",
      data: pertanyaanTertulisPilihanGanda,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const updatePertanyaanTertulisPilihanGanda = async (req, res, next) => {
  const { id } = req.params;
  const { pertanyaan, jawaban } = req.body;

  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400);
      throw new Error("Data yang dikirim kosong");
    }

    if (!pertanyaan || pertanyaan === null) {
      res.status(400);
      throw new Error("Pertanyaan tidak boleh kosong");
    }

    await prisma.pertanyaanTertulisPilihanGanda.update({
      where: {
        id,
      },
      data: {
        pertanyaan,
        jawaban_pertanyaan_tertulis_pilihan_ganda: {
          updateMany: {
            data: {},
          },
        },
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

export const deletePertanyaanTertulisPilihanGanda = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.pertanyaanTertulisPilihanGanda.delete({
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
