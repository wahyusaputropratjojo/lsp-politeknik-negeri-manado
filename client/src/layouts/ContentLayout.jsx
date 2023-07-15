// Packages
import { Outlet } from "react-router-dom";

// Components
import { Breadcrumbs } from "../components/ui/breadcrumbs";

export const ContentLayout = () => {
  return (
    <>
      <section className="flex grid-rows-2 flex-col gap-4 py-8">
        <Breadcrumbs />
        <Outlet />
      </section>
    </>
  );
};
