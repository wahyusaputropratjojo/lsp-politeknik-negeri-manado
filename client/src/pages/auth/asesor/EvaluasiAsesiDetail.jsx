// Packages
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Components
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
import { Button, buttonVariants } from "../../../components/ui/button";
import { Switch } from "../../../components/ui/switch";
import { Dialog, DialogContent, DialogTrigger } from "../../../components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "../../../components/ui/form";

// Utils
import axios from "../../../utils/axios";
import { cn } from "../../../utils/cn";

// Assets
import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import InfoCircle from "../../../assets/icons/untitled-ui-icons/line/components/InfoCircle";
import CheckCircle from "../../../assets/icons/untitled-ui-icons/line/components/CheckCircle";
import { set } from "date-fns";

export const EvaluasiAsesiDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location?.state;
  const pathname = location?.pathname;
  const idAsesiSkemaSertifikasi = location?.state?.id_asesi_skema_sertifikasi;
  const isRefetchLocation = location?.state?.is_refetch;

  const [asesiData, setAsesiData] = useState(null);
  const [isDialogOpenOne, setIsDialogOpenOne] = useState(false);
  const [isDialogOpenTwo, setIsDialogOpenTwo] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);

  const formAsesmenMandiri = useForm({
    resolver: yupResolver(
      yup.object().shape({
        is_asesmen_mandiri: yup.boolean().required(),
      }),
    ),
  });

  const formToggleMetodePengujian = useForm({
    defaultValues: {
      is_praktik_demonstrasi: false,
      is_pertanyaan_tertulis: false,
      is_pertanyaan_lisan: false,
      is_portofolio: false,
    },
    resolver: yupResolver(
      yup
        .object()
        .shape({
          is_praktik_demonstrasi: yup.boolean(),
          is_pertanyaan_tertulis: yup.boolean(),
          is_pertanyaan_lisan: yup.boolean(),
          is_portofolio: yup.boolean(),
        })
        .test("at-least-one-checked", "Setidaknya 1 metode pengujian dipilih", (obj) => {
          const {
            is_praktik_demonstrasi,
            is_pertanyaan_tertulis,
            is_pertanyaan_lisan,
            is_portofolio,
          } = obj;
          return (
            is_praktik_demonstrasi || is_pertanyaan_tertulis || is_pertanyaan_lisan || is_portofolio
          );
        }),
    ),
  });

  const { refetch } = useQuery({
    queryKey: ["asesi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(`/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}`);
    },
    onSuccess: (data) => {
      setAsesiData(data.data.data);
    },
    refetchInterval: 5000,
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      return await axios.patch(
        `/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}`,
        data,
      );
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onSubmitFormAsesmenMandiri = (data) => {
    const { is_asesmen_mandiri } = data;

    try {
      mutate({ is_asesmen_mandiri });
      setIsRefetch(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDialogOpenOne(false);
    }
  };

  const onSubmitFormToggleMetodePengujian = (data) => {
    console.log(data);

    try {
      mutate({ ...data, is_metode_pengujian: true });
      setIsRefetch(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDialogOpenTwo(false);
    }
  };

  useEffect(() => {
    if (!!isRefetchLocation) {
      console.log("Berhasil Refetch");
      refetch();
      navigate(pathname, {
        state: {
          ...state,
          is_refetch: false,
        },
      });
    }
  }, []);

  useEffect(() => {
    refetch();
    return () => setIsRefetch(false);
  }, [isRefetch]);

  if (!!asesiData && !!idAsesiSkemaSertifikasi) {
    const {
      is_asesmen_mandiri_selesai: isAsesmenMandiriSelesai,
      is_asesmen_mandiri: isAsesmenMandiri,
      is_metode_pengujian: isMetodePengujian,
      is_observasi_aktivitas_tempat_kerja_selesai: isObservasiAktivitasTempatKerjaSelesai,
      is_pertanyaan_lisan_selesai: isPertanyaanLisanSelesai,
      is_pertanyaan_lisan: isPertanyaanLisan,
      is_pertanyaan_observasi_selesai: isPertanyaanObservasiSelesai,
      is_pertanyaan_tertulis_esai_selesai: isPertanyaanTertulisEsaiSelesai,
      is_pertanyaan_tertulis_pilihan_ganda_selesai: isPertanyaanTertulisPilihanGandaSelesai,
      is_pertanyaan_tertulis: isPertanyaanTertulis,
      is_portofolio: isPortofolio,
      is_praktik_demonstrasi_selesai: isPraktikDemonstrasiSelesai,
      is_praktik_demonstrasi: isPraktikDemonstrasi,
      is_punya_asesor: isPunyaAsesor,
      is_verifikasi_berkas: isVerifikasiBerkas,
      is_verifikasi_portofolio_selesai: isVerifikasiPortofolioSelesai,
      is_proyek_terkait_pekerjaan_selesai: isProyekTerkaitPekerjaanSelesai,
      is_evaluasi_pertanyaan_tertulis_esai_selesai: isEvaluasiPertanyaanTertulisEsaiSelesai,
      is_evaluasi_asesi_selesai: isEvaluasiAsesiSelesai,
      asesi: {
        data_diri: {
          nik,
          negara: { namaNegara },
          kualifikasi_pendidikan: { kualifikasi_pendidikan: kualifikasiPendidikan },
          jenis_kelamin: { jenis_kelamin: jenisKelamin },
          tempat_lahir: tempatLahir,
          nomor_telepon: nomorTelepon,
          tanggal_lahir,
          alamat: {
            provinsi: { nama: provinsiRumah },
            kota_kabupaten: { nama: kotaKabupatenRumah },
            kecamatan: { nama: kecamatanRumah },
            kelurahan_desa: { nama: kelurahanDesaRumah },
            keterangan_lainnya: keteranganLainnyaRumah,
          },
        },
        data_pekerjaan: {
          nama_institusi_perusahaan: namaInstitusiPerusahaan,
          jabatan,
          email: emailKantor,
          nomor_telepon: nomorTeleponKantor,
          fax: faxKantor,
          alamat: {
            provinsi: { nama: provinsiKantor },
            kota_kabupaten: { nama: kotaKabupatenKantor },
            kecamatan: { nama: kecamatanKantor },
            kelurahan_desa: { nama: kelurahanDesaKantor },
            keterangan_lainnya: keteranganLainnyaKantor,
          },
        },
        user: { nama_lengkap: namaLengkap, email, url_profil_user: urlProfilUser },
      },
      portofolio,
      skema_sertifikasi: {
        nama_skema_sertifikasi: namaSkemaSertifikasi,
        unit_kompetensi: unitKompetensi,
      },
      tujuan_asesmen: { tujuan },
    } = asesiData;

    const date = new Date(tanggal_lahir);
    const tanggalLahir = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <>
        <section>
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
                Evaluasi Asesi
              </h1>
              <p>Detail Pelaksanaan Asesmen untuk Asesi</p>
            </div>
            <div className="flex flex-col gap-12">
              <div>
                <div className="flex flex-col gap-4">
                  <div className="w-max rounded-lg bg-white p-6 shadow-lg">
                    <img
                      src={urlProfilUser}
                      alt="Foto Profil"
                      className="aspect-square w-56 rounded-lg bg-white object-cover"
                    />
                  </div>
                  <div className="flex w-full gap-6 rounded-lg bg-white p-12 shadow-lg">
                    <div className="flex w-9/12 flex-col">
                      <div className="flex flex-col gap-4">
                        <div>
                          <p className="text-xs font-bold leading-none">Nama Lengkap</p>
                          <p className="text-base">{namaLengkap}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-none">Skema Sertifikasi</p>
                          <p className="text-base">{namaSkemaSertifikasi}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-none">Tujuan Asesmen</p>
                          <p className="text-base">{tujuan}</p>
                        </div>
                      </div>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-b border-secondary-100">
                          <AccordionTrigger className="py-4">
                            <p className="text-lg font-bold">Data Diri</p>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-8 pb-6">
                              <div className="grid grid-cols-3 gap-6">
                                <div>
                                  <p className="text-xs font-bold leading-none">NIK</p>
                                  <p className="text-base">{nik}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-bold leading-none">Kebangsaan</p>
                                  <p className="text-base capitalize">{namaNegara}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-bold leading-none">
                                    Kualifikasi Pendidikan
                                  </p>
                                  <p className="text-base uppercase">{kualifikasiPendidikan}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-bold leading-none">Jenis Kelamin</p>
                                  <p className="text-base capitalize">{jenisKelamin}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-bold leading-none">
                                    Tempat, Tanggal Lahir
                                  </p>
                                  <div>
                                    <p className="text-base capitalize">
                                      {tempatLahir}, {tanggalLahir}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs font-bold leading-none">Nomor Telepon</p>
                                  <div>
                                    <p className="text-base capitalize">{nomorTelepon}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs font-bold leading-none">Email</p>
                                  <div>
                                    <p className="text-base">{email}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-4">
                                <p className="text-base font-bold">Alamat Rumah</p>
                                <div className="grid grid-cols-3 gap-6">
                                  <div>
                                    <p className="text-xs font-bold leading-none">Provinsi</p>
                                    <p className="text-base capitalize">{provinsiRumah}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold leading-none">
                                      Kota / Kabupaten
                                    </p>
                                    <p className="text-base capitalize">{kotaKabupatenRumah}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold leading-none">Kecamatan</p>
                                    <p className="text-base capitalize">{kecamatanRumah}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold leading-none">
                                      Kelurahan / Desa
                                    </p>
                                    <p className="text-base capitalize">{kelurahanDesaRumah}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold leading-none">
                                      Keterangan Lainnya
                                    </p>
                                    <p className="text-base capitalize">{keteranganLainnyaRumah}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-b border-secondary-100">
                          <AccordionTrigger className="py-4">
                            <p className="text-lg font-bold">Data Pekerjaan</p>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-8 pb-6">
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <p className="text-xs font-bold leading-none">
                                    Nama Institusi / Perusahaan
                                  </p>
                                  <p className="text-base">{namaInstitusiPerusahaan}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-bold leading-none">Jabatan</p>
                                  <p className="text-base">{jabatan}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-bold leading-none">Email Kantor</p>
                                  <p className="text-base">{emailKantor}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-bold leading-none">
                                    Nomor Telepon Kantor
                                  </p>
                                  <p className="text-base">{nomorTeleponKantor}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-bold leading-none">Fax</p>
                                  <p className="text-base">{faxKantor}</p>
                                </div>
                              </div>
                              <div className="flex flex-col gap-4">
                                <p className="text-base font-bold">Alamat Kantor</p>
                                <div className="grid grid-cols-3 gap-6">
                                  <div>
                                    <p className="text-xs font-bold leading-none">Provinsi</p>
                                    <p className="text-base capitalize">{provinsiKantor}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold leading-none">
                                      Kota / Kabupaten
                                    </p>
                                    <p className="text-base capitalize">{kotaKabupatenKantor}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold leading-none">Kecamatan</p>
                                    <p className="text-base capitalize">{kecamatanKantor}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold leading-none">
                                      Kelurahan / Desa
                                    </p>
                                    <p className="text-base capitalize">{kelurahanDesaKantor}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold leading-none">
                                      Keterangan Lainnya
                                    </p>
                                    <p className="text-base capitalize">
                                      {keteranganLainnyaKantor}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-b border-secondary-100">
                          <AccordionTrigger className="py-4">
                            <p className="text-lg font-bold">Portofolio</p>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-1 gap-4 pb-6">
                              {portofolio &&
                                portofolio.map((value) => {
                                  const { file_portofolio: filePortofolio, keterangan } = value;

                                  return (
                                    <div key={value.id} className="flex flex-col gap-2">
                                      <div className="flex flex-col gap-2">
                                        <div>
                                          <p>{keterangan}</p>
                                        </div>
                                        <div div className="flex gap-4">
                                          {filePortofolio &&
                                            filePortofolio.map((value) => {
                                              return (
                                                <div key={value.id}>
                                                  <Dialog>
                                                    <DialogTrigger>
                                                      <img
                                                        src={value.url_file_portofolio}
                                                        alt=""
                                                        className="aspect-[3/4] w-20 rounded-lg border-2 border-secondary-300 object-cover"
                                                      />
                                                    </DialogTrigger>
                                                    <DialogContent className="max-h-[70vh]">
                                                      <div className="max-h-full max-w-full">
                                                        <img
                                                          src={value.url_file_portofolio}
                                                          alt={`Gambar Portofolio ${keterangan}`}
                                                          className="max-h-[100%] max-w-[100%] rounded-lg object-contain"
                                                        />
                                                      </div>
                                                    </DialogContent>
                                                  </Dialog>
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    <div className="mt-16 flex w-3/12 flex-col gap-8 rounded-lg bg-secondary-500 p-6 text-white">
                      <div className="flex flex-col justify-between gap-4">
                        <div>
                          <Form {...formAsesmenMandiri}>
                            <form>
                              <div className="flex w-full flex-col gap-2">
                                <div className="flex w-full justify-between">
                                  <p className="">Asesmen Mandiri</p>
                                  <FormField
                                    control={formAsesmenMandiri.control}
                                    name="is_asesmen_mandiri"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Switch
                                            disabled={isAsesmenMandiri}
                                            checked={field.value || isAsesmenMandiri}
                                            onCheckedChange={field.onChange}
                                            className="data-[state=unchecked]:bg-secondary-100"
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                {!isAsesmenMandiri && (
                                  <AlertDialog
                                    open={isDialogOpenOne}
                                    onOpenChange={setIsDialogOpenOne}>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        disabled={!formAsesmenMandiri.watch("is_asesmen_mandiri")}
                                        size="xs"
                                        className="w-full"
                                        type="button">
                                        Simpan Perubahan
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          <div className="flex flex-col items-center gap-2">
                                            <AnnotationAlert className="text-5xl text-secondary-500" />
                                            <p className="font-anek-latin text-xl">
                                              Asesmen Mandiri
                                            </p>
                                          </div>
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="py-4 text-sm">
                                          Harap diingat bahwa setelah tindakan ini dilakukan, tidak
                                          akan ada kesempatan untuk mengulanginya. Apakah Anda
                                          yakin?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <div className="flex w-full gap-4">
                                          <AlertDialogCancel asChild>
                                            <Button
                                              size="sm"
                                              variant="outline-error"
                                              className="w-full">
                                              Batalkan
                                            </Button>
                                          </AlertDialogCancel>
                                          <AlertDialogAction asChild>
                                            <Button
                                              size="sm"
                                              className="w-full"
                                              onClick={formAsesmenMandiri.handleSubmit(
                                                onSubmitFormAsesmenMandiri,
                                              )}>
                                              Konfirmasi
                                            </Button>
                                          </AlertDialogAction>
                                        </div>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                )}
                              </div>
                            </form>
                          </Form>
                        </div>
                      </div>
                      {/* {isAsesmenMandiri && (
                        <div className="flex flex-col gap-2">
                          <p className="font-bold">Metode Pengujian</p>
                          <div className="flex flex-col gap-2">
                            <Form {...formToggleMetodePengujian}>
                              <form>
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center justify-between">
                                    <p>Demonstrasi</p>
                                    <FormField
                                      control={formToggleMetodePengujian.control}
                                      name="is_praktik_demonstrasi"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Switch
                                              disabled={isMetodePengujian}
                                              checked={field.value || isPraktikDemonstrasi}
                                              onCheckedChange={field.onChange}
                                              className="data-[state=unchecked]:bg-secondary-100"
                                            />
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <p>Pertanyaan Tertulis</p>
                                    <FormField
                                      control={formToggleMetodePengujian.control}
                                      name="is_pertanyaan_tertulis"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Switch
                                              disabled={isMetodePengujian}
                                              checked={field.value || isPertanyaanTertulis}
                                              onCheckedChange={field.onChange}
                                              className="data-[state=unchecked]:bg-secondary-100"
                                            />
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <p>Pertanyaan Lisan</p>
                                    <FormField
                                      control={formToggleMetodePengujian.control}
                                      name="is_pertanyaan_lisan"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Switch
                                              disabled={isMetodePengujian}
                                              checked={field.value || isPertanyaanLisan}
                                              onCheckedChange={field.onChange}
                                              className="data-[state=unchecked]:bg-secondary-100"
                                            />
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <p>Portofolio</p>
                                    <FormField
                                      control={formToggleMetodePengujian.control}
                                      name="is_portofolio"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Switch
                                              disabled={isMetodePengujian}
                                              checked={field.value || isPortofolio}
                                              onCheckedChange={field.onChange}
                                              className="data-[state=unchecked]:bg-secondary-100"
                                            />
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                  {!isMetodePengujian && (
                                    <AlertDialog
                                      open={isDialogOpenTwo}
                                      onOpenChange={setIsDialogOpenTwo}>
                                      <AlertDialogTrigger asChild>
                                        <Button size="xs" className="w-full" type="button">
                                          Simpan Perubahan
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            <div className="flex flex-col items-center gap-2">
                                              <AnnotationAlert className="text-5xl text-secondary-500" />
                                              <p className="font-anek-latin text-xl">
                                                Metode Pengujian
                                              </p>
                                            </div>
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            <p className="py-4 text-sm">
                                              Harap diingat bahwa setelah tindakan ini dilakukan,
                                              tidak akan ada kesempatan untuk mengulanginya. Apakah
                                              Anda yakin?
                                            </p>
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <div className="flex w-full gap-4">
                                            <AlertDialogCancel asChild>
                                              <Button
                                                size="sm"
                                                variant="outline-error"
                                                className="w-full">
                                                Batalkan
                                              </Button>
                                            </AlertDialogCancel>
                                            <AlertDialogAction asChild>
                                              <Button
                                                size="sm"
                                                className="w-full"
                                                onClick={formToggleMetodePengujian.handleSubmit(
                                                  onSubmitFormToggleMetodePengujian,
                                                )}>
                                                Konfirmasi
                                              </Button>
                                            </AlertDialogAction>
                                          </div>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  )}
                                </div>
                              </form>
                            </Form>
                          </div>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {!!isAsesmenMandiriSelesai && (
                  <>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isObservasiAktivitasTempatKerjaSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isObservasiAktivitasTempatKerjaSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.01</p>
                          <p className="text-base">
                            Observasi Aktivitas di Tempat Kerja atau Tempat Kerja Simulasi
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isObservasiAktivitasTempatKerjaSelesai && (
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`FR-IA-01`, {
                                state: {
                                  ...state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Formulir
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isPraktikDemonstrasiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isPraktikDemonstrasiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.02</p>
                          <p className="text-base">Tugas Praktik Demonstrasi</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isPraktikDemonstrasiSelesai && (
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`FR-IA-02`, {
                                state: {
                                  ...state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Formulir
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isPertanyaanObservasiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isPertanyaanObservasiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.03</p>
                          <p className="text-base">Pertanyaan Untuk Mendukung Observasi</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isPertanyaanObservasiSelesai && (
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`FR-IA-03`, {
                                state: {
                                  ...state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Formulir
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isProyekTerkaitPekerjaanSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isProyekTerkaitPekerjaanSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.04</p>
                          <p className="text-base">
                            Penjelasan Singkat Proyek Terkait Pekerjaan / Kegiatan Terstruktur
                            Lainnya
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isProyekTerkaitPekerjaanSelesai && (
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`FR-IA-04`, {
                                state: {
                                  ...state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Formulir
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isPertanyaanTertulisPilihanGandaSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isPertanyaanTertulisPilihanGandaSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.05</p>
                          <p className="text-base">Pertanyaan Tertulis Pilihan Ganda</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button
                          size="xs"
                          onClick={() => {
                            navigate(`FR-IA-05`, {
                              state: {
                                ...state,
                                id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                              },
                            });
                          }}>
                          Lihat Formulir
                        </Button>
                      </div>
                    </div>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isEvaluasiPertanyaanTertulisEsaiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isEvaluasiPertanyaanTertulisEsaiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.06</p>
                          <p className="text-base">Pertanyaan Tertulis Esai</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isEvaluasiPertanyaanTertulisEsaiSelesai &&
                          !!isPertanyaanTertulisEsaiSelesai && (
                            <Button
                              size="xs"
                              onClick={() => {
                                navigate(`FR-IA-06`, {
                                  state: {
                                    ...state,
                                    id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                  },
                                });
                              }}>
                              Lihat Formulir
                            </Button>
                          )}
                      </div>
                    </div>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isPertanyaanLisanSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isPertanyaanLisanSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.07</p>
                          <p className="text-base">Pertanyaan Lisan</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isPertanyaanLisanSelesai && (
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`FR-IA-07`, {
                                state: {
                                  ...state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Formulir
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isVerifikasiPortofolioSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isVerifikasiPortofolioSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.08</p>
                          <p className="text-base">Verifikasi Portofolio</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isVerifikasiPortofolioSelesai && (
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`FR-IA-08`, {
                                state: {
                                  ...state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Formulir
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {/* {!!isPraktikDemonstrasi && (
                  <>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isObservasiAktivitasTempatKerjaSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isObservasiAktivitasTempatKerjaSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.01</p>
                          <p className="text-base">
                            Observasi Aktivitas di Tempat Kerja atau Tempat Kerja Simulasi
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isObservasiAktivitasTempatKerjaSelesai && (
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`FR-IA-01`, {
                                state: {
                                  ...state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Formulir
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isPraktikDemonstrasiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isPraktikDemonstrasiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.02</p>
                          <p className="text-base">Tugas Praktik Demonstrasi</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isPraktikDemonstrasiSelesai && (
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`FR-IA-02`, {
                                state: {
                                  ...state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Formulir
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isPertanyaanObservasiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isPertanyaanObservasiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.03</p>
                          <p className="text-base">Pertanyaan Untuk Mendukung Observasi</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isPertanyaanObservasiSelesai && (
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`FR-IA-03`, {
                                state: {
                                  ...state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Formulir
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isProyekTerkaitPekerjaanSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isProyekTerkaitPekerjaanSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.04</p>
                          <p className="text-base">
                            Penjelasan Singkat Proyek Terkait Pekerjaan / Kegiatan Terstruktur
                            Lainnya
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isProyekTerkaitPekerjaanSelesai && (
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`FR-IA-04`, {
                                state: {
                                  ...state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Formulir
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )} */}
                {/* {!!isPertanyaanTertulis && (
                  <>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isPertanyaanTertulisPilihanGandaSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isPertanyaanTertulisPilihanGandaSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.05</p>
                          <p className="text-base">Pertanyaan Tertulis Pilihan Ganda</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button
                          size="xs"
                          onClick={() => {
                            navigate(`FR-IA-05`, {
                              state: {
                                ...state,
                                id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                              },
                            });
                          }}>
                          Lihat Formulir
                        </Button>
                      </div>
                    </div>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isEvaluasiPertanyaanTertulisEsaiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isEvaluasiPertanyaanTertulisEsaiSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.06</p>
                          <p className="text-base">Pertanyaan Tertulis Esai</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isEvaluasiPertanyaanTertulisEsaiSelesai &&
                          !!isPertanyaanTertulisEsaiSelesai && (
                            <Button
                              size="xs"
                              onClick={() => {
                                navigate(`FR-IA-06`, {
                                  state: {
                                    ...state,
                                    id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                  },
                                });
                              }}>
                              Lihat Formulir
                            </Button>
                          )}
                      </div>
                    </div>
                  </>
                )} */}
                {/* {!!isPertanyaanLisan && (
                  <>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isPertanyaanLisanSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isPertanyaanLisanSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.07</p>
                          <p className="text-base">Pertanyaan Lisan</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isPertanyaanLisanSelesai && (
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`FR-IA-07`, {
                                state: {
                                  ...state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Formulir
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )} */}
                {/* {!!isPortofolio && (
                  <>
                    <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex items-center gap-6">
                        {!isVerifikasiPortofolioSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-warning-500 text-white">
                            <InfoCircle className="text-2xl" />
                          </div>
                        )}
                        {!!isVerifikasiPortofolioSelesai && (
                          <div className="flex h-20 w-12 items-center justify-center rounded-lg bg-success-500 text-white">
                            <CheckCircle className="text-2xl" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.08</p>
                          <p className="text-base">Verifikasi Portofolio</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {!isVerifikasiPortofolioSelesai && (
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`FR-IA-08`, {
                                state: {
                                  ...state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Formulir
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )} */}
              </div>
              {!!isObservasiAktivitasTempatKerjaSelesai &&
                !!isPraktikDemonstrasiSelesai &&
                !!isPertanyaanObservasiSelesai &&
                !!isProyekTerkaitPekerjaanSelesai &&
                !!isPertanyaanTertulisPilihanGandaSelesai &&
                !!isPertanyaanTertulisEsaiSelesai &&
                !!isPertanyaanLisanSelesai &&
                !!isVerifikasiPortofolioSelesai && (
                  <div className="rounded-lg bg-white p-8 shadow-lg">
                    <AlertDialog open={isDialogOpenOne} onOpenChange={setIsDialogOpenOne}>
                      <AlertDialogTrigger className={cn(buttonVariants(), "w-full")}>
                        Selesai
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            <div className="flex flex-col items-center gap-2">
                              <AnnotationAlert className="text-5xl text-secondary-500" />
                              <p className="font-anek-latin text-xl">Evaluasi Asesi</p>
                            </div>
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            <p className="py-4 text-sm">
                              Harap diingat bahwa setelah tindakan ini dilakukan, tidak akan ada
                              kesempatan untuk mengulanginya. Apakah Anda yakin?
                            </p>
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
                                onClick={() => {
                                  mutate({ is_evaluasi_asesi_selesai: true });
                                  navigate("/evaluasi-asesi", { state: { is_refetch: true } });
                                }}>
                                Konfirmasi
                              </Button>
                            </AlertDialogAction>
                          </div>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
            </div>
          </div>
        </section>
      </>
    );
  } else if (!idAsesiSkemaSertifikasi) {
    return <Navigate to="/evaluasi-asesi" />;
  }
};
