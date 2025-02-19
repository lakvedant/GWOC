'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, TooltipProps } from 'recharts';

interface PaymentChartProps {
  data: Array<{
    name: string;
    value: number;
    count: number;
  }>;
}

export function PaymentChart({ data }: PaymentChartProps) {
  const COLORS = ['#8884d8', '#82ca9d'];

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm">Amount: ₹{payload[0].value !== undefined ? new Intl.NumberFormat("en-IN").format(payload[0].value) : 'N/A'}</p>
          <p className="text-sm">Orders: {payload[0].payload.count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}