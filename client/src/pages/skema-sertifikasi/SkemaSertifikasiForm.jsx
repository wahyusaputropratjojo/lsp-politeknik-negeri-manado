import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { v4 as uuid } from "uuid";
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

export const SkemaSertifikasiForm = () => {
  const [formPage, setFormPage] = useState(0);
  const [aktivitas, setAktivitas] = useState([]);

  const onSubmit = (data) => {
    console.log(data);
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
              className="flex flex-col gap-12"
              onSubmit={form.handleSubmit(onSubmit)}
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
              <div className="flex w-full gap-4">
                <Button
                  className="w-full"
                  disabled={formPage === 0}
                  onClick={() => {
                    setFormPage((currentFormPage) => currentFormPage - 1);
                  }}
                >
                  Sebelumnya
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    if (formPage === 5) {
                      alert("submit");
                    } else {
                      setFormPage((currentFormPage) => currentFormPage + 1);
                    }
                  }}
                >
                  {formPage === 5 ? "Selesai" : "Selanjutnya"}
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
