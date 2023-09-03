import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../utils/axios";

import CheckCircle from "../../../assets/icons/untitled-ui-icons/line/components/CheckCircle";
import XCircle from "../../../assets/icons/untitled-ui-icons/line/components/XCircle";
import InfoCircle from "../../../assets/icons/untitled-ui-icons/line/components/InfoCircle";

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
        <div className="grid grid-cols-1 gap-4">
          {statusPendaftaran &&
            statusPendaftaran.map((value) => {
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
                is_berkas_memenuhi_syarat: isBerkasMemenuhiSyarat,
                tujuan_asesmen: tujuanAsesmen,
              } = value;

              console.log(asesorAsesi);

              const { tempat_uji_kompetensi: tempat } = tempatUjiKompetensi;

              const { tujuan } = tujuanAsesmen;

              const date = new Date(asesorAsesi[0]?.tanggal_pelaksanaan);
              const tanggalPelaksanaan = date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <div key={id} className="flex gap-6 rounded-lg bg-white p-6 shadow-lg">
                  <div>
                    <img
                      src={urlProfilSkemaSertifikasi}
                      alt="Gambar Skema Sertifikasi"
                      className="aspect-square w-24 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="grid grid-flow-col grid-rows-2 items-center gap-x-12 gap-y-4">
                      <div>
                        <p className="text-xs font-semibold leading-none">Skema Sertifikasi</p>
                        <p className="text-sm">{namaSkemaSertifikasi}</p>
                      </div>
                      <div>
                        <div>
                          <p className="text-xs font-semibold leading-none">Tujuan Asesmen</p>
                          <p className="text-sm">{tujuan}</p>
                        </div>
                      </div>
                      {!!isPunyaAsesor && !!isBerkasMemenuhiSyarat && (
                        <>
                          <div>
                            <p className="text-xs font-semibold leading-none">Tempat Pelaksanaan</p>
                            <p className="text-sm">{tempat}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold leading-none">
                              Tanggal Pelaksanaan
                            </p>
                            <p className="text-sm">{tanggalPelaksanaan}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold leading-none">Asesor</p>
                            <p className="text-sm">{asesorAsesi[0]?.asesor?.user?.nama_lengkap}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold leading-none">No. Telepon Asesor</p>
                            <p className="text-sm">
                              {!!asesorAsesi[0]?.asesor?.data_diri?.nomor_telepon
                                ? asesorAsesi[0]?.asesor?.data_diri?.nomor_telepon
                                : "0812345678910"}
                            </p>
                          </div>
                        </>
                      )}
                      <div>
                        <p className="text-xs font-semibold leading-none">Status</p>
                        {!!isVerifikasiBerkas && !isBerkasMemenuhiSyarat ? (
                          <p className="text-sm">Ditolak</p>
                        ) : !!isVerifikasiBerkas && !!isPunyaAsesor && !!isBerkasMemenuhiSyarat ? (
                          <p className="text-sm">Diterima</p>
                        ) : !!isVerifikasiBerkas ? (
                          <p className="text-sm">Dalam Proses Penentuan Asesor</p>
                        ) : (
                          <p className="text-sm">Dalam Proses Verifikasi Berkas</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {!!isVerifikasiBerkas && !!isPunyaAsesor && !!isBerkasMemenuhiSyarat && (
                        <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success-500">
                          <CheckCircle className="text-2xl text-white" />
                        </div>
                      )}
                      {!!isVerifikasiBerkas && !isBerkasMemenuhiSyarat && (
                        <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-error-500">
                          <XCircle className="text-2xl text-white" />
                        </div>
                      )}
                      {!!isVerifikasiBerkas && !isPunyaAsesor && !!isBerkasMemenuhiSyarat && (
                        <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-warning-500">
                          <InfoCircle className="text-2xl text-white" />
                        </div>
                      )}
                      {!isVerifikasiBerkas && (
                        <div className="flex h-20 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-warning-500">
                          <InfoCircle className="text-2xl text-white" />
                        </div>
                      )}
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
