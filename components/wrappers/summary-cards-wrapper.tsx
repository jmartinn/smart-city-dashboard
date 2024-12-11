import { use } from 'react';

import { getSummaryCardData } from '@/app/api/actions';
import { EnergySummary } from '@/components/summary-cards';
import { SummryCard } from '@/lib/schemas';

async function fetchSummaryData(): Promise<SummryCard[]> {
  const currentDate = new Date();
  return getSummaryCardData(currentDate);
}

export function EnergySummaryWrapper() {
  const data = use(fetchSummaryData());
  return <EnergySummary data={data} />;
}
