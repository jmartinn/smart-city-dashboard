import { Suspense } from 'react';

import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { EnergyProductionSkeleton } from '@/components/skeletons/energy-production-skeleton';
import { EnergySectorSkeleton } from '@/components/skeletons/energy-sector-skeleton';
import { EnergySummarySkeleton } from '@/components/skeletons/summary-cards-skeleton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTableWrapper } from '@/components/wrappers/data-table-wrapper';
import { EnergyProductionWrapper } from '@/components/wrappers/energy-production-wrapper';
import { EnergySectorWrapper } from '@/components/wrappers/energy-sector-wrapper';
import { EnergySummaryWrapper } from '@/components/wrappers/summary-cards-wrapper';

export default function Home() {
  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="hidden items-center space-x-2 md:flex">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<EnergySummarySkeleton />}>
            <EnergySummaryWrapper />
          </Suspense>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Energy Production</CardTitle>
                <CardDescription>
                  View a summary of the energy production
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Suspense fallback={<EnergyProductionSkeleton />}>
                  <EnergyProductionWrapper />
                </Suspense>
              </CardContent>
            </Card>
            <Card className="col-span-4 lg:col-span-3">
              <CardHeader>
                <CardTitle>Consumption by Sector</CardTitle>
                <CardDescription>
                  View a summary of the energy consumption by sector
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<EnergySectorSkeleton />}>
                  <EnergySectorWrapper />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="details">
          <Suspense fallback={<div>Loading...</div>}>
            <DataTableWrapper />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
