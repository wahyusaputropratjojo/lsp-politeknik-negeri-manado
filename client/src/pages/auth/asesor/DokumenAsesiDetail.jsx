import { useRef } from "react";
import ReactToPrint from "react-to-print";

import { FRIA01 } from "../../dokumen/FRIA01";

import Download02 from "../../../assets/icons/untitled-ui-icons/line/components/Download02";

export const DokumenAsesiDetail = () => {
  const componentRef = useRef();
  return (
    <section className="flex flex-col gap-8">
      {/* <div div className="flex flex-col gap-8">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Dokumen Asesi
          </h1>
          <p>Asesi</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between rounded-lg bg-white p-6 shadow-lg">
            <div className="flex flex-col gap-2">
              <p className="font-aileron text-sm font-bold leading-none">FR.IA.01</p>
              <p className="font-aileron text-base">
                Observasi Aktivitas di Tempat Kerja atau Tempat Kerja Simulasi
              </p>
            </div>
            <PDFDownloadLink document={<FRIA01 />} fileName="FR.IA.01.pdf">
              {({ loading }) =>
                loading ? (
                  <button className="flex items-center rounded-lg bg-success-500 p-2 transition-colors hover:bg-success-600 active:bg-success-700">
                    Loading
                  </button>
                ) : (
                  <button className="flex items-center rounded-lg bg-success-500 p-2 transition-colors hover:bg-success-600 active:bg-success-700">
                    <Download02 className="text-2xl text-white" />
                  </button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div> */}
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => this.componentRef}
      />
      <FRIA01 ref={(element) => (this.componentRef = element)} />
    </section>
  );
};
