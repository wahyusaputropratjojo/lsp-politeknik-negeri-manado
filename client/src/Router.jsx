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
import { Beranda } from "./pages/Beranda";
import { Dashboard } from "./pages/Dashboard";
import { Masuk } from "./pages/Masuk";
import { Daftar } from "./pages/Daftar";
import { Test } from "./pages/Test";
import { Unauthorized } from "./pages/Unauthorized";
import { TinjauPersyaratan } from "./pages/asesi/TinjauPersyaratan";
import { PenentuanAsesor } from "./pages/asesi/PenentuanAsesor";
import { FormulirPermohonanSertifikasiKompetensi } from "./pages/formulir";

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
          <Route path="daftar" element={<Daftar />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
        <Route element={<SidebarLayout />}>
          <Route index element={<Beranda />} />
          <Route element={<ContentLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
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
            <Route
              path="formulir-permohonan-sertifikasi-kompetensi"
              element={<FormulirPermohonanSertifikasiKompetensi />}
            />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);
