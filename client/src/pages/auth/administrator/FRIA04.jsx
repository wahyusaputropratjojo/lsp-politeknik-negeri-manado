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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Textarea } from "../../../components/ui/textarea";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import Delete from "../../../assets/icons/untitled-ui-icons/line/components/Delete";
import Edit05 from "../../../assets/icons/untitled-ui-icons/line/components/Edit05";

export const FRIA04Administrator = () => {
  const location = useLocation();
  const form = useForm();
  const { toast } = useToast();

  const idUnitKompetensi = location?.state?.id_unit_kompetensi;

  const [isDialogOpen, setIsDialogOpen] = useState();
  const [proyekTerkaitPekerjaanData, setProyekTerkaitPekerjaanData] = useState();
  const [idProyekTerkaitPekerjaan, setIdProyekTerkaitPekerjaan] = useState();

  const { refetch } = useQuery({
    queryKey: ["proyek-terkait-pekerjaan", idUnitKompetensi],
    queryFn: async () => {
      return await axios.get(
        `/skema-sertifikasi/unit-kompetensi/${idUnitKompetensi}/proyek-terkait-pekerjaan`,
      );
    },
    onSuccess: (data) => {
      setProyekTerkaitPekerjaanData(data.data.data.proyek_terkait_pekerjaan);
    },
  });

  const { mutate: mutateDeleteProyekTerkaitPekerjaan } = useMutation({
    mutationFn: async (data) => {
      return await axios.delete(
        `/skema-sertifikasi/unit-kompetensi/proyek-terkait-pekerjaan/${idProyekTerkaitPekerjaan}`,
        data,
      );
    },
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Proyek terkait pekerjaan berhasil dihapus",
      });
      refetch();
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      return await axios.post("/skema-sertifikasi/unit-kompetensi/proyek-terkait-pekerjaan", data);
    },
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Proyek terkait pekerjaan berhasil dibuat",
      });
      form.reset({
        persiapan: "",
        demonstrasi: "",
      });
      refetch();
    },
  });

  const onSubmit = (data) => {
    const { persiapan, demonstrasi } = data;
    try {
      // console.log({
      //   id_unit_kompetensi: idUnitKompetensi,
      //   persiapan,
      //   demonstrasi,
      // });
      mutate({
        id_unit_kompetensi: idUnitKompetensi,
        persiapan,
        demonstrasi,
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
            Penjelasan Singkat Proyek Terkait Pekerjaan
          </h1>
          <p>FR.IA.06</p>
        </div>
        <div className="flex flex-col gap-4">
          {!!proyekTerkaitPekerjaanData && proyekTerkaitPekerjaanData.length > 0 && (
            <div className="flex flex-col gap-4 rounded-lg bg-white p-12 shadow-lg">
              <div>
                <p className="font-aileron text-xl font-bold text-secondary-500">Pertanyaan</p>
              </div>
              <div className="flex flex-col gap-2">
                <Table className="text-base">
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Hal yang perlu dipersiapkan</TableHead>
                      <TableHead>Hal yang perlu didemonstrasikan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!!proyekTerkaitPekerjaanData &&
                      proyekTerkaitPekerjaanData.map((value, index) => {
                        const { id, persiapan, demonstrasi } = value;
                        return (
                          <TableRow key={id}>
                            <TableCell className="w-20 align-top text-base">{index + 1}.</TableCell>
                            <TableCell className="align-top text-base">{persiapan}</TableCell>
                            <TableCell className="align-top text-base">{demonstrasi}</TableCell>
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
                                            Hapus Proyek Terkait Pekerjaan
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
                                            setIdProyekTerkaitPekerjaan(id);
                                            mutateDeleteProyekTerkaitPekerjaan();
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
          {!!proyekTerkaitPekerjaanData && !proyekTerkaitPekerjaanData.length >= 1 && (
            <>
              <div className="flex flex-col gap-4 rounded-lg bg-white p-12 shadow-lg">
                <div>
                  <p className="font-aileron text-xl font-bold text-secondary-500">
                    Proyek Terkait Pekerjaan
                  </p>
                </div>
                <Form {...form}>
                  <FormField
                    control={form.control}
                    name="persiapan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hal yang perlu dipersiapkan</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="demonstrasi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hal yang perlu didemonstrasikan</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
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
                          <p className="font-anek-latin text-xl">Buat Proyek Terkait Pekerjaan</p>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
};
