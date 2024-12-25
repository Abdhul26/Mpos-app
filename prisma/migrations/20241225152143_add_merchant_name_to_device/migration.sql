/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Device` table. All the data in the column will be lost.
  - Made the column `sim` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `provisioned_at` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `provisioned_location` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `provisioned_by` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tms_profile` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `handover_to` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `handover_date` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `si_no` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `merchant_id` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `status` on the `Device` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_merchant_id_fkey";

-- DropIndex
DROP INDEX "Device_serial_number_key";

-- DropIndex
DROP INDEX "Device_tid_key";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "merchant_emirate" TEXT,
ALTER COLUMN "sim" SET NOT NULL,
ALTER COLUMN "provisioned_at" SET NOT NULL,
ALTER COLUMN "provisioned_location" SET NOT NULL,
ALTER COLUMN "provisioned_by" SET NOT NULL,
ALTER COLUMN "tms_profile" SET NOT NULL,
ALTER COLUMN "handover_to" SET NOT NULL,
ALTER COLUMN "handover_date" SET NOT NULL,
ALTER COLUMN "si_no" SET NOT NULL,
ALTER COLUMN "merchant_id" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Device_merchant_id_idx" ON "Device"("merchant_id");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
