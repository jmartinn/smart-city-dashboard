import { IEnergyMonthlyData } from '@/lib/schemas/energy';

/**
 * Formats a numerical value with its associated unit of measurement.
 * @param value - The numerical value to format
 * @param unit - The unit of measurement ('$', 'GWh', or 'kT')
 * @returns Formatted string with value and unit (e.g., "$1.5M" or "150.0 GWh")
 */
export function formatValue(value: number, unit: string): string {
  if (unit === '$') {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  return `${value.toFixed(1)} ${unit}`;
}

/**
 * Calculates the percentage change between two values.
 * @param current - The current period value
 * @param previous - The previous period value
 * @returns Formatted string with percentage change including sign (e.g., "+5.2%" or "-3.1%")
 */
export function calculateChange(current: number, previous: number): string {
  const change = ((current - previous) / previous) * 100;
  return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
}

/**
 * Transforms monthly energy data into formatted summary cards.
 * @param current - The current month's energy metrics
 * @param previous - The previous month's energy metrics for comparison
 * @returns Array of summary cards with formatted values and change percentages
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
