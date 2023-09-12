import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../../context/AuthContext";

import axios from "../../../utils/axios";

import { Button } from "../../../components/ui/button";

import CheckCircle from "../../../assets/icons/untitled-ui-icons/line/components/CheckCircle";
import XCircle from "../../../assets/icons/untitled-ui-icons/line/components/XCircle";

export const UjiKompetensi = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [asesiSkemaSertifikasi, setAsesiSkemaSertifikasi] = useState();
  const [idAsesiSkemaSertifikasi, setIdAsesiSkemaSertifikasi] = useState();
  const [isAsesmenMandiriSelesai, setIsAsesmenMandiriSelesai] = useState();

  useQuery({
    queryKey: ["asesi-skema-sertifikasi"],
    queryFn: async () => {
      return await axios.get(`/asesi/${auth.id}/skema-sertifikasi`);
    },
    onSuccess: (data) => {
      setAsesiSkemaSertifikasi(data.data.data.asesi.asesi_skema_sertifikasi);
      setIdAsesiSkemaSertifikasi(data.data.data.asesi.asesi_skema_sertifikasi[0].id);
    },
  });

  useQuery({
    queryKey: ["asesi-skema-sertifikasi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(`/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/status`);
    },
    onSuccess: (data) => {
      setIsAsesmenMandiriSelesai(data.data.data.is_asesmen_mandiri_selesai);
    },
  });

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
          Uji Kompetensi
        </h1>
        <p>Uji Kompetensi</p>
      </div>
      {!!isAsesmenMandiriSelesai && (
        <div>
          <div className="grid grid-cols-1 gap-4">
            {!!asesiSkemaSertifikasi &&
              asesiSkemaSertifikasi.map((value) => {
                const {
                  id,
                  is_asesmen_mandiri: isAsesmenMandiri,
                  is_punya_asesor: isPunyaAsesor,
                  is_verifikasi_berkas: isVerifikasiBerkas,
                  is_asesmen_mandiri_selesai: isAsesmenMandiriSelesai,
                  is_evaluasi_asesi_selesai: isEvaluasiAsesiSelesai,
                  is_tidak_kompeten: isTidakKompeten,
                  is_kompeten: isKompeten,
                  is_berkas_memenuhi_syarat: isBerkasMemenuhiSyarat,
                  skema_sertifikasi: {
                    url_profil_skema_sertifikasi: urlProfilSkemaSertifikasi,
                    nama_skema_sertifikasi: namaSkemaSertifikasi,
                  },
                  tujuan_asesmen: tujuanAsesmen,
                } = value;

                if (
                  isVerifikasiBerkas &&
                  isPunyaAsesor &&
                  isAsesmenMandiri &&
                  isBerkasMemenuhiSyarat
                ) {
                  return (
                    <div key={id} className="flex flex-col gap-6 rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex gap-6">
                        <div>
                          <img
                            src={urlProfilSkemaSertifikasi}
                            alt="Foto Profil"
                            className="aspect-square w-24 rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex w-full items-center justify-between">
                          <div className="grid grid-flow-col grid-rows-2 items-center gap-x-12 gap-y-4">
                            <div>
                              <p className="text-xs font-bold leading-none">Skema Sertifikasi</p>
                              <p className="text-sm">{namaSkemaSertifikasi}</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-none">Tujuan Asesmen</p>
                              <p className="text-sm">{tujuanAsesmen.tujuan}</p>
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
                                <p className="text-sm">Belum Kompeten</p>
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
                        <div className="flex">
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              navigate(`/uji-kompetensi/skema-sertifikasi`, {
                                state: {
                                  id_asesi_skema_sertifikasi: id,
                                },
                              });
                            }}>
                            Uji Kompetensi
                          </Button>
                        </div>
                      )}
                      {!!isEvaluasiAsesiSelesai && (
                        <div className="flex">
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              navigate(`/uji-kompetensi/skema-sertifikasi`, {
                                state: {
                                  id_asesi_skema_sertifikasi: id,
                                },
                              });
                            }}>
                            Lihat Hasil
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
          </div>
        </div>
      )}
    </section>
  );
};
