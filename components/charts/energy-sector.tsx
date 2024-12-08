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
  { sector: 'residential', consumption: 35, fill: 'var(--color-residential)' },
  { sector: 'commercial', consumption: 30, fill: 'var(--color-commercial)' },
  { sector: 'industrial', consumption: 25, fill: 'var(--color-industrial)' },
  {
    sector: 'transportation',
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
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(value, name) => (
                <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                  {chartConfig[name as keyof typeof chartConfig]?.label || name}
                  <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                    {value}
                    <span className="font-normal text-muted-foreground">
                      kWh
                    </span>
                  </div>
                </div>
              )}
            />
          }
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
