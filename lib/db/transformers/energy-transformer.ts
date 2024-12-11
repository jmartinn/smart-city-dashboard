import { IEnergyMonthlyData } from '@/lib/schemas/energy';

/**
 * Formats a numerical value with its associated unit.
 * @param value - The numerical value to format.
 * @param unit - The unit of measurement.
 * @returns The formatted value as a string.
 */
export function formatValue(value: number, unit: string): string {
  if (unit === '$') {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  return `${value.toFixed(1)} ${unit}`;
}

/**
 * Calculates the percentage change between current and previous values.
 * @param current - The current value.
 * @param previous - The previous value.
 * @returns The percentage change as a formatted string.
 */
export function calculateChange(current: number, previous: number): string {
  const change = ((current - previous) / previous) * 100;
  return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
}

/**
 * Transforms monthly summary data into summary card objects.
 * @param current - The current month's data.
 * @param previous - The previous month's data.
 * @returns An array of summary cards.
 */
export function transformToSummaryCards(
  current: IEnergyMonthlyData,
  previous: IEnergyMonthlyData
) {
  return [
    {
      title: 'Total Energy Consumption',
      value: formatValue(current.totalConsumption, 'GWh'),
      change: calculateChange(
        current.totalConsumption,
        previous.totalConsumption
      ),
    },
    {
      title: 'Renewable Energy',
      value: formatValue(current.renewableEnergy, 'GWh'),
      change: calculateChange(
        current.renewableEnergy,
        previous.renewableEnergy
      ),
    },
    {
      title: 'Carbon Emissions',
      value: formatValue(current.carbonEmissions, 'kT'),
      change: calculateChange(
        current.carbonEmissions,
        previous.carbonEmissions
      ),
    },
    {
      title: 'Cost Savings',
      value: formatValue(current.costSavings, '$'),
      change: calculateChange(current.costSavings, previous.costSavings),
    },
  ];
}
