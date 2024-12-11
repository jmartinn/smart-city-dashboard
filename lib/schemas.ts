import { z } from 'zod';

export const weeklyDataSchema = z.object({
  id: z.number(),
  date: z.string(),
  consumption: z.number(),
  production: z.number(),
  emissions: z.number(),
});

export const energyProdSchema = z.object({
  month: z.string(),
  renewable: z.number(),
  nonRenewable: z.number(),
});

export const sectorConsSchema = z.object({
  sector: z.string(),
  consumption: z.number(),
});

export const summryCardSchema = z.object({
  title: z.string(),
  value: z.string(),
  change: z.string(),
});

export const energyDtilSchema = z.object({
  id: z.number(),
  date: z.string(),
  consumption: z.number(),
  production: z.number(),
  emissions: z.number(),
});

export type EnergyProd = z.infer<typeof energyProdSchema>;
export type SectorCons = z.infer<typeof sectorConsSchema>;
export type SummryCard = z.infer<typeof summryCardSchema>;
export type EnergyDtil = z.infer<typeof energyDtilSchema>;
