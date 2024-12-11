import { use } from 'react';

import { EnergySector } from '@/components/charts/energy-sector';
import { getSectorConsumption } from '@/lib/db/actions/energy-actions';
import type { TEnergySectorData } from '@/lib/schemas/energy';

async function fetchSectorData(): Promise<TEnergySectorData[]> {
  const currentDate = new Date();
  return getSectorConsumption(currentDate);
}

export function EnergySectorWrapper() {
  const data = use(fetchSectorData());
  return <EnergySector data={data} />;
}
