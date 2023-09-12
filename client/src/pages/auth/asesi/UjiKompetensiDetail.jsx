import { useState, useRef } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { useForm } from "react-hook-form";

import { cn } from "../../../utils/cn";
import axios from "../../../utils/axios";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";

import {
  FRAPL01Document,
  FRAPL02Document,
  FRIA01Document,
  FRIA02Document,
  FRIA03Document,
  FRIA04Document,
  FRIA05ADocument,
  FRIA05BDocument,
  FRIA05CDocument,
  FRIA06ADocument,
  FRIA06BDocument,
  FRIA06CDocument,
  FRIA07Document,
  FRIA08Document,
} from "../administrator-asesor-asesi";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import CheckCircle from "../../../assets/icons/untitled-ui-icons/line/components/CheckCircle";
import PencilLine from "../../../assets/icons/untitled-ui-icons/line/components/PencilLine";
import InfoCircle from "../../../assets/icons/untitled-ui-icons/line/components/InfoCircle";
import XCircle from "../../../assets/icons/untitled-ui-icons/line/components/XCircle";
import Printer from "../../../assets/icons/untitled-ui-icons/line/components/Printer";

export const UjiKompetensiDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const idAsesiSkemaSertifikasi = location?.state?.id_asesi_skema_sertifikasi;

  const [skemaSertifikasiData, setSkemaSertifikasiData] = useState();
  const [statusSkemaSertifikasiAsesi, setStatusSkemaSertifikasiAsesi] = useState();
  const [isAlertDialogOpenComponentOne, setIsAlertDialogOpenComponentOne] = useState(false);
  const [isAlertDialogOpenComponentTwo, setIsAlertDialogOpenComponentTwo] = useState(false);
  const [isAlertDialogOpenComponentThree, setIsAlertDialogOpenComponentThree] = useState(false);
  const [totalElemenFRAPL02, setTotalElemenFRAPL02] = useState();
  const [totalElemenFRIA01, setTotalElemenFRIA01] = useState();
  const [totalPertanyaanObservasiFRIA03, setTotalPertanyaanObservasiFRIA03] = useState();
  const [totalPertanyaanTertulisPilihanGandaFRIA05, setTotalPertanyaanTertulisPilihanGandaFRIA05] =
    useState();
  const [totalPertanyaanTertulisEsaiFRIA06, setTotalPertanyaanTertulisEsaiFRIA06] = useState();
  const [totalPertanyaanLisanFRIA07, setTotalPertanyaanLisanFRIA07] = useState();
  const [totalPortofolioFRIA08, setTotalPortofolioFRIA08] = useState();
  const [totalKompetenFRAPL02, setTotalKompetenFRAPL02] = useState();
  const [totalKompetenFRIA01, setTotalKompetenFRIA01] = useState();
  const [totalKompetenFRIA03, setTotalKompetenFRIA03] = useState();
  const [totalKompetenFRIA05, setTotalKompetenFRIA05] = useState();
  const [totalKompetenFRIA06, setTotalKompetenFRIA06] = useState();
  const [totalKompetenFRIA07, setTotalKompetenFRIA07] = useState();
  const [totalAsliFRIA08, setTotalAsliFRIA08] = useState();
  const [totalMemadaiFRIA08, setTotalMemadaiFRIA08] = useState();
  const [totalTerkiniFRIA08, setTotalTerkiniFRIA08] = useState();
  const [totalValidFRIA08, setTotalValidFRIA08] = useState();

  const [namaAsesi, setNamaAsesi] = useState();

  const componentRefFRAPL01Document = useRef();
  const componentRefFRAPL02Document = useRef();
  const componentRefFRIA01Document = useRef();
  const componentRefFRIA02Document = useRef();
  const componentRefFRIA03Document = useRef();
  const componentRefFRIA04Document = useRef();
  const componentRefFRIA05ADocument = useRef();
  const componentRefFRIA05BDocument = useRef();
  const componentRefFRIA05CDocument = useRef();
  const componentRefFRIA06ADocument = useRef();
  const componentRefFRIA06BDocument = useRef();
  const componentRefFRIA06CDocument = useRef();
  const componentRefFRIA07Document = useRef();
  const componentRefFRIA08Document = useRef();
  const componentRefFRIA09Document = useRef();

  const handlePrintFRAPL01Document = useReactToPrint({
    content: () => componentRefFRAPL01Document.current,
    documentTitle: `FR.APL.01 - ${namaAsesi}`,
    bodyClass: "bg-white",
  });

  const handlePrintFRAPL02Document = useReactToPrint({
    content: () => componentRefFRAPL02Document.current,
    documentTitle: `FR.APL.02 - ${namaAsesi}`,
    bodyClass: "bg-white",
  });

  const handlePrintFRIA01Document = useReactToPrint({
    content: () => componentRefFRIA01Document.current,
    documentTitle: `FR.IA.01 - ${namaAsesi}`,
    bodyClass: "bg-white",
  });

  const handlePrintFRIA02Document = useReactToPrint({
    content: () => componentRefFRIA02Document.current,
    documentTitle: `FR.IA.02 - ${namaAsesi}`,
    bodyClass: "bg-white",
  });

  const handlePrintFRIA03Document = useReactToPrint({
    content: () => componentRefFRIA03Document.current,
    documentTitle: `FR.IA.03 - ${namaAsesi}`,
    bodyClass: "bg-white",
  });

  const handlePrintFRIA04Document = useReactToPrint({
    content: () => componentRefFRIA04Document.current,
    documentTitle: `FR.IA.04 - ${namaAsesi}`,
    bodyClass: "bg-white",
  });

  const handlePrintFRIA05ADocument = useReactToPrint({
    content: () => componentRefFRIA05ADocument.current,
    documentTitle: `FR.IA.05.A - ${namaAsesi}`,
    bodyClass: "bg-white",
  });

  const handlePrintFRIA05BDocument = useReactToPrint({
    content: () => componentRefFRIA05BDocument.current,
    documentTitle: `FR.IA.05.B - ${namaAsesi}`,
    bodyClass: "bg-white",
  });

  const handlePrintFRIA05CDocument = useReactToPrint({
    content: () => componentRefFRIA05CDocument.current,
    documentTitle: `FR.IA.05.C - ${namaAsesi}`,
    bodyClass: "bg-white",
  });

  const handlePrintFRIA06ADocument = useReactToPrint({
    content: () => componentRefFRIA06ADocument.current,
    documentTitle: `FR.IA.06.A - ${namaAsesi}`,
    bodyClass: "bg-white",
  });

  const handlePrintFRIA06BDocument = useReactToPrint({
    content: () => componentRefFRIA06BDocument.current,
    documentTitle: `FR.IA.06.B - ${namaAsesi}`,
    bodyClass: "bg-white",
  });

  const handlePrintFRIA06CDocument = useReactToPrint({
    content: () => componentRefFRIA06CDocument.current,
    documentTitle: `FR.IA.06.C - ${namaAsesi}`,
    bodyClass: "bg-white",
  });

  const handlePrintFRIA07Document = useReactToPrint({
    content: () => componentRefFRIA07Document.current,
    documentTitle: `FR.IA.07 - ${namaAsesi}`,
    bodyClass: "bg-white",
  });

  const handlePrintFRIA08Document = useReactToPrint({
    content: () => componentRefFRIA08Document.current,
    documentTitle: `FR.IA.08 - ${namaAsesi}`,
    bodyClass: "bg-white",
  });

  useQuery({
    queryKey: ["kompetensi-asesmen-mandiri", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/kompetensi-asesmen-mandiri`,
      );
    },
    onSuccess: (data) => {
      setTotalKompetenFRAPL02(data.data.data.total_kompeten);
      setTotalElemenFRAPL02(data.data.data.total_elemen);
    },
    enabled: !!idAsesiSkemaSertifikasi,
  });

  useQuery({
    queryKey: ["kompetensi-observasi-tempat-kerja", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/kompetensi-observasi-tempat-kerja`,
      );
    },
    onSuccess: (data) => {
      setTotalKompetenFRIA01(data.data.data.total_kompeten);
      setTotalElemenFRIA01(data.data.data.total_elemen);
    },
    enabled: !!idAsesiSkemaSertifikasi,
  });

  useQuery({
    queryKey: ["kompetensi-pertanyaan-observasi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/kompetensi-pertanyaan-observasi`,
      );
    },
    onSuccess: (data) => {
      setTotalKompetenFRIA03(data.data.data.total_kompeten);
      setTotalPertanyaanObservasiFRIA03(data.data.data.total_pertanyaan_observasi);
    },
    enabled: !!idAsesiSkemaSertifikasi,
  });

  useQuery({
    queryKey: ["kompetensi-pertanyaan-tertulis-pilihan-ganda", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/kompetensi-pertanyaan-tertulis-pilihan-ganda`,
      );
    },
    onSuccess: (data) => {
      setTotalKompetenFRIA05(data.data.data.total_kompeten);
      setTotalPertanyaanTertulisPilihanGandaFRIA05(
        data.data.data.total_pertanyaan_tertulis_pilihan_ganda,
      );
    },
    enabled: !!idAsesiSkemaSertifikasi,
  });

  useQuery({
    queryKey: ["kompetensi-pertanyaan-tertulis-esai", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/kompetensi-pertanyaan-tertulis-esai`,
      );
    },
    onSuccess: (data) => {
      setTotalKompetenFRIA06(data.data.data.total_kompeten);
      setTotalPertanyaanTertulisEsaiFRIA06(data.data.data.total_pertanyaan_tertulis_esai);
    },
    enabled: !!idAsesiSkemaSertifikasi,
  });

  useQuery({
    queryKey: ["kompetensi-pertanyaan-lisan", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/kompetensi-pertanyaan-lisan`,
      );
    },
    onSuccess: (data) => {
      setTotalKompetenFRIA07(data.data.data.total_kompeten);
      setTotalPertanyaanLisanFRIA07(data.data.data.total_pertanyaan_lisan);
    },
    enabled: !!idAsesiSkemaSertifikasi,
  });

  useQuery({
    queryKey: ["kompetensi-portofolio", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/kompetensi-portofolio`,
      );
    },
    onSuccess: (data) => {
      setTotalPortofolioFRIA08(data.data.data.total_portofolio);
      setTotalAsliFRIA08(data.data.data.total_is_asli);
      setTotalMemadaiFRIA08(data.data.data.total_is_memadai);
      setTotalTerkiniFRIA08(data.data.data.total_is_terkini);
      setTotalValidFRIA08(data.data.data.total_is_valid);
    },
    enabled: !!idAsesiSkemaSertifikasi,
  });

  useQuery({
    queryKey: ["aktivitas-unit-kompetensi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/aktivitas-unit-kompetensi`,
      );
    },
    onSuccess: (data) => {
      setSkemaSertifikasiData(data.data.data);
    },
    enabled: !!idAsesiSkemaSertifikasi,
  });

  useQuery({
    queryKey: ["status-skema-sertifikasi-asesi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(`/asesi/skema-sertifikasi/${idAsesiSkemaSertifikasi}/status`);
    },
    onSuccess: (data) => {
      setStatusSkemaSertifikasiAsesi(data.data.data);
    },
    refetchInterval: 1000,
  });

  if (!!skemaSertifikasiData && !!statusSkemaSertifikasiAsesi && !!idAsesiSkemaSertifikasi) {
    const {
      tujuan_asesmen: { tujuan },
      skema_sertifikasi: {
        url_profil_skema_sertifikasi: urlProfilSkemaSertifikasi,
        nama_skema_sertifikasi: namaSkemaSertifikasi,
      },
    } = skemaSertifikasiData;

    const {
      is_asesmen_mandiri_selesai: isAsesmenMandiriSelesai,
      is_evaluasi_asesi_selesai: isEvaluasiAsesiSelesai,
      is_evaluasi_pertanyaan_tertulis_esai_selesai: isEvaluasiPertanyaanTertulisEsaiSelesai,
      is_kompeten: isKompeten,
      is_observasi_aktivitas_tempat_kerja_selesai: isObservasiAktivitasTempatKerjaSelesai,
      is_pertanyaan_lisan_selesai: isPertanyaanLisanSelesai,
      is_pertanyaan_observasi_selesai: isPertanyaanObservasiSelesai,
      is_pertanyaan_tertulis_esai_selesai: isPertanyaanTertulisEsaiSelesai,
      is_pertanyaan_tertulis_pilihan_ganda_selesai: isPertanyaanTertulisPilihanGandaSelesai,
      is_pertanyaan_tertulis: isPertanyaanTertulis,
      is_portofolio: isPortofolio,
      is_praktik_demonstrasi_selesai: isPraktikDemonstrasiSelesai,
      is_praktik_demonstrasi: isPraktikDemonstrasi,
      is_proyek_terkait_pekerjaan_selesai: isProyekTerkaitPekerjaanSelesai,
      is_tidak_kompeten: isTidakKompeten,
      is_uji_tertulis: isUjiTertulis,
      is_verifikasi_portofolio_selesai: isVerifikasiPortofolioSelesai,
      is_wawancara: isWawancara,
    } = statusSkemaSertifikasiAsesi;

    return (
      <section className="flex flex-col gap-8">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Uji Kompetensi
          </h1>
          <p>Uji Kompetensi</p>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <img
              src={urlProfilSkemaSertifikasi}
              alt="Gambar Skema Sertifikasi"
              className="aspect-square w-64 rounded-lg bg-white object-cover p-6 shadow-lg"
            />
          </div>
          <div className="flex gap-12 rounded-lg bg-white p-6 shadow-lg">
            <div>
              <p className="text-xs font-bold leading-none">Skema Sertifikasi</p>
              <p className="text-sm">{namaSkemaSertifikasi}</p>
            </div>
            <div>
              <p className="text-xs font-bold leading-none">Tujuan Asesmen</p>
              <p className="text-sm">{tujuan}</p>
            </div>
            {!!isPortofolio || !!isPraktikDemonstrasi || !!isUjiTertulis ? (
              <div>
                <p className="text-xs font-bold leading-none">Metode Pengujian</p>
                <div className="flex flex-col">
                  {!!isPortofolio && <p className="text-sm">Portofolio</p>}
                  {!!isPraktikDemonstrasi && <p className="text-sm">Praktik Demonstrasi</p>}
                  {!!isUjiTertulis && <p className="text-sm">Uji Tertulis</p>}
                </div>
              </div>
            ) : null}
          </div>
          <div className="bottom-16 flex w-full gap-6">
            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                <div className="flex w-full items-center gap-6">
                  {!!isTidakKompeten && (
                    <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-error-500 text-white">
                      <XCircle className="text-2xl" />
                    </div>
                  )}
                  {!!isAsesmenMandiriSelesai && !isTidakKompeten && (
                    <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success-500 text-white">
                      <CheckCircle className="text-2xl" />
                    </div>
                  )}
                  <div className="flex w-full items-center justify-between">
                    <div>
                      <p className="text-xs font-bold leading-none">FR.APL.01</p>
                      <p className="text-base">Permohonan Sertifikasi Kompetensi</p>
                    </div>
                    {!!isAsesmenMandiriSelesai && (
                      <>
                        <div className="flex items-center gap-4">
                          <Button size="xs" className="gap-2" onClick={handlePrintFRAPL01Document}>
                            <Printer className="text-base" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {!!isAsesmenMandiriSelesai && (
                <>
                  <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex w-full items-center gap-6">
                      {!!isTidakKompeten && (
                        <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-error-500 text-white">
                          <XCircle className="text-2xl" />
                        </div>
                      )}
                      {!!isAsesmenMandiriSelesai && !isTidakKompeten && (
                        <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success-500 text-white">
                          <CheckCircle className="text-2xl" />
                        </div>
                      )}
                      <div className="flex w-full items-center justify-between">
                        <div>
                          <p className="text-xs font-bold leading-none">FR.APL.02</p>
                          <p className="text-base">Asesmen Mandiri</p>
                        </div>
                        {!!isAsesmenMandiriSelesai && (
                          <>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex flex-col items-center">
                                <p className="font-bold">Kompeten</p>
                                <div className="flex gap-2">
                                  <p>{totalKompetenFRAPL02}</p>
                                  <p>/</p>
                                  <p>{totalElemenFRAPL02}</p>
                                </div>
                              </div>
                              <Button
                                size="xs"
                                className="gap-2"
                                onClick={handlePrintFRAPL02Document}>
                                <Printer className="text-base" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {!!isPraktikDemonstrasi && (
                <>
                  {!!isObservasiAktivitasTempatKerjaSelesai && (
                    <>
                      <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                        <div className="flex w-full items-center gap-6">
                          {!!isTidakKompeten && (
                            <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-error-500 text-white">
                              <XCircle className="text-2xl" />
                            </div>
                          )}
                          {!isObservasiAktivitasTempatKerjaSelesai && !isTidakKompeten && (
                            <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-warning-500 text-white">
                              <InfoCircle className="text-2xl" />
                            </div>
                          )}
                          {!!isObservasiAktivitasTempatKerjaSelesai && !isTidakKompeten && (
                            <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success-500 text-white">
                              <CheckCircle className="text-2xl" />
                            </div>
                          )}
                          <div className="flex w-full items-center justify-between">
                            <div>
                              <p className="text-xs font-bold leading-none">FR.IA.01</p>
                              <p className="text-base">
                                Observasi Aktivitas di Tempat Kerja atau Tempat Kerja Simulasi
                              </p>
                            </div>
                            {!!isObservasiAktivitasTempatKerjaSelesai && (
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex flex-col items-center">
                                  <p className="font-bold">Kompeten</p>
                                  <div className="flex gap-2">
                                    <p>{totalKompetenFRIA01}</p>
                                    <p>/</p>
                                    <p>{totalElemenFRIA01}</p>
                                  </div>
                                </div>
                                <Button
                                  size="xs"
                                  className="gap-2"
                                  onClick={handlePrintFRIA01Document}>
                                  <Printer className="text-base" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex w-full items-center  gap-6">
                      {!!isTidakKompeten && (
                        <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-error-500 text-white">
                          <XCircle className="text-2xl" />
                        </div>
                      )}
                      {!isPraktikDemonstrasiSelesai && !isTidakKompeten && (
                        <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-warning-500 text-white">
                          <InfoCircle className="text-2xl" />
                        </div>
                      )}
                      {!!isPraktikDemonstrasiSelesai && !isTidakKompeten && (
                        <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success-500 text-white">
                          <CheckCircle className="text-2xl" />
                        </div>
                      )}
                      <div className="flex w-full items-center justify-between">
                        <div>
                          <p className="text-xs font-bold leading-none">FR.IA.02</p>
                          <p className="text-base">Tugas Praktek Demonstrasi</p>
                        </div>
                        {!!isPraktikDemonstrasiSelesai && (
                          <>
                            <div className="flex items-center gap-4">
                              <Button
                                size="xs"
                                className="gap-2"
                                onClick={handlePrintFRIA02Document}>
                                <Printer className="text-base" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    {!isPraktikDemonstrasiSelesai && !isTidakKompeten && (
                      <div className="flex items-center">
                        <Button
                          size="xs"
                          onClick={() => {
                            navigate(`tugas-praktek-demonstrasi`, {
                              state: {
                                ...location.state,
                                id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                              },
                            });
                          }}>
                          Kerjakan
                        </Button>
                      </div>
                    )}
                  </div>
                  {!!isPertanyaanObservasiSelesai && (
                    <>
                      <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                        <div className="flex w-full items-center gap-6">
                          {!!isTidakKompeten && (
                            <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-error-500 text-white">
                              <XCircle className="text-2xl" />
                            </div>
                          )}
                          {!isPertanyaanObservasiSelesai && !isTidakKompeten && (
                            <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-warning-500 text-white">
                              <InfoCircle className="text-2xl" />
                            </div>
                          )}
                          {!!isPertanyaanObservasiSelesai && !isTidakKompeten && (
                            <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success-500 text-white">
                              <CheckCircle className="text-2xl" />
                            </div>
                          )}
                          <div className="flex w-full items-center justify-between">
                            <div>
                              <p className="text-xs font-bold leading-none">FR.IA.03</p>
                              <p className="text-base">Pertanyaan Untuk Mendukung Observasi</p>
                            </div>
                            {!!isPertanyaanObservasiSelesai && (
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex flex-col items-center">
                                  <p className="font-bold">Kompeten</p>
                                  <div className="flex gap-2">
                                    <p>{totalKompetenFRIA03}</p>
                                    <p>/</p>
                                    <p>{totalPertanyaanObservasiFRIA03}</p>
                                  </div>
                                </div>
                                <Button
                                  size="xs"
                                  className="gap-2"
                                  onClick={handlePrintFRIA03Document}>
                                  <Printer className="text-base" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {!!isProyekTerkaitPekerjaanSelesai && (
                    <>
                      <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                        <div className="flex w-full items-center gap-6">
                          {!!isTidakKompeten && (
                            <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-error-500 text-white">
                              <XCircle className="text-2xl" />
                            </div>
                          )}
                          {!isProyekTerkaitPekerjaanSelesai && !isTidakKompeten && (
                            <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-warning-500 text-white">
                              <InfoCircle className="text-2xl" />
                            </div>
                          )}
                          {!!isProyekTerkaitPekerjaanSelesai && !isTidakKompeten && (
                            <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success-500 text-white">
                              <CheckCircle className="text-2xl" />
                            </div>
                          )}
                          <div className="flex w-full items-center justify-between">
                            <div>
                              <p className="text-xs font-bold leading-none">FR.IA.04</p>
                              <p className="text-base">
                                Penjelasan Singkat Proyek Terkait Pekerjaan / Kegiatan Terstruktur
                                Lainnya
                              </p>
                            </div>
                            {!!isProyekTerkaitPekerjaanSelesai && (
                              <>
                                <div className="flex items-center gap-4">
                                  <Button
                                    size="xs"
                                    className="gap-2"
                                    onClick={handlePrintFRIA04Document}>
                                    <Printer className="text-base" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
              {!!isUjiTertulis && (
                <>
                  <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex items-center gap-6">
                      {!!isTidakKompeten && (
                        <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-error-500 text-white">
                          <XCircle className="text-2xl" />
                        </div>
                      )}
                      {!isPertanyaanTertulisPilihanGandaSelesai && !isTidakKompeten && (
                        <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-warning-500 text-white">
                          <InfoCircle className="text-2xl" />
                        </div>
                      )}
                      {!!isPertanyaanTertulisPilihanGandaSelesai && !isTidakKompeten && (
                        <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success-500 text-white">
                          <CheckCircle className="text-2xl" />
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold leading-none">FR.IA.05</p>
                        <p className="text-base">Pertanyaan Tertulis Pilihan Ganda</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {!isPertanyaanTertulisPilihanGandaSelesai && !isTidakKompeten && (
                        <AlertDialog
                          open={isAlertDialogOpenComponentTwo}
                          onOpenChange={setIsAlertDialogOpenComponentTwo}>
                          <AlertDialogTrigger asChild>
                            <Button size="xs">Kerjakan</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                <div className="flex flex-col items-center gap-2">
                                  <AnnotationAlert className="text-5xl text-secondary-500" />
                                  <p className="font-anek-latin text-xl">
                                    Pertanyaan Tertulis Pilihan Ganda
                                  </p>
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
                                      navigate(`pertanyaan-tertulis-pilihan-ganda`, {
                                        state: {
                                          ...location.state,
                                          id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                          is_disabled: true,
                                        },
                                      });
                                    }}>
                                    Konfirmasi
                                  </Button>
                                </AlertDialogAction>
                              </div>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                      {/* {!!isPertanyaanTertulisPilihanGandaSelesai && (
                      <>
                        <div className="flex gap-2">
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`pertanyaan-tertulis-pilihan-ganda`, {
                                state: {
                                  ...location.state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Hasil
                          </Button>
                        </div>
                      </>
                    )} */}
                      {!!isPertanyaanTertulisPilihanGandaSelesai && (
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex flex-col items-center">
                            <p className="font-bold">Kompeten</p>
                            <div className="flex gap-2">
                              <p>{totalKompetenFRIA05}</p>
                              <p>/</p>
                              <p>{totalPertanyaanTertulisPilihanGandaFRIA05}</p>
                            </div>
                          </div>
                          <Button size="xs" className="gap-2" onClick={handlePrintFRIA05CDocument}>
                            <Printer className="text-base" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex items-center gap-6">
                      {!!isTidakKompeten && (
                        <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-error-500 text-white">
                          <XCircle className="text-2xl" />
                        </div>
                      )}
                      {!isPertanyaanTertulisEsaiSelesai && !isTidakKompeten && (
                        <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-warning-500 text-white">
                          <InfoCircle className="text-2xl" />
                        </div>
                      )}
                      {!!isPertanyaanTertulisEsaiSelesai && !isTidakKompeten && (
                        <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success-500 text-white">
                          <CheckCircle className="text-2xl" />
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold leading-none">FR.IA.06</p>
                        <p className="text-base">Pertanyaan Tertulis Esai</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {!isPertanyaanTertulisEsaiSelesai && !isTidakKompeten && (
                        <>
                          <AlertDialog
                            open={isAlertDialogOpenComponentThree}
                            onOpenChange={setIsAlertDialogOpenComponentThree}>
                            <AlertDialogTrigger asChild>
                              <Button size="xs">Kerjakan</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  <div className="flex flex-col items-center gap-2">
                                    <AnnotationAlert className="text-5xl text-secondary-500" />
                                    <p className="font-anek-latin text-xl">
                                      Pertanyaan Tertulis Esai
                                    </p>
                                  </div>
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  <p className="py-4 text-sm">
                                    Harap diingat bahwa setelah tindakan ini dilakukan, tidak akan
                                    ada kesempatan untuk mengulanginya. Apakah Anda yakin?
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
                                        navigate(`pertanyaan-tertulis-esai`, {
                                          state: {
                                            ...location.state,
                                            id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                            is_disabled: true,
                                          },
                                        });
                                      }}>
                                      Konfirmasi
                                    </Button>
                                  </AlertDialogAction>
                                </div>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}
                      {/* {!!isPertanyaanTertulisEsaiSelesai && (
                      <>
                        <div className="flex gap-2">
                          <Button
                            size="xs"
                            onClick={() => {
                              navigate(`pertanyaan-tertulis-esai`, {
                                state: {
                                  ...location.state,
                                  id_asesi_skema_sertifikasi: idAsesiSkemaSertifikasi,
                                },
                              });
                            }}>
                            Lihat Hasil
                          </Button>
                        </div>
                      </>
                    )} */}
                      {!isEvaluasiPertanyaanTertulisEsaiSelesai &&
                        !!isPertanyaanTertulisEsaiSelesai && (
                          <div className="text-sm">
                            <div className="flex flex-col items-center">
                              <p className="font-bold">Dalam Proses Evaluasi</p>
                            </div>
                          </div>
                        )}
                      {!!isEvaluasiPertanyaanTertulisEsaiSelesai && (
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex flex-col items-center">
                            <p className="font-bold">Kompeten</p>
                            <div className="flex gap-2">
                              <p>{totalKompetenFRIA06}</p>
                              <p>/</p>
                              <p>{totalPertanyaanTertulisEsaiFRIA06}</p>
                            </div>
                          </div>
                          <Button size="xs" className="gap-2" onClick={handlePrintFRIA06CDocument}>
                            <Printer className="text-base" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  {!!isPertanyaanLisanSelesai && (
                    <>
                      <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                        <div className="flex w-full items-center gap-6">
                          {!!isTidakKompeten && (
                            <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-error-500 text-white">
                              <XCircle className="text-2xl" />
                            </div>
                          )}
                          {!isPertanyaanLisanSelesai && !isTidakKompeten && (
                            <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-warning-500 text-white">
                              <InfoCircle className="text-2xl" />
                            </div>
                          )}
                          {!!isPertanyaanLisanSelesai && !isTidakKompeten && (
                            <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success-500 text-white">
                              <CheckCircle className="text-2xl" />
                            </div>
                          )}
                          <div className="flex w-full items-center justify-between">
                            <div>
                              <p className="text-xs font-bold leading-none">FR.IA.07</p>
                              <p className="text-base">Pertanyaan Lisan</p>
                            </div>
                            {!!isPertanyaanLisanSelesai && (
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex flex-col items-center">
                                  <p className="font-bold">Kompeten</p>
                                  <div className="flex gap-2">
                                    <p>{totalKompetenFRIA07}</p>
                                    <p>/</p>
                                    <p>{totalPertanyaanLisanFRIA07}</p>
                                  </div>
                                </div>
                                <Button
                                  size="xs"
                                  className="gap-2"
                                  onClick={handlePrintFRIA07Document}>
                                  <Printer className="text-base" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
              {!!isPortofolio && (
                <>
                  {!!isVerifikasiPortofolioSelesai && (
                    <>
                      <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                        <div className="flex w-full items-center gap-6">
                          {!!isTidakKompeten && (
                            <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-error-500 text-white">
                              <XCircle className="text-2xl" />
                            </div>
                          )}
                          {!isVerifikasiPortofolioSelesai && !isTidakKompeten && (
                            <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-warning-500 text-white">
                              <InfoCircle className="text-2xl" />
                            </div>
                          )}
                          {!!isVerifikasiPortofolioSelesai && !isTidakKompeten && (
                            <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success-500 text-white">
                              <CheckCircle className="text-2xl" />
                            </div>
                          )}
                          <div className="flex w-full items-center justify-between">
                            <div>
                              <p className="text-xs font-bold leading-none">FR.IA.08</p>
                              <p className="text-base">Verifikasi Portofolio</p>
                            </div>
                            {!!isVerifikasiPortofolioSelesai && (
                              <div className="flex items-center gap-4">
                                <div className="grid grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <div className="flex flex-col items-center">
                                      <p className="font-bold">Asli</p>
                                      <div className="flex gap-2">
                                        <p>{totalAsliFRIA08}</p>
                                        <p>/</p>
                                        <p>{totalPortofolioFRIA08}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex flex-col items-center">
                                      <p className="font-bold">Memadai</p>
                                      <div className="flex gap-2">
                                        <p>{totalMemadaiFRIA08}</p>
                                        <p>/</p>
                                        <p>{totalPortofolioFRIA08}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex flex-col items-center">
                                      <p className="font-bold">Terkini</p>
                                      <div className="flex gap-2">
                                        <p>{totalTerkiniFRIA08}</p>
                                        <p>/</p>
                                        <p>{totalPortofolioFRIA08}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex flex-col items-center">
                                      <p className="font-bold">Valid</p>
                                      <div className="flex gap-2">
                                        <p>{totalValidFRIA08}</p>
                                        <p>/</p>
                                        <p>{totalPortofolioFRIA08}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  size="xs"
                                  className="gap-2"
                                  onClick={handlePrintFRIA08Document}>
                                  <Printer className="text-base" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <div className="bg-white p-12">
            <FRAPL01Document id={idAsesiSkemaSertifikasi} ref={componentRefFRAPL01Document} />
            {!!isAsesmenMandiriSelesai && (
              <FRAPL02Document id={idAsesiSkemaSertifikasi} ref={componentRefFRAPL02Document} />
            )}
            {!!isObservasiAktivitasTempatKerjaSelesai && (
              <FRIA01Document id={idAsesiSkemaSertifikasi} ref={componentRefFRIA01Document} />
            )}
            {!!isPraktikDemonstrasiSelesai && (
              <FRIA02Document id={idAsesiSkemaSertifikasi} ref={componentRefFRIA02Document} />
            )}
            {!!isPertanyaanObservasiSelesai && (
              <FRIA03Document id={idAsesiSkemaSertifikasi} ref={componentRefFRIA03Document} />
            )}
            {!!isProyekTerkaitPekerjaanSelesai && (
              <FRIA04Document id={idAsesiSkemaSertifikasi} ref={componentRefFRIA04Document} />
            )}
            {!!isPertanyaanTertulisPilihanGandaSelesai && (
              <>
                <FRIA05ADocument id={idAsesiSkemaSertifikasi} ref={componentRefFRIA05ADocument} />
                <FRIA05BDocument id={idAsesiSkemaSertifikasi} ref={componentRefFRIA05BDocument} />
                <FRIA05CDocument id={idAsesiSkemaSertifikasi} ref={componentRefFRIA05CDocument} />
              </>
            )}
            {!!isEvaluasiPertanyaanTertulisEsaiSelesai && (
              <>
                <FRIA06ADocument id={idAsesiSkemaSertifikasi} ref={componentRefFRIA06ADocument} />
                <FRIA06BDocument id={idAsesiSkemaSertifikasi} ref={componentRefFRIA06BDocument} />
                <FRIA06CDocument id={idAsesiSkemaSertifikasi} ref={componentRefFRIA06CDocument} />
              </>
            )}
            {!!isPertanyaanLisanSelesai && (
              <FRIA07Document id={idAsesiSkemaSertifikasi} ref={componentRefFRIA07Document} />
            )}
            {!!isVerifikasiPortofolioSelesai && (
              <FRIA08Document id={idAsesiSkemaSertifikasi} ref={componentRefFRIA08Document} />
            )}
          </div>
        </div>
      </section>
    );
  } else if (!idAsesiSkemaSertifikasi) {
    return <Navigate to="/uji-kompetensi" />;
  }
};
