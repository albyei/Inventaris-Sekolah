/*
  Warnings:

  - You are about to drop the `kategori` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `kategori`;

-- CreateTable
CREATE TABLE `borrow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL DEFAULT '',
    `userId` INTEGER NOT NULL,
    `barangId` INTEGER NOT NULL,
    `borror_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dueDate` DATETIME(3) NOT NULL,
    `returnDate` DATETIME(3) NOT NULL,
    `status` ENUM('borrowed', 'returnDate', 'late') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `borrow` ADD CONSTRAINT `borrow_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `borrow` ADD CONSTRAINT `borrow_barangId_fkey` FOREIGN KEY (`barangId`) REFERENCES `barang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
