/*
  Warnings:

  - You are about to drop the `Breakfast` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Breakfast" DROP CONSTRAINT "Breakfast_authorID_fkey";

-- DropForeignKey
ALTER TABLE "BreakfastData" DROP CONSTRAINT "BreakfastData_authorID_fkey";

-- DropTable
DROP TABLE "Breakfast";

-- AddForeignKey
ALTER TABLE "BreakfastData" ADD CONSTRAINT "BreakfastData_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
