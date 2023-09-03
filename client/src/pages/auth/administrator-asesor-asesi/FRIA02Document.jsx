import React, { useState, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "../../../utils/axios";

export const FRIA02Document = forwardRef((props, ref) => {
  const [asesiSkemaSertifikasiData, setAsesiSkemaSertifikasiData] = useState();

  useQuery({
    queryKey: ["FRIA02Document", props.id],
    queryFn: async () => {
      return await axios.get(`asesi/${props.id}/fr-ia-02`);
    },
    onSuccess: (data) => {
      setAsesiSkemaSertifikasiData(data.data.data);
      // console.log(data.data.data);
    },
  });

  const setStyles = () => {
    return `@page { 
      margin: ${"1.5cm"} !important;
    }`;
  };

  if (!!asesiSkemaSertifikasiData) {
    const {
      id,
      skema_sertifikasi: {
        kode_skema_sertifikasi: kodeSkemaSertifikasi,
        nama_skema_sertifikasi: namaSkemaSertifikasi,
        unit_kompetensi: unitKompetensi,
      },
      asesi: {
        user: { nama_lengkap: namaLengkapAsesi },
      },
      asesor_asesi: asesorAsesi,
    } = asesiSkemaSertifikasiData;

    const dateCreatedAt = new Date(asesorAsesi[0]?.tanggal_pelaksanaan);
    const tanggalPelaksanaan = dateCreatedAt.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <div ref={ref} className="bg-white text-sm">
        <style>{setStyles()}</style>
        <p className="mb-4 text-base font-bold uppercase">FR.IA.02. Tugas Praktik Demonstrasi</p>
        <div className="mb-4">
          <table className="w-full table-auto border-collapse border border-black">
            <tbody>
              <tr>
                <td rowSpan={2} className="w-0 border-collapse border border-black px-4">
                  Skema Sertifikasi (KKNI/Okupasi/Klaster)
                </td>
                <td className="w-0 border-collapse border border-black px-4">Judul</td>
                <td className="w-0 border-collapse border border-black text-center">:</td>
                <td className="border-collapse border border-black px-4">{namaSkemaSertifikasi}</td>
              </tr>
              <tr>
                <td className="w-min border-collapse border border-black px-4">Nomor</td>
                <td className="w-min border-collapse border border-black text-center">:</td>
                <td className="w-min border-collapse border border-black px-4">
                  {kodeSkemaSertifikasi}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="w-0 border-collapse border border-black px-4">
                  TUK
                </td>
                <td className="w-0 border-collapse border border-black px-2">:</td>
                <td className="border-collapse border border-black px-4">
                  Sewaktu / Tempat Kerja / Mandiri<sup>*</sup>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="w-0 border-collapse border border-black px-4">
                  Nama Asesor
                </td>
                <td className="w-0 border-collapse border border-black px-2">:</td>
                <td className="border-collapse border border-black px-4">
                  {asesorAsesi[0].asesor.user.nama_lengkap}
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="w-0 border-collapse border border-black px-4">
                  Nama Asesi
                </td>
                <td className="w-0 border-collapse border border-black px-2">:</td>
                <td className="border-collapse border border-black px-4">{namaLengkapAsesi}</td>
              </tr>
              <tr>
                <td colSpan={2} className="w-0 border-collapse border border-black px-4">
                  Tanggal
                </td>
                <td className="w-0 border-collapse border border-black px-2">:</td>
                <td className="border-collapse border border-black px-4">{tanggalPelaksanaan}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <sup>*</sup>
            Coret yang tidak perlu
          </p>
        </div>
        <div className="flex flex-col">
          {!!unitKompetensi &&
            unitKompetensi.map((value) => {
              // console.log(value);
              const {
                id,
                kode_unit_kompetensi: kodeUnitKompetensi,
                nama_unit_kompetensi: namaUnitKompetensi,
                tugas_praktik_demonstrasi: tugasPraktikDemonstrasi,
              } = value;

              return (
                <React.Fragment key={id}>
                  <table className="mb-4 w-full table-auto border-collapse border border-black">
                    <tbody>
                      <tr>
                        <td rowSpan={2} className="w-40 border-collapse border border-black px-4">
                          Unit Kompetensi
                        </td>
                        <td className="w-28 border-collapse border border-black px-4">Kode Unit</td>
                        <td className="w-0 border-collapse border border-black text-center">:</td>
                        <td className="border-collapse border border-black px-4 py-2">
                          {kodeUnitKompetensi}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-28 border-collapse border border-black px-4">
                          Judul Unit
                        </td>
                        <td className="w-0 border-collapse border border-black px-2 text-center">
                          :
                        </td>
                        <td className="border-collapse border border-black px-4 py-2">
                          {namaUnitKompetensi}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {!!tugasPraktikDemonstrasi &&
                    tugasPraktikDemonstrasi.map((value, index) => {
                      // console.log(value);
                      const {
                        id,
                        langkah_kerja_tugas_praktik_demonstrasi:
                          langkahKerjaTugasPraktikDemonstrasi,
                        skenario,
                      } = value;

                      // console.log(langkahKerjaTugasPraktikDemonstrasi);

                      return (
                        <div key={id} className="mb-16 flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <p className="font-bold">A. Petunjuk</p>
                            <ol className="ml-4 list-inside list-decimal">
                              <li>
                                Baca dan pelajari setiap instruksi kerja di bawah ini dengan cermat
                                sebelum melaksanakan praktek
                              </li>
                              <li>
                                Klarifikasi kepada Asesor apabila ada hal-hal yang belum jelas
                              </li>
                              <li>
                                Laksanakan pekerjaan sesuai dengan urutan proses yang sudah
                                ditetapkan
                              </li>
                              <li>
                                Seluruh proses kerja mengacu kepada SOP/WI yang dipersyaratkan
                              </li>
                            </ol>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="font-bold">B. Skenario</p>
                            <p className="indent-4">{skenario}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="font-bold">C. Langkah Kerja</p>
                            <table className="w-full table-auto border-collapse border border-black">
                              <thead className="bg-primary-500">
                                <tr className="h-12">
                                  <th className="w-0 border border-black px-4">No.</th>
                                  <th className="w-60 border border-black">Langkah Kerja</th>
                                  <th className="border border-black">Instruksi Kerja</th>
                                </tr>
                              </thead>
                              <tbody>
                                {!!langkahKerjaTugasPraktikDemonstrasi &&
                                  langkahKerjaTugasPraktikDemonstrasi.map((value, index) => {
                                    // console.log(value);
                                    const {
                                      id,
                                      instruksi_kerja_tugas_praktik_demonstrasi:
                                        instruksiKerjaTugasPraktikDemonstrasi,
                                      langkah_kerja: langkahKerja,
                                    } = value;
                                    return (
                                      <tr>
                                        <td className="border border-black text-center">
                                          {index + 1}.
                                        </td>
                                        <td className="border border-black px-2">{langkahKerja}</td>
                                        <td className="border border-black px-2 py-2">
                                          <ul className="list-inside list-disc">
                                            {!!instruksiKerjaTugasPraktikDemonstrasi &&
                                              instruksiKerjaTugasPraktikDemonstrasi.map(
                                                (value, index) => {
                                                  // console.log(value);
                                                  const { id, instruksi_kerja: instruksiKerja } =
                                                    value;
                                                  return <li key={id}>{instruksiKerja}</li>;
                                                },
                                              )}
                                          </ul>
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })}
                </React.Fragment>
              );
            })}
        </div>
      </div>
    );
  }
});
