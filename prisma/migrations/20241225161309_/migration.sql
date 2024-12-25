/*
  Warnings:

  - You are about to drop the column `si_no` on the `Device` table. All the data in the column will be lost.
  - The primary key for the `Merchant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Merchant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `device_model_id` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `merchant_id` on the `Device` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_merchant_id_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "si_no",
ADD COLUMN     "device_model_id" INTEGER NOT NULL,
DROP COLUMN "merchant_id",
ADD COLUMN     "merchant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "DeviceModel" (
    "id" SERIAL NOT NULL,
    "model_name" TEXT NOT NULL,

    CONSTRAINT "DeviceModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Device_merchant_id_idx" ON "Device"("merchant_id");

-- CreateIndex
CREATE INDEX "Device_device_model_id_idx" ON "Device"("device_model_id");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_device_model_id_fkey" FOREIGN KEY ("device_model_id") REFERENCES "DeviceModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
