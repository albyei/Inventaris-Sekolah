/*
  Warnings:

  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `alamat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userprofil` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `alamat` DROP FOREIGN KEY `alamat_userId_fkey`;

-- DropForeignKey
ALTER TABLE `userprofil` DROP FOREIGN KEY `userProfil_id_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `alamat` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `dateBirth` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `gender` ENUM('MAN', 'WOMAN') NOT NULL DEFAULT 'MAN',
    ADD COLUMN `phoneNumber` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `postalCode` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `role` ENUM('CUSTOMER', 'ADMIN') NOT NULL DEFAULT 'CUSTOMER';

-- DropTable
DROP TABLE `admin`;

-- DropTable
DROP TABLE `alamat`;

-- DropTable
DROP TABLE `userprofil`;
