import prisma from "../utils/prisma.js";

export const listProvinsi = async (req, res, next) => {
  const { nama } = req.query;

  try {
    const option = {
      where: {},
      orderBy: {
        nama: "asc",
      },
    };

    if (nama) {
      option.where.nama = {
        contains: nama,
      };
    }

    const provinsi = await prisma.provinsi.findMany(option);

    res.status(200).json({
      code: 200,
      status: "OK",
      data: provinsi,
    });
  } catch (error) {
    next(error);
  }
};

export const getProvinsi = async (req, res, next) => {
  const { id } = req.params;

  try {
    const provinsi = await prisma.provinsi.findUnique({
      where: {
        id,
      },
    });

    if (provinsi.length === 0) {
      res.status(404);
      throw new Error("Provinsi tidak ditemukan!");
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      data: provinsi,
    });
  } catch (error) {
    next(error);
  }
};

export const listKabupatenByProvinsiID = async (req, res, next) => {
  const { id } = req.params;
  const { nama } = req.query;

  try {
    const option = {
      where: {
        id_provinsi: id,
      },
      orderBy: {
        nama: "asc",
      },
    };

    if (nama) {
      option.where.nama = {
        contains: nama,
      };
    }

    const kabupaten = await prisma.kotaKabupaten.findMany(option);

    res.status(200).json({
      code: 200,
      status: "OK",
      data: kabupaten,
    });
  } catch (error) {
    next(error);
  }
};

export const listKecamatanByKabupatenID = async (req, res, next) => {
  const { id } = req.params;
  const { nama } = req.query;

  try {
    const option = {
      where: {
        id_kota_kabupaten: id,
      },
      orderBy: {
        nama: "asc",
      },
    };

    if (nama) {
      option.where.nama = {
        contains: nama,
      };
    }

    const kecamatan = await prisma.kecamatan.findMany(option);

    res.status(200).json({
      code: 200,
      status: "OK",
      data: kecamatan,
    });
  } catch (error) {
    next(error);
  }
};

export const listDesaByKecamatanID = async (req, res, next) => {
  const { id } = req.params;
  const { nama } = req.query;

  try {
    const option = {
      where: {
        id_kecamatan: id,
      },
      orderBy: {
        nama: "asc",
      },
    };

    if (nama) {
      option.where.nama = {
        contains: nama,
      };
    }

    const desa = await prisma.kelurahanDesa.findMany(option);

    res.status(200).json({
      code: 200,
      status: "OK",
      data: desa,
    });
  } catch (error) {
    next(error);
  }
};
