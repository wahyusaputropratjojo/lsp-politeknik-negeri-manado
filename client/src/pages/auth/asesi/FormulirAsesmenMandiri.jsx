import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import axios from "../../../utils/axios";
import { cn } from "../../../utils/cn";

import { toast } from "../../../hooks/useToast";

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
import { Button, buttonVariants } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";

export const FormulirAsesmenMandiriDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const idAsesiSkemaSertifikasi = location?.state?.id_asesi_skema_sertifikasi;

  const [skemaSertifikasiData, setSkemaSertifikasiData] = useState();
  const [isAsesmenMandiriSelesai, setIsAsesmenMandiriSelesai] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      asesmen_mandiri: [],
    },
  });

  useQuery({
    queryKey: ["asesi-skema-sertifikasi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(`/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}`);
    },
    onSuccess: (data) => {
      setIsAsesmenMandiriSelesai(data.data.data.is_asesmen_mandiri_selesai);
    },
  });

  useQuery({
    queryKey: ["aktivitas-unit-kompetensi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/aktivitas-unit-kompetensi`,
      );
    },
    onSuccess: (data) => {
      setSkemaSertifikasiData(data.data.data.skema_sertifikasi);
    },
  });

  const { mutate: mutateAsesiSkemaSertifikasi } = useMutation({
    mutationFn: async (data) => {
      return await axios.patch(`/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}`, data);
    },
  });

  const { mutate: mutateAsesmenMandiri } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`/asesi/asesmen-mandiri`, data);
    },
  });

  const mergeAktivitasUnitKompetensi = (data) => {
    const aktivitasUnitKompetensiArrays = data.asesmen_mandiri.map(
      (item) => item.aktivitas_unit_kompetensi,
    );

    const mergedAktivitasUnitKompetensi = [].concat(...aktivitasUnitKompetensiArrays);

    return mergedAktivitasUnitKompetensi;
  };

  const onSubmit = (data) => {
    const asesmen_mandiri = mergeAktivitasUnitKompetensi(data);

    try {
      mutateAsesmenMandiri({
        asesmen_mandiri,
      });

      mutateAsesiSkemaSertifikasi({
        is_asesmen_mandiri_selesai: true,
      });

      toast({
        variant: "success",
        title: "Berhasil",
        description: "Asesmen mandiri telah di selesaikan.",
      });

      navigate("/asesmen-mandiri", {
        state: {
          is_refetch: true,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  if (!!idAsesiSkemaSertifikasi && !!skemaSertifikasiData && !isAsesmenMandiriSelesai) {
    const {
      kode_skema_sertifikasi: kodeSkemaSertifikasi,
      nama_skema_sertifikasi: namaSkemaSertifikasi,
      url_profil_skema_sertifikasi: urlProfilSkemaSertifikasi,
      unit_kompetensi: unitKompetensi,
    } = skemaSertifikasiData;

    return (
      <section className="flex flex-col gap-8">
        <div className="flex flex-col">
          <h1 className="font-anek-latin text-5xl font-semibold uppercase">
            Formulir Asesmen Mandiri
          </h1>
          <p className="font-aileron text-sm">FR.APL.02</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-max rounded-lg bg-white p-6 shadow-lg">
            <img
              src={urlProfilSkemaSertifikasi}
              alt=""
              className="aspect-square w-56 rounded-lg bg-white object-cover"
            />
          </div>
          <div className="flex gap-8 rounded-lg bg-white p-6 shadow-lg">
            <div>
              <p className="text-xs font-bold leading-none">Kode Skema Sertifikasi</p>
              <p className="text-sm">{kodeSkemaSertifikasi}</p>
            </div>
            <div>
              <p className="text-xs font-bold leading-none">Nama Skema Sertifikasi</p>
              <p className="text-sm">{namaSkemaSertifikasi}</p>
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <Form {...form}>
              <form>
                <div className="flex flex-col gap-12">
                  {!!unitKompetensi &&
                    unitKompetensi.map((value, indexUnitKompetensi) => {
                      const {
                        id,
                        kode_unit_kompetensi: kodeUnitKompetensi,
                        nama_unit_kompetensi: namaUnitKompetensi,
                        aktivitas_unit_kompetensi: aktivitasUnitKompetensi,
                      } = value;

                      return (
                        <div key={id}>
                          <div className="rounded-t-lg bg-secondary-500 p-6 text-white">
                            <div className="flex flex-col items-start justify-start">
                              <p className="text-xs font-bold leading-none">{kodeUnitKompetensi}</p>
                              <p className="text-left text-lg leading-normal">
                                {namaUnitKompetensi}
                              </p>
                            </div>
                          </div>
                          <div className="rounded-b-lg border-x-2 border-b-2 border-secondary-100 p-12">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="h-20 min-w-[4rem] text-base">No.</TableHead>
                                  <TableHead className="h-20 w-full text-base">
                                    Dapatkah Saya...?
                                  </TableHead>
                                  <TableHead className="h-20 min-w-[4rem] text-center text-base">
                                    <div className="flex flex-col items-center">
                                      <p>K</p>
                                      <Checkbox
                                        onCheckedChange={(value) => {
                                          if (value === true) {
                                            for (const [
                                              index,
                                              value,
                                            ] of aktivitasUnitKompetensi.entries()) {
                                              form.setValue(
                                                `asesmen_mandiri.${indexUnitKompetensi}.aktivitas_unit_kompetensi.${index}.is_kompeten`,
                                                true,
                                              );
                                            }
                                          } else if (value === false) {
                                            for (const [
                                              index,
                                              value,
                                            ] of aktivitasUnitKompetensi.entries()) {
                                              form.setValue(
                                                `asesmen_mandiri.${indexUnitKompetensi}.aktivitas_unit_kompetensi.${index}.is_kompeten`,
                                                false,
                                              );
                                            }
                                          }
                                        }}
                                      />
                                    </div>
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {!!aktivitasUnitKompetensi &&
                                  aktivitasUnitKompetensi.map(
                                    (value, indexAktivitasUnitKompetensi) => {
                                      const {
                                        id,
                                        elemen,
                                        kriteria_unjuk_kerja: kriteriaUnjukKerja,
                                      } = value;

                                      form.setValue(
                                        `asesmen_mandiri.${indexUnitKompetensi}.aktivitas_unit_kompetensi.${indexAktivitasUnitKompetensi}.id_aktivitas_unit_kompetensi`,
                                        id,
                                      );

                                      form.setValue(
                                        `asesmen_mandiri.${indexUnitKompetensi}.aktivitas_unit_kompetensi.${indexAktivitasUnitKompetensi}.id_asesi_skema_sertifikasi`,
                                        idAsesiSkemaSertifikasi,
                                      );

                                      form.register(
                                        `asesmen_mandiri.${indexUnitKompetensi}.aktivitas_unit_kompetensi.${indexAktivitasUnitKompetensi}.is_kompeten`,
                                        { value: false },
                                      );

                                      return (
                                        <TableRow key={id}>
                                          <TableCell>
                                            <div>
                                              <p className="text-base">
                                                {indexAktivitasUnitKompetensi + 1}
                                              </p>
                                            </div>
                                          </TableCell>
                                          <TableCell>
                                            <div>
                                              <p className="text-base">{elemen}</p>
                                            </div>
                                            {!!kriteriaUnjukKerja &&
                                              kriteriaUnjukKerja.map((value, index) => {
                                                const {
                                                  id,
                                                  kriteria_unjuk_kerja: kriteriaUnjukKerja,
                                                } = value;
                                                return (
                                                  <ul key={id} className="ml-4 list-disc text-base">
                                                    <li>{kriteriaUnjukKerja}</li>
                                                  </ul>
                                                );
                                              })}
                                          </TableCell>
                                          <TableCell>
                                            <div className="flex flex-col items-center">
                                              <FormField
                                                control={form.control}
                                                name={`asesmen_mandiri.${indexUnitKompetensi}.aktivitas_unit_kompetensi.${indexAktivitasUnitKompetensi}.is_kompeten`}
                                                render={({ field }) => (
                                                  <FormItem>
                                                    <FormControl>
                                                      <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                      />
                                                    </FormControl>
                                                    <FormMessage />
                                                  </FormItem>
                                                )}
                                              />
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                      );
                                    },
                                  )}
                                {/* <Test
                                  form={form}
                                  indexUnitKompetensi={indexUnitKompetensi}
                                  aktivitasUnitKompetensi={aktivitasUnitKompetensi}
                                  idAsesiSkemaSertifikasi={idAsesiSkemaSertifikasi}
                                /> */}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </form>
            </Form>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger className={cn(buttonVariants(), "w-full")}>
                Selesai
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <div className="flex flex-col items-center gap-2">
                      <AnnotationAlert className="text-5xl text-secondary-500" />
                      <p className="font-anek-latin text-xl">Asesmen Mandiri</p>
                    </div>
                  </AlertDialogTitle>
                  <AlertDialogDescription className="py-4 text-sm">
                    Harap diingat bahwa setelah tindakan ini dilakukan, tidak akan ada kesempatan
                    untuk mengulanginya. Apakah Anda yakin?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <div className="flex w-full gap-4">
                    <AlertDialogCancel
                      className={cn(
                        buttonVariants({ size: "sm", variant: "outline-error" }),
                        "w-full",
                      )}>
                      Batalkan
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className={cn(buttonVariants({ size: "sm" }), "w-full")}
                      onClick={form.handleSubmit(onSubmit)}>
                      Konfirmasi
                    </AlertDialogAction>
                  </div>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </section>
    );
  } else if (!idAsesiSkemaSertifikasi || !!isAsesmenMandiriSelesai) {
    return <Navigate to="/asesmen-mandiri" />;
  }
};
