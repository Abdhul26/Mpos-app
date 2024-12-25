/*
  Warnings:

  - The primary key for the `Device` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `merchant_emirate` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `replacement_for` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `replacement_type` on the `Device` table. All the data in the column will be lost.
  - The `id` column on the `Device` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `created_at` on the `Merchant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tid]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serial_number]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_merchant_id_fkey";

-- AlterTable
ALTER TABLE "Device" DROP CONSTRAINT "Device_pkey",
DROP COLUMN "merchant_emirate",
DROP COLUMN "replacement_for",
DROP COLUMN "replacement_type",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "sim" DROP NOT NULL,
ALTER COLUMN "merchant_id" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'AVAILABLE',
ALTER COLUMN "si_no" DROP NOT NULL,
ALTER COLUMN "si_no" SET DATA TYPE TEXT,
ADD CONSTRAINT "Device_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "created_at",
ALTER COLUMN "emirate" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Device_tid_key" ON "Device"("tid");

-- CreateIndex
CREATE UNIQUE INDEX "Device_serial_number_key" ON "Device"("serial_number");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
