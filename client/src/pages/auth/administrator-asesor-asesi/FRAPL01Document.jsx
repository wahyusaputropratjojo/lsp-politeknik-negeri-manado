import { useState, forwardRef } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "../../../utils/axios";

export const FRAPL01Document = forwardRef((props, ref) => {
  const [asesiSkemaSertifikasiData, setAsesiSkemaSertifikasiData] = useState();

  useQuery({
    queryKey: ["FRAPL01Document", props.id],
    queryFn: async () => {
      return await axios.get(`asesi/${props.id}/fr-apl-01`);
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
      asesi: {
        data_diri: {
          alamat: {
            provinsi: { nama: namaProvinsi },
            kota_kabupaten: { nama: namaKotaKabupaten },
            kecamatan: { nama: namaKecamatan },
            kelurahan_desa: { nama: namaKelurahanDesa },
            keterangan_lainnya: keteranganLainnya,
          },
          jenis_kelamin: { jenis_kelamin: jenisKelamin },
          kualifikasi_pendidikan: { kualifikasi_pendidikan: kualifikasiPendidikan },
          negara: { nama: namaNegara },
          tempat_lahir: tempatLahir,
          tanggal_lahir,
          nomor_telepon: nomorTelepon,
          nik,
        },
        data_pekerjaan: {
          alamat: {
            provinsi: { nama: namaProvinsiKantor },
            kota_kabupaten: { nama: namaKotaKabupatenKantor },
            kecamatan: { nama: namaKecamatanKantor },
            kelurahan_desa: { nama: namaKelurahanDesaKantor },
            keterangan_lainnya: keteranganLainnyaKantor,
          },
          email: emailKantor,
          fax: faxKantor,
          jabatan,
          nama_institusi_perusahaan: namaInstitusiPerusahaan,
          nomor_telepon: nomorTeleponKantor,
        },
        user: { email, nama_lengkap: namaLengkap },
      },
      skema_sertifikasi: {
        kode_skema_sertifikasi: kodeSkemaSertifikasi,
        nama_skema_sertifikasi: namaSkemaSertifikasi,
        unit_kompetensi: unitKompetensi,
      },
      tujuan_asesmen: { tujuan },
      bukti_persyaratan_dasar: buktiPersyaratanDasar,
      created_at: createdAt,
    } = asesiSkemaSertifikasiData;

    const dateCreatedAt = new Date(createdAt);
    const tanggalPelaksanaan = dateCreatedAt.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // console.log(asesiSkemaSertifikasiData);
    const date = new Date(tanggal_lahir);
    const tanggalLahir = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <div ref={ref} className="flex flex-col gap-4 bg-white text-sm">
        <style>{setStyles()}</style>
        <div className="flex flex-col">
          <p className="mb-4 text-base font-bold uppercase">
            FR.APL.01. Permohonan Sertifikasi Profesi
          </p>
          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-2">
                <p className="font-bold">Bagian 1 : Rincian Data Pemohon Sertifikasi</p>
                <p>
                  Pada bagian ini, cantumkan data pribadi, data pendidikan formal serta data
                  pekerjaan anda pada saat ini.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-bold">a. Data Pribadi</p>
                  <table className="mx-2">
                    <tbody>
                      <tr>
                        <td className="w-56 p-1 align-top">Nama Lengkap</td>
                        <td className="p-1 align-top">:</td>
                        <td className="p-1 align-top">{namaLengkap}</td>
                      </tr>
                      <tr>
                        <td className="w-56 p-1 align-top">NIK</td>
                        <td className="p-1 align-top">:</td>
                        <td className="p-1 align-top">{nik}</td>
                      </tr>
                      <tr>
                        <td className="w-56 p-1 align-top">Tempat, Tanggal Lahir</td>
                        <td className="p-1 align-top">:</td>
                        <td className="p-1 align-top">
                          {tempatLahir}, {tanggalLahir}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-56 p-1 align-top">Jenis Kelamin</td>
                        <td className="p-1 align-top">:</td>
                        <td className="p-1 align-top">{jenisKelamin}</td>
                      </tr>
                      <tr>
                        <td className="w-56 p-1 align-top">Kebangsaan</td>
                        <td className="p-1 align-top">:</td>
                        <td className="p-1 align-top">{namaNegara}</td>
                      </tr>
                      <tr>
                        <td className="w-56 p-1 align-top">Alamat Rumah</td>
                        <td className="p-1 align-top">:</td>
                        <td className="p-1 align-top">
                          {namaProvinsi}, {namaKotaKabupaten}, {namaKecamatan}, {namaKelurahanDesa},{" "}
                          {keteranganLainnya}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-56 p-1 align-top">No. Telepon</td>
                        <td className="p-1 align-top">:</td>
                        <td className="p-1 align-top">{nomorTelepon}</td>
                      </tr>
                      <tr>
                        <td className="w-56 p-1 align-top">Email</td>
                        <td className="p-1 align-top">:</td>
                        <td className="p-1 align-top">{email}</td>
                      </tr>
                      <tr>
                        <td className="w-56 p-1 align-top">Kualifikasi Pendidikan</td>
                        <td className="p-1 align-top">:</td>
                        <td className="p-1 align-top">{kualifikasiPendidikan}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <p className="font-bold">b. Data Pekerjaan Sekarang</p>
                  <table className="mx-2">
                    <tbody>
                      <tr>
                        <td className="w-56 p-1 align-top">Nama Institusi / Perusahaan</td>
                        <td className="p-1 align-top">:</td>
                        <td className="p-1 align-top">{namaInstitusiPerusahaan}</td>
                      </tr>
                      <tr>
                        <td className="w-56 p-1 align-top">Jabatan</td>
                        <td className="p-1 align-top">:</td>
                        <td className="p-1 align-top">{jabatan}</td>
                      </tr>
                      <tr>
                        <td className="w-56 p-1 align-top">Alamat Kantor</td>
                        <td className="p-1 align-top">:</td>
                        <td className="p-1 align-top">
                          {namaProvinsiKantor}, {namaKotaKabupatenKantor}, {namaKecamatanKantor},{" "}
                          {namaKelurahanDesaKantor}, {keteranganLainnyaKantor}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-56 p-1 align-top">No. Telepon</td>
                        <td className="p-1 align-top">:</td>
                        <td className="p-1 align-top">{nomorTeleponKantor}</td>
                      </tr>
                      <tr>
                        <td className="w-56 p-1 align-top">Email</td>
                        <td className="p-1 align-top">:</td>
                        <td className="p-1 align-top">{emailKantor}</td>
                      </tr>
                      <tr>
                        <td className="w-56 p-1 align-top">Fax</td>
                        <td className="p-1 align-top">:</td>
                        <td className="p-1 align-top">{faxKantor}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <p className="font-bold">Bagian 2 : Data Sertifikasi</p>
                <p>
                  Tuliskan Judul dan Nomor Skema Sertifikasi yang anda ajukan berikut Daftar Unit
                  Kompetensi sesuai kemasan pada skema sertifikasi untuk mendapat pengakuan sesuai
                  dengan latar belakang pendidikan, pelatihan serta pengalaman kerja yang anda
                  miliki.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <table className="w-full table-auto border border-black">
                  <thead>
                    <tr>
                      <th rowSpan={2} className="w-0 border border-black px-2 font-normal">
                        Skema Sertifikasi (KKNI/Okupasi/Klaster)
                      </th>
                      <th className="w-0 border border-black px-2 text-left font-normal">Judul</th>
                      <th className="w-0 border border-black font-normal">:</th>
                      <th className="border border-black px-2 py-2 text-left font-normal">
                        {namaSkemaSertifikasi}
                      </th>
                    </tr>
                    <tr>
                      <th className="border border-black px-2 text-left font-normal">Nomor</th>
                      <th className="border border-black px-2 font-normal">:</th>
                      <th className="border border-black px-2 py-2 text-left font-normal">
                        {kodeSkemaSertifikasi}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3} className="border border-black text-center">
                        Tujuan Asesmen
                      </td>
                      <td className="border border-black p-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" checked={false || tujuan === "Sertifikasi"} />
                            <p>Sertifikasi</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={false || tujuan === "Sertifikasi Ulang"}
                            />
                            <p>Sertifikasi Ulang</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={false || tujuan === "Pengakuan Kompetensi Terkini"}
                            />
                            <p>Pengakuan Kompetensi Terkini (PKT)</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={false || tujuan === "Rekognisi Pembelajaran Lampau"}
                            />
                            <p>Rekognisi Pembelajaran Lampau</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" checked={false} />
                            <p>Lainnya</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold">Daftar Unit Kompetensi sesuai kemasan:</p>
                <table className="w-full table-auto border border-black">
                  <thead className="bg-primary-500 font-bold">
                    <tr>
                      <td className="border border-black p-4 text-center">No.</td>
                      <td className="w-32 border border-black px-2 text-center">Kode Unit</td>
                      <td className="border border-black px-2 text-center">Judul Unit</td>
                      <td className="w-40 border border-black px-2 text-center">Jenis Standar</td>
                    </tr>
                  </thead>
                  <tbody>
                    {!!unitKompetensi &&
                      unitKompetensi.map((value, index) => {
                        const {
                          id,
                          kode_unit_kompetensi: kodeUnitKompetensi,
                          nama_unit_kompetensi: namaUnitKompetensi,
                        } = value;
                        return (
                          <tr key={id}>
                            <td className="border border-black p-2 text-center">{index + 1}.</td>
                            <td className="border border-black p-2">{kodeUnitKompetensi}</td>
                            <td className="border border-black p-2">{namaUnitKompetensi}</td>
                            <td className="border border-black p-2 text-center">SKKNI</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <p className="font-bold">Bagian 3 : Bukti Kelengkapan Pemohon</p>
                <p className="font-bold">Bukti Persyaratan Dasar Pemohon</p>
              </div>
              <div>
                <table className="w-full table-auto border border-black">
                  <thead className="bg-primary-500 font-bold">
                    <tr>
                      <td className="w-12 border border-black p-4 text-center">No.</td>
                      <td className="border border-black px-2 text-center">
                        Bukti Persyaratan Dasar
                      </td>
                      <td className="w-32 border border-black px-2 text-center">Memenuhi Syarat</td>
                      <td className="w-32 border border-black px-2 text-center">
                        Tidak Memenuhi Syarat
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {!!buktiPersyaratanDasar &&
                      buktiPersyaratanDasar.map((value, index) => {
                        const { id, persyaratan_dasar } = value;

                        return (
                          <tr>
                            <td className="w-12 border border-black p-4 text-center">
                              {index + 1}.
                            </td>
                            <td className="border border-black px-2">
                              {persyaratan_dasar.persyaratan_dasar}
                            </td>
                            <td className="w-32 border border-black px-2 text-center">
                              <input type="checkbox" checked={true} />
                            </td>
                            <td className="w-32 border border-black px-2 text-center">
                              <input type="checkbox" />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <table className="w-full table-auto border border-black text-sm">
                <tbody>
                  <tr>
                    <td rowSpan={3} className="w-60 border border-black p-2 align-top">
                      <p className="font-bold">Rekomendasi (diisi oleh LSP):</p>
                      <p>Berdasarkan ketentuan persyaratan dasar, maka pemohon:</p>
                      <p>
                        <span className="font-bold">Diterima</span> /{" "}
                        <span className="font-bold line-through">Tidak diterima</span> sebagai
                        peserta sertifikasi
                      </p>
                    </td>
                    <td colSpan={2} className="border border-black p-2 align-top font-bold">
                      Pemohon / Kandidat
                    </td>
                  </tr>
                  <tr>
                    <td className="w-32 border border-black px-2">Nama</td>
                    <td className="border border-black p-2">{namaLengkap}</td>
                  </tr>
                  <tr>
                    <td className="h-20 w-32 border border-black px-2">Tanda Tangan / Tanggal</td>
                    <td className="border border-black p-2 align-top text-[10px]">
                      {tanggalPelaksanaan}
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={4} className="w-60 border border-black p-2 align-top font-bold">
                      Catatan :
                    </td>
                    <td colSpan={2} className="border border-black p-2 align-top font-bold">
                      Admin LSP
                    </td>
                  </tr>
                  <tr>
                    <td className="w-32 border border-black p-2">Nama</td>
                    <td className="border border-black"></td>
                  </tr>
                  <tr>
                    <td className="w-32 border border-black p-2">No. Reg</td>
                    <td className="border border-black"></td>
                  </tr>
                  <tr>
                    <td className="h-20 w-32 border border-black px-2">Tanda Tangan / Tanggal</td>
                    <td className="border border-black p-2 align-top text-[10px]">
                      {tanggalPelaksanaan}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
