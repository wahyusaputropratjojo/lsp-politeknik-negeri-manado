import prisma from "../utils/prisma.js";

export const getSkemaSertifikasi = async (req, res, next) => {
  const { id } = req.params;

  try {
    const skemaSertifikasi = await prisma.skemaSertifikasi.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        kode_skema_sertifikasi: true,
        nama_skema_sertifikasi: true,
        url_profil_skema_sertifikasi: true,
        is_tersedia: true,
        unit_kompetensi: {
          orderBy: {
            kode_unit_kompetensi: "asc",
          },
          select: {
            id: true,
            kode_unit_kompetensi: true,
            nama_unit_kompetensi: true,
          },
        },
      },
    });

    if (skemaSertifikasi.length === 0) {
      res.status(404);
      throw new Error("Skema Sertifikasi tidak ditemukan");
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      data: skemaSertifikasi,
    });
  } catch (error) {
    next(error);
  }
};

export const listSkemaSertifikasi = async (req, res, next) => {
  try {
    const skemaSertifikasi = await prisma.skemaSertifikasi.findMany({
      orderBy: {
        nama_skema_sertifikasi: "asc",
      },
      select: {
        id: true,
        kode_skema_sertifikasi: true,
        nama_skema_sertifikasi: true,
        url_profil_skema_sertifikasi: true,
        is_tersedia: true,
      },
    });

    if (skemaSertifikasi.length === 0) {
      res.sendStatus(204);
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      data: skemaSertifikasi,
    });
  } catch (error) {
    next(error);
  }
};

export const listTujuanAsesmen = async (req, res, next) => {
  try {
    const tujuanAsesmen = await prisma.tujuanAsesmen.findMany({
      orderBy: {
        tujuan: "asc",
      },
    });

    if (tujuanAsesmen.length === 0) {
      res.sendStatus(204);
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      data: tujuanAsesmen,
    });
  } catch (error) {
    next(error);
  }
};

export const createSkemaSertifikasi = async (req, res, next) => {
  const { kode, nama } = req.body;

  try {
    if (!kode) {
      res.status(400);
      throw new Error("Kode tidak boleh kosong!");
    }

    if (!nama) {
      res.status(400);
      throw new Error("Nama tidak boleh kosong!");
    }

    await prisma.skemaSertifikasi.create({
      data: {
        kode,
        nama,
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

export const createSkemaSertifikasiWithAllRelated = async (req, res, next) => {
  const { kode_skema_sertifikasi, nama_skema_sertifikasi, unit_kompetensi } =
    req.body;

  try {
    if (!kode_skema_sertifikasi) {
      res.status(400);
      throw new Error("Kode skema sertifikasi tidak boleh kosong!");
    }

    if (!nama_skema_sertifikasi) {
      res.status(400);
      throw new Error("Nama skema sertifikasi tidak boleh kosong!");
    }

    if (!unit_kompetensi) {
      res.status(400);
      throw new Error("Unit kompetensi tidak boleh kosong!");
    }

    const skemaSertifikasi = await prisma.skemaSertifikasi.create({
      data: {
        kode_skema_sertifikasi,
        nama_skema_sertifikasi,
      },
    });

    for (const unitKompetensiData of unit_kompetensi) {
      const {
        kode_unit_kompetensi,
        nama_unit_kompetensi,
        aktivitas_unit_kompetensi,
        pertanyaan_tertulis,
        pertanyaan_esai,
        pertanyaan_lisan,
        pertanyaan_observasi,
      } = unitKompetensiData;

      const unitKompetensi = await prisma.unitKompetensi.create({
        data: {
          kode_unit_kompetensi,
          nama_unit_kompetensi,
          skema_sertifikasi: { connect: { id: skemaSertifikasi.id } },
        },
      });

      for (const aktivitasUnitKompetensiData of aktivitas_unit_kompetensi) {
        const { elemen, kriteria_unjuk_kerja } = aktivitasUnitKompetensiData;

        const aktivitasUnitKompetensi =
          await prisma.aktivitasUnitKompetensi.create({
            data: {
              elemen,
              unit_kompetensi: { connect: { id: unitKompetensi.id } },
            },
          });

        for (const kriteriaUnjukKerjaData of kriteria_unjuk_kerja) {
          const { kriteria_unjuk_kerja } = kriteriaUnjukKerjaData;
          await prisma.kriteriaUnjukKerja.create({
            data: {
              kriteria: kriteria_unjuk_kerja,
              aktivitas_unit_kompetensi: {
                connect: { id: aktivitasUnitKompetensi.id },
              },
            },
          });
        }
      }

      for (const pertanyaanTertulisData of pertanyaan_tertulis) {
        const { pertanyaan, jawaban_pertanyaan_tertulis } =
          pertanyaanTertulisData;

        const pertanyaanTertulis = await prisma.pertanyaanTertulis.create({
          data: {
            pertanyaan,
            unit_kompetensi: { connect: { id: unitKompetensi.id } },
          },
        });

        for (const jawabanPertanyaanTertulisData of jawaban_pertanyaan_tertulis) {
          const { jawaban, benar } = jawabanPertanyaanTertulisData;

          await prisma.jawabanPertanyaanTertulis.create({
            data: {
              jawaban,
              benar,
              pertanyaan_tertulis: { connect: { id: pertanyaanTertulis.id } },
            },
          });
        }
      }

      for (const pertanyaanEsaiData of pertanyaan_esai) {
        const { pertanyaan, jawaban } = pertanyaanEsaiData;

        await prisma.pertanyaanEsai.create({
          data: {
            pertanyaan,
            jawaban,
            unit_kompetensi: { connect: { id: unitKompetensi.id } },
          },
        });
      }

      for (const pertanyaanLisanData of pertanyaan_lisan) {
        const { pertanyaan, jawaban } = pertanyaanLisanData;

        await prisma.pertanyaanLisan.create({
          data: {
            pertanyaan,
            jawaban,
            unit_kompetensi: { connect: { id: unitKompetensi.id } },
          },
        });
      }

      for (const pertanyaanObservasiData of pertanyaan_observasi) {
        const { pertanyaan } = pertanyaanObservasiData;

        await prisma.pertanyaanObservasi.create({
          data: {
            pertanyaan,
            unit_kompetensi: { connect: { id: unitKompetensi.id } },
          },
        });
      }
    }

    res.status(201).json({
      code: 201,
      status: "Created",
    });
  } catch (error) {
    next(error);
  }
};

export const updateSkemaSertifikasi = async (req, res, next) => {
  const { id } = req.params;
  const { kode, nama, is_tersedia } = req.body;

  try {
    await prisma.skemaSertifikasi.update({
      where: {
        id,
      },
      data: {
        kode,
        nama,
        is_tersedia,
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

export const deleteSkemaSertifikasi = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400);
      throw new Error("ID tidak boleh kosong!");
    }

    await prisma.skemaSertifikasi.delete({
      where: {
        id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
