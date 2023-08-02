import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../context/AuthContext";

import axios from "../../utils/axios";
import { cn } from "../../utils/cn";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { LoadingScreen } from "../../components/ui/loading-screen";

import PolteknikNegeriManado from "../../assets/logo/components/PoliteknikNegeriManado";

export const Beranda = () => {
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const isAsesor = auth?.role === "Asesor";
  const isAdministrator = auth?.role === "Administrator";

  const [skemaSertifikasiData, setSkemaSertifikasiData] = useState();

  useQuery({
    queryKey: ["skema-sertifikasi"],
    queryFn: async () => {
      return await axios.get(`/skema-sertifikasi`);
    },
    onSuccess: (data) => {
      setSkemaSertifikasiData(data.data.data);
    },
  });

  return (
    <>
      <section>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-8 items-center gap-12 rounded-lg bg-white p-16 shadow-lg">
              <div className="col-span-5 flex flex-col gap-8">
                <div>
                  <h1 className="font-anek-latin text-6xl font-semibold uppercase text-secondary-500">
                    Lembaga Sertifikasi Profesi
                  </h1>
                  <p className="font-anek-latin text-xl font-semibold uppercase text-secondary-500">
                    Politeknik Negeri Manado
                  </p>
                </div>
                <p className="font-aileron text-xl text-secondary-500">
                  Tingkatkan karir anda dengan sertifikasi profesional kami! Daftar Sekarang dan
                  buktikan keunggulan Anda.
                </p>
                <Button
                  className={cn("w-1/2", {
                    hidden: isAsesor || isAdministrator,
                  })}
                  size="lg"
                  onClick={() => {
                    navigate("/pendaftaran");
                  }}>
                  Daftar Sekarang
                </Button>
              </div>
              <div className="col-span-2 col-start-7">
                <PolteknikNegeriManado />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="w-4 rounded-lg bg-primary-500 shadow-lg"></div>
              <h2 className="w-max rounded-lg bg-secondary-500 p-4 font-anek-latin text-2xl font-semibold text-white shadow-lg">
                Skema Sertifikasi
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {!!skemaSertifikasiData &&
                skemaSertifikasiData.map((value, index) => {
                  const {
                    id,
                    kode_skema_sertifikasi: kodeSkemaSertifikasi,
                    nama_skema_sertifikasi: namaSkemaSertifikasi,
                    url_profil_skema_sertifikasi: urlProfilSkemaSertifikasi,
                  } = value;

                  if (index < 3) {
                    return (
                      <Card key={id} className="shadow-lg">
                        <CardHeader>
                          <img
                            src={urlProfilSkemaSertifikasi}
                            alt="Profil Skema Sertifikasi"
                            className="rounded-lg"
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
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              navigate(`/skema-sertifikasi/detail`, {
                                state: { id_skema_sertifikasi: id },
                              });
                            }}>
                            Lihat Skema
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  } else if (index === 3) {
                    return (
                      <div key={id} className="relative">
                        <Card className="shadow-lg">
                          <CardHeader className="select-none blur-lg">
                            <img
                              src={urlProfilSkemaSertifikasi}
                              alt="Profil Skema Sertifikasi"
                              className="rounded-lg"
                            />
                          </CardHeader>
                          <CardContent className="select-none blur-lg">
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
                          <CardFooter className="select-none blur-lg">
                            <Button
                              size="sm"
                              className="pointer-events-none w-full cursor-default"
                              onClick={() => {
                                navigate(`/skema-sertifikasi/detail`, {
                                  state: { id_skema_sertifikasi: id },
                                });
                              }}>
                              Lihat Skema
                            </Button>
                          </CardFooter>
                        </Card>
                        <div className="h-full w-full -translate-y-full rounded-lg bg-white/40">
                          <Button
                            className="absolute left-1/2 top-1/2 -translate-x-1/2"
                            size="sm"
                            onClick={() => {
                              navigate(`/skema-sertifikasi`);
                            }}>
                            Selengkapnya
                          </Button>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="w-4 rounded-lg bg-primary-500 shadow-lg"></div>
              <h2 className="w-max rounded-lg bg-secondary-500 p-4 font-anek-latin text-2xl font-semibold text-white shadow-lg">
                Lokasi
              </h2>
            </div>
            <div className="flex items-center justify-center rounded-lg bg-white p-6 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3988.417185189292!2d124.8837941!3d1.5184965!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3287a06a89181dc1%3A0x2457fc5201e05955!2sPoliteknik%20Negeri%20Manado!5e0!3m2!1sid!2sid!4v1690613327091!5m2!1sid!2sid"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-96 w-full rounded-lg"></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
