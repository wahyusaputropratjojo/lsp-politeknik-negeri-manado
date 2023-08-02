import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import axios from "../../../utils/axios";
import { cn } from "../../../utils/cn";

export const FRIA06 = () => {
  const location = useLocation();

  const idAsesiSkemaSertifikasi = location?.state?.id_asesi_skema_sertifikasi;

  const [unitKompetensiData, setUnitKompetensiData] = useState();

  useQuery({
    queryKey: ["asesi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(`/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}`);
    },
    onSuccess: (data) => {
      setUnitKompetensiData(data.data.data.skema_sertifikasi.unit_kompetensi);
    },
  });

  if (!!idAsesiSkemaSertifikasi) {
    return (
      <section>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Pertanyaan Tertulis Esai
            </h1>
            <p>FR.IA.06</p>
          </div>
          <div className="flex flex-col gap-8">
            {!!unitKompetensiData &&
              unitKompetensiData.map((value) => {
                const {
                  id,
                  kode_unit_kompetensi: kodeUnitKompetensi,
                  nama_unit_kompetensi: namaUnitKompetensi,
                  pertanyaan_tertulis_esai: pertanyaanTertulisEsai,
                } = value;

                return (
                  <div key={id} className="flex flex-col rounded-lg bg-white p-12 shadow-lg">
                    <div className="flex gap-12 rounded-t-lg bg-secondary-500 p-4 text-white">
                      <div>
                        <p className="text-xs font-bold leading-none">Kode Unit Kompetensi</p>
                        <p className="text-base">{kodeUnitKompetensi}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-none">Nama Unit Kompetensi</p>
                        <p className="text-base">{namaUnitKompetensi}</p>
                      </div>
                    </div>
                    <div className="rounded-b-lg border-x-2 border-b-2 border-secondary-100">
                      <div className="flex flex-col gap-8 p-12">
                        {!!pertanyaanTertulisEsai &&
                          pertanyaanTertulisEsai.map((value, index) => {
                            const { id, pertanyaan, jawaban } = value;

                            return (
                              <div key={id} className="flex flex-col gap-4">
                                <div>
                                  <p className="relative text-base">
                                    <span className="absolute -left-1 -translate-x-full">
                                      {index + 1}.
                                    </span>
                                    {pertanyaan}
                                  </p>
                                </div>
                                <div className="rounded-lg border-2 border-success-500 bg-success-50 p-4">
                                  <p className="font-aileron text-base">{jawaban}</p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    );
  } else if (!idAsesiSkemaSertifikasi) {
    return <Navigate to="/evaluasi-asesi" />;
  }
};
