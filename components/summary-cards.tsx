import { Battery, Leaf, Zap, DollarSign } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TEnergySummaryData } from '@/lib/schemas/energy';

const iconMap = {
  'Total Energy Consumption': Zap,
  'Renewable Energy': Leaf,
  'Carbon Emissions': Battery,
  'Cost Savings': DollarSign,
};

interface Props {
  data: TEnergySummaryData[];
}

export function EnergySummary({ data }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {data.map(item => {
        const Icon = iconMap[item.title as keyof typeof iconMap];
        return (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                {item.change} from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
