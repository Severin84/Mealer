-- CreateTable
CREATE TABLE "Day" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "authorID" INTEGER NOT NULL,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Breakfast" (
    "id" SERIAL NOT NULL,
    "authorID" INTEGER NOT NULL,

    CONSTRAINT "Breakfast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lunch" (
    "id" SERIAL NOT NULL,
    "authorID" INTEGER NOT NULL,

    CONSTRAINT "Lunch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dinner" (
    "id" SERIAL NOT NULL,
    "authorID" INTEGER NOT NULL,

    CONSTRAINT "Dinner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BreakfastData" (
    "id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "contents" TEXT NOT NULL,
    "authorID" INTEGER NOT NULL,

    CONSTRAINT "BreakfastData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LunchData" (
    "id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "contents" TEXT NOT NULL,
    "authorID" INTEGER NOT NULL,

    CONSTRAINT "LunchData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DinnerData" (
    "id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "contents" TEXT NOT NULL,
    "authorID" INTEGER NOT NULL,

    CONSTRAINT "DinnerData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Breakfast" ADD CONSTRAINT "Breakfast_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lunch" ADD CONSTRAINT "Lunch_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dinner" ADD CONSTRAINT "Dinner_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BreakfastData" ADD CONSTRAINT "BreakfastData_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "Breakfast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LunchData" ADD CONSTRAINT "LunchData_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "Lunch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DinnerData" ADD CONSTRAINT "DinnerData_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "Dinner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
