import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSkemaSertifikasi = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const skemaSertifikasi = await prisma.skemaSertifikasi.findUnique({
    where: {
      id,
    },
    include: {
      unit_kompetensi: {
        include: {
          aktivitas_unit_kompetensi: {
            include: {
              kriteria_unjuk_kerja: true,
            },
          },
          pertanyaan_tertulis: {
            include: {
              jawaban_pertanyaan_tertulis: true,
            },
          },
          pertanyaan_esai: true,
          pertanyaan_lisan: true,
        },
      },
    },
  });

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Berhasil mendapatkan data skema sertifikasi",
    data: {
      ...skemaSertifikasi,
    },
  });
});

export const listSkemaSertifikasi = asyncHandler(async (req, res) => {
  const skemaSertifikasi = await prisma.skemaSertifikasi.findMany();

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Berhasil mendapatkan data skema sertifikasi",
    data: [...skemaSertifikasi],
  });
});

export const createSkemaSertifikasi = asyncHandler(async (req, res) => {
  const { kode, nama } = req.body;

  const skemaSertifikasi = await prisma.skemaSertifikasi.create({
    data: {
      kode,
      nama,
    },
  });

  res.status(201).json({
    code: 201,
    status: "Created",
    message: "Skema Sertifikasi berhasil dibuat",
    data: {
      ...skemaSertifikasi,
    },
  });
});

export const createSkemaSertifikasiWithAllRelated = async (req, res) => {
  const { kode_skema_sertifikasi, nama_skema_sertifikasi, unit_kompetensi } =
    req.body;

  try {
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

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Berhasil memperbarui data skema sertifikasi",
      data: {
        ...skemaSertifikasi,
      },
    });
  } catch (error) {
    console.error("Error creating SkemaSertifikasi:", error);
    res.status(500).json({
      code: 500,
      status: "Error",
      message: "Terjadi kesalahan saat memperbarui data skema sertifikasi",
      error: error.message,
    });
  }
};

export const updateSkemaSertifikasi = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { kode, nama } = req.body;

  const skemaSertifikasi = await prisma.skemaSertifikasi.update({
    where: {
      id,
    },
    data: {
      kode,
      nama,
    },
  });

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Berhasil memperbarui data skema sertifikasi",
    data: {
      ...skemaSertifikasi,
    },
  });
});

export const deleteSkemaSertifikasi = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.skemaSertifikasi.delete({
    where: {
      id,
    },
  });

  res.status(200).json({
    code: 200,
    status: "Ok",
    message: "Berhasil menghapus data skema sertifikasi",
  });
});
