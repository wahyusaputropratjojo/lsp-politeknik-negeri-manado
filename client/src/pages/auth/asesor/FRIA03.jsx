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
import { Form, FormControl, FormField, FormItem } from "../../../components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";

export const FRIA03 = () => {
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
      return await axios.post(
        `/asesor/tempat-uji-kompetensi/skema-sertifikasi/asesi/pertanyaan-observasi`,
        data,
      );
    },
    onSuccess: (data) => {
      console.log(data);
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Pertanyaan Observasi telah selesai",
      });
      navigate("/evaluasi-asesi/asesi", {
        state: {
          id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
          is_refetch: true,
        },
      });
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: "Berhasil",
        description: "Pertanyaan Observasi telah selesai",
      });
    },
  });

  const onSubmit = (data) => {
    const pertanyaan_observasi = []
      .concat(...data.pertanyaan_observasi)
      .filter((value) => value !== undefined);

    try {
      mutate({
        id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
        is_pertanyaan_observasi_selesai: true,
        pertanyaan_observasi,
      });
    } catch (error) {
      console.log(error);
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
              Pertanyaan Untuk Mendukung Observasi
            </h1>
            <p>FR.IA.03</p>
          </div>
          <Form {...form}>
            <div className="flex flex-col gap-8">
              {!!unitKompetensiData &&
                unitKompetensiData.map((value, indexUnitKompetensi) => {
                  const {
                    id,
                    kode_unit_kompetensi: kodeUnitKompetensi,
                    nama_unit_kompetensi: namaUnitKompetensi,
                    pertanyaan_observasi: pertanyaanObservasi,
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
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="h-20 min-w-[4rem] text-base">No</TableHead>
                              <TableHead className="h-20 w-full text-base">Pertanyaan</TableHead>
                              <TableHead className="h-20 min-w-[8rem] text-base">
                                <div className="flex flex-col items-center gap-2">
                                  <p>K</p>
                                  <Checkbox
                                    onCheckedChange={(value) => {
                                      if (value === true) {
                                        for (const [index] of pertanyaanObservasi.entries()) {
                                          form.setValue(
                                            `pertanyaan_observasi.${indexUnitKompetensi}.${index}.is_kompeten`,
                                            true,
                                          );
                                        }
                                      } else if (value === false) {
                                        for (const [index] of pertanyaanObservasi.entries()) {
                                          form.setValue(
                                            `pertanyaan_observasi.${indexUnitKompetensi}.${index}.is_kompeten`,
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
                            {!!pertanyaanObservasi &&
                              pertanyaanObservasi.map((value, indexPertanyaanObservasi) => {
                                const { id, pertanyaan } = value;

                                form.setValue(
                                  `pertanyaan_observasi.${indexUnitKompetensi}.${indexPertanyaanObservasi}.id_asesi_skema_sertifikasi`,
                                  idAsesiSkemaSertifikasi,
                                );

                                form.setValue(
                                  `pertanyaan_observasi.${indexUnitKompetensi}.${indexPertanyaanObservasi}.id_pertanyaan_observasi`,
                                  id,
                                );

                                form.register(
                                  `pertanyaan_observasi.${indexUnitKompetensi}.${indexPertanyaanObservasi}.is_kompeten`,
                                  { value: false },
                                );

                                return (
                                  <TableRow key={id}>
                                    <TableCell className="align-top text-base">
                                      {indexPertanyaanObservasi + 1}.
                                    </TableCell>
                                    <TableCell className="align-top text-base">
                                      {pertanyaan}
                                    </TableCell>
                                    <TableCell className="text-base">
                                      <FormField
                                        control={form.control}
                                        name={`pertanyaan_observasi.${indexUnitKompetensi}.${indexPertanyaanObservasi}.is_kompeten`}
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
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
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
                        <p className="font-anek-latin text-xl">Tugas Praktik Demonstrasi</p>
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
          </Form>
        </div>
      </section>
    );
  } else if (!idAsesiSkemaSertifikasi) {
    return <Navigate to="/evaluasi-asesi" />;
  }
};
