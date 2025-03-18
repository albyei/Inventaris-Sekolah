/*
  Warnings:

  - You are about to drop the column `status` on the `transaksi` table. All the data in the column will be lost.
  - You are about to alter the column `statusBayar` on the `transaksi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `transaksi` DROP COLUMN `status`,
    MODIFY `statusBayar` ENUM('NEW', 'PAID', 'DONE') NOT NULL DEFAULT 'NEW';
