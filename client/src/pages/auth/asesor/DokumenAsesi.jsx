import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../utils/axios";

import { Button } from "../../../components/ui/button";

export const DokumenAsesi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useContext(AuthContext);

  const state = location?.state;

  const [asesorAsesiData, setAsesorAsesiData] = useState();

  useQuery({
    queryKey: ["asesi-asesor", auth?.id],
    queryFn: async () => {
      return await axios.get(`/asesor/${auth?.id}/tempat-uji-kompetensi/asesi`);
    },
    onSuccess: (data) => {
      setAsesorAsesiData(data.data.data.asesor.asesor_asesi);
    },
  });

  if (!!asesorAsesiData) {
    return (
      <section>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Dokumen Asesi
            </h1>
            <p>Asesi</p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {asesorAsesiData &&
              asesorAsesiData.map((value) => {
                const {
                  id,
                  asesi_skema_sertifikasi: {
                    id: idAsesiSkemaSertifikasi,
                    asesi: {
                      data_diri: { url_profil_user: urlProfilUser },
                      user: { nama_lengkap: namaLengkap },
                    },
                    skema_sertifikasi: { nama_skema_sertifikasi: namaSkemaSertifikasi },
                  },
                } = value;

                return (
                  <div key={id} className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex items-center gap-6">
                      <div>
                        <img
                          src={urlProfilUser}
                          alt="Foto Profil"
                          className="aspect-square w-24 rounded-lg object-cover"
                        />
                      </div>
                      <div className="grid grid-rows-2 gap-x-12 gap-y-4">
                        <div>
                          <p className="text-xs font-bold leading-none">Nama Lengkap</p>
                          <p className="text-sm">{namaLengkap}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-none">Skema Sertifikasi</p>
                          <p className="text-sm">{namaSkemaSertifikasi}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          navigate(`asesi`, {
                            state: {
                              ...state,
                              id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                            },
                          });
                        }}>
                        Lihat Dokumen
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    );
  }
};
