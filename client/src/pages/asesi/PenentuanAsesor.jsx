import { useForm } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { cn } from "../../utils/cn";
import axios from "../../utils/axios";

import Check from "../../assets/icons/untitled-ui-icons/line/components/Check";
import ChevronSelectorVertical from "../../assets/icons/untitled-ui-icons/line/components/ChevronSelectorVertical";

const onSubmit = (data) => {};

const jenisKelamin = [
  { value: "laki-laki", label: "Laki-laki" },
  { value: "perempuan", label: "Perempuan" },
];

export const PenentuanAsesor = () => {
  const form = useForm({
    defaultValues: {
      id_asesi: "",
      id_asesor: "",
    },
  });

  return (
    <>
      <section>
        <div className="flex flex-col gap-12">
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Penentuan Asesor
          </h1>
          <div className="rounded-lg bg-white p-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Skema Sertifikasi</TableHead>
                      <TableHead>Asesor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Wahyu Saputro Pratjojo</TableCell>
                      <TableCell>Memasang dan Merakit PHB</TableCell>
                      <TableCell className="max-w-xs">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      similar={
                                        form.formState.errors?.jenis_kelamin
                                          ? "input-error"
                                          : "input-primary"
                                      }
                                      role="combobox"
                                      className="grid w-full grid-cols-12 justify-items-start"
                                    >
                                      <p className="col-span-11 flex w-full items-start justify-self-start truncate">
                                        {field.value
                                          ? jenisKelamin.find(
                                              (data) =>
                                                data.value === field.value
                                            )?.label
                                          : ""}
                                      </p>
                                      <ChevronSelectorVertical className="col-span-1 justify-self-end" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-full p-0">
                                    <Command>
                                      <CommandGroup>
                                        <ScrollArea className="h-min w-max rounded-md">
                                          {jenisKelamin.map((data) => (
                                            <CommandItem
                                              className="min-w-max"
                                              key={data.value}
                                              value={data.label}
                                              onSelect={(value) => {
                                                form.setValue(
                                                  "jenis_kelamin",
                                                  value,
                                                  { shouldValidate: true }
                                                );
                                              }}
                                            >
                                              <Check
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  data.value === field.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                                )}
                                              />
                                              {data.label}
                                            </CommandItem>
                                          ))}
                                        </ScrollArea>
                                      </CommandGroup>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button variant="success" size="xs">
                            Simpan
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};
