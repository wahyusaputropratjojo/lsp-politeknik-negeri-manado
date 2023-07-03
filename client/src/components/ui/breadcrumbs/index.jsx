import { useLocation, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  let currentRoute = "";

  const crumbs = pathname
    .split("/")
    .filter((item) => item !== "")
    .map((crumb) => {
      currentRoute += `/${crumb}`;
      return (
        <li key={uuid()}>
          <Link
            to={currentRoute}
            className="flex gap-2 font-aileron capitalize text-secondary-400 transition-colors after:content-['>'] hover:text-secondary-900"
          >
            {crumb.replace(/-/g, " ")}
          </Link>
        </li>
      );
    });

  return (
    <nav>
      <ul className="flex items-center gap-2">{crumbs}</ul>
    </nav>
  );
};
