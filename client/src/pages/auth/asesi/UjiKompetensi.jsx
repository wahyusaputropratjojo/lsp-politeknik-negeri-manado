import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../../context/AuthContext";

import axios from "../../../utils/axios";

import { Button } from "../../../components/ui/button";

import CheckCircle from "../../../assets/icons/untitled-ui-icons/line/components/CheckCircle";

export const UjiKompetensi = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [asesiSkemaSertifikasi, setAsesiSkemaSertifikasi] = useState();

  const { isLoading } = useQuery({
    queryKey: ["asesi-skema-sertifikasi"],
    queryFn: async () => {
      return await axios.get(`/asesi/${auth.id}/skema-sertifikasi`);
    },
    onSuccess: (data) => {
      setAsesiSkemaSertifikasi(data.data.data.asesi.asesi_skema_sertifikasi);
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
      <div>
        <div className="grid grid-cols-1 gap-8">
          {asesiSkemaSertifikasi &&
            asesiSkemaSertifikasi.map((value) => {
              const {
                id,
                is_asesmen_mandiri: isAsesmenMandiri,
                is_punya_asesor: isPunyaAsesor,
                is_verifikasi_berkas: isVerifikasiBerkas,
                is_asesmen_mandiri_selesai: isAsesmenMandiriSelesai,
                skema_sertifikasi: {
                  url_profil_skema_sertifikasi: urlProfilSkemaSertifikasi,
                  nama_skema_sertifikasi: namaSkemaSertifikasi,
                },
                tujuan_asesmen: tujuanAsesmen,
              } = value;

              if (isVerifikasiBerkas && isPunyaAsesor && isAsesmenMandiri) {
                return (
                  <div
                    key={id}
                    className="flex flex-col gap-6 rounded-lg bg-white p-6 shadow-lg"
                  >
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
                            <p className="text-xs font-bold leading-none">
                              Skema Sertifikasi
                            </p>
                            <p className="text-sm">{namaSkemaSertifikasi}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold leading-none">
                              Tujuan Asesmen
                            </p>
                            <p className="text-sm">{tujuanAsesmen.tujuan}</p>
                          </div>
                        </div>
                        {/* {isAsesmenMandiriSelesai && (
                          <div className="flex h-full items-center rounded-lg bg-success-500 p-4">
                            <CheckCircle className="text-2xl text-white" />
                          </div>
                        )} */}
                      </div>
                    </div>
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
                        }}
                      >
                        Uji Kompetensi
                      </Button>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </section>
  );
};
