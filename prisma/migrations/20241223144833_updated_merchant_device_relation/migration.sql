/*
  Warnings:

  - You are about to drop the column `name` on the `Merchant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "merchant_name" DROP DEFAULT,
ALTER COLUMN "replacement_type" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "name";
