import { EnergyProduction } from '@/components/charts/energy-production';
import { EnergySector } from '@/components/charts/energy-sector';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { EnergySummary } from '@/components/summary-cards';
import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateMockData } from '@/lib/utils';

export default function Home() {
  const data = generateMockData(1000);
  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
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
          <TabsTrigger value="details" disabled>
            Details
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <EnergySummary />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Energy Production</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <EnergyProduction />
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
                <EnergySector />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <DataTable columns={columns} data={data} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
