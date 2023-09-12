import { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { AuthContext } from "../../../context/AuthContext";

import { Button } from "../../../components/ui/button";

import { FRAK05Document } from "../administrator-asesor-asesi/FRAK05Document";

import Printer from "../../../assets/icons/untitled-ui-icons/line/components/Printer";

export const LaporanAsesmen = () => {
  const { auth } = useContext(AuthContext);

  const componentRefFRAK05Document = useRef();

  const handlePrintFRAK05Document = useReactToPrint({
    content: () => componentRefFRAK05Document.current,
    documentTitle: `FR.AK.05 - Laporan Asesmen`,
    bodyClass: "bg-white",
  });

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Laporan Asesmen
          </h1>
          <p>Dokumen Laporan Asesmen</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 rounded-lg bg-white p-8">
            <FRAK05Document id={auth?.id} ref={componentRefFRAK05Document} />
          </div>
          <div className="w-max rounded-lg bg-white p-2">
            <Button size="xs" className="w-max gap-2" onClick={handlePrintFRAK05Document}>
              Cetak
              <Printer />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
