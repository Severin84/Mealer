/*
  Warnings:

  - You are about to drop the `Dinner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lunch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dinner" DROP CONSTRAINT "Dinner_authorID_fkey";

-- DropForeignKey
ALTER TABLE "DinnerData" DROP CONSTRAINT "DinnerData_authorID_fkey";

-- DropForeignKey
ALTER TABLE "Lunch" DROP CONSTRAINT "Lunch_authorID_fkey";

-- DropForeignKey
ALTER TABLE "LunchData" DROP CONSTRAINT "LunchData_authorID_fkey";

-- DropTable
DROP TABLE "Dinner";

-- DropTable
DROP TABLE "Lunch";

-- AddForeignKey
ALTER TABLE "LunchData" ADD CONSTRAINT "LunchData_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DinnerData" ADD CONSTRAINT "DinnerData_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
