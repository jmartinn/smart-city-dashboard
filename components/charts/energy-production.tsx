'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { TEnergyProductionData } from '@/lib/schemas/energy';

const chartConfig = {
  renewable: {
    label: 'Renewable',
    color: 'hsl(var(--chart-1))',
  },
  nonRenewable: {
    label: 'Not',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

interface Props {
  data: TEnergyProductionData[];
}

export function EnergyProduction({ data }: Props) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              className="w-[180px]"
              formatter={(value, name, item, index) => (
                <>
                  <div
                    className="size-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                    style={
                      {
                        '--color-bg': `var(--color-${name})`,
                      } as React.CSSProperties
                    }
                  />
                  {chartConfig[name as keyof typeof chartConfig]?.label || name}
                  <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                    {value}
                    <span className="font-normal text-muted-foreground">
                      kWh
                    </span>
                  </div>
                </>
              )}
            />
          }
        />
        <Bar dataKey="renewable" fill="var(--color-renewable)" radius={4} />
        <Bar
          dataKey="nonRenewable"
          fill="var(--color-nonRenewable)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
