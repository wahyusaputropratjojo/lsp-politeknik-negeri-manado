import React, { useState, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "../../../utils/axios";

export const FRIA06ADocument = forwardRef((props, ref) => {
  const [asesiSkemaSertifikasiData, setAsesiSkemaSertifikasiData] = useState();

  useQuery({
    queryKey: ["FRAPL06Document", props.id],
    queryFn: async () => {
      return await axios.get(`asesi/${props.id}/fr-ia-06`);
    },
    onSuccess: (data) => {
      setAsesiSkemaSertifikasiData(data.data.data);
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
        user: { nama_lengkap: namaLengkap },
      },
      asesor_asesi: asesorAsesi,
    } = asesiSkemaSertifikasiData;

    return (
      <div ref={ref} className="bg-white">
        <style>{setStyles()}</style>
        <p className="mb-4 text-base font-bold uppercase">
          FR.IA.06.A. Lembar Pertanyaan Tertulis Esai
        </p>
        <div className="mb-4">
          <table className="w-full table-auto border-collapse border border-black">
            <tbody>
              <tr>
                <td rowSpan={2} className="w-0 border-collapse border border-black px-4">
                  Skema Sertifikasi (KKNI/Okupasi/Klaster)
                </td>
                <td className="w-0 border-collapse border border-black px-4">Judul</td>
                <td className="w-0 border-collapse border border-black text-center">:</td>
                <td className="border-collapse border border-black px-4">
                  Merakit dan Memasang PHB
                </td>
              </tr>
              <tr>
                <td className="w-min border-collapse border border-black px-4">Nomor</td>
                <td className="w-min border-collapse border border-black text-center">:</td>
                <td className="w-min border-collapse border border-black px-4">
                  FR-SKEMA-02.KTL.-01
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
                <td className="border-collapse border border-black px-4"></td>
              </tr>
              <tr>
                <td colSpan={2} className="w-0 border-collapse border border-black px-4">
                  Nama Asesi
                </td>
                <td className="w-0 border-collapse border border-black px-2">:</td>
                <td className="border-collapse border border-black px-4"></td>
              </tr>
              <tr>
                <td colSpan={2} className="w-0 border-collapse border border-black px-4">
                  Tanggal
                </td>
                <td className="w-0 border-collapse border border-black px-2">:</td>
                <td className="border-collapse border border-black px-4"></td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <sup>*</sup>
            Coret yang tidak perlu
          </p>
        </div>
        <table className="mb-4 w-full table-auto border-collapse border border-black">
          <tbody>
            <tr>
              <td rowSpan={2} className="w-40 border-collapse border border-black px-4">
                Unit Kompetensi
              </td>
              <td className="w-28 border-collapse border border-black px-4">Kode Unit</td>
              <td className="w-0 border-collapse border border-black text-center">:</td>
              <td className="border-collapse border border-black px-4">FR-SKEMA-02.KTL.-01</td>
            </tr>
            <tr>
              <td className="w-28 border-collapse border border-black px-4">Judul Unit</td>
              <td className="w-0 border-collapse border border-black px-2 text-center">:</td>
              <td className="border-collapse border border-black px-4">Merakit dan Memasang PHB</td>
            </tr>
          </tbody>
        </table>
        <table className="mb-4 w-full table-auto border-collapse border border-black">
          <thead>
            <tr className="h-12">
              <th className="w-0 border border-black px-2">No.</th>
              <th className="border border-black px-2">Pertanyaan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black text-center">1.</td>
              <td className="border border-black px-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti et explicabo
                adipisci accusamus debitis rem porro deleniti nostrum at harum mollitia ea totam
                repudiandae rerum id reprehenderit optio voluptatem molestiae obcaecati, natus
                alias. Ipsam eum impedit illum, praesentium quaerat eligendi.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

export const FRIA06BDocument = forwardRef((props, ref) => {
  const [asesiSkemaSertifikasiData, setAsesiSkemaSertifikasiData] = useState();

  useQuery({
    queryKey: ["FRAPL06Document", props.id],
    queryFn: async () => {
      return await axios.get(`asesi/${props.id}/fr-ia-06`);
    },
    onSuccess: (data) => {
      setAsesiSkemaSertifikasiData(data.data.data);
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
        user: { nama_lengkap: namaLengkap },
      },
      asesor_asesi: asesorAsesi,
    } = asesiSkemaSertifikasiData;

    return (
      <div ref={ref} className="bg-white">
        <style>{setStyles()}</style>
        <p className="mb-4 text-base font-bold uppercase">
          FR.IA.06.B. Lembar Kunci Jawaban Pertanyaan Tertulis Esai
        </p>
        <div className="mb-4">
          <table className="w-full table-auto border-collapse border border-black">
            <tbody>
              <tr>
                <td rowSpan={2} className="w-0 border-collapse border border-black px-4">
                  Skema Sertifikasi (KKNI/Okupasi/Klaster)
                </td>
                <td className="w-0 border-collapse border border-black px-4">Judul</td>
                <td className="w-0 border-collapse border border-black text-center">:</td>
                <td className="border-collapse border border-black px-4">
                  Merakit dan Memasang PHB
                </td>
              </tr>
              <tr>
                <td className="w-min border-collapse border border-black px-4">Nomor</td>
                <td className="w-min border-collapse border border-black text-center">:</td>
                <td className="w-min border-collapse border border-black px-4">
                  FR-SKEMA-02.KTL.-01
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
                <td className="border-collapse border border-black px-4"></td>
              </tr>
              <tr>
                <td colSpan={2} className="w-0 border-collapse border border-black px-4">
                  Nama Asesi
                </td>
                <td className="w-0 border-collapse border border-black px-2">:</td>
                <td className="border-collapse border border-black px-4"></td>
              </tr>
              <tr>
                <td colSpan={2} className="w-0 border-collapse border border-black px-4">
                  Tanggal
                </td>
                <td className="w-0 border-collapse border border-black px-2">:</td>
                <td className="border-collapse border border-black px-4"></td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">
            <sup>*</sup>
            Coret yang tidak perlu
          </p>
        </div>
        <table className="mb-4 w-full table-auto border-collapse border border-black">
          <tbody>
            <tr>
              <td rowSpan={2} className="w-40 border-collapse border border-black px-4">
                Unit Kompetensi
              </td>
              <td className="w-28 border-collapse border border-black px-4">Kode Unit</td>
              <td className="w-0 border-collapse border border-black text-center">:</td>
              <td className="border-collapse border border-black px-4">FR-SKEMA-02.KTL.-01</td>
            </tr>
            <tr>
              <td className="w-28 border-collapse border border-black px-4">Judul Unit</td>
              <td className="w-0 border-collapse border border-black px-2 text-center">:</td>
              <td className="border-collapse border border-black px-4">Merakit dan Memasang PHB</td>
            </tr>
          </tbody>
        </table>
        <table className="mb-4 w-full table-auto border-collapse border border-black">
          <thead>
            <tr className="h-12">
              <th className="w-0 border border-black px-2">No.</th>
              <th className="border border-black px-2">Kunci Jawaban</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black text-center">1.</td>
              <td className="border border-black px-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti et explicabo
                adipisci accusamus debitis rem porro deleniti nostrum at harum mollitia ea totam
                repudiandae rerum id reprehenderit optio voluptatem molestiae obcaecati, natus
                alias. Ipsam eum impedit illum, praesentium quaerat eligendi.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

export const FRIA06CDocument = forwardRef((props, ref) => {
  const [asesiSkemaSertifikasiData, setAsesiSkemaSertifikasiData] = useState();

  useQuery({
    queryKey: ["FRAPL06Document", props.id],
    queryFn: async () => {
      return await axios.get(`asesi/${props.id}/fr-ia-06`);
    },
    onSuccess: (data) => {
      setAsesiSkemaSertifikasiData(data.data.data);
    },
  });

  const setStyles = () => {
    return `@page { 
      margin: ${"1.5cm"} !important;
    }`;
  };

  // console.log(asesiSkemaSertifikasiData);

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
        <p className="mb-4 text-base font-bold uppercase">
          FR.IA.06.C. Lembar Jawaban Pertanyaan Tertulis Esai
        </p>
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
        {!!unitKompetensi &&
          unitKompetensi.map((value, index) => {
            // console.log(value);

            const {
              id,
              kode_unit_kompetensi: kodeUnitKompetensi,
              nama_unit_kompetensi: namaUnitKompetensi,
              pertanyaan_tertulis_esai: pertanyaanTertulisEsai,
            } = value;

            // console.log(pertanyaanTertulisEsai);
            return (
              <React.Fragment>
                <table className="mb-4 w-full table-auto border-collapse border border-black">
                  <tbody>
                    <tr>
                      <td rowSpan={2} className="w-40 border-collapse border border-black px-4">
                        Unit Kompetensi
                      </td>
                      <td className="w-28 border-collapse border border-black px-4 py-2">
                        Kode Unit
                      </td>
                      <td className="w-0 border-collapse border border-black text-center">:</td>
                      <td className="border-collapse border border-black px-4">
                        {kodeUnitKompetensi}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-28 border-collapse border border-black px-4 py-2">
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
                <p className="mb-2">Kunci Jawaban Pertanyaan Tertulis - Pilihan Ganda</p>
                <table className="mb-12 w-full table-auto border-collapse border border-black">
                  <thead className="bg-primary-500">
                    <tr>
                      <th rowSpan={2} className="w-0 border border-black px-2">
                        No.
                      </th>
                      <th rowSpan={2} className="border border-black">
                        Jawaban
                      </th>
                      <th colSpan={2} className="border border-black py-1">
                        Rekomendasi
                      </th>
                    </tr>
                    <tr>
                      <th className="w-24 border border-black py-1">K</th>
                      <th className="w-24 border border-black py-1">BK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!!pertanyaanTertulisEsai &&
                      pertanyaanTertulisEsai.map((value, index) => {
                        // console.log(value);

                        const {
                          id,
                          asesi_jawaban_pertanyaan_tertulis_esai:
                            asesiJawabanPertanyaanTertulisEsai,
                        } = value;

                        // console.log(asesiJawabanPertanyaanTertulisEsai[0]?.is_kompeten);

                        return (
                          <tr>
                            <td className="border border-black text-center">{index + 1}.</td>
                            <td className="border border-black px-2 py-2">
                              {!!asesiJawabanPertanyaanTertulisEsai
                                ? asesiJawabanPertanyaanTertulisEsai[0]?.jawaban
                                : "-"}
                            </td>
                            <td className="border border-black text-center">
                              <input
                                type="checkbox"
                                checked={
                                  false || !!asesiJawabanPertanyaanTertulisEsai[0]?.is_kompeten
                                }
                              />
                            </td>
                            <td className="border border-black text-center">
                              <input
                                type="checkbox"
                                checked={
                                  false || !asesiJawabanPertanyaanTertulisEsai[0]?.is_kompeten
                                }
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </React.Fragment>
            );
          })}
        <table className="mb-4 w-full table-auto border-collapse border border-black">
          <tbody>
            <tr className="h-20">
              <th className="w-48 border border-black p-2 text-left align-top text-sm">Nama</th>
              <td className="border border-black p-2 text-left align-top text-sm">
                <p>Asesi :</p>
                <p>{namaLengkapAsesi}</p>
              </td>
              <td className="border border-black p-2 text-left align-top text-sm">
                <p>Asesor :</p>
                <p>{asesorAsesi[0].asesor.user.nama_lengkap}</p>
              </td>
            </tr>
            <tr className="h-24">
              <th className="border border-black p-2 text-left align-top text-sm">
                Tanda Tangan dan Tanggal
              </th>
              <td className="border border-black p-2 text-left align-top text-[10px]">
                {tanggalPelaksanaan}
              </td>
              <td className="border border-black p-2 text-left align-top text-[10px]">
                {tanggalPelaksanaan}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});
