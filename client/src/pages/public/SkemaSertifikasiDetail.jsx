import { useState, useContext } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";

import { AuthContext } from "../../context/AuthContext";

import axios from "../../utils/axios";
import { cn } from "../../utils/cn";

import { useToast } from "../../hooks/useToast";

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
import { Button, buttonVariants } from "../../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../components/ui/form";
import { Textarea } from "../../components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import AnnotationAlert from "../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import PlusCircle from "../../assets/icons/untitled-ui-icons/line/components/PlusCircle";
import Delete from "../../assets/icons/untitled-ui-icons/line/components/Delete";

export const SkemaSertifikasiDetail = () => {
  const form = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { auth } = useContext(AuthContext);

  const [skemaSertifikasiData, setSkemaSertifikasiData] = useState();
  const [persyaratanDasarData, setPersyaratanDasarData] = useState();
  const [idUnitKompetensi, setIdUnitKompetensi] = useState();
  const [idPersyaratanDasar, setIdPersyaratanDasar] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const state = location?.state;
  const isAsesor = auth?.role === "Asesor";
  const isAdministrator = auth?.role === "Administrator";
  const idSkemaSertifikasi = location?.state?.id_skema_sertifikasi;

  const { refetch } = useQuery({
    queryKey: ["skema-sertifikasi-detail", idSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(`/skema-sertifikasi/${idSkemaSertifikasi}`);
    },
    onSuccess: (data) => {
      setSkemaSertifikasiData(data.data.data);
    },
  });

  const { refetch: refetchPersyaratanDasar } = useQuery({
    queryKey: ["persyaratan-dasar", auth?.id],
    queryFn: async () => {
      return await axios.get(`/skema-sertifikasi/${idSkemaSertifikasi}/persyaratan-dasar`);
    },
    onSuccess: (data) => {
      setPersyaratanDasarData(data.data.data);
    },
    enabled: !!isAdministrator,
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.delete(`/skema-sertifikasi/unit-kompetensi/${idUnitKompetensi}`);
    },
    onSuccess: () => {
      refetch();
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Unit Kompetensi berhasil dihapus",
      });
    },
  });

  const { mutate: mutateDeletePersyaratanDasar } = useMutation({
    mutationFn: async () => {
      return await axios.delete(`/skema-sertifikasi/persyaratan-dasar/${idPersyaratanDasar}`);
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Unit Kompetensi berhasil dihapus",
      });
      refetchPersyaratanDasar();
    },
    enabled: !!isAdministrator,
  });

  const { mutate: mutateCreatePersyaratanDasar } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`/skema-sertifikasi/persyaratan-dasar`, data);
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Unit Kompetensi berhasil dihapus",
      });
      refetchPersyaratanDasar();
    },
    enabled: !!isAdministrator,
  });

  const onSubmit = (data) => {
    try {
      mutateCreatePersyaratanDasar({
        id_skema_sertifikasi: idSkemaSertifikasi,
        ...data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  if (!!skemaSertifikasiData && !!idSkemaSertifikasi) {
    const {
      id: idSkemaSertifikasi,
      kode_skema_sertifikasi: kodeSkemaSertifikasi,
      nama_skema_sertifikasi: namaSkemaSertifikasi,
      url_profil_skema_sertifikasi: urlProfilSkemaSertifikasi,
      unit_kompetensi: unitKompetensi,
    } = skemaSertifikasiData;

    return (
      <section>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Unit Kompetensi
            </h1>
            <p className="text-base">
              Daftar Unit Kompetensi yang terdapat pada Skema Sertifikasi {namaSkemaSertifikasi}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-max rounded-lg bg-white p-6 shadow-lg">
              <img
                src={urlProfilSkemaSertifikasi}
                alt=""
                className="aspect-square w-56 rounded-lg bg-white object-cover"
              />
            </div>
            <div className="flex gap-12 rounded-lg bg-white p-6 shadow-lg">
              <div>
                <p className="font-aileron text-xs font-bold leading-none">
                  Kode Skema Sertifikasi
                </p>
                <p className="font-aileron text-base">{kodeSkemaSertifikasi}</p>
              </div>
              <div>
                <p className="font-aileron text-xs font-bold leading-none">
                  Nama Skema Sertifikasi
                </p>
                <p className="font-aileron text-base">{namaSkemaSertifikasi}</p>
              </div>
            </div>
            {!!isAdministrator && (
              <>
                <div className="flex flex-col gap-12 rounded-lg bg-white p-6 shadow-lg">
                  <div>
                    <Table className="text-base">
                      <TableHeader>
                        <TableRow>
                          <TableHead>No.</TableHead>
                          <TableHead>Persyaratan Dasar</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {!!persyaratanDasarData &&
                          persyaratanDasarData.map((value, index) => {
                            const { id, persyaratan_dasar } = value;
                            return (
                              <TableRow key={value.id}>
                                <TableCell>{index + 1}.</TableCell>
                                <TableCell>{persyaratan_dasar}</TableCell>
                                <TableCell>
                                  <AlertDialog>
                                    <AlertDialogTrigger
                                      className={cn(
                                        buttonVariants({ variant: "error", size: "sm" }),
                                        "w-full",
                                      )}>
                                      <Delete className="text-xl text-error-500" />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          <div className="flex flex-col items-center gap-2">
                                            <AnnotationAlert className="text-5xl text-secondary-500" />
                                            <p className="font-anek-latin text-xl">
                                              Hapus Persyaratan Dasar
                                            </p>
                                          </div>
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="py-4 text-sm">
                                          Harap diingat bahwa setelah tindakan ini dilakukan, tidak
                                          akan ada kesempatan untuk mengulanginya. Apakah Anda
                                          yakin?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <div className="flex w-full gap-4">
                                          <AlertDialogCancel
                                            className={cn(
                                              buttonVariants({
                                                size: "sm",
                                                variant: "outline-error",
                                              }),
                                              "w-full",
                                            )}>
                                            Batalkan
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            className={cn(
                                              buttonVariants({
                                                size: "sm",
                                              }),
                                              "w-full",
                                            )}
                                            onClick={() => {
                                              setIdPersyaratanDasar(id);
                                              mutateDeletePersyaratanDasar();
                                            }}>
                                            Konfirmasi
                                          </AlertDialogAction>
                                        </div>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Form {...form}>
                      <FormField
                        control={form.control}
                        name="persyaratan_dasar"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Persyaratan Dasar</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </Form>
                    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <AlertDialogTrigger className={cn(buttonVariants(), "w-full")}>
                        Simpan
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            <div className="flex flex-col items-center gap-2">
                              <AnnotationAlert className="text-5xl text-secondary-500" />
                              <p className="font-anek-latin text-xl">Buat Persyaratan Dasar</p>
                            </div>
                          </AlertDialogTitle>
                          <AlertDialogDescription className="py-4 text-sm">
                            Harap diingat bahwa setelah tindakan ini dilakukan, tidak akan ada
                            kesempatan untuk mengulanginya. Apakah Anda yakin?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <div className="flex w-full gap-4">
                            <AlertDialogCancel
                              className={cn(
                                buttonVariants({
                                  size: "sm",
                                  variant: "outline-error",
                                }),
                                "w-full",
                              )}>
                              Batalkan
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className={cn(
                                buttonVariants({
                                  size: "sm",
                                }),
                                "w-full",
                              )}
                              onClick={form.handleSubmit(onSubmit)}>
                              Konfirmasi
                            </AlertDialogAction>
                          </div>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div className="flex gap-12 rounded-lg bg-white shadow-lg">
                  <div className="rounded-lg bg-white p-4">
                    <Button
                      size="xs"
                      onClick={() =>
                        navigate("buat-unit-kompetensi", {
                          state: {
                            ...state,
                            nama_skema_sertifikasi: namaSkemaSertifikasi,
                          },
                        })
                      }>
                      <div className="flex items-center gap-2">
                        <PlusCircle />
                        <p>Buat Unit Kompetensi</p>
                      </div>
                    </Button>
                  </div>
                </div>
              </>
            )}
            {!!isAdministrator && (
              <div className="flex gap-12 rounded-lg bg-white p-6 shadow-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-3/12 text-base">Kode Unit Kompetensi</TableHead>
                      <TableHead className="text-base">Nama Unit Kompetensi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!!unitKompetensi &&
                      unitKompetensi.map((value) => {
                        const {
                          id,
                          kode_unit_kompetensi: kodeUnitKompetensi,
                          nama_unit_kompetensi: namaUnitKompetensi,
                        } = value;

                        return (
                          <TableRow key={id}>
                            <TableCell className="text-base">{kodeUnitKompetensi}</TableCell>
                            <TableCell className="text-base">{namaUnitKompetensi}</TableCell>
                            <TableCell className="w-3/12 text-right text-base">
                              <div className="flex gap-2">
                                <Button
                                  size="xs"
                                  className="w-full"
                                  onClick={() =>
                                    navigate("detail-unit-kompetensi", {
                                      state: { ...state, id_unit_kompetensi: id },
                                    })
                                  }>
                                  Lihat Unit Kompetensi
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger
                                    className={cn(
                                      buttonVariants({ variant: "error", size: "xs" }),
                                    )}>
                                    <Delete className="text-3xl text-error-500" />
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        <div className="flex flex-col items-center gap-2">
                                          <AnnotationAlert className="text-5xl text-secondary-500" />
                                          <p className="font-anek-latin text-xl">
                                            Hapus Unit Kompetensi
                                          </p>
                                        </div>
                                      </AlertDialogTitle>
                                      <AlertDialogDescription className="py-4 text-sm">
                                        Harap diingat bahwa setelah tindakan ini dilakukan, tidak
                                        akan ada kesempatan untuk mengulanginya. Apakah Anda yakin?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <div className="flex w-full gap-4">
                                        <AlertDialogCancel
                                          className={cn(
                                            buttonVariants({
                                              size: "sm",
                                              variant: "outline-error",
                                            }),
                                            "w-full",
                                          )}>
                                          Batalkan
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          className={cn(
                                            buttonVariants({
                                              size: "sm",
                                            }),
                                            "w-full",
                                          )}
                                          onClick={() => {
                                            setIdUnitKompetensi(id);
                                            mutate();
                                          }}>
                                          Konfirmasi
                                        </AlertDialogAction>
                                      </div>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            )}
            {!isAdministrator && (
              <div className="flex gap-12 rounded-lg bg-white p-6 shadow-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-3/12 text-base">Kode Unit Kompetensi</TableHead>
                      <TableHead className="text-base">Nama Unit Kompetensi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!!unitKompetensi &&
                      unitKompetensi.map((value) => {
                        const {
                          id,
                          kode_unit_kompetensi: kodeUnitKompetensi,
                          nama_unit_kompetensi: namaUnitKompetensi,
                        } = value;

                        return (
                          <TableRow key={id}>
                            <TableCell className="text-base">{kodeUnitKompetensi}</TableCell>
                            <TableCell className="text-base">{namaUnitKompetensi}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            )}

            <div
              className={cn("flex gap-12 rounded-lg bg-white p-6 shadow-lg", {
                hidden: isAsesor || isAdministrator,
              })}>
              <Button
                className="w-full"
                onClick={() => {
                  navigate("/pendaftaran", { state: { id_skema_sertifikasi: idSkemaSertifikasi } });
                }}>
                Daftar
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  } else if (!idSkemaSertifikasi) {
    return <Navigate to="/skema-sertifikasi" />;
  }
};
