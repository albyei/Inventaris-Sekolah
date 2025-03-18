/*
  Warnings:

  - The `dateBirth` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `dateBirth`,
    ADD COLUMN `dateBirth` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
