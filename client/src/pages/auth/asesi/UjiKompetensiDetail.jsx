import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import axios from "../../../utils/axios";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../../../components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import CheckCircle from "../../../assets/icons/untitled-ui-icons/line/components/CheckCircle";

export const UjiKompetensiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [skemaSertifikasiData, setSkemaSertifikasiData] = useState(null);

  const { isLoading, isSuccess } = useQuery({
    queryKey: ["aktivitas-unit-kompetensi", id],
    queryFn: async () => {
      return await axios.get(
        `/asesi/skema-sertifikasi/${id}/aktivitas-unit-kompetensi`,
      );
    },
    onSuccess: (data) => {
      setSkemaSertifikasiData(data.data.data);
    },
  });

  if (skemaSertifikasiData) {
    const {
      tujuan_asesmen: tujuanAsesmen,
      skema_sertifikasi: skemaSertifikasi,
    } = skemaSertifikasiData;

    const { tujuan } = tujuanAsesmen;

    const { gambar, nama_skema_sertifikasi: namaSkemaSertifikasi } =
      skemaSertifikasi;

    return (
      <section className="flex flex-col gap-8">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Uji Kompetensi
          </h1>
          <p>Uji Kompetensi</p>
        </div>
        <div className="relative">
          <div className="relative top-16 z-10 -mt-16 ml-6 w-max rounded-lg bg-white px-6 pt-6">
            <img
              src={gambar}
              alt="Gambar Skema Sertifikasi"
              className="aspect-square w-40 rounded-lg bg-white object-cover"
            />
          </div>
          <div className="bottom-16 flex w-full gap-6 rounded-lg bg-white p-12 pt-6">
            <div className="mt-16 flex w-9/12 flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-xs font-bold leading-none">
                    Skema Sertifikasi
                  </p>
                  <p className="text-sm">{namaSkemaSertifikasi}</p>
                </div>
                <div>
                  <p className="text-xs font-bold leading-none">
                    Tujuan Asesmen
                  </p>
                  <p className="text-sm">{tujuan}</p>
                </div>
              </div>
              <div>Pertanyaan Tertulis</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};
