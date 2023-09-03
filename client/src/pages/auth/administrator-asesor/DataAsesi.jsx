import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "../../../utils/axios";

import { AuthContext } from "../../../context/AuthContext";

import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "../../../components/ui/table";
import { set } from "date-fns";

export const DataAsesi = () => {
  const { auth } = useContext(AuthContext);
  const id = auth?.id;
  const isAsesor = auth?.role === "Asesor";
  const isAdministrator = auth?.role === "Administrator";

  const [asesorAsesiData, setAsesorAsesiData] = useState();
  const [administratorAsesiData, setAdministratorAsesiData] = useState();
  const [tempatUjiKompetensiData, setTempatUjiKompetensiData] = useState();

  useQuery({
    queryKey: ["asesi", id],
    queryFn: async () => {
      return await axios.get(`/asesor/${id}/tempat-uji-kompetensi/asesi`);
    },
    onSuccess: (data) => {
      setAsesorAsesiData(data?.data?.data?.asesor?.asesor_asesi);
    },
    enabled: !!isAsesor,
  });

  useQuery({
    queryKey: ["asesi", id],
    queryFn: async () => {
      return await axios.get(`/administrator/${id}/tempat-uji-kompetensi/asesi`);
    },
    onSuccess: (data) => {
      setAdministratorAsesiData(data?.data?.data?.tempat_uji_kompetensi?.skema_sertifikasi);
      setTempatUjiKompetensiData(data?.data?.data?.tempat_uji_kompetensi);
    },
    enabled: !!isAdministrator,
  });

  if (!!asesorAsesiData && asesorAsesiData.length > 0) {
    return (
      <section>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Data Asesi
            </h1>
            <p>Data Asesi</p>
          </div>
          <div className="block rounded-lg bg-white p-6 shadow-lg">
            <table className="block w-full table-auto overflow-x-auto rounded-lg border-2 border-secondary-100">
              <thead className="border-2 border-secondary-500 bg-secondary-500 text-white">
                <tr>
                  <th className="p-6">No.</th>
                  <th className="p-6">Foto</th>
                  <th className="p-6">Nama</th>
                  <th className="p-6">Skema Sertifikasi</th>
                  <th className="p-6">Tujuan Asesmen</th>
                  <th className="p-6">Jenis Kelamin</th>
                  <th className="p-6">NIK</th>
                  <th className="p-6">Kebangsaan</th>
                  <th className="p-6">Tempat, Tanggal Lahir</th>
                  <th className="p-6">Kualifikasi Pendidikan</th>
                  <th className="p-6">Alamat Rumah</th>
                  <th className="p-6">Email</th>
                  <th className="p-6">Nomor Telepon</th>
                  <th className="p-6">Nama Institusi / Perusahaan</th>
                  <th className="p-6">Jabatan</th>
                  <th className="p-6">Nomor Telepon Kantor</th>
                  <th className="p-6">Email Kantor</th>
                  <th className="p-6">Fax Kantor</th>
                  <th className="p-6">Tanggal Pendaftaran</th>
                </tr>
              </thead>
              <tbody>
                {!!asesorAsesiData &&
                  asesorAsesiData.map((value, index) => {
                    const {
                      id,
                      asesi_skema_sertifikasi: {
                        created_at,
                        skema_sertifikasi: { nama_skema_sertifikasi: namaSkemaSertifikasi },
                        tujuan_asesmen: { tujuan },
                        asesi: {
                          user: {
                            nama_lengkap: namaLengkap,
                            url_profil_user: urlProfilUser,
                            email: emailAsesi,
                          },
                          data_diri: {
                            jenis_kelamin: { jenis_kelamin: jenisKelamin },
                            kualifikasi_pendidikan: {
                              kualifikasi_pendidikan: kualifikasiPendidikan,
                            },
                            negara: { nama: namaNegara },
                            nik,
                            nomor_telepon: nomorTeleponAsesi,
                            tanggal_lahir,
                            tempat_lahir: tempatLahir,
                            alamat: {
                              provinsi: { nama: namaProvinsiRumah },
                              kota_kabupaten: { nama: namaKotaKabupatenRumah },
                              kecamatan: { nama: namaKecamatanRumah },
                              kelurahan_desa: { nama: namaKelurahanDesaRumah },
                              keterangan_lainnya: keteranganLainnya,
                            },
                          },
                          data_pekerjaan: {
                            nama_institusi_perusahaan: namaInstitusiPerusahaan,
                            jabatan,
                            nomor_telepon: nomorTeleponKantor,
                            email: emailKantor,
                            fax: faxKantor,
                          },
                        },
                      },
                    } = value;

                    const date = new Date(tanggal_lahir);
                    const date_created_at = new Date(created_at);
                    const tanggalLahir = date.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                    const tanggalPendaftaran = date_created_at.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });

                    return (
                      <tr key={id} className="text-sm">
                        <td className="border-2 border-b-0 border-l-0 border-secondary-100 px-4 py-2 text-center">
                          {index + 1}.
                        </td>
                        <td className="min-w-[6rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                          <img
                            src={urlProfilUser}
                            alt=""
                            className="aspect-square w-24 rounded-lg object-cover"
                          />
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                          {namaLengkap}
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                          {namaSkemaSertifikasi}
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                          {tujuan}
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                          {jenisKelamin}
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                          {nik}
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                          {namaNegara}
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                          {tempatLahir}, {tanggalLahir}
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                          {kualifikasiPendidikan}
                        </td>
                        <td className="min-w-[32rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                          {namaProvinsiRumah}, {namaKotaKabupatenRumah}, {namaKecamatanRumah},{" "}
                          {namaKelurahanDesaRumah}, {keteranganLainnya}
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                          {emailAsesi}
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                          {nomorTeleponAsesi}
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                          {namaInstitusiPerusahaan}
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                          {jabatan}
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                          {nomorTeleponKantor}
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                          {emailKantor}
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                          {faxKantor}
                        </td>
                        <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                          {tanggalPendaftaran}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  } else if (!!asesorAsesiData && asesorAsesiData.length === 0) {
    return (
      <section>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Data Asesi
            </h1>
            <p>Data Asesi</p>
          </div>
          <div>
            <p>Belum Mempunyai Asesi</p>
          </div>
        </div>
      </section>
    );
  } else if (!!administratorAsesiData) {
    return (
      <section>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Data Asesi
            </h1>
            <p>Data Asesi {tempatUjiKompetensiData?.tempat_uji_kompetensi}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <table className="block w-full table-auto overflow-x-auto rounded-lg border-2 border-secondary-100">
              <thead className="border-2 border-secondary-500 bg-secondary-500 text-white">
                <tr>
                  <th className="p-6">Foto</th>
                  <th className="p-6">Nama</th>
                  <th className="p-6">Skema Sertifikasi</th>
                  <th className="p-6">Tujuan Asesmen</th>
                  <th className="p-6">Asesor</th>
                  <th className="p-6">Jenis Kelamin</th>
                  <th className="p-6">NIK</th>
                  <th className="p-6">Kebangsaan</th>
                  <th className="p-6">Tempat, Tanggal Lahir</th>
                  <th className="p-6">Kualifikasi Pendidikan</th>
                  <th className="p-6">Alamat Rumah</th>
                  <th className="p-6">Email</th>
                  <th className="p-6">Nomor Telepon</th>
                  <th className="p-6">Nama Institusi / Perusahaan</th>
                  <th className="p-6">Jabatan</th>
                  <th className="p-6">Nomor Telepon Kantor</th>
                  <th className="p-6">Email Kantor</th>
                  <th className="p-6">Fax Kantor</th>
                  <th className="p-6">Tanggal Pendaftaran</th>
                  <th className="p-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {!!administratorAsesiData &&
                  administratorAsesiData.map((value) => {
                    const {
                      nama_skema_sertifikasi: namaSkemaSertifikasi,
                      asesi_skema_sertifikasi: asesiSkemaSertifikasi,
                    } = value;

                    return asesiSkemaSertifikasi.map((value) => {
                      const {
                        asesi: {
                          user: {
                            nama_lengkap: namaLengkap,
                            url_profil_user: urlProfilUser,
                            email: emailAsesi,
                          },
                          data_diri: {
                            jenis_kelamin: { jenis_kelamin: jenisKelamin },
                            kualifikasi_pendidikan: {
                              kualifikasi_pendidikan: kualifikasiPendidikan,
                            },
                            negara: { nama: namaNegara },
                            nik,
                            nomor_telepon: nomorTeleponAsesi,
                            tanggal_lahir,
                            tempat_lahir: tempatLahir,
                            alamat: {
                              provinsi: { nama: namaProvinsiRumah },
                              kota_kabupaten: { nama: namaKotaKabupatenRumah },
                              kecamatan: { nama: namaKecamatanRumah },
                              kelurahan_desa: { nama: namaKelurahanDesaRumah },
                              keterangan_lainnya: keteranganLainnya,
                            },
                          },
                          data_pekerjaan: {
                            nama_institusi_perusahaan: namaInstitusiPerusahaan,
                            jabatan,
                            nomor_telepon: nomorTeleponKantor,
                            email: emailKantor,
                            fax: faxKantor,
                          },
                        },
                        asesor_asesi,
                        is_evaluasi_asesi_selesai: isEvaluasiAsesiSelesai,
                        is_tidak_kompeten: isTidakKompeten,
                        is_kompeten: isKompeten,
                        created_at,
                        tujuan_asesmen: { tujuan },
                      } = value;

                      console.log(asesor_asesi[0]?.asesor?.user?.nama_lengkap);

                      const date = new Date(tanggal_lahir);
                      const tanggalLahir = date.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      });

                      const date_created_at = new Date(created_at);
                      const tanggalPendaftaran = date_created_at.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      });

                      return (
                        <tr key={id} className="text-sm">
                          <td className="min-w-[6rem] border-2 border-b-0 border-l-0 border-secondary-100 px-4 py-2">
                            <img
                              src={urlProfilUser}
                              alt=""
                              className="aspect-square w-24 rounded-lg object-cover"
                            />
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                            {namaLengkap}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                            {namaSkemaSertifikasi}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                            {tujuan}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                            {asesor_asesi[0]?.asesor?.user?.nama_lengkap}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                            {jenisKelamin}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                            {nik}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                            {namaNegara}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                            {tempatLahir}, {tanggalLahir}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-secondary-100 px-4 py-2">
                            {kualifikasiPendidikan}
                          </td>
                          <td className="min-w-[32rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                            {namaProvinsiRumah}, {namaKotaKabupatenRumah}, {namaKecamatanRumah},{" "}
                            {namaKelurahanDesaRumah}, {keteranganLainnya}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                            {emailAsesi}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                            {nomorTeleponAsesi}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                            {namaInstitusiPerusahaan}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                            {jabatan}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                            {nomorTeleponKantor}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                            {emailKantor}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                            {faxKantor}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                            {tanggalPendaftaran}
                          </td>
                          <td className="min-w-[16rem] border-2 border-b-0 border-r-0 border-secondary-100 px-4 py-2">
                            {!!isEvaluasiAsesiSelesai && !!isKompeten && "Kompeten"}
                            {!!isEvaluasiAsesiSelesai && !!isTidakKompeten && "Tidak Kompeten"}
                            {!isEvaluasiAsesiSelesai && "Dalam Proses Asesmen"}
                          </td>
                        </tr>
                      );
                    });
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
};
