import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export const RootLayout = () => {
  const location = useLocation();
  const pathname = location?.pathname;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <main className="font-aileron text-secondary-500">
      <Outlet />
    </main>
  );
};
