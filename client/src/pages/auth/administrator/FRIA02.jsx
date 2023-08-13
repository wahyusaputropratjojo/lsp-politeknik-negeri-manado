import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "../../../utils/axios";
import { cn } from "../../../utils/cn";

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
import { Input } from "../../../components/ui/input";
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

export const FRIA02Administrator = () => {
  const location = useLocation();
  const formTugasPraktikDemonstrasi = useForm();
  const formLangkahKerjaTugasPraktikDemonstrasi = useForm({
    defaultValues: {
      langkah_kerja: "",
      instruksi_kerja: [
        {
          instruksi_kerja: "",
        },
      ],
    },
  });

  const [isDialogOneOpen, setIsDialogOneOpen] = useState(false);
  const [isDialogTwoOpen, setIsDialogTwoOpen] = useState(false);
  const [tugasPraktikDemonstrasiData, setTugasPraktikDemonstrasiData] = useState();
  const [idTugasPraktikDemonstrasi, setIdTugasPraktikDemonstrasi] = useState();
  const [idLangkahKerjaTugasPraktikDemonstrasi, setIdLangkahKerjaTugasPraktikDemonstrasi] =
    useState();

  const idUnitKompetensi = location?.state?.id_unit_kompetensi;

  console.log(tugasPraktikDemonstrasiData);

  const { refetch } = useQuery({
    queryKey: ["tugas-praktik-demonstrasi", idUnitKompetensi],
    queryFn: async () => {
      return await axios.get(
        `/skema-sertifikasi/unit-kompetensi/${idUnitKompetensi}/tugas-praktik-demonstrasi`,
      );
    },
    onSuccess: (data) => {
      setTugasPraktikDemonstrasiData(data.data.data.tugas_praktik_demonstrasi);
      setIdTugasPraktikDemonstrasi(data.data.data.tugas_praktik_demonstrasi[0].id);
    },
  });

  const { mutate: mutateTugasPraktikDemonstrasi } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`/skema-sertifikasi/unit-kompetensi/tugas-praktik-demonstrasi`, data);
    },
    onSuccess: (data) => {
      console.log(data);
      refetch();
      formTugasPraktikDemonstrasi.reset({
        skenario: "",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: mutateLangkahKerjaTugasPraktikDemonstrasi } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        `/skema-sertifikasi/unit-kompetensi/tugas-praktik-demonstrasi/langkah-kerja`,
        data,
      );
    },
    onSuccess: (data) => {
      console.log(data);
      refetch();
      formLangkahKerjaTugasPraktikDemonstrasi.reset({
        langkah_kerja: "",
        instruksi_kerja: [
          {
            instruksi_kerja: "",
          },
        ],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: mutateDeleteTugasPraktikDemonstrasi } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        `/skema-sertifikasi/unit-kompetensi/tugas-praktik-demonstrasi/${idTugasPraktikDemonstrasi}`,
        data,
      );
    },
    onSuccess: (data) => {
      console.log(data);
      refetch();
    },
  });

  const { mutate: mutateDeleteLangkahKerjaTugasPraktikDemonstrasi } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        `/skema-sertifikasi/unit-kompetensi/tugas-praktik-demonstrasi/langkah-kerja/${idLangkahKerjaTugasPraktikDemonstrasi}`,
        data,
      );
    },
    onSuccess: (data) => {
      console.log(data);
      refetch();
    },
  });

  const onSubmitTugasPraktikDemonstrasi = (data) => {
    try {
      mutateTugasPraktikDemonstrasi({ id_unit_kompetensi: idUnitKompetensi, ...data });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDialogOneOpen(false);
    }
  };

  const onSubmitLangkahKerjaTugasPraktikDemonstrasi = (data) => {
    try {
      mutateLangkahKerjaTugasPraktikDemonstrasi(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDialogTwoOpen(false);
    }
  };

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Tugas Praktik Demonstrasi
          </h1>
          <p>FR.IA.02</p>
        </div>
        {!!tugasPraktikDemonstrasiData && tugasPraktikDemonstrasiData.length > 0 && (
          <>
            {!!tugasPraktikDemonstrasiData &&
              tugasPraktikDemonstrasiData.map((value, index) => {
                const {
                  id,
                  skenario,
                  langkah_kerja_tugas_praktik_demonstrasi: langkahKerjaTugasPraktikDemonstrasi,
                } = value;

                formLangkahKerjaTugasPraktikDemonstrasi.setValue(
                  `id_tugas_praktik_demonstrasi`,
                  id,
                );

                return (
                  <div
                    key={id}
                    className="relative flex flex-col gap-4 rounded-lg bg-white p-12 shadow-lg">
                    <AlertDialog>
                      <AlertDialogTrigger
                        className={cn(
                          buttonVariants({ variant: "error", size: "sm" }),
                          "absolute right-0 top-0 rounded-none rounded-bl-lg rounded-tr-lg",
                        )}>
                        <div className="flex items-center gap-2">
                          <Delete className="text-xl text-error-500" />
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            <div className="flex flex-col items-center gap-2">
                              <AnnotationAlert className="text-5xl text-secondary-500" />
                              <p className="font-anek-latin text-xl">
                                Hapus Tugas Praktik Demonstrasi
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
                              onClick={() => {
                                mutateDeleteTugasPraktikDemonstrasi();
                              }}>
                              Konfirmasi
                            </AlertDialogAction>
                          </div>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <p className="font-aileron text-lg font-bold">Skenario</p>
                      </div>
                      <div>
                        <p className="text-justify indent-6 text-base">{skenario}</p>
                      </div>
                    </div>
                    {langkahKerjaTugasPraktikDemonstrasi.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <p className="font-aileron text-lg font-bold">Langkah Kerja</p>
                        </div>
                        <div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="h-20 min-w-[4rem] text-base">No.</TableHead>
                                <TableHead className="h-20 text-base">Langkah Kerja</TableHead>
                                <TableHead className="h-20 text-base">Instruksi Kerja</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {!!langkahKerjaTugasPraktikDemonstrasi &&
                                langkahKerjaTugasPraktikDemonstrasi.map((value, index) => {
                                  const {
                                    id,
                                    langkah_kerja: langkahKerja,
                                    instruksi_kerja_tugas_praktik_demonstrasi:
                                      instruksiKerjaTugasPraktikDemonstrasi,
                                  } = value;
                                  return (
                                    <TableRow key={id}>
                                      <TableCell className="align-top text-base">
                                        {index + 1}.
                                      </TableCell>
                                      <TableCell className="align-top text-base">
                                        {langkahKerja}
                                      </TableCell>
                                      <TableCell className="align-top text-base">
                                        <ul className="list-disc">
                                          {!!instruksiKerjaTugasPraktikDemonstrasi &&
                                            instruksiKerjaTugasPraktikDemonstrasi.map((value) => {
                                              const { id, instruksi_kerja: instruksiKerja } = value;

                                              return <li key={id}>{instruksiKerja}</li>;
                                            })}
                                        </ul>
                                      </TableCell>
                                      <TableCell className="w-28 align-top">
                                        <AlertDialog>
                                          <AlertDialogTrigger
                                            className={cn(
                                              buttonVariants({ variant: "error", size: "sm" }),
                                            )}>
                                            <Delete className="text-xl text-error-500" />
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>
                                                <div className="flex flex-col items-center gap-2">
                                                  <AnnotationAlert className="text-5xl text-secondary-500" />
                                                  <p className="font-anek-latin text-xl">
                                                    Hapus Langkah Kerja
                                                  </p>
                                                </div>
                                              </AlertDialogTitle>
                                              <AlertDialogDescription className="py-4 text-sm">
                                                Harap diingat bahwa setelah tindakan ini dilakukan,
                                                tidak akan ada kesempatan untuk mengulanginya.
                                                Apakah Anda yakin?
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
                                                    setIdLangkahKerjaTugasPraktikDemonstrasi(id);
                                                    mutateDeleteLangkahKerjaTugasPraktikDemonstrasi();
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
                      </div>
                    )}
                  </div>
                );
              })}
            <div className="flex flex-col gap-4 rounded-lg bg-white p-16 shadow-lg">
              <div className="flex flex-col gap-4 rounded-lg">
                <p className="font-aileron text-xl font-bold">Buat Langkah Kerja</p>
                <div className="flex flex-col gap-4">
                  <Form {...formLangkahKerjaTugasPraktikDemonstrasi}>
                    <FormField
                      control={formLangkahKerjaTugasPraktikDemonstrasi.control}
                      name="langkah_kerja"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Langkah Kerja</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <IntruksiKerjaForm form={formLangkahKerjaTugasPraktikDemonstrasi} />
                  </Form>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-lg">
              <AlertDialog open={isDialogTwoOpen} onOpenChange={setIsDialogTwoOpen}>
                <AlertDialogTrigger className={cn(buttonVariants(), "w-full")}>
                  Simpan
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      <div className="flex flex-col items-center gap-2">
                        <AnnotationAlert className="text-5xl text-secondary-500" />
                        <p className="font-anek-latin text-xl">
                          Buat Langkah Kerja Praktik Demonstrasi
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
                        onClick={formLangkahKerjaTugasPraktikDemonstrasi.handleSubmit(
                          onSubmitLangkahKerjaTugasPraktikDemonstrasi,
                        )}>
                        Konfirmasi
                      </AlertDialogAction>
                    </div>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </>
        )}
        {tugasPraktikDemonstrasiData && tugasPraktikDemonstrasiData.length === 0 && (
          <>
            <div>
              <Form {...formTugasPraktikDemonstrasi}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-lg">
                    <div>
                      <p className="text-lg font-bold">Skenario</p>
                      <FormField
                        control={formTugasPraktikDemonstrasi.control}
                        name="skenario"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Skenario</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </Form>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <AlertDialog open={isDialogOneOpen} onOpenChange={setIsDialogOneOpen}>
                <AlertDialogTrigger className={cn(buttonVariants(), "w-full")}>
                  Simpan
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      <div className="flex flex-col items-center gap-2">
                        <AnnotationAlert className="text-5xl text-secondary-500" />
                        <p className="font-anek-latin text-xl">Buat Skenario Praktik Demonstrasi</p>
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
                        onClick={formTugasPraktikDemonstrasi.handleSubmit(
                          onSubmitTugasPraktikDemonstrasi,
                        )}>
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
    </section>
  );
};
//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "langkah_kerja",
//   });

//   const langkahKerjaFields = fields.map((field, index) => {
//     return (
//       <div
//         key={field.id}
//         className="relative flex flex-col gap-4 rounded-lg border-2 border-secondary-200 p-6">
//         <FormField
//           control={form.control}
//           name={`langkah_kerja.${index}.langkah_kerja`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Langkah Kerja</FormLabel>
//               <FormControl>
//                 <Textarea {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name={`langkah_kerja.${index}.instruksi_kerja`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Instruksi Kerja</FormLabel>
//               <FormControl>
//                 <Textarea {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         {index > 0 && (
//           <button
//             type="button"
//             className="absolute right-1 top-1 rounded-lg bg-error-50 p-1 text-xl text-error-500 transition-colors hover:bg-error-100"
//             onClick={() => remove(index)}>
//             <XCircle className="text-xl" />
//           </button>
//         )}
//       </div>
//     );
//   });

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="flex flex-col gap-8">{langkahKerjaFields}</div>
//       <Button
//         type="button"
//         size="sm"
//         className="col-span-1 col-start-10"
//         onClick={() =>
//           append({
//             langkah_kerja: "",
//             instruksi_kerja: [{ instruksi_kerja: "" }],
//           })
//         }>
//         <PlusSquare className="text-2xl" />
//       </Button>
//     </div>
//   );
// };

const IntruksiKerjaForm = ({ form }) => {
  const { fields, remove, append } = useFieldArray({
    name: `instruksi_kerja`,
    control: form.control,
  });

  const intruksiKerjaFields = fields.map((field, index) => {
    return (
      <div key={field.id} className="relative flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-aileron text-secondary-300 transition-colors hover:text-secondary-400">
            Instruksi Kerja
          </p>
          <FormField
            control={form.control}
            name={`instruksi_kerja.${index}.instruksi_kerja`}
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
                instruksi_kerja: "",
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
      <div className="flex flex-col gap-4">{intruksiKerjaFields}</div>
    </div>
  );
};
