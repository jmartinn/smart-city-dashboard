import { format } from 'date-fns';
import { NextResponse } from 'next/server';

import { fetchPaginatedWeeklyData } from '@/lib/db/queries/energy-queries';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const startDate = new Date(
    searchParams.get('startDate') || new Date().toISOString()
  );
  const endDate = new Date(
    searchParams.get('endDate') || new Date().toISOString()
  );

  try {
    const {
      data,
      totalCount,
      page: currentPage,
      pageSize: currentPageSize,
    } = await fetchPaginatedWeeklyData(startDate, endDate, page, pageSize);

    const formattedData = data.map(week => ({
      id: week.id,
      date: format(week.weekStartDate, 'yyyy-MM-dd'),
      consumption: parseFloat(week.totalConsumption.toFixed(2)),
      production: parseFloat(
        (week.renewableEnergy + week.nonRenewableEnergy).toFixed(2)
      ),
      emissions: parseFloat(week.carbonEmissions.toFixed(2)),
    }));

    return NextResponse.json({
      data: formattedData,
      page: currentPage,
      pageSize: currentPageSize,
      totalCount,
    });
  } catch (error) {
    console.error('Error fetching energy data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch energy data' },
      { status: 500 }
    );
  }
}
