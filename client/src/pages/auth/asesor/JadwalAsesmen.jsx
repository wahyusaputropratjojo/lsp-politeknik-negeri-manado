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
      <div className="flex flex-col gap-8">
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
                asesi_skema_sertifikasi: {
                  asesi: {
                    data_diri: { url_profil_user: urlProfilUser },
                    user: { nama_lengkap: namaLengkap },
                  },
                  skema_sertifikasi: {
                    nama_skema_sertifikasi: namaSkemaSertifikasi,
                    tempat_uji_kompetensi: {
                      tempat_uji_kompetensi: tempatUjiKompetensi,
                    },
                  },
                  tujuan_asesmen: { tujuan },
                },
                tanggal_pelaksanaan,
              } = value;

              const date = new Date(tanggal_pelaksanaan);
              const tanggalPelaksanaan = date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <div key={id} className="flex flex-col gap-2">
                  <p className="w-max rounded-lg bg-white p-2 text-sm font-bold shadow-lg">
                    {tanggalPelaksanaan}
                  </p>
                  <div className="flex items-center gap-6 rounded-lg bg-white p-6 shadow-lg">
                    <div>
                      <img
                        src={urlProfilUser}
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
                        <p className="text-sm">{tempatUjiKompetensi}</p>
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
