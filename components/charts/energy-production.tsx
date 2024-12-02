'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { name: 'Jan', renewable: 4000, nonRenewable: 2400 },
  { name: 'Feb', renewable: 3000, nonRenewable: 1398 },
  { name: 'Mar', renewable: 2000, nonRenewable: 9800 },
  { name: 'Apr', renewable: 2780, nonRenewable: 3908 },
  { name: 'May', renewable: 1890, nonRenewable: 4800 },
  { name: 'Jun', renewable: 2390, nonRenewable: 3800 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function EnergyProduction() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="renewable" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="nonRenewable" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
