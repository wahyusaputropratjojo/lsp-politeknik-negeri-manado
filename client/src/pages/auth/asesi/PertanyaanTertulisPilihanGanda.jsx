import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";

import axios from "../../../utils/axios";
import { cn } from "../../../utils/cn";

import { toast } from "../../../hooks/useToast";

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
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../components/ui/form";
import { RadioGroup, RadioGroupItemButton } from "../../../components/ui/radio-group";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import { is } from "date-fns/locale";

export const PertanyaanTertulisPilihanGanda = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const idAsesiSkemaSertifikasi = location?.state?.id_asesi_skema_sertifikasi;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pertanyaanTertulisPilihanGandaData, setPertanyaanTertulisPilihanGandaData] = useState();
  const [statusAsesiSkemaSertifikasiData, setStatusAsesiSkemaSertifikasiData] = useState();

  const isPertanyaanTertulisPilihanGandaSelesai =
    statusAsesiSkemaSertifikasiData?.is_pertanyaan_tertulis_pilihan_ganda_selesai;

  const form = useForm({});

  useQuery({
    queryKey: ["asesi-skema-sertifikasi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(`/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/status`);
    },
    onSuccess: (data) => {
      setStatusAsesiSkemaSertifikasiData(data.data.data);
    },
  });

  useQuery({
    queryKey: ["pertanyaan-tertulis-pilihan-ganda", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/pertanyaan-tertulis-pilihan-ganda`,
      );
    },
    onSuccess: (data) => {
      setPertanyaanTertulisPilihanGandaData(data.data.data.skema_sertifikasi.unit_kompetensi);
    },
  });

  const { mutate: mutateJawabanPertanyaanTertulisPilihanGanda } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        `/asesi/skema-sertifikasi/jawaban-pertanyaan-tertulis-pilihan-ganda`,
        data,
      );
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
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Pertanyaan Tertulis Pilihan Ganda telah selesai",
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
    // const jawaban = data.filter(
    //   (item) =>
    //     item?.unit_kompetensi?.jawaban?.id_jawaban_pertanyaan_tertulis_pilihan_ganda !== undefined,
    // );

    const jawaban = data.unit_kompetensi.flatMap((unit) =>
      unit.jawaban.filter(
        (item) =>
          item.id_asesi_skema_sertifikasi !== undefined &&
          item.id_jawaban_pertanyaan_tertulis_pilihan_ganda !== undefined,
      ),
    );

    console.log(jawaban);

    try {
      mutateJawabanPertanyaanTertulisPilihanGanda({
        jawaban,
      });
      mutateUpdateAsesiSkemaSertifikasi({
        is_pertanyaan_tertulis_pilihan_ganda_selesai: true,
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
              Pertanyaan Tertulis Pilihan Ganda
            </h1>
            <p>FR.IA.05</p>
          </div>
          <div className="flex flex-col gap-4 rounded-lg">
            <div className="flex flex-col gap-12">
              <div className="flex w-full flex-col items-start">
                <Form {...form}>
                  <div className="flex flex-col gap-12">
                    {!!pertanyaanTertulisPilihanGandaData &&
                      pertanyaanTertulisPilihanGandaData.map((value, indexUnitKompetensi) => {
                        const {
                          id,
                          kode_unit_kompetensi: kodeUnitKompetensi,
                          nama_unit_kompetensi: namaUnitKompetensi,
                          pertanyaan_tertulis_pilihan_ganda: pertanyaanTertulisPilihanGanda,
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
                              {!!pertanyaanTertulisPilihanGanda &&
                                pertanyaanTertulisPilihanGanda.map((value, indexPertanyaan) => {
                                  const {
                                    id,
                                    pertanyaan,
                                    jawaban_pertanyaan_tertulis_pilihan_ganda:
                                      jawabanPertanyaanTertulisPilihanGanda,
                                  } = value;

                                  if (
                                    !!form.watch(
                                      `unit_kompetensi.${indexUnitKompetensi}.jawaban.${indexPertanyaan}.id_jawaban_pertanyaan_tertulis_pilihan_ganda`,
                                    )
                                  ) {
                                    form.setValue(
                                      `unit_kompetensi.${indexUnitKompetensi}.jawaban.${indexPertanyaan}.is_benar`,
                                      true,
                                    );
                                    form.setValue(
                                      `unit_kompetensi.${indexUnitKompetensi}.jawaban.${indexPertanyaan}.id_asesi_skema_sertifikasi`,
                                      idAsesiSkemaSertifikasi,
                                    );
                                  }

                                  return (
                                    <div key={id} className="flex flex-col gap-2">
                                      <div className="flex items-center gap-2">
                                        <p className="self-start font-aileron">
                                          {indexPertanyaan + 1}.
                                        </p>
                                        <p className="font-aileron text-base">{pertanyaan}</p>
                                      </div>
                                      <div className="px-4">
                                        <FormField
                                          control={form.control}
                                          name={`unit_kompetensi.${indexUnitKompetensi}.jawaban.${indexPertanyaan}.id_jawaban_pertanyaan_tertulis_pilihan_ganda`}
                                          render={({ field }) => (
                                            <FormItem className="space-y-3">
                                              <FormControl>
                                                <RadioGroup onValueChange={field.onChange}>
                                                  <div className="grid gap-4">
                                                    {!!jawabanPertanyaanTertulisPilihanGanda &&
                                                      jawabanPertanyaanTertulisPilihanGanda.map(
                                                        (value, index) => {
                                                          const {
                                                            id,
                                                            jawaban,
                                                            is_benar,
                                                            asesi_jawaban_pertanyaan_tertulis_pilihan_ganda,
                                                          } = value;

                                                          const alphabetIndex = index % 26;
                                                          const alphabetCharacter =
                                                            String.fromCharCode(65 + alphabetIndex);

                                                          return (
                                                            <FormItem key={id}>
                                                              <FormControl>
                                                                <RadioGroupItemButton
                                                                  disabled={
                                                                    isPertanyaanTertulisPilihanGandaSelesai
                                                                  }
                                                                  value={id}
                                                                  className={cn(
                                                                    {
                                                                      "hover:bg-transparent":
                                                                        isPertanyaanTertulisPilihanGandaSelesai,
                                                                    },
                                                                    {
                                                                      "border-error-500 bg-error-50 hover:bg-error-50":
                                                                        isPertanyaanTertulisPilihanGandaSelesai &&
                                                                        asesi_jawaban_pertanyaan_tertulis_pilihan_ganda[0]
                                                                          ?.is_benar,
                                                                    },
                                                                    {
                                                                      "border-success-500 bg-success-50 hover:bg-success-50":
                                                                        isPertanyaanTertulisPilihanGandaSelesai &&
                                                                        is_benar,
                                                                    },
                                                                  )}>
                                                                  <div className="flex items-center gap-4 ">
                                                                    <p
                                                                      className={cn(
                                                                        "flex h-min w-max rounded-lg border-2 px-4 font-aileron text-base font-bold transition-colors group-data-[state=checked]:border-secondary-100 group-data-[state=unchecked]:border-secondary-100 group-data-[state=checked]:bg-primary-500",
                                                                        {
                                                                          "bg-error-500 text-white group-data-[state=unchecked]:border-error-500":
                                                                            isPertanyaanTertulisPilihanGandaSelesai &&
                                                                            asesi_jawaban_pertanyaan_tertulis_pilihan_ganda[0]
                                                                              ?.is_benar,
                                                                        },
                                                                        {
                                                                          "bg-success-500 text-white group-data-[state=unchecked]:border-success-500":
                                                                            isPertanyaanTertulisPilihanGandaSelesai &&
                                                                            is_benar,
                                                                        },
                                                                      )}>
                                                                      {alphabetCharacter}
                                                                    </p>
                                                                    <p className="font-aileron text-base">
                                                                      {jawaban}
                                                                    </p>
                                                                  </div>
                                                                </RadioGroupItemButton>
                                                              </FormControl>
                                                            </FormItem>
                                                          );
                                                        },
                                                      )}
                                                  </div>
                                                </RadioGroup>
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
              {!isPertanyaanTertulisPilihanGandaSelesai && (
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
                            <p className="font-anek-latin text-xl">
                              Pertanyaan Tertulis Pilihan Ganda
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
              )}
            </div>
          </div>
        </div>
      </section>
    );
  } else if (!idAsesiSkemaSertifikasi) {
    return <Navigate to="/uji-kompetensi" />;
  }
};
