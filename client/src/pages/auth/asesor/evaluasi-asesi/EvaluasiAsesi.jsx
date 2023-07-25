import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../../context/AuthContext";
import axios from "../../../../utils/axios";

import { Button } from "../../../../components/ui/button";

export const EvaluasiAsesi = () => {
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);
  const [statusPendaftaran, setStatusPendaftaran] = useState(null);
  const [asesorAsesiData, setAsesorAsesiData] = useState(null);

  const { isLoading, isSuccess, isError } = useQuery({
    queryKey: ["status-pendaftaran", auth.id],
    queryFn: async () => {
      return await axios.get(`/asesor/${auth.id}/tempat-uji-kompetensi/asesi`);
    },
    onSuccess: (data) => {
      setAsesorAsesiData(data.data.data.asesor.asesor_asesi);
    },
  });

  if (isSuccess && asesorAsesiData) {
    return (
      <>
        <div className="flex flex-col gap-12">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Evaluasi Asesi
            </h1>
            <p>Asesi</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {asesorAsesiData &&
              asesorAsesiData.map((value) => {
                const { id, asesi_skema_sertifikasi: asesiSkemaSertifikasi } =
                  value;

                console.log(asesiSkemaSertifikasi);
                return (
                  <div
                    key={id}
                    className="flex flex-col gap-4 rounded-lg bg-white p-6"
                  >
                    <div className="flex items-center gap-6">
                      <div>
                        <img
                          src={
                            asesiSkemaSertifikasi.asesi.data_diri.foto_profil
                          }
                          alt="Foto Profil"
                          className="aspect-square w-24 rounded-lg object-cover"
                        />
                      </div>
                      <div className="grid grid-rows-2 gap-x-12 gap-y-4">
                        <div>
                          <p className="text-xs font-bold leading-none">
                            Nama Lengkap
                          </p>
                          <p className="text-sm">
                            {asesiSkemaSertifikasi.asesi.user.nama_lengkap}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-none">
                            Skema Sertifikasi
                          </p>
                          <p className="text-sm">
                            {
                              asesiSkemaSertifikasi.skema_sertifikasi
                                .nama_skema_sertifikasi
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          navigate(
                            `/evaluasi-asesi/${asesiSkemaSertifikasi.id}`,
                          );
                        }}
                      >
                        Evaluasi
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
};
