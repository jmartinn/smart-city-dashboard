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
CREATE TABLE "EnergyData" (
    "id" SERIAL NOT NULL,
    "weekStartDate" TIMESTAMP(3) NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "renewableEnergy" DOUBLE PRECISION NOT NULL,
    "nonRenewableEnergy" DOUBLE PRECISION NOT NULL,
    "totalConsumption" DOUBLE PRECISION NOT NULL,
    "carbonEmissions" DOUBLE PRECISION NOT NULL,
    "costSavings" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "EnergyData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectorConsumption" (
    "id" SERIAL NOT NULL,
    "sector" "Sector" NOT NULL,
    "consumption" DOUBLE PRECISION NOT NULL,
    "energyDataId" INTEGER NOT NULL,

    CONSTRAINT "SectorConsumption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "EnergyData_year_month_idx" ON "EnergyData"("year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "EnergyData_year_month_week_key" ON "EnergyData"("year", "month", "week");

-- CreateIndex
CREATE INDEX "SectorConsumption_energyDataId_idx" ON "SectorConsumption"("energyDataId");

-- AddForeignKey
ALTER TABLE "SectorConsumption" ADD CONSTRAINT "SectorConsumption_energyDataId_fkey" FOREIGN KEY ("energyDataId") REFERENCES "EnergyData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
