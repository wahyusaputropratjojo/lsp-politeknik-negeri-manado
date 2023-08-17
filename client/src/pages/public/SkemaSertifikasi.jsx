import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import axios from "../../utils/axios";

import { useToast } from "../../hooks/useToast";

import { AuthContext } from "../../context/AuthContext";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";

import AnnotationAlert from "../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import PlusCircle from "../../assets/icons/untitled-ui-icons/line/components/PlusCircle";

export const SkemaSertifikasi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  const { toast } = useToast();

  const isAuth = !!auth;
  const isAsesi = auth?.role === "Asesi";
  const isAsesor = auth?.role === "Asesor";
  const isAdministrator = auth?.role === "Administrator";

  const state = location?.state;

  const [skemaSertifikasiData, setSkemaSertifikasiData] = useState();
  const [administratorTUKData, setAdministratorTUKData] = useState();
  const [skemaSertifikasiTUKData, setSkemaSertifikasiTUKData] = useState();
  const [idSkemaSertifikasi, setIdSkemaSertifikasi] = useState();

  useQuery({
    queryKey: ["skema-sertifikasi"],
    queryFn: async () => {
      return await axios.get(`/skema-sertifikasi`);
    },
    onSuccess: (data) => {
      setSkemaSertifikasiData(data.data.data);
    },
  });

  const { refetch } = useQuery({
    queryKey: ["skema-sertifikasi", auth?.id],
    queryFn: async () => {
      if (!!isAdministrator) {
        return await axios.get(
          `/administrator/${auth?.id}/tempat-uji-kompetensi/skema-sertifikasi`,
        );
      }

      if (!!isAsesor) {
        return await axios.get(`/asesor/${auth?.id}/tempat-uji-kompetensi/skema-sertifikasi`);
      }
    },
    onSuccess: (data) => {
      if (!!isAdministrator) {
        setSkemaSertifikasiTUKData(data?.data?.data?.tempat_uji_kompetensi?.skema_sertifikasi);
      }

      if (!!isAsesor) {
        setSkemaSertifikasiTUKData(
          data?.data?.data?.asesor?.tempat_uji_kompetensi?.skema_sertifikasi,
        );
      }
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

  const { mutate: mutateDeleteSkemaSertifikasi } = useMutation({
    mutationFn: async () => {
      return await axios.delete(
        `/administrator/tempat-uji-kompetensi/skema-sertifikasi/${idSkemaSertifikasi}`,
      );
    },
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Skema Sertifikasi berhasil dihapus",
      });
      refetch();
    },
  });

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

  if (isAsesor) {
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
                        <div className="flex w-full flex-col gap-2">
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
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="error" size="xs" className="w-full">
                                Hapus
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  <div className="flex flex-col items-center gap-2">
                                    <AnnotationAlert className="text-5xl text-secondary-500" />
                                    <p className="font-anek-latin text-xl">
                                      Hapus Skema Sertifikasi
                                    </p>
                                  </div>
                                </AlertDialogTitle>
                                <AlertDialogDescription className="py-4 text-sm">
                                  Harap diingat bahwa setelah tindakan ini dilakukan, tidak akan ada
                                  kesempatan untuk mengulanginya. Apakah Anda yakin?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <div className="flex w-full gap-4">
                                  <AlertDialogCancel asChild>
                                    <Button size="sm" variant="outline-error" className="w-full">
                                      Batalkan
                                    </Button>
                                  </AlertDialogCancel>
                                  <AlertDialogAction asChild>
                                    <Button
                                      size="sm"
                                      type="submit"
                                      className="w-full"
                                      onClick={() => {
                                        try {
                                          setIdSkemaSertifikasi(id);
                                          mutateDeleteSkemaSertifikasi();
                                        } catch (error) {
                                          console.error(error);
                                        }
                                      }}>
                                      Konfirmasi
                                    </Button>
                                  </AlertDialogAction>
                                </div>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
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
