import { use } from 'react';

import { EnergyProduction } from '@/components/charts/energy-production';
import { getEnergyProductionData } from '@/lib/db/actions/energy-actions';
import type { TEnergyProductionData } from '@/lib/schemas/energy';

async function fetchProductionData(): Promise<TEnergyProductionData[]> {
  const endDate = new Date();
  return getEnergyProductionData(endDate);
}

export function EnergyProductionWrapper() {
  const data = use(fetchProductionData());
  return <EnergyProduction data={data} />;
}
