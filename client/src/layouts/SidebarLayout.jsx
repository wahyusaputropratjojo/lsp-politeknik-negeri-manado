import { Outlet } from "react-router-dom";

import { Sidebar } from "../components/ui/sidebar";

export const SidebarLayout = () => {
  return (
    <>
      <div className="container mx-auto px-12 py-4">
        <div className="flex gap-12">
          <aside className="sidebar sticky bottom-4 top-4 font-aileron text-secondary-500">
            <Sidebar />
          </aside>
          <main className="w-full font-aileron text-secondary-500">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
