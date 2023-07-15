// Packages
import { useState } from "react";

// Utils
import { cn } from "../utils/cn";

// Data
import { negara } from "../data/negara";

// Components
import Check from "../assets/icons/untitled-ui-icons/line/components/Check";
import ChevronSelectorVertical from "../assets/icons/untitled-ui-icons/line/components/ChevronSelectorVertical";
import { Button } from "../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { ScrollArea } from "../components/ui/scroll-area";

export const Combobox = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="mx-auto flex h-[100vh] w-96 items-center justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            custom="combobox"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? negara.find((data) => data.value === value)?.nama
              : "Pilih Negara..."}
            <ChevronSelectorVertical className="ml-2 h-4 w-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-max p-0">
          <Command>
            <CommandInput placeholder="Cari..." />
            <CommandEmpty>Negara tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-48 rounded-md">
                {negara.map((data) => (
                  <CommandItem
                    key={data.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === data.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {data.nama}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

{
  /* <Popover>
  <PopoverTrigger asChild>
    <Button
      custom="combobox"
      role="combobox"
      className="w-full justify-between"
    >
      {field.value
        ? negara.find((data) => data.value === value)?.nama
        : "Pilih Negara..."}
      <ChevronSelectorVertical />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="p-0">
    <Command>
      <CommandInput placeholder="Cari..." />
      <CommandEmpty>Negara tidak ditemukan.</CommandEmpty>
      <CommandGroup>
        <ScrollArea className="h-48 rounded-md">
          {negara.map((data) => (
            <CommandItem
              key={data.value}
              value={data.value}
              onSelect={(value) => {
                setValue(form.setValue("kebangsaan", value));
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === data.value ? "opacity-100" : "opacity-0"
                )}
              />
              {data.nama}
            </CommandItem>
          ))}
        </ScrollArea>
      </CommandGroup>
    </Command>
  </PopoverContent>
</Popover>; */
}
