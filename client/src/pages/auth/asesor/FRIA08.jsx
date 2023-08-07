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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";

export const FRIA08 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const form = useForm();
  const { toast } = useToast();

  const idAsesiSkemaSertifikasi = location?.state?.id_asesi_skema_sertifikasi;

  const [portofolioData, setPortofolioData] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useQuery({
    queryKey: ["asesi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(`/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}`);
    },
    onSuccess: (data) => {
      setPortofolioData(data.data.data.portofolio);
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      await axios.post(
        "/asesor/tempat-uji-kompetensi/skema-sertifikasi/asesi/verifikasi-portofolio",
        data,
      );
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Portofolio berhasil diverifikasi",
      });

      navigate("/evaluasi-asesi/asesi", {
        state: { id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi, is_refetch: true },
      });
    },
  });

  const onSubmit = (data) => {
    const verifikasi_portofolio = data?.verifikasi_portofolio;

    try {
      mutate({
        id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
        is_verifikasi_portofolio_selesai: true,
        verifikasi_portofolio,
      });
    } catch (error) {
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
              Verifikasi Portofolio
            </h1>
            <p>FR.IA.08</p>
          </div>
          <Form {...form}>
            <div className="flex flex-col gap-8">
              <div className="rounded-lg bg-white p-12 shadow-lg">
                <div className="flex gap-12 rounded-t-lg bg-secondary-500 p-8"></div>
                <div className="rounded-b-lg border-x-2 border-b-2 border-secondary-100">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="h-20 min-w-[4rem] text-base">No</TableHead>
                        <TableHead className="h-20 w-full text-base">Portofolio</TableHead>
                        <TableHead className="h-20 min-w-[8rem]">
                          <div className="flex flex-col items-center gap-2">
                            <p className="text-base">Valid</p>
                            <Checkbox
                              onCheckedChange={(value) => {
                                if (value === true) {
                                  for (const [index] of portofolioData.entries()) {
                                    form.setValue(`verifikasi_portofolio.${index}.is_valid`, true);
                                  }
                                } else if (value === false) {
                                  for (const [index] of portofolioData.entries()) {
                                    form.setValue(`verifikasi_portofolio.${index}.is_valid`, false);
                                  }
                                }
                              }}
                            />
                          </div>
                        </TableHead>
                        <TableHead className="h-20 min-w-[8rem] text-center">
                          <div className="flex flex-col items-center gap-2">
                            <p className="text-base">Asli</p>
                            <Checkbox
                              onCheckedChange={(value) => {
                                if (value === true) {
                                  for (const [index] of portofolioData.entries()) {
                                    form.setValue(`verifikasi_portofolio.${index}.is_asli`, true);
                                  }
                                } else if (value === false) {
                                  for (const [index] of portofolioData.entries()) {
                                    form.setValue(`verifikasi_portofolio.${index}.is_asli`, false);
                                  }
                                }
                              }}
                            />
                          </div>
                        </TableHead>
                        <TableHead className="h-20 min-w-[8rem] text-center">
                          <div className="flex flex-col items-center gap-2">
                            <p className="text-base">Terkini</p>
                            <Checkbox
                              onCheckedChange={(value) => {
                                if (value === true) {
                                  for (const [index] of portofolioData.entries()) {
                                    form.setValue(
                                      `verifikasi_portofolio.${index}.is_terkini`,
                                      true,
                                    );
                                  }
                                } else if (value === false) {
                                  for (const [index] of portofolioData.entries()) {
                                    form.setValue(
                                      `verifikasi_portofolio.${index}.is_terkini`,
                                      false,
                                    );
                                  }
                                }
                              }}
                            />
                          </div>
                        </TableHead>
                        <TableHead className="h-20 min-w-[8rem] text-center">
                          <div className="flex flex-col items-center gap-2">
                            <p className="text-base">Memadai</p>
                            <Checkbox
                              onCheckedChange={(value) => {
                                if (value === true) {
                                  for (const [index] of portofolioData.entries()) {
                                    form.setValue(
                                      `verifikasi_portofolio.${index}.is_memadai`,
                                      true,
                                    );
                                  }
                                } else if (value === false) {
                                  for (const [index] of portofolioData.entries()) {
                                    form.setValue(
                                      `verifikasi_portofolio.${index}.is_memadai`,
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
                      {!!portofolioData &&
                        portofolioData.map((value, indexPortofolio) => {
                          const { id, keterangan } = value;
                          form.setValue(
                            `verifikasi_portofolio.${indexPortofolio}.id_portofolio`,
                            id,
                          );

                          form.register(`verifikasi_portofolio.${indexPortofolio}.is_valid`, {
                            value: false,
                          });
                          form.register(`verifikasi_portofolio.${indexPortofolio}.is_asli`, {
                            value: false,
                          });
                          form.register(`verifikasi_portofolio.${indexPortofolio}.is_terkini`, {
                            value: false,
                          });
                          form.register(`verifikasi_portofolio.${indexPortofolio}.is_memadai`, {
                            value: false,
                          });

                          return (
                            <TableRow key={id}>
                              <TableCell>{indexPortofolio + 1}.</TableCell>
                              <TableCell className="hypens-auto" lang="id">
                                <p className="text-base">{keterangan}</p>
                              </TableCell>
                              <TableCell className="text-center">
                                <FormField
                                  control={form.control}
                                  name={`verifikasi_portofolio.${indexPortofolio}.is_valid`}
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
                              <TableCell className="text-center">
                                <FormField
                                  control={form.control}
                                  name={`verifikasi_portofolio.${indexPortofolio}.is_asli`}
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
                              <TableCell className="text-center">
                                <FormField
                                  control={form.control}
                                  name={`verifikasi_portofolio.${indexPortofolio}.is_terkini`}
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
                              <TableCell className="text-center">
                                <FormField
                                  control={form.control}
                                  name={`verifikasi_portofolio.${indexPortofolio}.is_memadai`}
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
            </div>
          </Form>
        </div>
      </section>
    );
  } else if (!idAsesiSkemaSertifikasi) {
    return <Navigate to="/evaluasi-asesi" />;
  }
};
