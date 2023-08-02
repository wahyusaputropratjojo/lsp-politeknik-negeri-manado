import { useLocation, NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { cn } from "../../../utils/cn";

import HomeLine from "../../../assets/icons/untitled-ui-icons/line/components/HomeLine";
import ChevronRight from "../../../assets/icons/untitled-ui-icons/line/components/ChevronRight";

export const Breadcrumbs = () => {
  const location = useLocation();

  const pathname = location?.pathname;
  const state = location?.state;
  const isDisabled = location?.state?.is_disabled;

  let currentRoute = "";

  const crumbs = pathname
    .split("/")
    .filter((item) => item !== "")
    .map((crumb, index) => {
      currentRoute += `/${crumb}`;

      return (
        <li
          key={uuid()}
          className="flex cursor-default items-center gap-2 text-base text-secondary-200"
        >
          <ChevronRight className="pointer-events-none cursor-default text-xs" />
          <NavLink
            end
            to={currentRoute}
            state={{ ...state }}
            className={({ isActive, isPending }) =>
              cn(
                "cursor-pointer items-center font-aileron capitalize transition-colors hover:text-secondary-500",
                {
                  "text-secondary-500": isActive,
                },
                {
                  "pointer-events-none": isDisabled,
                },
              )
            }
          >
            {crumb.replace(/-/g, " ")}
          </NavLink>
        </li>
      );
    });

  return (
    <nav>
      <ul className="flex items-center gap-2 rounded-lg pt-4">
        <li className="flex">
          <NavLink
            end
            to="/"
            className={({ isActive }) =>
              cn(
                "cursor-pointer items-center font-aileron capitalize text-secondary-200 transition-colors hover:text-secondary-500",
                {
                  "text-secondary-500": isActive,
                },
                {
                  "pointer-events-none": isDisabled,
                },
              )
            }
          >
            <HomeLine className="text-lg" />
          </NavLink>
        </li>
        {crumbs}
      </ul>
    </nav>
  );
};
