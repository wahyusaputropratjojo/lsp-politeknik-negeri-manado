import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

// Components
import { Authentication } from './components/Auth/Authentication';

// Layouts
import { DefaultLayout } from './layouts/DefaultLayout';
import { SidebarLayout } from './layouts/SidebarLayout';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Kontak } from './pages/Kontak';
import { Masuk } from './pages/Masuk';
import { Daftar } from './pages/Daftar';
import { Test } from './pages/Test';
import { Unauthorized } from './pages/Unauthorized';

const Roles = {
	Administrator: 'Administrator',
	Asesor: 'Asesor',
	Peserta: 'Peserta',
};

export const Router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route element={<Authentication allowedRoles={Roles.Administrator} />}>
				<Route
					path="/"
					element={<SidebarLayout />}>
					<Route
						index
						element={<Dashboard />}
					/>
					<Route
						path="kontak"
						element={<Kontak />}
					/>
				</Route>
			</Route>
			<Route
				path="/"
				element={<DefaultLayout />}>
				<Route
					path="masuk"
					element={<Masuk />}
				/>
				<Route
					path="daftar"
					element={<Daftar />}
				/>
				<Route
					path="unauthorized"
					element={<Unauthorized />}
				/>
			</Route>
			<Route
				path="test"
				element={<Test />}
			/>
		</Route>,
	),
);
