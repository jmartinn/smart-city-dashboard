import { use } from 'react';

import { getWeeklyData } from '@/lib/db/actions/energy-actions';
import type { TEnergyWeeklyData } from '@/lib/schemas/energy';

import { columns } from '../table/columns';
import { DataTable } from '../table/data-table';

async function fetchTableData(): Promise<TEnergyWeeklyData[]> {
  const currentDate = new Date();
  const startDate = new Date('2010-01-01');

  return getWeeklyData(startDate, currentDate);
}

export function DataTableWrapper() {
  const data = use(fetchTableData());

  return <DataTable columns={columns} data={data} />;
}
