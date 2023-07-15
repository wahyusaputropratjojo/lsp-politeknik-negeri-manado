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
  } = req.body;

  // const generateLinkArray = (array, req) => {
  //   const linkMap = {};

  //   array.forEach((item) => {
  //     const link = `${req.protocol}://${req.get("host")}/uploads/${
  //       item.filename
  //     }`;
  //     const fieldname = item.fieldname.replace(/\[\]$/, "");

  //     if (linkMap[fieldname]) {
  //       linkMap[fieldname].push(link);
  //     } else {
  //       linkMap[fieldname] = [link];
  //     }
  //   });

  //   const newArray = Object.entries(linkMap).map(([fieldname, links]) => ({
  //     fieldname,
  //     link: links,
  //   }));

  //   return newArray;
  // };

  const generateLinkArray = (array, req) => {
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

  // Fungsi ini membutuhkan array yang sudah diolah oleh fungsi generateLinkArray
  const getSingleFileLink = (linkFiles, fieldName) => {
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

  const linkFiles = generateLinkArray(files, req); // Link File Array

  const foto_profil = getSingleFileLink(linkFiles, "foto_profil");

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
});
