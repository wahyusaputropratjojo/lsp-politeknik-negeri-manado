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
            id: true,
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

export const listSkemaSertifikasi = async (req, res, next) => {
  const { id } = req.params;

  try {
    const skemaSertifikasi = await prisma.administrator.findUnique({
      where: {
        id_user: id,
      },
      select: {
        id: true,
        tempat_uji_kompetensi: {
          select: {
            id: true,
            skema_sertifikasi: {
              select: {
                id: true,
                kode_skema_sertifikasi: true,
                nama_skema_sertifikasi: true,
                url_profil_skema_sertifikasi: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      data: skemaSertifikasi,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const createSkemaSertifikasi = async (req, res, next) => {
  const files = req.files;
  const {
    id_tempat_uji_kompetensi,
    kode_skema_sertifikasi,
    nama_skema_sertifikasi,
    unit_kompetensi,
  } = req.body;
  try {
    console.log(files);
    if (Object.keys(req.body).length === 0) {
      res.status(400);
      throw new Error("Data yang dikirim kosong");
    }

    if (!kode_skema_sertifikasi || kode_skema_sertifikasi === null) {
      res.status(400);
      throw new Error("Kode skema sertifikasi tidak boleh kosong");
    }

    if (!nama_skema_sertifikasi || nama_skema_sertifikasi === null) {
      res.status(400);
      throw new Error("Nama skema sertifikasi tidak boleh kosong");
    }

    if (!unit_kompetensi || unit_kompetensi.length === 0) {
      res.status(400);
      throw new Error("Unit kompetensi tidak boleh kosong");
    }

    const generateLinkArray = async (array, req) => {
      const linkMap = {};

      for (const item of array) {
        const link = `${req.protocol}://${req.get("host")}/uploads/${
          item.filename
        }`;
        const fieldname = item.fieldname.replace(/\[\]$/, "");

        if (linkMap[fieldname]) {
          linkMap[fieldname].push(link);
        } else {
          linkMap[fieldname] = [link];
        }
      }

      const newArray = Object.entries(linkMap).map(([fieldname, links]) => ({
        fieldname,
        link: links,
      }));

      return newArray;
    };

    const getSingleFileLink = async (linkFiles, fieldName) => {
      let fieldValue;

      for (const link of linkFiles) {
        const { fieldname, link: links } = link;

        if (fieldname === fieldName) {
          fieldValue = links[0];
          break;
        }
      }
      return fieldValue;
    };

    const linkFiles = await generateLinkArray(files, req);

    const url_profil_skema_sertifikasi = await getSingleFileLink(
      linkFiles,
      "profil_skema_sertifikasi"
    );

    await prisma.skemaSertifikasi.create({
      data: {
        kode_skema_sertifikasi,
        nama_skema_sertifikasi,
        url_profil_skema_sertifikasi,
        tempat_uji_kompetensi: {
          connect: {
            id: id_tempat_uji_kompetensi,
          },
        },
        unit_kompetensi: {
          createMany: {
            data: unit_kompetensi,
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
