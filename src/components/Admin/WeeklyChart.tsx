// WeeklyChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WeeklyChartProps {
  data: Array<{
    date: string;
    orders: number;
    amount: number;
  }>;
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="orders" 
          stroke="#8884d8" 
          name="Orders"
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="amount" 
          stroke="#82ca9d" 
          name="Revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}