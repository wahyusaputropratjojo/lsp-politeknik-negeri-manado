import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listAsesi = asyncHandler(async (req, res) => {
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
            user: {
              select: {
                id: true,
                nama_lengkap: true,
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
                        data_diri: {
                          select: {
                            url_profil_user: true,
                          },
                        },
                        user: {
                          select: {
                            id: true,
                            nama_lengkap: true,
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
      message: "Data List Asesi berdasarkan Asesor berhasil diperoleh",
      data: asesi,
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

  const {
    is_asesmen_mandiri,
    is_metode_pengujian,
    is_pertanyaan_lisan,
    is_pertanyaan_tertulis,
    is_portofolio,
    is_praktik_demonstrasi,
    is_punya_asesor,
    is_verifikasi_berkas,
  } = await req.body;

  try {
    const asesiSkemaSertifikasi = await prisma.asesiSkemaSertifikasi.update({
      where: {
        id,
      },
      data: {
        is_asesmen_mandiri,
        is_metode_pengujian,
        is_pertanyaan_lisan,
        is_pertanyaan_tertulis,
        is_portofolio,
        is_praktik_demonstrasi,
        is_punya_asesor,
        is_verifikasi_berkas,
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

export const getAsesiSkemaSertifikasi = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const asesiSkemaSertifikasi = await prisma.asesiSkemaSertifikasi.findUnique(
      {
        where: {
          id,
        },
        select: {
          id: true,
          is_asesmen_mandiri: true,
          is_praktik_demonstrasi: true,
          is_metode_pengujian: true,
          is_pertanyaan_lisan: true,
          is_pertanyaan_tertulis: true,
          is_portofolio: true,
          is_punya_asesor: true,
          is_verifikasi_berkas: true,
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
                },
              },
              data_diri: {
                select: {
                  alamat: {
                    select: {
                      provinsi: true,
                      kota_kabupaten: true,
                      kecamatan: true,
                      kelurahan_desa: true,
                      keterangan_lainnya: true,
                    },
                  },
                  url_profil_user: true,
                  jenis_kelamin: true,
                  kebangsaan: true,
                  kualifikasi_pendidikan: true,
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
                      provinsi: true,
                      kota_kabupaten: true,
                      kecamatan: true,
                      kelurahan_desa: true,
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
      },
    );

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Data Asesi berhasil diperoleh",
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
