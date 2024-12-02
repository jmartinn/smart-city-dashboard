import { z } from 'zod';

export const energySchema = z.object({
  id: z.number(),
  date: z.string(),
  consumption: z.number(),
  production: z.number(),
  emissions: z.number(),
});

export type EnergyData = z.infer<typeof energySchema>;
