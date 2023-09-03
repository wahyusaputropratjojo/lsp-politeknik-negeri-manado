import React, { useState, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "../../../utils/axios";

export const FRIA07Document = forwardRef((props, ref) => {
  const [asesiSkemaSertifikasiData, setAsesiSkemaSertifikasiData] = useState();

  useQuery({
    queryKey: ["FRIA07Document", props.id],
    queryFn: async () => {
      return await axios.get(`asesi/${props.id}/fr-ia-07`);
    },
    onSuccess: (data) => {
      setAsesiSkemaSertifikasiData(data.data.data);
      // console.log(data.data.data);
    },
  });

  // console.log(asesiSkemaSertifikasiData);

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

    // console.log(unitKompetensi);

    return (
      <div ref={ref} className="bg-white text-sm">
        <style>{setStyles()}</style>
        <p className="mb-4 text-base font-bold uppercase">FR.IA.07. Pertanyaan Lisan</p>
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
                <p className="font-bold">Instruksi:</p>
                <ul className="list-inside list-disc">
                  <li>
                    Pertanyaan lisan merupakan jenis bukti tambahan untuk mendukung bukti-bukti yang
                    sudah ada.
                  </li>
                  <li>
                    Buatlah pertanyaan lisan yang dapat mencakupi penguatan informasi berdasarkan
                    KUK, batasan variabel, pengetahuan dan ketrampilan esensial, sikap dan aspek
                    kritis.
                  </li>
                  <li>Perkiraan jawaban dapat dibuat pada lembar lain.</li>
                  <li>
                    Tanggapan/penilaian dapat diisi dengan centang (&#10003;) pada kolom K
                    (Kompeten) atau BK (Belum Kompeten). Dibutuhkan jastifikasi profesional asesor
                    untuk memutuskan hal ini.
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        {!!unitKompetensi &&
          unitKompetensi.map((value, index) => {
            // console.log(value);
            const {
              id,
              kode_unit_kompetensi: kodeUnitKompetensi,
              nama_unit_kompetensi: namaUnitKompetensi,
              pertanyaan_lisan: pertanyaanLisan,
            } = value;

            // console.log(pertanyaanLisan);
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
                <table className="mb-4 w-full table-auto border-collapse border border-black">
                  <tbody>
                    <tr>
                      <th className="w-32 border border-black bg-primary-500">Instruksi:</th>
                      <td className="border border-black p-2">
                        <ol className="list-inside list-decimal">
                          <li>
                            Ajukan pertanyaan kepada Asesi dari daftar terlampir untuk
                            mengkonfirmasi pengetahuan, sebagaimana diperlukan.
                          </li>
                          <li>
                            Tempatkan centang di kotak untuk mencerminkan prestasi Asesi (Kompeten
                            ‘K’ atau Belum Kompeten ‘BK’).
                          </li>
                          <li>
                            Tulis jawaban Asesi secara singkat di tempat yang disediakan untuk
                            setiap pertanyaan.
                          </li>
                        </ol>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="mb-12 w-full table-auto border-collapse border border-black">
                  <thead className="bg-primary-500">
                    <tr>
                      <th rowSpan={3}>No.</th>
                      <th rowSpan={3} colSpan={2} className="border border-black">
                        Pertanyaan
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={2} className="border border-black py-1">
                        Rekomendasi
                      </th>
                    </tr>
                    <tr>
                      <th className="w-20 border border-black py-1">K</th>
                      <th className="w-20 border border-black py-1">BK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!!pertanyaanLisan &&
                      pertanyaanLisan.map((value, index) => {
                        // console.log(value);
                        const {
                          id,
                          jawaban,
                          pertanyaan,
                          asesor_pertanyaan_lisan: asesorPertanyaanLisan,
                        } = value;

                        // console.log(asesorPertanyaanLisan);
                        return (
                          <React.Fragment key={id}>
                            <tr>
                              <td rowSpan={3} className="border border-black px-4">
                                {index + 1}.
                              </td>
                              <td colSpan={2} className="border border-black p-2">
                                {pertanyaan}
                              </td>
                              <td rowSpan={3} className="border border-black text-center">
                                <input
                                  type="checkbox"
                                  checked={false || !!asesorPertanyaanLisan[0]?.is_kompeten}
                                />
                              </td>
                              <td rowSpan={3} className="border border-black text-center">
                                <input
                                  type="checkbox"
                                  checked={false || !asesorPertanyaanLisan[0]?.is_kompeten}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-black p-2">
                                <div>
                                  <p>Kunci Jawaban :</p>
                                  <p>{jawaban}</p>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-black p-2">
                                <div>
                                  <p>Jawaban Asesi :</p>
                                  <p>{asesorPertanyaanLisan[0]?.jawaban_asesi}</p>
                                </div>
                              </td>
                            </tr>
                          </React.Fragment>
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
