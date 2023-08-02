// Packages
import { useState, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { yupResolver } from "@hookform/resolvers/yup";

// Context
import { AuthContext } from "../../context/AuthContext";

// Hooks
import { useImagePreview } from "../../hooks/useImagePreview";
import { useToast } from "../../hooks/useToast";

// Utils
import { cn } from "../../utils/cn";
import axios from "../../utils/axios";
import { permohonanSertifikasiKompetensiSchema } from "../../utils/yup";

// Data
import { negara } from "../../data/negara";

// Assets
import Check from "../../assets/icons/untitled-ui-icons/line/components/Check";
import ChevronSelectorVertical from "../../assets/icons/untitled-ui-icons/line/components/ChevronSelectorVertical";
import CalendarIcon from "../../assets/icons/untitled-ui-icons/line/components/Calendar";
import PlusSquare from "../../assets/icons/untitled-ui-icons/line/components/PlusSquare";
import RefreshCw04 from "../../assets/icons/untitled-ui-icons/line/components/RefreshCw04";
import XCircle from "../../assets/icons/untitled-ui-icons/line/components/XCircle";

// Components
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../components/ui/command";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "../../components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Textarea } from "../../components/ui/textarea";
import { ToastAction } from "../../components/ui/toast";
import { Upload } from "../../components/ui/upload";

export const Pendaftaran = () => {
  const { auth } = useContext(AuthContext);
  const isAsesi = auth?.role === "Asesi";
  const isAsesor = auth?.role === "Asesor";
  const isAdministrator = auth?.role === "Administrator";

  console.log(isAsesor);

  if (!!auth && isAsesi) {
    return (
      <>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col">
            <h1 className="font-anek-latin text-5xl font-semibold uppercase">
              Pendaftaran
            </h1>
            <p className="font-aileron text-base">
              Pendaftaran Sertifikasi Kompetensi
            </p>
          </div>
          <div>Formulir Untuk Asesi</div>
        </section>
      </>
    );
  } else if (!auth) {
    return (
      <>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col">
            <h1 className="font-anek-latin text-5xl font-semibold uppercase">
              Pendaftaran
            </h1>
            <p className="font-aileron text-base">
              Pendaftaran Sertifikasi Kompetensi dan pelengkapan data Asesi
            </p>
          </div>
          <PenggunaBaru />
        </section>
      </>
    );
  } else if (isAsesor || isAdministrator) {
    return <Navigate to="/" />;
  }
};

const PenggunaBaru = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(permohonanSertifikasiKompetensiSchema),
    defaultValues: {
      email: "",
      password: "",
      nama_lengkap: "",
      nik: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      kebangsaan: "",
      nomor_telepon: "",
      kualifikasi_pendidikan: "",
      alamat_rumah: {
        provinsi: "",
        kota_kabupaten: "",
        kecamatan: "",
        kelurahan_desa: "",
        keterangan_lainnya: "",
      },
      nama_institusi_perusahaan: "",
      jabatan: "",
      nomor_telepon_kantor: "",
      email_kantor: "",
      fax_kantor: "",
      alamat_kantor: {
        provinsi: "",
        kota_kabupaten: "",
        kecamatan: "",
        kelurahan_desa: "",
        keterangan_lainnya: "",
      },
      skema_sertifikasi: "",
      tujuan_asesmen: "",
      persyaratan_dasar: [],
      portofolio: [],
    },
  });

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const toYear = currentYear - 17;
  const fromYear = currentYear - 70;

  const [provinsiAlamatRumah, setProvinsiAlamatRumah] = useState([]);
  const [kabupatenAlamatRumah, setKabupatenAlamatRumah] = useState([]);
  const [kecamatanAlamatRumah, setKecamatanAlamatRumah] = useState([]);
  const [desaAlamatRumah, setDesaAlamatRumah] = useState([]);
  const [provinsiAlamatKantor, setProvinsiAlamatKantor] = useState([]);
  const [kabupatenAlamatKantor, setKabupatenAlamatKantor] = useState([]);
  const [kecamatanAlamatKantor, setKecamatanAlamatKantor] = useState([]);
  const [desaAlamatKantor, setDesaAlamatKantor] = useState([]);
  const [skemaSertifikasi, setSkemaSertifikasi] = useState([]);
  const [tujuanAsesmen, setTujuanAsesmen] = useState([]);
  const [persyaratanDasar, setPersyaratanDasar] = useState(null);
  const [idProvinsiAlamatRumah, setIdProvinsiAlamatRumah] = useState(null);
  const [idKabupatenAlamatRumah, setIdKabupatenAlamatRumah] = useState(null);
  const [idKecamatanAlamatRumah, setIdKecamatanAlamatRumah] = useState(null);
  const [idProvinsiAlamatKantor, setIdProvinsiAlamatKantor] = useState(null);
  const [idKabupatenAlamatKantor, setIdKabupatenAlamatKantor] = useState(null);
  const [idKecamatanAlamatKantor, setIdKecamatanAlamatKantor] = useState(null);
  const [idSkemaSertifikasi, setIdSkemaSertifikasi] = useState(null);

  const [fotoProfilPreview, setFotoProfilPreview, resetFotoProfilPreview] =
    useImagePreview();
  const { toast } = useToast();

  const jenisKelamin = [
    { value: "laki-laki", label: "Laki-laki" },
    { value: "perempuan", label: "Perempuan" },
  ];

  const kualifikasiPendidikan = [
    { id: "1", value: "sma", label: "SMA" },
    { id: "2", value: "smk", label: "SMK" },
    { id: "3", value: "diploma 1 (d1)", label: "Diploma 1 (D1)" },
    { id: "4", value: "diploma 2 (d2)", label: "Diploma 2 (D2)" },
    { id: "5", value: "diploma 3 (d3)", label: "Diploma 3 (D3)" },
    { id: "6", value: "diploma 4 (d4)", label: "Diploma 4 (D4)" },
    { id: "7", value: "sarjana (s1)", label: "Sarjana (S1)" },
    { id: "8", value: "magister (s2)", label: "Magister (S2)" },
    { id: "9", value: "doktor (s3)", label: "Doktor (S3)" },
  ];

  useQuery({
    queryKey: ["provinsi", "alamat-rumah"],
    queryFn: async () => {
      return await axios.get(`/indonesia/provinsi`);
    },
    onSuccess: (data) => {
      setProvinsiAlamatRumah(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useQuery({
    queryKey: ["kabupaten", "alamat-rumah", idProvinsiAlamatRumah],
    queryFn: async () => {
      if (!idProvinsiAlamatRumah) return;
      return await axios.get(
        `/indonesia/provinsi/${idProvinsiAlamatRumah}/kabupaten`,
      );
    },
    onSuccess: (data) => {
      setKabupatenAlamatRumah(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: !!idProvinsiAlamatRumah,
  });

  useQuery({
    queryKey: ["kecamatan", "alamat-rumah", idKabupatenAlamatRumah],
    queryFn: async () => {
      if (!idKabupatenAlamatRumah) return;
      return await axios.get(
        `/indonesia/provinsi/kabupaten/${idKabupatenAlamatRumah}/kecamatan`,
      );
    },
    onSuccess: (data) => {
      setKecamatanAlamatRumah(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: !!idKabupatenAlamatRumah,
  });

  useQuery({
    queryKey: ["desa", "alamat-rumah", idKecamatanAlamatRumah],
    queryFn: async () => {
      if (!idKecamatanAlamatRumah) return;
      return await axios.get(
        `/indonesia/provinsi/kabupaten/kecamatan/${idKecamatanAlamatRumah}/desa`,
      );
    },
    onSuccess: (data) => {
      setDesaAlamatRumah(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: !!idKecamatanAlamatRumah,
  });

  useQuery({
    queryKey: ["provinsi", "alamat-kantor"],
    queryFn: async () => {
      return await axios.get(`/indonesia/provinsi`);
    },
    onSuccess: (data) => {
      setProvinsiAlamatKantor(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useQuery({
    queryKey: ["kabupaten", "alamat-kantor", idProvinsiAlamatKantor],
    queryFn: async () => {
      if (!idProvinsiAlamatKantor) return;
      return await axios.get(
        `/indonesia/provinsi/${idProvinsiAlamatKantor}/kabupaten`,
      );
    },
    onSuccess: (data) => {
      setKabupatenAlamatKantor(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: !!idProvinsiAlamatKantor,
  });

  useQuery({
    queryKey: ["kecamatan", "alamat-kantor", idKabupatenAlamatKantor],
    queryFn: async () => {
      if (!idKabupatenAlamatKantor) return;
      return await axios.get(
        `/indonesia/provinsi/kabupaten/${idKabupatenAlamatKantor}/kecamatan`,
      );
    },
    onSuccess: (data) => {
      setKecamatanAlamatKantor(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: !!idKabupatenAlamatKantor,
  });

  useQuery({
    queryKey: ["desa", "alamat-kantor", idKecamatanAlamatKantor],
    queryFn: async () => {
      if (!idKecamatanAlamatKantor) return;
      return await axios.get(
        `/indonesia/provinsi/kabupaten/kecamatan/${idKecamatanAlamatKantor}/desa`,
      );
    },
    onSuccess: (data) => {
      setDesaAlamatKantor(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: !!idKecamatanAlamatKantor,
  });

  useQuery({
    queryKey: ["skema-sertifikasi"],
    queryFn: async () => {
      return await axios.get(`/skema-sertifikasi`);
    },
    onSuccess: (data) => {
      setSkemaSertifikasi(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useQuery({
    queryKey: ["tujuan-asesmen"],
    queryFn: async () => {
      return await axios.get(`/skema-sertifikasi/tujuan-asesmen`);
    },
    onSuccess: (data) => {
      setTujuanAsesmen(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useQuery({
    queryKey: ["persyaratan-dasar", idSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/skema-sertifikasi/${idSkemaSertifikasi}/persyaratan-dasar`,
      );
    },
    onSuccess: (data) => {
      setPersyaratanDasar(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: !!idSkemaSertifikasi,
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`/asesi/register`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data) => {
      console.log(data);
      form.reset();
      setPersyaratanDasar(null);
      resetFotoProfilPreview();
      toast({
        variant: "success",
        title: "Pendaftaran Berhasil",
        description: "Silahkan masuk dengan email yang telah didaftarkan",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "error",
        title: "Terjadi Kesalahan",
        description: "Silahkan coba lagi",
      });
    },
  });

  const onSubmit = (data) => {
    const {
      nama_lengkap,
      nik,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      kebangsaan,
      nomor_telepon,
      email,
      password,
      kualifikasi_pendidikan,
      alamat_rumah,
      nama_institusi_perusahaan,
      jabatan,
      nomor_telepon_kantor,
      email_kantor,
      fax_kantor,
      alamat_kantor,
      profil_user,
      skema_sertifikasi,
      tujuan_asesmen,
      persyaratan_dasar,
      portofolio,
    } = data;

    const processArrayEntries = (
      inputArray,
      propertyName,
      customPropertyName,
    ) => {
      const resultObject = {};
      for (const [index, valueInputArray] of inputArray.entries()) {
        const fileList = valueInputArray[propertyName];
        const fileArray = Array.from(fileList);
        const fileValueArray = [];
        for (const valueFileArray of fileArray) {
          fileValueArray.push(valueFileArray);
        }
        resultObject[`${customPropertyName}[${index}]`] = fileValueArray;
      }
      return resultObject;
    };

    const persyaratanDasarFile = processArrayEntries(
      persyaratan_dasar,
      "bukti",
      "persyaratan_dasar",
    );

    const portofolioFile = processArrayEntries(
      portofolio,
      "bukti",
      "portofolio",
    );

    mutate({
      nama_lengkap,
      nik,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      kebangsaan,
      nomor_telepon,
      email,
      password,
      kualifikasi_pendidikan,
      alamat_rumah,
      nama_institusi_perusahaan,
      jabatan,
      nomor_telepon_kantor,
      email_kantor,
      fax_kantor,
      alamat_kantor,
      profil_user,
      skema_sertifikasi,
      tujuan_asesmen,
      persyaratan_dasar,
      ...persyaratanDasarFile,
      portofolio,
      ...portofolioFile,
    });
  };

  const restrictAlphabet = (event) => {
    const allowedKeys = [
      8, 9, 13, 33, 34, 35, 36, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54,
      55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
    ];
    const key = event.which || event.keyCode;
    const isAllowed =
      allowedKeys.includes(key) || (event.ctrlKey && key === 65);

    if (!isAllowed) {
      event.preventDefault();
    }
  };

  return (
    <>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4 rounded-lg bg-white p-12 shadow-lg">
                <div>
                  <p className="font-anek-latin text-2xl font-semibold text-secondary-500">
                    Skema Sertifikasi
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="skema_sertifikasi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skema Sertifkasi</FormLabel>
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
                                className="grid w-full grid-cols-12 justify-items-start"
                              >
                                <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                  {field.value
                                    ? skemaSertifikasi.find(
                                        (data) => data.id === field.value,
                                      )?.nama_skema_sertifikasi
                                    : ""}
                                </p>
                                <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandGroup>
                                  <ScrollArea className="h-28 rounded-md">
                                    {skemaSertifikasi.map((data) => (
                                      <CommandItem
                                        className="min-w-max"
                                        key={data.id}
                                        value={data.id}
                                        onSelect={(value) => {
                                          form.setValue(
                                            "skema_sertifikasi",
                                            value,
                                          );
                                          form.setValue(
                                            "persyaratan_dasar",
                                            null,
                                          );
                                          setIdSkemaSertifikasi(data.id);
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
                                        {data.nama_skema_sertifikasi}
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
                      name="tujuan_asesmen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tujuan Asesmen</FormLabel>
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
                                className="grid w-full grid-cols-12 justify-items-start"
                              >
                                <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                  {field.value
                                    ? tujuanAsesmen.find(
                                        (data) => data.id === field.value,
                                      )?.tujuan
                                    : ""}
                                </p>
                                <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandGroup>
                                  <ScrollArea className="h-28 rounded-md">
                                    {tujuanAsesmen.map((data) => (
                                      <CommandItem
                                        className="min-w-max"
                                        key={data.id}
                                        value={data.id}
                                        onSelect={(value) => {
                                          form.setValue(
                                            "tujuan_asesmen",
                                            value,
                                          );
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
                                        {data.tujuan}
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
              </div>
              <div className="flex flex-col gap-4 rounded-lg bg-white p-12 shadow-lg">
                <p className="font-anek-latin text-2xl font-semibold text-secondary-500">
                  Akun Pengguna
                </p>
                <div className="flex flex-col gap-4">
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
                              variant={
                                form.formState.errors?.email
                                  ? "error"
                                  : "primary"
                              }
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
                              variant={
                                form.formState.errors?.password
                                  ? "error"
                                  : "primary"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-12 rounded-lg bg-white p-12 shadow-lg">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="font-anek-latin text-2xl font-semibold text-secondary-500">
                      Data Pribadi
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
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
                                totalFile={
                                  form.watch(`profil_user`)?.length ?? 0
                                }
                                onChange={(event) => {
                                  setFotoProfilPreview(event);
                                  field.onChange(event.target.files);
                                }}
                                accept={"image/*"}
                                variant={
                                  form.formState.errors?.profil_user
                                    ? "error"
                                    : "primary"
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
                              form.setValue("profil_user", null);
                              resetFotoProfilPreview();
                            }}
                          >
                            <XCircle className="text-base text-error-500" />
                          </button>
                        </div>
                      )}
                    </dir>
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
                                form.formState.errors?.nama_lengkap
                                  ? "error"
                                  : "primary"
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
                              variant={
                                form.formState.errors?.nik ? "error" : "primary"
                              }
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
                                form.formState.errors?.tempat_lahir
                                  ? "error"
                                  : "primary"
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
                                  className="grid w-full grid-cols-12 justify-items-start"
                                >
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
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
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
                      name="jenis_kelamin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jenis Kelamin</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                disabled={isLoading}
                                similar={
                                  form.formState.errors?.jenis_kelamin
                                    ? "input-error"
                                    : "input-primary"
                                }
                                role="combobox"
                                className="grid w-full grid-cols-12 justify-items-start"
                              >
                                <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                  {field.value
                                    ? jenisKelamin.find(
                                        (data) => data.value === field.value,
                                      )?.label
                                    : ""}
                                </p>
                                <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandGroup>
                                  <ScrollArea className="h-min w-max rounded-md">
                                    {jenisKelamin.map((data) => (
                                      <CommandItem
                                        className="min-w-max"
                                        key={data.value}
                                        value={data.label}
                                        onSelect={(value) => {
                                          form.setValue(
                                            "jenis_kelamin",
                                            value,
                                            { shouldValidate: true },
                                          );
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            data.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                        {data.label}
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
                      name="kebangsaan"
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
                                className="grid w-full grid-cols-12 justify-items-start"
                              >
                                <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                  {field.value
                                    ? negara.find(
                                        (data) => data.value === field.value,
                                      )?.nama
                                    : ""}
                                </p>
                                <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Cari..." />
                                <CommandEmpty>
                                  Negara tidak ditemukan.
                                </CommandEmpty>
                                <CommandGroup>
                                  <ScrollArea className="h-28 rounded-md">
                                    {negara.map((data) => (
                                      <CommandItem
                                        className="min-w-max"
                                        key={data.value}
                                        value={data.value}
                                        onSelect={(value) => {
                                          form.setValue("kebangsaan", value, {
                                            shouldValidate: true,
                                          });
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            data.value === field.value
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
                                form.formState.errors?.nomor_telepon
                                  ? "error"
                                  : "primary"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kualifikasi_pendidikan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kualifikasi Pendidikan</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  disabled={isLoading}
                                  similar={
                                    form.formState.errors
                                      ?.kualifikasi_pendidikan
                                      ? "input-error"
                                      : "input-primary"
                                  }
                                  role="combobox"
                                  className="grid w-full grid-cols-12 justify-items-start"
                                >
                                  <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                    {field.value
                                      ? kualifikasiPendidikan.find(
                                          (data) => data.value === field.value,
                                        )?.label
                                      : ""}
                                  </p>
                                  <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandGroup>
                                    <ScrollArea className="h-28 rounded-md">
                                      {kualifikasiPendidikan.map((data) => (
                                        <CommandItem
                                          className="min-w-max"
                                          key={data.id}
                                          value={data.value}
                                          onSelect={(value) => {
                                            form.setValue(
                                              "kualifikasi_pendidikan",
                                              value,
                                              { shouldValidate: true },
                                            );
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              data.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                          {data.label}
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
                    <div className="col-span-2 flex flex-col gap-2">
                      <p className="font-aileron text-secondary-500">
                        Alamat Rumah
                      </p>
                      <div className="grid grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="alamat_rumah.provinsi"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Provinsi</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    disabled={isLoading}
                                    similar={
                                      form.formState.errors?.alamat_rumah
                                        ?.provinsi
                                        ? "input-error"
                                        : "input-primary"
                                    }
                                    role="combobox"
                                    className="grid w-full grid-cols-12 justify-items-start"
                                  >
                                    <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                      {field.value
                                        ? provinsiAlamatRumah.find(
                                            (data) =>
                                              data.value === field.value,
                                          )?.nama
                                        : ""}
                                    </p>
                                    <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Cari..." />
                                    <CommandEmpty>
                                      Provinsi tidak ditemukan.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <ScrollArea className="h-28 rounded-md">
                                        {provinsiAlamatRumah.map((data) => (
                                          <CommandItem
                                            className="min-w-max"
                                            key={data.value}
                                            value={data.value}
                                            onSelect={(value) => {
                                              form.setValue(
                                                "alamat_rumah.provinsi",
                                                value,
                                                { shouldValidate: true },
                                              );
                                              form.setValue(
                                                "alamat_rumah.kota_kabupaten",
                                                null,
                                              );
                                              form.setValue(
                                                "alamat_rumah.kecamatan",
                                                null,
                                              );
                                              form.setValue(
                                                "alamat_rumah.kelurahan_desa",
                                                null,
                                              );
                                              setIdProvinsiAlamatRumah(data.id);
                                              setIdKabupatenAlamatRumah(null);
                                              setIdKecamatanAlamatRumah(null);
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                data.value === field.value
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
                          name="alamat_rumah.kota_kabupaten"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kota / Kabupaten</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    disabled={
                                      !idProvinsiAlamatRumah || isLoading
                                    }
                                    similar={
                                      form.formState.errors?.alamat_rumah
                                        ?.kota_kabupaten
                                        ? "input-error"
                                        : "input-primary"
                                    }
                                    role="combobox"
                                    className="grid w-full grid-cols-12 justify-items-start"
                                  >
                                    <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                      {field.value
                                        ? kabupatenAlamatRumah.find(
                                            (data) =>
                                              data.value === field.value,
                                          )?.nama
                                        : ""}
                                    </p>
                                    <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Cari..." />
                                    <CommandEmpty>
                                      Kota / Kabupaten tidak ditemukan.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <ScrollArea className="h-28 rounded-md">
                                        {kabupatenAlamatRumah.map((data) => (
                                          <CommandItem
                                            className="min-w-max"
                                            key={data.value}
                                            value={data.value}
                                            onSelect={(value) => {
                                              form.setValue(
                                                "alamat_rumah.kota_kabupaten",
                                                value,
                                                { shouldValidate: true },
                                              );
                                              form.setValue(
                                                "alamat_rumah.kelurahan_desa",
                                                null,
                                              );
                                              form.setValue(
                                                "alamat_rumah.kecamatan",
                                                null,
                                              );
                                              setIdKabupatenAlamatRumah(
                                                data.id,
                                              );
                                              setIdKecamatanAlamatRumah(null);
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                data.value === field.value
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
                          name="alamat_rumah.kecamatan"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kecamatan</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    disabled={
                                      !idKabupatenAlamatRumah || isLoading
                                    }
                                    similar={
                                      form.formState.errors?.alamat_rumah
                                        ?.kecamatan
                                        ? "input-error"
                                        : "input-primary"
                                    }
                                    role="combobox"
                                    className="grid w-full grid-cols-12 justify-items-start"
                                  >
                                    <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                      {field.value
                                        ? kecamatanAlamatRumah.find(
                                            (data) =>
                                              data.value === field.value,
                                          )?.nama
                                        : ""}
                                    </p>
                                    <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Cari..." />
                                    <CommandEmpty>
                                      Kecamatan tidak ditemukan.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <ScrollArea className="h-28 rounded-md">
                                        {kecamatanAlamatRumah.map((data) => (
                                          <CommandItem
                                            className="min-w-max"
                                            key={data.value}
                                            value={data.value}
                                            onSelect={(value) => {
                                              form.setValue(
                                                "alamat_rumah.kecamatan",
                                                value,
                                                { shouldValidate: true },
                                              );
                                              form.setValue(
                                                "alamat_rumah.kelurahan_desa",
                                                null,
                                              );
                                              setIdKecamatanAlamatRumah(
                                                data.id,
                                              );
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                data.value === field.value
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
                          name="alamat_rumah.kelurahan_desa"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kelurahan / Desa</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    disabled={
                                      !idKecamatanAlamatRumah || isLoading
                                    }
                                    similar={
                                      form.formState.errors?.alamat_rumah
                                        ?.kelurahan_desa
                                        ? "input-error"
                                        : "input-primary"
                                    }
                                    role="combobox"
                                    className="grid w-full grid-cols-12 justify-items-start"
                                  >
                                    <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                      {field.value
                                        ? desaAlamatRumah.find(
                                            (data) =>
                                              data.value === field.value,
                                          )?.nama
                                        : ""}
                                    </p>
                                    <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Cari..." />
                                    <CommandEmpty>
                                      Kelurahan / Desa tidak ditemukan.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <ScrollArea className="h-28 rounded-md">
                                        {desaAlamatRumah.map((data) => (
                                          <CommandItem
                                            className="min-w-max"
                                            key={data.value}
                                            value={data.value}
                                            onSelect={(value) => {
                                              form.setValue(
                                                "alamat_rumah.kelurahan_desa",
                                                value,
                                                { shouldValidate: true },
                                              );
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                data.value === field.value
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
                          name="alamat_rumah.keterangan_lainnya"
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
              <div className="flex flex-col gap-12 rounded-lg bg-white p-12 shadow-lg">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="font-anek-latin text-2xl font-semibold text-secondary-500">
                      Data Pekerjaan
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="nama_institusi_perusahaan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Perusahaan / Institusi</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              variant={
                                form.formState.errors?.nama_institusi_perusahaan
                                  ? "error"
                                  : "primary"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jabatan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jabatan</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              variant={
                                form.formState.errors?.jabatan
                                  ? "error"
                                  : "primary"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nomor_telepon_kantor"
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
                                form.formState.errors?.nomor_telepon_kantor
                                  ? "error"
                                  : "primary"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email_kantor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              variant={
                                form.formState.errors?.email_kantor
                                  ? "error"
                                  : "primary"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fax_kantor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fax</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isLoading}
                              type="tel"
                              inputMode="numeric"
                              onKeyDown={restrictAlphabet}
                              variant={
                                form.formState.errors?.fax_kantor
                                  ? "error"
                                  : "primary"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="col-span-2 flex flex-col gap-2">
                      <p className="font-aileron text-secondary-500">
                        Alamat Kantor
                      </p>
                      <div className="grid grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="alamat_kantor.provinsi"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Provinsi</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    disabled={isLoading}
                                    similar={
                                      form.formState.errors?.alamat_kantor
                                        ?.provinsi
                                        ? "input-error"
                                        : "input-primary"
                                    }
                                    role="combobox"
                                    className="grid w-full grid-cols-12 justify-items-start"
                                  >
                                    <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                      {field.value
                                        ? provinsiAlamatKantor.find(
                                            (data) =>
                                              data.value === field.value,
                                          )?.nama
                                        : ""}
                                    </p>
                                    <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Cari..." />
                                    <CommandEmpty>
                                      Provinsi tidak ditemukan.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <ScrollArea className="h-28 rounded-md">
                                        {provinsiAlamatKantor.map((data) => (
                                          <CommandItem
                                            className="min-w-max"
                                            key={data.value}
                                            value={data.value}
                                            onSelect={(value) => {
                                              form.setValue(
                                                "alamat_kantor.provinsi",
                                                value,
                                                { shouldValidate: true },
                                              );
                                              form.setValue(
                                                "alamat_kantor.kota_kabupaten",
                                                null,
                                              );
                                              form.setValue(
                                                "alamat_kantor.kecamatan",
                                                null,
                                              );
                                              form.setValue(
                                                "alamat_kantor.kelurahan_desa",
                                                null,
                                              );
                                              setIdProvinsiAlamatKantor(
                                                data.id,
                                              );
                                              setIdKabupatenAlamatKantor(null);
                                              setIdKecamatanAlamatKantor(null);
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                data.value === field.value
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
                          name="alamat_kantor.kota_kabupaten"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kota / Kabupaten</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    disabled={
                                      !idProvinsiAlamatKantor || isLoading
                                    }
                                    similar={
                                      form.formState.errors?.alamat_kantor
                                        ?.kota_kabupaten
                                        ? "input-error"
                                        : "input-primary"
                                    }
                                    role="combobox"
                                    className="grid w-full grid-cols-12 justify-items-start"
                                  >
                                    <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                      {field.value
                                        ? kabupatenAlamatKantor.find(
                                            (data) =>
                                              data.value === field.value,
                                          )?.nama
                                        : ""}
                                    </p>
                                    <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Cari..." />
                                    <CommandEmpty>
                                      Kota / Kabupaten tidak ditemukan.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <ScrollArea className="h-28 rounded-md">
                                        {kabupatenAlamatKantor.map((data) => (
                                          <CommandItem
                                            className="min-w-max"
                                            key={data.value}
                                            value={data.value}
                                            onSelect={(value) => {
                                              form.setValue(
                                                "alamat_kantor.kota_kabupaten",
                                                value,
                                                { shouldValidate: true },
                                              );
                                              form.setValue(
                                                "alamat_kantor.kelurahan_desa",
                                                null,
                                              );
                                              form.setValue(
                                                "alamat_kantor.kecamatan",
                                                null,
                                              );
                                              setIdKabupatenAlamatKantor(
                                                data.id,
                                              );
                                              setIdKecamatanAlamatKantor(null);
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                data.value === field.value
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
                          name="alamat_kantor.kecamatan"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kecamatan</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    disabled={
                                      !idKabupatenAlamatKantor || isLoading
                                    }
                                    similar={
                                      form.formState.errors?.alamat_kantor
                                        ?.kecamatan
                                        ? "input-error"
                                        : "input-primary"
                                    }
                                    role="combobox"
                                    className="grid w-full grid-cols-12 justify-items-start"
                                  >
                                    <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                      {field.value
                                        ? kecamatanAlamatKantor.find(
                                            (data) =>
                                              data.value === field.value,
                                          )?.nama
                                        : ""}
                                    </p>
                                    <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Cari..." />
                                    <CommandEmpty>
                                      Kecamatan tidak ditemukan.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <ScrollArea className="h-28 rounded-md">
                                        {kecamatanAlamatKantor.map((data) => (
                                          <CommandItem
                                            className="min-w-max"
                                            key={data.value}
                                            value={data.value}
                                            onSelect={(value) => {
                                              form.setValue(
                                                "alamat_kantor.kecamatan",
                                                value,
                                                { shouldValidate: true },
                                              );
                                              form.setValue(
                                                "alamat_kantor.kelurahan_desa",
                                                null,
                                              );
                                              setIdKecamatanAlamatKantor(
                                                data.id,
                                              );
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                data.value === field.value
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
                          name="alamat_kantor.kelurahan_desa"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kelurahan / Desa</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    disabled={
                                      !idKecamatanAlamatKantor || isLoading
                                    }
                                    similar={
                                      form.formState.errors?.alamat_kantor
                                        ?.kelurahan_desa
                                        ? "input-error"
                                        : "input-primary"
                                    }
                                    role="combobox"
                                    className="grid w-full grid-cols-12 justify-items-start"
                                  >
                                    <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                      {field.value
                                        ? desaAlamatKantor.find(
                                            (data) =>
                                              data.value === field.value,
                                          )?.nama
                                        : ""}
                                    </p>
                                    <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Cari..." />
                                    <CommandEmpty>
                                      Kelurahan / Desa tidak ditemukan.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <ScrollArea className="h-28 rounded-md">
                                        {desaAlamatKantor.map((data) => (
                                          <CommandItem
                                            className="min-w-max"
                                            key={data.value}
                                            value={data.value}
                                            onSelect={(value) => {
                                              form.setValue(
                                                "alamat_kantor.kelurahan_desa",
                                                value,
                                                { shouldValidate: true },
                                              );
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                data.value === field.value
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
                          name="alamat_kantor.keterangan_lainnya"
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
              {persyaratanDasar && (
                <div className="flex flex-col rounded-lg bg-white p-12 shadow-lg">
                  <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-4">
                      <p className="font-anek-latin text-2xl font-semibold text-secondary-500">
                        Persyaratan Dasar
                      </p>
                      <Table>
                        <TableHeader className="text-base">
                          <TableRow>
                            <TableHead className="w-8/12">Syarat</TableHead>
                            <TableHead className="w-3/12">Bukti</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="text-base">
                          {persyaratanDasar &&
                            persyaratanDasar.map((data, index) => (
                              <TableRow key={data.id}>
                                <TableCell>{data.persyaratan_dasar}</TableCell>
                                <TableCell>
                                  <div className="flex justify-end gap-4">
                                    <FormField
                                      control={form.control}
                                      name={`persyaratan_dasar.${index}.bukti`}
                                      render={({ field }) => (
                                        <FormItem className="w-full self-end">
                                          <FormControl>
                                            <Upload
                                              {...field}
                                              disabled={isLoading}
                                              value={field.value?.fileName}
                                              size="xs"
                                              totalFile={
                                                form.watch(
                                                  `persyaratan_dasar.${index}.bukti`,
                                                )?.length ?? 0
                                              }
                                              multiple
                                              onChange={(event) => {
                                                field.onChange(
                                                  event.target.files,
                                                );
                                                form.setValue(
                                                  `persyaratan_dasar.${index}.id_persyaratan_dasar`,
                                                  data.id,
                                                );
                                              }}
                                              accept={"image/*"}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex flex-col rounded-lg bg-white p-12 shadow-lg">
                <div className="flex flex-col gap-4">
                  <p className="font-anek-latin text-2xl font-semibold text-secondary-500">
                    Portofolio
                  </p>
                  <div>
                    <Portofolio form={form} isLoading={isLoading} />
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className="w-full"
                >
                  {isLoading && (
                    <RefreshCw04 className="origin-center animate-spin" />
                  )}
                  Selesai
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

const PenggunaTerdaftar = () => {};

const Portofolio = ({ form, isLoading }) => {
  const [imageFiles, setImageFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles(files);
  };

  const { fields, remove, prepend, append } = useFieldArray({
    name: `portofolio`,
    control: form.control,
  });

  const portofolioFields = fields.map((field, index) => {
    return (
      <div key={field.id}>
        <div className="relative grid grid-cols-12 gap-8">
          <FormField
            control={form.control}
            name={`portofolio.${index}.keterangan`}
            render={({ field }) => (
              <FormItem className="col-span-8">
                <FormLabel>Keterangan Portofolio</FormLabel>
                <FormControl>
                  <Textarea {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`portofolio.${index}.bukti`}
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Upload
                    {...field}
                    multiple
                    disabled={isLoading}
                    size="sm"
                    totalFile={
                      form.watch(`portofolio.${index}.bukti`)?.length ?? 0
                    }
                    className="min-h-[6rem]"
                    value={field.value?.fileName}
                    onChange={(event) => {
                      field.onChange(event.target.files);
                    }}
                    accept={"image/*"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="button"
            className={cn(
              "absolute -right-6 -top-1 rounded-lg bg-error-50 p-1 text-xl text-error-500 transition-colors hover:bg-error-100",
              {
                hidden: isLoading,
              },
            )}
            onClick={() => remove(index)}
          >
            <XCircle />
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        {portofolioFields}
        <Button
          type="button"
          disabled={isLoading}
          className="col-span-1 col-start-10"
          onClick={() =>
            append({
              keterangan: "",
              bukti: null,
            })
          }
        >
          <PlusSquare className="text-2xl" />
        </Button>
      </div>
    </div>
  );
};
