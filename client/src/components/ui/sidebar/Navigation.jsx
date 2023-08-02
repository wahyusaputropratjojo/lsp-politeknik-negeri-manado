import * as React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../../../utils/cn";
import { is } from "date-fns/locale";

export const Navigation = ({
  className,
  to,
  isMinimized,
  isDisabled,
  ...props
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex h-12 items-center gap-4 rounded-lg px-4 font-aileron text-sm font-semibold text-secondary-500 transition-colors hover:bg-secondary-50",
          {
            "bg-secondary-50 hover:bg-secondary-100": isActive,
          },
          {
            "justify-center px-0 text-sm": isMinimized,
          },
          {
            "pointer-events-none bg-secondary-50 text-secondary-100":
              isDisabled,
          },
          className,
        )
      }
      {...props}
    />
  );
};
