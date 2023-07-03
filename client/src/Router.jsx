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
import { Dashboard } from "./pages/Dashboard";
import { Masuk } from "./pages/Masuk";
import { Daftar } from "./pages/Daftar";
import { Test } from "./pages/Test";
import { Unauthorized } from "./pages/Unauthorized";

import {
  SkemaSertifikasiDashboard,
  SkemaSertifikasiForm,
} from "./pages/skema-sertifikasi";

const Roles = {
  Administrator: "Administrator",
  Asesor: "Asesor",
  Peserta: "Peserta",
};

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<RefreshAuthentication />}>
        <Route element={<Authentication />}>
          <Route path="/" element={<SidebarLayout />}>
            <Route element={<ContentLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="skema-sertifikasi" element={<ContentLayout />}>
              <Route index element={<SkemaSertifikasiDashboard />} />
              <Route path="buat" element={<SkemaSertifikasiForm />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="masuk" element={<Masuk />} />
        <Route path="daftar" element={<Daftar />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
      <Route path="test" element={<Test />} />
    </Route>
  )
);
