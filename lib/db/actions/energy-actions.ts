'use server';

import { subMonths, format } from 'date-fns';

import type {
  TEnergySectorData,
  TEnergyProductionData,
  TEnergySummaryData,
} from '@/lib/schemas/energy';

import * as queries from '../queries/energy-queries';
import { transformToSummaryCards } from '../transformers/energy-transformer';

/**
 * Retrieves data for summary cards based on the provided date.
 * @param date - The target date for fetching summary data.
 * @returns A promise resolving to an array of summary cards.
 */
export async function getSummaryCardData(
  date: Date
): Promise<TEnergySummaryData[]> {
  const currentMonth = await queries.fetchMonthlySummary(date);
  const previousMonth = await queries.fetchMonthlySummary(subMonths(date, 1));

  return transformToSummaryCards(currentMonth, previousMonth);
}

/**
 * Retrieves energy production data up to the specified end date.
 * @param endDate - The target end date for data retrieval.
 * @returns A promise resolving to an array of energy production data.
 */
export async function getEnergyProductionData(
  endDate: Date
): Promise<TEnergyProductionData[]> {
  return queries.fetchEnergyProduction(endDate);
}

/**
 * Retrieves sector consumption data for the specified date.
 * @param date - The target date for fetching sector consumption data.
 * @returns A promise resolving to an array of sector consumption data.
 */
export async function getSectorConsumption(
  date: Date
): Promise<TEnergySectorData[]> {
  return queries.fetchSectorConsumption(date);
}

export async function getWeeklyData(
  startDate: Date,
  endDate: Date,
  page: number = 1,
  pageSize: number = 10
) {
  try {
    const {
      data,
      totalCount,
      page: currentPage,
      pageSize: currentPageSize,
    } = await queries.fetchPaginatedWeeklyData(
      startDate,
      endDate,
      page,
      pageSize
    );

    const formattedData = data.map(week => ({
      id: week.id,
      date: format(week.weekStartDate, 'yyyy-MM-dd'),
      consumption: parseFloat(week.totalConsumption.toFixed(2)),
      production: parseFloat(
        (week.renewableEnergy + week.nonRenewableEnergy).toFixed(2)
      ),
      emissions: parseFloat(week.carbonEmissions.toFixed(2)),
    }));

    return {
      data: formattedData,
      page: currentPage,
      pageSize: currentPageSize,
      totalCount,
    };
  } catch (error) {
    console.error('Error fetching energy data:', error);
    throw new Error('Failed to fetch energy data');
  }
}
