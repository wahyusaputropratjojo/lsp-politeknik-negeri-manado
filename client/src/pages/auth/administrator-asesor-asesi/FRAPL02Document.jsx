import { useState, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "../../../utils/axios";

export const FRAPL02Document = forwardRef((props, ref) => {
  const [asesiSkemaSertifikasiData, setAsesiSkemaSertifikasiData] = useState();

  useQuery({
    queryKey: ["FRAPL02Document", props.id],
    queryFn: async () => {
      return await axios.get(`asesi/${props.id}/fr-apl-02`);
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
        user: { nama_lengkap: namaLengkap },
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
      <div ref={ref} className="flex flex-col gap-4 bg-white text-sm">
        <style>{setStyles()}</style>
        <p className="text-base font-bold">FR.APL.02. ASESMEN MANDIRI</p>
        <table className="w-full table-auto border-collapse border border-black">
          <tbody>
            <tr>
              <td rowSpan={2} className="w-40 border-collapse border border-black px-2">
                Skema Sertifikasi (KKNI/Okupasi/Klaster)
              </td>
              <td className="w-0 border-collapse border border-black px-2">Judul</td>
              <td className="w-0 border-collapse border border-black text-center">:</td>
              <td className="border-collapse border border-black p-2">{namaSkemaSertifikasi}</td>
            </tr>
            <tr>
              <td className="w-0 border-collapse border border-black px-2">Nomor</td>
              <td className="w-0 border-collapse border border-black px-2 text-center">:</td>
              <td className="border-collapse border border-black p-2">{kodeSkemaSertifikasi}</td>
            </tr>
          </tbody>
        </table>
        <table className="w-full table-auto border border-black">
          <tbody>
            <tr className="border border-black bg-primary-500">
              <td className="p-2">
                <p className="font-bold uppercase">Panduan Asesmen Mandiri</p>
              </td>
            </tr>
            <tr>
              <td className="p-2">
                <p className="font-bold">Instrukti:</p>
                <p>Baca setiap pertanyaan di kolom sebelah kiri</p>
                <ul className="list-inside list-disc">
                  <li>
                    Beri tanda centang (&#10003;) pada kotak jika Anda yakin dapat melakukan tugas
                    yang dijelaskan.
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        {!!unitKompetensi &&
          unitKompetensi.map((value, index) => {
            const {
              id,
              aktivitas_unit_kompetensi: aktivitasUnitKompetensi,
              nama_unit_kompetensi: namaUnitKompetensi,
            } = value;

            return (
              <div key={id} className="flex flex-col gap-2">
                <table className="text-sm">
                  <tbody>
                    <tr>
                      <td className="w-32 align-top font-bold">Unit Kompetensi :</td>
                      <td className="align-top font-bold">{namaUnitKompetensi}</td>
                    </tr>
                  </tbody>
                </table>
                <table className="mb-4 w-full table-auto border border-black text-sm">
                  <tbody>
                    <tr className="border border-black bg-primary-500 font-bold">
                      <td className="w-full border border-black p-2">
                        <p>Dapatkah Saya...............?</p>
                      </td>
                      <td className="border border-black px-6 py-2">
                        <p className="w-4">K</p>
                      </td>
                      <td className="border border-black px-6 py-2">
                        <p className="w-4">BK</p>
                      </td>
                    </tr>
                    {!!aktivitasUnitKompetensi &&
                      aktivitasUnitKompetensi.map((value, index) => {
                        const {
                          id,
                          elemen,
                          asesmen_mandiri: asesmenMandiri,
                          kriteria_unjuk_kerja: kriteriaUnjukKerja,
                        } = value;

                        // console.log(kriteriaUnjukKerja);

                        return (
                          <tr key={id} className="border border-black">
                            <td className="w-full border border-black p-2">
                              <p>
                                <span>{index + 1}. </span>Elemen: {elemen}
                              </p>
                              <ul className="ml-6 list-inside list-disc">
                                <li>Kriteria Unjuk Kerja:</li>
                                <li className="ml-6 list-none">
                                  <ol className="list-outside list-decimal">
                                    {!!kriteriaUnjukKerja &&
                                      kriteriaUnjukKerja.map((value, index) => {
                                        const { id, kriteria_unjuk_kerja: kriteriaUnjukKerja } =
                                          value;

                                        return <li key={id}>{kriteriaUnjukKerja}</li>;
                                      })}
                                  </ol>
                                </li>
                              </ul>
                            </td>
                            <td className="border border-black px-4 py-2 ">
                              <div className="flex items-center justify-center">
                                <input
                                  type="checkbox"
                                  checked={false || !!asesmenMandiri[0].is_kompeten}
                                />
                              </div>
                            </td>
                            <td className="border border-black px-4 py-2">
                              <div className="flex items-center justify-center">
                                <input
                                  type="checkbox"
                                  checked={false || !asesmenMandiri[0].is_kompeten}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            );
          })}
        <table className="w-full table-fixed border border-black text-sm">
          <tr className="h-32">
            <td className="w-full border border-black p-2  text-center align-top">
              <p>Nama Asesi :</p>
              <p>{namaLengkap}</p>
            </td>
            <td className="w-full border border-black p-2 text-center align-top">
              <p>Tanggal :</p>
              <p>{tanggalPelaksanaan}</p>
            </td>
            <td className="w-full border border-black p-2  text-center align-top">
              Tanda Tangan Asesi :
            </td>
          </tr>
          <tr>
            <td className="p-2 font-bold">Ditinjau oleh Asesor:</td>
          </tr>
          <tr className="h-32">
            <td className="w-full border border-black p-2  text-center align-top">
              <p>Nama Asesor :</p>
              <p>{asesorAsesi[0].asesor.user.nama_lengkap}</p>
            </td>
            <td className="w-full border border-black p-2 text-center align-top">
              <p>Rekomendasi :</p>
              <p>Asesmen dapat dilanjutkan / tidak dapat dilanjutkan</p>
            </td>
            <td className="w-full border border-black p-2  text-center align-top">
              <p>Tanda Tangan dan Tanggal :</p>
              <p>{tanggalPelaksanaan}</p>
            </td>
          </tr>
        </table>
      </div>
    );
  }
});
