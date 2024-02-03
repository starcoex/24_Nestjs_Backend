/*
  Warnings:

  - You are about to alter the column `createdAt` on the `PortOne` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `productSaleslocations` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `productSaleslocations` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `productTags` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `productTags` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `productcategories` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `productcategories` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deletedAt` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `userId` on table `PortOne` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `PortOne` DROP FOREIGN KEY `PortOne_userId_fkey`;

-- AlterTable
ALTER TABLE `PortOne` MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `productSaleslocations` MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `productTags` MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `productcategories` MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `products` MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    MODIFY `deletedAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AddForeignKey
ALTER TABLE `PortOne` ADD CONSTRAINT `PortOne_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
