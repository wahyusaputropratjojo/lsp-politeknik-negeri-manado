import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/cn";

const labelVariants = cva(
  "text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-aileron text-secondary-300 hover:text-secondary-400 focus:text-secondary-500"
);

export const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;
