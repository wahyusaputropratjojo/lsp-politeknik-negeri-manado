import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Textarea } from "../../../components/ui/textarea";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import Delete from "../../../assets/icons/untitled-ui-icons/line/components/Delete";
import PlusSquare from "../../../assets/icons/untitled-ui-icons/line/components/PlusSquare";
import XCircle from "../../../assets/icons/untitled-ui-icons/line/components/XCircle";

export const FRIA01Administrator = () => {
  const location = useLocation();
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      elemen: "",
      kriteria_unjuk_kerja: [
        {
          kriteria_unjuk_kerja: "",
        },
      ],
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState();
  const [idAktivitasUnitKompetensi, setIdAktivitasUnitKompetensi] = useState();
  const [aktivitasUnitKompetensiData, setAktivitasUnitKompetensiData] = useState();

  const idUnitKompetensi = location?.state?.id_unit_kompetensi;

  const { refetch } = useQuery({
    queryKey: ["aktivitas-unit-kompetensi", idUnitKompetensi],
    queryFn: async () => {
      return await axios.get(
        `/skema-sertifikasi/unit-kompetensi/${idUnitKompetensi}/aktivitas-unit-kompetensi`,
      );
    },
    onSuccess: (data) => {
      setAktivitasUnitKompetensiData(data.data.data.aktivitas_unit_kompetensi);
    },
  });

  const { mutate: mutateDeleteAktivitasUnitKompetensi } = useMutation({
    mutationFn: async (data) => {
      return await axios.delete(
        `/skema-sertifikasi/unit-kompetensi/aktivitas-unit-kompetensi/${idAktivitasUnitKompetensi}`,
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
      return await axios.post(`/skema-sertifikasi/unit-kompetensi/aktivitas-unit-kompetensi`, data);
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Berhasil menambahkan aktivitas unit kompetensi",
      });
      refetch();
      form.reset({
        elemen: "",
        kriteria_unjuk_kerja: [
          {
            kriteria_unjuk_kerja: "",
          },
        ],
      });
    },
  });

  const onSubmit = (data) => {
    try {
      mutate({
        id_unit_kompetensi: idUnitKompetensi,
        ...data,
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
            Observasi Aktivitas di Tempat Kerja
          </h1>
          <p>FR.IA.01</p>
        </div>
        {!!aktivitasUnitKompetensiData && aktivitasUnitKompetensiData.length > 0 && (
          <div className="flex w-full rounded-lg bg-white p-16 shadow-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-20 min-w-[4rem] text-base">No</TableHead>
                  <TableHead>Elemen</TableHead>
                  <TableHead>Kriteria Unjuk Kerja</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!!aktivitasUnitKompetensiData &&
                  aktivitasUnitKompetensiData.map((value, index) => {
                    const {
                      id: idAktivitasUnitKompetensi,
                      elemen,
                      kriteria_unjuk_kerja: kriteriaUnjukKerja,
                    } = value;
                    return (
                      <TableRow key={idAktivitasUnitKompetensi}>
                        <TableCell className="align-top text-base">{index + 1}.</TableCell>
                        <TableCell className="hypens-auto align-top text-base" lang="id">
                          <p className="text-base">{elemen}</p>
                        </TableCell>
                        <TableCell
                          className="hyphens-auto text-justify align-top text-base"
                          lang="id">
                          <ul>
                            {!!kriteriaUnjukKerja &&
                              kriteriaUnjukKerja.map((value) => {
                                const { id, kriteria_unjuk_kerja: kriteriaUnjukKerja } = value;
                                return (
                                  <li key={id} className="list-disc text-base">
                                    {kriteriaUnjukKerja}
                                  </li>
                                );
                              })}
                          </ul>
                        </TableCell>
                        <TableCell className="w-28 align-top text-base">
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
                                    <p className="font-anek-latin text-xl">Hapus Aktivitas</p>
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
                                    onClick={() => {
                                      setIdAktivitasUnitKompetensi(idAktivitasUnitKompetensi);
                                      mutateDeleteAktivitasUnitKompetensi();
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
        )}
        <div className="flex w-full rounded-lg bg-white p-16 shadow-lg">
          <Form {...form}>
            <div className="flex w-full flex-col gap-4">
              <FormField
                control={form.control}
                name="elemen"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Elemen</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <KriteriaUnjukKerja form={form} />
            </div>
          </Form>
        </div>
        <div className="flex rounded-lg bg-white p-6 shadow-lg">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger className={cn(buttonVariants(), "w-full")}>
              Simpan
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <div className="flex flex-col items-center gap-2">
                    <AnnotationAlert className="text-5xl text-secondary-500" />
                    <p className="font-anek-latin text-xl">Buat Aktivitas</p>
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
};

const KriteriaUnjukKerja = ({ form }) => {
  const { fields, remove, append } = useFieldArray({
    name: `kriteria_unjuk_kerja`,
    control: form.control,
  });

  const kriteriaUnjukKerjaFields = fields.map((field, index) => {
    return (
      <div key={field.id} className="relative flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-aileron text-secondary-300 transition-colors hover:text-secondary-400">
            Kriteria Unjuk Kerja
          </p>
          <FormField
            control={form.control}
            name={`kriteria_unjuk_kerja.${index}.kriteria_unjuk_kerja`}
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute -left-2 top-1 -translate-x-full">
                  {index + 1}
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {index > 0 && (
          <button
            type="button"
            className="absolute -top-2 right-0 rounded-lg bg-error-50 p-1 text-xl text-error-500 transition-colors hover:bg-error-100"
            onClick={() => remove(index)}>
            <XCircle />
          </button>
        )}
        {index === fields.length - 1 && (
          <Button
            size="sm"
            className="w-full"
            onClick={() =>
              append({
                kriteria_unjuk_kerja: "",
              })
            }>
            <PlusSquare className="text-xl" />
          </Button>
        )}
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-8">{kriteriaUnjukKerjaFields}</div>
    </div>
  );
};
