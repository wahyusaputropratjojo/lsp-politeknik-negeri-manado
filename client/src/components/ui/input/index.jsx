import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/cn";

import { Alert, AlertDescription } from "../alert";
import Upload04 from "../../../assets/icons/untitled-ui-icons/line/components/Upload04";

export const inputVariants = cva(
  "inline-flex rounded-lg border-2 bg-transparent font-aileron transition-colors hover:text-secondary-400 focus:text-secondary-500 focus:outline-none disabled:cursor-not-allowed disabled:border-secondary-100 disabled:bg-secondary-100 disabled:text-secondary-300",
  {
    variants: {
      variant: {
        primary:
          "border-secondary-300 placeholder:text-secondary-100 hover:border-secondary-400  focus:border-secondary-500 active:border-secondary-400",
        error:
          "border-error-500 placeholder:text-secondary-100 focus:border-error-600 active:border-error-500",
      },
      size: {
        xs: "h-10 px-2 text-sm",
        sm: "h-12 px-2 text-sm",
        md: "h-14 px-4 text-sm",
        lg: "h-16 px-4 text-base",
        xl: "h-20 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export const inputFileVariants = cva(
  "flex flex-col items-center justify-center gap-2 rounded-lg border-2 transition-colors",
  {
    variants: {
      variant: {
        primary:
          "border-secondary-300 text-secondary-300 hover:border-secondary-400 hover:bg-neutral-600 active:bg-neutral-700",
        error:
          "border-error-500 text-secondary-300 hover:bg-neutral-600 active:bg-neutral-700",
      },
      size: {
        xs: "px-2 py-2 text-sm",
        sm: "px-2 py-4 text-sm",
        md: "px-4 py-6 text-sm",
        lg: "px-4 py-10 text-base",
        xl: "px-4 py-14 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export const Input = React.forwardRef(
  ({ className, variant, size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export const InputFile = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    const inputFile = React.useRef();

    const handleClick = () => {
      inputFile.current.click();
    };

    return (
      <>
        <input ref={inputFile} type="file" className="hidden" {...props} />
        <div
          ref={ref}
          onClick={handleClick}
          className={cn(inputFileVariants({ variant, size, className }))}
        >
          <Upload04 className="text-[2em]" />
          <p className="select-none">Klik untuk upload file</p>
        </div>
      </>
    );
  }
);
