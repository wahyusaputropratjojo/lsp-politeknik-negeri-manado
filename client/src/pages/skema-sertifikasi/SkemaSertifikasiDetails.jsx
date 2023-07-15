import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
import { cn } from "../../utils/cn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export const SkemaSertifikasiDetails = () => {
  const [skemaSertifikasi, setSkemaSertifikasi] = useState([]);

  const indexToAlphabet = (index) => {
    let asciiCode = index + 65;
    let alphabet = String.fromCharCode(asciiCode);
    return alphabet;
  };

  const { id } = useParams();

  const { isLoading } = useQuery({
    queryKey: ["skema-sertifikasi-detail"],
    queryFn: async () => {
      return axios.get(
        `/skema-sertifikasi/e4d6702a-c402-4e6c-9325-cb35718cb94a`
      );
    },
    onSuccess: (data) => {
      console.log(data.data.data);
      setSkemaSertifikasi(data.data.data);
    },
  });

  const {
    kode_skema_sertifikasi: kodeSkemaSertifikasi,
    nama_skema_sertifikasi: namaSkemaSertifikasi,
    unit_kompetensi: unitKompetensi,
  } = skemaSertifikasi;

  return (
    <>
      <div className="flex flex-col gap-12">
        <header className="flex gap-8">
          <div className="relative w-72 rounded-lg bg-white">
            <AspectRatio ratio={1 / 1}>
              <img
                className="absolute inset-0 m-auto w-64 rounded-lg"
                src="/food-and-baverage-outlet-manager.png"
                alt=""
              />
            </AspectRatio>
          </div>
          <div className="self-end">
            <p className="font-anek-latin font-semibold">
              {kodeSkemaSertifikasi}
            </p>
            <h1 className="font-anek-latin text-5xl font-semibold">
              {namaSkemaSertifikasi}
            </h1>
          </div>
        </header>
        <section className="flex flex-col gap-12">
          <div className="flex flex-col gap-8 rounded-lg bg-white p-12">
            <p className="flex w-max rounded-lg font-anek-latin text-xl font-semibold">
              Unit Kompetensi
            </p>
            <Table>
              <TableCaption>List Unit Kompetensi</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No.</TableHead>
                  <TableHead>Kode Unit Kompetensi</TableHead>
                  <TableHead>Judul Unit Kompetensi</TableHead>
                </TableRow>
              </TableHeader>
              {unitKompetensi &&
                unitKompetensi.map((item, index) => {
                  const {
                    id,
                    kode_unit_kompetensi: kodeUnitKompetensi,
                    nama_unit_kompetensi: namaUnitKompetensi,
                  } = item;
                  return (
                    <TableRow key={id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{kodeUnitKompetensi}</TableCell>
                      <TableCell>{namaUnitKompetensi}</TableCell>
                    </TableRow>
                  );
                })}
            </Table>
          </div>
          <div className="flex flex-col gap-8 rounded-lg bg-white p-12">
            <p className="flex w-max rounded-lg font-anek-latin text-xl font-semibold">
              Aktivitas Unit Kompetensi
            </p>
            {unitKompetensi &&
              unitKompetensi.map((item) => {
                const {
                  id,
                  kode_unit_kompetensi: kodeUnitKompetensi,
                  nama_unit_kompetensi: namaUnitKompetensi,
                  aktivitas_unit_kompetensi: aktivitasUnitKompetensi,
                } = item;

                // console.log(item);
                return (
                  <Accordion type="single" collapsible key={id}>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="font-aileron">
                        <div className="flex flex-col items-start">
                          <p className="text-xs">{kodeUnitKompetensi}</p>
                          <p className="text-lg">{namaUnitKompetensi}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Table>
                          <TableCaption>Aktivitas Unit Kompetensi</TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">No.</TableHead>
                              <TableHead>Elemen</TableHead>
                              <TableHead>Kriteria Unjuk Kerja</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {aktivitasUnitKompetensi &&
                              aktivitasUnitKompetensi.map((item, index) => {
                                const {
                                  id,
                                  elemen,
                                  kriteria_unjuk_kerja: kriteriaUnjukKerja,
                                } = item;

                                return (
                                  <TableRow key={id}>
                                    <TableCell className="font-medium">
                                      {index + 1}
                                    </TableCell>
                                    <TableCell>{elemen}</TableCell>
                                    <TableCell>
                                      {kriteriaUnjukKerja.map((item, index) => {
                                        const { id, kriteria } = item;
                                        return (
                                          <div
                                            className="flex flex-col gap-4"
                                            key={id}
                                          >
                                            <div className="relative pl-8">
                                              <p className="absolute left-0">
                                                {index + 1}.{index + 1}
                                              </p>
                                              <p>{kriteria}</p>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
          </div>
          <div className="flex flex-col gap-8 rounded-lg bg-white p-12">
            <p className="flex w-max rounded-lg font-anek-latin text-xl font-semibold">
              Pertanyaan Tertulis Pilihan Ganda
            </p>
            {unitKompetensi &&
              unitKompetensi.map((item) => {
                const {
                  id,
                  kode_unit_kompetensi: kodeUnitKompetensi,
                  nama_unit_kompetensi: namaUnitKompetensi,
                  pertanyaan_tertulis: pertanyaanTertulisPilihanGanda,
                } = item;
                return (
                  <Accordion type="single" collapsible key={id}>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="font-aileron">
                        <div className="flex flex-col items-start">
                          <p className="text-xs">{kodeUnitKompetensi}</p>
                          <p className="text-lg">{namaUnitKompetensi}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {pertanyaanTertulisPilihanGanda.map((item, index) => {
                          const {
                            id,
                            pertanyaan,
                            jawaban_pertanyaan_tertulis: jawaban,
                          } = item;
                          return (
                            <div
                              key={id}
                              className="flex flex-col gap-2 font-aileron text-base text-secondary-500"
                            >
                              <div className="flex items-center gap-4">
                                <p>{index + 1}.</p>
                                <p>{pertanyaan}</p>
                              </div>
                              <div className="flex flex-col gap-1 px-6">
                                {jawaban.map((item, index) => {
                                  const { id, jawaban, benar: isBenar } = item;
                                  return (
                                    <div
                                      key={id}
                                      className={cn(
                                        "flex items-center gap-4 rounded-lg bg-error-50 p-4",
                                        {
                                          "bg-success-50": isBenar,
                                        }
                                      )}
                                    >
                                      <p>{indexToAlphabet(index)}.</p>
                                      <p>{jawaban}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
          </div>
          <div className="flex flex-col gap-8 rounded-lg bg-white p-12">
            <p className="flex w-max rounded-lg font-anek-latin text-xl font-semibold">
              Pertanyaan Tertulis Esai
            </p>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-aileron">
                  <div className="flex flex-col items-start">
                    <p className="text-xs">KTL.IK02.103.01</p>
                    <p className="text-lg">
                      Merakit Dan Memasang PHB Penerangan Bangunan Industri
                      Kecil
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2 font-aileron text-base text-secondary-500">
                    <div className="flex items-center gap-4">
                      <p>1.</p>
                      <p>
                        Jelaskan perbedaan PHB Penerangan fasa tunggal dan PHB
                        penerangan fasa tiga ?
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 px-6">
                      <div className="flex items-center gap-4 rounded-lg bg-success-50 p-4">
                        <p>
                          Perbedaannya adalah PHB penerangan fasa tunggal
                          digunakan untuk aliran listrik 1 phase yaitu listrik
                          yang menggunakan dua buah penghantar yaitu penghantar
                          fasa dan penghantar netral ( 0 ) atau listrik yang
                          terdiri dari 1 kabel bertegangan dan 1 kabel netral.
                          Sedangkan PHB penerangan 3 fasa digunakan untuk
                          listrik 3 fasa yang menggunakan 3 buah penghantar fasa
                          dan 1 buah penghantar netral.
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex flex-col gap-8 rounded-lg bg-white p-12">
            <p className="flex w-max rounded-lg font-anek-latin text-xl font-semibold">
              Pertanyaan Lisan
            </p>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-aileron">
                  <div className="flex flex-col items-start">
                    <p className="text-xs">KTL.IK02.103.01</p>
                    <p className="text-lg">
                      Merakit Dan Memasang PHB Penerangan Bangunan Industri
                      Kecil
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2 font-aileron text-base text-secondary-500">
                    <div className="flex items-center gap-4">
                      <p>1.</p>
                      <p>
                        Sebutkan Material, K3 dan alat bantu yang dibutuhkan
                        sesuai dengan persyaratan spesifikasi peralatan yang
                        berlaku?
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 px-6">
                      <div className="flex items-center gap-4 rounded-lg bg-success-50 p-4">
                        <p>
                          Lampu Indikator, Ampere Meter, Volt Meter, Selektor
                          Switch, Frekuensi Meter, Cos Meter, Emergency Switch
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>
    </>
  );
};
