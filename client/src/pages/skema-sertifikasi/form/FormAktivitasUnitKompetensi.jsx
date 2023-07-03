import { useFieldArray } from "react-hook-form";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../components/ui/accordion";
import { Button } from "../../../components/ui/button";
import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";

import PlusSquare from "../../../assets/icons/untitled-ui-icons/line/components/PlusSquare";
import XCircle from "../../../assets/icons/untitled-ui-icons/line/components/XCircle";

export const FormAktivitasUnitKompetensi = ({ form }) => {
  const unitKompetensiList = form.getValues("unit_kompetensi");

  const unitKompetensi = unitKompetensiList.map((item, index) => (
    <div key={item.id}>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="flex flex-col">
          <AccordionTrigger className="rounded-lg font-aileron">
            <div className="flex flex-col items-start">
              <p className="text-sm">Unit Kompetensi :</p>
              <p className="text-xl">{item.nama_unit_kompetensi}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <AktivitasUnitKompetensi indexUnitKompetensi={index} form={form} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ));

  return (
    <>
      <div className="flex flex-col gap-8 rounded-lg bg-white p-12">
        <h2 className="font-anek-latin text-2xl font-semibold text-secondary-500">
          Aktivitas Unit Kompetensi
        </h2>
        <div className="flex flex-col gap-12">{unitKompetensi}</div>
      </div>
    </>
  );
};

const AktivitasUnitKompetensi = ({ indexUnitKompetensi, form }) => {
  const { fields, remove, prepend, append } = useFieldArray({
    name: `unit_kompetensi.${indexUnitKompetensi}.aktivitas_unit_kompetensi`,
    control: form.control,
  });

  const aktivitasUnitKompetensiFields = fields.map((field, index) => {
    return (
      <div
        key={field.id}
        className="relative flex flex-col gap-8 rounded-lg border-2 border-secondary-300 p-12"
      >
        <div className="flex flex-col gap-1">
          <p className="font-aileron text-secondary-300 transition-colors hover:text-secondary-400">
            Elemen
          </p>
          <FormField
            control={form.control}
            name={`unit_kompetensi.${indexUnitKompetensi}.aktivitas_unit_kompetensi.${index}.elemen`}
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute -left-2 top-1 -translate-x-full">
                  {index + 1}
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <KriteriaUnjukKerja
          form={form}
          indexUnitKompetensi={indexUnitKompetensi}
          indexAktivitasUnitKompetensi={index}
        />
        {index > 0 && (
          <button
            className="absolute right-1 top-1 rounded-lg bg-error-50 p-1 text-xl text-error-500 transition-colors hover:bg-error-100"
            onClick={() => remove(index)}
          >
            <XCircle />
          </button>
        )}
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-12">
        {aktivitasUnitKompetensiFields}
      </div>
      <Button
        className="col-span-1 col-start-10"
        onClick={() =>
          append({
            elemen: "",
            kriteria_unjuk_kerja: [
              {
                kriteria_unjuk_kerja: "",
              },
            ],
          })
        }
      >
        <PlusSquare className="text-2xl" />
      </Button>
    </div>
  );
};

const KriteriaUnjukKerja = ({
  indexUnitKompetensi,
  indexAktivitasUnitKompetensi,
  form,
}) => {
  const { fields, remove, append } = useFieldArray({
    name: `unit_kompetensi.${indexUnitKompetensi}.aktivitas_unit_kompetensi.${indexAktivitasUnitKompetensi}.kriteria_unjuk_kerja`,
    control: form.control,
  });

  const kriteriaUnjukKerjaFields = fields.map((field, index) => {
    return (
      <>
        <div key={field.id} className="relative">
          <div className="flex flex-col gap-1">
            <p className="font-aileron text-secondary-300 transition-colors hover:text-secondary-400">
              Kriteria Unjuk Kerja
            </p>
            <FormField
              control={form.control}
              name={`unit_kompetensi.${indexUnitKompetensi}.aktivitas_unit_kompetensi.${indexAktivitasUnitKompetensi}.kriteria_unjuk_kerja.${index}.kriteria_unjuk_kerja`}
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -left-2 top-1 -translate-x-full">
                    {indexAktivitasUnitKompetensi + 1}.{index + 1}
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {index > 0 && (
            <button
              className="absolute -right-2 top-1 translate-x-full rounded-lg bg-error-50 p-1 text-xl text-error-500 transition-colors hover:bg-error-100"
              onClick={() => remove(index)}
            >
              <XCircle />
            </button>
          )}
          {index === fields.length - 1 && (
            <button
              className="absolute -right-2 bottom-1 translate-x-full rounded-lg bg-primary-500 p-1 text-xl text-secondary-500 transition-colors hover:bg-primary-600 focus:bg-primary-700"
              onClick={() =>
                append({
                  kriteria_unjuk_kerja: "",
                })
              }
            >
              <PlusSquare />
            </button>
          )}
        </div>
      </>
    );
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-8">{kriteriaUnjukKerjaFields}</div>
    </div>
  );
};
