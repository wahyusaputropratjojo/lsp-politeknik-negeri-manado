import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

// Components
import {
	Authentication,
	RefreshAuthentication,
	Authorization,
} from './components/Auth';

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
			<Route element={<RefreshAuthentication />}>
				<Route element={<Authentication />}>
					<Route
						path="/"
						element={<SidebarLayout />}>
						<Route
							index
							element={<Dashboard />}
						/>
						<Route
							element={
								<Authorization
									allowedRoles={[Roles.Peserta, Roles.Administrator]}
								/>
							}>
							<Route
								path="kontak"
								element={<Kontak />}
							/>
						</Route>
					</Route>
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
