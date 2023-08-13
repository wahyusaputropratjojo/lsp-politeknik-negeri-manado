import prisma from "../utils/prisma.js";

export const createPertanyaanObservasi = async (req, res, next) => {
  const { id_unit_kompetensi, pertanyaan } = req.body;

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

    await prisma.pertanyaanObservasi.create({
      data: {
        pertanyaan,
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

export const listPertanyaanObservasiByUnitKompetensi = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    const pertanyaanObservasi = await prisma.unitKompetensi.findUnique({
      where: {
        id,
      },
      select: {
        pertanyaan_observasi: {
          select: {
            id: true,
            pertanyaan: true,
          },
        },
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      data: pertanyaanObservasi,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const updatePertanyaanObservasi = async (req, res, next) => {
  const { id } = req.params;
  const { pertanyaan } = req.body;

  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400);
      throw new Error("Data yang dikirim kosong");
    }

    if (!pertanyaan || pertanyaan === null) {
      res.status(400);
      throw new Error("Pertanyaan tidak boleh kosong");
    }

    await prisma.pertanyaanObservasi.update({
      where: {
        id,
      },
      data: {
        pertanyaan,
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

export const deletePertanyaanObservasi = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.pertanyaanObservasi.delete({
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
