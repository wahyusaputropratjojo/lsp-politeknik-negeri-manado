import { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../utils/axios";

import { Button } from "../../../components/ui/button";

import ClipboardX from "../../../assets/icons/untitled-ui-icons/line/components/ClipboardX";
import CheckCircle from "../../../assets/icons/untitled-ui-icons/line/components/CheckCircle";

export const EvaluasiAsesi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useContext(AuthContext);

  const state = location?.state;
  const isRefetch = state?.isRefetch;

  const [asesorAsesiData, setAsesorAsesiData] = useState();

  useQuery({
    queryKey: ["asesi-asesor", auth?.id],
    queryFn: async () => {
      return await axios.get(`/asesor/${auth?.id}/tempat-uji-kompetensi/asesi`);
    },
    onSuccess: (data) => {
      setAsesorAsesiData(data.data.data.asesor.asesor_asesi);
    },
    refetchInterval: 1000,
  });

  if (!!asesorAsesiData) {
    return (
      <section>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Evaluasi Asesi
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
                    is_evaluasi_asesi_selesai: isEvaluasiAsesiSelesai,
                    asesi: {
                      user: { nama_lengkap: namaLengkap, url_profil_user: urlProfilUser },
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
                      <div className="flex h-full w-full items-center justify-between">
                        <div className="grid grid-flow-col grid-rows-2 items-center gap-x-12 gap-y-4">
                          <div>
                            <p className="text-xs font-bold leading-none">Nama Lengkap</p>
                            <p className="text-sm">{namaLengkap}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold leading-none">Skema Sertifikasi</p>
                            <p className="text-sm">{namaSkemaSertifikasi}</p>
                          </div>
                          {!!isEvaluasiAsesiSelesai && (
                            <div>
                              <p className="text-xs font-bold leading-none">Status</p>
                              <p className="text-sm">Kompeten</p>
                            </div>
                          )}
                        </div>
                        {!!isEvaluasiAsesiSelesai && (
                          <div className="flex h-full items-center rounded-lg bg-success-500 p-4">
                            <CheckCircle className="text-2xl text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    {!isEvaluasiAsesiSelesai && (
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
                          Evaluasi
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    );
  } else if (!asesorAsesiData) {
    return (
      <section>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Evaluasi Asesi
            </h1>
            <p>Asesi</p>
          </div>
          <div className="flex h-[60vh] flex-col items-center justify-center gap-2 rounded-lg bg-white shadow-lg">
            <ClipboardX className="text-8xl text-secondary-100" />
            <p className="font-aileron text-base text-secondary-500">
              Tidak ada kegiatan Evaluasi Asesi
            </p>
          </div>
        </div>
      </section>
    );
  }
};
