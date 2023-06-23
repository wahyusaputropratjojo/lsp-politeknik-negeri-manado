import { Outlet } from 'react-router-dom';

import { Sidebar } from '../components/ui/sidebar';

export const SidebarLayout = () => {
	return (
		<>
			<div className="container mx-auto py-4">
				<div className="fixed left-0 right-0 top-0 border-8 border-neutral-500" />
				<div className="flex gap-12">
					<aside className="sticky bottom-4 top-4 h-sidebar">
						<Sidebar />
					</aside>
					<main className="w-full">
						<Outlet />
					</main>
				</div>
				<div className="fixed bottom-0 left-0 right-0 border-8 border-neutral-500" />
			</div>
		</>
	);
};
