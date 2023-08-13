import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import axios from "../../utils/axios";

import { AuthContext } from "../../context/AuthContext";

import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";

import PlusCircle from "../../assets/icons/untitled-ui-icons/line/components/PlusCircle";

export const SkemaSertifikasi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useContext(AuthContext);

  const isAuth = !!auth;
  const isAsesi = auth?.role === "Asesi";
  const isAsesor = auth?.role === "Asesor";
  const isAdministrator = auth?.role === "Administrator";

  const state = location?.state;

  const [skemaSertifikasiData, setSkemaSertifikasiData] = useState();
  const [administratorTUKData, setAdministratorTUKData] = useState();
  const [skemaSertifikasiTUKData, setSkemaSertifikasiTUKData] = useState();

  useQuery({
    queryKey: ["skema-sertifikasi"],
    queryFn: async () => {
      return await axios.get(`/skema-sertifikasi`);
    },
    onSuccess: (data) => {
      setSkemaSertifikasiData(data.data.data);
    },
  });

  useQuery({
    queryKey: ["skema-sertifikasi", auth?.id],
    queryFn: async () => {
      return await axios.get(`/administrator/${auth?.id}/tempat-uji-kompetensi/skema-sertifikasi`);
    },
    onSuccess: (data) => {
      setSkemaSertifikasiTUKData(data?.data?.data?.tempat_uji_kompetensi?.skema_sertifikasi);
    },
  });

  useQuery({
    queryKey: ["administrator", auth?.id],
    queryFn: async () => {
      return await axios.get(`/administrator/${auth?.id}/tempat-uji-kompetensi`);
    },
    onSuccess: (data) => {
      setAdministratorTUKData(data?.data?.data?.tempat_uji_kompetensi?.tempat_uji_kompetensi);
    },
    enabled: !!isAdministrator,
  });

  console.log(skemaSertifikasiTUKData);

  if (!isAuth || isAsesi) {
    return (
      <section>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Skema Sertifikasi
            </h1>
            <p className="text-base">
              Daftar Skema Sertifikasi yang tersedia di LSP Politeknik Negeri Manado
            </p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {!!skemaSertifikasiData &&
              skemaSertifikasiData.map((value) => {
                const {
                  id,
                  kode_skema_sertifikasi: kodeSkemaSertifikasi,
                  nama_skema_sertifikasi: namaSkemaSertifikasi,
                  url_profil_skema_sertifikasi: urlProfilSkemaSertifikasi,
                } = value;

                return (
                  <Card key={id} className="shadow-lg">
                    <CardHeader>
                      <img
                        src={urlProfilSkemaSertifikasi}
                        alt="Profil Skema Sertifikasi"
                        className="aspect-square rounded-lg object-cover"
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2">
                        <div>
                          <p className="font-aileron text-xs font-bold leading-none">
                            Kode Skema Sertifikasi
                          </p>
                          <p className="truncate font-aileron text-base">{kodeSkemaSertifikasi}</p>
                        </div>
                        <div>
                          <p className="font-aileron text-xs font-bold leading-none">
                            Nama Skema Sertifikasi
                          </p>
                          <p className="truncate font-aileron text-base leading-snug">
                            {namaSkemaSertifikasi}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        size="xs"
                        className="w-full"
                        onClick={() => {
                          navigate(`unit-kompetensi`, {
                            state: {
                              ...state,
                              id_skema_sertifikasi: id,
                            },
                          });
                        }}>
                        Lihat Skema
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
          </div>
        </div>
      </section>
    );
  }

  if (isAdministrator) {
    return (
      <section>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Skema Sertifikasi
            </h1>
            <p className="text-base">
              Daftar Skema Sertifikasi yang tersedia di {administratorTUKData}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {!!isAdministrator && (
              <div className="rounded-lg bg-white p-4">
                <Button size="xs" onClick={() => navigate("buat-skema-sertifikasi")}>
                  <div className="flex items-center gap-2">
                    <PlusCircle />
                    <p>Buat Skema</p>
                  </div>
                </Button>
              </div>
            )}
            <div className="grid grid-cols-4 gap-4">
              {!!skemaSertifikasiTUKData &&
                skemaSertifikasiTUKData.map((value) => {
                  const {
                    id,
                    kode_skema_sertifikasi: kodeSkemaSertifikasi,
                    nama_skema_sertifikasi: namaSkemaSertifikasi,
                    url_profil_skema_sertifikasi: urlProfilSkemaSertifikasi,
                  } = value;

                  return (
                    <Card key={id} className="shadow-lg">
                      <CardHeader>
                        <img
                          src={urlProfilSkemaSertifikasi}
                          alt="Profil Skema Sertifikasi"
                          className="aspect-square rounded-lg object-cover"
                        />
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2">
                          <div>
                            <p className="font-aileron text-xs font-bold leading-none">
                              Kode Skema Sertifikasi
                            </p>
                            <p className="truncate font-aileron text-base">
                              {kodeSkemaSertifikasi}
                            </p>
                          </div>
                          <div>
                            <p className="font-aileron text-xs font-bold leading-none">
                              Nama Skema Sertifikasi
                            </p>
                            <p className="truncate font-aileron text-base leading-snug">
                              {namaSkemaSertifikasi}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          size="xs"
                          className="w-full"
                          onClick={() => {
                            navigate(`unit-kompetensi`, {
                              state: {
                                ...state,
                                id_skema_sertifikasi: id,
                                
                              },
                            });
                          }}>
                          Lihat Skema
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    );
  }
};
