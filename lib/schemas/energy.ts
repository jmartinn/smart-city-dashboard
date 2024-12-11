import { z } from 'zod';

export const energyWeeklySchema = z.object({
  id: z.number(),
  date: z.string(),
  consumption: z.number(),
  production: z.number(),
  emissions: z.number(),
});
export const energyProductionSchema = z.object({
  month: z.string(),
  renewable: z.number(),
  nonRenewable: z.number(),
});
export const energySectorSchema = z.object({
  sector: z.string(),
  consumption: z.number(),
});
export const energySummarySchema = z.object({
  title: z.string(),
  value: z.string(),
  change: z.string(),
});

export type TEnergyWeeklyData = z.infer<typeof energyWeeklySchema>;
export type TEnergyProductionData = z.infer<typeof energyProductionSchema>;
export type TEnergySectorData = z.infer<typeof energySectorSchema>;
export type TEnergySummaryData = z.infer<typeof energySummarySchema>;

export interface IEnergyPaginatedData {
  data: TEnergyWeeklyData[];
  cursor: number | null;
  totalRecords: number;
}

export interface IEnergyMonthlyData {
  totalConsumption: number;
  renewableEnergy: number;
  carbonEmissions: number;
  costSavings: number;
}
