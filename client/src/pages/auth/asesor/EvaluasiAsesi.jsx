import { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../utils/axios";

import { Button } from "../../../components/ui/button";

import ClipboardX from "../../../assets/icons/untitled-ui-icons/line/components/ClipboardX";
import CheckCircle from "../../../assets/icons/untitled-ui-icons/line/components/CheckCircle";
import XCircle from "../../../assets/icons/untitled-ui-icons/line/components/XCircle";

export const EvaluasiAsesi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useContext(AuthContext);

  const pathname = location?.pathname;
  const state = location?.state;
  const isRefetch = state?.is_refetch;

  console.log(isRefetch);

  const [asesorAsesiData, setAsesorAsesiData] = useState();

  const { refetch } = useQuery({
    queryKey: ["asesi-asesor", auth?.id],
    queryFn: async () => {
      return await axios.get(`/asesor/${auth?.id}/tempat-uji-kompetensi/asesi`);
    },
    onSuccess: (data) => {
      setAsesorAsesiData(data.data.data.asesor.asesor_asesi);
    },
    refetchInterval: 1000,
  });

  useEffect(() => {
    if (!!isRefetch) {
      refetch();
      navigate(pathname, {
        state: {
          ...state,
          is_refetch: false,
        },
      });
    }
  }, []);

  if (!!asesorAsesiData && asesorAsesiData.length === 0) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Evaluasi Asesi
          </h1>
          <p>Evaluasi Asesi untuk Peserta Bimbingan Asesi</p>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-base">Tidak ada jadwal asesmen</p>
          </div>
        </div>
      </div>
    );
  }

  if (!!asesorAsesiData) {
    return (
      <section>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Evaluasi Asesi
            </h1>
            <p>Evaluasi Asesi untuk Peserta Bimbingan Asesi</p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {asesorAsesiData &&
              asesorAsesiData.map((value) => {
                const {
                  id,
                  asesi_skema_sertifikasi: {
                    id: idAsesiSkemaSertifikasi,
                    is_evaluasi_asesi_selesai: isEvaluasiAsesiSelesai,
                    is_tidak_kompeten: isTidakKompeten,
                    is_kompeten: isKompeten,
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
                          {!!isEvaluasiAsesiSelesai && !!isKompeten && (
                            <div>
                              <p className="text-xs font-bold leading-none">Status</p>
                              <p className="text-sm">Kompeten</p>
                            </div>
                          )}
                          {!!isEvaluasiAsesiSelesai && !!isTidakKompeten && (
                            <div>
                              <p className="text-xs font-bold leading-none">Status</p>
                              <p className="text-sm">Tidak Kompeten</p>
                            </div>
                          )}
                        </div>
                        {!!isEvaluasiAsesiSelesai && !!isKompeten && (
                          <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success-500">
                            <CheckCircle className="text-2xl text-white" />
                          </div>
                        )}
                        {!!isEvaluasiAsesiSelesai && !!isTidakKompeten && (
                          <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-error-500">
                            <XCircle className="text-2xl text-white" />
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
                    {!!isEvaluasiAsesiSelesai && (
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
                          Lihat Hasil
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
  }
};
