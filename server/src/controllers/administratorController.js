import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listAsesiByTempatUjiKompetensi = asyncHandler(async (req, res) => {
  const { id: id_user } = req.params;

  try {
    const asesiTempatUjiKompetensi = await prisma.administrator.findUnique({
      where: {
        id_user,
      },
      select: {
        tempat_uji_kompetensi: {
          select: {
            id: true,
            kode_tempat_uji_kompetensi: true,
            tempat_uji_kompetensi: true,
            skema_sertifikasi: {
              select: {
                id: true,
                kode_skema_sertifikasi: true,
                nama_skema_sertifikasi: true,
                asesi_skema_sertifikasi: {
                  select: {
                    id: true,
                    tujuan_asesmen: {
                      select: {
                        tujuan: true,
                      },
                    },
                    is_verifikasi_berkas: true,
                    is_punya_asesor: true,
                    asesi: {
                      select: {
                        id: true,
                        user: {
                          select: {
                            nama_lengkap: true,
                            email: true,
                          },
                        },
                        data_diri: {
                          select: {
                            id: true,
                            foto_profil: true,
                            jenis_kelamin: true,
                            kebangsaan: true,
                            kualifikasi_pendidikan: true,
                            nik: true,
                            tempat_lahir: true,
                            tanggal_lahir: true,
                            nomor_telepon: true,
                            alamat: {
                              select: {
                                provinsi: true,
                                kota_kabupaten: true,
                                kecamatan: true,
                                kelurahan_desa: true,
                                keterangan_lainnya: true,
                              },
                            },
                          },
                        },
                        data_pekerjaan: {
                          select: {
                            nama_institusi_perusahaan: true,
                            jabatan: true,
                            email: true,
                            nomor_telepon: true,
                            fax: true,
                            alamat: {
                              select: {
                                provinsi: true,
                                kota_kabupaten: true,
                                kecamatan: true,
                                kelurahan_desa: true,
                                keterangan_lainnya: true,
                              },
                            },
                          },
                        },
                      },
                    },
                    bukti_persyaratan_dasar: {
                      select: {
                        id: true,
                        file_bukti_persyaratan_dasar: true,
                        persyaratan_dasar: {
                          select: {
                            id: true,
                            persyaratan_dasar: true,
                          },
                        },
                      },
                    },
                    portofolio: {
                      select: {
                        id: true,
                        file_portofolio: true,
                        keterangan: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(201).json({
      code: 200,
      status: "OK",
      message:
        "Data Asesi berdasarkan Tempat Uji Kompetensi berhasil diperoleh",
      data: asesiTempatUjiKompetensi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      status: "Error",
      message: "Terjadi kesalahan",
    });
  }
});

export const listAsesorByTempatUjiKompetensi = asyncHandler(
  async (req, res) => {
    const { id: id_user } = req.params;

    try {
      const asesorTempatUjiKompetensi = await prisma.administrator.findUnique({
        where: {
          id_user,
        },
        select: {
          tempat_uji_kompetensi: {
            select: {
              asesor: {
                select: {
                  id: true,
                  user: {
                    select: {
                      nama_lengkap: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      res.status(201).json({
        code: 200,
        status: "OK",
        message:
          "Data Asesor berdasarkan Tempat Uji Kompetensi berhasil diperoleh",
        data: asesorTempatUjiKompetensi,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        code: 500,
        status: "Error",
        message: "Terjadi kesalahan",
      });
    }
  },
);

export const updateAsesiSkemaSertifikasi = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { is_punya_asesor, is_verifikasi_berkas } = await req.body;

  try {
    const asesiSkemaSertifikasi = await prisma.asesiSkemaSertifikasi.update({
      where: {
        id,
      },
      data: {
        is_punya_asesor,
        is_verifikasi_berkas,
      },
    });

    res.status(201).json({
      code: 200,
      status: "OK",
      message: "Status Punya Asesor telah diperbarui",
      data: asesiSkemaSertifikasi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      status: "Error",
      message: "Terjadi kesalahan",
    });
  }
});

export const createAsesorAsesi = asyncHandler(async (req, res) => {
  const { id_asesi_skema_sertifikasi, id_asesor, tanggal_pelaksanaan } =
    req.body;

  try {
    const asesorAsesi = await prisma.asesorAsesi.create({
      data: {
        id_asesi_skema_sertifikasi,
        id_asesor,
        tanggal_pelaksanaan,
      },
    });

    res.status(201).json({
      code: 200,
      status: "OK",
      message: "Asesor seorang Asesi berhasil dibuat",
      data: asesorAsesi,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      status: "Error",
      message: "Terjadi kesalahan",
    });
  }
});
