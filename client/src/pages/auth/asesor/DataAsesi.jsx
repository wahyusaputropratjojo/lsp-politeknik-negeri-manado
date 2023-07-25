import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableCaption,
  TableFooter,
  TableHead,
  TableHeader,
} from "../../../components/ui/table";

export const DataAsesi = () => {
  return (
    <>
      <div className="flex flex-col gap-12">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Data Asesi
          </h1>
          <p>Data Asesi yang dibimbing</p>
        </div>
        <div className="rounded-lg bg-white p-4"></div>
      </div>
    </>
  );
};
