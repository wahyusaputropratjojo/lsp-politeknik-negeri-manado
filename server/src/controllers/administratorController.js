import prisma from "../utils/prisma.js";

export const listAsesiByTempatUjiKompetensi = async (req, res, next) => {
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
                    created_at: true,
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
                            url_profil_user: true,
                          },
                        },
                        data_diri: {
                          select: {
                            id: true,
                            jenis_kelamin: true,
                            negara: {
                              select: {
                                nama: true,
                              },
                            },
                            kualifikasi_pendidikan: true,
                            nik: true,
                            tempat_lahir: true,
                            tanggal_lahir: true,
                            nomor_telepon: true,
                            alamat: {
                              select: {
                                provinsi: {
                                  select: {
                                    nama: true,
                                  },
                                },
                                kota_kabupaten: {
                                  select: {
                                    nama: true,
                                  },
                                },
                                kecamatan: {
                                  select: {
                                    nama: true,
                                  },
                                },
                                kelurahan_desa: {
                                  select: {
                                    nama: true,
                                  },
                                },
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
                                provinsi: {
                                  select: {
                                    nama: true,
                                  },
                                },
                                kota_kabupaten: {
                                  select: {
                                    nama: true,
                                  },
                                },
                                kecamatan: {
                                  select: {
                                    nama: true,
                                  },
                                },
                                kelurahan_desa: {
                                  select: {
                                    nama: true,
                                  },
                                },
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

    res.status(200).json({
      code: 200,
      status: "OK",
      data: asesiTempatUjiKompetensi,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const listAsesorByTempatUjiKompetensi = async (req, res, next) => {
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
    next(error);
  }
};

export const updateAsesiSkemaSertifikasi = async (req, res, next) => {
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
    next(error);
  }
};

export const createAsesorAsesi = async (req, res, next) => {
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

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Asesor seorang Asesi berhasil dibuat",
      data: asesorAsesi,
    });
  } catch (error) {
    next(error);
  }
};

export const getTempatUjiKompetensi = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tempatUjiKompetensi = await prisma.administrator.findUnique({
      where: {
        id_user: id,
      },
      select: {
        tempat_uji_kompetensi: {
          select: {
            tempat_uji_kompetensi: true,
            kode_tempat_uji_kompetensi: true,
          },
        },
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      data: tempatUjiKompetensi,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
