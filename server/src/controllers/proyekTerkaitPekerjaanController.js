import prisma from "../utils/prisma.js";

export const createProyekTerkaitPekerjaan = async (req, res, next) => {
  const { id_unit_kompetensi, persiapan, demonstrasi } = req.body;

  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400);
      throw new Error("Data yang dikirim kosong");
    }

    if (!id_unit_kompetensi || id_unit_kompetensi === "") {
      res.status(400);
      throw new Error("ID Unit Kompetensi tidak ditemukan");
    }

    if (!persiapan || persiapan === "") {
      res.status(400);
      throw new Error("Persiapan tidak boleh kosong");
    }

    if (!demonstrasi || demonstrasi === "") {
      res.status(400);
      throw new Error("Demonstrasi tidak boleh kosong");
    }

    await prisma.proyekTerkaitPekerjaan.create({
      data: {
        persiapan,
        demonstrasi,
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

export const listProyekTerkaitPekerjaanByUnitKompetensi = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  try {
    const proyekTerkaitPekerjaan = await prisma.unitKompetensi.findUnique({
      where: {
        id,
      },
      select: {
        proyek_terkait_pekerjaan: {
          select: {
            id: true,
            persiapan: true,
            demonstrasi: true,
          },
        },
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      data: proyekTerkaitPekerjaan,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const deleteProyekTerkaitPekerjaan = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.proyekTerkaitPekerjaan.delete({
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
