'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const chartData = [
  { year: '2019', nominals: 0 },
  { year: '2020', nominals: 0 },
  { year: '2021', nominals: 0 },
  { year: '2022', nominals: 0.5 },
  { year: '2023', nominals: 1.5 },
  { year: '2024', nominals: 2 },
  { year: '2025', nominals: 4.5 },
];

const chartConfig = {
  nominals: {
    label: 'Nominals Fulfilled',
    color: 'hsl(var(--chart-1))',
  },
};

export function NominalsFulfilledChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nominals Fulfilled</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" />
            <YAxis domain={[0, 8]} ticks={[0, 2, 4, 6, 8]} />
            <Tooltip
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelKey="year"
                  nameKey="nominals"
                />
              }
            />
            <Line
              type="monotone"
              dataKey="nominals"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{
                fill: 'hsl(var(--primary))',
                r: 4,
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
