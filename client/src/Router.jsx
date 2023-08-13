import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  useLocation,
} from "react-router-dom";

// Components
import { Authentication, RefreshAuthentication, Authorization } from "./components/Auth";

// Layouts
import { RootLayout, ContentLayout, SidebarLayout } from "./layouts";

// Pages
import {
  Beranda,
  Masuk,
  NotFound,
  Pendaftaran,
  PendaftaranAsesor,
  SkemaSertifikasi,
  SkemaSertifikasiDetail,
  Unauthorized,
} from "./pages/public";
import {
  AsesmenMandiri,
  FormulirAsesmenMandiriDetail,
  StatusPendaftaran,
  UjiKompetensi,
  UjiKompetensiDetail,
  TugasPraktekDemonstrasi,
  PertanyaanTertulisPilihanGanda,
  PertanyaanTertulisEsai,
} from "./pages/auth/asesi";
import {
  DokumenAsesi,
  DokumenAsesiDetail,
  EvaluasiAsesi,
  EvaluasiAsesiDetail,
  FRIA01,
  FRIA02,
  FRIA03,
  FRIA04,
  FRIA05,
  FRIA06,
  FRIA07,
  FRIA08,
  FRIA09,
  JadwalAsesmen,
} from "./pages/auth/asesor";
import {
  BuatSkemaSertifikasi,
  BuatUnitKompetensi,
  FRIA01Administrator,
  FRIA02Administrator,
  FRIA03Administrator,
  FRIA04Administrator,
  FRIA05Administrator,
  FRIA06Administrator,
  FRIA07Administrator,
  PenentuanAsesor,
  TinjauPersyaratan,
  UnitKompetensiDetail,
} from "./pages/auth/administrator";
import { DataAsesi } from "./pages/auth/administrator-asesor";

// import {
//   SkemaSertifikasiDashboard,
//   SkemaSertifikasiForm,
//   SkemaSertifikasiDetails,
// } from "./pages/skema-sertifikasi";

const Roles = {
  Administrator: "Administrator",
  Asesor: "Asesor",
  Peserta: "Peserta",
};

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<RefreshAuthentication />}>
        <Route path="*" element={<NotFound />} />
        <Route path="masuk" element={<Masuk />} />
        <Route element={<SidebarLayout />}>
          <Route index element={<Beranda />} />
          <Route element={<ContentLayout />}>
            <Route path="pendaftaran" element={<Pendaftaran />} />
            <Route path="pendaftaran-asesor" element={<PendaftaranAsesor />} />
            <Route path="skema-sertifikasi">
              <Route index element={<SkemaSertifikasi />} />
              <Route path="unit-kompetensi">
                <Route index element={<SkemaSertifikasiDetail />} />
                <Route element={<Authorization allowedRoles={["Administrator"]} />}>
                  <Route path="buat-unit-kompetensi" element={<BuatUnitKompetensi />} />
                  <Route path="detail-unit-kompetensi">
                    <Route index element={<UnitKompetensiDetail />} />
                    <Route path="FR-IA-01" element={<FRIA01Administrator />} />
                    <Route path="FR-IA-02" element={<FRIA02Administrator />} />
                    <Route path="FR-IA-03" element={<FRIA03Administrator />} />
                    <Route path="FR-IA-04" element={<FRIA04Administrator />} />
                    <Route path="FR-IA-05" element={<FRIA05Administrator />} />
                    <Route path="FR-IA-06" element={<FRIA06Administrator />} />
                    <Route path="FR-IA-07" element={<FRIA07Administrator />} />
                  </Route>
                </Route>
              </Route>
              <Route element={<Authorization allowedRoles={["Administrator"]} />}>
                <Route path="buat-skema-sertifikasi" element={<BuatSkemaSertifikasi />} />
              </Route>
            </Route>
            <Route element={<Authentication />}>
              <Route element={<Authorization allowedRoles={["Asesi"]} />}>
                <Route path="status-pendaftaran" element={<StatusPendaftaran />} />
                <Route path="asesmen-mandiri">
                  <Route index element={<AsesmenMandiri />} />
                  <Route
                    path="formulir-asesmen-mandiri"
                    element={<FormulirAsesmenMandiriDetail />}
                  />
                </Route>
                <Route path="uji-kompetensi">
                  <Route index element={<UjiKompetensi />} />
                  <Route path="skema-sertifikasi">
                    <Route index element={<UjiKompetensiDetail />} />
                    <Route path="tugas-praktek-demonstrasi" element={<TugasPraktekDemonstrasi />} />
                    <Route
                      path="pertanyaan-tertulis-pilihan-ganda"
                      element={<PertanyaanTertulisPilihanGanda />}
                    />
                    <Route path="pertanyaan-tertulis-esai" element={<PertanyaanTertulisEsai />} />
                  </Route>
                </Route>
              </Route>
              <Route element={<Authorization allowedRoles={["Asesor"]} />}>
                <Route path="jadwal-asesmen" element={<JadwalAsesmen />} />
                <Route path="evaluasi-asesi">
                  <Route index element={<EvaluasiAsesi />} />
                  <Route path="asesi">
                    <Route index element={<EvaluasiAsesiDetail />} />
                    <Route path="FR-IA-01" element={<FRIA01 />} />
                    <Route path="FR-IA-02" element={<FRIA02 />} />
                    <Route path="FR-IA-03" element={<FRIA03 />} />
                    <Route path="FR-IA-04" element={<FRIA04 />} />
                    <Route path="FR-IA-05" element={<FRIA05 />} />
                    <Route path="FR-IA-06" element={<FRIA06 />} />
                    <Route path="FR-IA-07" element={<FRIA07 />} />
                    <Route path="FR-IA-08" element={<FRIA08 />} />
                    <Route path="FR-IA-09" element={<FRIA09 />} />
                  </Route>
                </Route>
                <Route path="dokumen-asesi">
                  <Route index element={<DokumenAsesi />} />
                  <Route path="asesi" element={<DokumenAsesiDetail />} />
                </Route>
              </Route>
              <Route element={<Authorization allowedRoles={["Administrator"]} />}>
                <Route path="tinjau-persyaratan" element={<TinjauPersyaratan />} />
                <Route path="penentuan-asesor" element={<PenentuanAsesor />} />
              </Route>
              <Route element={<Authorization allowedRoles={["Administrator", "Asesor"]} />}>
                <Route path="data-asesi" element={<DataAsesi />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>,
  ),
);
