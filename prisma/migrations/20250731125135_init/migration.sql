-- CreateTable
CREATE TABLE `vcftable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `density` DOUBLE NOT NULL,
    `temperature` DOUBLE NOT NULL,
    `vcf` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `oil_tonnages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `volume` DOUBLE NOT NULL,
    `density` DOUBLE NOT NULL,
    `temperature` DOUBLE NOT NULL,
    `vcf` DOUBLE NOT NULL,
    `tonnage` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
