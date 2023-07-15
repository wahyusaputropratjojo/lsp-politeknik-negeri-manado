import * as React from "react";
import ChevronLeft from "../../../assets/icons/untitled-ui-icons/line/components/ChevronLeft";
import ChevronRight from "../../../assets/icons/untitled-ui-icons/line/components/ChevronRight";
import { DayPicker } from "react-day-picker";
import { cn } from "../../../utils/cn";
import { id } from "date-fns/locale";

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) => {
  return (
    <DayPicker
      locale={id}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        vhidden: "hidden",
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 font-aileron",
        caption: "flex justify-between pt-2 items-center px-1",
        caption_label: "font-aileron flex items-center gap-2",
        caption_dropdowns: "flex gap-1 relative gap-4",
        dropdown:
          "flex items-center font-aileron outline-none transition-colors rounded-lg cursor-pointer absolute opacity-0",
        dropdown_month: "text-secondary-500 text-sm",
        dropdown_year: "text-secondary-500 text-sm",
        nav: "flex items-center gap-1 self-end",
        nav_button:
          "h-7 aspect-square bg-secondary-400 text-white p-0 flex items-center justify-center rounded-lg transition-colors hover:bg-secondary-500",
        nav_button_previous: "transition-colors",
        nav_button_next: "transition-colors",
        table: "w-full border-collapse space-y-1 flex flex-col items-center",
        head_row: "flex",
        head_cell:
          "text-secondary-500 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "h-9 w-9 p-0 font-aileron font-normal aria-selected:opacity-100",
        day_selected:
          "bg-secondary-400 text-white hover:bg-secondary-500 focus:bg-secondary-600 rounded-lg transition-colors",
        day_today:
          "bg-primary-500 hover:bg-primary-600 text-secondary-500 transition-colors rounded-lg",
        day_outside: "text-secondary-50",
        day_disabled: "text-secondary-50",
        day_range_middle:
          "aria-selected:bg-secondary-500 aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
};
Calendar.displayName = "Calendar";
