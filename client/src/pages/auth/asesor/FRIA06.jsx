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
import { Button, buttonVariants } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";

export const FRIA06 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const form = useForm();
  const { toast } = useToast();

  const idAsesiSkemaSertifikasi = location?.state?.id_asesi_skema_sertifikasi;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [unitKompetensiData, setUnitKompetensiData] = useState();
  const [jawabanPertanyaanTertulisEsaiData, setJawabanPertanyaanTertulisEsaiData] = useState();

  useQuery({
    queryKey: ["asesi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(`/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}`);
    },
    onSuccess: (data) => {
      setUnitKompetensiData(data.data.data.skema_sertifikasi.unit_kompetensi);
      setJawabanPertanyaanTertulisEsaiData(data.data.data.asesi_jawaban_pertanyaan_tertulis_esai);
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        `/asesor/tempat-uji-kompetensi/asesi/evaluasi-jawaban-pertanyaan-esai`,
        data,
      );
    },
    onSuccess: (data) => {
      navigate("/evaluasi-asesi/asesi", {
        state: {
          id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
          is_refetch: true,
        },
      });
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Berhasil menyelesaikan evaluasi pertanyaan tertulis esai",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Berhasil menyelesaikan evaluasi pertanyaan tertulis esai",
      });
    },
  });

  const onSubmit = (data) => {
    const evaluasi_pertanyaan_tertulis_esai = []
      .concat(...data.unit_kompetensi)
      .filter((value) => value !== undefined);

    try {
      mutate({
        id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
        is_evaluasi_pertanyaan_tertulis_esai_selesai: true,
        evaluasi_pertanyaan_tertulis_esai,
      });
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
          <Form {...form}>
            <div className="flex flex-col gap-8">
              {!!unitKompetensiData &&
                unitKompetensiData.map((value, indexUnitKompetensi) => {
                  const {
                    id,
                    kode_unit_kompetensi: kodeUnitKompetensi,
                    nama_unit_kompetensi: namaUnitKompetensi,
                    pertanyaan_tertulis_esai: pertanyaanTertulisEsai,
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
                        <div className="flex flex-col gap-8 p-12">
                          {!!pertanyaanTertulisEsai &&
                            pertanyaanTertulisEsai.map((value, indexPertanyaanTertulisEsai) => {
                              const {
                                id,
                                pertanyaan,
                                jawaban,
                                asesi_jawaban_pertanyaan_tertulis_esai,
                              } = value;

                              form.register(
                                `unit_kompetensi.${indexUnitKompetensi}.${indexPertanyaanTertulisEsai}.is_kompeten`,
                                { value: false },
                              );

                              form.setValue(
                                `unit_kompetensi.${indexUnitKompetensi}.${indexPertanyaanTertulisEsai}.id_jawaban_pertanyaan_tertulis_esai`,
                                asesi_jawaban_pertanyaan_tertulis_esai[0]?.id,
                              );

                              return (
                                <div key={id} className="flex flex-col gap-4">
                                  <div>
                                    <p className="relative text-base">
                                      <span className="absolute -left-1 -translate-x-full">
                                        {indexPertanyaanTertulisEsai + 1}.
                                      </span>
                                      {pertanyaan}
                                    </p>
                                  </div>
                                  <table className="w-full">
                                    <thead>
                                      <tr className="border-2 border-secondary-100 bg-primary-500">
                                        <th className="w-6/12 p-4">Kunci Jawaban</th>
                                        <th className="w-6/12 p-4">Jawaban Asesi</th>
                                        <th className="min-w-[4rem] p-4">K</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="border-2 border-secondary-100">
                                        <td className="border-2 border-secondary-100 p-4 align-top text-sm">
                                          {jawaban}
                                        </td>
                                        <td className="border-2 border-secondary-100 p-4 align-top text-sm">
                                          {asesi_jawaban_pertanyaan_tertulis_esai[0]?.jawaban}
                                        </td>
                                        <td className="border-2 border-secondary-100 text-center">
                                          <FormField
                                            control={form.control}
                                            name={`unit_kompetensi.${indexUnitKompetensi}.${indexPertanyaanTertulisEsai}.is_kompeten`}
                                            render={({ field }) => (
                                              <FormItem className="flex items-center">
                                                <FormControl>
                                                  <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                  />
                                                </FormControl>
                                              </FormItem>
                                            )}
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              );
                            })}

                          {/* {!!jawabanPertanyaanTertulisEsaiData &&
                            jawabanPertanyaanTertulisEsaiData.map(
                              (value, indexPertanyaanTertulisEsai) => {
                                const {
                                  id,
                                  jawaban: jawabanAsesi,
                                  pertanyaan_tertulis_esai: {
                                    id: idPertanyaanTertulisEsai,
                                    pertanyaan,
                                    jawaban: kunciJawaban,
                                  },
                                } = value;

                                form.register(
                                  `unit_kompetensi.${indexUnitKompetensi}.${indexPertanyaanTertulisEsai}.is_kompeten`,
                                  { value: false },
                                );

                                form.setValue(
                                  `unit_kompetensi.${indexUnitKompetensi}.${indexPertanyaanTertulisEsai}.id_jawaban_pertanyaan_tertulis_esai`,
                                  id,
                                );

                                return (
                                  <div key={id} className="flex flex-col gap-4">
                                    <div>
                                      <p className="relative text-base">
                                        <span className="absolute -left-1 -translate-x-full">
                                          {indexPertanyaanTertulisEsai + 1}.
                                        </span>
                                        {pertanyaan}
                                      </p>
                                    </div>
                                    <table className="w-full">
                                      <thead>
                                        <tr className="border-2 border-secondary-100 bg-primary-500">
                                          <th className="w-6/12 p-4">Kunci Jawaban</th>
                                          <th className="w-6/12 p-4">Jawaban Asesi</th>
                                          <th className="min-w-[4rem] p-4">K</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr className="border-2 border-secondary-100">
                                          <td className="border-2 border-secondary-100 p-4 align-top text-sm">
                                            {kunciJawaban}
                                          </td>
                                          <td className="border-2 border-secondary-100 p-4 align-top text-sm">
                                            {jawabanAsesi}
                                          </td>
                                          <td className="border-2 border-secondary-100 text-center">
                                            <FormField
                                              control={form.control}
                                              name={`unit_kompetensi.${indexUnitKompetensi}.${indexPertanyaanTertulisEsai}.is_kompeten`}
                                              render={({ field }) => (
                                                <FormItem className="flex items-center">
                                                  <FormControl>
                                                    <Checkbox
                                                      checked={field.value}
                                                      onCheckedChange={field.onChange}
                                                    />
                                                  </FormControl>
                                                </FormItem>
                                              )}
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                );
                              },
                            )} */}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Form>
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
                      <p className="font-anek-latin text-xl">Pertanyaan Tertulis Esai</p>
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
      </section>
    );
  } else if (!idAsesiSkemaSertifikasi) {
    return <Navigate to="/evaluasi-asesi" />;
  }
};
