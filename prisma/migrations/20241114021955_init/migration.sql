/*
  Warnings:

  - You are about to drop the column `stock` on the `transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `tglBayar` on the `transaksi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transaksi` DROP COLUMN `stock`,
    DROP COLUMN `tglBayar`,
    ADD COLUMN `customer` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `idProduk` INTEGER NULL,
    ADD COLUMN `order_number` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `payment_method` ENUM('CASH', 'QRIS') NOT NULL DEFAULT 'CASH';
