import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  subMonths,
  format,
} from 'date-fns';

import { prisma } from '@/lib/prisma';
import type {
  TEnergySectorData,
  IEnergyMonthlyData,
  TEnergyProductionData,
} from '@/lib/schemas/energy';

/**
 * Retrieves aggregated energy data for a specific month.
 * @param date - The date representing the month.
 * @returns Aggregated energy data for the month.
 */
export async function fetchMonthlySummary(
  date: Date
): Promise<IEnergyMonthlyData> {
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

/**
 * Fetches energy production data for the past six months, grouped by month.
 * @param endDate - The ending date for the data retrieval.
 * @returns An array of energy production data by month.
 */
export async function fetchEnergyProduction(
  endDate: Date
): Promise<TEnergyProductionData[]> {
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

/**
 * Retrieves energy consumption data by sector for a specific month.
 * @param date - The date representing the month.
 * @returns An array of energy consumption data by sector.
 */
export async function fetchSectorConsumption(
  date: Date
): Promise<TEnergySectorData[]> {
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

export async function fetchPaginatedWeeklyData(
  startDate: Date,
  endDate: Date,
  page: number = 1,
  pageSize: number = 10
) {
  const skip = (page - 1) * pageSize;

  const [data, totalCount] = await Promise.all([
    prisma.energyData.findMany({
      where: {
        weekStartDate: {
          gte: startOfWeek(startDate),
          lte: endOfWeek(endDate),
        },
      },
      orderBy: {
        id: 'asc',
      },
      skip,
      take: pageSize,
      select: {
        id: true,
        weekStartDate: true,
        totalConsumption: true,
        renewableEnergy: true,
        nonRenewableEnergy: true,
        carbonEmissions: true,
      },
    }),
    prisma.energyData.count({
      where: {
        weekStartDate: {
          gte: startOfWeek(startDate),
          lte: endOfWeek(endDate),
        },
      },
    }),
  ]);

  return {
    data,
    page,
    pageSize,
    totalCount,
  };
}
