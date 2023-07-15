-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `nama_lengkap` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('Asesi', 'Asesor', 'Administrator') NOT NULL DEFAULT 'Asesi',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asesi` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_data_diri` VARCHAR(191) NOT NULL,
    `id_data_pekerjaan` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `asesi_id_user_key`(`id_user`),
    UNIQUE INDEX `asesi_id_data_diri_key`(`id_data_diri`),
    UNIQUE INDEX `asesi_id_data_pekerjaan_key`(`id_data_pekerjaan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asesi_skema` (
    `id` VARCHAR(191) NOT NULL,
    `id_asesi` VARCHAR(191) NOT NULL,
    `id_skema` VARCHAR(191) NOT NULL,
    `id_tujuan_asesmen` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `asesi_skema_id_asesi_key`(`id_asesi`),
    UNIQUE INDEX `asesi_skema_id_skema_key`(`id_skema`),
    UNIQUE INDEX `asesi_skema_id_tujuan_asesmen_key`(`id_tujuan_asesmen`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `portofolio` (
    `id` VARCHAR(191) NOT NULL,
    `id_asesi_skema_sertifikasi` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file_portofolio` (
    `id` VARCHAR(191) NOT NULL,
    `id_portofolio` VARCHAR(191) NOT NULL,
    `file` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bukti_persyaratan_dasar` (
    `id` VARCHAR(191) NOT NULL,
    `id_asesi_skema_sertifikasi` VARCHAR(191) NOT NULL,
    `id_persyaratan_dasar` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file_bukti_persyaratan_dasar` (
    `id` VARCHAR(191) NOT NULL,
    `id_bukti_persyaratan_dasar` VARCHAR(191) NOT NULL,
    `file` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asesor` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_data_diri` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `asesor_id_user_key`(`id_user`),
    UNIQUE INDEX `asesor_id_data_diri_key`(`id_data_diri`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asesor_skema` (
    `id` VARCHAR(191) NOT NULL,
    `id_asesor` VARCHAR(191) NOT NULL,
    `id_skema` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `asesor_skema_id_asesor_key`(`id_asesor`),
    UNIQUE INDEX `asesor_skema_id_skema_key`(`id_skema`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asesor_asesi` (
    `id` VARCHAR(191) NOT NULL,
    `id_asesor` VARCHAR(191) NOT NULL,
    `id_asesi` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `asesor_asesi_id_asesor_key`(`id_asesor`),
    UNIQUE INDEX `asesor_asesi_id_asesi_key`(`id_asesi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_tempat_uji_kompetensi` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_id_user_key`(`id_user`),
    UNIQUE INDEX `admin_id_tempat_uji_kompetensi_key`(`id_tempat_uji_kompetensi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `data_diri` (
    `id` VARCHAR(191) NOT NULL,
    `id_alamat` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `tempat_lahir` VARCHAR(191) NOT NULL,
    `tanggal_lahir` DATETIME(3) NOT NULL,
    `jenis_kelamin` VARCHAR(191) NOT NULL,
    `kebangsaan` VARCHAR(191) NOT NULL,
    `nomor_telepon` VARCHAR(191) NOT NULL,
    `kualifikasi_pendidikan` VARCHAR(191) NOT NULL,
    `foto_profil` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `data_diri_id_alamat_key`(`id_alamat`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `data_pekerjaan` (
    `id` VARCHAR(191) NOT NULL,
    `id_alamat` VARCHAR(191) NOT NULL,
    `nama_perusahaan` VARCHAR(191) NOT NULL,
    `jabatan` VARCHAR(191) NOT NULL,
    `nomor_telepon` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `fax` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `data_pekerjaan_id_alamat_key`(`id_alamat`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profil` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `profil_id_user_key`(`id_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alamat` (
    `id` VARCHAR(191) NOT NULL,
    `provinsi` VARCHAR(191) NOT NULL,
    `kota_kabupaten` VARCHAR(191) NOT NULL,
    `kecamatan` VARCHAR(191) NOT NULL,
    `kelurahan_desa` VARCHAR(191) NOT NULL,
    `keterangan_lainnya` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `token` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tempat_uji_kompetensi` (
    `id` VARCHAR(191) NOT NULL,
    `id_alamat` VARCHAR(191) NULL,
    `kode_tempat_uji_kompetensi` VARCHAR(191) NOT NULL,
    `tempat_uji_kompetensi` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tempat_uji_kompetensi_id_alamat_key`(`id_alamat`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skema_sertifikasi` (
    `id` VARCHAR(191) NOT NULL,
    `id_tempat_uji_kompetensi` VARCHAR(191) NOT NULL,
    `kode` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `skema_sertifikasi_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unit_kompetensi` (
    `id` VARCHAR(191) NOT NULL,
    `id_skema_sertifikasi` VARCHAR(191) NOT NULL,
    `kode` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `unit_kompetensi_kode_key`(`kode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `persyaratan_dasar` (
    `id` VARCHAR(191) NOT NULL,
    `id_skema_sertifikasi` VARCHAR(191) NOT NULL,
    `persyaratan_dasar` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aktivitas_unit_kompetensi` (
    `id` VARCHAR(191) NOT NULL,
    `id_unit_kompetensi` VARCHAR(191) NOT NULL,
    `element` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kriteria_unjuk_kerja` (
    `id` VARCHAR(191) NOT NULL,
    `id_aktivitas_unit_kompetensi` VARCHAR(191) NOT NULL,
    `kriteria_unjuk_kerja` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pertanyaan_observasi` (
    `id` VARCHAR(191) NOT NULL,
    `id_unit_kompetensi` VARCHAR(191) NOT NULL,
    `pertanyaan` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pertanyaan_esai` (
    `id` VARCHAR(191) NOT NULL,
    `id_unit_kompetensi` VARCHAR(191) NOT NULL,
    `pertanyaan` VARCHAR(191) NOT NULL,
    `jawaban` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pertanyaan_lisan` (
    `id` VARCHAR(191) NOT NULL,
    `id_unit_kompetensi` VARCHAR(191) NOT NULL,
    `pertanyaan` VARCHAR(191) NOT NULL,
    `jawaban` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pertanyaan_tertulis` (
    `id` VARCHAR(191) NOT NULL,
    `id_unit_kompetensi` VARCHAR(191) NOT NULL,
    `pertanyaan` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jawaban_pertanyaan_tertulis` (
    `id` VARCHAR(191) NOT NULL,
    `id_pertanyaan_tulis` VARCHAR(191) NOT NULL,
    `jawaban` VARCHAR(191) NOT NULL,
    `benar` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tujuan_asesmen` (
    `id` VARCHAR(191) NOT NULL,
    `tujuan` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provinsi` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kabupaten` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `id_provinsi` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kecamatan` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `id_kabupaten` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `desa` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `id_kecamatan` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `asesi` ADD CONSTRAINT `asesi_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesi` ADD CONSTRAINT `asesi_id_data_diri_fkey` FOREIGN KEY (`id_data_diri`) REFERENCES `data_diri`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesi` ADD CONSTRAINT `asesi_id_data_pekerjaan_fkey` FOREIGN KEY (`id_data_pekerjaan`) REFERENCES `data_pekerjaan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesi_skema` ADD CONSTRAINT `asesi_skema_id_asesi_fkey` FOREIGN KEY (`id_asesi`) REFERENCES `asesi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesi_skema` ADD CONSTRAINT `asesi_skema_id_skema_fkey` FOREIGN KEY (`id_skema`) REFERENCES `skema_sertifikasi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesi_skema` ADD CONSTRAINT `asesi_skema_id_tujuan_asesmen_fkey` FOREIGN KEY (`id_tujuan_asesmen`) REFERENCES `tujuan_asesmen`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `portofolio` ADD CONSTRAINT `portofolio_id_asesi_skema_sertifikasi_fkey` FOREIGN KEY (`id_asesi_skema_sertifikasi`) REFERENCES `asesi_skema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file_portofolio` ADD CONSTRAINT `file_portofolio_id_portofolio_fkey` FOREIGN KEY (`id_portofolio`) REFERENCES `portofolio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bukti_persyaratan_dasar` ADD CONSTRAINT `bukti_persyaratan_dasar_id_persyaratan_dasar_fkey` FOREIGN KEY (`id_persyaratan_dasar`) REFERENCES `persyaratan_dasar`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bukti_persyaratan_dasar` ADD CONSTRAINT `bukti_persyaratan_dasar_id_asesi_skema_sertifikasi_fkey` FOREIGN KEY (`id_asesi_skema_sertifikasi`) REFERENCES `asesi_skema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `file_bukti_persyaratan_dasar` ADD CONSTRAINT `file_bukti_persyaratan_dasar_id_bukti_persyaratan_dasar_fkey` FOREIGN KEY (`id_bukti_persyaratan_dasar`) REFERENCES `bukti_persyaratan_dasar`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesor` ADD CONSTRAINT `asesor_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesor` ADD CONSTRAINT `asesor_id_data_diri_fkey` FOREIGN KEY (`id_data_diri`) REFERENCES `data_diri`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesor_skema` ADD CONSTRAINT `asesor_skema_id_asesor_fkey` FOREIGN KEY (`id_asesor`) REFERENCES `asesor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesor_skema` ADD CONSTRAINT `asesor_skema_id_skema_fkey` FOREIGN KEY (`id_skema`) REFERENCES `skema_sertifikasi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesor_asesi` ADD CONSTRAINT `asesor_asesi_id_asesor_fkey` FOREIGN KEY (`id_asesor`) REFERENCES `asesor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesor_asesi` ADD CONSTRAINT `asesor_asesi_id_asesi_fkey` FOREIGN KEY (`id_asesi`) REFERENCES `asesi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_id_tempat_uji_kompetensi_fkey` FOREIGN KEY (`id_tempat_uji_kompetensi`) REFERENCES `tempat_uji_kompetensi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `data_diri` ADD CONSTRAINT `data_diri_id_alamat_fkey` FOREIGN KEY (`id_alamat`) REFERENCES `alamat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `data_pekerjaan` ADD CONSTRAINT `data_pekerjaan_id_alamat_fkey` FOREIGN KEY (`id_alamat`) REFERENCES `alamat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profil` ADD CONSTRAINT `profil_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth` ADD CONSTRAINT `auth_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tempat_uji_kompetensi` ADD CONSTRAINT `tempat_uji_kompetensi_id_alamat_fkey` FOREIGN KEY (`id_alamat`) REFERENCES `alamat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skema_sertifikasi` ADD CONSTRAINT `skema_sertifikasi_id_tempat_uji_kompetensi_fkey` FOREIGN KEY (`id_tempat_uji_kompetensi`) REFERENCES `tempat_uji_kompetensi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unit_kompetensi` ADD CONSTRAINT `unit_kompetensi_id_skema_sertifikasi_fkey` FOREIGN KEY (`id_skema_sertifikasi`) REFERENCES `skema_sertifikasi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `persyaratan_dasar` ADD CONSTRAINT `persyaratan_dasar_id_skema_sertifikasi_fkey` FOREIGN KEY (`id_skema_sertifikasi`) REFERENCES `skema_sertifikasi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aktivitas_unit_kompetensi` ADD CONSTRAINT `aktivitas_unit_kompetensi_id_unit_kompetensi_fkey` FOREIGN KEY (`id_unit_kompetensi`) REFERENCES `unit_kompetensi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kriteria_unjuk_kerja` ADD CONSTRAINT `kriteria_unjuk_kerja_id_aktivitas_unit_kompetensi_fkey` FOREIGN KEY (`id_aktivitas_unit_kompetensi`) REFERENCES `aktivitas_unit_kompetensi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pertanyaan_observasi` ADD CONSTRAINT `pertanyaan_observasi_id_unit_kompetensi_fkey` FOREIGN KEY (`id_unit_kompetensi`) REFERENCES `unit_kompetensi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pertanyaan_esai` ADD CONSTRAINT `pertanyaan_esai_id_unit_kompetensi_fkey` FOREIGN KEY (`id_unit_kompetensi`) REFERENCES `unit_kompetensi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pertanyaan_lisan` ADD CONSTRAINT `pertanyaan_lisan_id_unit_kompetensi_fkey` FOREIGN KEY (`id_unit_kompetensi`) REFERENCES `unit_kompetensi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pertanyaan_tertulis` ADD CONSTRAINT `pertanyaan_tertulis_id_unit_kompetensi_fkey` FOREIGN KEY (`id_unit_kompetensi`) REFERENCES `unit_kompetensi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jawaban_pertanyaan_tertulis` ADD CONSTRAINT `jawaban_pertanyaan_tertulis_id_pertanyaan_tulis_fkey` FOREIGN KEY (`id_pertanyaan_tulis`) REFERENCES `pertanyaan_tertulis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kabupaten` ADD CONSTRAINT `kabupaten_id_provinsi_fkey` FOREIGN KEY (`id_provinsi`) REFERENCES `provinsi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kecamatan` ADD CONSTRAINT `kecamatan_id_kabupaten_fkey` FOREIGN KEY (`id_kabupaten`) REFERENCES `kabupaten`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `desa` ADD CONSTRAINT `desa_id_kecamatan_fkey` FOREIGN KEY (`id_kecamatan`) REFERENCES `kecamatan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
