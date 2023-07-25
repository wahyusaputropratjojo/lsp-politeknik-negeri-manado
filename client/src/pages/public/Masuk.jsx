// Packages
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import decodeJWT from "jwt-decode";

// Utils
import axios from "../../utils/axios";
import { loginSchema } from "../../utils/yup";

// Context
import { AuthContext } from "../../context/AuthContext";

// Components
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

// Assets
import BNSP from "../../assets/logo/components/BNSP";
import LSP from "../../assets/logo/components/LSP";

export const Masuk = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const { error, isError, mutate } = useMutation({
    mutationFn: (data) => {
      return axios.post("/auth/login", data);
    },
    onSuccess: (data) => {
      const { access_token } = data.data.data;
      const { id, email, role } = decodeJWT(access_token);
      setAuth({ id, email, role, access_token });
      navigate("/");
    },
  });

  const form = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = (user) => {
    if (isError) {
      form.setError("email", {
        type: "server-side-error",
        message: error.response.data.message,
      });
      form.setError("password", {
        type: "server-side-error",
        message: error.response.data.message,
      });
    }

    const { email, password } = user;

    mutate({ email, password });
  };

  return (
    <>
      <div className="flex h-full justify-center gap-16">
        <div className="flex h-full w-[28rem] min-w-max flex-col justify-between rounded-2xl bg-white p-12">
          <div>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              <LSP className="h-12" />
            </button>
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
                  Masuk
                </h1>
                <p className="font-aileron text-base text-secondary-500">
                  Belum punya akun?{" "}
                  <Link to="/daftar" className="underline">
                    Daftar Sekarang
                  </Link>
                </p>
              </div>
              <div className="flex max-h-[36rem] flex-col gap-4 overflow-y-auto">
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
              </div>
              <div>
                <Button size="lg" className="w-full">
                  Masuk
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <DevTool control={form.control} />
      </div>
    </>
  );
};
