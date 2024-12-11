'use server';

import { subMonths } from 'date-fns';

import type {
  TEnergySectorData,
  IEnergyPaginatedData,
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

/**
 * Retrieves paginated weekly data within the specified date range.
 * @param startDate - The start date of the range.
 * @param endDate - The end date of the range.
 * @param cursor - Optional pagination cursor.
 * @param limit - Optional maximum number of records to fetch.
 * @returns A promise resolving to the paginated weekly data.
 */
export async function getWeeklyData(
  startDate: Date,
  endDate: Date,
  cursor?: number | null,
  limit?: number
): Promise<IEnergyPaginatedData> {
  return queries.fetchPaginatedWeeklyData(startDate, endDate, cursor, limit);
}
