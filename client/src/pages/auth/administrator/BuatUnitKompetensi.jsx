import { useState, useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "../../../utils/axios";
import { cn } from "../../../utils/cn";

import { useImagePreview } from "../../../hooks/useImagePreview";
import { useToast } from "../../../hooks/useToast";

import { AuthContext } from "../../../context/AuthContext";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Button, buttonVariants } from "../../../components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../../../components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { ScrollArea, ScrollBar } from "../../../components/ui/scroll-area";
import { Upload } from "../../../components/ui/upload";

import AnnotationAlert from "../../../assets/icons/untitled-ui-icons/line/components/AnnotationAlert";
import Check from "../../../assets/icons/untitled-ui-icons/line/components/Check";
import PlusSquare from "../../../assets/icons/untitled-ui-icons/line/components/PlusSquare";
import XCircle from "../../../assets/icons/untitled-ui-icons/line/components/XCircle";
import ChevronSelectorVertical from "../../../assets/icons/untitled-ui-icons/line/components/ChevronSelectorVertical";

export const BuatUnitKompetensi = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { auth } = useContext(AuthContext);

  const state = location?.state;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tempatUjiKompetensiData, setTempatUjiKompetensiData] = useState();
  const [administratorTUKData, setAdministratorTUKData] = useState();

  const isAdministrator = auth?.role === "Administrator";

  const form = useForm({
    defaultValues: {
      unit_kompetensi: [
        {
          kode_unit_kompetensi: "",
          nama_unit_kompetensi: "",
        },
      ],
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`/skema-sertifikasi/unit-kompetensi`, data);
    },
    onSuccess: () => {
      navigate("/skema-sertifikasi/unit-kompetensi", {
        state: {
          ...state,
        },
      });
      toast({
        variant: "success",
        title: "Berhasil",
        description: "Skema Sertifikasi berhasil dibuat",
      });
    },
  });

  const onSubmit = (data) => {
    try {
      mutate(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Buat Unit Kompetensi
          </h1>
          <p className="text-base">
            Buat Unit Kompetensi untuk Skema Sertifikasi {location?.state?.nama_skema_sertifikasi}
          </p>
        </div>
        <Form {...form}>
          <div className="flex flex-col gap-4 rounded-lg bg-white p-12 shadow-lg">
            <div>
              <p className="font-anek-latin text-2xl font-semibold text-secondary-500">
                Unit Kompetensi
              </p>
            </div>
            <UnitKompetensiForm form={form} />
          </div>
          <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-lg">
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger className={cn(buttonVariants(), "w-full")}>
                Selesai
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <div className="flex flex-col items-center gap-2">
                      <AnnotationAlert className="text-5xl text-secondary-500" />
                      <p className="font-anek-latin text-xl">Buat Unit Kompetensi</p>
                    </div>
                  </AlertDialogTitle>
                  <AlertDialogDescription className="py-4 text-sm">
                    Harap diingat bahwa setelah tindakan ini dilakukan, tidak akan ada kesempatan
                    untuk mengulanginya. Apakah Anda yakin?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <div className="flex w-full gap-4">
                    <AlertDialogCancel
                      className={cn(
                        buttonVariants({ size: "sm", variant: "outline-error" }),
                        "w-full",
                      )}>
                      Batalkan
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className={cn(buttonVariants({ size: "sm" }), "w-full")}
                      onClick={form.handleSubmit(onSubmit)}>
                      Konfirmasi
                    </AlertDialogAction>
                  </div>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Form>
      </div>
    </section>
  );
};

const UnitKompetensiForm = ({ form }) => {
  const location = useLocation();

  const idSkemaSertifikasi = location?.state?.id_skema_sertifikasi;

  const { append, remove, fields } = useFieldArray({
    name: `unit_kompetensi`,
    control: form.control,
  });

  const unitKompetensiFields = fields.map((field, index) => {
    form.setValue(`unit_kompetensi.${index}.id_skema_sertifikasi`, idSkemaSertifikasi);

    return (
      <div key={field.id} className="relative grid grid-cols-2 gap-8">
        <FormField
          control={form.control}
          name={`unit_kompetensi.${index}.kode_unit_kompetensi`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode Unit Kompetensi</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`unit_kompetensi.${index}.nama_unit_kompetensi`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Unit Kompetensi</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {index > 0 && (
          <button
            type="button"
            className="absolute -top-2 right-0 rounded-lg bg-error-50 p-1 text-xl text-error-500 transition-colors hover:bg-error-100"
            onClick={() => remove(index)}>
            <XCircle className="text-xl" />
          </button>
        )}
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">{unitKompetensiFields}</div>
      <Button
        type="button"
        className="col-span-1 col-start-10"
        onClick={() =>
          append({
            kode_unit_kompetensi: "",
            nama_unit_kompetensi: "",
          })
        }>
        <PlusSquare className="text-2xl" />
      </Button>
    </div>
  );
};
