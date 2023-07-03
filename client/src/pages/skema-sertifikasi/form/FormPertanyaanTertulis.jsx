import { useFieldArray } from "react-hook-form";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../components/ui/accordion";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
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

export const FormPertanyaanTertulis = ({ form }) => {
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
            <PertanyaanTertulis indexUnitKompetensi={index} form={form} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ));

  return (
    <>
      <div className="flex flex-col gap-8 rounded-lg bg-white p-12">
        <h2 className="font-anek-latin text-2xl font-semibold text-secondary-500">
          Pertanyaan Tertulis
        </h2>
        <div className="flex flex-col gap-12">{unitKompetensi}</div>
      </div>
    </>
  );
};

const PertanyaanTertulis = ({ indexUnitKompetensi, form }) => {
  const { fields, remove, prepend, append } = useFieldArray({
    name: `unit_kompetensi.${indexUnitKompetensi}.pertanyaan_tertulis`,
    control: form.control,
  });

  const pertanyaanTertulisFields = fields.map((field, index) => {
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
            name={`unit_kompetensi.${indexUnitKompetensi}.pertanyaan_tertulis.${index}.pertanyaan`}
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
          <div>
            <JawabanPertanyaanTertulis
              indexUnitKompetensi={indexUnitKompetensi}
              indexPertanyaan={index}
              form={form}
            />
          </div>
        </div>
        {index > 0 && (
          <button
            type="button"
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
      <div className="flex flex-col gap-12">{pertanyaanTertulisFields}</div>
      <Button
        type="button"
        className="col-span-1 col-start-10"
        onClick={() =>
          append({
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
          })
        }
      >
        <PlusSquare className="text-2xl" />
      </Button>
    </div>
  );
};

const JawabanPertanyaanTertulis = ({
  indexUnitKompetensi,
  indexPertanyaan,
  form,
}) => {
  const isOptionChecked = (option) => {
    const checked = form.getValues(
      `unit_kompetensi.${indexUnitKompetensi}.pertanyaan_tertulis.${indexPertanyaan}.jawaban_pertanyaan_tertulis.${option}.benar`
    );
    return checked === true;
  };

  return (
    <>
      <div className="relative grid grid-cols-10 gap-8">
        <div className="relative col-span-5">
          <FormField
            control={form.control}
            name={`unit_kompetensi.${indexUnitKompetensi}.pertanyaan_tertulis.${indexPertanyaan}.jawaban_pertanyaan_tertulis.${0}.jawaban`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="absolute -left-2 top-1 -translate-x-full">
                  A
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`unit_kompetensi.${indexUnitKompetensi}.pertanyaan_tertulis.${indexPertanyaan}.jawaban_pertanyaan_tertulis.${0}.benar`}
            render={({ field }) => (
              <FormItem className="absolute -left-1 top-6 -translate-x-full">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    disabled={
                      isOptionChecked(1) ||
                      isOptionChecked(2) ||
                      isOptionChecked(3)
                    }
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="relative col-span-5">
          <FormField
            control={form.control}
            name={`unit_kompetensi.${indexUnitKompetensi}.pertanyaan_tertulis.${indexPertanyaan}.jawaban_pertanyaan_tertulis.${1}.jawaban`}
            render={({ field }) => (
              <FormItem className="relative col-span-5">
                <FormLabel className="absolute -left-2 top-1 -translate-x-full">
                  B
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`unit_kompetensi.${indexUnitKompetensi}.pertanyaan_tertulis.${indexPertanyaan}.jawaban_pertanyaan_tertulis.${1}.benar`}
            render={({ field }) => (
              <FormItem className="absolute -left-1 top-6 -translate-x-full">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    disabled={
                      isOptionChecked(0) ||
                      isOptionChecked(2) ||
                      isOptionChecked(3)
                    }
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="relative col-span-5">
          <FormField
            control={form.control}
            name={`unit_kompetensi.${indexUnitKompetensi}.pertanyaan_tertulis.${indexPertanyaan}.jawaban_pertanyaan_tertulis.${2}.jawaban`}
            render={({ field }) => (
              <FormItem className="relative col-span-5">
                <FormLabel className="absolute -left-2 top-1 -translate-x-full">
                  C
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`unit_kompetensi.${indexUnitKompetensi}.pertanyaan_tertulis.${indexPertanyaan}.jawaban_pertanyaan_tertulis.${2}.benar`}
            render={({ field }) => (
              <FormItem className="absolute -left-1 top-6 -translate-x-full">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    disabled={
                      isOptionChecked(0) ||
                      isOptionChecked(1) ||
                      isOptionChecked(3)
                    }
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="relative col-span-5">
          <FormField
            control={form.control}
            name={`unit_kompetensi.${indexUnitKompetensi}.pertanyaan_tertulis.${indexPertanyaan}.jawaban_pertanyaan_tertulis.${3}.jawaban`}
            render={({ field }) => (
              <FormItem className="relative col-span-5">
                <FormLabel className="absolute -left-2 top-1 -translate-x-full">
                  D
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`unit_kompetensi.${indexUnitKompetensi}.pertanyaan_tertulis.${indexPertanyaan}.jawaban_pertanyaan_tertulis.${3}.benar`}
            render={({ field }) => (
              <FormItem className="absolute -left-1 top-6 -translate-x-full">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    disabled={
                      isOptionChecked(0) ||
                      isOptionChecked(1) ||
                      isOptionChecked(2)
                    }
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
};
