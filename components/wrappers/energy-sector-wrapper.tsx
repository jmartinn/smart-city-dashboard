import { use } from 'react';

import { getSectorConsumption } from '@/app/api/actions';
import { EnergySector } from '@/components/charts/energy-sector';
import { SectorCons } from '@/lib/schemas';

async function fetchSectorData(): Promise<SectorCons[]> {
  const currentDate = new Date();
  return getSectorConsumption(currentDate);
}

export function EnergySectorWrapper() {
  const data = use(fetchSectorData());
  return <EnergySector data={data} />;
}
