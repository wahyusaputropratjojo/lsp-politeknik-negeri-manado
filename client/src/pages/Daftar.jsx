// Packages
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { useMutation } from "@tanstack/react-query";

// Utils
import axios from "../utils/axios";
import { registerSchema } from "../utils/yup";

// Components
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

// Assets
import BNSP from "../assets/logo/components/BNSP";
import LSP from "../assets/logo/components/LSP";
import CheckCircle from "../assets/icons/untitled-ui-icons/line/components/CheckCircle";

export const Daftar = () => {
  const navigate = useNavigate();

  const { error, isError, isSuccess, mutate } = useMutation({
    mutationFn: async (data) => await axios.post("/auth/register", data),
    onSuccess: () => {
      setTimeout(() => {
        navigate("/masuk");
      }, 2000);
    },
  });

  const form = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data) => {
    if (isError) {
      form.setError("email", {
        type: "manual",
        message: error.response.data.message,
      });
    }

    const { nama, email, password } = data;

    mutate({
      nama,
      email,
      password,
    });
  };

  return (
    <>
      <div className="flex h-full justify-center gap-16">
        <div className="flex h-full w-[28rem] min-w-max flex-col justify-between rounded-2xl bg-white p-12">
          <div>
            <LSP className="h-12" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-anek-latin text-[2.5rem] font-semibold text-secondary-500">
              Raih Kesuksesan.
            </p>
            <p className="w-80 font-aileron text-base text-secondary-500">
              Maju Bersama Politeknik Negeri Manado dan Raih Sertifikasi Profesi
              untuk Sukseskan Karier Anda!
            </p>
          </div>
          <div>
            <BNSP className="h-8" />
          </div>
        </div>
        <div className="flex w-[28rem] flex-col py-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex h-full flex-col justify-between gap-12"
            >
              <div className="flex flex-col">
                <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
                  Daftar
                </h1>
                <p className="font-aileron text-base text-secondary-500">
                  Sudah punya Akun?{" "}
                  <Link to="/masuk" className="underline">
                    Masuk Sekarang
                  </Link>
                </p>
              </div>
              <div className="flex max-h-[36rem] flex-col gap-4 overflow-y-auto">
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          variant={
                            form.formState.errors?.nama ? "error" : "primary"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          variant={
                            form.formState.errors?.email ? "error" : "primary"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          variant={
                            form.formState.errors?.password
                              ? "error"
                              : "primary"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="konfirmasiPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          variant={
                            form.formState.errors?.konfirmasiPassword
                              ? "error"
                              : "primary"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button size="lg" className="w-full">
                      Daftar
                    </Button>
                  </DialogTrigger>
                  {isSuccess && (
                    <DialogContent className="w-max p-12">
                      <DialogHeader className="flex items-center">
                        <CheckCircle className="text-7xl text-success-500" />
                        <DialogTitle className="font-anek-latin text-2xl font-semibold">
                          Pendaftaran Berhasil
                        </DialogTitle>
                      </DialogHeader>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
            </form>
          </Form>
        </div>
        <DevTool control={form.control} />
      </div>
    </>
  );
};
