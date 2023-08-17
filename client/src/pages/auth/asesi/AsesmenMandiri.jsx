import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../../context/AuthContext";

import axios from "../../../utils/axios";

import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";

import CheckCircle from "../../../assets/icons/untitled-ui-icons/line/components/CheckCircle";
import XCircle from "../../../assets/icons/untitled-ui-icons/line/components/XCircle";

export const AsesmenMandiri = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isRefetch = location?.state?.is_refetch;

  const [asesiSkemaSertifikasi, setAsesiSkemaSertifikasi] = useState();

  const { isLoading, refetch } = useQuery({
    queryKey: ["asesi-skema-sertifikasi"],
    queryFn: async () => {
      return await axios.get(`/asesi/${auth.id}/skema-sertifikasi`);
    },
    onSuccess: (data) => {
      setAsesiSkemaSertifikasi(data.data.data.asesi.asesi_skema_sertifikasi);
    },
  });

  if (!!isRefetch) {
    refetch();
    navigate(location.pathname, {});
  }

  return (
    <div>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Asesmen Mandiri
          </h1>
          <p>Asesmen Mandiri</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {!!asesiSkemaSertifikasi &&
            asesiSkemaSertifikasi.map((value) => {
              const {
                id,
                is_asesmen_mandiri: isAsesmenMandiri,
                is_punya_asesor: isPunyaAsesor,
                is_verifikasi_berkas: isVerifikasiBerkas,
                is_asesmen_mandiri_selesai: isAsesmenMandiriSelesai,
                is_berkas_memenuhi_syarat: isBerkasMemenuhiSyarat,
                is_tidak_kompeten: isTidakKompeten,
                skema_sertifikasi: {
                  url_profil_skema_sertifikasi: urlProfilSkemaSertifikasi,
                  nama_skema_sertifikasi: namaSkemaSertifikasi,
                },
                tujuan_asesmen: tujuanAsesmen,
              } = value;

              if (
                !!isVerifikasiBerkas &&
                !!isPunyaAsesor &&
                !!isAsesmenMandiri &&
                !!isBerkasMemenuhiSyarat
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
                        <div className="grid grid-rows-2 items-center gap-x-12 gap-y-4">
                          <div>
                            <p className="text-xs font-bold leading-none">Skema Sertifikasi</p>
                            <p className="text-sm">{namaSkemaSertifikasi}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold leading-none">Tujuan Asesmen</p>
                            <p className="text-sm">{tujuanAsesmen.tujuan}</p>
                          </div>
                        </div>
                        {!!isAsesmenMandiriSelesai && (
                          <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success-500">
                            <CheckCircle className="text-2xl text-white" />
                          </div>
                        )}
                        {/* {!!isTidakKompeten && (
                          <div className="flex h-full items-center rounded-lg bg-error-500 p-4">
                            <XCircle className="text-2xl text-white" />
                          </div>
                        )} */}
                      </div>
                    </div>
                    {!isAsesmenMandiriSelesai && !isTidakKompeten && (
                      <div className="flex">
                        <Button
                          disabled={isAsesmenMandiriSelesai}
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            navigate(`formulir-asesmen-mandiri`, {
                              state: {
                                id_asesi_skema_sertifikasi: id,
                              },
                            });
                          }}>
                          Asesmen Mandiri
                        </Button>
                      </div>
                    )}
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};
