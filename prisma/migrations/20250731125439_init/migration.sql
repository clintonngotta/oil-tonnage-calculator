/*
  Warnings:

  - Added the required column `class` to the `vcftable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vcf2` to the `vcftable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vcftable` ADD COLUMN `class` VARCHAR(191) NOT NULL,
    ADD COLUMN `vcf2` VARCHAR(191) NOT NULL;
