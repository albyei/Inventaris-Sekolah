/*
  Warnings:

  - You are about to alter the column `status` on the `barang` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `barang` MODIFY `status` ENUM('available', 'borrowed') NOT NULL DEFAULT 'available';
