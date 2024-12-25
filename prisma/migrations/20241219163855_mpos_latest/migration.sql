/*
  Warnings:

  - You are about to drop the column `si_no` on the `Device` table. All the data in the column will be lost.
  - Made the column `sim` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `status` on the `Device` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `merchant_id` on table `Device` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ReplacementType" AS ENUM ('GREEN_FIELD', 'REPLACEMENT');

-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_merchant_id_fkey";

-- DropIndex
DROP INDEX "Device_serial_number_key";

-- DropIndex
DROP INDEX "Device_si_no_key";

-- DropIndex
DROP INDEX "Device_tid_key";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "si_no",
ADD COLUMN     "merchant_name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "replacement_for" TEXT,
ADD COLUMN     "replacement_type" TEXT NOT NULL DEFAULT 'GREEN_FIELD',
ALTER COLUMN "sim" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "merchant_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
