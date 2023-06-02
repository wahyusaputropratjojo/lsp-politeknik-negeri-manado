import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

// Layouts
import { DefaultLayout } from './layouts/DefaultLayout';
import { SidebarLayout } from './layouts/SidebarLayout';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Kontak } from './pages/Kontak';
import { Masuk } from './pages/Masuk';
import { Daftar } from './pages/Daftar';

export const Router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
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
			</Route>
		</Route>,
	),
);
