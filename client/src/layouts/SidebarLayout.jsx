import { Outlet } from 'react-router-dom';

import { Sidebar } from '../components/ui/sidebar';

export const SidebarLayout = () => {
	return (
		<>
			<div className="container mx-auto flex">
				<div className="flex h-[100vh] w-full gap-12 p-4">
					<header className="w-min">
						<Sidebar />
					</header>
					<main className="w-full">
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
};
