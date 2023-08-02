import * as yup from "yup";

export const registerSchema = yup.object().shape({
  nama: yup.string().required("Nama tidak boleh kosong!"),
  email: yup
    .string()
    .email("Format Email tidak valid!")
    .required("Email tidak boleh kosong!"),
  password: yup
    .string()
    .min(6, "Password minimal 6 karakter!")
    .required("Password tidak boleh kosong!"),
  konfirmasiPassword: yup
    .string()
    .required("Konfirmasi Password tidak boleh kosong!")
    .oneOf(
      [yup.ref("password"), null],
      "Konfirmasi Password tidak sama dengan Password!",
    ),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email tidak boleh kosong!")
    .email("Format Email tidak valid!"),
  password: yup.string().required("Password tidak boleh kosong!"),
});

export const permohonanSertifikasiKompetensiSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email tidak boleh kosong!")
    .email("Format Email tidak valid!"),
  password: yup.string().required("Password tidak boleh kosong!"),
  nama_lengkap: yup.string().required("Nama Lengkap tidak boleh kosong!"),
  nik: yup.string().required("NIK tidak boleh kosong!"),
  tempat_lahir: yup.string().required("Tempat Lahir tidak boleh kosong!"),
  tanggal_lahir: yup
    .date("Tanggal Lahir tidak boleh kosong!")
    .required("Tanggal Lahir tidak boleh kosong!"),
  jenis_kelamin: yup.string().required("Jenis Kelamin tidak boleh kosong!"),
  kebangsaan: yup.string().required("Kebangsaan tidak boleh kosong!"),
  nomor_telepon: yup.string().required("Nomor Telepon tidak boleh kosong!"),
  kualifikasi_pendidikan: yup
    .string()
    .required("Kualifikasi Pendidikan tidak boleh kosong!"),
  alamat_rumah: yup.object({
    provinsi: yup.string().required("Provinsi tidak boleh kosong!"),
    kota_kabupaten: yup.string().required("Kota/Kelurahan tidak boleh kosong!"),
    kecamatan: yup.string().required("Kecamatan tidak boleh kosong!"),
    kelurahan_desa: yup.string().required("Kelurahan/Desa tidak boleh kosong!"),
  }),
  nama_institusi_perusahaan: yup
    .string()
    .required("Nama Institusi/Perusahaan tidak boleh kosong!"),
  jabatan: yup.string().required("Jabatan tidak boleh kosong!"),
  nomor_telepon_kantor: yup
    .string()
    .required("Nomor Telepon Kantor tidak boleh kosong!"),
  email_kantor: yup
    .string()
    .required("Email tidak boleh kosong!")
    .email("Format Email tidak valid!"),
  fax_kantor: yup.string().required("Fax tidak boleh kosong!"),
  alamat_kantor: yup.object({
    provinsi: yup.string().required("Provinsi tidak boleh kosong!"),
    kota_kabupaten: yup.string().required("Kota/Kelurahan tidak boleh kosong!"),
    kecamatan: yup.string().required("Kecamatan tidak boleh kosong!"),
    kelurahan_desa: yup.string().required("Kelurahan/Desa tidak boleh kosong!"),
  }),
  profil_user: yup.mixed().required("Foto Profil tidak boleh kosong!"),
  skema_sertifikasi: yup
    .string()
    .required("Skema Sertifikasi tidak boleh kosong!"),
  tujuan_asesmen: yup.string().required("Tujuan Asesmen tidak boleh kosong!"),
});

export const penentuanAsesor = yup.object().shape({
  id_asesor: yup.string().required("Asesor tidak boleh kosong!"),
  tanggal_pelaksanaan: yup
    .date()
    .required("Tanggal Pelaksanaan tidak boleh kosong!"),
});
