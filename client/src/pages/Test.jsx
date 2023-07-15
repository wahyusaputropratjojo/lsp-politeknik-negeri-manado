import * as React from "react";
import { format } from "date-fns";
import CalendarIcon from "../assets/icons/untitled-ui-icons/line/components/Calendar";
import { id } from "date-fns/locale";
import { cn } from "../utils/cn";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

export function Test() {
  const [date, setDate] = React.useState();

  return (
    <div className="flex h-[100vh] items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            custom="combobox"
            className={cn(
              "w-[280px] justify-between text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {date ? (
              format(date, "PPP", { locale: id })
            ) : (
              <span>Pilih tanggal</span>
            )}
            <CalendarIcon className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
