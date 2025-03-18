/*
  Warnings:

  - You are about to drop the column `userId` on the `produk` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `Produk_userId_fkey`;

-- AlterTable
ALTER TABLE `produk` DROP COLUMN `userId`;
