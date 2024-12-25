/*
  Warnings:

  - Added the required column `si_no` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "si_no" INTEGER NOT NULL;
