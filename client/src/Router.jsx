import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Components
import {
  Authentication,
  RefreshAuthentication,
  Authorization,
} from "./components/Auth";

// Layouts
import { DefaultLayout, ContentLayout, SidebarLayout } from "./layouts";

// Pages
import {
  Beranda,
  Masuk,
  Unauthorized,
  FormulirPermohonanSertifikasiKompetensi,
} from "./pages/public";
import {
  AsesmenMandiri,
  FormulirAsesmenMandiriDetail,
  StatusPendaftaran,
  UjiKompetensi,
  UjiKompetensiDetail,
} from "./pages/auth/asesi";
import {
  DataAsesi,
  EvaluasiAsesi,
  EvaluasiAsesiDetail,
  JadwalAsesmen,
} from "./pages/auth/asesor";
import { PenentuanAsesor, TinjauPersyaratan } from "./pages/auth/administrator";

import {
  SkemaSertifikasiDashboard,
  SkemaSertifikasiForm,
  SkemaSertifikasiDetails,
} from "./pages/skema-sertifikasi";

const Roles = {
  Administrator: "Administrator",
  Asesor: "Asesor",
  Peserta: "Peserta",
};

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<RefreshAuthentication />}>
        <Route element={<DefaultLayout />}>
          <Route path="masuk" element={<Masuk />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
        <Route element={<SidebarLayout />}>
          <Route index element={<Beranda />} />
          <Route element={<ContentLayout />}>
            <Route path="asesmen-mandiri">
              <Route index element={<AsesmenMandiri />} />
              <Route path=":id" element={<FormulirAsesmenMandiriDetail />} />
            </Route>
            <Route path="status-pendaftaran" element={<StatusPendaftaran />} />
            <Route path="uji-kompetensi">
              <Route index element={<UjiKompetensi />} />
              <Route path=":id" element={<UjiKompetensiDetail />} />
            </Route>
            <Route path="skema-sertifikasi">
              <Route index element={<SkemaSertifikasiDashboard />} />
              <Route path="buat" element={<SkemaSertifikasiForm />} />
              <Route path=":id" element={<SkemaSertifikasiDetails />} />
            </Route>
            <Route path="manajemen-asesi">
              <Route
                path="tinjau-persyaratan"
                element={<TinjauPersyaratan />}
              />
              <Route path="penentuan-asesor" element={<PenentuanAsesor />} />
            </Route>
            <Route path="jadwal-asesmen" element={<JadwalAsesmen />} />
            <Route path="data-asesi" element={<DataAsesi />} />
            <Route path="evaluasi-asesi">
              <Route index element={<EvaluasiAsesi />} />
              <Route path=":id" element={<EvaluasiAsesiDetail />} />
            </Route>
            <Route
              path="formulir-permohonan-sertifikasi-kompetensi"
              element={<FormulirPermohonanSertifikasiKompetensi />}
            />
          </Route>
        </Route>
      </Route>
    </Route>,
  ),
);
