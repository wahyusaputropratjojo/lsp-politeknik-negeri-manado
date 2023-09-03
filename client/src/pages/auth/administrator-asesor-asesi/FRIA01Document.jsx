import React, { useState, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "../../../utils/axios";

export const FRIA01Document = forwardRef((props, ref) => {
  const [asesiSkemaSertifikasiData, setAsesiSkemaSertifikasiData] = useState();

  useQuery({
    queryKey: ["FRIA01Document", props.id],
    queryFn: async () => {
      return await axios.get(`asesi/${props.id}/fr-ia-01`);
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

    // console.log(unitKompetensi);

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
          FR.IA.01. Ceklis Observasi Aktivitas Di Tempat Kerja Atau Tempat Kerja Simulasi
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
        <table className="mb-4 w-full table-auto border-collapse border border-black">
          <tbody>
            <tr className="border border-black bg-primary-500">
              <td className="p-2">
                <p className="font-bold uppercase">Panduan Bagi Asesor</p>
              </td>
            </tr>
            <tr className="text-sm">
              <td className="p-2">
                <ul className="list-inside list-disc">
                  <li>
                    Lengkapi nama unit kompetensi, elemen, dan kriteria unjuk kerja sesuai kolom
                    dalam tabel.
                  </li>
                  <li>
                    Istilah Acuan Pembanding dengan SOP/spesifikasi produk dari industri/organisasi
                    dari tempat kerja atau simulasi tempat kerja
                  </li>
                  <li>
                    Beri tanda centang (&#10003;) pada kolom K jika Anda yakin asesi dapat
                    melakukan/ mendemonstrasikan tugas sesuai KUK, atau centang (&#10003;) pada
                    kolom BK bila sebaliknya.
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        {!!unitKompetensi &&
          unitKompetensi.map((value) => {
            // console.log(value);
            const {
              id,
              aktivitas_unit_kompetensi: aktivitasUnitKompetensi,
              kode_unit_kompetensi: kodeUnitKompetensi,
              nama_unit_kompetensi: namaUnitKompetensi,
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
                      <td className="w-28 border-collapse border border-black px-4">Judul Unit</td>
                      <td className="w-0 border-collapse border border-black px-2 text-center">
                        :
                      </td>
                      <td className="border-collapse border border-black px-4 py-2">
                        {namaUnitKompetensi}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="mb-12 w-full table-auto border-collapse border border-black">
                  <thead className="bg-primary-500">
                    <tr>
                      <th rowSpan={2} className="w-0 border-collapse border border-black px-4">
                        No
                      </th>
                      <th rowSpan={2} className="border-collapse border border-black px-4">
                        Elemen
                      </th>
                      <th rowSpan={2} className="border-collapse border border-black px-4">
                        Kriteria Unjuk Kerja
                      </th>
                      <th rowSpan={2} className="w-0 border-collapse border border-black px-4">
                        Benchmark (SOP / Spesifikasi Produk Industri)
                      </th>
                      <th colSpan={2} className="w-0 border-collapse border border-black px-4">
                        Rekomendasi
                      </th>
                    </tr>
                    <tr>
                      <th className="w-20 border-collapse border border-black px-4">K</th>
                      <th className="w-20 border-collapse border border-black px-4">BK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!!aktivitasUnitKompetensi &&
                      aktivitasUnitKompetensi.map((value, index) => {
                        const {
                          asesor_observasi_aktivitas_tempat_kerja:
                            asesorObservasiAktivitasTempatKerja,
                          elemen,
                          kriteria_unjuk_kerja: kriteriaUnjukKerja,
                        } = value;

                        // console.log(kriteriaUnjukKerja);
                        return (
                          <tr>
                            <td className="border border-black text-center">{index + 1}.</td>
                            <td className="border border-black p-2 text-left">{elemen}</td>
                            <td className="border border-black text-center">
                              <div>
                                {!!kriteriaUnjukKerja &&
                                  kriteriaUnjukKerja.map((value) => {
                                    // console.log(value);
                                    const { id, kriteria_unjuk_kerja: kriteriaUnjukKerja } = value;
                                    return (
                                      <p
                                        key={id}
                                        className="last border-collapse border-b border-black p-2 text-left last:border-b-0">
                                        {kriteriaUnjukKerja}
                                      </p>
                                    );
                                  })}
                              </div>
                            </td>
                            <td className="border border-black p-2 text-center">
                              SOP {namaSkemaSertifikasi}
                            </td>
                            <td className="mx-auto w-4 border border-black text-center align-middle">
                              <input
                                type="checkbox"
                                checked={
                                  false || !!asesorObservasiAktivitasTempatKerja[0].is_kompeten
                                }
                                className="my-20"
                              />
                            </td>
                            <td className="mx-auto w-4 border border-black text-center align-middle">
                              <input
                                type="checkbox"
                                checked={
                                  false || !asesorObservasiAktivitasTempatKerja[0].is_kompeten
                                }
                                className="my-20"
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
