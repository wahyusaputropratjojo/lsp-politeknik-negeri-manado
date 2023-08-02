import { useContext, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm, useFieldArray } from "react-hook-form";
import { format } from "date-fns";
import { id as indonesia } from "date-fns/locale";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthContext } from "../../../context/AuthContext";

import { cn } from "../../../utils/cn";
import axios from "../../../utils/axios";
import { penentuanAsesor } from "../../../utils/yup";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
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
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "../../../components/ui/command";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { ScrollArea } from "../../../components/ui/scroll-area";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import CalendarIcon from "../../../assets/icons/untitled-ui-icons/line/components/Calendar";
import Check from "../../../assets/icons/untitled-ui-icons/line/components/Check";
import ChevronSelectorVertical from "../../../assets/icons/untitled-ui-icons/line/components/ChevronSelectorVertical";

export const PenentuanAsesor = () => {
  const { auth } = useContext(AuthContext);
  const [asesiTempatUjiKompetensi, setAsesiTempatUjiKompetensi] =
    useState(null);

  const { id: id_user } = auth;

  useQuery({
    queryKey: ["asesi-tempat-uji-kompetensi", id_user],
    queryFn: async () => {
      return await axios.get(
        `/administrator/${id_user}/tempat-uji-kompetensi/asesi`,
      );
    },
    onSuccess: async (data) => {
      const { tempat_uji_kompetensi: tempatUjiKompetensi } = await data.data
        .data;
      const { skema_sertifikasi: skemaSertifikasi } = await tempatUjiKompetensi;
      setAsesiTempatUjiKompetensi(skemaSertifikasi);
    },
    refetchInterval: 1000,
  });

  return (
    <>
      <section>
        <div className="flex flex-col gap-12">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Penetuan Asesor
            </h1>
            <p>Menentukan Asesor untuk para Asesi</p>
          </div>
          <div>
            {asesiTempatUjiKompetensi &&
              asesiTempatUjiKompetensi.map((skemaSertifikasi) => {
                const {
                  id,
                  asesi_skema_sertifikasi: asesiSkemaSertifikasi,
                  nama_skema_sertifikasi: namaSkemaSertifikasi,
                } = skemaSertifikasi;

                const filteredAsesiSkemaSertifikasi =
                  asesiSkemaSertifikasi.filter(
                    (value) =>
                      value.is_punya_asesor === false &&
                      value.is_verifikasi_berkas === true,
                  );

                if (filteredAsesiSkemaSertifikasi.length !== 0) {
                  return (
                    <article key={id} className="flex flex-col gap-4">
                      {filteredAsesiSkemaSertifikasi.map((value, index) => {
                        const {
                          id,
                          id_asesi,
                          asesi,
                          tujuan_asesmen: tujuanAsesmen,
                        } = value;

                        return (
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full rounded-lg bg-white p-6"
                            key={id_asesi}
                          >
                            <AccordionItem value="item-1">
                              <AccordionTrigger>
                                <div className="flex w-full items-center gap-6">
                                  <div>
                                    <img
                                      src={asesi.data_diri.url_profil_user}
                                      alt="File Bukti Persyaratan"
                                      className="aspect-square w-24 rounded-lg object-cover"
                                    />
                                  </div>
                                  <div className="grid grid-flow-col grid-rows-2 items-center gap-x-12 gap-y-4">
                                    <div className="flex flex-col items-start">
                                      <p className="text-xs font-semibold leading-none">
                                        Nama
                                      </p>
                                      <p className="text-sm">
                                        {asesi.user.nama_lengkap}
                                      </p>
                                    </div>
                                    <div className="flex flex-col items-start">
                                      <div className="flex flex-col items-start">
                                        <p className="text-xs font-semibold leading-none">
                                          Skema Sertifikasi
                                        </p>
                                        <p className="text-sm">
                                          {namaSkemaSertifikasi}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-start">
                                      <p className="text-xs font-semibold leading-none">
                                        Tujuan Asesmen
                                      </p>
                                      <p className="text-sm">
                                        {tujuanAsesmen.tujuan}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="flex flex-col gap-8 pt-6">
                                  <div className="flex flex-col gap-12">
                                    <PenentuanAsesorForm id={id} />
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        );
                      })}
                    </article>
                  );
                } else {
                  return <p>Tidak ada pengajuan pendaftaran</p>;
                }
              })}
          </div>
        </div>
      </section>
    </>
  );
};

const PenentuanAsesorForm = ({ id }) => {
  const [idAsesiSkemaSertifikasi, setIdAsesiSkemaSertifikasi] = useState(id);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    resolver: yupResolver(penentuanAsesor),
  });

  const { auth } = useContext(AuthContext);
  const { id: id_user } = auth;

  const [asesorTempatUjiKompetensi, setAsesorTempatUjiKompetensi] =
    useState(null);

  useQuery({
    queryKey: ["asesor-tempat-uji-kompetensi", id_user],
    queryFn: async () => {
      return await axios.get(
        `/administrator/${id_user}/tempat-uji-kompetensi/asesor`,
      );
    },
    onSuccess: async (data) => {
      const { tempat_uji_kompetensi: tempatUjiKompetensi } = await data.data
        .data;
      const { asesor } = tempatUjiKompetensi;
      setAsesorTempatUjiKompetensi(asesor);
    },
  });

  const { mutate: mutateAsesorAsesi, isLoading } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(
        `/administrator/tempat-uji-kompetensi/skema-sertifikasi/asesor/asesi`,
        data,
      );
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { mutate: mutateAsesiSkemaSertifikasi } = useMutation({
    mutationFn: async () => {
      await axios.patch(
        `/administrator/tempat-uji-kompetensi/skema-sertifikasi/asesi/${idAsesiSkemaSertifikasi}`,
        {
          is_punya_asesor: true,
        },
      );
    },
    onSuccess: (data) => {
      setIdAsesiSkemaSertifikasi(null);
    },
  });

  const onSubmit = (data) => {
    try {
      const { id_asesor, tanggal_pelaksanaan } = data;

      console.log({
        ...data,
        id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
      });

      mutateAsesorAsesi({
        id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
        id_asesor,
        tanggal_pelaksanaan,
      });

      mutateAsesiSkemaSertifikasi();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="id_asesor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asesor</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        disabled={isLoading}
                        similar={
                          form.formState.errors?.id_asesor
                            ? "input-error"
                            : "input-primary"
                        }
                        role="combobox"
                        className="grid w-full grid-cols-12 justify-items-start"
                      >
                        <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                          {field.value
                            ? asesorTempatUjiKompetensi.find(
                                (data) => data.id === field.value,
                              )?.user.nama_lengkap
                            : ""}
                        </p>
                        <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandGroup>
                          <ScrollArea className="h-min w-max rounded-md">
                            {asesorTempatUjiKompetensi &&
                              asesorTempatUjiKompetensi.map((data) => (
                                <CommandItem
                                  className="min-w-max"
                                  key={data.id}
                                  value={data.id}
                                  onSelect={(value) => {
                                    form.setValue("id_asesor", value, {
                                      shouldValidate: true,
                                    });
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      data.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {data.user.nama_lengkap}
                                </CommandItem>
                              ))}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tanggal_pelaksanaan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Pelaksanaan</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          disabled={isLoading}
                          similar={
                            form.formState.errors?.tanggal_pelaksanaan
                              ? "input-error"
                              : "input-primary"
                          }
                          className="grid w-full grid-cols-12 justify-items-start"
                        >
                          <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                            {field.value
                              ? format(field.value, "PPP", {
                                  locale: indonesia,
                                })
                              : ""}
                          </p>
                          <CalendarIcon className="col-span-1 justify-self-end" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) => date <= new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button className="w-full">Simpan</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <div className="flex flex-col items-center gap-2">
                    <AnnotationAlert className="text-5xl text-secondary-500" />
                    <p className="font-anek-latin text-xl">Penentuan Asesor</p>
                  </div>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <p className="py-4 text-sm">
                    Harap diingat bahwa setelah tindakan ini dilakukan, tidak
                    akan ada kesempatan untuk mengulanginya. Apakah Anda yakin?
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <div className="flex w-full gap-4">
                  <AlertDialogCancel asChild>
                    <Button
                      size="sm"
                      variant="outline-error"
                      className="w-full"
                    >
                      Batalkan
                    </Button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      size="sm"
                      type="submit"
                      onClick={form.handleSubmit(onSubmit)}
                      className="w-full"
                    >
                      Konfirmasi
                    </Button>
                  </AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </Form>
  );
};
