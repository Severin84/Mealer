/*
  Warnings:

  - Added the required column `type` to the `BreakfastData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `DinnerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `LunchData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BreakfastData" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DinnerData" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LunchData" ADD COLUMN     "type" TEXT NOT NULL;
