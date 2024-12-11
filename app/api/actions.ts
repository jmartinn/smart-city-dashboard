'use server';

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  subMonths,
  format,
} from 'date-fns';

import { prisma } from '@/lib/prisma';
import { EnergyProd, SectorCons, SummryCard, EnergyDtil } from '@/lib/schemas';

type MonthlySummary = {
  totalConsumption: number;
  renewableEnergy: number;
  carbonEmissions: number;
  costSavings: number;
};

type PaginatedWeeklyData = {
  data: {
    id: number;
    date: string;
    consumption: number;
    production: number;
    emissions: number;
  }[];
  nextCursor: number | null;
};

export async function getMonthlySummary(date: Date): Promise<MonthlySummary> {
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);

  const aggregatedData = await prisma.energyData.aggregate({
    _sum: {
      totalConsumption: true,
      renewableEnergy: true,
      carbonEmissions: true,
      costSavings: true,
    },
    where: {
      weekStartDate: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  return {
    totalConsumption: aggregatedData._sum.totalConsumption || 0,
    renewableEnergy: aggregatedData._sum.renewableEnergy || 0,
    carbonEmissions: aggregatedData._sum.carbonEmissions || 0,
    costSavings: aggregatedData._sum.costSavings || 0,
  };
}

export async function getSummaryCardData(date: Date): Promise<SummryCard[]> {
  const currentMonth = await getMonthlySummary(date);
  const previousMonth = await getMonthlySummary(subMonths(date, 1));

  const formatValue = (value: number, unit: string): string => {
    if (unit === '$') {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `${value.toFixed(1)} ${unit}`;
  };

  const calculateChange = (current: number, previous: number): string => {
    const change = ((current - previous) / previous) * 100;
    return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  };

  return [
    {
      title: 'Total Energy Consumption',
      value: formatValue(currentMonth.totalConsumption, 'GWh'),
      change: calculateChange(
        currentMonth.totalConsumption,
        previousMonth.totalConsumption
      ),
    },
    {
      title: 'Renewable Energy',
      value: formatValue(currentMonth.renewableEnergy, 'GWh'),
      change: calculateChange(
        currentMonth.renewableEnergy,
        previousMonth.renewableEnergy
      ),
    },
    {
      title: 'Carbon Emissions',
      value: formatValue(currentMonth.carbonEmissions, 'kT'),
      change: calculateChange(
        currentMonth.carbonEmissions,
        previousMonth.carbonEmissions
      ),
    },
    {
      title: 'Cost Savings',
      value: formatValue(currentMonth.costSavings, '$'),
      change: calculateChange(
        currentMonth.costSavings,
        previousMonth.costSavings
      ),
    },
  ];
}

export async function getEnergyProductionData(
  endDate: Date
): Promise<EnergyProd[]> {
  const startDate = subMonths(startOfMonth(endDate), 5);

  const monthlyData = await prisma.energyData.groupBy({
    by: ['year', 'month'],
    _sum: {
      renewableEnergy: true,
      nonRenewableEnergy: true,
    },
    where: {
      weekStartDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: [{ year: 'asc' }, { month: 'asc' }],
  });

  return monthlyData.map(data => ({
    month: format(new Date(data.year, data.month - 1, 1), 'MMM'),
    renewable: data._sum.renewableEnergy || 0,
    nonRenewable: data._sum.nonRenewableEnergy || 0,
  }));
}

export async function getSectorConsumption(date: Date): Promise<SectorCons[]> {
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);

  const sectorData = await prisma.sectorConsumption.groupBy({
    by: ['sector'],
    _sum: {
      consumption: true,
    },
    where: {
      energyData: {
        weekStartDate: {
          gte: startDate,
          lte: endDate,
        },
      },
    },
  });

  return sectorData.map(data => ({
    sector: data.sector.toLowerCase(),
    consumption: data._sum.consumption || 0,
  }));
}

export async function getWeeklyData(
  startDate: Date,
  endDate: Date,
  cursor: number | null = null,
  limit: number = 10
): Promise<PaginatedWeeklyData> {
  const weeklyData = await prisma.energyData.findMany({
    where: {
      weekStartDate: {
        gte: startOfWeek(startDate),
        lte: endOfWeek(endDate),
      },
      ...(cursor ? { id: { gt: cursor } } : {}),
    },
    orderBy: {
      id: 'asc',
    },
    take: limit + 1,
    select: {
      id: true,
      weekStartDate: true,
      totalConsumption: true,
      renewableEnergy: true,
      nonRenewableEnergy: true,
      carbonEmissions: true,
    },
  });

  const hasNextPage = weeklyData.length > limit;
  const data = weeklyData.slice(0, limit).map(week => ({
    id: week.id,
    date: format(week.weekStartDate, 'yyyy-MM-dd'),
    consumption: parseFloat(week.totalConsumption.toFixed(2)),
    production: parseFloat(
      (week.renewableEnergy + week.nonRenewableEnergy).toFixed(2)
    ),
    emissions: parseFloat(week.carbonEmissions.toFixed(2)),
  }));

  return {
    data,
    nextCursor: hasNextPage ? weeklyData[limit].id : null,
  };
}
