import { useLocation, useNavigate, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import HomeLine from "../../../assets/icons/untitled-ui-icons/line/components/HomeLine";

export const Breadcrumbs = () => {
  const navigate = useNavigate();
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
            className="flex gap-2 font-aileron capitalize text-secondary-400 transition-colors after:content-['>'] hover:text-secondary-500"
          >
            {crumb.replace(/-/g, " ")}
          </Link>
        </li>
      );
    });

  return (
    <nav>
      <ul className="flex items-center gap-2">
        <button
          className="flex items-center gap-2 text-secondary-400 transition-colors hover:text-secondary-500"
          onClick={() => {
            navigate("/");
          }}
        >
          <HomeLine />
          <span>&#62;</span>
        </button>
        {crumbs}
      </ul>
    </nav>
  );
};
