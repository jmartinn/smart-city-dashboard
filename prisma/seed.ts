import { PrismaClient, Sector } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding started...');

  // Seed Monthly Consumption (Bar Chart Data)
  const monthlyConsumptionData = [
    { month: 'January', renewable: 4000, nonRenewable: 2400 },
    { month: 'February', renewable: 3200, nonRenewable: 2000 },
    { month: 'March', renewable: 4500, nonRenewable: 3000 },
    { month: 'April', renewable: 4800, nonRenewable: 2800 },
    { month: 'May', renewable: 5000, nonRenewable: 3100 },
    { month: 'June', renewable: 5300, nonRenewable: 3500 },
    { month: 'July', renewable: 5500, nonRenewable: 3700 },
    { month: 'August', renewable: 5200, nonRenewable: 3300 },
    { month: 'September', renewable: 4900, nonRenewable: 2900 },
    { month: 'October', renewable: 4700, nonRenewable: 2700 },
    { month: 'November', renewable: 4500, nonRenewable: 2500 },
    { month: 'December', renewable: 4300, nonRenewable: 2200 },
  ];

  await prisma.montlyConsumption.createMany({ data: monthlyConsumptionData });
  console.log('Seeded Monthly Consumption data.');

  // Seed Daily Consumption (Summary Cards & Pie Chart)
  const dailyConsumptionData = [];
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2023-12-31');
  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;
  const sectors = Object.values(Sector);

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    dailyConsumptionData.push({
      date: new Date(date),
      consumption: Math.round(randomInRange(1000, 5000)),
      production: Math.round(randomInRange(500, 4000)),
      emissions: Math.round(randomInRange(50, 300)),
      sector: sectors[Math.floor(Math.random() * sectors.length)],
    });
  }

  await prisma.dailyConsumption.createMany({ data: dailyConsumptionData });
  console.log('Seeded Daily Consumption data.');

  // Seed Weekly Consumption (Data Table)
  const weeklyConsumptionData = [];
  for (let week = 1; week <= 52; week++) {
    weeklyConsumptionData.push({
      week,
      consumption: Math.round(randomInRange(10000, 50000)),
      production: Math.round(randomInRange(5000, 30000)),
      emissions: Math.round(randomInRange(300, 1500)),
    });
  }

  await prisma.weeklyConsumption.createMany({ data: weeklyConsumptionData });
  console.log('Seeded Weekly Consumption data.');

  console.log('Seeding completed!');
}

main()
  .catch(e => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
