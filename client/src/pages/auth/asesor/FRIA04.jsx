import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";

import axios from "../../../utils/axios";
import { cn } from "../../../utils/cn";

import { useToast } from "../../../hooks/useToast";

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
} from "../../../components/ui/alert-dialog";
import { buttonVariants } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Textarea } from "../../../components/ui/textarea";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";

export const FRIA04 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const form = useForm();
  const { toast } = useToast();

  const idAsesiSkemaSertifikasi = location?.state?.id_asesi_skema_sertifikasi;

  const [unitKompetensiData, setUnitKompetensiData] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useQuery({
    queryKey: ["asesi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(`/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}`);
    },
    onSuccess: (data) => {
      setUnitKompetensiData(data.data.data.skema_sertifikasi.unit_kompetensi);
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      await axios.post(
        "/asesor/tempat-uji-kompetensi/skema-sertifikasi/asesi/proyek-terkait-pekerjaan",
        data,
      );
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Penjelasan dan Umpan Balik Proyek Terkait Pekerjaan Selesai.",
      });

      navigate("/evaluasi-asesi/asesi", {
        state: {
          id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
          is_refetch: true,
        },
      });
    },
    onError: () => {
      toast({
        variant: "error",
        title: "Error",
        description: "Terjadi Kesalahan",
      });
    },
  });

  const onSubmit = (data) => {
    const proyek_terkait_pekerjaan = []
      .concat(...data?.proyek_terkait_pekerjaan)
      .filter((value) => value !== undefined);

    // console.log({
    //   id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
    //   is_proyek_terkait_pekerjaan_selesai: true,
    //   proyek_terkait_pekerjaan,
    // });

    try {
      mutate({
        id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
        is_proyek_terkait_pekerjaan_selesai: true,
        proyek_terkait_pekerjaan,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Penjelasan Singkat Proyek Terkait Pekerjaan
          </h1>
          <p>FR.IA.04</p>
        </div>
        <Form {...form}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              {!!unitKompetensiData &&
                unitKompetensiData.map((value, indexUnitKompetensi) => {
                  const {
                    id,
                    kode_unit_kompetensi: kodeUnitKompetensi,
                    nama_unit_kompetensi: namaUnitKompetensi,
                    proyek_terkait_pekerjaan: proyekTerkaitPekerjaan,
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
                        {!!proyekTerkaitPekerjaan &&
                          proyekTerkaitPekerjaan.map((value) => {
                            const { id, persiapan, demonstrasi } = value;

                            form.setValue(
                              `proyek_terkait_pekerjaan.${indexUnitKompetensi}.id_proyek_terkait_pekerjaan`,
                              id,
                            );

                            form.setValue(
                              `proyek_terkait_pekerjaan.${indexUnitKompetensi}.id_asesi_skema_sertifikasi`,
                              idAsesiSkemaSertifikasi,
                            );

                            return (
                              <div key={id} className="flex flex-col gap-4">
                                <div className="grid grid-cols-12 gap-8 border-b-2 border-secondary-100 p-8">
                                  <p className="font-base col-span-3 font-aileron font-bold">
                                    Hal yang harus dipersiapkan atau dilakukan atau dihasilkan untuk
                                    suatu kegiatan terstruktur
                                  </p>
                                  <p className="font-base col-span-9 font-aileron">{persiapan}</p>
                                </div>
                                <div className="grid grid-cols-12 gap-8 border-b-2 border-secondary-100 p-8">
                                  <p className="font-base col-span-3 font-aileron font-bold">
                                    Hal yang perlu didemonstrasikan
                                  </p>
                                  <p className="font-base col-span-9 font-aileron">{demonstrasi}</p>
                                </div>
                                <div className="p-8">
                                  <FormField
                                    control={form.control}
                                    name={`proyek_terkait_pekerjaan.${indexUnitKompetensi}.umpan_balik_asesi`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Umpan Balik Untuk Asesi</FormLabel>
                                        <FormControl>
                                          <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
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
                        <p className="font-anek-latin text-xl">
                          Observasi Aktivitas di Tempat Kerja
                        </p>
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
        </Form>
      </div>
    </section>
  );
};
