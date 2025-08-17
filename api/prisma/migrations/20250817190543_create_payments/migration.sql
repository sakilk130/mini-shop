-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `carts` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `order_items` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `reviews` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `method` ENUM('CARD', 'PAYPAL', 'COD') NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` ENUM('PENDING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
