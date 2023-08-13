import prisma from "../utils/prisma.js";

export const createPertanyaanLisan = async (req, res, next) => {
  const { id_unit_kompetensi, pertanyaan, jawaban } = req.body;

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

    if (!jawaban || jawaban === null) {
      res.status(400);
      throw new Error("Jawaban tidak boleh kosong");
    }

    await prisma.pertanyaanLisan.create({
      data: {
        pertanyaan,
        jawaban,
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

export const listPertanyaanLisanByUnitKompetensi = async (req, res, next) => {
  const { id } = req.params;

  try {
    const pertanyaanLisan = await prisma.unitKompetensi.findUnique({
      where: {
        id,
      },
      select: {
        pertanyaan_lisan: {
          select: {
            id: true,
            pertanyaan: true,
            jawaban: true,
          },
        },
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      data: pertanyaanLisan,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const updatePertanyaanTertulisLisan = async (req, res, next) => {
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

    await prisma.pertanyaanLisan.update({
      where: {
        id,
      },
      data: {
        pertanyaan,
        jawaban,
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

export const deletePertanyaanTertulisLisan = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.pertanyaanLisan.delete({
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
