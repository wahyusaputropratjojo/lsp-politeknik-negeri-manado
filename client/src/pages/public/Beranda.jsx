import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button";

import PolteknikNegeriManado from "../../assets/logo/components/PoliteknikNegeriManado";

export const Beranda = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="rounded-lg bg-white p-12 py-20">
        <div className="grid grid-cols-8 items-center gap-12">
          <div className="col-span-5 flex flex-col gap-8">
            <div>
              <h1 className="font-anek-latin text-6xl font-semibold uppercase text-secondary-500">
                Lembaga Sertifikasi Profesi
              </h1>
              <p className="font-anek-latin text-xl font-semibold uppercase text-secondary-500">
                Politeknik Negeri Manado
              </p>
            </div>
            <p className="font-aileron text-xl text-secondary-500">
              Tingkatkan karir anda dengan sertifikasi profesional kami! Daftar
              Sekarang dan buktikan keunggulan Anda.
            </p>
            <Button
              className="w-1/2"
              size="lg"
              onClick={() => {
                navigate("/formulir-permohonan-sertifikasi-kompetensi");
              }}
            >
              Daftar Sekarang
            </Button>
          </div>
          <div className="col-span-2 col-start-7">
            <PolteknikNegeriManado />
          </div>
        </div>
      </section>
    </>
  );
};
