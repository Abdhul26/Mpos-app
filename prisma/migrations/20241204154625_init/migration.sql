-- CreateEnum
CREATE TYPE "DeviceStatus" AS ENUM ('AVAILABLE', 'PROVISIONED', 'FAULTY', 'REASSIGNED');

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "si_no" INTEGER NOT NULL,
    "tid" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "sim" TEXT,
    "status" "DeviceStatus" NOT NULL DEFAULT 'AVAILABLE',
    "provisioned_at" TIMESTAMP(3),
    "provisioned_location" TEXT,
    "provisioned_by" TEXT,
    "merchant_id" TEXT,
    "merchant_emirate" TEXT,
    "tms_profile" TEXT,
    "handover_to" TEXT,
    "handover_date" TIMESTAMP(3),

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Merchant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emirate" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_si_no_key" ON "Device"("si_no");

-- CreateIndex
CREATE UNIQUE INDEX "Device_tid_key" ON "Device"("tid");

-- CreateIndex
CREATE UNIQUE INDEX "Device_serial_number_key" ON "Device"("serial_number");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
