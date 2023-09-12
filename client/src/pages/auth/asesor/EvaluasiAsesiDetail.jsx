// Packages
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
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

// Utils
import axios from "../../../utils/axios";
import { cn } from "../../../utils/cn";

// Assets
import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import InfoCircle from "../../../assets/icons/untitled-ui-icons/line/components/InfoCircle";
import CheckCircle from "../../../assets/icons/untitled-ui-icons/line/components/CheckCircle";
import XCircle from "../../../assets/icons/untitled-ui-icons/line/components/XCircle";
import Printer from "../../../assets/icons/untitled-ui-icons/line/components/Printer";

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
  const [isDialogOpenThree, setIsDialogOpenThree] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);
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
      is_portofolio: false,
      is_uji_tertulis: false,
      // is_wawancara: false,
    },
    resolver: yupResolver(
      yup
        .object()
        .shape({
          is_praktik_demonstrasi: yup.boolean(),
          is_portofolio: yup.boolean(),
          is_uji_tertulis: yup.boolean(),
          // is_wawancara: yup.boolean(),
        })
        .test("at-least-one-checked", "Setidaknya 1 metode pengujian dipilih", (object) => {
          // const { is_praktik_demonstrasi, is_portofolio, is_uji_tertulis, is_wawancara } = object;
          // return is_praktik_demonstrasi || is_portofolio || is_uji_tertulis || is_wawancara;
          const { is_praktik_demonstrasi, is_portofolio, is_uji_tertulis } = object;
          return is_praktik_demonstrasi || is_portofolio || is_uji_tertulis;
        }),
    ),
  });

  useQuery({
    queryKey: ["kompetensi-asesmen-mandiri", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}/kompetensi-asesmen-mandiri`,
      );
    },
    onSuccess: (data) => {
      setTotalKompetenFRAPL02(data.data.data.total_kompeten);
      setTotalElemenFRAPL02(data.data.data.total_elemen);
    },
  });

  useQuery({
    queryKey: ["kompetensi-observasi-tempat-kerja", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}/kompetensi-observasi-tempat-kerja`,
      );
    },
    onSuccess: (data) => {
      setTotalKompetenFRIA01(data.data.data.total_kompeten);
      setTotalElemenFRIA01(data.data.data.total_elemen);
    },
  });

  useQuery({
    queryKey: ["kompetensi-pertanyaan-observasi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}/kompetensi-pertanyaan-observasi`,
      );
    },
    onSuccess: (data) => {
      setTotalKompetenFRIA03(data.data.data.total_kompeten);
      setTotalPertanyaanObservasiFRIA03(data.data.data.total_pertanyaan_observasi);
    },
  });

  useQuery({
    queryKey: ["kompetensi-pertanyaan-tertulis-pilihan-ganda", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}/kompetensi-pertanyaan-tertulis-pilihan-ganda`,
      );
    },
    onSuccess: (data) => {
      setTotalKompetenFRIA05(data.data.data.total_kompeten);
      setTotalPertanyaanTertulisPilihanGandaFRIA05(
        data.data.data.total_pertanyaan_tertulis_pilihan_ganda,
      );
    },
  });

  useQuery({
    queryKey: ["kompetensi-pertanyaan-tertulis-pilihan-ganda", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}/kompetensi-pertanyaan-tertulis-pilihan-ganda`,
      );
    },
    onSuccess: (data) => {
      setTotalKompetenFRIA05(data.data.data.total_kompeten);
      setTotalPertanyaanTertulisPilihanGandaFRIA05(
        data.data.data.total_pertanyaan_tertulis_pilihan_ganda,
      );
    },
  });

  useQuery({
    queryKey: ["kompetensi-pertanyaan-tertulis-esai", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}/kompetensi-pertanyaan-tertulis-esai`,
      );
    },
    onSuccess: (data) => {
      setTotalKompetenFRIA06(data.data.data.total_kompeten);
      setTotalPertanyaanTertulisEsaiFRIA06(data.data.data.total_pertanyaan_tertulis_esai);
    },
  });

  useQuery({
    queryKey: ["kompetensi-pertanyaan-lisan", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}/kompetensi-pertanyaan-lisan`,
      );
    },
    onSuccess: (data) => {
      setTotalKompetenFRIA07(data.data.data.total_kompeten);
      setTotalPertanyaanLisanFRIA07(data.data.data.total_pertanyaan_lisan);
    },
  });

  useQuery({
    queryKey: ["kompetensi-portofolio", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(
        `/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}/kompetensi-portofolio`,
      );
    },
    onSuccess: (data) => {
      setTotalPortofolioFRIA08(data.data.data.total_portofolio);
      setTotalAsliFRIA08(data.data.data.total_is_asli);
      setTotalMemadaiFRIA08(data.data.data.total_is_memadai);
      setTotalTerkiniFRIA08(data.data.data.total_is_terkini);
      setTotalValidFRIA08(data.data.data.total_is_valid);
    },
  });

  const { refetch } = useQuery({
    queryKey: ["asesi", idAsesiSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(`/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}`);
    },
    onSuccess: (data) => {
      setAsesiData(data.data.data);
      setNamaAsesi(data.data.data.asesi.user.nama_lengkap);
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      return await axios.patch(
        `/asesor/tempat-uji-kompetensi/asesi/${idAsesiSkemaSertifikasi}`,
        data,
      );
    },
    onSuccess: (data) => {
      refetch();
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
      setIsDialogOpenThree(false);
    }
  };

  const onSubmitFormToggleMetodePengujian = (data) => {
    try {
      console.log(data);
      mutate({ ...data, is_metode_pengujian: true });
      // setIsRefetch(true);
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

  const isPraktikDemonstrasiValue = useWatch({
    control: formToggleMetodePengujian.control,
    name: "is_praktik_demonstrasi",
  });

  const isPortofolioValue = useWatch({
    control: formToggleMetodePengujian.control,
    name: "is_portofolio",
  });

  const isUjiTertulisValue = useWatch({
    control: formToggleMetodePengujian.control,
    name: "is_uji_tertulis",
  });

  const isWawancaraValue = useWatch({
    control: formToggleMetodePengujian.control,
    name: "is_wawancara",
  });

  if (!!asesiData && !!idAsesiSkemaSertifikasi) {
    const {
      is_asesmen_mandiri_selesai: isAsesmenMandiriSelesai,
      is_asesmen_mandiri: isAsesmenMandiri,
      is_metode_pengujian: isMetodePengujian,
      is_observasi_aktivitas_tempat_kerja_selesai: isObservasiAktivitasTempatKerjaSelesai,
      is_pertanyaan_lisan_selesai: isPertanyaanLisanSelesai,
      is_pertanyaan_observasi_selesai: isPertanyaanObservasiSelesai,
      is_pertanyaan_tertulis_esai_selesai: isPertanyaanTertulisEsaiSelesai,
      is_pertanyaan_tertulis_pilihan_ganda_selesai: isPertanyaanTertulisPilihanGandaSelesai,
      is_pertanyaan_tertulis: isPertanyaanTertulis,
      is_praktik_demonstrasi_selesai: isPraktikDemonstrasiSelesai,
      is_punya_asesor: isPunyaAsesor,
      is_verifikasi_berkas: isVerifikasiBerkas,
      is_verifikasi_portofolio_selesai: isVerifikasiPortofolioSelesai,
      is_proyek_terkait_pekerjaan_selesai: isProyekTerkaitPekerjaanSelesai,
      is_evaluasi_pertanyaan_tertulis_esai_selesai: isEvaluasiPertanyaanTertulisEsaiSelesai,
      is_evaluasi_asesi_selesai: isEvaluasiAsesiSelesai,
      is_tidak_kompeten: isTidakKompeten,
      is_praktik_demonstrasi: isPraktikDemonstrasi,
      is_portofolio: isPortofolio,
      is_uji_tertulis: isUjiTertulis,
      is_wawancara: isWawancara,
      asesi: {
        data_diri: {
          nik,
          negara: { nama: namaNegara },
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

    const isMetodePraktikDemonstrasi =
      !!isPraktikDemonstrasi &&
      !!isObservasiAktivitasTempatKerjaSelesai &&
      !!isPraktikDemonstrasiSelesai &&
      !!isPertanyaanObservasiSelesai &&
      !!isProyekTerkaitPekerjaanSelesai &&
      !isPortofolio &&
      !isVerifikasiPortofolioSelesai &&
      !isUjiTertulis &&
      !isPertanyaanTertulisPilihanGandaSelesai &&
      !isPertanyaanTertulisEsaiSelesai &&
      !isPertanyaanLisanSelesai;

    const isMetodePortofolio =
      !isPraktikDemonstrasi &&
      !isObservasiAktivitasTempatKerjaSelesai &&
      !isPraktikDemonstrasiSelesai &&
      !isPertanyaanObservasiSelesai &&
      !isProyekTerkaitPekerjaanSelesai &&
      !!isPortofolio &&
      !!isVerifikasiPortofolioSelesai &&
      !isUjiTertulis &&
      !isPertanyaanTertulisPilihanGandaSelesai &&
      !isPertanyaanTertulisEsaiSelesai &&
      !isPertanyaanLisanSelesai;

    const isMetodeUjiTertulis =
      !isPraktikDemonstrasi &&
      !isObservasiAktivitasTempatKerjaSelesai &&
      !isPraktikDemonstrasiSelesai &&
      !isPertanyaanObservasiSelesai &&
      !isProyekTerkaitPekerjaanSelesai &&
      !isPortofolio &&
      !isVerifikasiPortofolioSelesai &&
      !!isUjiTertulis &&
      !!isPertanyaanTertulisPilihanGandaSelesai &&
      !!isPertanyaanTertulisEsaiSelesai &&
      !!isPertanyaanLisanSelesai;

    const isMetodePraktikDemonstrasiAndMetodePortofolio =
      !!isPraktikDemonstrasi &&
      !!isObservasiAktivitasTempatKerjaSelesai &&
      !!isPraktikDemonstrasiSelesai &&
      !!isPertanyaanObservasiSelesai &&
      !!isProyekTerkaitPekerjaanSelesai &&
      !!isPortofolio &&
      !!isVerifikasiPortofolioSelesai &&
      !isUjiTertulis &&
      !isPertanyaanTertulisPilihanGandaSelesai &&
      !isPertanyaanTertulisEsaiSelesai &&
      !isPertanyaanLisanSelesai;

    const isMetodePortofolioAndMetodeUjiTertulis =
      !isPraktikDemonstrasi &&
      !isObservasiAktivitasTempatKerjaSelesai &&
      !isPraktikDemonstrasiSelesai &&
      !isPertanyaanObservasiSelesai &&
      !isProyekTerkaitPekerjaanSelesai &&
      !!isPortofolio &&
      !!isVerifikasiPortofolioSelesai &&
      !!isUjiTertulis &&
      !!isPertanyaanTertulisPilihanGandaSelesai &&
      !!isPertanyaanTertulisEsaiSelesai &&
      !!isPertanyaanLisanSelesai;

    const isMetodeUjiTertulisAndMetodePraktikDemonstrasi =
      !!isPraktikDemonstrasi &&
      !!isObservasiAktivitasTempatKerjaSelesai &&
      !!isPraktikDemonstrasiSelesai &&
      !!isPertanyaanObservasiSelesai &&
      !!isProyekTerkaitPekerjaanSelesai &&
      !isPortofolio &&
      !isVerifikasiPortofolioSelesai &&
      !!isUjiTertulis &&
      !!isPertanyaanTertulisPilihanGandaSelesai &&
      !!isPertanyaanTertulisEsaiSelesai &&
      !!isPertanyaanLisanSelesai;

    const isMetodePraktikDemonstrasiAndMetodePortofolioAndMetodeUjiTertulis =
      !!isPraktikDemonstrasi &&
      !!isObservasiAktivitasTempatKerjaSelesai &&
      !!isPraktikDemonstrasiSelesai &&
      !!isPertanyaanObservasiSelesai &&
      !!isProyekTerkaitPekerjaanSelesai &&
      !!isPortofolio &&
      !!isVerifikasiPortofolioSelesai &&
      !!isUjiTertulis &&
      !!isPertanyaanTertulisPilihanGandaSelesai &&
      !!isPertanyaanTertulisEsaiSelesai &&
      !!isPertanyaanLisanSelesai;

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
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex flex-col gap-4">
                  <div className="w-max rounded-lg bg-white p-6 shadow-lg">
                    <img
                      src={urlProfilUser}
                      alt="Foto Profil"
                      className="aspect-square w-56 rounded-lg bg-white object-cover"
                    />
                  </div>
                  <div className="relative flex w-full gap-6 rounded-lg bg-white p-12 shadow-lg">
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
                                                        className="aspect-[3/4] w-20 rounded-lg border-2 border-secondary-200 object-cover"
                                                      />
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                      <img
                                                        src={value.url_file_portofolio}
                                                        alt={`Gambar Portofolio ${keterangan}`}
                                                        className="h-[80vh] w-[80vh] rounded-lg border-2 border-secondary-200 object-contain"
                                                      />
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
                    <div className="mt-16 flex w-3/12 flex-shrink-0 flex-col gap-8 rounded-lg bg-secondary-500 p-6 text-white">
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
                                    open={isDialogOpenThree}
                                    onOpenChange={setIsDialogOpenThree}>
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
                                              Aktifkan Asesmen Mandiri
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
                      {!!isAsesmenMandiri && !!isAsesmenMandiriSelesai && (
                        <div className="flex flex-col gap-2">
                          <p className="font-bold">Metode Pengujian</p>
                          <div className="flex flex-col gap-2">
                            <Form {...formToggleMetodePengujian}>
                              <form>
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center justify-between">
                                    <p>Praktik Demonstrasi</p>
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
                                  <div className="flex items-center justify-between">
                                    <p>Uji Tertulis</p>
                                    <FormField
                                      control={formToggleMetodePengujian.control}
                                      name="is_uji_tertulis"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Switch
                                              disabled={isMetodePengujian}
                                              checked={field.value || isUjiTertulis}
                                              onCheckedChange={field.onChange}
                                              className="data-[state=unchecked]:bg-secondary-100"
                                            />
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                  {/* <div className="flex items-center justify-between">
                                    <p>Wawancara</p>
                                    <FormField
                                      control={formToggleMetodePengujian.control}
                                      name="is_wawancara"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Switch
                                              disabled={isMetodePengujian}
                                              checked={field.value || isWawancara}
                                              onCheckedChange={field.onChange}
                                              className="data-[state=unchecked]:bg-secondary-100"
                                            />
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </div> */}
                                  {!isMetodePengujian && (
                                    <AlertDialog
                                      open={isDialogOpenTwo}
                                      onOpenChange={setIsDialogOpenTwo}>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          size="xs"
                                          disabled={
                                            !isPraktikDemonstrasiValue &&
                                            !isPortofolioValue &&
                                            !isUjiTertulisValue
                                            // &&
                                            // !isWawancaraValue
                                          }
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
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
                            <p className="text-xs font-bold leading-none">FR.APL.01</p>
                            <p className="text-base">Permohonan Sertifikasi Kompetensi</p>
                          </div>
                          {!!isAsesmenMandiriSelesai && (
                            <>
                              <div className="flex items-center gap-4">
                                <Button
                                  size="xs"
                                  className="gap-2"
                                  onClick={handlePrintFRAPL01Document}>
                                  <Printer className="text-base" />
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
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
                              <div className="flex items-center gap-4">
                                <div className="text-sm">
                                  <div className="flex flex-col items-center">
                                    <p className="font-bold">Kompeten</p>
                                    <div className="flex gap-2">
                                      <p>{totalKompetenFRAPL02}</p>
                                      <p>/</p>
                                      <p>{totalElemenFRAPL02}</p>
                                    </div>
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
                    {!!isPraktikDemonstrasi && (
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
                          {!isObservasiAktivitasTempatKerjaSelesai && !isTidakKompeten && (
                            <div className="flex flex-shrink-0 items-center">
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
                            </div>
                          )}
                        </div>
                        <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                          <div className="flex w-full items-center gap-6">
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
                                <p className="text-base">Tugas Praktik Demonstrasi</p>
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
                            <div className="flex flex-shrink-0 items-center">
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
                            </div>
                          )}
                        </div>
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
                          {!isPertanyaanObservasiSelesai && !isTidakKompeten && (
                            <div className="flex flex-shrink-0 items-center">
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
                            </div>
                          )}
                        </div>
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
                          {!isProyekTerkaitPekerjaanSelesai && !isTidakKompeten && (
                            <div className="flex flex-shrink-0 items-center">
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
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {!!isUjiTertulis && (
                      <>
                        <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                          <div className="flex w-full items-center gap-6">
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
                            <div className="flex w-full items-center justify-between">
                              <div>
                                <p className="text-xs font-bold leading-none">FR.IA.05</p>
                                <p className="text-base">Pertanyaan Tertulis Pilihan Ganda</p>
                              </div>
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
                                  <Button
                                    size="xs"
                                    className="gap-2"
                                    onClick={handlePrintFRIA05CDocument}>
                                    <Printer className="text-base" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          {!isPertanyaanTertulisPilihanGandaSelesai && !isTidakKompeten && (
                            <div className="flex flex-shrink-0 items-center">
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
                          )}
                        </div>
                        <div className="flex w-full justify-between rounded-lg bg-white p-6 shadow-lg">
                          <div className="flex w-full items-center gap-6">
                            {!!isTidakKompeten && (
                              <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-error-500 text-white">
                                <XCircle className="text-2xl" />
                              </div>
                            )}
                            {!isEvaluasiPertanyaanTertulisEsaiSelesai && !isTidakKompeten && (
                              <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-warning-500 text-white">
                                <InfoCircle className="text-2xl" />
                              </div>
                            )}
                            {!!isEvaluasiPertanyaanTertulisEsaiSelesai && !isTidakKompeten && (
                              <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success-500 text-white">
                                <CheckCircle className="text-2xl" />
                              </div>
                            )}
                            <div className="flex w-full items-center justify-between">
                              <div>
                                <p className="text-xs font-bold leading-none">FR.IA.06</p>
                                <p className="text-base">Pertanyaan Tertulis Esai</p>
                              </div>
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
                                  <Button
                                    size="xs"
                                    className="gap-2"
                                    onClick={handlePrintFRIA06CDocument}>
                                    <Printer className="text-base" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-shrink-0 items-center">
                            {!isEvaluasiPertanyaanTertulisEsaiSelesai &&
                              !!isPertanyaanTertulisEsaiSelesai &&
                              !isTidakKompeten && (
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
                          {!isPertanyaanLisanSelesai && !isTidakKompeten && (
                            <div className="flex flex-shrink-0 items-center">
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
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {!!isPortofolio && (
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
                          {!isVerifikasiPortofolioSelesai && !isTidakKompeten && (
                            <div className="flex flex-shrink-0 items-center">
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
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    {!!isWawancara && (
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
                                <p className="text-xs font-bold leading-none">FR.IA.09</p>
                                <p className="text-base">Pertanyaan Wawancara</p>
                              </div>
                              {!!isVerifikasiPortofolioSelesai && (
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
                              )}
                            </div>
                          </div>
                          {!isVerifikasiPortofolioSelesai && !isTidakKompeten && (
                            <div className="flex flex-shrink-0 items-center">
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
                            </div>
                          )}
                        </div>
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
                                <p className="text-xs font-bold leading-none">FR.IA.10</p>
                                <p className="text-base">Klarifikasi Bukti Pihak Ketiga</p>
                              </div>
                              {!!isVerifikasiPortofolioSelesai && (
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
                              )}
                            </div>
                          </div>
                          {!isVerifikasiPortofolioSelesai && !isTidakKompeten && (
                            <div className="flex flex-shrink-0 items-center">
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
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              {!!isAsesmenMandiriSelesai && !isEvaluasiAsesiSelesai && (
                <div className="flex gap-4 rounded-lg bg-white p-8 shadow-lg">
                  <AlertDialog open={isDialogOpenOne} onOpenChange={setIsDialogOpenOne}>
                    <AlertDialogTrigger
                      className={cn(buttonVariants({ variant: "error" }), "w-full")}>
                      Belum Kompeten
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          <div className="flex flex-col items-center gap-2">
                            <AnnotationAlert className="text-5xl text-secondary-500" />
                            <p className="font-anek-latin text-xl">Asesi Tidak Kompeten</p>
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
                                mutate({
                                  is_evaluasi_asesi_selesai: true,
                                  is_tidak_kompeten: true,
                                });
                                navigate("/evaluasi-asesi", { state: { is_refetch: true } });
                              }}>
                              Konfirmasi
                            </Button>
                          </AlertDialogAction>
                        </div>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {isMetodePraktikDemonstrasi ||
                  isMetodePortofolio ||
                  isMetodeUjiTertulis ||
                  isMetodePraktikDemonstrasiAndMetodePortofolio ||
                  isMetodePortofolioAndMetodeUjiTertulis ||
                  isMetodeUjiTertulisAndMetodePraktikDemonstrasi ||
                  isMetodePraktikDemonstrasiAndMetodePortofolioAndMetodeUjiTertulis ? (
                    <AlertDialog open={isDialogOpenTwo} onOpenChange={setIsDialogOpenTwo}>
                      <AlertDialogTrigger className={cn(buttonVariants(), "w-full")}>
                        Kompeten
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            <div className="flex flex-col items-center gap-2">
                              <AnnotationAlert className="text-5xl text-secondary-500" />
                              <p className="font-anek-latin text-xl">Asesi Kompeten</p>
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
                                  mutate({ is_evaluasi_asesi_selesai: true, is_kompeten: true });
                                  navigate("/evaluasi-asesi", { state: { is_refetch: true } });
                                }}>
                                Konfirmasi
                              </Button>
                            </AlertDialogAction>
                          </div>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : null}
                </div>
              )}
              <div style={{ display: "none" }}>
                <div className="bg-white p-12">
                  <FRAPL01Document id={idAsesiSkemaSertifikasi} ref={componentRefFRAPL01Document} />
                  {!!isAsesmenMandiriSelesai && (
                    <FRAPL02Document
                      id={idAsesiSkemaSertifikasi}
                      ref={componentRefFRAPL02Document}
                    />
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
                      <FRIA05ADocument
                        id={idAsesiSkemaSertifikasi}
                        ref={componentRefFRIA05ADocument}
                      />
                      <FRIA05BDocument
                        id={idAsesiSkemaSertifikasi}
                        ref={componentRefFRIA05BDocument}
                      />
                      <FRIA05CDocument
                        id={idAsesiSkemaSertifikasi}
                        ref={componentRefFRIA05CDocument}
                      />
                    </>
                  )}
                  {!!isEvaluasiPertanyaanTertulisEsaiSelesai && (
                    <>
                      <FRIA06ADocument
                        id={idAsesiSkemaSertifikasi}
                        ref={componentRefFRIA06ADocument}
                      />
                      <FRIA06BDocument
                        id={idAsesiSkemaSertifikasi}
                        ref={componentRefFRIA06BDocument}
                      />
                      <FRIA06CDocument
                        id={idAsesiSkemaSertifikasi}
                        ref={componentRefFRIA06CDocument}
                      />
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
              {/* <div className="bg-white p-12">
                <FRAPL01Document id={idAsesiSkemaSertifikasi} ref={componentRefFRAPL02Document} />
              </div> */}
            </div>
          </div>
        </section>
      </>
    );
  } else if (!idAsesiSkemaSertifikasi) {
    return <Navigate to="/evaluasi-asesi" />;
  }
};
