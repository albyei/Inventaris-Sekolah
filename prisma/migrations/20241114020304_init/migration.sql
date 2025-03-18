-- AlterTable
ALTER TABLE `transaksi` ADD COLUMN `status` ENUM('NEW', 'PAID', 'DONE') NOT NULL DEFAULT 'NEW';
