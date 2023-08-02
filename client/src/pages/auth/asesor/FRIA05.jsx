import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import axios from "../../../utils/axios";
import { cn } from "../../../utils/cn";

export const FRIA05 = () => {
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
              Pertanyaan Tertulis Pilihan Ganda
            </h1>
            <p>FR.IA.05</p>
          </div>
          <div className="flex flex-col gap-8">
            {!!unitKompetensiData &&
              unitKompetensiData.map((value) => {
                const {
                  id,
                  kode_unit_kompetensi: kodeUnitKompetensi,
                  nama_unit_kompetensi: namaUnitKompetensi,
                  pertanyaan_tertulis_pilihan_ganda: pertanyaanTertulisPilihanGanda,
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
                        {!!pertanyaanTertulisPilihanGanda &&
                          pertanyaanTertulisPilihanGanda.map((value, index) => {
                            const {
                              id,
                              pertanyaan,
                              jawaban_pertanyaan_tertulis_pilihan_ganda:
                                jawabanPertanyaanTertulisPilihanGanda,
                            } = value;

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
                                <div className="grid grid-cols-2 gap-4">
                                  {!!jawabanPertanyaanTertulisPilihanGanda &&
                                    jawabanPertanyaanTertulisPilihanGanda.map((value, index) => {
                                      const { id, is_benar: isBenar, jawaban } = value;

                                      const alphabetIndex = index % 26;
                                      const alphabetCharacter = String.fromCharCode(
                                        65 + alphabetIndex,
                                      );
                                      return (
                                        <div
                                          key={id}
                                          className="flex rounded-lg border-2 border-secondary-100 p-4">
                                          <div className="flex items-center gap-2">
                                            <p
                                              className={cn(
                                                "rounded-lg border-2 border-secondary-100 px-4 font-aileron text-base font-bold",
                                                {
                                                  "border-success-50 bg-success-500 text-success-50":
                                                    isBenar,
                                                },
                                              )}>
                                              {alphabetCharacter}
                                            </p>
                                            <p className="relative text-base">{jawaban}</p>
                                          </div>
                                        </div>
                                      );
                                    })}
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
