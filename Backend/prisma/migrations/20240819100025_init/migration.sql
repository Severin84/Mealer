/*
  Warnings:

  - You are about to drop the column `mealType` on the `BreakfastData` table. All the data in the column will be lost.
  - Added the required column `MealType` to the `BreakfastData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BreakfastData" DROP COLUMN "mealType",
ADD COLUMN     "MealType" TEXT NOT NULL;
