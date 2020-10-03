import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedTimeStampToMissingColumns1601760554616 implements MigrationInterface {
    name = 'AddedTimeStampToMissingColumns1601760554616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `order_customer_id_fk`", undefined);
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `order_product_id_fk`", undefined);
        await queryRunner.query("ALTER TABLE `cart` DROP FOREIGN KEY `cart_customer_id_fk`", undefined);
        await queryRunner.query("ALTER TABLE `cart` DROP FOREIGN KEY `cart_product_id_fk`", undefined);
        await queryRunner.query("ALTER TABLE `category` CHANGE `modifiedAt` `modifiedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP", undefined);
        await queryRunner.query("ALTER TABLE `order` CHANGE `modifiedAt` `modifiedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP", undefined);
        await queryRunner.query("ALTER TABLE `cart` CHANGE `modifiedAt` `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP", undefined);
        await queryRunner.query("CREATE INDEX `order_customer_id_fk` ON `order` (`customerId`)", undefined);
        await queryRunner.query("CREATE INDEX `order_product_id_fk` ON `order` (`productId`)", undefined);
        await queryRunner.query("CREATE INDEX `cart_product_id_fk` ON `cart` (`productId`)", undefined);
        await queryRunner.query("CREATE INDEX `cart_customer_id_fk` ON `cart` (`customerId`)", undefined);
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_124456e637cca7a415897dce659` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_88991860e839c6153a7ec878d39` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `cart` ADD CONSTRAINT `FK_eac3d1f269ffeb0999fbde0185b` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `cart` ADD CONSTRAINT `FK_371eb56ecc4104c2644711fa85f` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `cart` DROP FOREIGN KEY `FK_371eb56ecc4104c2644711fa85f`", undefined);
        await queryRunner.query("ALTER TABLE `cart` DROP FOREIGN KEY `FK_eac3d1f269ffeb0999fbde0185b`", undefined);
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_88991860e839c6153a7ec878d39`", undefined);
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_124456e637cca7a415897dce659`", undefined);
        await queryRunner.query("DROP INDEX `cart_customer_id_fk` ON `cart`", undefined);
        await queryRunner.query("DROP INDEX `cart_product_id_fk` ON `cart`", undefined);
        await queryRunner.query("DROP INDEX `order_product_id_fk` ON `order`", undefined);
        await queryRunner.query("DROP INDEX `order_customer_id_fk` ON `order`", undefined);
        await queryRunner.query("ALTER TABLE `cart` CHANGE `modifiedAt` `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP", undefined);
        await queryRunner.query("ALTER TABLE `order` CHANGE `modifiedAt` `modifiedAt` timestamp NULL", undefined);
        await queryRunner.query("ALTER TABLE `category` CHANGE `modifiedAt` `modifiedAt` timestamp NULL", undefined);
        await queryRunner.query("ALTER TABLE `cart` ADD CONSTRAINT `cart_product_id_fk` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `cart` ADD CONSTRAINT `cart_customer_id_fk` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `order_product_id_fk` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `order_customer_id_fk` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT", undefined);
    }

}
