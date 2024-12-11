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
import { SectorCons } from '@/lib/schemas';

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

interface Props {
  data: SectorCons[];
}

export function EnergySector({ data }: Props) {
  const chartData = data.map(item => ({
    ...item,
    fill: `var(--color-${item.sector.toLowerCase()})`,
  }));

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
