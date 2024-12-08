import { Battery, Leaf, Zap, DollarSign } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const summaryData = [
  {
    title: 'Total Energy Consumption',
    value: '256.5 GWh',
    icon: Zap,
    change: '+2.5%',
  },
  {
    title: 'Renewable Energy',
    value: '64.2 GWh',
    icon: Leaf,
    change: '+5.1%',
  },
  {
    title: 'Carbon Emissions',
    value: '125.4 kT',
    icon: Battery,
    change: '-3.2%',
  },
  {
    title: 'Cost Savings',
    value: '$1.2M',
    icon: DollarSign,
    change: '+10.5%',
  },
];

export function EnergySummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summaryData.map(item => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">
              {item.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
