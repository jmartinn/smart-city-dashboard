import { PrismaClient, Sector } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 7)) {
    const weekData = generateWeekData(d);
    await prisma.energyData.create({
      data: {
        ...weekData,
        sectors: {
          create: generateSectorData(weekData.totalConsumption),
        },
      },
    });
  }
}

function generateWeekData(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const week = Math.ceil(date.getDate() / 7);

  // Generate random data with some seasonal variation
  const seasonalFactor = Math.sin(((month - 1) / 12) * Math.PI) * 0.2 + 1;

  const renewableEnergy = (Math.random() * 50 + 30) * seasonalFactor;
  const nonRenewableEnergy = (Math.random() * 100 + 100) * seasonalFactor;
  const totalConsumption = renewableEnergy + nonRenewableEnergy;
  const carbonEmissions = nonRenewableEnergy * 0.5; // Assuming 0.5 kT of emissions per GWh of non-renewable energy
  const costSavings = renewableEnergy * 50000; // Assuming $50,000 savings per GWh of renewable energy

  return {
    weekStartDate: date,
    year,
    month,
    week,
    renewableEnergy: parseFloat(renewableEnergy.toFixed(2)),
    nonRenewableEnergy: parseFloat(nonRenewableEnergy.toFixed(2)),
    totalConsumption: parseFloat(totalConsumption.toFixed(2)),
    carbonEmissions: parseFloat(carbonEmissions.toFixed(2)),
    costSavings: parseFloat(costSavings.toFixed(2)),
  };
}

function generateSectorData(totalConsumption: number) {
  const sectors = Object.values(Sector);
  let remainingConsumption = totalConsumption;

  return sectors.map((sector, index) => {
    let consumption;
    if (index === sectors.length - 1) {
      consumption = remainingConsumption;
    } else {
      // Generate a random percentage (between 10% and 40%) for this sector
      const percentage = Math.random() * 0.3 + 0.1;
      consumption = totalConsumption * percentage;
      remainingConsumption -= consumption;
    }

    return {
      sector,
      consumption: parseFloat(consumption.toFixed(2)),
    };
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

