import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { cn } from "../../../utils/cn";
import axios from "../../../utils/axios";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import CheckCircle from "../../../assets/icons/untitled-ui-icons/line/components/CheckCircle";
import PencilLine from "../../../assets/icons/untitled-ui-icons/line/components/PencilLine";
import InfoCircle from "../../../assets/icons/untitled-ui-icons/line/components/InfoCircle";
import { is } from "date-fns/locale";

export const UjiKompetensiDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const idAsesiSkemaSertifikasi = location?.state?.id_asesi_skema_sertifikasi;

  const [skemaSertifikasiData, setSkemaSertifikasiData] = useState();
  const [statusSkemaSertifikasiAsesi, setStatusSkemaSertifikasiAsesi] = useState();
  const [isAlertDialogOpenComponentOne, setIsAlertDialogOpenComponentOne] = useState(false);
  const [isAlertDialogOpenComponentTwo, setIsAlertDialogOpenComponentTwo] = useState(false);
  const [isAlertDialogOpenComponentThree, setIsAlertDialogOpenComponentThree] = useState(false);

  const { isLoading, isSuccess } = useQuery({
    queryKey: ["aktivitas-unit-kompetensi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/aktivitas-unit-kompetensi`,
      );
    },
    onSuccess: (data) => {
      setSkemaSertifikasiData(data.data.data);
    },
    enabled: !!idAsesiSkemaSertifikasi,
  });

  useQuery({
    queryKey: ["status-skema-sertifikasi-asesi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(`/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/status`);
    },
    onSuccess: (data) => {
      setStatusSkemaSertifikasiAsesi(data.data.data);
    },
    refetchInterval: 1000,
  });

  if (!!skemaSertifikasiData && !!statusSkemaSertifikasiAsesi && !!idAsesiSkemaSertifikasi) {
    const {
      tujuan_asesmen: { tujuan },
      skema_sertifikasi: {
        url_profil_skema_sertifikasi: urlProfilSkemaSertifikasi,
        nama_skema_sertifikasi: namaSkemaSertifikasi,
      },
    } = skemaSertifikasiData;

    const {
      is_pertanyaan_tertulis_esai_selesai: isPertanyaanTertulisEsaiSelesai,
      is_pertanyaan_tertulis_pilihan_ganda_selesai: isPertanyaanTertulisPilihanGandaSelesai,
      is_pertanyaan_tertulis: isPertanyaanTertulis,
      is_praktik_demonstrasi_selesai: isPraktikDemonstrasiSelesai,
      is_praktik_demonstrasi: isPraktikDemonstrasi,
      is_evaluasi_asesi_selesai: isEvaluasiAsesiSelesai,
    } = statusSkemaSertifikasiAsesi;

    if (!isEvaluasiAsesiSelesai) {
      return (
        <section className="flex flex-col gap-8">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Uji Kompetensi
            </h1>
            <p>Uji Kompetensi</p>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <img
                src={urlProfilSkemaSertifikasi}
                alt="Gambar Skema Sertifikasi"
                className="aspect-square w-64 rounded-lg bg-white object-cover p-6 shadow-lg"
              />
            </div>
            <div className="flex gap-12 rounded-lg bg-white p-6 shadow-lg">
              <div>
                <p className="text-xs font-bold leading-none">Skema Sertifikasi</p>
                <p className="text-sm">{namaSkemaSertifikasi}</p>
              </div>
              <div>
                <p className="text-xs font-bold leading-none">Tujuan Asesmen</p>
                <p className="text-sm">{tujuan}</p>
              </div>
            </div>
            <div className="bottom-16 flex w-full gap-6">
              <div className="flex w-full flex-col gap-4">
                <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                  <div className="flex items-center gap-6">
                    {!isPraktikDemonstrasiSelesai && (
                      <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                        <InfoCircle className="text-2xl" />
                      </div>
                    )}
                    {!!isPraktikDemonstrasiSelesai && (
                      <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                        <CheckCircle className="text-2xl" />
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold leading-none">FR.IA.02</p>
                      <p className="text-base">Tugas Praktek Demonstrasi</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button
                      size="xs"
                      onClick={() => {
                        navigate(`tugas-praktek-demonstrasi`, {
                          state: {
                            ...location.state,
                            id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                          },
                        });
                      }}>
                      Kerjakan
                    </Button>
                  </div>
                </div>
                <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                  <div className="flex items-center gap-6">
                    {!isPertanyaanTertulisPilihanGandaSelesai && (
                      <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                        <InfoCircle className="text-2xl" />
                      </div>
                    )}
                    {!!isPertanyaanTertulisPilihanGandaSelesai && (
                      <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                        <CheckCircle className="text-2xl" />
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold leading-none">FR.IA.05</p>
                      <p className="text-base">Pertanyaan Tertulis Pilihan Ganda</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {!isPertanyaanTertulisPilihanGandaSelesai && (
                      <AlertDialog
                        open={isAlertDialogOpenComponentTwo}
                        onOpenChange={setIsAlertDialogOpenComponentTwo}>
                        <AlertDialogTrigger asChild>
                          <Button size="xs">Kerjakan</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              <div className="flex flex-col items-center gap-2">
                                <AnnotationAlert className="text-5xl text-secondary-500" />
                                <p className="font-anek-latin text-xl">
                                  Pertanyaan Tertulis Pilihan Ganda
                                </p>
                              </div>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              <p className="py-4 text-sm">
                                Harap diingat bahwa setelah tindakan ini dilakukan, tidak akan ada
                                kesempatan untuk mengulanginya. Apakah Anda yakin?
                              </p>
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
                                  className="w-full"
                                  onClick={() => {
                                    navigate(`pertanyaan-tertulis-pilihan-ganda`, {
                                      state: {
                                        ...location.state,
                                        id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                        is_disabled: true,
                                      },
                                    });
                                  }}>
                                  Konfirmasi
                                </Button>
                              </AlertDialogAction>
                            </div>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                    {!!isPertanyaanTertulisPilihanGandaSelesai && (
                      <>
                        <div className="flex gap-2">
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`pertanyaan-tertulis-pilihan-ganda`, {
                                state: {
                                  ...location.state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Hasil
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                  <div className="flex items-center gap-6">
                    {!isPertanyaanTertulisEsaiSelesai && (
                      <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                        <InfoCircle className="text-2xl" />
                      </div>
                    )}
                    {!!isPertanyaanTertulisEsaiSelesai && (
                      <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                        <CheckCircle className="text-2xl" />
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold leading-none">FR.IA.06</p>
                      <p className="text-base">Pertanyaan Tertulis Esai</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {!isPertanyaanTertulisEsaiSelesai && (
                      <>
                        <AlertDialog
                          open={isAlertDialogOpenComponentThree}
                          onOpenChange={setIsAlertDialogOpenComponentThree}>
                          <AlertDialogTrigger asChild>
                            <Button size="xs">Kerjakan</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                <div className="flex flex-col items-center gap-2">
                                  <AnnotationAlert className="text-5xl text-secondary-500" />
                                  <p className="font-anek-latin text-xl">
                                    Pertanyaan Tertulis Esai
                                  </p>
                                </div>
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                <p className="py-4 text-sm">
                                  Harap diingat bahwa setelah tindakan ini dilakukan, tidak akan ada
                                  kesempatan untuk mengulanginya. Apakah Anda yakin?
                                </p>
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
                                    className="w-full"
                                    onClick={() => {
                                      navigate(`pertanyaan-tertulis-esai`, {
                                        state: {
                                          ...location.state,
                                          id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                          is_disabled: true,
                                        },
                                      });
                                    }}>
                                    Konfirmasi
                                  </Button>
                                </AlertDialogAction>
                              </div>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                    {/* {!!isPertanyaanTertulisEsaiSelesai && (
                      <>
                        <div className="flex gap-2">
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`pertanyaan-tertulis-esai`, {
                                state: {
                                  ...location.state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Hasil
                          </Button>
                        </div>
                      </>
                    )} */}
                  </div>
                </div>
                {/* {!!isPraktikDemonstrasi && (
                  <>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isPraktikDemonstrasiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isPraktikDemonstrasiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.02</p>
                          <p className="text-base">Tugas Praktek Demonstrasi</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button
                          size="xs"
                          onClick={() => {
                            navigate(`tugas-praktek-demonstrasi`, {
                              state: {
                                ...location.state,
                                id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                              },
                            });
                          }}>
                          Kerjakan
                        </Button>
                      </div>
                    </div>
                  </>
                )} */}
                {/* {!!isPertanyaanTertulis && (
                  <>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isPertanyaanTertulisPilihanGandaSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isPertanyaanTertulisPilihanGandaSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.05</p>
                          <p className="text-base">Pertanyaan Tertulis Pilihan Ganda</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isPertanyaanTertulisPilihanGandaSelesai && (
                          <AlertDialog
                            open={isAlertDialogOpenComponentTwo}
                            onOpenChange={setIsAlertDialogOpenComponentTwo}>
                            <AlertDialogTrigger asChild>
                              <Button size="xs">Kerjakan</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  <div className="flex flex-col items-center gap-2">
                                    <AnnotationAlert className="text-5xl text-secondary-500" />
                                    <p className="font-anek-latin text-xl">
                                      Pertanyaan Tertulis Pilihan Ganda
                                    </p>
                                  </div>
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  <p className="py-4 text-sm">
                                    Harap diingat bahwa setelah tindakan ini dilakukan, tidak akan
                                    ada kesempatan untuk mengulanginya. Apakah Anda yakin?
                                  </p>
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
                                      className="w-full"
                                      onClick={() => {
                                        navigate(`pertanyaan-tertulis-pilihan-ganda`, {
                                          state: {
                                            ...location.state,
                                            id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                            is_disabled: true,
                                          },
                                        });
                                      }}>
                                      Konfirmasi
                                    </Button>
                                  </AlertDialogAction>
                                </div>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                        {!!isPertanyaanTertulisPilihanGandaSelesai && (
                          <>
                            <div className="flex gap-2">
                              <Button
                                size="xs"
                                onClick={() => {
                                  navigate(`pertanyaan-tertulis-pilihan-ganda`, {
                                    state: {
                                      ...location.state,
                                      id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                    },
                                  });
                                }}>
                                Lihat Hasil
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isPertanyaanTertulisEsaiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isPertanyaanTertulisEsaiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.06</p>
                          <p className="text-base">Pertanyaan Tertulis Esai</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isPertanyaanTertulisEsaiSelesai && (
                          <>
                            <AlertDialog
                              open={isAlertDialogOpenComponentThree}
                              onOpenChange={setIsAlertDialogOpenComponentThree}>
                              <AlertDialogTrigger asChild>
                                <Button size="xs">Kerjakan</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    <div className="flex flex-col items-center gap-2">
                                      <AnnotationAlert className="text-5xl text-secondary-500" />
                                      <p className="font-anek-latin text-xl">
                                        Pertanyaan Tertulis Esai
                                      </p>
                                    </div>
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    <p className="py-4 text-sm">
                                      Harap diingat bahwa setelah tindakan ini dilakukan, tidak akan
                                      ada kesempatan untuk mengulanginya. Apakah Anda yakin?
                                    </p>
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
                                        className="w-full"
                                        onClick={() => {
                                          navigate(`pertanyaan-tertulis-esai`, {
                                            state: {
                                              ...location.state,
                                              id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                              is_disabled: true,
                                            },
                                          });
                                        }}>
                                        Konfirmasi
                                      </Button>
                                    </AlertDialogAction>
                                  </div>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                        {!!isPertanyaanTertulisEsaiSelesai && (
                          <>
                            <div className="flex gap-2">
                              <Button
                                size="xs"
                                onClick={() => {
                                  navigate(`pertanyaan-tertulis-esai`, {
                                    state: {
                                      ...location.state,
                                      id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                    },
                                  });
                                }}>
                                Lihat Hasil
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )} */}
              </div>
            </div>
          </div>
        </section>
      );
    } else if (!!isEvaluasiAsesiSelesai) {
      return (
        <Navigate
          to="/uji-kompetensi"
          state={{ id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi }}
        />
      );
    }
  } else if (!idAsesiSkemaSertifikasi) {
    return <Navigate to="/uji-kompetensi" />;
  }
};
