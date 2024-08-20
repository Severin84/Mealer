/*
  Warnings:

  - You are about to drop the column `type` on the `BreakfastData` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `DinnerData` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `LunchData` table. All the data in the column will be lost.
  - Added the required column `mealType` to the `BreakfastData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MealType` to the `DinnerData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MealType` to the `LunchData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BreakfastData" DROP COLUMN "type",
ADD COLUMN     "mealType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DinnerData" DROP COLUMN "type",
ADD COLUMN     "MealType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LunchData" DROP COLUMN "type",
ADD COLUMN     "MealType" TEXT NOT NULL;
