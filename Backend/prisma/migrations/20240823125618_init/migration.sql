/*
  Warnings:

  - You are about to drop the column `dayid` on the `DinnerData` table. All the data in the column will be lost.
  - You are about to drop the column `dayid` on the `LunchData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DinnerData" DROP COLUMN "dayid";

-- AlterTable
ALTER TABLE "LunchData" DROP COLUMN "dayid";
