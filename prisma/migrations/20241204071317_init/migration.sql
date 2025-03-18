-- AlterTable
ALTER TABLE `barang` ADD COLUMN `status` ENUM('avilable', 'borrowed') NOT NULL DEFAULT 'avilable';
