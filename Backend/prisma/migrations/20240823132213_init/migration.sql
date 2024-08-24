/*
  Warnings:

  - Added the required column `dayID` to the `BreakfastData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayID` to the `DinnerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayID` to the `LunchData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BreakfastData" DROP CONSTRAINT "BreakfastData_id_fkey";

-- DropForeignKey
ALTER TABLE "DinnerData" DROP CONSTRAINT "DinnerData_id_fkey";

-- DropForeignKey
ALTER TABLE "LunchData" DROP CONSTRAINT "LunchData_id_fkey";

-- AlterTable
ALTER TABLE "BreakfastData" ADD COLUMN     "dayID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DinnerData" ADD COLUMN     "dayID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LunchData" ADD COLUMN     "dayID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "BreakfastData" ADD CONSTRAINT "BreakfastData_dayID_fkey" FOREIGN KEY ("dayID") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LunchData" ADD CONSTRAINT "LunchData_dayID_fkey" FOREIGN KEY ("dayID") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DinnerData" ADD CONSTRAINT "DinnerData_dayID_fkey" FOREIGN KEY ("dayID") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
