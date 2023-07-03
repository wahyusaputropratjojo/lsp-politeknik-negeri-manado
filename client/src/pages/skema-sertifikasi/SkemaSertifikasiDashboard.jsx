import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";

import PlusCircle from "../../assets/icons/untitled-ui-icons/line/components/PlusCircle";
import SearchLg from "../../assets/icons/untitled-ui-icons/line/components/SearchLg";

export const SkemaSertifikasiDashboard = () => {
  const [skemaSertifikasi, setSkemaSertifikasi] = useState([]);

  useQuery({
    queryKey: ["skema_sertifikasi"],
    queryFn: () => {
      return axios.get(`/skema-sertifikasi`);
    },
    onSuccess: (data) => {
      setSkemaSertifikasi(data.data.data);
    },
  });

  const skemaSertifikasiCard = skemaSertifikasi.map((item) => {
    return (
      <Card key={item.id}>
        <CardHeader>
          <AspectRatio ratio={1 / 1}>
            <img
              src="/food-and-baverage-outlet-manager.png"
              className="rounded-xl object-cover"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p className="truncate font-anek-latin text-2xl font-semibold">
            {item.nama_skema_sertifikasi}
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Lihat Skema</Button>
        </CardFooter>
      </Card>
    );
  });

  return (
    <>
      <header className="flex flex-col gap-2">
        <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
          Skema Sertifikasi
        </h1>
        <p className="font-aileron text-secondary-500">
          Daftar Skema Sertifkasi
        </p>
      </header>
      <nav className="flex items-center justify-between rounded-2xl bg-white p-3">
        <div className="flex w-4/5 flex-wrap gap-2">
          <NavLink to="/skema-sertifikasi/buat">
            <Button size="xs" className="gap-1">
              <PlusCircle className="text-secondary-500" />
              <span>Buat Skema</span>
            </Button>
          </NavLink>
        </div>
        <div className="flex w-96 gap-1">
          <Input size="xs" placeholder="Cari" className="w-5/6" />
          <Button size="xs" className="w-1/6">
            <SearchLg className="text-secondary-500" />
          </Button>
        </div>
      </nav>
      <div>
        <article className="grid grid-cols-4 gap-4">
          {skemaSertifikasiCard}
        </article>
      </div>
    </>
  );
};
