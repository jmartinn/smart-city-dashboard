-- CreateEnum
CREATE TYPE "Sector" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'TRANSPORTATION');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MontlyConsumption" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "renewable" DOUBLE PRECISION NOT NULL,
    "nonRenewable" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MontlyConsumption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyConsumption" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "consumption" DOUBLE PRECISION NOT NULL,
    "production" DOUBLE PRECISION NOT NULL,
    "emissions" DOUBLE PRECISION NOT NULL,
    "sector" "Sector" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyConsumption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyConsumption" (
    "id" SERIAL NOT NULL,
    "week" INTEGER NOT NULL,
    "consumption" DOUBLE PRECISION NOT NULL,
    "production" DOUBLE PRECISION NOT NULL,
    "emissions" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeeklyConsumption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
