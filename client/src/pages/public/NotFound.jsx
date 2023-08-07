import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button";

export const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 10000);
  }, []);

  return (
    <section className="h-[100vh]">
      <div className="flex h-full flex-col items-center justify-center gap-5">
        <p className="font-anek-latin text-9xl font-bold">404</p>
        <p className="font-aileron text-xl">Halaman tidak ditemukan</p>
        <Button
          size="xs"
          className="w-60"
          onClick={() => {
            navigate("/");
          }}>
          Beranda
        </Button>
      </div>
    </section>
  );
};
