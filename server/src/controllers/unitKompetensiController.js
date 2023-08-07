import prisma from "../utils/prisma.js";

export const listUnitKompetensi = async (req, res, next) => {
  const { id: id_skema_sertifikasi } = req.params;

  try {
    const unitKompetensi = await prisma.unitKompetensi.findMany({
      where: {
        id_skema_sertifikasi,
      },
    });

    if (unitKompetensi.length === 0) {
      res.sendStatus(204);
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      data: unitKompetensi,
    });
  } catch (error) {
    next(error);
  }
};

export const createUnitKompetensi = async (req, res, next) => {
  const { id_skema_sertifikasi, kode, nama, standar_kompetensi } = req.body;

  try {
    if (!id_skema_sertifikasi) {
      res.status(400);
      throw new Error("ID skema sertifikasi tidak boleh kosong!");
    }

    if (!kode) {
      res.status(400);
      throw new Error("Kode tidak boleh kosong!");
    }

    if (!nama) {
      res.status(400);
      throw new Error("Nama tidak boleh kosong!");
    }

    if (!standar_kompetensi) {
      res.status(400);
      throw new Error("Standar kompetensi tidak boleh kosong!");
    }

    await prisma.unitKompetensi.create({
      data: {
        id_skema_sertifikasi,
        kode,
        nama,
        standar_kompetensi,
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

export const updateUnitKompetensi = async (req, res, next) => {
  const { id } = req.params;
  const { kode, nama, standar_kompetensi } = req.body;

  try {
    await prisma.unitKompetensi.update({
      where: {
        id,
      },
      data: {
        kode,
        nama,
        standar_kompetensi,
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUnitKompetensi = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.unitKompetensi.delete({
      where: {
        id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
