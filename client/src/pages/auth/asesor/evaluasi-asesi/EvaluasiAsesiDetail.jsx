import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { Button } from "../../../../components/ui/button";
import { Switch } from "../../../../components/ui/switch";
import { Checkbox } from "../../../../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
} from "../../../../components/ui/table";
import { Textarea } from "../../../../components/ui/textarea";

import axios from "../../../../utils/axios";
import { cn } from "../../../../utils/cn";
import { is } from "date-fns/locale";

export const EvaluasiAsesiDetail = () => {
  const { id } = useParams();

  const [isAsesmenMandiri, setIsAsesmenMandiri] = useState(false);
  const [isMetodePengujian, setIsMetodePengujian] = useState(false);
  const [isDemonstrasi, setIsDemonstrasi] = useState(false);
  const [isPertanyaanTertulis, setIsPertanyaanTertulis] = useState(false);
  const [isPertanyaanLisan, setIsPertanyaanLisan] = useState(false);
  const [isPortofolio, setIsPortofolio] = useState(false);
  const [asesiData, setAsesiData] = useState(null);

  const formAsesmenMandiri = useForm({
    resolver: yupResolver(
      yup.object().shape({
        is_asesmen_mandiri: yup.boolean().required(),
      }),
    ),
  });

  const formToggleMetodePengujian = useForm({
    defaultValues: {
      is_demonstrasi: false,
      is_pertanyaan_tertulis: false,
      is_pertanyaan_lisan: false,
      is_portofolio: false,
    },
    resolver: yupResolver(
      yup
        .object()
        .shape({
          is_demonstrasi: yup.boolean(),
          is_pertanyaan_tertulis: yup.boolean(),
          is_pertanyaan_lisan: yup.boolean(),
          is_portofolio: yup.boolean(),
        })
        .test(
          "at-least-one-checked",
          "Setidaknya 1 metode pengujian dipilih",
          (obj) => {
            const {
              is_demonstrasi,
              is_pertanyaan_tertulis,
              is_pertanyaan_lisan,
              is_portofolio,
            } = obj;
            return (
              is_demonstrasi ||
              is_pertanyaan_tertulis ||
              is_pertanyaan_lisan ||
              is_portofolio
            );
          },
        ),
    ),
  });

  const { isLoading, isSuccess, isError } = useQuery({
    queryKey: ["asesi", id],
    queryFn: async () => {
      return await axios.get(`/asesor/tempat-uji-kompetensi/asesi/${id}`);
    },
    onSuccess: (data) => {
      setAsesiData(data.data.data);

      const {
        is_asesmen_mandiri,
        is_demonstrasi,
        is_metode_pengujian,
        is_pertanyaan_lisan,
        is_pertanyaan_tertulis,
        is_portofolio,
      } = data.data.data;

      setIsAsesmenMandiri(is_asesmen_mandiri);
      setIsDemonstrasi(is_demonstrasi);
      setIsMetodePengujian(is_metode_pengujian);
      setIsPertanyaanLisan(is_pertanyaan_lisan);
      setIsPertanyaanTertulis(is_pertanyaan_tertulis);
      setIsPortofolio(is_portofolio);
    },
    refetchInterval: 1000,
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      return await axios.patch(
        `/asesor/tempat-uji-kompetensi/asesi/${id}`,
        data,
      );
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onSubmitFormAsesmenMandiri = (data) => {
    const { is_asesmen_mandiri } = data;

    mutate({ is_asesmen_mandiri });
  };

  const onSubmitFormToggleMetodePengujian = (data) => {
    console.log(data);
    mutate({ ...data, is_metode_pengujian: true });
  };

  if (isSuccess && asesiData) {
    const { asesi, portofolio, skema_sertifikasi, tujuan_asesmen } = asesiData;

    const date = new Date(asesi.data_diri.tanggal_lahir);
    const tanggalLahir = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <>
        <div className="flex flex-col gap-12">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Evaluasi Asesi
            </h1>
            <p>Detail Pelaksanaan Asesmen untuk Asesi</p>
          </div>
          <div>
            <div className="relative w-full rounded-lg">
              <div className="relative top-16 z-10 -mt-16 ml-6 w-max rounded-lg bg-white px-6 pt-6">
                <img
                  src={asesi.data_diri.foto_profil}
                  alt="Foto Profil"
                  className="aspect-square w-36 rounded-lg object-cover"
                />
              </div>
              <div className="bottom-16 flex w-full gap-6 rounded-lg bg-white p-12 pt-6">
                <div className="mt-16 flex w-9/12 flex-col">
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-xs font-bold leading-none">
                        Nama Lengkap
                      </p>
                      <p className="text-base">{asesi.user.nama_lengkap}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-none">
                        Skema Sertifikasi
                      </p>
                      <p className="text-base">
                        {skema_sertifikasi.nama_skema_sertifikasi}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-none">
                        Tujuan Asesmen
                      </p>
                      <p className="text-base">{tujuan_asesmen.tujuan}</p>
                    </div>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem
                      value="item-1"
                      className="border-b border-secondary-100"
                    >
                      <AccordionTrigger className="py-4">
                        <p className="text-lg font-bold">Data Diri</p>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-8 pb-6">
                          <div className="grid grid-cols-3 gap-6">
                            <div>
                              <p className="text-xs font-bold leading-none">
                                NIK
                              </p>
                              <p className="text-base">{asesi.data_diri.nik}</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-none">
                                Kebangsaan
                              </p>
                              <p className="text-base capitalize">
                                {asesi.data_diri.kebangsaan}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-none">
                                Kualifikasi Pendidikan
                              </p>
                              <p className="text-base uppercase">
                                {asesi.data_diri.kualifikasi_pendidikan}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-none">
                                Jenis Kelamin
                              </p>
                              <p className="text-base capitalize">
                                {asesi.data_diri.jenis_kelamin}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-none">
                                Tempat, Tanggal Lahir
                              </p>
                              <div>
                                <p className="text-base capitalize">
                                  {asesi.data_diri.tempat_lahir}, {tanggalLahir}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-4">
                            <p className="text-base font-bold">Alamat Rumah</p>
                            <div className="grid grid-cols-3 gap-6">
                              <div>
                                <p className="text-xs font-bold leading-none">
                                  Provinsi
                                </p>
                                <p className="text-base capitalize">
                                  {asesi.data_diri.alamat.provinsi}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-bold leading-none">
                                  Kota / Kabupaten
                                </p>
                                <p className="text-base capitalize">
                                  {asesi.data_diri.alamat.kota_kabupaten}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-bold leading-none">
                                  Kecamatan
                                </p>
                                <p className="text-base capitalize">
                                  {asesi.data_diri.alamat.kecamatan}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-bold leading-none">
                                  Kelurahan / Desa
                                </p>
                                <p className="text-base capitalize">
                                  {asesi.data_diri.alamat.kelurahan_desa}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-bold leading-none">
                                  Keterangan Lainnya
                                </p>
                                <p className="text-base capitalize">
                                  {asesi.data_diri.alamat.keterangan_lainnya}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem
                      value="item-2"
                      className="border-b border-secondary-100"
                    >
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
                              <p className="text-base">
                                {asesi.data_pekerjaan.nama_institusi_perusahaan}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-none">
                                Jabatan
                              </p>
                              <p className="text-base">
                                {asesi.data_pekerjaan.jabatan}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-none">
                                Email Kantor
                              </p>
                              <p className="text-base">
                                {asesi.data_pekerjaan.email}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-none">
                                Nomor Telepon Kantor
                              </p>
                              <p className="text-base">
                                {asesi.data_pekerjaan.nomor_telepon}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-none">
                                Fax
                              </p>
                              <p className="text-base">
                                {asesi.data_pekerjaan.fax}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-4">
                            <p className="text-base font-bold">Alamat Kantor</p>
                            <div className="grid grid-cols-3 gap-6">
                              <div>
                                <p className="text-xs font-bold leading-none">
                                  Provinsi
                                </p>
                                <p className="text-base capitalize">
                                  {asesi.data_pekerjaan.alamat.provinsi}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-bold leading-none">
                                  Kota / Kabupaten
                                </p>
                                <p className="text-base capitalize">
                                  {asesi.data_pekerjaan.alamat.kota_kabupaten}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-bold leading-none">
                                  Kecamatan
                                </p>
                                <p className="text-base capitalize">
                                  {asesi.data_pekerjaan.alamat.kecamatan}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-bold leading-none">
                                  Kelurahan / Desa
                                </p>
                                <p className="text-base capitalize">
                                  {asesi.data_pekerjaan.alamat.kelurahan_desa}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-bold leading-none">
                                  Keterangan Lainnya
                                </p>
                                <p className="text-base capitalize">
                                  {
                                    asesi.data_pekerjaan.alamat
                                      .keterangan_lainnya
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem
                      value="item-3"
                      className="border-b border-secondary-100"
                    >
                      <AccordionTrigger className="py-4">
                        <p className="text-lg font-bold">Portofolio</p>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-3 gap-4 pb-6">
                          {portofolio &&
                            portofolio.map((value) => {
                              const {
                                file_portofolio: filePortofolio,
                                keterangan,
                              } = value;

                              return (
                                <div
                                  key={value.id}
                                  className="flex flex-col gap-2"
                                >
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
                                                    src={value.file}
                                                    alt=""
                                                    className="aspect-[3/4] w-20 rounded-lg object-cover"
                                                  />
                                                </DialogTrigger>
                                                <DialogContent className="max-h-[70vh]">
                                                  <div className="max-h-full max-w-full">
                                                    <img
                                                      src={value.file}
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
                                        checked={
                                          field.value || isAsesmenMandiri
                                        }
                                        onCheckedChange={field.onChange}
                                        className="data-[state=unchecked]:bg-secondary-100"
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                            {!isAsesmenMandiri && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    disabled={
                                      !formAsesmenMandiri.watch(
                                        "is_asesmen_mandiri",
                                      )
                                    }
                                    size="xs"
                                    className="w-full"
                                    type="button"
                                  >
                                    Simpan Perubahan
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Asesmen Mandiri</DialogTitle>
                                    <DialogDescription>
                                      Asesmen Mandiri akan diaktifkan pada Asesi
                                      terkait, tindakan ini tidak dapat
                                      dibatalkan. Apakah Anda yakin?
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <Button
                                      size="sm"
                                      onClick={formAsesmenMandiri.handleSubmit(
                                        onSubmitFormAsesmenMandiri,
                                      )}
                                    >
                                      Konfirmasi
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                        </form>
                      </Form>
                    </div>
                  </div>
                  {isAsesmenMandiri && (
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
                                  name="is_demonstrasi"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Switch
                                          disabled={isMetodePengujian}
                                          checked={field.value || isDemonstrasi}
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
                                          checked={
                                            field.value || isPertanyaanTertulis
                                          }
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
                                          checked={
                                            field.value || isPertanyaanLisan
                                          }
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
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="xs"
                                      className="w-full"
                                      type="button"
                                    >
                                      Simpan Perubahan
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Metode Pengujian
                                      </DialogTitle>
                                      <DialogDescription>
                                        Metode Pengujian yang dipilih akan di
                                        aktifkan pada Asesi Terkait, tindakan
                                        ini tidak dapat dibatalkan. Apakah Anda
                                        yakin?
                                      </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                      <Button
                                        size="sm"
                                        onClick={formToggleMetodePengujian.handleSubmit(
                                          onSubmitFormToggleMetodePengujian,
                                        )}
                                      >
                                        Konfirmasi
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>
                          </form>
                        </Form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isDemonstrasi && (
            <div className="flex flex-col gap-4 rounded-lg bg-white p-12">
              <p className="font-anek-latin text-3xl font-bold uppercase">
                Demonstrasi
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem className="border-b" value="item-1">
                  <AccordionTrigger className="py-4">
                    <div className="flex flex-col items-start">
                      <p className="font-bold">FR.IA.01</p>
                      <p className="text-lg">
                        Observasi Aktivitas di Tempat Kerja atau Tempat Kerja
                        Simulasi
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="py-4">
                      <div className="flex flex-col gap-2 p-2">
                        <div>
                          <p className="text-xs font-bold leading-none">
                            Kode Unit
                          </p>
                          <p className="text-base">KTL.IK02.103.01</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-none">
                            Judul Unit
                          </p>
                          <p className="text-base">
                            Merakit dan Memasang PHB Penerangan Bangunan
                            Industri Kecil
                          </p>
                        </div>
                      </div>
                      <div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/12 text-base">
                                No
                              </TableHead>
                              <TableHead className="w-3/12 text-base">
                                Elemen
                              </TableHead>
                              <TableHead className="w-7/12 text-base">
                                Kriteria Unjuk Kerja
                              </TableHead>
                              <TableHead>
                                <div className="flex flex-col items-center text-base">
                                  <p className="text-base">K</p>
                                  <Checkbox />
                                </div>
                              </TableHead>
                              <TableHead>
                                <div className="flex flex-col items-center text-base">
                                  <p className="text-base">BK</p>
                                  <Checkbox />
                                </div>
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>1</TableCell>
                              <TableCell className="hypens-auto" lang="id">
                                <p className="text-base">
                                  Lorem ipsum dolor, sit amet consectetur
                                  adipisicing elit. Quod, unde.
                                </p>
                              </TableCell>
                              <TableCell
                                className="hyphens-auto text-justify"
                                lang="id"
                              >
                                <p className="text-base">
                                  Lorem ipsum, dolor sit amet consectetur
                                  adipisicing elit. Libero, doloremque
                                  voluptatem impedit, provident explicabo
                                  suscipit nemo id numquam minus illum
                                  reprehenderit quisquam repudiandae quaerat quo
                                  adipisci qui iusto, nostrum earum tempore
                                  laboriosam a sit neque dolores? Accusantium
                                  numquam eum veritatis tempore. Inventore unde
                                  impedit vel labore repellendus quasi explicabo
                                  nesciunt, cumque deserunt voluptatibus sint
                                  similique provident libero. Sit quam obcaecati
                                  est quidem dolores ipsum, consequatur pariatur
                                  quisquam, autem, beatae eum? Sit eveniet
                                  commodi maiores illo, similique, adipisci
                                  officia sed suscipit voluptas nobis, rem
                                  optio! Culpa accusamus inventore cumque libero
                                  reiciendis sequi recusandae quis at, quia quam
                                  molestiae adipisci obcaecati dolores.
                                </p>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col items-center">
                                  <Checkbox />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col items-center">
                                  <Checkbox />
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem className="border-b" value="item-2">
                  <AccordionTrigger className="py-4">
                    <div className="flex flex-col items-start">
                      <p className="font-bold">FR.IA.02</p>
                      <p className="text-lg">Tugas Praktik Demonstrasi</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>Test</AccordionContent>
                </AccordionItem>
                <AccordionItem className="border-b" value="item-3">
                  <AccordionTrigger className="py-4">
                    <div className="flex flex-col items-start">
                      <p className="font-bold">FR.IA.03</p>
                      <p className="text-lg">
                        Pertanyaan Untuk Mendukung Observasi
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="py-4">
                      <div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/12 text-base">
                                No.
                              </TableHead>
                              <TableHead className="w-10/12 text-base">
                                Pertanyaan
                              </TableHead>
                              <TableHead>
                                <div className="flex flex-col items-center">
                                  <p className="text-base">K</p>
                                  <Checkbox />
                                </div>
                              </TableHead>
                              <TableHead>
                                <div className="flex flex-col items-center">
                                  <p className="text-base">BK</p>
                                  <Checkbox />
                                </div>
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <p className="text-base">1.</p>
                              </TableCell>
                              <TableCell>
                                <p className="text-base">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Similique architecto
                                  adipisci amet saepe dolorum illum sed quos
                                  quis veritatis quaerat?
                                </p>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col items-center">
                                  <Checkbox />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col items-center">
                                  <Checkbox />
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem className="border-b" value="item-4">
                  <AccordionTrigger className="py-4">
                    <div className="flex flex-col items-start">
                      <p className="font-bold">FR.IA.04</p>
                      <p className="text-lg">
                        Penjelasan Singkat Proyek Terkait Pekerjaan / Kegiatan
                        Terstruktur Lainnya
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>Test</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          {isPertanyaanTertulis && (
            <div className="flex flex-col gap-4 rounded-lg bg-white p-12">
              <p className="font-anek-latin text-3xl font-bold uppercase">
                Pertanyaan Tertulis
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem className="border-b" value="item-1">
                  <AccordionTrigger className="py-4">
                    <div className="flex flex-col items-start">
                      <p className="font-bold">FR.IA.05</p>
                      <p className="text-lg">
                        Pertanyaan Tertulis Pilihan Ganda
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4 py-4">
                      <div className="flex flex-col gap-2 p-2">
                        <div>
                          <p className="text-xs font-bold leading-none">
                            Kode Unit
                          </p>
                          <p className="text-base">KTL.IK02.103.01</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-none">
                            Judul Unit
                          </p>
                          <p className="text-base">
                            Merakit dan Memasang PHB Penerangan Bangunan
                            Industri Kecil
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 px-8">
                        <div>
                          <p className="relative text-base">
                            <span className="absolute -left-1 -translate-x-full">
                              1.
                            </span>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Aspernatur, cumque?
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 rounded-lg p-2">
                            <p className="text-base">A.</p>
                            <p className="relative text-base">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Aspernatur, cumque?
                            </p>
                          </div>
                          <div className="flex items-center gap-2 rounded-lg bg-success-100 p-2">
                            <p className="text-base">B.</p>
                            <p className="relative text-base">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Aspernatur, cumque?
                            </p>
                          </div>
                          <div className="flex items-center gap-2 rounded-lg p-2">
                            <p className="text-base">C.</p>
                            <p className="relative text-base">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Aspernatur, cumque?
                            </p>
                          </div>
                          <div className="flex items-center gap-2 rounded-lg p-2">
                            <p className="text-base">D.</p>
                            <p className="relative text-base">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Aspernatur, cumque?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem className="border-b" value="item-2">
                  <AccordionTrigger className="py-4">
                    <div className="flex flex-col items-start">
                      <p className="font-bold">FR.IA.06</p>
                      <p className="text-lg">Pertanyaan Tertulis Esai</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4 py-4">
                      <div className="flex flex-col gap-2 p-2">
                        <div>
                          <p className="text-xs font-bold leading-none">
                            Kode Unit
                          </p>
                          <p className="text-base">KTL.IK02.103.01</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-none">
                            Judul Unit
                          </p>
                          <p className="text-base">
                            Merakit dan Memasang PHB Penerangan Bangunan
                            Industri Kecil
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 px-8">
                        <div>
                          <p className="relative text-base">
                            <span className="absolute -left-1 -translate-x-full">
                              1.
                            </span>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Aspernatur, cumque?
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 rounded-lg bg-success-100 p-2">
                            <p className="relative text-base">
                              Lorem ipsum dolor, sit amet consectetur
                              adipisicing elit. Officia mollitia molestiae iste
                              est et corporis sapiente labore deleniti
                              praesentium sequi fugiat, ratione qui, quo,
                              laboriosam aperiam! Esse ullam fuga in voluptas
                              iste. Voluptatum maxime ipsum vitae, libero
                              inventore vero unde, quas quaerat dolorum aliquam
                              qui incidunt alias officiis quasi mollitia? Lorem,
                              ipsum dolor sit amet consectetur adipisicing elit.
                              Debitis officia praesentium vel eius vitae natus
                              adipisci eaque expedita voluptates neque sunt sint
                              non, quidem dolores nesciunt nemo est fugiat
                              cupiditate perspiciatis sapiente odit repudiandae!
                              Architecto, cumque eveniet corrupti sint sapiente
                              optio animi illo distinctio dolor placeat
                              doloremque suscipit, voluptatibus enim!
                              Reiciendis, dicta. Nihil, consequuntur pariatur!
                              Illum adipisci, a voluptate in voluptatem laborum
                              quibusdam architecto soluta nam consectetur
                              asperiores eaque provident temporibus ea ducimus
                              repudiandae voluptates quo quod et. Eligendi
                              tempore, eum aliquid illo nemo maxime! Qui nobis
                              commodi provident consectetur quis asperiores
                              voluptatem consequatur. Itaque repellendus fuga
                              non vitae officia!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          {isPertanyaanLisan && (
            <div className="flex flex-col gap-4 rounded-lg bg-white p-12">
              <p className="font-anek-latin text-3xl font-bold uppercase">
                Pertanyaan Lisan
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem className="border-b" value="item-1">
                  <AccordionTrigger className="py-4">
                    <div className="flex flex-col items-start">
                      <p className="font-bold">FR.IA.07</p>
                      <p className="text-lg">Pertanyaan Lisan</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="py-4">
                      <div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/12 text-base">
                                No.
                              </TableHead>
                              <TableHead className="w-5/12 text-base">
                                Pertanyaan
                              </TableHead>
                              <TableHead className="w-5/12 text-base">
                                Kunci Jawaban
                              </TableHead>
                              <TableHead>
                                <div className="flex flex-col items-center">
                                  <p className="text-base">K</p>
                                  <Checkbox />
                                </div>
                              </TableHead>
                              <TableHead>
                                <div className="flex flex-col items-center">
                                  <p className="text-base">BK</p>
                                  <Checkbox />
                                </div>
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <p className="text-base">1.</p>
                              </TableCell>
                              <TableCell>
                                <p className="text-base">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Similique architecto
                                  adipisci amet saepe dolorum illum sed quos
                                  quis veritatis quaerat?
                                </p>
                              </TableCell>
                              <TableCell>
                                <p className="text-base">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Similique architecto
                                  adipisci amet saepe dolorum illum sed quos
                                  quis veritatis quaerat?
                                </p>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col items-center">
                                  <Checkbox />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col items-center">
                                  <Checkbox />
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          {isPortofolio && (
            <div className="flex flex-col gap-4 rounded-lg bg-white p-12">
              <p className="font-anek-latin text-3xl font-bold uppercase">
                Portofolio
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem className="border-b" value="item-1">
                  <AccordionTrigger className="py-4">
                    <div className="flex flex-col items-start">
                      <p className="font-bold">FR.IA.08</p>
                      <p className="text-lg">Verifikasi Portofolio</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="py-4">
                      <div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/12 text-base">
                                No
                              </TableHead>
                              <TableHead className="w-7/12 text-base">
                                Portofolio
                              </TableHead>
                              <TableHead className="w-1/12">
                                <div className="flex flex-col items-center text-base">
                                  <p className="text-base">Valid</p>
                                  <Checkbox />
                                </div>
                              </TableHead>
                              <TableHead className="w-1/12">
                                <div className="flex flex-col items-center text-base">
                                  <p className="text-base">Asli</p>
                                  <Checkbox />
                                </div>
                              </TableHead>
                              <TableHead className="w-1/12">
                                <div className="flex flex-col items-center text-base">
                                  <p className="text-base">Terkini</p>
                                  <Checkbox />
                                </div>
                              </TableHead>
                              <TableHead className="w-1/12">
                                <div className="flex flex-col items-center text-base">
                                  <p className="text-base">Memadai</p>
                                  <Checkbox />
                                </div>
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>1</TableCell>
                              <TableCell className="hypens-auto" lang="id">
                                <p className="text-base">
                                  Lorem ipsum dolor, sit amet consectetur
                                  adipisicing elit. Quod, unde.
                                </p>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col items-center">
                                  <Checkbox />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col items-center">
                                  <Checkbox />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col items-center">
                                  <Checkbox />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col items-center">
                                  <Checkbox />
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem className="border-b" value="item-2">
                  <AccordionTrigger className="py-4">
                    <div className="flex flex-col items-start">
                      <p className="font-bold">FR.IA.09</p>
                      <p className="text-lg">Pertanyaan Wawancara</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>Test</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </div>
      </>
    );
  } else if (isLoading) {
  }
};
