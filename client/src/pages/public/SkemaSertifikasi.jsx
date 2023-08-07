import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import axios from "../../utils/axios";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export const SkemaSertifikasi = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location?.state;

  const [skemaSertifikasiData, setSkemaSertifikasiData] = useState();

  useQuery({
    queryKey: ["skema-sertifikasi"],
    queryFn: async () => {
      return await axios.get(`/skema-sertifikasi`);
    },
    onSuccess: (data) => {
      setSkemaSertifikasiData(data.data.data);
    },
  });

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Skema Sertifikasi
          </h1>
          <p className="text-base">
            Daftar Skema Sertifikasi yang tersedia di LSP Politeknik Negeri Manado
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {!!skemaSertifikasiData &&
            skemaSertifikasiData.map((value) => {
              const {
                id,
                kode_skema_sertifikasi: kodeSkemaSertifikasi,
                nama_skema_sertifikasi: namaSkemaSertifikasi,
                url_profil_skema_sertifikasi: urlProfilSkemaSertifikasi,
              } = value;

              return (
                <Card key={id} className="shadow-lg">
                  <CardHeader>
                    <img
                      src={urlProfilSkemaSertifikasi}
                      alt="Profil Skema Sertifikasi"
                      className="rounded-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div>
                        <p className="font-aileron text-xs font-bold leading-none">
                          Kode Skema Sertifikasi
                        </p>
                        <p className="truncate font-aileron text-base">{kodeSkemaSertifikasi}</p>
                      </div>
                      <div>
                        <p className="font-aileron text-xs font-bold leading-none">
                          Nama Skema Sertifikasi
                        </p>
                        <p className="truncate font-aileron text-base leading-snug">
                          {namaSkemaSertifikasi}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      size="xs"
                      className="w-full"
                      onClick={() => {
                        navigate(`detail`, {
                          state: {
                            ...state,
                            id_skema_sertifikasi: id,
                          },
                        });
                      }}>
                      Lihat Skema
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      </div>
    </section>
  );
};
