/*
  Warnings:

  - The `merchant_id` column on the `Device` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Device` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Merchant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Merchant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_merchant_id_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "merchant_id",
ADD COLUMN     "merchant_id" INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" "DeviceStatus" NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
