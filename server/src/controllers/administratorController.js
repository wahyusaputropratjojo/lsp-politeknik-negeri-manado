import bcrypt from "bcrypt";

import prisma from "../utils/prisma.js";

export const registerAdministrator = async (req, res, next) => {
  const files = req.files;
  const {
    email,
    id_jenis_kelamin,
    id_kebangsaan,
    id_kecamatan,
    id_kelurahan_desa,
    id_kota_kabupaten,
    id_kualifikasi_pendidikan,
    id_provinsi,
    id_tempat_uji_kompetensi,
    keterangan_lainnya,
    nama_lengkap,
    nik,
    nomor_telepon,
    password,
    tanggal_lahir,
    tempat_lahir,
  } = req.body;

  try {
    if (!email) {
      res.status(400);
      throw new Error("Email tidak boleh kosong!");
    }

    if (!id_jenis_kelamin) {
      res.status(400);
      throw new Error("Jenis kelamin tidak boleh kosong!");
    }

    if (!id_kebangsaan) {
      res.status(400);
      throw new Error("Kebangsaan tidak boleh kosong!");
    }

    if (!id_kecamatan) {
      res.status(400);
      throw new Error("Kecamatan tidak boleh kosong!");
    }

    if (!id_kelurahan_desa) {
      res.status(400);
      throw new Error("Kelurahan/Desa tidak boleh kosong!");
    }

    if (!id_kota_kabupaten) {
      res.status(400);
      throw new Error("Kota/Kabupaten tidak boleh kosong!");
    }

    if (!id_kualifikasi_pendidikan) {
      res.status(400);
      throw new Error("Kualifikasi pendidikan tidak boleh kosong!");
    }

    if (!id_provinsi) {
      res.status(400);
      throw new Error("Provinsi tidak boleh kosong!");
    }

    if (!id_tempat_uji_kompetensi) {
      res.status(400);
      throw new Error("Tempat uji kompetensi tidak boleh kosong!");
    }

    if (!keterangan_lainnya) {
      res.status(400);
      throw new Error("Keterangan lainnya tidak boleh kosong!");
    }

    if (!nama_lengkap) {
      res.status(400);
      throw new Error("Nama lengkap tidak boleh kosong!");
    }

    if (!nik) {
      res.status(400);
      throw new Error("NIK tidak boleh kosong!");
    }

    if (!nomor_telepon) {
      res.status(400);
      throw new Error("Nomor telepon tidak boleh kosong!");
    }

    if (!password) {
      res.status(400);
      throw new Error("Password tidak boleh kosong!");
    }

    if (!tanggal_lahir) {
      res.status(400);
      throw new Error("Tanggal lahir tidak boleh kosong!");
    }

    if (!tempat_lahir) {
      res.status(400);
      throw new Error("Tempat lahir tidak boleh kosong!");
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

    const url_profil_user = await getSingleFileLink(linkFiles, "profil_user");

    const emailAvailability = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailAvailability) {
      res.status(400);
      throw new Error("Email sudah digunakan!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const alamat = await prisma.alamat.create({
      data: {
        id_kecamatan,
        id_kelurahan_desa,
        id_kota_kabupaten,
        id_provinsi,
        keterangan_lainnya,
      },
    });

    const dataDiri = await prisma.dataDiri.create({
      data: {
        alamat: {
          connect: {
            id: alamat.id,
          },
        },
        nik,
        nomor_telepon,
        tanggal_lahir,
        tempat_lahir,
        jenis_kelamin: {
          connect: {
            id: id_jenis_kelamin,
          },
        },
        negara: {
          connect: {
            id: id_kebangsaan,
          },
        },
        kualifikasi_pendidikan: {
          connect: {
            id: id_kualifikasi_pendidikan,
          },
        },
      },
    });

    await prisma.user.create({
      data: {
        nama_lengkap,
        email,
        password: hashedPassword,
        role: "Administrator",
        url_profil_user,
        administrator: {
          create: {
            tempat_uji_kompetensi: {
              connect: {
                id: id_tempat_uji_kompetensi,
              },
            },
            data_diri: {
              connect: {
                id: dataDiri.id,
              },
            },
          },
        },
      },
    });

    res.status(201).json({
      code: 201,
      status: "Created",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

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
                    is_evaluasi_asesi_selesai: true,
                    is_berkas_memenuhi_syarat: true,
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

  const {
    is_punya_asesor,
    is_verifikasi_berkas,
    is_tidak_kompeten,
    is_berkas_memenuhi_syarat,
  } = await req.body;

  try {
    await prisma.asesiSkemaSertifikasi.update({
      where: {
        id,
      },
      data: {
        is_punya_asesor,
        is_verifikasi_berkas,
        is_tidak_kompeten,
        is_berkas_memenuhi_syarat,
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
                is_tersedia: true,
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

export const deleteSkemaSertifikasi = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.skemaSertifikasi.delete({
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
  }
};
