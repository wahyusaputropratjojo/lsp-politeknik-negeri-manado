import { useState } from "react";
import { useFieldArray, Controller } from "react-hook-form";
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

export const FormAktivitasUnitKompetensi = ({ form }) => {
  const unitKompetensiList = form.getValues("unit_kompetensi");

  const unitKompetensi = unitKompetensiList.map((item, indexUnitKompetensi) => {
    return (
      <div key={item.id}>
        <p className="font-aileron text-xl font-semibold">
          Unit Kompetensi: {item.nama_unit_kompetensi}
        </p>
        <div>
          <AktivitasUnitKompetensi
            form={form}
            indexUnitKompetensi={indexUnitKompetensi}
          />
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="flex flex-col gap-8">
        <h2 className="font-anek-latin text-2xl font-semibold text-secondary-500">
          Aktivitas Unit Kompetensi
        </h2>
        <div className="flex flex-col gap-12">{unitKompetensi}</div>
      </div>
    </>
  );
};

const AktivitasUnitKompetensi = ({ form, indexUnitKompetensi }) => {
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: `unit_kompetensi[${indexUnitKompetensi}].aktivitas_unit_kompetensi`,
  });

  const addAktivitasUnitKompetensi = () => {
    append({ elemen: "" });
  };

  const removeAktivitasUnitKompetensi = (index) => {
    remove(index);
  };

  const aktivitasUnitKompetensiFields = fields.map((field, index) => {
    const aktivitasFieldName = `unit_kompetensi[${indexUnitKompetensi}].aktivitas_unit_kompetensi[${index}].elemen`;

    return (
      <div key={field.id}>
        <FormField
          control={form.control}
          name={aktivitasFieldName}
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Elemen</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="button"
          onClick={() => removeAktivitasUnitKompetensi(index)}
        >
          Remove Aktivitas Unit Kompetensi
        </Button>
      </div>
    );
  });

  return (
    <div>
      {aktivitasUnitKompetensiFields}
      <Button type="button" onClick={addAktivitasUnitKompetensi}>
        Add Aktivitas Unit Kompetensi
      </Button>
    </div>
  );
};
