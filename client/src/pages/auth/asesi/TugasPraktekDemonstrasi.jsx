import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import axios from "../../../utils/axios";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "../../../components/ui/accordion";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../../../components/ui/table";

export const TugasPraktekDemonstrasi = () => {
  const location = useLocation();
  const idAsesiSkemaSertifikasi = location?.state?.id_asesi_skema_sertifikasi;

  const [unitKompetensiData, setUnitKompetensiData] = useState();

  useQuery({
    queryKey: ["tugas-praktik-demonstrasi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/tugas-praktik-demonstrasi`,
      );
    },
    onSuccess: (data) => {
      setUnitKompetensiData(data.data.data.skema_sertifikasi.unit_kompetensi);
    },
  });

  if (!!idAsesiSkemaSertifikasi) {
    return (
      <section className="flex flex-col gap-8">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Tugas Praktek Demonstrasi
          </h1>
          <p>FR.IA.02</p>
        </div>
        <div className="flex flex-col gap-8">
          {!!unitKompetensiData &&
            unitKompetensiData.map((value) => {
              const {
                id,
                kode_unit_kompetensi: kodeUnitKompetensi,
                nama_unit_kompetensi: namaUnitKompetensi,
                tugas_praktik_demonstrasi: tugasPraktikDemonstrasi,
              } = value;
              return (
                <div key={id} className="flex flex-col rounded-lg bg-white p-12 shadow-lg">
                  <div className="flex gap-12 rounded-t-lg bg-secondary-500 p-4 text-white">
                    <div>
                      <p className="text-xs font-bold leading-none">Kode Unit Kompetensi</p>
                      <p className="text-base">{kodeUnitKompetensi}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-none">Nama Unit Kompetensi</p>
                      <p className="text-base">{namaUnitKompetensi}</p>
                    </div>
                  </div>
                  <div className="rounded-b-lg border-x-2 border-b-2 border-secondary-100">
                    <div className="flex flex-col gap-8 p-12">
                      {!!tugasPraktikDemonstrasi &&
                        tugasPraktikDemonstrasi.map((value) => {
                          const {
                            id,
                            skenario,
                            langkah_kerja_tugas_praktik_demonstrasi:
                              langkahKerjaTugasPraktikDemonstrasi,
                          } = value;
                          return (
                            <div key={id} className="flex flex-col gap-8">
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <p className="self-start font-aileron text-base font-bold">A.</p>
                                  <h4 className="font-aileron text-base font-bold">Petunjuk</h4>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="self-start text-base">1.</p>
                                    <p className="text-base">
                                      Baca dan pelajari setiap instruksi di bawah ini dengan cermat
                                      sebelum melaksanakan praktek
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="self-start text-base">2.</p>
                                    <p className="text-base">
                                      Klarifikasi kepada Asesor apabila ada hal-hal yang belum jelas
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="self-start text-base">3.</p>
                                    <p className="text-base">
                                      Laksanakan pekerjaan sesuai dengan urutan proses yang sudah
                                      ditetapkan
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="self-start text-base">4.</p>
                                    <p className="text-base">
                                      Seluruh proses kerja mengacu kepada SOP/WI yang dipersyaratkan
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <p className="self-start font-aileron text-base font-bold">B.</p>
                                  <h4 className="font-aileron text-base font-bold">Skenario</h4>
                                </div>
                                <div>
                                  <p className="text-justify indent-6 text-base">{skenario}</p>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <p className="self-start font-aileron text-base font-bold">C.</p>
                                  <h4 className="font-aileron text-base font-bold">
                                    Langkah Kerja
                                  </h4>
                                </div>
                                <div>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead className="h-20 min-w-[4rem] text-base">
                                          No.
                                        </TableHead>
                                        <TableHead className="h-20 w-3/12 text-base">
                                          Langkah Kerja
                                        </TableHead>
                                        <TableHead className="h-20 w-9/12 text-base">
                                          Instruksi Kerja
                                        </TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {!!langkahKerjaTugasPraktikDemonstrasi &&
                                        langkahKerjaTugasPraktikDemonstrasi.map((value, index) => {
                                          const {
                                            id,
                                            langkah_kerja: langkahKerja,
                                            instruksi_kerja_tugas_praktik_demonstrasi:
                                              instruksiKerjaTugasPraktikDemonstrasi,
                                          } = value;

                                          return (
                                            <TableRow key={id}>
                                              <TableCell className="align-top text-base">
                                                {index + 1}.
                                              </TableCell>
                                              <TableCell className="align-top text-base">
                                                {langkahKerja}
                                              </TableCell>
                                              <TableCell className="text-base">
                                                <ul className="list-disc">
                                                  {!!instruksiKerjaTugasPraktikDemonstrasi &&
                                                    instruksiKerjaTugasPraktikDemonstrasi.map(
                                                      (value) => {
                                                        const {
                                                          id,
                                                          instruksi_kerja: instruksiKerja,
                                                        } = value;

                                                        return <li key={id}>{instruksiKerja}</li>;
                                                      },
                                                    )}
                                                </ul>
                                              </TableCell>
                                            </TableRow>
                                          );
                                        })}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    );
  } else if (!idAsesiSkemaSertifikasi) {
    return <Navigate to="/uji-kompetensi" />;
  }
};
