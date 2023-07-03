import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { Button } from "../../../components/ui/button";
import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";

import PlusSquare from "../../../assets/icons/untitled-ui-icons/line/components/PlusSquare";
import XCircle from "../../../assets/icons/untitled-ui-icons/line/components/XCircle";

export const FormUnitKompetensi = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "unit_kompetensi",
  });

  const unitKompetensFields = fields.map((item, index) => {
    return (
      <div className="relative flex flex-col gap-8" key={item.id}>
        <div className="relative grid grid-cols-10 gap-8">
          <FormField
            control={form.control}
            name={`unit_kompetensi.${index}.kode_unit_kompetensi`}
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormLabel>Kode Unit Kompetensi</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    variant={form.formState.errors?.nama ? "error" : "primary"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`unit_kompetensi.${index}.nama_unit_kompetensi`}
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Nama Unit Kompetensi</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    variant={form.formState.errors?.nama ? "error" : "primary"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {index > 0 && (
            <button
              className="absolute -right-2 top-6 translate-x-full rounded-lg bg-error-50 p-1 text-error-500 transition-colors hover:bg-error-100"
              onClick={() => remove(index)}
            >
              <XCircle className="text-xl" />
            </button>
          )}
        </div>

        {index === fields.length - 1 && (
          <Button
            size="md"
            className="col-span-full"
            onClick={() =>
              append({
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
              })
            }
          >
            <PlusSquare className="text-2xl" />
          </Button>
        )}
      </div>
    );
  });

  return (
    <>
      <section className="flex flex-col gap-6 rounded-lg bg-white p-12">
        <h2 className="font-aileron text-2xl font-semibold text-secondary-500">
          Unit Kompetensi
        </h2>
        <article className="flex flex-col gap-8">{unitKompetensFields}</article>
      </section>
    </>
  );
};
