import bcrypt from "bcrypt";

import prisma from "../utils/prisma.js";

export const registerAsesor = async (req, res, next) => {
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
        role: "Asesor",
        url_profil_user,
        asesor: {
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

export const listSkemaSertifikasi = async (req, res, next) => {
  const { id } = req.params;

  try {
    const skemaSertifikasi = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        asesor: {
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

export const listAsesi = async (req, res, next) => {
  const { id } = req.params;

  try {
    const asesi = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        asesor: {
          select: {
            tempat_uji_kompetensi: {
              select: {
                tempat_uji_kompetensi: true,
              },
            },
            user: {
              select: {
                id: true,
                nama_lengkap: true,
                url_profil_user: true,
                email: true,
                created_at: true,
              },
            },
            asesor_asesi: {
              select: {
                id: true,
                tanggal_pelaksanaan: true,
                asesi_skema_sertifikasi: {
                  select: {
                    id: true,
                    id_asesi: true,
                    created_at: true,
                    is_asesmen_mandiri_selesai: true,
                    is_asesmen_mandiri: true,
                    is_evaluasi_asesi_selesai: true,
                    is_evaluasi_pertanyaan_tertulis_esai_selesai: true,
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
                    is_kompeten: true,
                    is_tidak_kompeten: true,
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
                        tempat_uji_kompetensi: {
                          select: {
                            id: true,
                            kode_tempat_uji_kompetensi: true,
                            tempat_uji_kompetensi: true,
                          },
                        },
                      },
                    },
                    asesi: {
                      select: {
                        id: true,
                        user: {
                          select: {
                            id: true,
                            nama_lengkap: true,
                            url_profil_user: true,
                            email: true,
                            created_at: true,
                          },
                        },
                        data_diri: {
                          select: {
                            id: true,
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
                            alamat: {
                              select: {
                                id: true,
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
                            nik: true,
                            negara: {
                              select: {
                                nama: true,
                              },
                            },
                            tanggal_lahir: true,
                            tempat_lahir: true,
                            nomor_telepon: true,
                          },
                        },
                        data_pekerjaan: {
                          select: {
                            id: true,
                            email: true,
                            jabatan: true,
                            nama_institusi_perusahaan: true,
                            nomor_telepon: true,
                            fax: true,
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

    if (!asesi || asesi.length === 0) {
      res.status(404);
      throw new Error("Data Asesi tidak ditemukan");
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      data: asesi,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const updateAsesiSkemaSertifikasi = async (req, res, next) => {
  const { id } = req.params;

  const {
    is_asesmen_mandiri_selesai,
    is_asesmen_mandiri,
    is_evaluasi_asesi_selesai,
    is_kompeten,
    is_metode_pengujian,
    is_observasi_aktivitas_tempat_kerja_selesai,
    is_pertanyaan_lisan_selesai,
    is_pertanyaan_lisan,
    is_pertanyaan_observasi_selesai,
    is_pertanyaan_tertulis_esai_selesai,
    is_pertanyaan_tertulis_pilihan_ganda_selesai,
    is_pertanyaan_tertulis,
    is_portofolio,
    is_praktik_demonstrasi_selesai,
    is_praktik_demonstrasi,
    is_punya_asesor,
    is_tidak_kompeten,
    is_verifikasi_berkas,
    is_verifikasi_portofolio_selesai,
  } = req.body;

  try {
    await prisma.asesiSkemaSertifikasi.update({
      where: {
        id,
      },
      data: {
        is_asesmen_mandiri_selesai,
        is_asesmen_mandiri,
        is_evaluasi_asesi_selesai,
        is_kompeten,
        is_metode_pengujian,
        is_observasi_aktivitas_tempat_kerja_selesai,
        is_pertanyaan_lisan_selesai,
        is_pertanyaan_lisan,
        is_pertanyaan_observasi_selesai,
        is_pertanyaan_tertulis_esai_selesai,
        is_pertanyaan_tertulis_pilihan_ganda_selesai,
        is_pertanyaan_tertulis,
        is_portofolio,
        is_praktik_demonstrasi_selesai,
        is_praktik_demonstrasi,
        is_punya_asesor,
        is_tidak_kompeten,
        is_verifikasi_berkas,
        is_verifikasi_portofolio_selesai,
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAsesiSkemaSertifikasi = async (req, res, next) => {
  const { id } = req.params;

  try {
    const asesiSkemaSertifikasi = await prisma.asesiSkemaSertifikasi.findUnique(
      {
        where: {
          id,
        },
        select: {
          id: true,
          is_asesmen_mandiri_selesai: true,
          is_asesmen_mandiri: true,
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
          is_evaluasi_pertanyaan_tertulis_esai_selesai: true,
          is_evaluasi_asesi_selesai: true,
          is_tidak_kompeten: true,
          is_berkas_memenuhi_syarat: true,
          is_kompeten: true,
          asesi_jawaban_pertanyaan_tertulis_esai: {
            select: {
              id: true,
              jawaban: true,
              pertanyaan_tertulis_esai: {
                select: {
                  id: true,
                  pertanyaan: true,
                  jawaban: true,
                },
              },
            },
          },
          skema_sertifikasi: {
            select: {
              id: true,
              url_profil_skema_sertifikasi: true,
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
                    },
                  },
                  pertanyaan_tertulis_pilihan_ganda: {
                    select: {
                      id: true,
                      pertanyaan: true,
                      jawaban_pertanyaan_tertulis_pilihan_ganda: {
                        select: {
                          id: true,
                          jawaban: true,
                          is_benar: true,
                        },
                      },
                    },
                  },
                  pertanyaan_tertulis_esai: {
                    select: {
                      id: true,
                      pertanyaan: true,
                      jawaban: true,
                      asesi_jawaban_pertanyaan_tertulis_esai: {
                        where: {
                          id_asesi_skema_sertifikasi: id,
                        },
                        select: {
                          id: true,
                          jawaban: true,
                        },
                      },
                    },
                  },
                  pertanyaan_observasi: {
                    select: {
                      id: true,
                      pertanyaan: true,
                    },
                  },
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
                  proyek_terkait_pekerjaan: {
                    select: {
                      id: true,
                      persiapan: true,
                      demonstrasi: true,
                    },
                  },
                },
              },
            },
          },
          tujuan_asesmen: {
            select: {
              id: true,
              tujuan: true,
            },
          },
          portofolio: {
            select: {
              id: true,
              keterangan: true,
              file_portofolio: {
                select: {
                  id: true,
                  url_file_portofolio: true,
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
                  email: true,
                  url_profil_user: true,
                },
              },
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
                  negara: {
                    select: {
                      nama: true,
                    },
                  },
                  kualifikasi_pendidikan: {
                    select: {
                      kualifikasi_pendidikan: true,
                    },
                  },
                  nik: true,
                  nomor_telepon: true,
                  tanggal_lahir: true,
                  tempat_lahir: true,
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
            },
          },
        },
      }
    );

    if (!asesiSkemaSertifikasi) {
      res.sendStatus(204);
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      data: asesiSkemaSertifikasi,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getTempatUjiKompetensi = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tempatUjiKompetensi = await prisma.asesor.findUnique({
      where: {
        id_user: id,
      },
      select: {
        tempat_uji_kompetensi: {
          select: {
            kode_tempat_uji_kompetensi: true,
            tempat_uji_kompetensi: true,
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

export const getProfilePicture = async (req, res, next) => {
  const { id, id_user } = req.params;

  try {
    const profilePicture = await prisma.asesi.findUnique({
      where: {
        id_user: id,
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
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

export const createAsesorObservasiAktivitasTempatKerja = async (
  req,
  res,
  next
) => {
  const {
    id_asesi_skema_sertifikasi,
    is_observasi_aktivitas_tempat_kerja_selesai,
    observasi_aktivitas_tempat_kerja,
  } = req.body;

  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400);
      throw new Error("Data yang dikirim kosong");
    }

    if (observasi_aktivitas_tempat_kerja.length === 0) {
      res.status(400);
      throw new Error(
        "Data Observasi Aktivitas Tempat Kerja yang dikirim tidak boleh kosong"
      );
    }

    if (!is_observasi_aktivitas_tempat_kerja_selesai) {
      res.status(400);
      throw new Error(
        "Status Observasi Aktivitas Tempat Kerja harus bernilai true"
      );
    }

    if (!id_asesi_skema_sertifikasi) {
      res.status(400);
      throw new Error("ID Asesi Skema Sertifikasi harus disertakan");
    }

    await prisma.asesorObservasiAktivitasTempatKerja.createMany({
      data: observasi_aktivitas_tempat_kerja,
    });

    await prisma.asesiSkemaSertifikasi.update({
      where: {
        id: id_asesi_skema_sertifikasi,
      },
      data: {
        is_observasi_aktivitas_tempat_kerja_selesai,
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

export const createAsesorPertanyaanObservasi = async (req, res, next) => {
  const {
    id_asesi_skema_sertifikasi,
    is_pertanyaan_observasi_selesai,
    pertanyaan_observasi,
  } = req.body;
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400);
      throw new Error("Data yang dikirim kosong");
    }

    if (!id_asesi_skema_sertifikasi) {
      res.status(400);
      throw new Error("ID Asesi Skema Sertifikasi harus disertakan");
    }

    if (!is_pertanyaan_observasi_selesai) {
      res.status(400);
      throw new Error("Status Pertanyaan Observasi harus bernilai true");
    }

    if (!pertanyaan_observasi || pertanyaan_observasi.length === 0) {
      res.status(400);
      throw new Error(
        "Data Pertanyaan Observasi yang dikirim tidak boleh kosong"
      );
    }

    await prisma.asesorPertanyaanObservasi.createMany({
      data: pertanyaan_observasi,
    });

    await prisma.asesiSkemaSertifikasi.update({
      where: {
        id: id_asesi_skema_sertifikasi,
      },
      data: {
        is_pertanyaan_observasi_selesai,
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

export const createAsesorPertanyaanLisan = async (req, res, next) => {
  const {
    id_asesi_skema_sertifikasi,
    is_pertanyaan_lisan_selesai,
    pertanyaan_lisan,
  } = req.body;

  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400);
      throw new Error("Data yang dikirim kosong");
    }

    if (!id_asesi_skema_sertifikasi) {
      res.status(400);
      throw new Error("ID Asesi Skema Sertifikasi harus disertakan");
    }

    if (!is_pertanyaan_lisan_selesai) {
      res.status(400);
      throw new Error("Status Pertanyaan Lisan harus bernilai true");
    }

    if (!pertanyaan_lisan || pertanyaan_lisan.length === 0) {
      res.status(400);
      throw new Error("Data Pertanyaan Lisan yang dikirim tidak boleh kosong");
    }

    await prisma.asesorPertanyaanLisan.createMany({
      data: pertanyaan_lisan,
    });

    await prisma.asesiSkemaSertifikasi.update({
      where: {
        id: id_asesi_skema_sertifikasi,
      },
      data: {
        is_pertanyaan_lisan_selesai,
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

export const createAsesorVerifikasiPortofolio = async (req, res, next) => {
  const {
    id_asesi_skema_sertifikasi,
    is_verifikasi_portofolio_selesai,
    verifikasi_portofolio,
  } = req.body;

  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400);
      throw new Error("Data yang dikirim kosong");
    }

    if (!id_asesi_skema_sertifikasi) {
      res.status(400);
      throw new Error("ID Asesi Skema Sertifikasi harus disertakan");
    }

    if (!is_verifikasi_portofolio_selesai) {
      res.status(400);
      throw new Error("Status Verifikasi Portofolio harus bernilai true");
    }

    if (!verifikasi_portofolio || verifikasi_portofolio.length === 0) {
      res.status(400);
      throw new Error(
        "Data Verifikasi Portofolio yang dikirim tidak boleh kosong"
      );
    }

    await prisma.asesorVerifikasiPortofolio.createMany({
      data: verifikasi_portofolio,
    });

    await prisma.asesiSkemaSertifikasi.update({
      where: {
        id: id_asesi_skema_sertifikasi,
      },
      data: {
        is_verifikasi_portofolio_selesai,
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

export const createAsesorProyekTerkaitPekerjaan = async (req, res, next) => {
  const {
    id_asesi_skema_sertifikasi,
    is_proyek_terkait_pekerjaan_selesai,
    proyek_terkait_pekerjaan,
  } = req.body;

  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400);
      throw new Error("Data yang dikirim kosong");
    }

    if (!id_asesi_skema_sertifikasi) {
      res.status(400);
      throw new Error("ID Asesi Skema Sertifikasi harus disertakan");
    }

    if (!is_proyek_terkait_pekerjaan_selesai) {
      res.status(400);
      throw new Error("Status Proyek Terkait Pekerjaan harus bernilai true");
    }

    if (!proyek_terkait_pekerjaan || proyek_terkait_pekerjaan.length === 0) {
      res.status(400);
      throw new Error(
        "Data Proyek Terkait Pekerjaan yang dikirim tidak boleh kosong"
      );
    }

    await prisma.asesorProyekTerkaitPekerjaan.createMany({
      data: proyek_terkait_pekerjaan,
    });

    await prisma.asesiSkemaSertifikasi.update({
      where: {
        id: id_asesi_skema_sertifikasi,
      },
      data: {
        is_proyek_terkait_pekerjaan_selesai,
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

export const updateEvaluasiPertanyaanTertulisEsai = async (req, res, next) => {
  const {
    id_asesi_skema_sertifikasi,
    is_evaluasi_pertanyaan_tertulis_esai_selesai,
    evaluasi_pertanyaan_tertulis_esai,
  } = req.body;

  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400);
      throw new Error("Data yang dikirim kosong");
    }

    if (evaluasi_pertanyaan_tertulis_esai.length === 0) {
      res.status(400);
      throw new Error(
        "Data Evaluasi Pertanyaan Tertulis Esai yang dikirim tidak boleh kosong"
      );
    }

    for (const item of evaluasi_pertanyaan_tertulis_esai) {
      await prisma.asesiJawabanPertanyaanTertulisEsai.update({
        where: {
          id: item.id_jawaban_pertanyaan_tertulis_esai,
        },
        data: {
          is_kompeten: item.is_kompeten,
        },
      });
    }

    await prisma.asesiSkemaSertifikasi.update({
      where: {
        id: id_asesi_skema_sertifikasi,
      },
      data: {
        is_evaluasi_pertanyaan_tertulis_esai_selesai,
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
