/*
  Warnings:

  - You are about to drop the `detailtransaksi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `detailtransaksi` DROP FOREIGN KEY `detailTransaksi_idProduk_fkey`;

-- DropForeignKey
ALTER TABLE `detailtransaksi` DROP FOREIGN KEY `detailTransaksi_idTransaksi_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_idProduk_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_idUser_fkey`;

-- DropTable
DROP TABLE `detailtransaksi`;

-- DropTable
DROP TABLE `order`;

-- DropTable
DROP TABLE `produk`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Catatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('INCOME', 'EXPENSE') NOT NULL DEFAULT 'EXPENSE',
    `amount` DOUBLE NOT NULL DEFAULT 0,
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
