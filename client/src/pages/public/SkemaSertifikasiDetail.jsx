import { useState, useContext } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../context/AuthContext";

import axios from "../../utils/axios";
import { cn } from "../../utils/cn";

import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export const SkemaSertifikasiDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useContext(AuthContext);

  const isAsesor = auth?.role === "Asesor";
  const isAdministrator = auth?.role === "Administrator";

  const [skemaSertifikasiData, setSkemaSertifikasiData] = useState();

  const state = location?.state;
  const idSkemaSertifikasi = location?.state?.id_skema_sertifikasi;

  useQuery({
    queryKey: ["skema-sertifikasi-detail", idSkemaSertifikasi],
    queryFn: async () => {
      return await axios.get(`/skema-sertifikasi/${idSkemaSertifikasi}`);
    },
    onSuccess: (data) => {
      setSkemaSertifikasiData(data.data.data);
    },
  });

  if (!!skemaSertifikasiData && !!idSkemaSertifikasi) {
    const {
      id,
      kode_skema_sertifikasi: kodeSkemaSertifikasi,
      nama_skema_sertifikasi: namaSkemaSertifikasi,
      url_profil_skema_sertifikasi: urlProfilSkemaSertifikasi,
      unit_kompetensi: unitKompetensi,
    } = skemaSertifikasiData;

    return (
      <section>
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
              Skema Sertifikasi
            </h1>
            <p className="text-base">
              Daftar Skema Sertifikasi yang tersedia di LSP Politeknik Negeri
              Manado
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-max rounded-lg bg-white p-6 shadow-lg">
              <img
                src={urlProfilSkemaSertifikasi}
                alt=""
                className="aspect-square w-56 rounded-lg bg-white object-cover"
              />
            </div>
            <div className="flex gap-12 rounded-lg bg-white p-6 shadow-lg">
              <div>
                <p className="font-aileron text-xs font-bold leading-none">
                  Kode Skema Sertifikasi
                </p>
                <p className="font-aileron text-base">{kodeSkemaSertifikasi}</p>
              </div>
              <div>
                <p className="font-aileron text-xs font-bold leading-none">
                  Nama Skema Sertifikasi
                </p>
                <p className="font-aileron text-base">{namaSkemaSertifikasi}</p>
              </div>
            </div>
            <div className="flex gap-12 rounded-lg bg-white p-6 shadow-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-3/12 text-base">
                      Kode Unit Kompetensi
                    </TableHead>
                    <TableHead className="text-base">
                      Nama Unit Kompetensi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!!unitKompetensi &&
                    unitKompetensi.map((value) => {
                      const {
                        id,
                        kode_unit_kompetensi: kodeUnitKompetensi,
                        nama_unit_kompetensi: namaUnitKompetensi,
                      } = value;

                      return (
                        <TableRow key={id}>
                          <TableCell className="text-base">
                            {kodeUnitKompetensi}
                          </TableCell>
                          <TableCell className="text-base">
                            {namaUnitKompetensi}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
            <div
              className={cn("flex gap-12 rounded-lg bg-white p-6 shadow-lg", {
                hidden: isAsesor || isAdministrator,
              })}
            >
              <Button
                className="w-full"
                onClick={() => {
                  navigate("/pendaftaran");
                }}
              >
                Daftar
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  } else if (!idSkemaSertifikasi) {
    return <Navigate to="/skema-sertifikasi" />;
  }
};
