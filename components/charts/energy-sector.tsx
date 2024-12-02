'use client';

import { Pie, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { sector: 'Residential', consumption: 35, fill: 'var(--color-residential)' },
  { sector: 'Commercial', consumption: 30, fill: 'var(--color-commercial)' },
  { sector: 'Industrial', consumption: 25, fill: 'var(--color-industrial)' },
  {
    sector: 'Transportation',
    consumption: 10,
    fill: 'var(--color-transportation)',
  },
];

const chartConfig = {
  consumption: {
    label: 'Consumption',
  },
  residential: {
    label: 'Residential',
    color: 'hsl(var(--chart-1))',
  },
  commercial: {
    label: 'Commercial',
    color: 'hsl(var(--chart-2))',
  },
  industrial: {
    label: 'Industrial',
    color: 'hsl(var(--chart-3))',
  },
  transportation: {
    label: 'Transportation',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export function EnergySector() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[350px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="consumption"
          nameKey="sector"
          innerRadius={60}
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="sector" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
