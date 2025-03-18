/*
  Warnings:

  - You are about to drop the column `kategoriId` on the `produk` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `produk` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `Produk_kategoriId_fkey`;

-- AlterTable
ALTER TABLE `produk` DROP COLUMN `kategoriId`,
    DROP COLUMN `price`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `location` VARCHAR(191) NOT NULL DEFAULT '';
