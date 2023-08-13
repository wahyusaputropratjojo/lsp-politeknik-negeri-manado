import prisma from "../utils/prisma.js";

export const listAktivitasUnitKompetensiByUnitKompetensi = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  try {
    const aktivitasUnitKompetensi = await prisma.unitKompetensi.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        aktivitas_unit_kompetensi: {
          select: {
            id: true,
            elemen: true,
            kriteria_unjuk_kerja: {
              select: {
                id: true,
                kriteria_unjuk_kerja: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      data: aktivitasUnitKompetensi,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const createAktivitasUnitKompetensi = async (req, res, next) => {
  const { id_unit_kompetensi, elemen, kriteria_unjuk_kerja } = req.body;

  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400);
      throw new Error("Data yang dikirim kosong");
    }

    if (!id_unit_kompetensi || id_unit_kompetensi === "") {
      res.status(400);
      throw new Error("Elemen tidak boleh kosong");
    }

    if (!elemen || elemen === "") {
      res.status(400);
      throw new Error("Elemen tidak boleh kosong");
    }

    if (!kriteria_unjuk_kerja || kriteria_unjuk_kerja.length === 0) {
      res.status(400);
      throw new Error("Kriteria Unjuk Kerja tidak boleh kosong");
    }

    await prisma.aktivitasUnitKompetensi.create({
      data: {
        unit_kompetensi: {
          connect: {
            id: id_unit_kompetensi,
          },
        },
        elemen,
        kriteria_unjuk_kerja: {
          createMany: {
            data: kriteria_unjuk_kerja,
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

export const deleteAktivitasUnitKompetensi = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.aktivitasUnitKompetensi.delete({
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
