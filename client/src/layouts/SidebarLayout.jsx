import { Outlet } from 'react-router-dom';

import { Sidebar } from '../components/Sidebar/Sidebar';

export const SidebarLayout = () => {
	return (
		<>
			<div className="flex h-[100vh] gap-8 p-4">
				<header className="min-w-[18rem]">
					<Sidebar />
				</header>
				<main className="w-full">
					<Outlet />
				</main>
			</div>
		</>
	);
};
