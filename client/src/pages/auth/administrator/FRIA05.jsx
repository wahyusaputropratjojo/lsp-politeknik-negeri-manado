import { useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { RadioGroup, RadioGroupItemButton } from "../../../components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Textarea } from "../../../components/ui/textarea";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import Delete from "../../../assets/icons/untitled-ui-icons/line/components/Delete";
import Edit05 from "../../../assets/icons/untitled-ui-icons/line/components/Edit05";

export const FRIA05Administrator = () => {
  const location = useLocation();
  const form = useForm({
    defaultValues: {
      pertanyaan: "",
      jawaban_pertanyaan_tertulis_pilihan_ganda: [
        {
          is_benar: false,
          jawaban: "",
        },
        {
          is_benar: false,
          jawaban: "",
        },
        {
          is_benar: false,
          jawaban: "",
        },
        {
          is_benar: false,
          jawaban: "",
        },
      ],
    },
  });
  const { toast } = useToast();

  const idUnitKompetensi = location?.state?.id_unit_kompetensi;

  const [isDialogOpen, setIsDialogOpen] = useState();
  const [pertanyaanTertulisPilihanGandaData, setPertanyaanTertulisPilihanGandaData] = useState();
  const [idPertanyaanTertulisPilihanGanda, setIdPertanyaanTertulisPilihanGanda] = useState();

  const { refetch } = useQuery({
    queryKey: ["pertanyaan-tertulis-esai", idUnitKompetensi],
    queryFn: async () => {
      return await axios.get(
        `/skema-sertifikasi/unit-kompetensi/${idUnitKompetensi}/pertanyaan-tertulis-pilihan-ganda`,
      );
    },
    onSuccess: (data) => {
      setPertanyaanTertulisPilihanGandaData(data.data.data.pertanyaan_tertulis_pilihan_ganda);
    },
  });

  const { mutate: mutateDeletePertanyaanTertulisEsai } = useMutation({
    mutationFn: async (data) => {
      return await axios.delete(
        `/skema-sertifikasi/unit-kompetensi/pertanyaan-tertulis-pilihan-ganda/${idPertanyaanTertulisPilihanGanda}`,
        data,
      );
    },
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Pertanyaan berhasil dihapus",
      });

      refetch();
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        "/skema-sertifikasi/unit-kompetensi/pertanyaan-tertulis-pilihan-ganda",
        data,
      );
    },
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Pertanyaan berhasil dibuat",
      });
      form.reset({
        pertanyaan: "",
        jawaban_pertanyaan_tertulis_pilihan_ganda: [
          {
            is_benar: false,
            jawaban: "",
          },
          {
            is_benar: false,
            jawaban: "",
          },
          {
            is_benar: false,
            jawaban: "",
          },
          {
            is_benar: false,
            jawaban: "",
          },
        ],
      });
      refetch();
    },
  });

  const onSubmit = (data) => {
    const { pertanyaan, jawaban_pertanyaan_tertulis_pilihan_ganda } = data;
    try {
      mutate({
        id_unit_kompetensi: idUnitKompetensi,
        pertanyaan,
        jawaban_pertanyaan_tertulis_pilihan_ganda,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Pertanyaan Tertulis Pilihan Ganda
          </h1>
          <p>FR.IA.05</p>
        </div>
        <div className="flex flex-col gap-4">
          {!!pertanyaanTertulisPilihanGandaData &&
            pertanyaanTertulisPilihanGandaData.length > 0 && (
              <div className="flex flex-col gap-4 rounded-lg bg-white p-12 shadow-lg">
                <div>
                  <p className="font-aileron text-xl font-bold text-secondary-500">Pertanyaan</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead className="w-3/12">Pertanyaan</TableHead>
                        <TableHead>Jawaban</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!!pertanyaanTertulisPilihanGandaData &&
                        pertanyaanTertulisPilihanGandaData.map((value, index) => {
                          const { id, pertanyaan, jawaban_pertanyaan_tertulis_pilihan_ganda } =
                            value;
                          return (
                            <TableRow key={id}>
                              <TableCell className="w-20 align-top text-base">
                                {index + 1}.
                              </TableCell>
                              <TableCell className="align-top text-base">{pertanyaan}</TableCell>
                              <TableCell>
                                <div className="flex flex-col gap-2">
                                  {!!jawaban_pertanyaan_tertulis_pilihan_ganda &&
                                    jawaban_pertanyaan_tertulis_pilihan_ganda.map(
                                      (value, index) => {
                                        const { id, jawaban, is_benar } = value;

                                        const alphabetIndex = index % 26;
                                        const alphabetCharacter = String.fromCharCode(
                                          65 + alphabetIndex,
                                        );
                                        return (
                                          <div
                                            key={id}
                                            className={cn(
                                              "flex items-center gap-4 rounded-lg border-2 border-secondary-200 px-6 py-4",
                                              {
                                                "border-success-500 bg-success-50": !!is_benar,
                                              },
                                            )}>
                                            <p
                                              className={cn(
                                                "self-start rounded-lg border-2 border-secondary-200 px-4 font-bold",
                                                {
                                                  "border-success-500 bg-success-500 text-white":
                                                    !!is_benar,
                                                },
                                              )}>
                                              {alphabetCharacter}
                                            </p>
                                            <p>{jawaban}</p>
                                          </div>
                                        );
                                      },
                                    )}
                                </div>
                              </TableCell>
                              <TableCell className="w-28 align-top">
                                <div className="flex items-center gap-2">
                                  {/* <AlertDialog>
                                <AlertDialogTrigger
                                  className={cn(buttonVariants({ size: "sm" }), "w-full")}>
                                  <Edit05 className="text-xl text-secondary-500" />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      <div className="flex flex-col items-center gap-2">
                                        <AnnotationAlert className="text-5xl text-secondary-500" />
                                        <p className="font-anek-latin text-xl">Hapus Pertanyaan</p>
                                      </div>
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="py-4 text-sm">
                                      Harap diingat bahwa setelah tindakan ini dilakukan, tidak akan
                                      ada kesempatan untuk mengulanginya. Apakah Anda yakin?
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
                                          setIdPertanyaanObservasi(id);
                                          mutateDeletePertanyaanObservasi();
                                        }}>
                                        Konfirmasi
                                      </AlertDialogAction>
                                    </div>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog> */}
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
                                              Hapus Pertanyaan
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
                                              setIdPertanyaanTertulisPilihanGanda(id);
                                              mutateDeletePertanyaanTertulisEsai();
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
              </div>
            )}
          <div className="flex flex-col gap-4 rounded-lg bg-white p-12 shadow-lg">
            <div>
              <p className="font-aileron text-xl font-bold text-secondary-500">Buat Pertanyaan</p>
            </div>
            <Form {...form}>
              <FormField
                control={form.control}
                name="pertanyaan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pertanyaan</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4">
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`jawaban_pertanyaan_tertulis_pilihan_ganda.${0}.is_benar`}
                    render={({ field }) => (
                      <FormItem className="relative top-8">
                        <FormControl>
                          <Checkbox
                            disabled={
                              form.watch(
                                `jawaban_pertanyaan_tertulis_pilihan_ganda.${1}.is_benar`,
                              ) ||
                              form.watch(
                                `jawaban_pertanyaan_tertulis_pilihan_ganda.${2}.is_benar`,
                              ) ||
                              form.watch(`jawaban_pertanyaan_tertulis_pilihan_ganda.${3}.is_benar`)
                            }
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`jawaban_pertanyaan_tertulis_pilihan_ganda.${0}.jawaban`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Jawaban A</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`jawaban_pertanyaan_tertulis_pilihan_ganda.${1}.is_benar`}
                    render={({ field }) => (
                      <FormItem className="relative top-8">
                        <FormControl>
                          <Checkbox
                            disabled={
                              form.watch(
                                `jawaban_pertanyaan_tertulis_pilihan_ganda.${0}.is_benar`,
                              ) ||
                              form.watch(
                                `jawaban_pertanyaan_tertulis_pilihan_ganda.${2}.is_benar`,
                              ) ||
                              form.watch(`jawaban_pertanyaan_tertulis_pilihan_ganda.${3}.is_benar`)
                            }
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`jawaban_pertanyaan_tertulis_pilihan_ganda.${1}.jawaban`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Jawaban B</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`jawaban_pertanyaan_tertulis_pilihan_ganda.${2}.is_benar`}
                    render={({ field }) => (
                      <FormItem className="relative top-8">
                        <FormControl>
                          <Checkbox
                            disabled={
                              form.watch(
                                `jawaban_pertanyaan_tertulis_pilihan_ganda.${0}.is_benar`,
                              ) ||
                              form.watch(
                                `jawaban_pertanyaan_tertulis_pilihan_ganda.${1}.is_benar`,
                              ) ||
                              form.watch(`jawaban_pertanyaan_tertulis_pilihan_ganda.${3}.is_benar`)
                            }
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`jawaban_pertanyaan_tertulis_pilihan_ganda.${2}.jawaban`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Jawaban C</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`jawaban_pertanyaan_tertulis_pilihan_ganda.${3}.is_benar`}
                    render={({ field }) => (
                      <FormItem className="relative top-8">
                        <FormControl>
                          <Checkbox
                            disabled={
                              form.watch(
                                `jawaban_pertanyaan_tertulis_pilihan_ganda.${0}.is_benar`,
                              ) ||
                              form.watch(
                                `jawaban_pertanyaan_tertulis_pilihan_ganda.${1}.is_benar`,
                              ) ||
                              form.watch(`jawaban_pertanyaan_tertulis_pilihan_ganda.${2}.is_benar`)
                            }
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`jawaban_pertanyaan_tertulis_pilihan_ganda.${3}.jawaban`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Jawaban D</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </Form>
          </div>
          <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-lg">
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger className={cn(buttonVariants(), "w-full")}>
                Simpan
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <div className="flex flex-col items-center gap-2">
                      <AnnotationAlert className="text-5xl text-secondary-500" />
                      <p className="font-anek-latin text-xl">Buat Pertanyaan</p>
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
      </div>
    </section>
  );
};
