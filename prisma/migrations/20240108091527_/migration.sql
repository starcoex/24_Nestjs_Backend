/*
  Warnings:

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

*/
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

-- CreateTable
CREATE TABLE `PortOne` (
    `id` VARCHAR(191) NOT NULL,
    `impUid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    `updatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    UNIQUE INDEX `PortOne_impUid_key`(`impUid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
