import { useContext, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { AuthContext } from "../../../context/AuthContext";

import axios from "../../../utils/axios";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "../../../components/ui/form";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";

export const TinjauPersyaratan = () => {
  const { auth } = useContext(AuthContext);
  const [asesiSkemaSertifikasi, setAsesiSkemaSertifikasi] = useState(null);
  const [idAsesiSkemaSertifikasi, setIdAsesiSkemaSertifikasi] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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
      setAsesiSkemaSertifikasi(skemaSertifikasi);
    },
    refetchInterval: 500,
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.patch(
        `/administrator/tempat-uji-kompetensi/skema-sertifikasi/asesi/${idAsesiSkemaSertifikasi}`,
        {
          is_verifikasi_berkas: true,
        },
      );
    },
    onSuccess: () => {
      setIdAsesiSkemaSertifikasi(null);
    },
    onSettled: () => {
      setOpenDialog(false);
    },
  });

  return (
    <>
      <section>
        <div className="flex flex-col gap-12">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Tinjau Persyaratan
            </h1>
            <p>Meninjau Berkas dan melakukan verifikasi data Asesi</p>
          </div>
          <div>
            {asesiSkemaSertifikasi &&
              asesiSkemaSertifikasi.map((skemaSertifikasi) => {
                const {
                  id,
                  asesi_skema_sertifikasi: asesiSkemaSertifikasi,
                  nama_skema_sertifikasi: namaSkemaSertifikasi,
                } = skemaSertifikasi;

                const filteredAsesiSkemaSertifikasi =
                  asesiSkemaSertifikasi.filter(
                    (value) => value.is_verifikasi_berkas === false,
                  );

                if (filteredAsesiSkemaSertifikasi.length !== 0) {
                  return (
                    <article key={id}>
                      <div className="flex flex-col gap-4">
                        {filteredAsesiSkemaSertifikasi.map((value) => {
                          const {
                            id,
                            id_asesi,
                            asesi,
                            bukti_persyaratan_dasar: buktiPersyaratanDasar,
                            portofolio,
                            tujuan_asesmen: tujuanAsesmen,
                          } = value;

                          const {
                            data_diri: dataDiri,
                            data_pekerjaan: dataPekerjaan,
                          } = asesi;

                          const date = new Date(dataDiri.tanggal_lahir);
                          const tanggalLahir = date.toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          );

                          console.log(dataPekerjaan);

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
                                        src={asesi.data_diri.foto_profil}
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
                                        <p className="text-xs font-semibold leading-none">
                                          Skema Sertifikasi
                                        </p>
                                        <p className="text-sm">
                                          {namaSkemaSertifikasi}
                                        </p>
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
                                    <div>
                                      <Accordion type="multiple">
                                        <AccordionItem
                                          value="item-1"
                                          className="border-b py-4"
                                        >
                                          <AccordionTrigger>
                                            <p className="text-lg font-bold">
                                              Data Diri
                                            </p>
                                          </AccordionTrigger>
                                          <AccordionContent>
                                            <div className="flex flex-col gap-8 py-4">
                                              <div className="grid grid-cols-4 gap-x-12 gap-y-4">
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Jenis Kelamin
                                                  </p>
                                                  <p className="text-sm capitalize">
                                                    {dataDiri.jenis_kelamin}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Kebangsaan
                                                  </p>
                                                  <p className="text-sm capitalize">
                                                    {dataDiri.kebangsaan}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    NIK
                                                  </p>
                                                  <p className="text-sm capitalize">
                                                    {dataDiri.nik}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Kualifikasi Pendidikan
                                                  </p>
                                                  <p className="text-sm uppercase">
                                                    {
                                                      dataDiri.kualifikasi_pendidikan
                                                    }
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Tempat, Tanggal Lahir
                                                  </p>
                                                  <p className="text-sm">
                                                    {dataDiri.tempat_lahir},
                                                    <span> {tanggalLahir}</span>
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Nomor Telepon
                                                  </p>
                                                  <p className="text-sm">
                                                    {dataDiri.nomor_telepon}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="flex flex-col gap-4">
                                                <p className="text-base font-bold">
                                                  Alamat Rumah
                                                </p>
                                                <div className="grid grid-cols-4 gap-x-12 gap-y-4">
                                                  <div>
                                                    <p className="text-xs font-bold">
                                                      Provinsi
                                                    </p>
                                                    <p className="text-sm capitalize">
                                                      {dataDiri.alamat.provinsi}
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="text-xs font-bold">
                                                      Kota / Kabupaten
                                                    </p>
                                                    <p className="text-sm capitalize">
                                                      {
                                                        dataDiri.alamat
                                                          .kota_kabupaten
                                                      }
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="text-xs font-bold">
                                                      Kecamatan
                                                    </p>
                                                    <p className="text-sm capitalize">
                                                      {
                                                        dataDiri.alamat
                                                          .kecamatan
                                                      }
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="text-xs font-bold">
                                                      Kelurahan / Desa
                                                    </p>
                                                    <p className="text-sm capitalize">
                                                      {
                                                        dataDiri.alamat
                                                          .kelurahan_desa
                                                      }
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="text-xs font-bold">
                                                      Keterangan Lainnya
                                                    </p>
                                                    <p className="text-sm">
                                                      {
                                                        dataDiri.alamat
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
                                          value="item-2"
                                          className="border-b py-4"
                                        >
                                          <AccordionTrigger>
                                            <p className="text-lg font-bold">
                                              Data Pekerjaan
                                            </p>
                                          </AccordionTrigger>
                                          <AccordionContent>
                                            <div className="flex flex-col gap-8 py-4">
                                              <div className="grid grid-cols-4 gap-x-12 gap-y-4">
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Email Kantor
                                                  </p>
                                                  <p className="text-sm">
                                                    {dataPekerjaan.email}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Nomor Telepon Kantor
                                                  </p>
                                                  <p className="text-sm">
                                                    {
                                                      dataPekerjaan.nomor_telepon
                                                    }
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Fax
                                                  </p>
                                                  <p className="text-sm">
                                                    {dataPekerjaan.fax}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Jabatan
                                                  </p>
                                                  <p className="text-sm">
                                                    {dataPekerjaan.jabatan}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Institusi / Perusahaan
                                                  </p>
                                                  <p className="text-sm">
                                                    {
                                                      dataPekerjaan.nama_institusi_perusahaan
                                                    }
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="flex flex-col gap-4">
                                                <p className="text-base font-bold">
                                                  Alamat Kantor
                                                </p>
                                                <div className="grid grid-cols-4 gap-x-12 gap-y-4">
                                                  <div>
                                                    <p className="text-xs font-bold">
                                                      Provinsi
                                                    </p>
                                                    <p className="text-sm capitalize">
                                                      {
                                                        dataPekerjaan.alamat
                                                          .provinsi
                                                      }
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="text-xs font-bold">
                                                      Kota / Kabupaten
                                                    </p>
                                                    <p className="text-sm capitalize">
                                                      {
                                                        dataPekerjaan.alamat
                                                          .kota_kabupaten
                                                      }
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="text-xs font-bold">
                                                      Kecamatan
                                                    </p>
                                                    <p className="text-sm capitalize">
                                                      {
                                                        dataPekerjaan.alamat
                                                          .kecamatan
                                                      }
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="text-xs font-bold">
                                                      Kelurahan / Desa
                                                    </p>
                                                    <p className="text-sm capitalize">
                                                      {
                                                        dataPekerjaan.alamat
                                                          .kelurahan_desa
                                                      }
                                                    </p>
                                                  </div>
                                                  <div>
                                                    <p className="text-xs font-bold">
                                                      Keterangan Lainnya
                                                    </p>
                                                    <p className="text-sm">
                                                      {
                                                        dataPekerjaan.alamat
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
                                          className="border-b py-4"
                                        >
                                          <AccordionTrigger>
                                            <p className="text-lg font-bold">
                                              Bukti Persyaratan Dasar
                                            </p>
                                          </AccordionTrigger>
                                          <AccordionContent>
                                            <div className="flex flex-col gap-4 py-4">
                                              {buktiPersyaratanDasar.map(
                                                (value, index) => {
                                                  const {
                                                    persyaratan_dasar:
                                                      persyaratanDasar,
                                                    file_bukti_persyaratan_dasar:
                                                      fileBuktiPersyaratanDasar,
                                                  } = value;

                                                  return (
                                                    <div
                                                      key={value.id}
                                                      className="flex flex-col gap-2"
                                                    >
                                                      <div className="relative flex items-center">
                                                        <p className="absolute -left-2 -translate-x-full">
                                                          {index + 1}.{" "}
                                                        </p>
                                                        <p className="text-base">
                                                          {
                                                            persyaratanDasar.persyaratan_dasar
                                                          }
                                                        </p>
                                                      </div>
                                                      <div className="flex gap-4">
                                                        {fileBuktiPersyaratanDasar.map(
                                                          (value) => {
                                                            return (
                                                              <div
                                                                key={value.id}
                                                              >
                                                                <Dialog>
                                                                  <DialogTrigger
                                                                    asChild
                                                                  >
                                                                    <img
                                                                      src={
                                                                        value.file
                                                                      }
                                                                      alt="File Bukti Persyaratan"
                                                                      className="aspect-[3/4] w-20 cursor-pointer rounded-lg border-2 border-secondary-200 object-cover p-1"
                                                                    />
                                                                  </DialogTrigger>
                                                                  <DialogContent className="sm:max-w-[30rem]">
                                                                    <img
                                                                      src={
                                                                        value.file
                                                                      }
                                                                      alt="File Bukti Persyaratan"
                                                                      className="cursor-pointer rounded-lg object-cover"
                                                                    />
                                                                  </DialogContent>
                                                                </Dialog>
                                                              </div>
                                                            );
                                                          },
                                                        )}
                                                      </div>
                                                    </div>
                                                  );
                                                },
                                              )}
                                            </div>
                                          </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem
                                          value="item-4"
                                          className="border-b py-4"
                                        >
                                          <AccordionTrigger>
                                            <p className="text-lg font-bold">
                                              Portofolio
                                            </p>
                                          </AccordionTrigger>
                                          <AccordionContent>
                                            <div className="flex flex-col gap-4">
                                              {portofolio.map(
                                                (value, index) => {
                                                  const {
                                                    keterangan,
                                                    file_portofolio:
                                                      filePortofolio,
                                                  } = value;

                                                  return (
                                                    <div
                                                      key={value.id}
                                                      className="flex flex-col gap-2"
                                                    >
                                                      <div className="relative flex items-center">
                                                        <p className="absolute -left-2 -translate-x-full">
                                                          {index + 1}.{" "}
                                                        </p>
                                                        <p className="text-base">
                                                          {keterangan}
                                                        </p>
                                                      </div>
                                                      <div className="flex gap-4">
                                                        {filePortofolio.map(
                                                          (value) => {
                                                            return (
                                                              <div
                                                                key={value.id}
                                                              >
                                                                <Dialog>
                                                                  <DialogTrigger
                                                                    asChild
                                                                  >
                                                                    <img
                                                                      src={
                                                                        value.file
                                                                      }
                                                                      alt="File Portofolio"
                                                                      className="aspect-[3/4] w-20 cursor-pointer rounded-lg border-2 border-secondary-200 object-cover p-1"
                                                                    />
                                                                  </DialogTrigger>
                                                                  <DialogContent className="sm:max-w-[30rem]">
                                                                    <img
                                                                      src={
                                                                        value.file
                                                                      }
                                                                      alt="File Portofolio"
                                                                      className="cursor-pointer rounded-lg object-cover"
                                                                    />
                                                                  </DialogContent>
                                                                </Dialog>
                                                              </div>
                                                            );
                                                          },
                                                        )}
                                                      </div>
                                                    </div>
                                                  );
                                                },
                                              )}
                                            </div>
                                          </AccordionContent>
                                        </AccordionItem>
                                      </Accordion>
                                    </div>
                                    <div>
                                      <Dialog
                                        open={openDialog}
                                        onOpenChange={setOpenDialog}
                                      >
                                        <DialogTrigger asChild>
                                          <Button className="w-full">
                                            Setujui
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent className="w-96 bg-white">
                                          <DialogHeader>
                                            <DialogTitle>
                                              <div className="flex flex-col items-center gap-2">
                                                <AnnotationAlert className="text-5xl text-secondary-500" />
                                                <p className="font-anek-latin text-xl">
                                                  Tinjau Persyaratan
                                                </p>
                                              </div>
                                            </DialogTitle>
                                            <DialogDescription>
                                              <p className="py-4 text-sm">
                                                Harap diingat bahwa setelah
                                                tindakan ini dilakukan, tidak
                                                akan ada kesempatan untuk
                                                mengulanginya. Apakah Anda
                                                yakin?
                                              </p>
                                            </DialogDescription>
                                          </DialogHeader>
                                          <DialogFooter>
                                            <div className="w-full">
                                              <Button
                                                size="sm"
                                                type="submit"
                                                onClick={async () => {
                                                  setIdAsesiSkemaSertifikasi(
                                                    id,
                                                  );

                                                  mutate();
                                                }}
                                                className="w-full"
                                              >
                                                Konfirmasi
                                              </Button>
                                            </div>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          );
                        })}
                      </div>
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
