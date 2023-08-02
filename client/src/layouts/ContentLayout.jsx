// Packages
import { Outlet } from "react-router-dom";

// Components
import { Breadcrumbs } from "../components/ui/breadcrumbs";

export const ContentLayout = () => {
  return (
    <>
      <section className="flex grid-rows-2 flex-col gap-2">
        <Breadcrumbs />
        <Outlet />
      </section>
    </>
  );
};
