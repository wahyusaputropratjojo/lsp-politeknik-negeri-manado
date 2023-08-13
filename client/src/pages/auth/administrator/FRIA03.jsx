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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
} from "../../../components/ui/table";
import { Textarea } from "../../../components/ui/textarea";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import Delete from "../../../assets/icons/untitled-ui-icons/line/components/Delete";
import Edit05 from "../../../assets/icons/untitled-ui-icons/line/components/Edit05";

export const FRIA03Administrator = () => {
  const location = useLocation();
  const form = useForm();
  const formEdit = useForm();
  const { toast } = useToast();

  const idUnitKompetensi = location?.state?.id_unit_kompetensi;

  const [isDialogOpen, setIsDialogOpen] = useState();
  const [pertanyaanObservasiData, setPertanyaanObservasiData] = useState();
  const [idPertanyaanObservasi, setIdPertanyaanObservasi] = useState();

  const { refetch } = useQuery({
    queryKey: ["pertanyaan-observasi", idUnitKompetensi],
    queryFn: async () => {
      return await axios.get(
        `/skema-sertifikasi/unit-kompetensi/${idUnitKompetensi}/pertanyaan-observasi`,
      );
    },
    onSuccess: (data) => {
      setPertanyaanObservasiData(data.data.data.pertanyaan_observasi);
    },
  });

  const { mutate: mutateDeletePertanyaanObservasi } = useMutation({
    mutationFn: async (data) => {
      return await axios.delete(
        `/skema-sertifikasi/unit-kompetensi/pertanyaan-observasi/${idPertanyaanObservasi}`,
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
      return await axios.post("/skema-sertifikasi/unit-kompetensi/pertanyaan-observasi", data);
    },
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Pertanyaan berhasil dibuat",
      });
      form.reset({
        pertanyaan: "",
      });
      refetch();
    },
  });

  const onSubmit = (data) => {
    const { pertanyaan } = data;
    try {
      mutate({
        id_unit_kompetensi: idUnitKompetensi,
        pertanyaan,
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
            Pertanyaan Untuk Mendukung Observasi
          </h1>
          <p>FR.IA.03</p>
        </div>
        <div className="flex flex-col gap-4">
          {!!pertanyaanObservasiData && pertanyaanObservasiData.length > 0 && (
            <div className="flex flex-col gap-4 rounded-lg bg-white p-12 shadow-lg">
              <div>
                <p className="font-aileron text-xl font-bold text-secondary-500">Pertanyaan</p>
              </div>
              <div className="flex flex-col gap-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Pertanyaan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!!pertanyaanObservasiData &&
                      pertanyaanObservasiData.map((value, index) => {
                        const { id, pertanyaan } = value;

                        formEdit.setValue(`pertanyaan`, pertanyaan);
                        return (
                          <TableRow key={id}>
                            <TableCell className="w-20 align-top text-base">{index + 1}.</TableCell>
                            <TableCell className="align-top text-base">{pertanyaan}</TableCell>
                            <TableCell className="w-28 align-top">
                              <div className="flex items-center gap-2">
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
                                            setIdPertanyaanObservasi(id);
                                            mutateDeletePertanyaanObservasi();
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
