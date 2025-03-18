/*
  Warnings:

  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `detailtransaksi` DROP FOREIGN KEY `detailTransaksi_idTransaksi_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_idPelaggan_fkey`;

-- DropTable
DROP TABLE `order`;

-- CreateTable
CREATE TABLE `transaksi` (
    `idTransaksi` INTEGER NOT NULL AUTO_INCREMENT,
    `customer` VARCHAR(191) NOT NULL DEFAULT '',
    `order_number` VARCHAR(191) NOT NULL DEFAULT '',
    `tglTransaksi` DATETIME(3) NULL,
    `tglMulai` DATETIME(3) NULL,
    `tglAkhir` DATETIME(3) NULL,
    `statusBayar` ENUM('NEW', 'PAID', 'DONE') NOT NULL DEFAULT 'NEW',
    `totalBayar` INTEGER NOT NULL DEFAULT 0,
    `payment_method` ENUM('CASH', 'QRIS') NOT NULL DEFAULT 'CASH',
    `idPelaggan` INTEGER NOT NULL,
    `idProduk` INTEGER NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idTransaksi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_idPelaggan_fkey` FOREIGN KEY (`idPelaggan`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detailTransaksi` ADD CONSTRAINT `detailTransaksi_idTransaksi_fkey` FOREIGN KEY (`idTransaksi`) REFERENCES `transaksi`(`idTransaksi`) ON DELETE RESTRICT ON UPDATE CASCADE;
