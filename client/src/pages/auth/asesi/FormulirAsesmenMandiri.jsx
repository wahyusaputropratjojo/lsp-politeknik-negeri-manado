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

export const FormulirAsesmenMandiriDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [skemaSertifikasiData, setSkemaSertifikasiData] = useState(null);
  const [isAsesmenMandiriSelesai, setIsAsesmenMandiriSelesai] = useState(false);
  const [unitKompetensiData, setUnitKompetensiData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [idAsesiSkemaSertifikasi, setIdAsesiSkemaSertifikasi] = useState(id);

  const form = useForm({
    defaultValues: {
      asesmen_mandiri: [],
    },
  });

  useQuery({
    queryKey: ["asesi-skema-sertifikasi", id],
    queryFn: async () => {
      return await axios.get(`/asesi/skema-sertifikasi/${id}`);
    },
    onSuccess: (data) => {
      setIsAsesmenMandiriSelesai(data.data.data.is_asesmen_mandiri_selesai);
    },
  });

  const { isLoading, isSuccess } = useQuery({
    queryKey: ["aktivitas-unit-kompetensi", id],
    queryFn: async () => {
      return await axios.get(
        `/asesi/skema-sertifikasi/${id}/aktivitas-unit-kompetensi`,
      );
    },
    onSuccess: (data) => {
      setSkemaSertifikasiData(data.data.data.skema_sertifikasi);
      setUnitKompetensiData(data.data.data.skema_sertifikasi.unit_kompetensi);
    },
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await axios.patch(`/asesi/skema-sertifikasi/${id}`, {
        is_asesmen_mandiri_selesai: true,
      });
    },
    onSuccess: (data) => {
      console.log(data);

      navigate("/asesmen-mandiri", { replace: true });
    },
  });

  const { mutate: mutateAsesmenMandiri } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`/asesi/asesmen-mandiri`, data);
    },
    onSuccess: (data) => {
      console.log(data);

      mutate();
    },
  });

  const mergeAktivitasUnitKompetensi = (data) => {
    // Step 1: Extract all "aktivitas_unit_kompetensi" arrays
    const aktivitasUnitKompetensiArrays = data.asesmen_mandiri.map(
      (item) => item.aktivitas_unit_kompetensi,
    );

    // Step 2: Merge all arrays into a single array
    const mergedAktivitasUnitKompetensi = [].concat(
      ...aktivitasUnitKompetensiArrays,
    );

    return mergedAktivitasUnitKompetensi;
  };

  const onSubmit = (data) => {
    const asesmen_mandiri = mergeAktivitasUnitKompetensi(data);
    // console.log(asesmen_mandiri);

    try {
      mutateAsesmenMandiri({
        asesmen_mandiri,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setOpenDialog(false);
    }
  };

  if (
    isSuccess &&
    skemaSertifikasiData &&
    unitKompetensiData &&
    !isAsesmenMandiriSelesai
  ) {
    return (
      <>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col">
            <h1 className="font-anek-latin text-xl font-semibold uppercase">
              Formulir
            </h1>
            <p className="font-anek-latin text-4xl font-semibold uppercase">
              Asesmen Mandiri
            </p>
            <p className="font-aileron text-sm">FR.APL.02</p>
          </div>
          <div className="flex flex-col gap-12 rounded-lg bg-white p-8">
            <div className="flex gap-8">
              <div>
                <p className="text-xs font-bold leading-none">
                  Kode Skema Sertifikasi
                </p>
                <p className="text-sm">
                  {skemaSertifikasiData.kode_skema_sertifikasi}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold leading-none">
                  Nama Skema Sertifikasi
                </p>
                <p className="text-sm">
                  {skemaSertifikasiData.nama_skema_sertifikasi}
                </p>
              </div>
            </div>
            <div>
              <Form {...form}>
                <form>
                  <div className="flex flex-col gap-12">
                    {unitKompetensiData &&
                      unitKompetensiData.map((value, indexUnitKompetensi) => {
                        const {
                          id,
                          kode_unit_kompetensi: kodeUnitKompetensi,
                          nama_unit_kompetensi: namaUnitKompetensi,
                          aktivitas_unit_kompetensi: aktivitasUnitKompetensi,
                        } = value;

                        return (
                          <div key={id}>
                            <div>
                              <div className="flex flex-col items-start justify-start">
                                <p className="text-xs font-bold leading-none">
                                  {kodeUnitKompetensi}
                                </p>
                                <p className="text-left text-lg leading-normal">
                                  {namaUnitKompetensi}
                                </p>
                              </div>
                            </div>
                            <div className="py-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="w-0 text-base">
                                      No.
                                    </TableHead>
                                    <TableHead className="w-10/12 text-base">
                                      Dapatkah Saya...?
                                    </TableHead>
                                    <TableHead className="w-2/12 text-center text-base">
                                      Kompeten...?
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {aktivitasUnitKompetensi &&
                                    aktivitasUnitKompetensi.map(
                                      (value, indexAktivitasUnitKompetensi) => {
                                        const {
                                          id,
                                          elemen,
                                          kriteria_unjuk_kerja:
                                            kriteriaUnjukKerja,
                                        } = value;

                                        form.setValue(
                                          `asesmen_mandiri.${indexUnitKompetensi}.aktivitas_unit_kompetensi.${indexAktivitasUnitKompetensi}.id_aktivitas_unit_kompetensi`,
                                          id,
                                        );

                                        form.setValue(
                                          `asesmen_mandiri.${indexUnitKompetensi}.aktivitas_unit_kompetensi.${indexAktivitasUnitKompetensi}.id_asesi_skema_sertifikasi`,
                                          idAsesiSkemaSertifikasi,
                                        );

                                        form.register(
                                          `asesmen_mandiri.${indexUnitKompetensi}.aktivitas_unit_kompetensi.${indexAktivitasUnitKompetensi}.is_kompeten`,
                                          { value: false },
                                        );

                                        return (
                                          <TableRow key={id}>
                                            <TableCell>
                                              <div>
                                                <p className="text-base">
                                                  {indexAktivitasUnitKompetensi +
                                                    1}
                                                </p>
                                              </div>
                                            </TableCell>
                                            <TableCell>
                                              <div>
                                                <p className="text-base">
                                                  {elemen}
                                                </p>
                                              </div>
                                              {kriteriaUnjukKerja &&
                                                kriteriaUnjukKerja.map(
                                                  (value, index) => {
                                                    const { id, kriteria } =
                                                      value;
                                                    return (
                                                      <ul
                                                        key={id}
                                                        className="ml-4 list-disc text-base"
                                                      >
                                                        <li>{kriteria}</li>
                                                      </ul>
                                                    );
                                                  },
                                                )}
                                            </TableCell>
                                            <TableCell>
                                              <div className="grid items-center justify-center">
                                                <FormField
                                                  control={form.control}
                                                  name={`asesmen_mandiri.${indexUnitKompetensi}.aktivitas_unit_kompetensi.${indexAktivitasUnitKompetensi}.is_kompeten`}
                                                  render={({ field }) => (
                                                    <FormItem>
                                                      <FormControl>
                                                        <Checkbox
                                                          checked={field.value}
                                                          onCheckedChange={(
                                                            checked,
                                                          ) => {
                                                            checked
                                                              ? field.onChange(
                                                                  true,
                                                                )
                                                              : field.onChange(
                                                                  false,
                                                                );
                                                          }}
                                                        />
                                                      </FormControl>
                                                      <FormMessage />
                                                    </FormItem>
                                                  )}
                                                />
                                              </div>
                                            </TableCell>
                                          </TableRow>
                                        );
                                      },
                                    )}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </form>
              </Form>
            </div>
            <div>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full">Selesai</Button>
                </DialogTrigger>
                <DialogContent className="w-96 bg-white">
                  <DialogHeader>
                    <DialogTitle>
                      <div className="flex flex-col items-center gap-2">
                        <AnnotationAlert className="text-5xl text-secondary-500" />
                        <p className="font-anek-latin text-xl">
                          Asesmen Mandiri
                        </p>
                      </div>
                    </DialogTitle>
                    <DialogDescription>
                      <p className="py-4 text-sm">
                        Harap diingat bahwa setelah tindakan ini dilakukan,
                        tidak akan ada kesempatan untuk mengulanginya. Apakah
                        Anda yakin?
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <div className="w-full">
                      <Button
                        size="sm"
                        type="submit"
                        onClick={form.handleSubmit(onSubmit)}
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
        </section>
      </>
    );
  } else if (isAsesmenMandiriSelesai) {
    return (
      <section className="flex flex-col gap-8">
        <div className="flex flex-col">
          <h1 className="font-anek-latin text-xl font-semibold uppercase">
            Formulir
          </h1>
          <p className="font-anek-latin text-4xl font-semibold uppercase">
            Asesmen Mandiri
          </p>
          <p className="font-aileron text-sm">FR.APL.02</p>
        </div>
        <div className="flex min-h-[32rem] flex-col items-center justify-center gap-2 rounded-lg bg-white">
          <CheckCircle className="text-5xl text-success-500" />
          <p className="font-aileron text-2xl font-bold">Selesai</p>
        </div>
      </section>
    );
  }
};
