import { useEffect } from "react";
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
import { Dialog, DialogContent, DialogTrigger } from "../../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../../../components/ui/alert-dialog";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import ClipboardX from "../../../assets/icons/untitled-ui-icons/line/components/ClipboardX";

export const TinjauPersyaratan = () => {
  const { auth } = useContext(AuthContext);
  const [asesiSkemaSertifikasi, setAsesiSkemaSertifikasi] = useState(null);
  const [idAsesiSkemaSertifikasi, setIdAsesiSkemaSertifikasi] = useState(null);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);

  const idUser = auth?.id;

  const { refetch } = useQuery({
    queryKey: ["asesi-tempat-uji-kompetensi", idUser],
    queryFn: async () => {
      return await axios.get(`/administrator/${idUser}/tempat-uji-kompetensi/asesi`);
    },
    onSuccess: async (data) => {
      setAsesiSkemaSertifikasi(data.data.data.tempat_uji_kompetensi.skema_sertifikasi);
    },
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
  });

  useEffect(() => {
    refetch();
    return () => setIsRefetch(false);
  }, [isRefetch]);

  return (
    <section>
      <div className="flex flex-col gap-12">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Tinjau Persyaratan
          </h1>
          <p>Meninjau Berkas dan melakukan verifikasi data Asesi</p>
        </div>
        <div>
          {!!asesiSkemaSertifikasi &&
            asesiSkemaSertifikasi.map((value) => {
              const {
                id,
                asesi_skema_sertifikasi: asesiSkemaSertifikasi,
                nama_skema_sertifikasi: namaSkemaSertifikasi,
              } = value;

              const filteredAsesiSkemaSertifikasi = asesiSkemaSertifikasi.filter(
                (value) => value.is_verifikasi_berkas === false,
              );

              if (filteredAsesiSkemaSertifikasi.length !== 0) {
                return (
                  <article key={id}>
                    <div className="flex flex-col gap-4">
                      {filteredAsesiSkemaSertifikasi.map((value) => {
                        const {
                          id,
                          asesi: {
                            data_diri: {
                              tanggal_lahir,
                              jenis_kelamin: { jenis_kelamin: jenisKelamin },
                              nik,
                              nomor_telepon: nomorTelepon,
                              tempat_lahir: tempatLahir,
                              negara: { nama: namaNegara },
                              kualifikasi_pendidikan: {
                                kualifikasi_pendidikan: kualifikasiPendidikan,
                              },
                              alamat: {
                                provinsi: { nama: namaProvinsiRumah },
                                kota_kabupaten: { nama: namaKotaKabupatenRumah },
                                kecamatan: { nama: namaKecamatanRumah },
                                kelurahan_desa: { nama: namaKelurahanDesaRumah },
                                keterangan_lainnya: keteranganLainnyaRumah,
                              },
                            },
                            data_pekerjaan: {
                              email: emailKantor,
                              nomor_telepon: nomorTeleponKantor,
                              fax,
                              jabatan,
                              nama_institusi_perusahaan: namaInstitusiPerusahaan,
                              alamat: {
                                provinsi: { nama: namaProvinsiKantor },
                                kota_kabupaten: { nama: namaKotaKabupatenKantor },
                                kecamatan: { nama: namaKecamatanKantor },
                                kelurahan_desa: { nama: namaKelurahanDesaKantor },
                                keterangan_lainnya: keteranganLainnyaKantor,
                              },
                            },
                            user: { nama_lengkap: namaLengkap, url_profil_user: urlProfilUser },
                          },
                          bukti_persyaratan_dasar: buktiPersyaratanDasar,
                          portofolio,
                          tujuan_asesmen: { tujuan },
                        } = value;

                        const date = new Date(tanggal_lahir);
                        const tanggalLahir = date.toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        });

                        return (
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full rounded-lg bg-white p-6"
                            key={id}>
                            <AccordionItem value="item-1">
                              <AccordionTrigger>
                                <div className="flex w-full items-center gap-6">
                                  <div>
                                    <img
                                      src={urlProfilUser}
                                      alt="File Bukti Persyaratan"
                                      className="aspect-square w-24 rounded-lg object-cover"
                                    />
                                  </div>
                                  <div className="grid grid-flow-col grid-rows-2 items-center gap-x-12 gap-y-4">
                                    <div className="flex flex-col items-start">
                                      <p className="text-xs font-semibold leading-none">Nama</p>
                                      <p className="text-sm">{namaLengkap}</p>
                                    </div>
                                    <div className="flex flex-col items-start">
                                      <p className="text-xs font-semibold leading-none">
                                        Skema Sertifikasi
                                      </p>
                                      <p className="text-sm">{namaSkemaSertifikasi}</p>
                                    </div>
                                    <div className="flex flex-col items-start">
                                      <p className="text-xs font-semibold leading-none">
                                        Tujuan Asesmen
                                      </p>
                                      <p className="text-sm">{tujuan}</p>
                                    </div>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="flex flex-col gap-8 pt-6">
                                  <div>
                                    <Accordion type="multiple">
                                      <AccordionItem value="item-1" className="border-b py-4">
                                        <AccordionTrigger>
                                          <p className="text-lg font-bold">Data Diri</p>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                          <div className="flex flex-col gap-8 py-4">
                                            <div className="grid grid-cols-4 gap-x-12 gap-y-4">
                                              <div>
                                                <p className="text-xs font-bold">Jenis Kelamin</p>
                                                <p className="text-sm capitalize">{jenisKelamin}</p>
                                              </div>
                                              <div>
                                                <p className="text-xs font-bold">Kebangsaan</p>
                                                <p className="text-sm capitalize">{namaNegara}</p>
                                              </div>
                                              <div>
                                                <p className="text-xs font-bold">NIK</p>
                                                <p className="text-sm capitalize">{nik}</p>
                                              </div>
                                              <div>
                                                <p className="text-xs font-bold">
                                                  Kualifikasi Pendidikan
                                                </p>
                                                <p className="text-sm uppercase">
                                                  {kualifikasiPendidikan}
                                                </p>
                                              </div>
                                              <div>
                                                <p className="text-xs font-bold">
                                                  Tempat, Tanggal Lahir
                                                </p>
                                                <p className="text-sm">
                                                  {tempatLahir},<span> {tanggalLahir}</span>
                                                </p>
                                              </div>
                                              <div>
                                                <p className="text-xs font-bold">Nomor Telepon</p>
                                                <p className="text-sm">{nomorTelepon}</p>
                                              </div>
                                            </div>
                                            <div className="flex flex-col gap-4">
                                              <p className="text-base font-bold">Alamat Rumah</p>
                                              <div className="grid grid-cols-4 gap-x-12 gap-y-4">
                                                <div>
                                                  <p className="text-xs font-bold">Provinsi</p>
                                                  <p className="text-sm capitalize">
                                                    {namaProvinsiRumah}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Kota / Kabupaten
                                                  </p>
                                                  <p className="text-sm capitalize">
                                                    {namaKotaKabupatenRumah}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">Kecamatan</p>
                                                  <p className="text-sm capitalize">
                                                    {namaKecamatanRumah}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Kelurahan / Desa
                                                  </p>
                                                  <p className="text-sm capitalize">
                                                    {namaKelurahanDesaRumah}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Keterangan Lainnya
                                                  </p>
                                                  <p className="text-sm">
                                                    {namaKelurahanDesaRumah}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                      <AccordionItem value="item-2" className="border-b py-4">
                                        <AccordionTrigger>
                                          <p className="text-lg font-bold">Data Pekerjaan</p>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                          <div className="flex flex-col gap-8 py-4">
                                            <div className="grid grid-cols-4 gap-x-12 gap-y-4">
                                              <div>
                                                <p className="text-xs font-bold">Email Kantor</p>
                                                <p className="text-sm">{emailKantor}</p>
                                              </div>
                                              <div>
                                                <p className="text-xs font-bold">
                                                  Nomor Telepon Kantor
                                                </p>
                                                <p className="text-sm">{nomorTeleponKantor}</p>
                                              </div>
                                              <div>
                                                <p className="text-xs font-bold">Fax</p>
                                                <p className="text-sm">{fax}</p>
                                              </div>
                                              <div>
                                                <p className="text-xs font-bold">Jabatan</p>
                                                <p className="text-sm">{jabatan}</p>
                                              </div>
                                              <div>
                                                <p className="text-xs font-bold">
                                                  Institusi / Perusahaan
                                                </p>
                                                <p className="text-sm">{namaInstitusiPerusahaan}</p>
                                              </div>
                                            </div>
                                            <div className="flex flex-col gap-4">
                                              <p className="text-base font-bold">Alamat Kantor</p>
                                              <div className="grid grid-cols-4 gap-x-12 gap-y-4">
                                                <div>
                                                  <p className="text-xs font-bold">Provinsi</p>
                                                  <p className="text-sm capitalize">
                                                    {namaProvinsiKantor}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Kota / Kabupaten
                                                  </p>
                                                  <p className="text-sm capitalize">
                                                    {namaKotaKabupatenKantor}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">Kecamatan</p>
                                                  <p className="text-sm capitalize">
                                                    {namaKecamatanKantor}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Kelurahan / Desa
                                                  </p>
                                                  <p className="text-sm capitalize">
                                                    {namaKelurahanDesaKantor}
                                                  </p>
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold">
                                                    Keterangan Lainnya
                                                  </p>
                                                  <p className="text-sm">
                                                    {keteranganLainnyaKantor}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                      <AccordionItem value="item-3" className="border-b py-4">
                                        <AccordionTrigger>
                                          <p className="text-lg font-bold">
                                            Bukti Persyaratan Dasar
                                          </p>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                          <div className="flex flex-col gap-4 py-4">
                                            {buktiPersyaratanDasar.map((value, index) => {
                                              const {
                                                persyaratan_dasar: persyaratanDasar,
                                                file_bukti_persyaratan_dasar:
                                                  fileBuktiPersyaratanDasar,
                                              } = value;

                                              return (
                                                <div key={value.id} className="flex flex-col gap-2">
                                                  <div className="relative flex items-center">
                                                    <p className="absolute -left-2 -translate-x-full">
                                                      {index + 1}.{" "}
                                                    </p>
                                                    <p className="text-base">
                                                      {persyaratanDasar.persyaratan_dasar}
                                                    </p>
                                                  </div>
                                                  <div className="flex gap-4">
                                                    {fileBuktiPersyaratanDasar.map((value) => {
                                                      return (
                                                        <div key={value.id}>
                                                          <Dialog>
                                                            <DialogTrigger asChild>
                                                              <img
                                                                src={
                                                                  value.url_file_bukti_persyaratan_dasar
                                                                }
                                                                alt="File Bukti Persyaratan"
                                                                className="aspect-[3/4] w-20 cursor-pointer rounded-lg border-2 border-secondary-200 object-cover p-1"
                                                              />
                                                            </DialogTrigger>
                                                            <DialogContent className="sm:max-w-[30rem]">
                                                              <img
                                                                src={
                                                                  value.url_file_bukti_persyaratan_dasar
                                                                }
                                                                alt="File Bukti Persyaratan"
                                                                className="cursor-pointer rounded-lg object-cover"
                                                              />
                                                            </DialogContent>
                                                          </Dialog>
                                                        </div>
                                                      );
                                                    })}
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                      <AccordionItem value="item-4" className="border-b py-4">
                                        <AccordionTrigger>
                                          <p className="text-lg font-bold">Portofolio</p>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                          <div className="flex flex-col gap-4">
                                            {portofolio.map((value, index) => {
                                              const {
                                                keterangan,
                                                file_portofolio: filePortofolio,
                                              } = value;

                                              return (
                                                <div key={value.id} className="flex flex-col gap-2">
                                                  <div className="relative flex items-center">
                                                    <p className="absolute -left-2 -translate-x-full">
                                                      {index + 1}.{" "}
                                                    </p>
                                                    <p className="text-base">{keterangan}</p>
                                                  </div>
                                                  <div className="flex gap-4">
                                                    {filePortofolio.map((value) => {
                                                      return (
                                                        <div key={value.id}>
                                                          <Dialog>
                                                            <DialogTrigger asChild>
                                                              <img
                                                                src={value.url_file_portofolio}
                                                                alt="File Portofolio"
                                                                className="aspect-[3/4] w-20 cursor-pointer rounded-lg border-2 border-secondary-200 object-cover p-1"
                                                              />
                                                            </DialogTrigger>
                                                            <DialogContent className="sm:max-w-[30rem]">
                                                              <img
                                                                src={value.url_file_portofolio}
                                                                alt="File Portofolio"
                                                                className="cursor-pointer rounded-lg object-cover"
                                                              />
                                                            </DialogContent>
                                                          </Dialog>
                                                        </div>
                                                      );
                                                    })}
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                    </Accordion>
                                  </div>
                                  <div>
                                    <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
                                      <AlertDialogTrigger asChild>
                                        <Button className="w-full">Setujui</Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            <div className="flex flex-col items-center gap-2">
                                              <AnnotationAlert className="text-5xl text-secondary-500" />
                                              <p className="font-anek-latin text-xl">
                                                Tinjau Asesmen
                                              </p>
                                            </div>
                                          </AlertDialogTitle>
                                          <AlertDialogDescription className="py-4 text-sm">
                                            Harap diingat bahwa setelah tindakan ini dilakukan,
                                            tidak akan ada kesempatan untuk mengulanginya. Apakah
                                            Anda yakin?
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
                                                type="submit"
                                                className="w-full"
                                                onClick={() => {
                                                  try {
                                                    setIdAsesiSkemaSertifikasi(id);
                                                    mutate();
                                                    setIsRefetch(true);
                                                  } catch (error) {
                                                    console.error(error);
                                                  } finally {
                                                    setIsOpenDialog(false);
                                                  }
                                                }}>
                                                Konfirmasi
                                              </Button>
                                            </AlertDialogAction>
                                          </div>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
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
              }
            })}
        </div>
      </div>
    </section>
  );
};
