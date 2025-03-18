-- AlterTable
ALTER TABLE `produk` ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Produk` ADD CONSTRAINT `Produk_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
