import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useToast } from "../../../hooks/useToast";

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
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../components/ui/form";
import { Textarea } from "../../../components/ui/textarea";

import axios from "../../../utils/axios";
import { cn } from "../../../utils/cn";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";

export const PertanyaanTertulisEsai = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const idAsesiSkemaSertifikasi = location?.state?.id_asesi_skema_sertifikasi;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pertanyaanTertulisEsai, setPertanyaanTertulisEsai] = useState();

  const form = useForm({
    defaultValues: {
      jawaban: [],
    },
  });

  useQuery({
    queryKey: ["pertanyaan-tertulis-esai", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/pertanyaan-tertulis-esai`,
      );
    },
    onSuccess: (data) => {
      setPertanyaanTertulisEsai(data.data.data.skema_sertifikasi.unit_kompetensi);
    },
  });

  const {
    mutate: mutateJawabanPertanyaanTertulisEsai,
    isSuccess: isSuccessJawabanPertanyaanTertulisEsai,
    isError: isErrorJawabanPertanyaanTertulisEsai,
  } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`/asesi/skema-sertifikasi/jawaban-pertanyaan-tertulis-esai`, data);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: "Terjadi Kesalahan",
        description: "Mohon dicoba lagi",
      });
    },
  });

  const { mutate: mutateUpdateAsesiSkemaSertifikasi } = useMutation({
    mutationFn: async (data) => {
      return await axios.patch(`/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}`, data);
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Pertanyaan Tertulis Esai telah selesai",
      });

      navigate(`/uji-kompetensi/skema-sertifikasi`, {
        state: { id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi },
      });
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: "Terjadi Kesalahan",
        description: "Mohon dicoba lagi",
      });
    },
  });

  const onSubmit = (data) => {
    const jawaban = data?.jawaban.filter((item) => item.jawaban !== undefined);

    try {
      mutateJawabanPertanyaanTertulisEsai({ jawaban });
      mutateUpdateAsesiSkemaSertifikasi({ is_pertanyaan_tertulis_esai_selesai: true });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  if (!!idAsesiSkemaSertifikasi) {
    return (
      <section>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Pertanyaan Tertulis Esai
            </h1>
            <p>FR.IA.06</p>
          </div>
          <div className="flex flex-col gap-4 rounded-lg">
            <div className="flex flex-col gap-12">
              <div className="flex w-full flex-col items-start">
                <Form {...form}>
                  <div className="flex flex-col gap-12">
                    {!!pertanyaanTertulisEsai &&
                      pertanyaanTertulisEsai.map((value) => {
                        const {
                          id,
                          kode_unit_kompetensi: kodeUnitKompetensi,
                          nama_unit_kompetensi: namaUnitKompetensi,
                          pertanyaan_tertulis_esai: pertanyaanTertulisEsai,
                        } = value;

                        return (
                          <div key={id} className="flex w-full flex-col gap-4 rounded-lg">
                            <div className="flex gap-4 rounded-lg bg-secondary-500 p-6 text-white shadow-lg">
                              <div>
                                <p className="text-xs font-bold leading-none">
                                  Kode Unit Kompetensi
                                </p>
                                <p className="text-lg">{kodeUnitKompetensi}</p>
                              </div>
                              <div>
                                <p className="text-xs font-bold leading-none">
                                  Nama Unit Kompetensi
                                </p>
                                <h3 className="text-lg">{namaUnitKompetensi}</h3>
                              </div>
                            </div>
                            <div className="flex flex-col gap-8 rounded-lg bg-white px-32 py-12 shadow-lg">
                              {!!pertanyaanTertulisEsai &&
                                pertanyaanTertulisEsai.map((value, index) => {
                                  const { id, pertanyaan } = value;

                                  // if (!!form.watch(`jawaban.${index}.jawaban`)) {
                                  // }
                                  form.setValue(
                                    `jawaban.${index}.id_asesi_skema_sertifikasi`,
                                    idAsesiSkemaSertifikasi,
                                  );
                                  form.setValue(`jawaban.${index}.id_pertanyaan_tertulis_esai`, id);

                                  form.register(`jawaban.${index}.jawaban`, { value: "" });

                                  return (
                                    <div key={id} className="flex flex-col gap-2">
                                      <div className="flex items-center gap-2">
                                        <p className="self-start">{index + 1}.</p>
                                        <p>{pertanyaan}</p>
                                      </div>
                                      <div className="px-4">
                                        <FormField
                                          control={form.control}
                                          name={`jawaban.${index}.jawaban`}
                                          render={({ field }) => (
                                            <FormItem>
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
                </Form>
              </div>
              <div className="w-full rounded-lg bg-white p-6 shadow-lg">
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogTrigger className={cn(buttonVariants(), "w-full")}>
                    Selesai
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        <div className="flex flex-col items-center gap-2">
                          <AnnotationAlert className="text-5xl text-secondary-500" />
                          <p className="font-anek-latin text-xl">Pertanyaan Tertulis Esai</p>
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
          </div>
        </div>
      </section>
    );
  } else if (!idAsesiSkemaSertifikasi) {
    return <Navigate to="/uji-kompetensi" />;
  }
};
