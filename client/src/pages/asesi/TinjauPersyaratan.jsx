import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

import { Button } from "../../components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export const TinjauPersyaratan = () => {
  return (
    <>
      <section>
        <div className="flex flex-col gap-12">
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Tinjau Persyaratan
          </h1>
          <div className="rounded-lg bg-white p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-2/12">Nama</TableHead>
                  <TableHead>Skema Sertifikasi</TableHead>
                  <TableHead className="w-5/12">Persyaratan Dasar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Wahyu Saputro Pratjojo</TableCell>
                  <TableCell>Memasang dan Merakit PHB</TableCell>
                  <TableCell className="max-w-xs">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Bukti</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-2 pl-4 pr-2">
                            <p className="relative">
                              <span className="absolute -left-4">1. </span>
                              Bagi tenaga kerja, minimal pendidikan SMK bidang
                              teknik yang memiliki pengalaman kerja 1 tahun di
                              bidang pekerjaan Instalasi
                            </p>
                            <p>Bukti:</p>
                            <div className="flex gap-2">
                              <div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <img
                                      src="http://localhost:3000/uploads/new-profile-1024px-7-10-2023-23-57-40-819-2659.png"
                                      alt=""
                                      className="aspect-[3/4] max-w-[3rem] cursor-pointer rounded-lg object-cover"
                                    />
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[30rem]">
                                    <img
                                      src="http://localhost:3000/uploads/new-profile-1024px-7-10-2023-23-57-40-819-2659.png"
                                      alt=""
                                      className="cursor-pointer rounded-lg object-cover"
                                    />
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="success" size="xs">
                        Terima
                      </Button>
                      <Button variant="error" size="xs">
                        Tolak
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </>
  );
};
