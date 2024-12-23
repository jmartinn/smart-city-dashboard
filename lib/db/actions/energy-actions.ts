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
 * Retrieves data for summary cards comparing current and previous month's energy metrics.
 * @param date - The target date for fetching summary data (used to determine current month)
 * @returns Promise<TEnergySummaryData[]> Array of summary cards containing title, value, and change percentage
 */
export async function getSummaryCardData(
  date: Date
): Promise<TEnergySummaryData[]> {
  const currentMonth = await queries.fetchMonthlySummary(date);
  const previousMonth = await queries.fetchMonthlySummary(subMonths(date, 1));

  return transformToSummaryCards(currentMonth, previousMonth);
}

/**
 * Retrieves energy production data for the past 6 months up to the specified end date.
 * @param endDate - The target end date for data retrieval
 * @returns Promise<TEnergyProductionData[]> Array of monthly energy production data containing renewable and non-renewable values
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

/**
 * Retrieves weekly energy data with pagination support.
 * @param startDate - Start date for the data range
 * @param endDate - End date for the data range
 * @returns Promise containing weekly data and total count
 * @throws Error if data fetching fails
 */
export async function getWeeklyData(startDate: Date, endDate: Date) {
  try {
    const data = await queries.fetchWeeklyData(startDate, endDate);

    const formattedData = data.map(week => ({
      id: week.id,
      date: format(week.weekStartDate, 'yyyy-MM-dd'),
      consumption: parseFloat(week.totalConsumption.toFixed(2)),
      production: parseFloat(
        (week.renewableEnergy + week.nonRenewableEnergy).toFixed(2)
      ),
      emissions: parseFloat(week.carbonEmissions.toFixed(2)),
    }));

    return formattedData;
  } catch (error) {
    console.error('Error fetching energy data:', error);
    throw new Error('Failed to fetch energy data');
  }
}
