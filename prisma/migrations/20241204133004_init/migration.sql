/*
  Warnings:

  - You are about to alter the column `status` on the `borrow` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `barang` ADD COLUMN `status` ENUM('available', 'borrowed', 'damaged') NOT NULL DEFAULT 'available';

-- AlterTable
ALTER TABLE `borrow` MODIFY `status` ENUM('borrowed', 'returnDate', 'late') NOT NULL DEFAULT 'borrowed';
