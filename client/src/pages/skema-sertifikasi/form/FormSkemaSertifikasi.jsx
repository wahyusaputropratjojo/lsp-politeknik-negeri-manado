import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";

export const FormSkemaSertifikasi = ({ form }) => {
  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg bg-white p-12">
        <h2 className="font-aileron text-2xl font-semibold text-secondary-500">
          Skema Sertifikasi
        </h2>
        <div className="grid grid-cols-10 gap-8">
          <FormField
            control={form.control}
            name="kode_skema_sertifikasi"
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormLabel>Kode Skema Sertifikasi</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    variant={form.formState.errors?.nama ? "error" : "primary"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nama_skema_sertifikasi"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Nama Skema Sertifikasi</FormLabel>
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
        </div>
      </div>
    </>
  );
};
