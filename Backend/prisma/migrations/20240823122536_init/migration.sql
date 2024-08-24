/*
  Warnings:

  - Added the required column `authorID` to the `BreakfastData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorID` to the `DinnerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorID` to the `LunchData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BreakfastData" ADD COLUMN     "authorID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DinnerData" ADD COLUMN     "authorID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LunchData" ADD COLUMN     "authorID" INTEGER NOT NULL;
