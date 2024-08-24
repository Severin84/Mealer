/*
  Warnings:

  - You are about to drop the column `mealID` on the `BreakfastData` table. All the data in the column will be lost.
  - You are about to drop the column `mealID` on the `DinnerData` table. All the data in the column will be lost.
  - You are about to drop the column `mealID` on the `LunchData` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BreakfastData" DROP CONSTRAINT "BreakfastData_mealID_fkey";

-- DropForeignKey
ALTER TABLE "DinnerData" DROP CONSTRAINT "DinnerData_mealID_fkey";

-- DropForeignKey
ALTER TABLE "LunchData" DROP CONSTRAINT "LunchData_mealID_fkey";

-- AlterTable
ALTER TABLE "BreakfastData" DROP COLUMN "mealID";

-- AlterTable
ALTER TABLE "DinnerData" DROP COLUMN "mealID";

-- AlterTable
ALTER TABLE "LunchData" DROP COLUMN "mealID";

-- AddForeignKey
ALTER TABLE "BreakfastData" ADD CONSTRAINT "BreakfastData_id_fkey" FOREIGN KEY ("id") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LunchData" ADD CONSTRAINT "LunchData_id_fkey" FOREIGN KEY ("id") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DinnerData" ADD CONSTRAINT "DinnerData_id_fkey" FOREIGN KEY ("id") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
