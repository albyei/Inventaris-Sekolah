/*
  Warnings:

  - You are about to drop the column `idTrasnsaksi` on the `detailtransaksi` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `detailtransaksi` DROP FOREIGN KEY `detailTransaksi_idTrasnsaksi_fkey`;

-- AlterTable
ALTER TABLE `detailtransaksi` DROP COLUMN `idTrasnsaksi`,
    ADD COLUMN `idTransaksi` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `produk` ADD COLUMN `stok` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `detailTransaksi` ADD CONSTRAINT `detailTransaksi_idTransaksi_fkey` FOREIGN KEY (`idTransaksi`) REFERENCES `transaksi`(`idTransaksi`) ON DELETE RESTRICT ON UPDATE CASCADE;
