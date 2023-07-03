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
import { Textarea } from "../../../components/ui/textarea";

import PlusSquare from "../../../assets/icons/untitled-ui-icons/line/components/PlusSquare";
import XCircle from "../../../assets/icons/untitled-ui-icons/line/components/XCircle";

export const FormPertanyaanLisan = ({ form }) => {
  const unitKompetensiList = form.getValues("unit_kompetensi");

  const unitKompetensi = unitKompetensiList.map((item, index) => (
    <div key={item.id}>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="rounded-lg font-aileron">
            <div className="flex flex-col items-start">
              <p className="text-sm">Unit Kompetensi :</p>
              <p className="text-xl">{item.nama_unit_kompetensi}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <PertanyaanLisan indexUnitKompetensi={index} form={form} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ));

  return (
    <>
      <div className="flex flex-col gap-8 rounded-lg bg-white p-12">
        <h2 className="font-anek-latin text-2xl font-semibold text-secondary-500">
          Pertanyaan Lisan
        </h2>
        <div className="flex flex-col gap-12">{unitKompetensi}</div>
      </div>
    </>
  );
};

const PertanyaanLisan = ({ indexUnitKompetensi, form }) => {
  const { fields, remove, prepend, append } = useFieldArray({
    name: `unit_kompetensi.${indexUnitKompetensi}.pertanyaan_esai`,
    control: form.control,
  });

  const pertanyaanLisanFields = fields.map((field, index) => {
    return (
      <div
        key={field.id}
        className="relative flex flex-col gap-4 rounded-lg border-2 border-secondary-300 p-12"
      >
        <div className="flex flex-col gap-1">
          <p className="font-aileron text-secondary-300 transition-colors hover:text-secondary-400">
            Pertanyaan
          </p>
          <FormField
            control={form.control}
            name={`unit_kompetensi.${indexUnitKompetensi}.pertanyaan_lisan.${index}.pertanyaan`}
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute -left-2 top-1 -translate-x-full">
                  {index + 1}
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-aileron text-secondary-300 transition-colors hover:text-secondary-400">
            Jawaban
          </p>
          <FormField
            control={form.control}
            name={`unit_kompetensi.${indexUnitKompetensi}.pertanyaan_lisan.${index}.jawaban`}
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="absolute -left-2 top-1 -translate-x-full">
                  {index + 1}
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
            className="absolute right-1 top-1 rounded-lg bg-error-50 p-1 text-xl text-error-500 transition-colors hover:bg-error-100"
            onClick={() => remove(index)}
          >
            <XCircle className="text-xl" />
          </button>
        )}
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-12">{pertanyaanLisanFields}</div>
      <Button
        className="col-span-1 col-start-10"
        onClick={() =>
          append({
            pertanyaan: "",
            jawaban: "",
          })
        }
      >
        <PlusSquare className="text-2xl" />
      </Button>
    </div>
  );
};
