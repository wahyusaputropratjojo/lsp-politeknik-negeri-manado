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
          is_pertanyaan_lisan: true,
          is_pertanyaan_observasi_selesai: true,
          is_pertanyaan_tertulis_esai_selesai: true,
          is_pertanyaan_tertulis_pilihan_ganda_selesai: true,
          is_pertanyaan_tertulis: true,
          is_portofolio: true,
          is_praktik_demonstrasi_selesai: true,
          is_praktik_demonstrasi: true,
          is_proyek_terkait_pekerjaan_selesai: true,
          is_punya_asesor: true,
          is_verifikasi_berkas: true,
          is_verifikasi_portofolio_selesai: true,
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
