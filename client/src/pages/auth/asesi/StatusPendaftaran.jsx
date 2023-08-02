import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../utils/axios";

export const StatusPendaftaran = () => {
  const { auth } = useContext(AuthContext);
  const [statusPendaftaran, setStatusPendaftaran] = useState(null);

  const { id } = auth;

  useQuery({
    queryKey: ["status-pendaftaran", id],
    queryFn: async () => {
      return await axios.get(`/asesi/${id}/status-pendaftaran`);
    },
    onSuccess: (data) => {
      setStatusPendaftaran(data.data.data.asesi.asesi_skema_sertifikasi);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
            Status Pendaftaran
          </h1>
          <p>Status Pendaftaran yang diajukan</p>
        </div>
        <div className="grid grid-cols-1">
          {statusPendaftaran &&
            statusPendaftaran.map((value) => {
              console.log(value);

              const {
                id,
                asesor_asesi: asesorAsesi,
                skema_sertifikasi: {
                  url_profil_skema_sertifikasi: urlProfilSkemaSertifikasi,
                  nama_skema_sertifikasi: namaSkemaSertifikasi,
                  tempat_uji_kompetensi: tempatUjiKompetensi,
                },
                is_punya_asesor: isPunyaAsesor,
                is_verifikasi_berkas: isVerifikasiBerkas,
                tujuan_asesmen: tujuanAsesmen,
              } = value;

              const { tempat_uji_kompetensi: tempat } = tempatUjiKompetensi;

              const { tujuan } = tujuanAsesmen;

              const date = new Date(asesorAsesi[0]?.tanggal_pelaksanaan);
              const tanggalPelaksanaan = date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <div
                  key={id}
                  className="col-span-1 flex gap-6 rounded-lg bg-white p-6 shadow-lg"
                >
                  <div>
                    <img
                      src={urlProfilSkemaSertifikasi}
                      alt="Gambar Skema Sertifikasi"
                      className="aspect-square w-24 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex justify-center gap-8">
                      <div className="flex gap-24">
                        <div className="grid grid-flow-col grid-rows-2 gap-x-12 gap-y-4">
                          <div>
                            <p className="text-xs font-semibold leading-none">
                              Skema Sertifikasi
                            </p>
                            <p className="text-sm">{namaSkemaSertifikasi}</p>
                          </div>
                          <div>
                            <div>
                              <p className="text-xs font-semibold leading-none">
                                Tujuan Asesmen
                              </p>
                              <p className="text-sm">{tujuan}</p>
                            </div>
                          </div>
                          {isPunyaAsesor && (
                            <>
                              <div>
                                <p className="text-xs font-semibold leading-none">
                                  Tempat Pelaksanaan
                                </p>
                                <p className="text-sm">{tempat}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold leading-none">
                                  Tanggal Pelaksanaan
                                </p>
                                <p className="text-sm">{tanggalPelaksanaan}</p>
                              </div>
                            </>
                          )}
                          <div>
                            <p className="text-xs font-semibold leading-none">
                              Status
                            </p>
                            {isPunyaAsesor ? (
                              <p className="text-sm">Anda Diterima</p>
                            ) : isVerifikasiBerkas ? (
                              <p className="text-sm">
                                Dalam Proses Penentuan Asesor
                              </p>
                            ) : (
                              <p className="text-sm">
                                Dalam Proses Verifikasi Berkas
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
