/*
  Warnings:

  - You are about to drop the column `authorID` on the `BreakfastData` table. All the data in the column will be lost.
  - You are about to drop the column `authorID` on the `DinnerData` table. All the data in the column will be lost.
  - You are about to drop the column `authorID` on the `LunchData` table. All the data in the column will be lost.
  - Added the required column `mealID` to the `BreakfastData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayid` to the `DinnerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mealID` to the `DinnerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayid` to the `LunchData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mealID` to the `LunchData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BreakfastData" DROP CONSTRAINT "BreakfastData_authorID_fkey";

-- DropForeignKey
ALTER TABLE "DinnerData" DROP CONSTRAINT "DinnerData_authorID_fkey";

-- DropForeignKey
ALTER TABLE "LunchData" DROP CONSTRAINT "LunchData_authorID_fkey";

-- AlterTable
ALTER TABLE "BreakfastData" DROP COLUMN "authorID",
ADD COLUMN     "mealID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DinnerData" DROP COLUMN "authorID",
ADD COLUMN     "dayid" INTEGER NOT NULL,
ADD COLUMN     "mealID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LunchData" DROP COLUMN "authorID",
ADD COLUMN     "dayid" INTEGER NOT NULL,
ADD COLUMN     "mealID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "BreakfastData" ADD CONSTRAINT "BreakfastData_mealID_fkey" FOREIGN KEY ("mealID") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LunchData" ADD CONSTRAINT "LunchData_mealID_fkey" FOREIGN KEY ("mealID") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DinnerData" ADD CONSTRAINT "DinnerData_mealID_fkey" FOREIGN KEY ("mealID") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
