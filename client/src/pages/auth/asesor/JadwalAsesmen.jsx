import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../utils/axios";

export const JadwalAsesmen = () => {
  const { auth } = useContext(AuthContext);
  const [jadwalAsesmen, setJadwalAsesmen] = useState(null);

  const { id } = auth;

  useQuery({
    queryKey: ["status-pendaftaran", id],
    queryFn: async () => {
      return await axios.get(`/asesor/${id}/tempat-uji-kompetensi/asesi`);
    },
    onSuccess: (data) => {
      // console.log(data.data.data.asesor.asesor_asesi);
      setJadwalAsesmen(data.data.data.asesor.asesor_asesi);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <div className="flex flex-col gap-12">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Jadwal Asesmen
          </h1>
          <p>Jadwal pelaksanaan Asesmen</p>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {jadwalAsesmen &&
            jadwalAsesmen.map((value) => {
              const {
                id,
                asesi_skema_sertifikasi: asesiSkemaSertifikasi,
                tanggal_pelaksanaan,
              } = value;
              const {
                asesi,
                skema_sertifikasi: skemaSertifikasi,
                tujuan_asesmen: tujuanAsesmen,
              } = asesiSkemaSertifikasi;
              const { data_diri: dataDiri, user } = asesi;
              const {
                nama_skema_sertifikasi: namaSkemaSertifikasi,
                tempat_uji_kompetensi: tempatUjiKompetensi,
              } = skemaSertifikasi;
              const { tujuan } = tujuanAsesmen;
              const { nama_lengkap: namaLengkap } = user;
              const { foto_profil: fotoProfil } = dataDiri;

              const { tempat_uji_kompetensi: TUK } = tempatUjiKompetensi;

              console.log(asesiSkemaSertifikasi);

              const date = new Date(tanggal_pelaksanaan);
              const tanggalPelaksanaan = date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <div key={id} className="flex flex-col gap-2">
                  <p className="w-max rounded-lg bg-white p-2 text-sm font-bold">
                    {tanggalPelaksanaan}
                  </p>
                  <div className="flex items-center gap-6 rounded-lg bg-white p-6">
                    <div>
                      <img
                        src={fotoProfil}
                        alt="Foto Profil Asesi"
                        className="aspect-square w-24 rounded-lg object-cover"
                      />
                    </div>
                    <div className="grid grid-flow-col grid-rows-2 gap-x-12 gap-y-4">
                      <div>
                        <p className="text-xs font-semibold leading-none">
                          Nama Lengkap
                        </p>
                        <p className="text-sm">{namaLengkap}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold leading-none">
                          Skema Sertifikasi
                        </p>
                        <p className="text-sm">{namaSkemaSertifikasi}</p>
                      </div>
                      <div>
                        <div>
                          <p className="text-xs font-semibold leading-none">
                            Tujuan Asesmen
                          </p>
                          <p className="text-sm">{tujuan}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold leading-none">
                          Tempat Uji Kompetensi
                        </p>
                        <p className="text-sm">{TUK}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
