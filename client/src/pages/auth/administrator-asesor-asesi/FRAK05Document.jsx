import { useState, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "../../../utils/axios";

export const FRAK05Document = forwardRef((props, ref) => {
  const [asesiSkemaSertifikasiData, setAsesiSkemaSertifikasiData] = useState();

  useQuery({
    queryKey: ["FRAK05Document", props.id],
    queryFn: async () => {
      return await axios.get(`asesi/${props.id}/fr-ak-05`);
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
      asesor: {
        tempat_uji_kompetensi: { skema_sertifikasi: skemaSertifikasi },
      },
      nama_lengkap: namaLengkap,
    } = asesiSkemaSertifikasiData;

    // console.log(skemaSertifikasi);

    return (
      <div ref={ref} className="flex flex-col gap-4 bg-white font-calibri text-sm">
        <style>{setStyles()}</style>

        {!!skemaSertifikasi &&
          skemaSertifikasi.map((value, index) => {
            const {
              id,
              nama_skema_sertifikasi: namaSkemaSertifikasi,
              kode_skema_sertifikasi: kodeSkemaSertifikasi,
              asesi_skema_sertifikasi: asesiSkemaSertifikasi,
            } = value;

            return (
              <div key={id} className="flex flex-col">
                <p className="mb-4 text-base font-bold uppercase">FR.AK.05. Laporan Asesmen</p>
                <div className="flex flex-col gap-4">
                  <div>
                    <table className="w-full border-collapse border border-black">
                      <tbody>
                        <tr>
                          <td
                            rowSpan={2}
                            className="w-auto border border-black px-2 py-1 font-normal">
                            Skema Sertifikasi (KKNI/Okupasi/Klaster)
                          </td>
                          <td className="w-auto border border-black px-2 py-1 font-normal">
                            Judul
                          </td>
                          <td className="w-auto border border-black px-2 text-center font-normal">
                            :
                          </td>
                          <td className="w-full border border-black px-2 py-1 font-bold">
                            {namaSkemaSertifikasi}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-auto border border-black px-2 py-1 font-normal">
                            Nomor
                          </td>
                          <td className="w-auto border border-black px-2 text-center font-normal">
                            :
                          </td>
                          <td className="w-full border border-black px-2 py-1 font-normal">
                            {kodeSkemaSertifikasi}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={2}
                            className="w-auto border border-black px-2 py-1 font-normal">
                            TUK
                          </td>
                          <td className="w-auto border border-black px-2 text-center font-normal">
                            :
                          </td>
                          <td className="w-full border border-black px-2 py-1 font-normal">
                            Sewaktu/Tempat Kerja/Mandiri
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={2}
                            className="w-auto border border-black px-2 py-1 font-normal">
                            Nama Asesor
                          </td>
                          <td className="w-auto border border-black px-2 text-center font-normal">
                            :
                          </td>
                          <td className="w-full border border-black px-2 py-1 font-normal">
                            {namaLengkap}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={2}
                            className="w-auto border border-black px-2 py-1 font-normal">
                            Tanggal
                          </td>
                          <td className="w-auto border border-black px-2 text-center font-normal">
                            :
                          </td>
                          <td className="w-full border border-black px-2 py-1 font-normal"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* <div>
                    <table className="w-full table-auto border-collapse border border-black">
                      <tbody>
                        <tr>
                          <td
                            rowSpan={2}
                            className="w-2/12 border border-black px-2 py-1 font-normal">
                            Unit Kompetensi
                          </td>
                          <td className="w-1/12 border border-black px-2 py-1 font-normal">
                            Kode Unit
                          </td>
                          <td className="w-auto border border-black px-2 py-1 text-center font-normal">
                            :
                          </td>
                          <td className="w-10/12 border border-black px-2 py-1 font-normal">
                            Lorem, ipsum dolor.
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/12 border border-black px-2 py-1 font-normal">
                            Judul Unit
                          </td>
                          <td className="w-auto border border-black px-2 py-1 text-center font-normal">
                            :
                          </td>
                          <td className="w-10/12 border border-black px-2 py-1 font-normal">
                            Lorem, ipsum dolor.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div> */}
                  <div>
                    <table className="w-full border-collapse border border-black">
                      <thead>
                        <tr>
                          <th rowSpan={2} className="border border-black px-2 py-1 font-bold">
                            No.
                          </th>
                          <th
                            rowSpan={2}
                            className="w-5/12 border border-black px-2 py-1 font-bold">
                            Nama Asesi
                          </th>
                          <th
                            colSpan={2}
                            className="w-2/12 border border-black px-2 py-1 font-bold">
                            Rekomendasi
                          </th>
                          <th
                            rowSpan={2}
                            className="w-5/12 border border-black px-2 py-1 font-bold">
                            Keterangan
                          </th>
                        </tr>
                        <tr>
                          <th className="w-1/12 border border-black px-2 py-1 font-bold">K</th>
                          <th className="w-1/12 border border-black px-2 py-1 font-bold">BK</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!!asesiSkemaSertifikasi &&
                          asesiSkemaSertifikasi.map((value, index) => {
                            const {
                              id,
                              is_kompeten: isKompeten,
                              is_tidak_kompeten: isTidakKompeten,
                              asesi: {
                                user: { nama_lengkap: namaLengkap },
                              },
                            } = value;
                            return (
                              <tr>
                                <td className="border border-black px-2 py-4 text-center">
                                  {index + 1}.
                                </td>
                                <td className="border border-black px-2 py-4">{namaLengkap}</td>
                                <td className="border border-black px-2 py-4 text-center">
                                  <input type="checkbox" checked={false || isKompeten} />
                                </td>
                                <td className="border border-black px-2 py-4 text-center">
                                  <input type="checkbox" checked={false || isTidakKompeten} />
                                </td>
                                <td className="border border-black px-2 py-4"></td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <table className="w-full border-collapse border border-black">
                      <tbody>
                        <tr>
                          <th className="w-4/12 border border-black p-2 text-left font-normal">
                            Aspek Negatif dan Positif dalam Asesmen
                          </th>
                          <td className="w-8/12 border border-black p-2 text-left font-normal"></td>
                        </tr>
                        <tr>
                          <th className="w-4/12 border border-black p-2 text-left font-normal">
                            Pencatatan Penolakan Hasil Asesmen
                          </th>
                          <td className="w-8/12 border border-black p-2 text-left font-normal"></td>
                        </tr>
                        <tr>
                          <th className="w-4/12 border border-black p-2 text-left font-normal">
                            <p>Saran Perbaikan :</p>
                            <p>(Asesor/Personil Terkait)</p>
                          </th>
                          <td className="w-8/12 border border-black p-2 text-left font-normal"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <table className="w-full border-collapse border border-black">
                      <tbody>
                        <tr>
                          <td
                            rowSpan={4}
                            className="w-6/12 border border-black px-2 py-1 align-top font-bold">
                            Catatan :
                          </td>
                          <td
                            colSpan={2}
                            className="w-6/12 border border-black px-2 py-1 font-bold">
                            Asesor :
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-black px-2 py-1 font-normal">Nama</td>
                          <td className="w-full border border-black px-2 py-1 font-normal">
                            {namaLengkap}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-black px-2 py-1 font-normal">No. Reg</td>
                          <td className="w-full border border-black px-2 py-1 font-normal"></td>
                        </tr>
                        <tr>
                          <td className="border border-black px-2 py-8 font-normal">
                            Tanda Tangan/Tanggal
                          </td>
                          <td className="border border-black px-2 py-8 font-normal"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
});
