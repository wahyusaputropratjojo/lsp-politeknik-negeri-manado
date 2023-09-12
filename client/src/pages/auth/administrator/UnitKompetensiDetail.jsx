import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "../../../components/ui/button";

export const UnitKompetensiDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location?.state;

  console.log(location);

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Detail Unit Kompetensi
          </h1>
          <p className="text-base">Unit Kompetensi</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-lg">
            <div>
              <p className="text-xs font-bold leading-none">FR.IA.01</p>
              <p className="text-base">
                Observasi Aktivitas di Tempat Kerja atau Tempat Kerja Simulasi
              </p>
            </div>
            <Button
              size="xs"
              onClick={() =>
                navigate("FR-IA-01", {
                  state: {
                    ...state,
                  },
                })
              }>
              Lihat
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-lg">
            <div>
              <p className="text-xs font-bold leading-none">FR.IA.02</p>
              <p className="text-base">Tugas Praktik Demonstrasi</p>
            </div>
            <Button
              size="xs"
              onClick={() =>
                navigate("FR-IA-02", {
                  state: {
                    ...state,
                  },
                })
              }>
              Lihat
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-lg">
            <div>
              <p className="text-xs font-bold leading-none">FR.IA.03</p>
              <p className="text-base">Pertanyaan Untuk Mendukung Observasi</p>
            </div>
            <Button
              size="xs"
              onClick={() =>
                navigate("FR-IA-03", {
                  state: {
                    ...state,
                  },
                })
              }>
              Lihat
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-lg">
            <div>
              <p className="text-xs font-bold leading-none">FR.IA.04</p>
              <p className="text-base">
                Penjelasan Singkat Proyek Terkait Pekerjaan / Kegiatan Terstruktur Lainnya
              </p>
            </div>
            <Button
              size="xs"
              onClick={() =>
                navigate("FR-IA-04", {
                  state: {
                    ...state,
                  },
                })
              }>
              Lihat
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-lg">
            <div>
              <p className="text-xs font-bold leading-none">FR.IA.05</p>
              <p className="text-base">Pertanyaan Tertulis Pilihan Ganda</p>
            </div>
            <Button
              size="xs"
              onClick={() =>
                navigate("FR-IA-05", {
                  state: {
                    ...state,
                  },
                })
              }>
              Lihat
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-lg">
            <div>
              <p className="text-xs font-bold leading-none">FR.IA.06</p>
              <p className="text-base">Pertanyaan Tertulis Esai</p>
            </div>
            <Button
              size="xs"
              onClick={() =>
                navigate("FR-IA-06", {
                  state: {
                    ...state,
                  },
                })
              }>
              Lihat
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-lg">
            <div>
              <p className="text-xs font-bold leading-none">FR.IA.07</p>
              <p className="text-base">Pertanyaan Lisan</p>
            </div>
            <Button
              size="xs"
              onClick={() =>
                navigate("FR-IA-07", {
                  state: {
                    ...state,
                  },
                })
              }>
              Lihat
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
