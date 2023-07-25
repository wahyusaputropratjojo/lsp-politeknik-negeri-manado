import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { stringify, v4 as uuid } from "uuid";
import axios from "../../utils/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/ui/form";
import {
  FormSkemaSertifikasi,
  FormUnitKompetensi,
  FormAktivitasUnitKompetensi,
  FormPertanyaanEsai,
  FormPertanyaanLisan,
  FormPertanyaanObservasi,
  FormPertanyaanTertulis,
} from "./form";

import ChevronRight from "../../assets/icons/untitled-ui-icons/line/components/ChevronRight";
import ChevronLeft from "../../assets/icons/untitled-ui-icons/line/components/ChevronLeft";

export const SkemaSertifikasiForm = () => {
  const navigate = useNavigate();
  const [formPage, setFormPage] = useState(0);

  const { error, isError, isSuccess, mutate } = useMutation({
    mutationFn: async (data) =>
      await axios.post(
        "/skema-sertifikasi/unit-kompetensi/aktivitas-unit-kompetensi/all",
        data,
      ),
  });

  const onSubmit = (data) => {
    const { nama_skema_sertifikasi, kode_skema_sertifikasi, unit_kompetensi } =
      data;

    const destructureUnitKompetensi = unit_kompetensi.map(
      ({ id, ...rest }) => rest,
    );

    mutate({
      nama_skema_sertifikasi,
      kode_skema_sertifikasi,
      unit_kompetensi: destructureUnitKompetensi,
    });

    if (isSuccess) {
      navigate("/skema-sertifikasi");
    }
  };

  const defaultValues = {
    nama_skema_sertifikasi: "",
    kode_skema_sertifikasi: "",
    unit_kompetensi: [
      {
        id: uuid(),
        kode_unit_kompetensi: "",
        nama_unit_kompetensi: "",
        aktivitas_unit_kompetensi: [
          {
            elemen: "",
            kriteria_unjuk_kerja: [
              {
                kriteria_unjuk_kerja: "",
              },
            ],
          },
        ],
        pertanyaan_tertulis: [
          {
            pertanyaan: "",
            jawaban_pertanyaan_tertulis: [
              {
                jawaban: "",
                benar: false,
              },
              {
                jawaban: "",
                benar: false,
              },
              {
                jawaban: "",
                benar: false,
              },
              {
                jawaban: "",
                benar: false,
              },
            ],
          },
        ],
        pertanyaan_esai: [
          {
            pertanyaan: "",
            jawaban: "",
          },
        ],
        pertanyaan_lisan: [
          {
            pertanyaan: "",
            jawaban: "",
          },
        ],
        pertanyaan_observasi: [
          {
            pertanyaan: "",
          },
        ],
      },
    ],
  };

  const form = useForm({
    mode: "onSubmit",
    defaultValues,
  });

  return (
    <>
      <div className="relative flex flex-col gap-12">
        <header className="flex flex-col gap-2">
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Buat Skema Sertifikasi
          </h1>
          <p className="font-aileron text-secondary-500">
            Membuat Skema Sertifikasi Baru
          </p>
        </header>
        <article>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-12"
            >
              {formPage === 0 ? (
                <div className="flex flex-col gap-12">
                  <FormSkemaSertifikasi form={form} />
                  <FormUnitKompetensi form={form} />
                </div>
              ) : formPage === 1 ? (
                <FormAktivitasUnitKompetensi form={form} />
              ) : formPage === 2 ? (
                <FormPertanyaanTertulis form={form} />
              ) : formPage === 3 ? (
                <FormPertanyaanEsai form={form} />
              ) : formPage === 4 ? (
                <FormPertanyaanLisan form={form} />
              ) : formPage === 5 ? (
                <FormPertanyaanObservasi form={form} />
              ) : undefined}
              <div className="flex justify-between gap-8">
                <Button
                  type="button"
                  className=""
                  disabled={formPage === 0}
                  onClick={() => {
                    setFormPage((currentFormPage) => currentFormPage - 1);
                  }}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  type="submit"
                  disabled={formPage < 5}
                  className="w-full"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  className=""
                  disabled={formPage === 5}
                  onClick={() => {
                    setFormPage((currentFormPage) => currentFormPage + 1);
                  }}
                >
                  <ChevronRight />
                </Button>
              </div>
            </form>
          </Form>
          <DevTool control={form.control} />
        </article>
      </div>
    </>
  );
};
