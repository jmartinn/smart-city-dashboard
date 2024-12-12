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
 * Retrieves aggregated energy metrics for a specific month.
 * @param date - The date representing the target month
 * @returns Promise<IEnergyMonthlyData> Monthly aggregated data including consumption, renewable energy, emissions, and cost savings
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
 * Fetches monthly energy production data for a 6-month period.
 * @param endDate - The ending date for the data retrieval period
 * @returns Promise<TEnergyProductionData[]> Monthly production data with renewable and non-renewable energy values
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

/**
 * Retrieves paginated weekly energy data within a date range.
 * @param startDate - Start of the date range
 * @param endDate - End of the date range
 * @returns Promise containing weekly data
 */
export async function fetchWeeklyData(startDate: Date, endDate: Date) {
  return prisma.energyData.findMany({
    where: {
      weekStartDate: {
        gte: startOfWeek(startDate),
        lte: endOfWeek(endDate),
      },
    },
    orderBy: {
      id: 'asc',
    },
    select: {
      id: true,
      weekStartDate: true,
      totalConsumption: true,
      renewableEnergy: true,
      nonRenewableEnergy: true,
      carbonEmissions: true,
    },
  });
}
