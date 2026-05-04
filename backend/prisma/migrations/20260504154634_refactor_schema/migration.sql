/*
  Warnings:

  - The values [COMPLETED] on the enum `orders_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `colorCode` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CollectionItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[vnpayTxnRef]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Collection` DROP FOREIGN KEY `Collection_userId_fkey`;

-- DropForeignKey
ALTER TABLE `CollectionItem` DROP FOREIGN KEY `CollectionItem_collectionId_fkey`;

-- DropForeignKey
ALTER TABLE `CollectionItem` DROP FOREIGN KEY `CollectionItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_userId_fkey`;

-- DropForeignKey
ALTER TABLE `analysis_histories` DROP FOREIGN KEY `analysis_histories_userId_fkey`;

-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_orderId_fkey`;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `paymentMethod` ENUM('COD', 'VNPAY') NOT NULL DEFAULT 'COD',
    ADD COLUMN `paymentStatus` ENUM('UNPAID', 'PAID', 'REFUNDED') NOT NULL DEFAULT 'UNPAID',
    ADD COLUMN `vnpayTransactionNo` VARCHAR(191) NULL,
    ADD COLUMN `vnpayTxnRef` VARCHAR(191) NULL,
    MODIFY `status` ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `products` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    MODIFY `colorCode` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- DropTable
DROP TABLE `Collection`;

-- DropTable
DROP TABLE `CollectionItem`;

-- DropTable
DROP TABLE `Review`;

-- CreateTable
CREATE TABLE `refresh_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `deviceInfo` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `refresh_tokens_token_key`(`token`),
    INDEX `refresh_tokens_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `color_groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `userId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `color_groups_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `color_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `colorGroupId` INTEGER NOT NULL,
    `hexCode` VARCHAR(10) NOT NULL,
    `name` VARCHAR(100) NULL,

    INDEX `color_items_colorGroupId_idx`(`colorGroupId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collections` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NULL,
    `shortDesc` VARCHAR(255) NULL,
    `longDesc` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `collections_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collection_items` (
    `id` VARCHAR(191) NOT NULL,
    `collectionId` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,
    `addedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `collection_items_productId_idx`(`productId`),
    UNIQUE INDEX `collection_items_collectionId_productId_key`(`collectionId`, `productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` TEXT NULL,
    `images` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `reviews_productId_idx`(`productId`),
    UNIQUE INDEX `reviews_userId_productId_key`(`userId`, `productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `orders_vnpayTxnRef_key` ON `orders`(`vnpayTxnRef`);

-- CreateIndex
CREATE INDEX `orders_vnpayTxnRef_idx` ON `orders`(`vnpayTxnRef`);

-- CreateIndex
CREATE INDEX `products_deletedAt_idx` ON `products`(`deletedAt`);

-- AddForeignKey
ALTER TABLE `refresh_tokens` ADD CONSTRAINT `refresh_tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `color_groups` ADD CONSTRAINT `color_groups_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `color_items` ADD CONSTRAINT `color_items_colorGroupId_fkey` FOREIGN KEY (`colorGroupId`) REFERENCES `color_groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analysis_histories` ADD CONSTRAINT `analysis_histories_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collections` ADD CONSTRAINT `collections_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collection_items` ADD CONSTRAINT `collection_items_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `collections`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collection_items` ADD CONSTRAINT `collection_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `analysis_histories` RENAME INDEX `analysis_histories_userId_fkey` TO `analysis_histories_userId_idx`;

-- RenameIndex
ALTER TABLE `order_items` RENAME INDEX `order_items_orderId_fkey` TO `order_items_orderId_idx`;

-- RenameIndex
ALTER TABLE `order_items` RENAME INDEX `order_items_productId_fkey` TO `order_items_productId_idx`;

-- RenameIndex
ALTER TABLE `orders` RENAME INDEX `orders_userId_fkey` TO `orders_userId_idx`;
