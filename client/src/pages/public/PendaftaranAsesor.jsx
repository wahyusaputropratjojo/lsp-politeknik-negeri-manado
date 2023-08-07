import { useState, useContext } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import axios from "../../utils/axios";
import { cn } from "../../utils/cn";

import { AuthContext } from "../../context/AuthContext";

import { useImagePreview } from "../../hooks/useImagePreview";
import { useToast } from "../../hooks/useToast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { Command, CommandGroup, CommandItem } from "../../components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "../../components/ui/popover";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Textarea } from "../../components/ui/textarea";
import { Upload } from "../../components/ui/upload";

import AnnotationAlert from "../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import CalendarIcon from "../../assets/icons/untitled-ui-icons/line/components/Calendar";
import Check from "../../assets/icons/untitled-ui-icons/line/components/Check";
import ChevronSelectorVertical from "../../assets/icons/untitled-ui-icons/line/components/ChevronSelectorVertical";
import PlusSquare from "../../assets/icons/untitled-ui-icons/line/components/PlusSquare";
import RefreshCw04 from "../../assets/icons/untitled-ui-icons/line/components/RefreshCw04";
import XCircle from "../../assets/icons/untitled-ui-icons/line/components/XCircle";

export const PendaftaranAsesor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const form = useForm();
  const { toast } = useToast();
  const { auth } = useContext(AuthContext);
  const accessToken = auth?.access_token;
  const [fotoProfilPreview, setFotoProfilPreview, resetFotoProfilPreview] = useImagePreview();

  const idProvinsi = useWatch({
    control: form.control,
    name: "id_provinsi",
    defaultValue: null,
  });

  const idKotaKabupaten = useWatch({
    control: form.control,
    name: "id_kota_kabupaten",
    defaultValue: null,
  });

  const idKecamatan = useWatch({
    control: form.control,
    name: "id_kecamatan",
    defaultValue: null,
  });

  const email = useWatch({
    control: form.control,
    name: "email",
    defaultValue: "",
  });

  const [tempatUjiKompetensiData, setTempatUjiKompetensiData] = useState();
  const [negaraData, setNegaraData] = useState();
  const [jenisKelaminData, setJenisKelaminData] = useState();
  const [kualifikasiPendidikanData, setKualifikasiPendidikanData] = useState();
  const [provinsiData, setProvinsiData] = useState();
  const [kotaKabupatenData, setKotaKabupatenData] = useState();
  const [kecamatanData, setKecamatanData] = useState();
  const [kelurahanDesaData, setKelurahanDesaData] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const toYear = currentYear - 17;
  const fromYear = currentYear - 70;

  const restrictAlphabet = (event) => {
    const allowedKeys = [
      8, 9, 13, 33, 34, 35, 36, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97,
      98, 99, 100, 101, 102, 103, 104, 105,
    ];
    const key = event.which || event.keyCode;
    const isAllowed = allowedKeys.includes(key) || (event.ctrlKey && key === 65);

    if (!isAllowed) {
      event.preventDefault();
    }
  };

  useQuery({
    queryKey: ["tempat-uji-kompetensi"],
    queryFn: async () => {
      return await axios.get(`/tempat-uji-kompetensi`);
    },
    onSuccess: (data) => {
      setTempatUjiKompetensiData(data.data.data);
    },
  });

  useQuery({
    queryKey: ["negara"],
    queryFn: async () => {
      return await axios.get(`/negara`);
    },
    onSuccess: (data) => {
      setNegaraData(data.data.data);
    },
  });

  useQuery({
    queryKey: ["jenis-kelamin"],
    queryFn: async () => {
      return await axios.get(`/jenis-kelamin`);
    },
    onSuccess: (data) => {
      setJenisKelaminData(data.data.data);
    },
  });

  useQuery({
    queryKey: ["kualifikasi-pendidikan"],
    queryFn: async () => {
      return await axios.get(`/kualifikasi-pendidikan`);
    },
    onSuccess: (data) => {
      setKualifikasiPendidikanData(data.data.data);
    },
  });

  useQuery({
    queryKey: ["provinsi"],
    queryFn: async () => {
      return await axios.get(`/indonesia/provinsi`);
    },
    onSuccess: (data) => {
      setProvinsiData(data.data.data);
    },
  });

  useQuery({
    queryKey: ["kota_kabupaten", idProvinsi],
    queryFn: async () => {
      return await axios.get(`/indonesia/provinsi/${idProvinsi}/kota-kabupaten`);
    },
    onSuccess: (data) => {
      setKotaKabupatenData(data.data.data);
    },
    enabled: !!idProvinsi,
  });

  useQuery({
    queryKey: ["kecamatan", idKotaKabupaten],
    queryFn: async () => {
      return await axios.get(`/indonesia/provinsi/kota-kabupaten/${idKotaKabupaten}/kecamatan`);
    },
    onSuccess: (data) => {
      setKecamatanData(data.data.data);
    },
    enabled: !!idKotaKabupaten,
  });

  useQuery({
    queryKey: ["kelurahan-desa", idKecamatan],
    queryFn: async () => {
      return await axios.get(
        `/indonesia/provinsi/kota-kabupaten/kecamatan/${idKecamatan}/kelurahan-desa`,
      );
    },
    onSuccess: (data) => {
      setKelurahanDesaData(data.data.data);
    },
    enabled: !!idKecamatan,
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`/asesor/register`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Pendaftaran asesor berhasil",
      });
      navigate("/masuk", {
        state: {
          email: email,
        },
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        variant: "error",
        title: "Gagal",
        description: "Pendaftaran asesor gagal",
      });
    },
  });

  const onSubmit = (data) => {
    try {
      mutate(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  if (!!tempatUjiKompetensiData && !!negaraData && !!kualifikasiPendidikanData && !accessToken) {
    return (
      <section>
        <div className="flex flex-col gap-8">
          <div>
            <div>
              <h1 className="font-anek-latin text-5xl font-semibold uppercase">
                Pendaftaran Asesor
              </h1>
              <p className="font-aileron text-base">Pendaftaran Asesor</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Form {...form}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 rounded-lg bg-white p-12 shadow-lg">
                    <div>
                      <p className="font-anek-latin text-2xl font-semibold text-secondary-500">
                        Tempat Uji Kompetensi
                      </p>
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="id_tempat_uji_kompetensi"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tempat Uji Kompetensi</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  disabled={isLoading}
                                  similar={
                                    form.formState.errors?.id_tempat_uji_kompetensi
                                      ? "input-error"
                                      : "input-primary"
                                  }
                                  role="combobox"
                                  className="grid w-full grid-cols-12 justify-items-start">
                                  <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                    {field.value
                                      ? tempatUjiKompetensiData.find(
                                          (data) => data.id === field.value,
                                        )?.tempat_uji_kompetensi
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
                                                data.id === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0",
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
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 rounded-lg bg-white p-12 shadow-lg">
                    <div>
                      <p className="font-anek-latin text-2xl font-semibold text-secondary-500">
                        Akun Pengguna
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isLoading}
                                type="email"
                                variant={form.formState.errors?.email ? "error" : "primary"}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isLoading}
                                type="password"
                                variant={form.formState.errors?.password ? "error" : "primary"}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 rounded-lg bg-white p-12 shadow-lg">
                    <div>
                      <p className="font-anek-latin text-2xl font-semibold text-secondary-500">
                        Data Diri
                      </p>
                    </div>
                    <dir className="col-span-2 flex gap-8">
                      <FormField
                        control={form.control}
                        name="profil_user"
                        render={({ field }) => (
                          <FormItem className="w-full self-end">
                            <FormLabel>Foto Profil</FormLabel>
                            <FormControl>
                              <Upload
                                {...field}
                                disabled={isLoading}
                                value={field.value?.fileName}
                                totalFile={form.watch(`profil_user`)?.length ?? 0}
                                onChange={(event) => {
                                  setFotoProfilPreview(event);
                                  field.onChange(event.target.files);
                                }}
                                accept={"image/*"}
                                variant={form.formState.errors?.profil_user ? "error" : "primary"}
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
                              form.setValue("profil_user", null);
                              resetFotoProfilPreview();
                            }}>
                            <XCircle className="text-base text-error-500" />
                          </button>
                        </div>
                      )}
                    </dir>
                    <div className="flex flex-col gap-8">
                      <div className="grid grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="nama_lengkap"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nama Lengkap</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isLoading}
                                  variant={
                                    form.formState.errors?.nama_lengkap ? "error" : "primary"
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="nik"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>NIK</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isLoading}
                                  type="text"
                                  inputMode="numeric"
                                  onKeyDown={restrictAlphabet}
                                  variant={form.formState.errors?.nik ? "error" : "primary"}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="tempat_lahir"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tempat Lahir</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isLoading}
                                  variant={
                                    form.formState.errors?.tempat_lahir ? "error" : "primary"
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="tanggal_lahir"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tanggal Lahir</FormLabel>
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      disabled={isLoading}
                                      similar={
                                        form.formState.errors?.tanggal_lahir
                                          ? "input-error"
                                          : "input-primary"
                                      }
                                      className="grid w-full grid-cols-12 justify-items-start">
                                      <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                        {field.value
                                          ? format(field.value, "PPP", {
                                              locale: id,
                                            })
                                          : ""}
                                      </p>
                                      <CalendarIcon className="col-span-1 justify-self-end" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      captionLayout="dropdown-buttons"
                                      fromYear={fromYear}
                                      toYear={toYear}
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      initialFocus
                                      disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                      }
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="id_jenis_kelamin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Jenis Kelamin</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    disabled={isLoading}
                                    similar={
                                      form.formState.errors?.id_jenis_kelamin
                                        ? "input-error"
                                        : "input-primary"
                                    }
                                    role="combobox"
                                    className="grid w-full grid-cols-12 justify-items-start">
                                    <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                      {field.value
                                        ? jenisKelaminData.find((data) => data.id === field.value)
                                            ?.jenis_kelamin
                                        : ""}
                                    </p>
                                    <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandGroup>
                                      {!!jenisKelaminData &&
                                        jenisKelaminData.map((data) => (
                                          <CommandItem
                                            className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                            key={data.id}
                                            value={data.id}
                                            onSelect={(value) => {
                                              form.setValue(
                                                "id_jenis_kelamin",
                                                value.toUpperCase(),
                                                {
                                                  shouldValidate: true,
                                                },
                                              );
                                            }}>
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                data.id === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {data.jenis_kelamin}
                                          </CommandItem>
                                        ))}
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
                          name="id_kebangsaan"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kebangsaan</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    disabled={isLoading}
                                    similar={
                                      form.formState.errors?.kebangsaan
                                        ? "input-error"
                                        : "input-primary"
                                    }
                                    role="combobox"
                                    className="grid w-full grid-cols-12 justify-items-start">
                                    <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                      {field.value
                                        ? negaraData.find((data) => data.id === field.value)?.nama
                                        : ""}
                                    </p>
                                    <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandGroup>
                                      <ScrollArea className="h-48">
                                        {!!negaraData &&
                                          negaraData.map((data) => (
                                            <CommandItem
                                              className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                              key={data.id}
                                              value={data.id}
                                              onSelect={(value) => {
                                                form.setValue(
                                                  "id_kebangsaan",
                                                  value.toUpperCase(),
                                                  {
                                                    shouldValidate: true,
                                                  },
                                                );
                                              }}>
                                              <Check
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  data.id === field.value
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                                )}
                                              />
                                              {data.nama}
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
                          name="nomor_telepon"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nomor Telepon</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isLoading}
                                  type="tel"
                                  inputMode="numeric"
                                  onKeyDown={restrictAlphabet}
                                  variant={
                                    form.formState.errors?.nomor_telepon ? "error" : "primary"
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="id_kualifikasi_pendidikan"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kualifikasi Pendidikan</FormLabel>
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      disabled={isLoading}
                                      similar={
                                        form.formState.errors?.kualifikasi_pendidikan
                                          ? "input-error"
                                          : "input-primary"
                                      }
                                      role="combobox"
                                      className="grid w-full grid-cols-12 justify-items-start">
                                      <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                        {field.value
                                          ? kualifikasiPendidikanData.find(
                                              (data) => data.id === field.value,
                                            )?.kualifikasi_pendidikan
                                          : ""}
                                      </p>
                                      <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command className="mr-6">
                                      <CommandGroup>
                                        <ScrollArea className="h-48">
                                          {kualifikasiPendidikanData.map((data) => (
                                            <CommandItem
                                              className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                              key={data.id}
                                              value={data.id}
                                              onSelect={(value) => {
                                                form.setValue("id_kualifikasi_pendidikan", value, {
                                                  shouldValidate: true,
                                                });
                                              }}>
                                              <Check
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  data.id === field.value
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                                )}
                                              />
                                              {data.kualifikasi_pendidikan}
                                            </CommandItem>
                                          ))}
                                        </ScrollArea>
                                      </CommandGroup>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <div className="col-span-2 flex flex-col gap-2">
                          <p className="font-aileron text-base font-bold text-secondary-500">
                            Alamat Rumah
                          </p>
                          <div className="grid grid-cols-2 gap-8">
                            <FormField
                              control={form.control}
                              name="id_provinsi"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Provinsi</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        disabled={isLoading}
                                        similar={
                                          form.formState.errors?.id_provinsi
                                            ? "input-error"
                                            : "input-primary"
                                        }
                                        role="combobox"
                                        className="grid w-full grid-cols-12 justify-items-start">
                                        <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                          {field.value
                                            ? provinsiData.find((data) => data.id === field.value)
                                                ?.nama
                                            : ""}
                                        </p>
                                        <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                      <Command>
                                        <CommandGroup>
                                          <ScrollArea className="h-48">
                                            {!!provinsiData &&
                                              provinsiData.map((data) => (
                                                <CommandItem
                                                  className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                                  key={data.id}
                                                  value={data.id}
                                                  onSelect={(value) => {
                                                    form.setValue("id_provinsi", value, {
                                                      shouldValidate: true,
                                                    });
                                                    form.setValue("id_kota_kabupaten", null);
                                                    form.setValue("id_kecamatan", null);
                                                    form.setValue("id_kelurahan_desa", null);
                                                  }}>
                                                  <Check
                                                    className={cn(
                                                      "mr-2 h-4 w-4",
                                                      data.id === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0",
                                                    )}
                                                  />
                                                  {data.nama}
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
                              name="id_kota_kabupaten"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Kota / Kabupaten</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        disabled={!idProvinsi || isLoading}
                                        similar={
                                          form.formState.errors?.id_kota_kabupaten
                                            ? "input-error"
                                            : "input-primary"
                                        }
                                        role="combobox"
                                        className="grid w-full grid-cols-12 justify-items-start">
                                        <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                          {field.value
                                            ? kotaKabupatenData.find(
                                                (data) => data.id === field.value,
                                              )?.nama
                                            : ""}
                                        </p>
                                        <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                      <Command>
                                        <CommandGroup>
                                          <ScrollArea className="h-48">
                                            {!!kotaKabupatenData &&
                                              kotaKabupatenData.map((data) => (
                                                <CommandItem
                                                  className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                                  key={data.id}
                                                  value={data.id}
                                                  onSelect={(value) => {
                                                    form.setValue("id_kota_kabupaten", value, {
                                                      shouldValidate: true,
                                                    });
                                                    form.setValue("id_kelurahan_desa", null);
                                                    form.setValue("id_kecamatan", null);
                                                  }}>
                                                  <Check
                                                    className={cn(
                                                      "mr-2 h-4 w-4",
                                                      data.id === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0",
                                                    )}
                                                  />
                                                  {data.nama}
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
                              name="id_kecamatan"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Kecamatan</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        disabled={!idKotaKabupaten || isLoading}
                                        similar={
                                          form.formState.errors?.id_kecamatan
                                            ? "input-error"
                                            : "input-primary"
                                        }
                                        role="combobox"
                                        className="grid w-full grid-cols-12 justify-items-start">
                                        <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                          {field.value
                                            ? kecamatanData.find((data) => data.id === field.value)
                                                ?.nama
                                            : ""}
                                        </p>
                                        <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                      <Command>
                                        <CommandGroup>
                                          <ScrollArea className="h-48 cursor-pointer">
                                            {!!kecamatanData &&
                                              kecamatanData.map((data) => (
                                                <CommandItem
                                                  className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                                  key={data.id}
                                                  value={data.id}
                                                  onSelect={(value) => {
                                                    form.setValue("id_kecamatan", value, {
                                                      shouldValidate: true,
                                                    });
                                                    form.setValue("id_kelurahan_desa", null);
                                                  }}>
                                                  <Check
                                                    className={cn(
                                                      "mr-2 h-4 w-4",
                                                      data.id === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0",
                                                    )}
                                                  />
                                                  {data.nama}
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
                              name="id_kelurahan_desa"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Kelurahan / Desa</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        disabled={!idKecamatan || isLoading}
                                        similar={
                                          form.formState.errors?.id_kelurahan_desa
                                            ? "input-error"
                                            : "input-primary"
                                        }
                                        role="combobox"
                                        className="grid w-full grid-cols-12 justify-items-start">
                                        <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                          {field.value
                                            ? kelurahanDesaData.find(
                                                (data) => data.id === field.value,
                                              )?.nama
                                            : ""}
                                        </p>
                                        <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                      <Command>
                                        <CommandGroup>
                                          <ScrollArea className="h-48 cursor-pointer">
                                            {!!kelurahanDesaData &&
                                              kelurahanDesaData.map((data) => (
                                                <CommandItem
                                                  className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                                  key={data.id}
                                                  value={data.id}
                                                  onSelect={(value) => {
                                                    form.setValue("id_kelurahan_desa", value, {
                                                      shouldValidate: true,
                                                    });
                                                  }}>
                                                  <Check
                                                    className={cn(
                                                      "mr-2 h-4 w-4",
                                                      data.id === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0",
                                                    )}
                                                  />
                                                  {data.nama}
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
                              name="keterangan_lainnya"
                              render={({ field }) => (
                                <FormItem className="col-span-2">
                                  <FormLabel>Keterangan Lainnya</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} disabled={isLoading} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button className="w-full">Selesai</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      <div className="flex flex-col items-center gap-2">
                        <AnnotationAlert className="text-5xl text-secondary-500" />
                        <p className="font-anek-latin text-xl">Pendaftaran Asesor</p>
                      </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="py-4 text-sm">
                      Pastikan data yang dimasukkan sudah sesuai, karena ada beberapa data yang
                      tidak bisa di ubah lagi. Apakah Anda yakin?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <div className="flex w-full gap-4">
                      <AlertDialogCancel asChild>
                        <Button size="sm" variant="outline-error" className="w-full">
                          Batalkan
                        </Button>
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button size="sm" className="w-full" onClick={form.handleSubmit(onSubmit)}>
                          Konfirmasi
                        </Button>
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
  } else if (!!accessToken) {
    return <Navigate to="/" />;
  }
};
