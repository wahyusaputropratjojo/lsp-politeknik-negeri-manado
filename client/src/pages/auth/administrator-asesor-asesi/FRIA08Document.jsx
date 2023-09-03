import { useState, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "../../../utils/axios";

export const FRIA08Document = forwardRef((props, ref) => {
  const [asesiSkemaSertifikasiData, setAsesiSkemaSertifikasiData] = useState();

  useQuery({
    queryKey: ["FRIA08Document", props.id],
    queryFn: async () => {
      return await axios.get(`asesi/${props.id}/fr-ia-08`);
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
      portofolio,
    } = asesiSkemaSertifikasiData;

    // console.log(portofolio);

    const dateCreatedAt = new Date(asesorAsesi[0]?.tanggal_pelaksanaan);
    const tanggalPelaksanaan = dateCreatedAt.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <div ref={ref} className="bg-white text-sm">
        <style>{setStyles()}</style>
        <p className="mb-4 text-base font-bold uppercase">FR.IA.08. Ceklis Verifikasi Portofolio</p>
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
            <tr>
              <td className="p-2">
                <ul className="list-inside list-disc">
                  <li>
                    Isilah tabel ini sesuai dengan informasi sesuai pertanyaan/pernyataan dalam
                    tabel dibawah ini.
                  </li>
                  <li>
                    Beri tanda centang (&#10003;) pada hasil penilaian portfolio berdasarkan aturan
                    bukti.
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        {/* <table className="mb-4 w-full table-auto border-collapse border border-black">
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
        </table> */}
        <table className="mb-4 w-full table-auto border-collapse border border-black">
          <thead className="bg-primary-500">
            <tr>
              <th rowSpan={4} className="w-0 border border-black px-2">
                No.
              </th>
              <th rowSpan={4} className="border border-black">
                Dokumen Portofolio
              </th>
            </tr>
            <tr>
              <th colSpan={8} className="border border-black py-1">
                Aturan Bukti
              </th>
            </tr>
            <tr>
              <th colSpan={2} className="w-24 border border-black py-1">
                Valid
              </th>
              <th colSpan={2} className="w-24 border border-black py-1">
                Asli
              </th>
              <th colSpan={2} className="w-24 border border-black py-1">
                Terkini
              </th>
              <th colSpan={2} className="w-24 border border-black py-1">
                Memadai
              </th>
            </tr>
            <tr>
              <th className="w-16 border border-black py-1 font-normal">Ya</th>
              <th className="w-16 border border-black py-1 font-normal">Tidak</th>
              <th className="w-16 border border-black py-1 font-normal">Ya</th>
              <th className="w-16 border border-black py-1 font-normal">Tidak</th>
              <th className="w-16 border border-black py-1 font-normal">Ya</th>
              <th className="w-16 border border-black py-1 font-normal">Tidak</th>
              <th className="w-16 border border-black py-1 font-normal">Ya</th>
              <th className="w-16 border border-black py-1 font-normal">Tidak</th>
            </tr>
          </thead>
          <tbody>
            {!!portofolio &&
              portofolio.map((value, index) => {
                // console.log(value)

                const {
                  id,
                  asesor_verifikasi_portofolio: asesorVerifikasiPortofolio,
                  keterangan,
                } = value;

                // console.log(asesorVerifikasiPortofolio);

                return (
                  <tr key={id}>
                    <td className="border border-black text-center">{index + 1}.</td>
                    <td className="border border-black p-2">{keterangan}</td>
                    <td className="border border-black text-center">
                      <input
                        type="checkbox"
                        checked={false || !!asesorVerifikasiPortofolio[0]?.is_valid}
                      />
                    </td>
                    <td className="border border-black text-center">
                      <input
                        type="checkbox"
                        checked={false || !asesorVerifikasiPortofolio[0]?.is_valid}
                      />
                    </td>
                    <td className="border border-black text-center">
                      <input
                        type="checkbox"
                        checked={false || !!asesorVerifikasiPortofolio[0]?.is_asli}
                      />
                    </td>
                    <td className="border border-black text-center">
                      <input
                        type="checkbox"
                        checked={false || !asesorVerifikasiPortofolio[0]?.is_asli}
                      />
                    </td>
                    <td className="border border-black text-center">
                      <input
                        type="checkbox"
                        checked={false || !!asesorVerifikasiPortofolio[0]?.is_terkini}
                      />
                    </td>
                    <td className="border border-black text-center">
                      <input
                        type="checkbox"
                        checked={false || !asesorVerifikasiPortofolio[0]?.is_terkini}
                      />
                    </td>
                    <td className="border border-black text-center">
                      <input
                        type="checkbox"
                        checked={false || !!asesorVerifikasiPortofolio[0]?.is_memadai}
                      />
                    </td>
                    <td className="border border-black text-center">
                      <input
                        type="checkbox"
                        checked={false || !asesorVerifikasiPortofolio[0]?.is_memadai}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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
