// Packages
import { useState, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthContext } from "../../context/AuthContext";

import { useImagePreview } from "../../hooks/useImagePreview";
import { useToast } from "../../hooks/useToast";

import { cn } from "../../utils/cn";
import axios from "../../utils/axios";
import { permohonanSertifikasiKompetensiSchema } from "../../utils/yup";

import AnnotationAlert from "../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import Check from "../../assets/icons/untitled-ui-icons/line/components/Check";
import ChevronSelectorVertical from "../../assets/icons/untitled-ui-icons/line/components/ChevronSelectorVertical";
import CalendarIcon from "../../assets/icons/untitled-ui-icons/line/components/Calendar";
import PlusSquare from "../../assets/icons/untitled-ui-icons/line/components/PlusSquare";
import RefreshCw04 from "../../assets/icons/untitled-ui-icons/line/components/RefreshCw04";
import XCircle from "../../assets/icons/untitled-ui-icons/line/components/XCircle";

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
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
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

  if (!!auth && isAsesi) {
    return (
      <>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col">
            <h1 className="font-anek-latin text-5xl font-semibold uppercase">Pendaftaran</h1>
            <p className="font-aileron text-base">Pendaftaran Sertifikasi Kompetensi</p>
          </div>
          <div>
            <PenggunaTerdaftar isAsesi={isAsesi} auth={auth} />
          </div>
        </section>
      </>
    );
  } else if (!auth) {
    return (
      <>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col">
            <h1 className="font-anek-latin text-5xl font-semibold uppercase">Pendaftaran</h1>
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
  const location = useLocation();
  const navigate = useNavigate();
  const [fotoProfilPreview, setFotoProfilPreview, resetFotoProfilPreview] = useImagePreview();
  const { toast } = useToast();

  const [provinsiAlamatRumahData, setProvinsiAlamatRumahData] = useState();
  const [kotaKabupatenAlamatRumahData, setKotaKabupatenAlamatRumahData] = useState();
  const [kecamatanAlamatRumahData, setKecamatanAlamatRumahData] = useState();
  const [kelurahanDesaAlamatRumahData, setKelurahanDesaAlamatRumahData] = useState();
  const [provinsiAlamatKantorData, setProvinsiAlamatKantorData] = useState();
  const [kotaKabupatenAlamatKantorData, setKotaKabupatenAlamatKantorData] = useState();
  const [kecamatanAlamatKantorData, setKecamatanAlamatKantorData] = useState();
  const [kelurahanDesaAlamatKantorData, setKelurahanDesaAlamatKantorData] = useState();
  const [skemaSertifikasiData, setSkemaSertifikasiData] = useState();
  const [tujuanAsesmenData, setTujuanAsesmenData] = useState();
  const [jenisKelaminData, setJenisKelaminData] = useState();
  const [kualifikasiPendidikanData, setKualifikasiPendidikanData] = useState();
  const [negaraData, setNegaraData] = useState();
  const [persyaratanDasar, setPersyaratanDasar] = useState(null);
  const [idSkemaSertifikasi, setIdSkemaSertifikasi] = useState(
    location?.state?.id_skema_sertifikasi || null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      id_kebangsaan: "",
      nomor_telepon: "",
      id_kualifikasi_pendidikan: "",
      alamat_rumah: {
        id_provinsi: "",
        id_kota_kabupaten: "",
        id_kecamatan: "",
        id_kelurahan_desa: "",
        keterangan_lainnya: "",
      },
      nama_institusi_perusahaan: "",
      jabatan: "",
      nomor_telepon_kantor: "",
      email_kantor: "",
      fax_kantor: "",
      alamat_kantor: {
        id_provinsi: "",
        id_kota_kabupaten: "",
        id_kecamatan: "",
        id_kelurahan_desa: "",
        keterangan_lainnya: "",
      },
      id_skema_sertifikasi: location?.state?.id_skema_sertifikasi || "",
      id_tujuan_asesmen: "",
      persyaratan_dasar: [],
      portofolio: [
        {
          keterangan: "",
          bukti: [],
        },
      ],
    },
  });

  const idProvinsiAlamatRumah = useWatch({
    control: form.control,
    name: "alamat_rumah.id_provinsi",
  });

  const idKotaKabupatenAlamatRumah = useWatch({
    control: form.control,
    name: "alamat_rumah.id_kota_kabupaten",
  });

  const idKecamatanAlamatRumah = useWatch({
    control: form.control,
    name: "alamat_rumah.id_kecamatan",
  });

  const idProvinsiAlamatKantor = useWatch({
    control: form.control,
    name: "alamat_kantor.id_provinsi",
  });

  const idKotaKabupatenAlamatKantor = useWatch({
    control: form.control,
    name: "alamat_kantor.id_kota_kabupaten",
  });

  const idKecamatanAlamatKantor = useWatch({
    control: form.control,
    name: "alamat_kantor.id_kecamatan",
  });

  const email = useWatch({
    control: form.control,
    name: "email",
  });

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const toYear = currentYear - 17;
  const fromYear = currentYear - 70;

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
    queryKey: ["negara"],
    queryFn: async () => {
      return await axios.get(`/negara`);
    },
    onSuccess: (data) => {
      setNegaraData(data.data.data);
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
      setProvinsiAlamatRumahData(data.data.data);
      setProvinsiAlamatKantorData(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useQuery({
    queryKey: ["kabupaten", idProvinsiAlamatRumah],
    queryFn: async () => {
      if (!idProvinsiAlamatRumah) return;
      return await axios.get(`/indonesia/provinsi/${idProvinsiAlamatRumah}/kota-kabupaten`);
    },
    onSuccess: (data) => {
      setKotaKabupatenAlamatRumahData(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: !!idProvinsiAlamatRumah,
  });

  useQuery({
    queryKey: ["kecamatan", idKotaKabupatenAlamatRumah],
    queryFn: async () => {
      if (!idKotaKabupatenAlamatRumah) return;
      return await axios.get(
        `/indonesia/provinsi/kota-kabupaten/${idKotaKabupatenAlamatRumah}/kecamatan`,
      );
    },
    onSuccess: (data) => {
      setKecamatanAlamatRumahData(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: !!idKotaKabupatenAlamatRumah,
  });

  useQuery({
    queryKey: ["desa", idKecamatanAlamatRumah],
    queryFn: async () => {
      if (!idKecamatanAlamatRumah) return;
      return await axios.get(
        `/indonesia/provinsi/kota-kabupaten/kecamatan/${idKecamatanAlamatRumah}/kelurahan-desa`,
      );
    },
    onSuccess: (data) => {
      setKelurahanDesaAlamatRumahData(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: !!idKecamatanAlamatRumah,
  });

  useQuery({
    queryKey: ["kabupaten", idProvinsiAlamatKantor],
    queryFn: async () => {
      if (!idProvinsiAlamatKantor) return;
      return await axios.get(`/indonesia/provinsi/${idProvinsiAlamatKantor}/kota-kabupaten`);
    },
    onSuccess: (data) => {
      setKotaKabupatenAlamatKantorData(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: !!idProvinsiAlamatKantor,
  });

  useQuery({
    queryKey: ["kecamatan", idKotaKabupatenAlamatKantor],
    queryFn: async () => {
      if (!idKotaKabupatenAlamatKantor) return;
      return await axios.get(
        `/indonesia/provinsi/kota-kabupaten/${idKotaKabupatenAlamatKantor}/kecamatan`,
      );
    },
    onSuccess: (data) => {
      setKecamatanAlamatKantorData(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: !!idKotaKabupatenAlamatKantor,
  });

  useQuery({
    queryKey: ["desa", idKecamatanAlamatKantor],
    queryFn: async () => {
      if (!idKecamatanAlamatKantor) return;
      return await axios.get(
        `/indonesia/provinsi/kota-kabupaten/kecamatan/${idKecamatanAlamatKantor}/kelurahan-desa`,
      );
    },
    onSuccess: (data) => {
      setKelurahanDesaAlamatKantorData(data.data.data);
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
      setSkemaSertifikasiData(data.data.data);
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
      setTujuanAsesmenData(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useQuery({
    queryKey: ["persyaratan-dasar", idSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(`/skema-sertifikasi/${idSkemaSertifikasi}/persyaratan-dasar`);
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
      setPersyaratanDasar(null);
      resetFotoProfilPreview();
      toast({
        variant: "success",
        title: "Pendaftaran Berhasil",
        description: "Silahkan masuk dengan email yang telah didaftarkan",
      });
      form.reset();
      navigate("/masuk", {
        state: {
          email: email,
        },
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
      alamat_kantor,
      alamat_rumah,
      email_kantor,
      email,
      fax_kantor,
      id_jenis_kelamin,
      id_kebangsaan,
      id_kualifikasi_pendidikan,
      id_skema_sertifikasi,
      id_tujuan_asesmen,
      jabatan,
      nama_institusi_perusahaan,
      nama_lengkap,
      nik,
      nomor_telepon_kantor,
      nomor_telepon,
      password,
      persyaratan_dasar,
      portofolio,
      profil_user,
      tanggal_lahir,
      tempat_lahir,
    } = data;

    const processArrayEntries = (inputArray, propertyName, customPropertyName) => {
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

    try {
      const persyaratanDasarFile = processArrayEntries(
        persyaratan_dasar,
        "bukti",
        "persyaratan_dasar",
      );

      const portofolioFile = processArrayEntries(portofolio, "bukti", "portofolio");

      mutate({
        nama_lengkap,
        nik,
        tempat_lahir,
        tanggal_lahir,
        id_jenis_kelamin,
        id_kebangsaan,
        nomor_telepon,
        email,
        password,
        id_kualifikasi_pendidikan,
        alamat_rumah,
        nama_institusi_perusahaan,
        jabatan,
        nomor_telepon_kantor,
        email_kantor,
        fax_kantor,
        alamat_kantor,
        profil_user,
        id_skema_sertifikasi,
        id_tujuan_asesmen,
        persyaratan_dasar,
        ...persyaratanDasarFile,
        portofolio,
        ...portofolioFile,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDialogOpen(false);
    }
  };

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

  return (
    <div>
      <div>
        <Form {...form}>
          <div className="flex flex-col gap-4">
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
                    name="id_skema_sertifikasi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skema Sertifkasi</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              disabled={isLoading}
                              similar={
                                form.formState.errors?.id_skema_sertifikasi
                                  ? "input-error"
                                  : "input-primary"
                              }
                              role="combobox"
                              className="grid w-full grid-cols-12 justify-items-start">
                              <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                {field.value
                                  ? !!skemaSertifikasiData &&
                                    skemaSertifikasiData.find((data) => data.id === field.value)
                                      ?.nama_skema_sertifikasi
                                  : ""}
                              </p>
                              <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandGroup>
                                <ScrollArea className="h-48">
                                  {!!skemaSertifikasiData &&
                                    skemaSertifikasiData
                                      .filter((data) => data.is_tersedia === true)
                                      .map((data) => (
                                        <CommandItem
                                          className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                          key={data.id}
                                          value={data.id}
                                          onSelect={(value) => {
                                            form.setValue("id_skema_sertifikasi", value, {
                                              shouldValidate: true,
                                            });
                                            form.setValue("persyaratan_dasar", null);
                                            setIdSkemaSertifikasi(data.id);
                                          }}>
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              data.id === field.value ? "opacity-100" : "opacity-0",
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
                    name="id_tujuan_asesmen"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tujuan Asesmen</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              disabled={isLoading}
                              similar={
                                form.formState.errors?.id_tujuan_asesmen
                                  ? "input-error"
                                  : "input-primary"
                              }
                              role="combobox"
                              className="grid w-full grid-cols-12 justify-items-start">
                              <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                {field.value
                                  ? tujuanAsesmenData.find((data) => data.id === field.value)
                                      ?.tujuan
                                  : ""}
                              </p>
                              <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandGroup>
                                <ScrollArea className="h-48">
                                  {!!tujuanAsesmenData &&
                                    tujuanAsesmenData.map((data) => (
                                      <CommandItem
                                        className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                        key={data.id}
                                        value={data.id}
                                        onSelect={(value) => {
                                          form.setValue("id_tujuan_asesmen", value, {
                                            shouldValidate: true,
                                          });
                                        }}>
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            data.id === field.value ? "opacity-100" : "opacity-0",
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
                            variant={form.formState.errors?.nama_lengkap ? "error" : "primary"}
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
                            variant={form.formState.errors?.tempat_lahir ? "error" : "primary"}
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
                                <ScrollArea>
                                  {!!jenisKelaminData &&
                                    jenisKelaminData.map((data) => (
                                      <CommandItem
                                        className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                        key={data.id}
                                        value={data.id}
                                        onSelect={(value) => {
                                          form.setValue("id_jenis_kelamin", value.toUpperCase(), {
                                            shouldValidate: true,
                                          });
                                        }}>
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            data.id === field.value ? "opacity-100" : "opacity-0",
                                          )}
                                        />
                                        {data.jenis_kelamin}
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
                    name="id_kebangsaan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kebangsaan</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              disabled={isLoading}
                              similar={
                                form.formState.errors?.id_kebangsaan
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
                                          form.setValue("id_kebangsaan", value.toUpperCase(), {
                                            shouldValidate: true,
                                          });
                                        }}>
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            data.id === field.value ? "opacity-100" : "opacity-0",
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
                            variant={form.formState.errors?.nomor_telepon ? "error" : "primary"}
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
                                  form.formState.errors?.id_kualifikasi_pendidikan
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
                              <Command>
                                <CommandGroup>
                                  <ScrollArea className="h-48">
                                    {!!kualifikasiPendidikanData &&
                                      kualifikasiPendidikanData.map((data) => (
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
                                              data.id === field.value ? "opacity-100" : "opacity-0",
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
                  <div className="col-span-2 flex flex-col gap-2">
                    <p className="font-aileron text-base font-bold text-secondary-500">
                      Alamat Rumah
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="alamat_rumah.id_provinsi"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Provinsi</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  disabled={isLoading}
                                  similar={
                                    form.formState.errors?.alamat_rumah?.id_provinsi
                                      ? "input-error"
                                      : "input-primary"
                                  }
                                  role="combobox"
                                  className="grid w-full grid-cols-12 justify-items-start">
                                  <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                    {field.value
                                      ? provinsiAlamatRumahData.find(
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
                                      {!!provinsiAlamatRumahData &&
                                        provinsiAlamatRumahData.map((data) => (
                                          <CommandItem
                                            className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                            key={data.id}
                                            value={data.id}
                                            onSelect={(value) => {
                                              form.setValue("alamat_rumah.id_provinsi", value, {
                                                shouldValidate: true,
                                              });
                                              form.setValue("alamat_rumah.id_kota_kabupaten", null);
                                              form.setValue("alamat_rumah.id_kecamatan", null);
                                              form.setValue("alamat_rumah.id_kelurahan_desa", null);
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
                        name="alamat_rumah.id_kota_kabupaten"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kota / Kabupaten</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  disabled={!idProvinsiAlamatRumah || isLoading}
                                  similar={
                                    form.formState.errors?.alamat_rumah?.id_kota_kabupaten
                                      ? "input-error"
                                      : "input-primary"
                                  }
                                  role="combobox"
                                  className="grid w-full grid-cols-12 justify-items-start">
                                  <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                    {field.value
                                      ? kotaKabupatenAlamatRumahData.find(
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
                                      {!!kotaKabupatenAlamatRumahData &&
                                        kotaKabupatenAlamatRumahData.map((data) => (
                                          <CommandItem
                                            className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                            key={data.id}
                                            value={data.id}
                                            onSelect={(value) => {
                                              form.setValue(
                                                "alamat_rumah.id_kota_kabupaten",
                                                value,
                                                {
                                                  shouldValidate: true,
                                                },
                                              );
                                              form.setValue("alamat_rumah.id_kelurahan_desa", null);
                                              form.setValue("alamat_rumah.id_kecamatan", null);
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
                        name="alamat_rumah.id_kecamatan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kecamatan</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  disabled={!idKotaKabupatenAlamatRumah || isLoading}
                                  similar={
                                    form.formState.errors?.alamat_rumah?.id_kecamatan
                                      ? "input-error"
                                      : "input-primary"
                                  }
                                  role="combobox"
                                  className="grid w-full grid-cols-12 justify-items-start">
                                  <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                    {field.value
                                      ? kecamatanAlamatRumahData.find(
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
                                      {!!kecamatanAlamatRumahData &&
                                        kecamatanAlamatRumahData.map((data) => (
                                          <CommandItem
                                            className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                            key={data.id}
                                            value={data.id}
                                            onSelect={(value) => {
                                              form.setValue("alamat_rumah.id_kecamatan", value, {
                                                shouldValidate: true,
                                              });
                                              form.setValue("alamat_rumah.id_kelurahan_desa", null);
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
                        name="alamat_rumah.id_kelurahan_desa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kelurahan / Desa</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  disabled={!idKecamatanAlamatRumah || isLoading}
                                  similar={
                                    form.formState.errors?.alamat_rumah?.id_kelurahan_desa
                                      ? "input-error"
                                      : "input-primary"
                                  }
                                  role="combobox"
                                  className="grid w-full grid-cols-12 justify-items-start">
                                  <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                    {field.value
                                      ? kelurahanDesaAlamatRumahData.find(
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
                                      {!!kelurahanDesaAlamatRumahData &&
                                        kelurahanDesaAlamatRumahData.map((data) => (
                                          <CommandItem
                                            className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                            key={data.id}
                                            value={data.id}
                                            onSelect={(value) => {
                                              form.setValue(
                                                "alamat_rumah.id_kelurahan_desa",
                                                value,
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
                              form.formState.errors?.nama_institusi_perusahaan ? "error" : "primary"
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
                            variant={form.formState.errors?.jabatan ? "error" : "primary"}
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
                              form.formState.errors?.nomor_telepon_kantor ? "error" : "primary"
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
                            variant={form.formState.errors?.email_kantor ? "error" : "primary"}
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
                            variant={form.formState.errors?.fax_kantor ? "error" : "primary"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="col-span-2 flex flex-col gap-2">
                    <p className="font-aileron text-base font-bold text-secondary-500">
                      Alamat Kantor
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="alamat_kantor.id_provinsi"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Provinsi</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  disabled={isLoading}
                                  similar={
                                    form.formState.errors?.alamat_kantor?.id_provinsi
                                      ? "input-error"
                                      : "input-primary"
                                  }
                                  role="combobox"
                                  className="grid w-full grid-cols-12 justify-items-start">
                                  <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                    {field.value
                                      ? provinsiAlamatKantorData.find(
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
                                      {!!provinsiAlamatKantorData &&
                                        provinsiAlamatKantorData.map((data) => (
                                          <CommandItem
                                            className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                            key={data.id}
                                            value={data.id}
                                            onSelect={(value) => {
                                              form.setValue("alamat_kantor.id_provinsi", value, {
                                                shouldValidate: true,
                                              });
                                              form.setValue(
                                                "alamat_kantor.id_kota_kabupaten",
                                                null,
                                              );
                                              form.setValue("alamat_kantor.id_kecamatan", null);
                                              form.setValue(
                                                "alamat_kantor.id_kelurahan_desa",
                                                null,
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
                        name="alamat_kantor.id_kota_kabupaten"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kota / Kabupaten</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  disabled={!idProvinsiAlamatKantor || isLoading}
                                  similar={
                                    form.formState.errors?.alamat_kantor?.id_kota_kabupaten
                                      ? "input-error"
                                      : "input-primary"
                                  }
                                  role="combobox"
                                  className="grid w-full grid-cols-12 justify-items-start">
                                  <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                    {field.value
                                      ? kotaKabupatenAlamatKantorData.find(
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
                                      {!!kotaKabupatenAlamatKantorData &&
                                        kotaKabupatenAlamatKantorData.map((data) => (
                                          <CommandItem
                                            className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                            key={data.id}
                                            value={data.id}
                                            onSelect={(value) => {
                                              form.setValue(
                                                "alamat_kantor.id_kota_kabupaten",
                                                value,
                                                {
                                                  shouldValidate: true,
                                                },
                                              );
                                              form.setValue(
                                                "alamat_kantor.id_kelurahan_desa",
                                                null,
                                              );
                                              form.setValue("alamat_kantor.id_kecamatan", null);
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
                        name="alamat_kantor.id_kecamatan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kecamatan</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  disabled={!idKotaKabupatenAlamatKantor || isLoading}
                                  similar={
                                    form.formState.errors?.alamat_kantor?.id_kecamatan
                                      ? "input-error"
                                      : "input-primary"
                                  }
                                  role="combobox"
                                  className="grid w-full grid-cols-12 justify-items-start">
                                  <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                    {field.value
                                      ? kecamatanAlamatKantorData.find(
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
                                      {!!kecamatanAlamatKantorData &&
                                        kecamatanAlamatKantorData.map((data) => (
                                          <CommandItem
                                            className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                            key={data.id}
                                            value={data.id}
                                            onSelect={(value) => {
                                              form.setValue("alamat_kantor.id_kecamatan", value, {
                                                shouldValidate: true,
                                              });
                                              form.setValue(
                                                "alamat_kantor.id_kelurahan_desa",
                                                null,
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
                        name="alamat_kantor.id_kelurahan_desa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kelurahan / Desa</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  disabled={!idKecamatanAlamatKantor || isLoading}
                                  similar={
                                    form.formState.errors?.alamat_kantor?.id_kelurahan_desa
                                      ? "input-error"
                                      : "input-primary"
                                  }
                                  role="combobox"
                                  className="grid w-full grid-cols-12 justify-items-start">
                                  <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                    {field.value
                                      ? kelurahanDesaAlamatKantorData.find(
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
                                      {!!kelurahanDesaAlamatKantorData &&
                                        kelurahanDesaAlamatKantorData.map((data) => (
                                          <CommandItem
                                            className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                            key={data.id}
                                            value={data.id}
                                            onSelect={(value) => {
                                              form.setValue(
                                                "alamat_kantor.id_kelurahan_desa",
                                                value,
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
            {!!persyaratanDasar && (
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
                        {!!persyaratanDasar &&
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
                                            variant={
                                              form.formState.errors?.persyaratan_dasar?.[index]
                                                ?.bukti
                                                ? "error"
                                                : "primary"
                                            }
                                            disabled={isLoading}
                                            value={field.value?.fileName}
                                            size="xs"
                                            totalFile={
                                              form.watch(`persyaratan_dasar.${index}.bukti`)
                                                ?.length ?? 0
                                            }
                                            multiple
                                            onChange={(event) => {
                                              field.onChange(event.target.files);
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
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button disabled={isLoading} className="w-full gap-2">
                    {isLoading && <RefreshCw04 className="origin-center animate-spin" />}
                    Daftar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      <div className="flex flex-col items-center gap-2">
                        <AnnotationAlert className="text-5xl text-secondary-500" />
                        <p className="font-anek-latin text-xl">Pendaftaran Asesi</p>
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
        </Form>
      </div>
    </div>
  );
};

const PenggunaTerdaftar = ({ auth, isAsesi }) => {
  const location = useLocation();
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      id_skema_sertifikasi: location?.state?.id_skema_sertifikasi || "",
      id_tujuan_asesmen: "",
      portofolio: [
        {
          keterangan: "",
          bukti: [],
        },
      ],
    },
  });

  const [skemaSertifikasiData, setSkemaSertifikasiData] = useState();
  const [tujuanAsesmenData, setTujuanAsesmenData] = useState();
  const [persyaratanDasar, setPersyaratanDasar] = useState(null);
  const [idSkemaSertifikasi, setIdSkemaSertifikasi] = useState(
    location?.state?.id_skema_sertifikasi || null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [idAsesi, setIdAsesi] = useState();

  useQuery({
    queryKey: ["asesi", auth?.id],
    queryFn: async () => {
      return await axios.get(`/asesi/${auth?.id}`);
    },
    onSuccess: (data) => {
      setIdAsesi(data.data.data.asesi.id);
    },
    enabled: !!isAsesi,
  });

  useQuery({
    queryKey: ["skema-sertifikasi"],
    queryFn: async () => {
      return await axios.get(`/skema-sertifikasi`);
    },
    onSuccess: (data) => {
      setSkemaSertifikasiData(data.data.data);
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
      setTujuanAsesmenData(data.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useQuery({
    queryKey: ["persyaratan-dasar", idSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(`/skema-sertifikasi/${idSkemaSertifikasi}/persyaratan-dasar`);
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
      return await axios.post(`/asesi/register/skema-sertifikasi`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data) => {
      setPersyaratanDasar(null);
      toast({
        variant: "success",
        title: "Pendaftaran Skema Sertifikasi Berhasil",
        description: "Silahkan periksa Status Pendaftaran untuk info lebih lanjut",
      });
      form.reset();
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
    const { id_skema_sertifikasi, id_tujuan_asesmen, persyaratan_dasar, portofolio } = data;

    const processArrayEntries = (inputArray, propertyName, customPropertyName) => {
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

    try {
      const persyaratanDasarFile = processArrayEntries(
        persyaratan_dasar,
        "bukti",
        "persyaratan_dasar",
      );

      const portofolioFile = processArrayEntries(portofolio, "bukti", "portofolio");

      mutate({
        id_asesi: idAsesi,
        id_skema_sertifikasi,
        id_tujuan_asesmen,
        persyaratan_dasar,
        ...persyaratanDasarFile,
        portofolio,
        ...portofolioFile,
      });

      // console.log({
      //   id_asesi: idAsesi,
      //   id_skema_sertifikasi,
      //   id_tujuan_asesmen,
      //   persyaratan_dasar,
      //   ...persyaratanDasarFile,
      //   portofolio,
      //   ...portofolioFile,
      // });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  if (!!idAsesi) {
    return (
      <div>
        <div>
          <Form {...form}>
            <div className="flex flex-col gap-4">
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
                      name="id_skema_sertifikasi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skema Sertifkasi</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                disabled={isLoading}
                                similar={
                                  form.formState.errors?.id_skema_sertifikasi
                                    ? "input-error"
                                    : "input-primary"
                                }
                                role="combobox"
                                className="grid w-full grid-cols-12 justify-items-start">
                                <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                  {field.value
                                    ? !!skemaSertifikasiData &&
                                      skemaSertifikasiData.find((data) => data.id === field.value)
                                        ?.nama_skema_sertifikasi
                                    : ""}
                                </p>
                                <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandGroup>
                                  <ScrollArea className="h-48">
                                    {!!skemaSertifikasiData &&
                                      skemaSertifikasiData.map((data) => (
                                        <CommandItem
                                          className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                          key={data.id}
                                          value={data.id}
                                          onSelect={(value) => {
                                            form.setValue("id_skema_sertifikasi", value, {
                                              shouldValidate: true,
                                            });
                                            form.setValue("persyaratan_dasar", null);
                                            setIdSkemaSertifikasi(data.id);
                                          }}>
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              data.id === field.value ? "opacity-100" : "opacity-0",
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
                      name="id_tujuan_asesmen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tujuan Asesmen</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                disabled={isLoading}
                                similar={
                                  form.formState.errors?.id_tujuan_asesmen
                                    ? "input-error"
                                    : "input-primary"
                                }
                                role="combobox"
                                className="grid w-full grid-cols-12 justify-items-start">
                                <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                  {field.value
                                    ? tujuanAsesmenData.find((data) => data.id === field.value)
                                        ?.tujuan
                                    : ""}
                                </p>
                                <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandGroup>
                                  <ScrollArea className="h-48">
                                    {!!tujuanAsesmenData &&
                                      tujuanAsesmenData.map((data) => (
                                        <CommandItem
                                          className="min-w-max pr-6 first:rounded-t-lg last:rounded-b-lg"
                                          key={data.id}
                                          value={data.id}
                                          onSelect={(value) => {
                                            form.setValue("id_tujuan_asesmen", value, {
                                              shouldValidate: true,
                                            });
                                          }}>
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              data.id === field.value ? "opacity-100" : "opacity-0",
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
              {!!persyaratanDasar && (
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
                          {!!persyaratanDasar &&
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
                                              variant={
                                                form.formState.errors?.persyaratan_dasar?.[index]
                                                  ?.bukti
                                                  ? "error"
                                                  : "primary"
                                              }
                                              disabled={isLoading}
                                              value={field.value?.fileName}
                                              size="xs"
                                              totalFile={
                                                form.watch(`persyaratan_dasar.${index}.bukti`)
                                                  ?.length ?? 0
                                              }
                                              multiple
                                              onChange={(event) => {
                                                field.onChange(event.target.files);
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
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button disabled={isLoading} className="w-full gap-2">
                      {isLoading && <RefreshCw04 className="origin-center animate-spin" />}
                      Selesai
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        <div className="flex flex-col items-center gap-2">
                          <AnnotationAlert className="text-5xl text-secondary-500" />
                          <p className="font-anek-latin text-xl">Pendaftaran Asesi</p>
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
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={form.handleSubmit(onSubmit)}>
                            Konfirmasi
                          </Button>
                        </AlertDialogAction>
                      </div>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
};

const Portofolio = ({ form, isLoading }) => {
  const [imageFiles, setImageFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles(files);
  };

  const { fields, remove, append } = useFieldArray({
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
                  <Textarea
                    {...field}
                    disabled={isLoading}
                    variant={
                      form.formState.errors?.portofolio?.[index].keterangan ? "error" : "primary"
                    }
                  />
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
                    variant={
                      form.formState.errors?.portofolio?.[index]?.bukti ? "error" : "primary"
                    }
                    multiple
                    disabled={isLoading}
                    size="sm"
                    totalFile={form.watch(`portofolio.${index}.bukti`)?.length ?? 0}
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
          {fields.length > 1 && (
            <button
              type="button"
              className={cn(
                "absolute -right-6 -top-1 rounded-lg bg-error-50 p-1 text-xl text-error-500 transition-colors hover:bg-error-100",
                {
                  hidden: isLoading,
                },
              )}
              onClick={() => remove(index)}>
              <XCircle />
            </button>
          )}
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
          }>
          <PlusSquare className="text-2xl" />
        </Button>
      </div>
    </div>
  );
};
