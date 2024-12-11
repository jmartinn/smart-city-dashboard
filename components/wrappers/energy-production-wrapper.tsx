import { use } from 'react';

import { getEnergyProductionData } from '@/app/api/actions';
import { EnergyProduction } from '@/components/charts/energy-production';
import { EnergyProd } from '@/lib/schemas';

async function fetchProductionData(): Promise<EnergyProd[]> {
  const endDate = new Date();
  return getEnergyProductionData(endDate);
}

export function EnergyProductionWrapper() {
  const data = use(fetchProductionData());
  return <EnergyProduction data={data} />;
}
