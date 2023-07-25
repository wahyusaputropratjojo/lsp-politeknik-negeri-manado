import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerAsesi = asyncHandler(async (req, res) => {
  const files = req.files;

  const {
    email,
    password,
    nama_lengkap,
    nik,
    tempat_lahir,
    tanggal_lahir,
    jenis_kelamin,
    kebangsaan,
    nomor_telepon,
    kualifikasi_pendidikan,
    alamat_rumah,
    nama_institusi_perusahaan,
    jabatan,
    nomor_telepon_kantor,
    email_kantor,
    fax_kantor,
    alamat_kantor,
    skema_sertifikasi: id_skema_sertifikasi,
    tujuan_asesmen: id_tujuan_asesmen,
    persyaratan_dasar,
    portofolio,
  } = await req.body;

  try {
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

    const foto_profil = await getSingleFileLink(linkFiles, "foto_profil");

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
      },
    });

    const dataDiri = await prisma.dataDiri.create({
      data: {
        nik,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        kebangsaan,
        nomor_telepon,
        kualifikasi_pendidikan,
        foto_profil,
        alamat: {
          create: {
            provinsi: alamat_rumah.provinsi,
            kota_kabupaten: alamat_rumah.kota_kabupaten,
            kecamatan: alamat_rumah.kecamatan,
            kelurahan_desa: alamat_rumah.kelurahan_desa,
            keterangan_lainnya: alamat_rumah.keterangan_lainnya,
          },
        },
      },
    });

    const dataPekerjaan = await prisma.dataPekerjaan.create({
      data: {
        nama_institusi_perusahaan,
        jabatan,
        nomor_telepon: nomor_telepon_kantor,
        email: email_kantor,
        fax: fax_kantor,
        alamat: {
          create: {
            provinsi: alamat_kantor.provinsi,
            kota_kabupaten: alamat_kantor.kota_kabupaten,
            kecamatan: alamat_kantor.kecamatan,
            kelurahan_desa: alamat_kantor.kelurahan_desa,
            keterangan_lainnya: alamat_kantor.keterangan_lainnya,
          },
        },
      },
    });

    const asesi = await prisma.asesi.create({
      data: {
        id_user: user.id,
        id_data_diri: dataDiri.id,
        id_data_pekerjaan: dataPekerjaan.id,
      },
    });

    const asesiSkemaSertifikasi = await prisma.asesiSkemaSertifikasi.create({
      data: {
        id_asesi: asesi.id,
        id_skema_sertifikasi,
        id_tujuan_asesmen,
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
                  id_asesi_skema_sertifikasi: asesiSkemaSertifikasi.id,
                },
              });
            for (const valueLink of link) {
              await prisma.fileBuktiPersyaratanDasar.create({
                data: {
                  file: valueLink,
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
                id_asesi_skema_sertifikasi: asesiSkemaSertifikasi.id,
              },
            });

            for (const valueLink of link) {
              await prisma.filePortofolio.create({
                data: {
                  file: valueLink,
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
      message: "Pendaftaran berhasil",
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
});

export const getStatusPendaftaran = asyncHandler(async (req, res) => {
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
                    gambar: true,
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
      message: "Data Status Pendaftaran berhasil didapatkan",
      data: statusPendaftaran,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      status: "Error",
      message: "Terjadi kesalahan",
    });

    console.log(error);
  }
});

export const getSkemaSertifikasiAsesi = asyncHandler(async (req, res) => {
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
      },
    );

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Data Skema Sertifikasi Asesi berhasil didapatkan",
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

export const listSkemaSertifikasiAsesi = asyncHandler(async (req, res) => {
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
                    gambar: true,
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
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Data Skema Sertifikasi Asesi berhasil didapatkan",
      data: skemaSertifikasiAsesi,
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

export const listAktivitasUnitKompetensiUntukAsesmenMandiri = asyncHandler(
  async (req, res) => {
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
                gambar: true,
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
                            kriteria: true,
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
        message: "Data Aktivitas Unit Kompetensi berhasil didapatkan",
        data: aktivitasUnitKompetensi,
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

export const createAsesmenMandiri = asyncHandler(async (req, res) => {
  const { asesmen_mandiri } = req.body;

  try {
    const asesmenMandiri = await prisma.asesmenMandiri.createMany({
      data: asesmen_mandiri,
    });

    res.status(201).json({
      code: 201,
      status: "Created",
      message: "Asesmen Mandiri berhasil dibuat",
      data: asesmenMandiri,
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

export const updateAsesiSkemaSertifikasi = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { is_asesmen_mandiri_selesai } = await req.body;

  try {
    const asesiSkemaSertifikasi = await prisma.asesiSkemaSertifikasi.update({
      where: {
        id,
      },
      data: {
        is_asesmen_mandiri_selesai,
      },
    });

    res.status(201).json({
      code: 200,
      status: "OK",
      message: "Data Asesi Skema Sertifikasi telah diperbarui",
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
