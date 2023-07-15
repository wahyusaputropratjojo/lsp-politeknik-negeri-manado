import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/cn";
import { Alert, AlertDescription } from "../alert";
import Upload04 from "../../../assets/icons/untitled-ui-icons/line/components/Upload04";

export const uploadVariants = cva(
  "flex flex-col items-center justify-center gap-2 rounded-lg border-2 transition-colors",
  {
    variants: {
      variant: {
        primary:
          "border-secondary-300 text-secondary-300 hover:border-secondary-400 hover:bg-neutral-600 active:bg-neutral-700",
        error: "border-error-500 text-error-500 hover:border-error-600",
      },
      size: {
        xs: "px-2 py-2 text-xs",
        sm: "px-4 py-4 text-sm",
        md: "px-4 py-6 text-sm",
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

export const Upload = React.forwardRef(
  ({ className, variant, size, totalFile, ...props }, ref) => {
    const [fileCount, setFileCount] = React.useState();

    const inputFile = React.useRef();

    React.useEffect(() => {
      setFileCount(totalFile);
    }, [totalFile]);

    const handleClick = () => {
      inputFile.current.click();
    };

    return (
      <>
        <input ref={inputFile} type="file" className="hidden" {...props} />
        <button
          ref={ref}
          type="button"
          onClick={handleClick}
          className={cn(uploadVariants({ variant, size, className }))}
        >
          <Upload04 className="text-[2em]" />
          {fileCount ? (
            <p className="select-none">{fileCount} File Terpilih</p>
          ) : (
            <p className="select-none">Pilih File</p>
          )}
        </button>
      </>
    );
  }
);
