import bcrypt from "bcrypt";

import prisma from "../utils/prisma.js";

export const registerAsesi = async (req, res, next) => {
  const files = req.files;

  const {
    alamat_kantor,
    alamat_rumah,
    email_kantor,
    email,
    fax_kantor,
    id_jenis_kelamin,
    id_kebangsaan,
    id_kualifikasi_pendidikan,
    id_skema_sertifikasi,
    id_tujuan_asesmen,
    jabatan,
    nama_institusi_perusahaan,
    nama_lengkap,
    nik,
    nomor_telepon_kantor,
    nomor_telepon,
    password,
    persyaratan_dasar,
    portofolio,
    tanggal_lahir,
    tempat_lahir,
  } = req.body;

  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400);
      throw new Error("Data yang dikirim kosong");
    }

    if (Object.keys(alamat_kantor).length === 0) {
      res.status(400);
      throw new Error("Alamat kantor tidak boleh kosong!");
    }

    if (Object.keys(alamat_rumah).length === 0) {
      res.status(400);
      throw new Error("Alamat kantor tidak boleh kosong!");
    }

    if (!email_kantor) {
      res.status(400);
      throw new Error("Email kantor tidak boleh kosong!");
    }

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

    if (!id_kualifikasi_pendidikan) {
      res.status(400);
      throw new Error("Kualifikasi pendidikan tidak boleh kosong!");
    }

    if (!id_skema_sertifikasi) {
      res.status(400);
      throw new Error("Skema sertifikasi tidak boleh kosong!");
    }

    if (!id_tujuan_asesmen) {
      res.status(400);
      throw new Error("Tujuan asesmen tidak boleh kosong!");
    }

    if (!jabatan) {
      res.status(400);
      throw new Error("Jabatan tidak boleh kosong!");
    }

    if (!nama_institusi_perusahaan) {
      res.status(400);
      throw new Error("Nama institusi perusahaan tidak boleh kosong!");
    }

    if (!nama_lengkap) {
      res.status(400);
      throw new Error("Nama lengkap tidak boleh kosong!");
    }

    if (!nik) {
      res.status(400);
      throw new Error("NIK tidak boleh kosong!");
    }

    if (!nomor_telepon_kantor) {
      res.status(400);
      throw new Error("Nomor telepon kantor tidak boleh kosong!");
    }

    if (!nomor_telepon) {
      res.status(400);
      throw new Error("Nomor telepon tidak boleh kosong!");
    }

    if (!password) {
      res.status(400);
      throw new Error("Password tidak boleh kosong!");
    }

    if (persyaratan_dasar.length === 0) {
      res.status(400);
      throw new Error("Persyaratan dasar tidak boleh kosong!");
    }

    if (portofolio.length === 0) {
      res.status(400);
      throw new Error("Portofolio tidak boleh kosong!");
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

    const user = await prisma.user.create({
      data: {
        nama_lengkap,
        email,
        password: hashedPassword,
        url_profil_user,
        asesi: {
          create: {
            data_diri: {
              create: {
                nik,
                nomor_telepon,
                tanggal_lahir,
                tempat_lahir,
                jenis_kelamin: {
                  connect: {
                    id: id_jenis_kelamin,
                  },
                },
                kualifikasi_pendidikan: {
                  connect: {
                    id: id_kualifikasi_pendidikan,
                  },
                },
                negara: {
                  connect: {
                    id: id_kebangsaan,
                  },
                },
                alamat: {
                  create: {
                    provinsi: {
                      connect: {
                        id: alamat_rumah?.id_provinsi,
                      },
                    },
                    kota_kabupaten: {
                      connect: {
                        id: alamat_rumah?.id_kota_kabupaten,
                      },
                    },
                    kecamatan: {
                      connect: {
                        id: alamat_rumah?.id_kecamatan,
                      },
                    },
                    kelurahan_desa: {
                      connect: {
                        id: alamat_rumah?.id_kelurahan_desa,
                      },
                    },
                    keterangan_lainnya: alamat_rumah?.keterangan_lainnya,
                  },
                },
              },
            },
            data_pekerjaan: {
              create: {
                email: email_kantor,
                fax: fax_kantor,
                jabatan,
                nama_institusi_perusahaan,
                nomor_telepon: nomor_telepon_kantor,
                alamat: {
                  create: {
                    provinsi: {
                      connect: {
                        id: alamat_kantor?.id_provinsi,
                      },
                    },
                    kota_kabupaten: {
                      connect: {
                        id: alamat_kantor?.id_kota_kabupaten,
                      },
                    },
                    kecamatan: {
                      connect: {
                        id: alamat_kantor?.id_kecamatan,
                      },
                    },
                    kelurahan_desa: {
                      connect: {
                        id: alamat_kantor?.id_kelurahan_desa,
                      },
                    },
                    keterangan_lainnya: alamat_kantor?.keterangan_lainnya,
                  },
                },
              },
            },
            asesi_skema_sertifikasi: {
              create: {
                skema_sertifikasi: {
                  connect: {
                    id: id_skema_sertifikasi,
                  },
                },
                tujuan_asesmen: {
                  connect: {
                    id: id_tujuan_asesmen,
                  },
                },
              },
            },
          },
        },
      },
      select: {
        asesi: {
          select: {
            asesi_skema_sertifikasi: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    for (const [index, valuePersyaratanDasar] of persyaratan_dasar.entries()) {
      const { id_persyaratan_dasar } = valuePersyaratanDasar;

      const propertyName = `persyaratan_dasar[${index}]`;

      for (const valueLinkFiles of linkFiles) {
        const { fieldname, link } = valueLinkFiles;

        if (fieldname === propertyName) {
          try {
            const buktiPersyaratanDasar =
              await prisma.buktiPersyaratanDasar.create({
                data: {
                  id_persyaratan_dasar,
                  id_asesi_skema_sertifikasi:
                    user?.asesi?.asesi_skema_sertifikasi[0]?.id,
                },
              });
            for (const valueLink of link) {
              await prisma.fileBuktiPersyaratanDasar.create({
                data: {
                  url_file_bukti_persyaratan_dasar: valueLink,
                  id_bukti_persyaratan_dasar: buktiPersyaratanDasar.id,
                },
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    for (const [index, valuePortofolio] of portofolio.entries()) {
      const { keterangan } = valuePortofolio;

      const propertyName = `portofolio[${index}]`;

      for (const valueLinkFiles of linkFiles) {
        const { fieldname, link } = valueLinkFiles;

        if (fieldname === propertyName) {
          try {
            const portofolio = await prisma.portofolio.create({
              data: {
                keterangan,
                id_asesi_skema_sertifikasi:
                  user?.asesi?.asesi_skema_sertifikasi[0]?.id,
              },
            });

            for (const valueLink of link) {
              await prisma.filePortofolio.create({
                data: {
                  url_file_portofolio: valueLink,
                  id_portofolio: portofolio.id,
                },
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    res.status(201).json({
      code: 201,
      status: "Created",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const registerAsesiSkemaSertifikasi = async (req, res, next) => {
  const files = req.files;

  const {
    id_asesi,
    id_skema_sertifikasi,
    id_tujuan_asesmen,
    persyaratan_dasar,
    portofolio,
  } = req.body;

  try {
    if (!id_skema_sertifikasi) {
      res.status(400);
      throw new Error("Skema sertifikasi tidak boleh kosong!");
    }

    if (!id_tujuan_asesmen) {
      res.status(400);
      throw new Error("Tujuan asesmen tidak boleh kosong!");
    }

    if (persyaratan_dasar.length === 0) {
      res.status(400);
      throw new Error("Persyaratan dasar tidak boleh kosong!");
    }

    if (portofolio.length === 0) {
      res.status(400);
      throw new Error("Portofolio tidak boleh kosong!");
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

    const asesiSkemaSertifikasi = await prisma.asesiSkemaSertifikasi.create({
      data: {
        asesi: {
          connect: {
            id: id_asesi,
          },
        },
        skema_sertifikasi: {
          connect: {
            id: id_skema_sertifikasi,
          },
        },
        tujuan_asesmen: {
          connect: {
            id: id_tujuan_asesmen,
          },
        },
      },
    });

    for (const [index, valuePersyaratanDasar] of persyaratan_dasar.entries()) {
      const { id_persyaratan_dasar } = valuePersyaratanDasar;

      const propertyName = `persyaratan_dasar[${index}]`;

      for (const valueLinkFiles of linkFiles) {
        const { fieldname, link } = valueLinkFiles;

        if (fieldname === propertyName) {
          try {
            const buktiPersyaratanDasar =
              await prisma.buktiPersyaratanDasar.create({
                data: {
                  id_persyaratan_dasar,
                  id_asesi_skema_sertifikasi: asesiSkemaSertifikasi?.id,
                },
              });
            for (const valueLink of link) {
              await prisma.fileBuktiPersyaratanDasar.create({
                data: {
                  url_file_bukti_persyaratan_dasar: valueLink,
                  id_bukti_persyaratan_dasar: buktiPersyaratanDasar.id,
                },
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    for (const [index, valuePortofolio] of portofolio.entries()) {
      const { keterangan } = valuePortofolio;

      const propertyName = `portofolio[${index}]`;

      for (const valueLinkFiles of linkFiles) {
        const { fieldname, link } = valueLinkFiles;

        if (fieldname === propertyName) {
          try {
            const portofolio = await prisma.portofolio.create({
              data: {
                keterangan,
                id_asesi_skema_sertifikasi: asesiSkemaSertifikasi?.id,
              },
            });

            for (const valueLink of link) {
              await prisma.filePortofolio.create({
                data: {
                  url_file_portofolio: valueLink,
                  id_portofolio: portofolio.id,
                },
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    res.status(201).json({
      code: 201,
      status: "Created",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getFRAPL01 = async (req, res, next) => {
  const { id } = req.params;

  try {
    const FRAPL01 = await prisma.asesiSkemaSertifikasi.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        created_at: true,
        tujuan_asesmen: {
          select: {
            tujuan: true,
          },
        },
        skema_sertifikasi: {
          select: {
            id: true,
            kode_skema_sertifikasi: true,
            nama_skema_sertifikasi: true,
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
        },
        bukti_persyaratan_dasar: {
          select: {
            persyaratan_dasar: {
              select: {
                persyaratan_dasar: true,
              },
            },
          },
        },
        asesi: {
          select: {
            data_diri: {
              select: {
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
                jenis_kelamin: {
                  select: {
                    jenis_kelamin: true,
                  },
                },
                kualifikasi_pendidikan: {
                  select: {
                    kualifikasi_pendidikan: true,
                  },
                },
                negara: {
                  select: {
                    nama: true,
                  },
                },
                nik: true,
                nomor_telepon: true,
                tanggal_lahir: true,
                tempat_lahir: true,
                created_at: true,
              },
            },
            data_pekerjaan: {
              select: {
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
                email: true,
                fax: true,
                jabatan: true,
                nama_institusi_perusahaan: true,
                nomor_telepon: true,
              },
            },
            user: {
              select: {
                nama_lengkap: true,
                email: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      data: FRAPL01,
    });
  } catch (error) {
    next(error);
  }
};

export const getFRAPL02 = async (req, res, next) => {
  const { id } = req.params;

  try {
    const FRAPL02 = await prisma.asesiSkemaSertifikasi.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        skema_sertifikasi: {
          select: {
            id: true,
            kode_skema_sertifikasi: true,
            nama_skema_sertifikasi: true,
            unit_kompetensi: {
              orderBy: {
                kode_unit_kompetensi: "asc",
              },
              select: {
                id: true,
                kode_unit_kompetensi: true,
                nama_unit_kompetensi: true,
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
                    asesmen_mandiri: {
                      select: {
                        is_kompeten: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        asesi: {
          select: {
            id: true,
            user: {
              select: {
                nama_lengkap: true,
              },
            },
          },
        },
        asesor_asesi: {
          select: {
            tanggal_pelaksanaan: true,
            asesor: {
              select: {
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

    res.status(200).json({
      code: 200,
      status: "OK",
      data: FRAPL02,
    });
  } catch (error) {
    next(error);
  }
};

export const getFRIA01 = async (req, res, next) => {
  const { id } = req.params;

  try {
    const FRIA01 = await prisma.asesiSkemaSertifikasi.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        skema_sertifikasi: {
          select: {
            id: true,
            kode_skema_sertifikasi: true,
            nama_skema_sertifikasi: true,
            unit_kompetensi: {
              orderBy: {
                kode_unit_kompetensi: "asc",
              },
              select: {
                id: true,
                kode_unit_kompetensi: true,
                nama_unit_kompetensi: true,
                aktivitas_unit_kompetensi: {
                  select: {
                    id: true,
                    elemen: true,
                    asesor_observasi_aktivitas_tempat_kerja: {
                      select: {
                        is_kompeten: true,
                      },
                    },
                    kriteria_unjuk_kerja: {
                      select: {
                        id: true,
                        kriteria_unjuk_kerja: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        asesi: {
          select: {
            id: true,
            user: {
              select: {
                nama_lengkap: true,
              },
            },
          },
        },
        asesor_asesi: {
          select: {
            tanggal_pelaksanaan: true,
            asesor: {
              select: {
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

    res.status(200).json({
      code: 200,
      status: "OK",
      data: FRIA01,
    });
  } catch (error) {
    next(error);
  }
};

export const getFRIA02 = async (req, res, next) => {
  const { id } = req.params;

  try {
    const FRIA02 = await prisma.asesiSkemaSertifikasi.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        skema_sertifikasi: {
          select: {
            id: true,
            kode_skema_sertifikasi: true,
            nama_skema_sertifikasi: true,
            unit_kompetensi: {
              orderBy: {
                kode_unit_kompetensi: "asc",
              },
              select: {
                id: true,
                kode_unit_kompetensi: true,
                nama_unit_kompetensi: true,
                tugas_praktik_demonstrasi: {
                  select: {
                    id: true,
                    skenario: true,
                    langkah_kerja_tugas_praktik_demonstrasi: {
                      select: {
                        id: true,
                        langkah_kerja: true,
                        instruksi_kerja_tugas_praktik_demonstrasi: {
                          select: {
                            id: true,
                            instruksi_kerja: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        asesi: {
          select: {
            id: true,
            user: {
              select: {
                nama_lengkap: true,
              },
            },
          },
        },
        asesor_asesi: {
          select: {
            tanggal_pelaksanaan: true,
            asesor: {
              select: {
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

    res.status(200).json({
      code: 200,
      status: "OK",
      data: FRIA02,
    });
  } catch (error) {
    next(error);
  }
};

export const getFRIA03 = async (req, res, next) => {
  const { id } = req.params;

  try {
    const FRIA02 = await prisma.asesiSkemaSertifikasi.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        skema_sertifikasi: {
          select: {
            id: true,
            kode_skema_sertifikasi: true,
            nama_skema_sertifikasi: true,
            unit_kompetensi: {
              orderBy: {
                kode_unit_kompetensi: "asc",
              },
              select: {
                id: true,
                kode_unit_kompetensi: true,
                nama_unit_kompetensi: true,
                pertanyaan_observasi: {
                  select: {
                    id: true,
                    pertanyaan: true,
                    asesor_pertanyaan_observasi: {
                      select: {
                        id: true,
                        is_kompeten: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        asesi: {
          select: {
            id: true,
            user: {
              select: {
                nama_lengkap: true,
              },
            },
          },
        },
        asesor_asesi: {
          select: {
            tanggal_pelaksanaan: true,
            asesor: {
              select: {
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

    res.status(200).json({
      code: 200,
      status: "OK",
      data: FRIA02,
    });
  } catch (error) {
    next(error);
  }
};

export const getFRIA04 = async (req, res, next) => {
  const { id } = req.params;

  try {
    const FRIA04 = await prisma.asesiSkemaSertifikasi.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        skema_sertifikasi: {
          select: {
            id: true,
            kode_skema_sertifikasi: true,
            nama_skema_sertifikasi: true,
            unit_kompetensi: {
              orderBy: {
                kode_unit_kompetensi: "asc",
              },
              select: {
                id: true,
                kode_unit_kompetensi: true,
                nama_unit_kompetensi: true,
                proyek_terkait_pekerjaan: {
                  select: {
                    id: true,
                    demonstrasi: true,
                    persiapan: true,
                    asesor_proyek_terkait_pekerjaan: {
                      select: {
                        id: true,
                        umpan_balik_asesi: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        asesi: {
          select: {
            id: true,
            user: {
              select: {
                nama_lengkap: true,
              },
            },
          },
        },
        asesor_asesi: {
          select: {
            tanggal_pelaksanaan: true,
            asesor: {
              select: {
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

    res.status(200).json({
      code: 200,
      status: "OK",
      data: FRIA04,
    });
  } catch (error) {
    next(error);
  }
};

export const getFRIA05 = async (req, res, next) => {
  const { id } = req.params;

  try {
    const FRIA05 = await prisma.asesiSkemaSertifikasi.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        skema_sertifikasi: {
          select: {
            id: true,
            kode_skema_sertifikasi: true,
            nama_skema_sertifikasi: true,
            unit_kompetensi: {
              orderBy: {
                kode_unit_kompetensi: "asc",
              },
              select: {
                id: true,
                kode_unit_kompetensi: true,
                nama_unit_kompetensi: true,
                pertanyaan_tertulis_pilihan_ganda: {
                  select: {
                    id: true,
                    pertanyaan: true,
                    jawaban_pertanyaan_tertulis_pilihan_ganda: {
                      select: {
                        id: true,
                        jawaban: true,
                        is_benar: true,
                        asesi_jawaban_pertanyaan_tertulis_pilihan_ganda: {
                          select: {
                            id: true,
                            id_jawaban_pertanyaan_tertulis_pilihan_ganda: true,
                            is_benar: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        asesi: {
          select: {
            id: true,
            user: {
              select: {
                nama_lengkap: true,
              },
            },
          },
        },
        asesor_asesi: {
          select: {
            tanggal_pelaksanaan: true,
            asesor: {
              select: {
                user: {
                  select: {
                    nama_lengkap: true,
                  },
                },
              },
            },
          },
        },
        asesi_jawaban_pertanyaan_tertulis_pilihan_ganda: {
          select: {
            id: true,
            is_benar: true,
            jawaban_pertanyaan_tertulis_pilihan_ganda: {
              select: {
                id: true,
                jawaban: true,
                is_benar: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      data: FRIA05,
    });
  } catch (error) {
    next(error);
  }
};

export const getFRIA06 = async (req, res, next) => {
  const { id } = req.params;

  try {
    const FRIA06 = await prisma.asesiSkemaSertifikasi.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        skema_sertifikasi: {
          select: {
            id: true,
            kode_skema_sertifikasi: true,
            nama_skema_sertifikasi: true,
            unit_kompetensi: {
              orderBy: {
                kode_unit_kompetensi: "asc",
              },
              select: {
                id: true,
                kode_unit_kompetensi: true,
                nama_unit_kompetensi: true,
                pertanyaan_tertulis_esai: {
                  select: {
                    id: true,
                    pertanyaan: true,
                    jawaban: true,
                    asesi_jawaban_pertanyaan_tertulis_esai: {
                      select: {
                        id: true,
                        jawaban: true,
                        is_kompeten: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        asesi: {
          select: {
            id: true,
            user: {
              select: {
                nama_lengkap: true,
              },
            },
          },
        },
        asesor_asesi: {
          select: {
            tanggal_pelaksanaan: true,
            asesor: {
              select: {
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

    res.status(200).json({
      code: 200,
      status: "OK",
      data: FRIA06,
    });
  } catch (error) {
    next(error);
  }
};

export const getFRIA07 = async (req, res, next) => {
  const { id } = req.params;

  try {
    const FRIA07 = await prisma.asesiSkemaSertifikasi.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        skema_sertifikasi: {
          select: {
            id: true,
            kode_skema_sertifikasi: true,
            nama_skema_sertifikasi: true,
            unit_kompetensi: {
              orderBy: {
                kode_unit_kompetensi: "asc",
              },
              select: {
                id: true,
                kode_unit_kompetensi: true,
                nama_unit_kompetensi: true,
                pertanyaan_lisan: {
                  select: {
                    id: true,
                    pertanyaan: true,
                    jawaban: true,
                    asesor_pertanyaan_lisan: {
                      select: {
                        id: true,
                        jawaban_asesi: true,
                        is_kompeten: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        asesi: {
          select: {
            id: true,
            user: {
              select: {
                nama_lengkap: true,
              },
            },
          },
        },
        asesor_asesi: {
          select: {
            id: true,
            tanggal_pelaksanaan: true,
            asesor: {
              select: {
                user: {
                  select: {
                    nama_lengkap: true,
                  },
                },
              },
            },
          },
        },
        created_at: true,
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      data: FRIA07,
    });
  } catch (error) {
    next(error);
  }
};

export const getFRIA08 = async (req, res, next) => {
  const { id } = req.params;

  try {
    const FRIA08 = await prisma.asesiSkemaSertifikasi.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        skema_sertifikasi: {
          select: {
            id: true,
            kode_skema_sertifikasi: true,
            nama_skema_sertifikasi: true,
            // unit_kompetensi: {
            //   orderBy: {
            //     kode_unit_kompetensi: "asc",
            //   },
            //   select: {
            //     id: true,
            //     kode_unit_kompetensi: true,
            //     nama_unit_kompetensi: true,
            //     pertanyaan_lisan: {
            //       select: {
            //         id: true,
            //         pertanyaan: true,
            //         jawaban: true,
            //         asesor_pertanyaan_lisan: {
            //           select: {
            //             id: true,
            //             jawaban_asesi: true,
            //             is_kompeten: true,
            //           },
            //         },
            //       },
            //     },
            //   },
            // },
          },
        },
        portofolio: {
          select: {
            id: true,
            keterangan: true,
            asesor_verifikasi_portofolio: {
              select: {
                id: true,
                is_asli: true,
                is_memadai: true,
                is_terkini: true,
                is_valid: true,
              },
            },
          },
        },
        asesi: {
          select: {
            id: true,
            user: {
              select: {
                nama_lengkap: true,
              },
            },
          },
        },
        asesor_asesi: {
          select: {
            tanggal_pelaksanaan: true,
            asesor: {
              select: {
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

    res.status(200).json({
      code: 200,
      status: "OK",
      data: FRIA08,
    });
  } catch (error) {
    next(error);
  }
};

export const getStatusPendaftaran = async (req, res, next) => {
  const { id } = req.params;

  try {
    const statusPendaftaran = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        asesi: {
          select: {
            asesi_skema_sertifikasi: {
              select: {
                id: true,
                is_verifikasi_berkas: true,
                is_punya_asesor: true,
                is_berkas_memenuhi_syarat: true,
                tujuan_asesmen: {
                  select: {
                    tujuan: true,
                  },
                },
                skema_sertifikasi: {
                  select: {
                    url_profil_skema_sertifikasi: true,
                    kode_skema_sertifikasi: true,
                    nama_skema_sertifikasi: true,
                    tempat_uji_kompetensi: {
                      select: {
                        kode_tempat_uji_kompetensi: true,
                        tempat_uji_kompetensi: true,
                      },
                    },
                  },
                },
                asesor_asesi: {
                  select: {
                    asesor: {
                      select: {
                        data_diri: {
                          select: {
                            nomor_telepon: true,
                          },
                        },
                        user: {
                          select: {
                            nama_lengkap: true,
                          },
                        },
                      },
                    },
                    tanggal_pelaksanaan: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(201).json({
      code: 201,
      status: "Created",
      data: statusPendaftaran,
    });
  } catch (error) {
    next(error);
  }
};

export const getSkemaSertifikasiAsesi = async (req, res, next) => {
  const { id } = req.params;

  try {
    const asesiSkemaSertifikasi = await prisma.asesiSkemaSertifikasi.findUnique(
      {
        where: {
          id,
        },
        select: {
          is_asesmen_mandiri_selesai: true,
        },
      }
    );

    res.status(200).json({
      code: 200,
      status: "OK",
      data: asesiSkemaSertifikasi,
    });
  } catch (error) {
    next(error);
  }
};

export const getStatusSkemaSertifikasiAsesi = async (req, res, next) => {
  const { id } = req.params;

  try {
    const statusAsesiSkemaSertifikasi =
      await prisma.asesiSkemaSertifikasi.findUnique({
        where: {
          id,
        },
        select: {
          is_asesmen_mandiri_selesai: true,
          is_asesmen_mandiri: true,
          is_evaluasi_asesi_selesai: true,
          is_metode_pengujian: true,
          is_observasi_aktivitas_tempat_kerja_selesai: true,
          is_pertanyaan_lisan_selesai: true,
          is_pertanyaan_observasi_selesai: true,
          is_pertanyaan_tertulis_esai_selesai: true,
          is_pertanyaan_tertulis_pilihan_ganda_selesai: true,
          is_portofolio: true,
          is_praktik_demonstrasi_selesai: true,
          is_praktik_demonstrasi: true,
          is_proyek_terkait_pekerjaan_selesai: true,
          is_punya_asesor: true,
          is_verifikasi_berkas: true,
          is_verifikasi_portofolio_selesai: true,
          is_berkas_memenuhi_syarat: true,
          is_evaluasi_pertanyaan_tertulis_esai_selesai: true,
          is_kompeten: true,
          is_tidak_kompeten: true,
          is_wawancara: true,
          is_uji_tertulis: true,
        },
      });

    if (!statusAsesiSkemaSertifikasi) {
      res.status(404);
      throw new Error("Status Skema Setifikasi Asesi tidak ditemukan");
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      data: statusAsesiSkemaSertifikasi,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const getAsesi = async (req, res, next) => {
  const { id } = req.params;

  try {
    const dataAsesi = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        asesi: {
          select: {
            id: true,
          },
        },
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      data: dataAsesi,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getKompetensiAsesmenMandiri = async (req, res, next) => {
  const { id } = req.params;

  try {
    const kompetensiAsesmenMandiri =
      await prisma.asesiSkemaSertifikasi.findUnique({
        where: {
          id,
        },
        select: {
          asesmen_mandiri: {
            select: {
              is_kompeten: true,
            },
          },
          skema_sertifikasi: {
            select: {
              unit_kompetensi: {
                select: {
                  aktivitas_unit_kompetensi: {
                    select: {
                      elemen: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

    const unitKompetensiArray =
      kompetensiAsesmenMandiri.skema_sertifikasi.unit_kompetensi;

    const asesmenMandiriArray = kompetensiAsesmenMandiri.asesmen_mandiri;

    const totalElemen = unitKompetensiArray.reduce((totalCount, unit) => {
      return totalCount + unit.aktivitas_unit_kompetensi.length;
    }, 0);

    const totalKompeten = asesmenMandiriArray.reduce((total, item) => {
      if (item.is_kompeten === true) {
        total += 1;
      }
      return total;
    }, 0);

    res.status(200).json({
      code: 200,
      status: "OK",
      data: {
        total_kompeten: totalKompeten,
        total_elemen: totalElemen,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getKompetensiObservasiTempatKerja = async (req, res, next) => {
  const { id } = req.params;
  try {
    const kompetensiObservasiTempatKerja =
      await prisma.asesiSkemaSertifikasi.findUnique({
        where: { id },
        select: {
          asesor_observasi_aktivitas_tempat_kerja: {
            select: {
              is_kompeten: true,
            },
          },
          skema_sertifikasi: {
            select: {
              nama_skema_sertifikasi: true,
              unit_kompetensi: {
                select: {
                  aktivitas_unit_kompetensi: {
                    select: {
                      elemen: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

    const unitKompetensiArray =
      kompetensiObservasiTempatKerja?.skema_sertifikasi?.unit_kompetensi;

    const totalElemen = unitKompetensiArray.reduce((totalCount, unit) => {
      totalCount += unit.aktivitas_unit_kompetensi.length;
      return totalCount;
    }, 0);

    const kompetenArray =
      kompetensiObservasiTempatKerja.asesor_observasi_aktivitas_tempat_kerja.filter(
        (item) => item.is_kompeten === true
      );

    const totalKompeten = kompetenArray.length;

    res.status(200).json({
      code: 200,
      status: "OK",
      data: {
        total_kompeten: totalKompeten,
        total_elemen: totalElemen,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getKompetensiPertanyaanObservasi = async (req, res, next) => {
  const { id } = req.params;

  try {
    const kompetensiPertanyaanObservasi =
      await prisma.asesiSkemaSertifikasi.findUnique({
        where: {
          id,
        },
        select: {
          skema_sertifikasi: {
            select: {
              unit_kompetensi: {
                select: {
                  pertanyaan_observasi: {
                    select: {
                      pertanyaan: true,
                    },
                  },
                },
              },
            },
          },
          asesor_pertanyaan_observasi: {
            select: {
              is_kompeten: true,
            },
          },
        },
      });

    const asesorPertanyaanObservasiArray =
      kompetensiPertanyaanObservasi.asesor_pertanyaan_observasi;

    const unitKompetensiArray =
      kompetensiPertanyaanObservasi.skema_sertifikasi.unit_kompetensi;

    const totalPertanyaanObservasiTrue = asesorPertanyaanObservasiArray.reduce(
      (totalCount, item) => {
        if (item.is_kompeten === true) {
          totalCount++;
        }
        return totalCount;
      },
      0
    );

    const totalPertanyaanObservasi = unitKompetensiArray.reduce(
      (totalCount, unit) => {
        unit.pertanyaan_observasi.forEach((pertanyaan) => {
          totalCount += pertanyaan.pertanyaan ? 1 : 0;
        });
        return totalCount;
      },
      0
    );

    res.status(200).json({
      code: 200,
      status: "OK",
      data: {
        total_kompeten: totalPertanyaanObservasiTrue,
        total_pertanyaan_observasi: totalPertanyaanObservasi,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getKompetensiPertanyaanTertulisPilihanGanda = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  try {
    const kompetensiPertanyaanTertulisPilihanGanda =
      await prisma.asesiSkemaSertifikasi.findUnique({
        where: {
          id,
        },
        select: {
          asesi_jawaban_pertanyaan_tertulis_pilihan_ganda: {
            select: {
              is_benar: true,
              jawaban_pertanyaan_tertulis_pilihan_ganda: {
                select: {
                  is_benar: true,
                },
              },
            },
          },
          skema_sertifikasi: {
            select: {
              unit_kompetensi: {
                select: {
                  pertanyaan_tertulis_pilihan_ganda: {
                    select: {
                      pertanyaan: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

    const unitKompetensiArray =
      kompetensiPertanyaanTertulisPilihanGanda.skema_sertifikasi
        .unit_kompetensi;

    const asesiJawabanArray =
      kompetensiPertanyaanTertulisPilihanGanda.asesi_jawaban_pertanyaan_tertulis_pilihan_ganda;

    const totalPertanyaanCount = unitKompetensiArray.reduce(
      (totalCount, unit) => {
        totalCount += unit.pertanyaan_tertulis_pilihan_ganda.length;
        return totalCount;
      },
      0
    );

    const totalKompeten = asesiJawabanArray.reduce((totalCount, item) => {
      if (
        item.is_benar &&
        item.jawaban_pertanyaan_tertulis_pilihan_ganda.is_benar
      ) {
        totalCount++;
      }
      return totalCount;
    }, 0);

    res.status(200).json({
      code: 200,
      status: "OK",
      data: {
        total_kompeten: totalKompeten,
        total_pertanyaan_tertulis_pilihan_ganda: totalPertanyaanCount,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getKompetensiPertanyaanTertulisEsai = async (req, res, next) => {
  const { id } = req.params;

  try {
    const kompetensiPertanyaanTertulisEsai =
      await prisma.asesiSkemaSertifikasi.findUnique({
        where: {
          id,
        },
        select: {
          skema_sertifikasi: {
            select: {
              unit_kompetensi: {
                select: {
                  pertanyaan_tertulis_esai: {
                    select: {
                      pertanyaan: true,
                    },
                  },
                },
              },
            },
          },
          asesi_jawaban_pertanyaan_tertulis_esai: {
            select: {
              is_kompeten: true,
            },
          },
        },
      });

    const unitKompetensiArray =
      kompetensiPertanyaanTertulisEsai.skema_sertifikasi.unit_kompetensi;

    const asesiJawabanArray =
      kompetensiPertanyaanTertulisEsai.asesi_jawaban_pertanyaan_tertulis_esai;

    const totalPertanyaan = unitKompetensiArray.reduce((totalCount, unit) => {
      totalCount += unit.pertanyaan_tertulis_esai.length;
      return totalCount;
    }, 0);

    const totalKompeten = asesiJawabanArray.reduce((totalCount, item) => {
      if (item.is_kompeten === true) {
        totalCount++;
      }
      return totalCount;
    }, 0);

    res.status(200).json({
      code: 200,
      status: "OK",
      data: {
        total_kompeten: totalKompeten,
        total_pertanyaan_tertulis_esai: totalPertanyaan,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getKompetensiPertanyaanLisan = async (req, res, next) => {
  const { id } = req.params;

  try {
    const kompetensiPertanyaanLisan =
      await prisma.asesiSkemaSertifikasi.findUnique({
        where: {
          id,
        },
        select: {
          skema_sertifikasi: {
            select: {
              unit_kompetensi: {
                select: {
                  pertanyaan_lisan: {
                    select: {
                      pertanyaan: true,
                    },
                  },
                },
              },
            },
          },
          asesor_pertanyaan_lisan: {
            select: {
              is_kompeten: true,
            },
          },
        },
      });

    const unitKompetensiArray =
      kompetensiPertanyaanLisan.skema_sertifikasi.unit_kompetensi;

    const asesorPertanyaanObservasiArray =
      kompetensiPertanyaanLisan.asesor_pertanyaan_lisan;

    const totalPertanyaan = unitKompetensiArray.reduce((totalCount, unit) => {
      totalCount += unit.pertanyaan_lisan.length;
      return totalCount;
    }, 0);

    const totalKompeten = asesorPertanyaanObservasiArray.reduce(
      (totalCount, item) => {
        if (item.is_kompeten === true) {
          totalCount++;
        }
        return totalCount;
      },
      0
    );

    res.status(200).json({
      code: 200,
      status: "OK",
      data: {
        total_kompeten: totalKompeten,
        total_pertanyaan_lisan: totalPertanyaan,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getKompetensiPortofolio = async (req, res, next) => {
  const { id } = req.params;
  try {
    const kompetensiPortofolio = await prisma.asesiSkemaSertifikasi.findUnique({
      where: {
        id,
      },
      select: {
        portofolio: {
          select: {
            keterangan: true,
            asesor_verifikasi_portofolio: {
              select: {
                is_valid: true,
                is_asli: true,
                is_terkini: true,
                is_memadai: true,
              },
            },
          },
        },
      },
    });

    const portofolioArray = kompetensiPortofolio.portofolio;

    const totalPortofolio = portofolioArray.length;
    let totalIsValid = 0;
    let totalIsAsli = 0;
    let totalIsTerkini = 0;
    let totalIsMemadai = 0;

    portofolioArray.forEach((item) => {
      item.asesor_verifikasi_portofolio.forEach((verifikasi) => {
        if (verifikasi.is_valid === true) {
          totalIsValid++;
        }
        if (verifikasi.is_asli === true) {
          totalIsAsli++;
        }
        if (verifikasi.is_terkini === true) {
          totalIsTerkini++;
        }
        if (verifikasi.is_memadai === true) {
          totalIsMemadai++;
        }
      });
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      data: {
        total_portofolio: totalPortofolio,
        total_is_valid: totalIsValid,
        total_is_asli: totalIsAsli,
        total_is_terkini: totalIsTerkini,
        total_is_memadai: totalIsMemadai,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const listSkemaSertifikasiAsesi = async (req, res, next) => {
  const { id } = req.params;

  try {
    const skemaSertifikasiAsesi = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        asesi: {
          select: {
            asesi_skema_sertifikasi: {
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
                tujuan_asesmen: {
                  select: {
                    id: true,
                    tujuan: true,
                  },
                },
                is_verifikasi_berkas: true,
                is_punya_asesor: true,
                is_asesmen_mandiri: true,
                is_asesmen_mandiri_selesai: true,
                is_evaluasi_asesi_selesai: true,
                is_kompeten: true,
                is_tidak_kompeten: true,
                is_berkas_memenuhi_syarat: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      data: skemaSertifikasiAsesi,
    });
  } catch (error) {
    next(error);
  }
};

export const listAktivitasUnitKompetensiUntukAsesmenMandiri = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    const aktivitasUnitKompetensi =
      await prisma.asesiSkemaSertifikasi.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          tujuan_asesmen: {
            select: {
              id: true,
              tujuan: true,
            },
          },
          skema_sertifikasi: {
            select: {
              id: true,
              kode_skema_sertifikasi: true,
              nama_skema_sertifikasi: true,
              url_profil_skema_sertifikasi: true,
              unit_kompetensi: {
                orderBy: {
                  kode_unit_kompetensi: "asc",
                },
                select: {
                  id: true,
                  kode_unit_kompetensi: true,
                  nama_unit_kompetensi: true,
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
    console.log(error);
    next(error);
  }
};

export const listTugasPraktikDemonstrasi = async (req, res, next) => {
  const { id } = req.params;

  try {
    const tugasPraktikDemonstrasi =
      await prisma.asesiSkemaSertifikasi.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          skema_sertifikasi: {
            select: {
              id: true,
              kode_skema_sertifikasi: true,
              nama_skema_sertifikasi: true,
              unit_kompetensi: {
                orderBy: {
                  kode_unit_kompetensi: "asc",
                },
                select: {
                  id: true,
                  kode_unit_kompetensi: true,
                  nama_unit_kompetensi: true,
                  tugas_praktik_demonstrasi: {
                    select: {
                      id: true,
                      skenario: true,
                      langkah_kerja_tugas_praktik_demonstrasi: {
                        select: {
                          id: true,
                          langkah_kerja: true,
                          instruksi_kerja_tugas_praktik_demonstrasi: {
                            select: {
                              id: true,
                              instruksi_kerja: true,
                            },
                          },
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
      data: tugasPraktikDemonstrasi,
    });
  } catch (error) {
    next(error);
  }
};

export const listPertanyaanTertulisEsai = async (req, res, next) => {
  const { id } = req.params;

  try {
    const pertanyaanTertulisEsai =
      await prisma.asesiSkemaSertifikasi.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          skema_sertifikasi: {
            select: {
              id: true,
              kode_skema_sertifikasi: true,
              nama_skema_sertifikasi: true,
              unit_kompetensi: {
                orderBy: {
                  kode_unit_kompetensi: "asc",
                },
                select: {
                  id: true,
                  kode_unit_kompetensi: true,
                  nama_unit_kompetensi: true,
                  pertanyaan_tertulis_esai: {
                    select: {
                      id: true,
                      pertanyaan: true,
                      jawaban: true,
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
      data: pertanyaanTertulisEsai,
    });
  } catch (error) {
    next(error);
  }
};

export const listPertanyaanTertulisPilihanGanda = async (req, res, next) => {
  const { id } = req.params;

  try {
    const pertanyaanTertulisPilihanGanda =
      await prisma.asesiSkemaSertifikasi.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          skema_sertifikasi: {
            select: {
              id: true,
              kode_skema_sertifikasi: true,
              nama_skema_sertifikasi: true,
              unit_kompetensi: {
                orderBy: {
                  kode_unit_kompetensi: "asc",
                },
                select: {
                  id: true,
                  kode_unit_kompetensi: true,
                  nama_unit_kompetensi: true,
                  pertanyaan_tertulis_pilihan_ganda: {
                    select: {
                      id: true,
                      pertanyaan: true,
                      jawaban_pertanyaan_tertulis_pilihan_ganda: {
                        select: {
                          id: true,
                          jawaban: true,
                          is_benar: true,
                          asesi_jawaban_pertanyaan_tertulis_pilihan_ganda: {
                            select: {
                              is_benar: true,
                            },
                          },
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
      data: pertanyaanTertulisPilihanGanda,
    });
  } catch (error) {
    next(error);
  }
};

export const createJawabanPertanyaanTertulisPilihanGanda = async (
  req,
  res,
  next
) => {
  const { jawaban } = req.body;

  try {
    await prisma.asesiJawabanPertanyaanTertulisPilihanGanda.createMany({
      data: jawaban,
      skipDuplicates: true,
    });

    res.status(201).json({
      code: 201,
      status: "Created",
    });
  } catch (error) {
    next(error);
  }
};

export const createJawabanPertanyaanTertulisEsai = async (req, res, next) => {
  const { jawaban } = req.body;

  try {
    if (!!jawaban && jawaban.length > 0) {
      await prisma.asesiJawabanPertanyaanTertulisEsai.createMany({
        data: jawaban,
        skipDuplicates: true,
      });

      res.status(201).json({
        code: 201,
        status: "Created",
      });
    } else {
      res.status(201).json({
        code: 201,
        status: "Created",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createAsesmenMandiri = async (req, res, next) => {
  const { asesmen_mandiri } = req.body;

  try {
    await prisma.asesmenMandiri.createMany({
      data: asesmen_mandiri,
    });

    res.status(201).json({
      code: 201,
      status: "Created",
    });
  } catch (error) {
    next(error);
  }
};

export const updateAsesiSkemaSertifikasi = async (req, res, next) => {
  const { id } = req.params;

  const {
    is_asesmen_mandiri_selesai,
    is_pertanyaan_lisan_selesai,
    is_pertanyaan_tertulis_esai_selesai,
    is_pertanyaan_tertulis_pilihan_ganda_selesai,
    is_praktik_demonstrasi_selesai,
  } = await req.body;

  try {
    await prisma.asesiSkemaSertifikasi.update({
      where: {
        id,
      },
      data: {
        is_asesmen_mandiri_selesai,
        is_pertanyaan_lisan_selesai,
        is_pertanyaan_tertulis_esai_selesai,
        is_pertanyaan_tertulis_pilihan_ganda_selesai,
        is_praktik_demonstrasi_selesai,
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
