/*
  Warnings:

  - You are about to alter the column `deletedAt` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `deletedAt` DATETIME NULL DEFAULT NOW();
