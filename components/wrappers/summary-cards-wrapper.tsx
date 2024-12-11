import { use } from 'react';

import { EnergySummary } from '@/components/summary-cards';
import { getSummaryCardData } from '@/lib/db/actions/energy-actions';
import type { TEnergySummaryData } from '@/lib/schemas/energy';

async function fetchSummaryData(): Promise<TEnergySummaryData[]> {
  const currentDate = new Date();
  return getSummaryCardData(currentDate);
}

export function EnergySummaryWrapper() {
  const data = use(fetchSummaryData());
  return <EnergySummary data={data} />;
}
