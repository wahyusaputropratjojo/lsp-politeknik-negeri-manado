import { useState, useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "../../../utils/axios";
import { cn } from "../../../utils/cn";

import { useImagePreview } from "../../../hooks/useImagePreview";
import { useToast } from "../../../hooks/useToast";

import { AuthContext } from "../../../context/AuthContext";

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
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../../../components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { ScrollArea, ScrollBar } from "../../../components/ui/scroll-area";
import { Upload } from "../../../components/ui/upload";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import Check from "../../../assets/icons/untitled-ui-icons/line/components/Check";
import PlusSquare from "../../../assets/icons/untitled-ui-icons/line/components/PlusSquare";
import XCircle from "../../../assets/icons/untitled-ui-icons/line/components/XCircle";
import ChevronSelectorVertical from "../../../assets/icons/untitled-ui-icons/line/components/ChevronSelectorVertical";

export const BuatSkemaSertifikasi = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { auth } = useContext(AuthContext);
  const [fotoProfilPreview, setFotoProfilPreview, resetFotoProfilPreview] = useImagePreview();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tempatUjiKompetensiData, setTempatUjiKompetensiData] = useState();
  const [administratorTUKData, setAdministratorTUKData] = useState();

  const isAdministrator = auth?.role === "Administrator";

  const form = useForm({
    defaultValues: {
      profil_skema_sertifikasi: "",
      kode_skema_sertifikasi: "",
      nama_skema_sertifikasi: "",
      unit_kompetensi: [
        {
          kode_unit_kompetensi: "",
          nama_unit_kompetensi: "",
        },
      ],
    },
    values: {
      id_tempat_uji_kompetensi: administratorTUKData?.id,
    },
  });

  useQuery({
    queryKey: ["administrator", auth?.id],
    queryFn: async () => {
      return await axios.get(`/administrator/${auth?.id}/tempat-uji-kompetensi`);
    },
    onSuccess: (data) => {
      setAdministratorTUKData(data?.data?.data?.tempat_uji_kompetensi);
    },
    enabled: !!isAdministrator,
  });

  useQuery({
    queryKey: ["tempat-uji-kompetensi"],
    queryFn: async () => {
      return await axios.get(`/tempat-uji-kompetensi`);
    },
    onSuccess: (data) => {
      setTempatUjiKompetensiData(data.data.data);
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`/administrator/tempat-uji-kompetensi/skema-sertifikasi`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      navigate("/skema-sertifikasi");
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Skema Sertifikasi berhasil dibuat",
      });
    },
  });

  const onSubmit = (data) => {
    try {
      mutate(data);
      console.log(data);
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
            Buat Skema Sertifikasi
          </h1>
          <p className="text-base">
            Buat Skema Sertifikasi di {administratorTUKData?.tempat_uji_kompetensi}
          </p>
        </div>
        <Form {...form}>
          <div className="flex flex-col gap-4 rounded-lg bg-white p-12 shadow-lg">
            <div>
              <p className="font-anek-latin text-2xl font-semibold text-secondary-500">
                Skema Sertifikasi
              </p>
            </div>
            {/* <div>
              <FormField
                control={form.control}
                name="id_tempat_uji_kompetensi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempat Uji Kompetensi</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          disabled={isAdministrator}
                          similar={
                            form.formState.errors?.id_tempat_uji_kompetensi
                              ? "input-error"
                              : "input-primary"
                          }
                          role="combobox"
                          className="grid w-full grid-cols-12 justify-items-start">
                          <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                            {field.value
                              ? tempatUjiKompetensiData.find((data) => data.id === field.value)
                                  ?.tempat_uji_kompetensi
                              : ""}
                          </p>
                          <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandGroup>
                            <ScrollArea className="h-48">
                              {!!tempatUjiKompetensiData &&
                                tempatUjiKompetensiData.map((data) => (
                                  <CommandItem
                                    className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                    key={data.id}
                                    value={data.id}
                                    onSelect={(value) => {
                                      form.setValue("id_tempat_uji_kompetensi", value, {
                                        shouldValidate: true,
                                      });
                                    }}>
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        data.id === field.value ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                    {data.tempat_uji_kompetensi}
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
            </div> */}
            <div className="flex flex-col gap-8">
              <div className="flex gap-8">
                <FormField
                  control={form.control}
                  name="profil_skema_sertifikasi"
                  render={({ field }) => (
                    <FormItem className="w-full justify-end">
                      <FormLabel>Profil Skema Sertifikasi</FormLabel>
                      <FormControl>
                        <Upload
                          {...field}
                          disabled={isLoading}
                          value={field.value?.fileName}
                          totalFile={form.watch(`profil_skema_sertifikasi`)?.length ?? 0}
                          onChange={(event) => {
                            setFotoProfilPreview(event);
                            field.onChange(event.target.files);
                          }}
                          accept={"image/*"}
                          variant={
                            form.formState.errors?.profil_skema_sertifikasi ? "error" : "primary"
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fotoProfilPreview && (
                  <div className="relative">
                    <img
                      src={fotoProfilPreview}
                      alt="Foto Profil"
                      className="aspect-square w-72 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      className={cn(
                        "absolute right-0 top-0 -translate-y-full translate-x-full rounded-lg bg-error-50 p-1 transition-colors hover:bg-error-100",
                        {
                          hidden: isLoading,
                        },
                      )}
                      onClick={() => {
                        form.setValue("profil_skema_sertifikasi", null);
                        resetFotoProfilPreview();
                      }}>
                      <XCircle className="text-base text-error-500" />
                    </button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="kode_skema_sertifikasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Skema Sertifikasi</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nama_skema_sertifikasi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Skema Sertifikasi</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-lg bg-white p-12 shadow-lg">
            <div>
              <p className="font-anek-latin text-2xl font-semibold text-secondary-500">
                Unit Kompetensi
              </p>
            </div>
            <UnitKompetensiForm form={form} />
          </div>
          <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-lg">
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger className={cn(buttonVariants(), "w-full")}>
                Selesai
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <div className="flex flex-col items-center gap-2">
                      <AnnotationAlert className="text-5xl text-secondary-500" />
                      <p className="font-anek-latin text-xl">Buat Skema Sertifikasi</p>
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
                        buttonVariants({ size: "sm", variant: "outline-error" }),
                        "w-full",
                      )}>
                      Batalkan
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className={cn(buttonVariants({ size: "sm" }), "w-full")}
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
};

const UnitKompetensiForm = ({ form }) => {
  const { append, remove, fields } = useFieldArray({
    name: `unit_kompetensi`,
    control: form.control,
  });

  const unitKompetensiFields = fields.map((field, index) => {
    return (
      <div key={field.id} className="relative grid grid-cols-2 gap-8">
        <FormField
          control={form.control}
          name={`unit_kompetensi.${index}.kode_unit_kompetensi`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode Unit Kompetensi</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`unit_kompetensi.${index}.nama_unit_kompetensi`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Unit Kompetensi</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {index > 0 && (
          <button
            type="button"
            className="absolute -top-2 right-0 rounded-lg bg-error-50 p-1 text-xl text-error-500 transition-colors hover:bg-error-100"
            onClick={() => remove(index)}>
            <XCircle className="text-xl" />
          </button>
        )}
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">{unitKompetensiFields}</div>
      <Button
        type="button"
        className="col-span-1 col-start-10"
        onClick={() =>
          append({
            kode_unit_kompetensi: "",
            nama_unit_kompetensi: "",
          })
        }>
        <PlusSquare className="text-2xl" />
      </Button>
    </div>
  );
};
