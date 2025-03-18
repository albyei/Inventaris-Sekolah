/*
  Warnings:

  - The primary key for the `detailtransaksi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_detail_transaksi` on the `detailtransaksi` table. All the data in the column will be lost.
  - You are about to drop the `transaksi` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id` to the `detailTransaksi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `detailtransaksi` DROP FOREIGN KEY `detailTransaksi_idProduk_fkey`;

-- DropForeignKey
ALTER TABLE `detailtransaksi` DROP FOREIGN KEY `detailTransaksi_idTransaksi_fkey`;

-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `transaksi_idPelaggan_fkey`;

-- AlterTable
ALTER TABLE `detailtransaksi` DROP PRIMARY KEY,
    DROP COLUMN `id_detail_transaksi`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `idProduk` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `transaksi`;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL DEFAULT '',
    `customer` VARCHAR(191) NOT NULL DEFAULT '',
    `order_number` VARCHAR(191) NOT NULL DEFAULT '',
    `tglTransaksi` DATETIME(3) NULL,
    `tglMulai` DATETIME(3) NULL,
    `tglAkhir` DATETIME(3) NULL,
    `statusBayar` ENUM('NEW', 'PAID', 'DONE') NOT NULL DEFAULT 'NEW',
    `totalBayar` INTEGER NOT NULL DEFAULT 0,
    `payment_method` ENUM('CASH', 'QRIS') NOT NULL DEFAULT 'CASH',
    `idUser` INTEGER NULL,
    `idProduk` INTEGER NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_idProduk_fkey` FOREIGN KEY (`idProduk`) REFERENCES `Produk`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detailTransaksi` ADD CONSTRAINT `detailTransaksi_idProduk_fkey` FOREIGN KEY (`idProduk`) REFERENCES `Produk`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detailTransaksi` ADD CONSTRAINT `detailTransaksi_idTransaksi_fkey` FOREIGN KEY (`idTransaksi`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
